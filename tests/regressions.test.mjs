import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

// Compile the production module in memory; tests work on the deployed Node 20 runtime too.
function load(file, globals = {}) {
  const source = fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
  const exports = {};
  vm.runInNewContext(outputText, { exports, AbortSignal, ...globals }, { filename: file });
  return exports;
}
const { calculateSalary, calculateGratuity, calculateDebtPayoff, buildBnplSchedule } = load("lib/calculations.ts");
const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 0.011, `${actual} != ${expected}`);

test("salary includes housing in contributions but not other allowances", () => {
  const result = calculateSalary(10000, 2000, 1000, 9.75, true);
  assert.equal(result.contributoryWage, 12000);
  assert.equal(result.gosiAmount, 1170);
  assert.equal(result.net, 11830);
});
test("salary contributions stop at the wage cap", () => {
  assert.equal(calculateSalary(50000, 5000, 1000, 9.75, true).gosiAmount, 4387.5);
});
test("non-Saudi estimate has no employee contribution", () => {
  assert.equal(calculateSalary(10000, 2000, 1000, 9.75, false).net, 13000);
});
for (const [years, expected] of [[1.99, 0], [2, 8000 / 3], [5, 20000 / 3], [5.5, 16000], [10, 60000]]) {
  test(`resignation entitlement at ${years} years`, () => close(calculateGratuity(8000, years, true).due, expected));
}
test("ordinary employer termination includes fractional service", () => {
  assert.equal(calculateGratuity(8000, 5.5, false).due, 24000);
});
test("zero-rate debt has no invented interest and a smaller last payment", () => {
  const result = calculateDebtPayoff(1000, 0, 300);
  assert.equal(result.months, 4);
  assert.equal(result.totalPaid, 1000);
  assert.equal(result.totalCost, 0);
  assert.equal(result.finalPayment, 100);
});
test("debt handles no balance and payment above the balance", () => {
  assert.equal(calculateDebtPayoff(0, 20, 0).months, 0);
  close(calculateDebtPayoff(100, 12, 500).totalPaid, 101);
});
test("payment must exceed monthly interest", () => {
  assert.equal(calculateDebtPayoff(1000, 12, 10).tooLow, true);
  assert.equal(calculateDebtPayoff(1000, 0, 0).tooLow, true);
});
test("debt totals agree with an independent month-by-month balance ledger", () => {
  for (const [balance, rate, payment] of [[15000, 20, 800], [1200, 12, 100], [50000, 6, 1500]]) {
    let remaining = balance, paid = 0, months = 0;
    while (remaining > 1e-8 && months < 1000) {
      remaining *= 1 + rate / 1200;
      const installment = Math.min(payment, remaining);
      paid += installment; remaining -= installment; months++;
    }
    const result = calculateDebtPayoff(balance, rate, payment);
    assert.equal(result.months, months); close(result.totalPaid, paid);
  }
});
test("invalid numeric values do not produce plausible financial results", () => {
  assert.equal(calculateSalary(-1, 0, 0, 10, true), null);
  assert.equal(calculateSalary(100, 0, 0, NaN, true), null);
  assert.equal(calculateGratuity(8000, Infinity, true), null);
  assert.equal(calculateDebtPayoff(100, -1, 20), null);
  assert.equal(calculateDebtPayoff(100, 0, NaN), null);
});
test("monthly BNPL dates respect month-end and recover the original day", () => {
  const rows = buildBnplSchedule(100, 3, "2026-01-31", "monthly");
  assert.equal(rows.map((r) => r.date.toISOString().slice(0, 10)).join(","), "2026-01-31,2026-02-28,2026-03-31");
  assert.equal(rows.map((r) => r.amount).join(","), "33.34,33.33,33.33");
  close(rows.reduce((total, row) => total + row.amount, 0), 100);
});
test("BNPL handles leap years and fortnightly dates", () => {
  assert.equal(buildBnplSchedule(10, 2, "2028-01-31", "monthly")[1].date.toISOString().slice(0, 10), "2028-02-29");
  assert.equal(buildBnplSchedule(10, 2, "2026-12-25", "biweekly")[1].date.toISOString().slice(0, 10), "2027-01-08");
});
test("BNPL rejects missing dates, invalid dates and unbounded installment counts", () => {
  for (const args of [[100, 4, "", "monthly"], [100, 4, "2026-02-30", "monthly"], [100, 1e9, "2026-01-01", "monthly"], [100, 2.5, "2026-01-01", "monthly"]]) {
    assert.equal(buildBnplSchedule(...args), null);
  }
});

test("unconfigured newsletter rejects without logging or contacting a provider", async () => {
  let calls = 0;
  const email = load("lib/email.ts", { process: { env: {} }, fetch: () => { calls++; }, console: { log: () => assert.fail("Must not log email") } });
  await assert.rejects(email.subscribeToNewsletter({ email: "test@example.com", locale: "en" }), /not configured/);
  assert.equal(calls, 0);
});
test("newsletter uses configured field IDs and requires a provider import job", async () => {
  let payload;
  const email = load("lib/email.ts", {
    process: { env: { SENDGRID_API_KEY: "test-key", SENDGRID_LIST_ID: "test-list", SENDGRID_LOCALE_FIELD_ID: "e1_T" } },
    fetch: async (_url, options) => { payload = JSON.parse(options.body); return { ok: true, json: async () => ({ job_id: "test-job" }) }; },
  });
  await email.subscribeToNewsletter({ email: "test@example.com", locale: "ar" });
  assert.deepEqual(payload.contacts[0].custom_fields, { e1_T: "ar" });
});
for (const [name, response] of [["provider rejection", { ok: false, status: 401 }], ["missing job", { ok: true, json: async () => ({}) }]]) {
  test(`newsletter rejects ${name}`, async () => {
    const email = load("lib/email.ts", { process: { env: { SENDGRID_API_KEY: "test", SENDGRID_LIST_ID: "list" } }, fetch: async () => response });
    await assert.rejects(email.subscribeToNewsletter({ email: "test@example.com", locale: "en" }));
  });
}
