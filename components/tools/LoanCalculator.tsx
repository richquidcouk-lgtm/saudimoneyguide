"use client";

import { useMemo, useState } from "react";
import { Field, inputClass, ResultRow, ResultsCard, formatCurrency } from "./CalculatorShell";

const TEXT = {
  en: {
    amount: "Loan amount (SAR)",
    rate: "Annual profit rate (%)",
    term: "Term (months)",
    monthly: "Monthly installment",
    total: "Total repayment",
    profit: "Total profit (cost of financing)",
    note: "This is a standard amortization estimate. Actual bank offers may add fees, and Islamic financing products are structured differently (see our Islamic finance guide) — always confirm the exact figures with the provider before signing.",
  },
  ar: {
    amount: "مبلغ التمويل (ريال)",
    rate: "نسبة الربح السنوية (%)",
    term: "المدة (بالأشهر)",
    monthly: "القسط الشهري",
    total: "إجمالي المبلغ المسدد",
    profit: "إجمالي الربح (تكلفة التمويل)",
    note: "هذا تقدير رياضي قياسي (أقساط متناقصة). قد تضيف البنوك رسومًا فعلية، والتمويل الإسلامي يُبنى بطريقة مختلفة هيكليًا (راجع دليلنا عن التمويل الإسلامي) — تأكد دائمًا من الأرقام الدقيقة مع الجهة الممولة قبل التوقيع.",
  },
};

export default function LoanCalculator({ locale }: { locale: string }) {
  const t = TEXT[locale === "ar" ? "ar" : "en"];
  const [amount, setAmount] = useState(50000);
  const [rate, setRate] = useState(6);
  const [term, setTerm] = useState(36);

  const { monthly, total, profit } = useMemo(() => {
    const P = Math.max(0, amount);
    const n = Math.max(1, Math.round(term));
    const r = rate / 100 / 12;

    const m = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const t = m * n;
    return { monthly: m, total: t, profit: t - P };
  }, [amount, rate, term]);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-4">
        <Field label={t.amount}>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </Field>
        <Field label={t.rate}>
          <input
            type="number"
            min={0}
            step={0.1}
            className={inputClass}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
        </Field>
        <Field label={t.term}>
          <input
            type="number"
            min={1}
            className={inputClass}
            value={term}
            onChange={(e) => setTerm(Number(e.target.value))}
          />
        </Field>
      </div>

      <div className="flex flex-col justify-between gap-4">
        <ResultsCard>
          <ResultRow label={t.monthly} value={formatCurrency(monthly, locale)} emphasize />
          <ResultRow label={t.total} value={formatCurrency(total, locale)} />
          <ResultRow label={t.profit} value={formatCurrency(profit, locale)} />
        </ResultsCard>
        <p className="text-xs leading-relaxed text-[var(--ink-3)]">{t.note}</p>
      </div>
    </div>
  );
}
