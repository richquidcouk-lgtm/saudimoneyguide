// Pure planning calculations; assumptions are explained in each tool.
const valid = (...values: number[]) => values.every((v) => Number.isFinite(v) && v >= 0 && v <= 1e9);
const money = (v: number) => Math.round((v + Number.EPSILON) * 100) / 100;
export function calculateSalary(basic: number, housing: number, other: number, rate: number, saudi: boolean) {
  if (!valid(basic, housing, other, rate) || rate > 100) return null;
  const gross = basic + housing + other;
  const contributoryWage = Math.min(45000, basic + housing);
  const gosiAmount = saudi ? money(contributoryWage * rate / 100) : 0;
  return { gross, contributoryWage, gosiAmount, net: gross - gosiAmount };
}
export function calculateGratuity(salary: number, years: number, resigned: boolean) {
  if (!valid(salary, years) || years > 100) return null;
  const fullAmount = Math.min(years, 5) * salary / 2 + Math.max(0, years - 5) * salary;
  const fraction = !resigned ? 1 : years < 2 ? 0 : years <= 5 ? 1 / 3 : years < 10 ? 2 / 3 : 1;
  return { fullAmount, due: fullAmount * fraction };
}
export function calculateDebtPayoff(balance: number, rate: number, payment: number) {
  if (!valid(balance, rate, payment) || rate > 100) return null;
  if (balance === 0) return { months: 0, totalPaid: 0, totalCost: 0, finalPayment: 0, tooLow: false };
  const r = rate / 1200;
  if (payment <= balance * r) return { months: 0, totalPaid: 0, totalCost: 0, finalPayment: 0, tooLow: true };
  const n = r === 0 ? balance / payment : -Math.log1p(-r * balance / payment) / Math.log1p(r);
  if (!Number.isFinite(n) || n > 12000) return null;
  const months = Math.max(1, Math.ceil(n - 1e-10));
  const fullPayments = months - 1;
  // The last installment is only the outstanding balance, not a full payment.
  const last = r === 0 ? balance - fullPayments * payment
    : payment * (1 + r) * -Math.expm1((fullPayments - n) * Math.log1p(r)) / r;
  const finalPayment = money(Math.max(0, Math.min(payment, last)));
  const totalPaid = money(fullPayments * payment + finalPayment);
  return { months, totalPaid, totalCost: money(Math.max(0, totalPaid - balance)), finalPayment, tooLow: false };
}

export function buildBnplSchedule(price: number, count: number, start: string, frequency: string) {
  if (!valid(price, count) || !Number.isInteger(count) || count < 1 || count > 24
    || !/^\d{4}-\d{2}-\d{2}$/.test(start) || !['monthly', 'biweekly'].includes(frequency)) return null;
  const date = new Date(start + 'T12:00:00Z');
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== start) return null;
  const cents = Math.round(price * 100);
  const base = Math.floor(cents / count);
  return Array.from({ length: count }, (_, index) => {
    const due = new Date(date);
    if (frequency === 'monthly') {
      due.setUTCDate(1);
      due.setUTCMonth(date.getUTCMonth() + index);
      const lastDay = new Date(Date.UTC(due.getUTCFullYear(), due.getUTCMonth() + 1, 0)).getUTCDate();
      due.setUTCDate(Math.min(date.getUTCDate(), lastDay));
    } else due.setUTCDate(date.getUTCDate() + index * 14);
    return { date: due, amount: (base + (index < cents % count ? 1 : 0)) / 100 };
  });
}
