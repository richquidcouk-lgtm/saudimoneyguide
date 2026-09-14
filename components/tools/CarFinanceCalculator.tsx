"use client";

import { useMemo, useState } from "react";
import { Field, inputClass, ResultRow, ResultsCard, formatCurrency } from "./CalculatorShell";

const TEXT = {
  en: {
    price: "Car price (SAR)",
    downPayment: "Down payment (SAR)",
    rate: "Annual profit rate (%)",
    term: "Term (months)",
    financedAmount: "Amount financed",
    monthly: "Monthly installment",
    total: "Total repayment",
    profit: "Total profit over the term",
    note: "Most Saudi bank car finance is structured as Murabaha — the bank buys the car and sells it to you at a disclosed markup, paid in fixed installments. Rates depend on your SIMAH score, the car's value, and your down payment — this is a planning estimate, not a bank quote.",
  },
  ar: {
    price: "سعر السيارة (ريال)",
    downPayment: "الدفعة المقدمة (ريال)",
    rate: "نسبة الربح السنوية (%)",
    term: "المدة (بالأشهر)",
    financedAmount: "المبلغ الممول",
    monthly: "القسط الشهري",
    total: "إجمالي المبلغ المسدد",
    profit: "إجمالي الربح على مدة التمويل",
    note: "معظم تمويل السيارات من البنوك السعودية مُهيكل كمرابحة — يشتري البنك السيارة ويبيعها لك بهامش ربح مُعلَن، يُسدَّد على أقساط ثابتة. تعتمد النسبة على درجتك في سِمَه وقيمة السيارة والدفعة المقدمة — هذا تقدير للتخطيط، وليس عرض بنك فعلي.",
  },
};

export default function CarFinanceCalculator({ locale }: { locale: string }) {
  const t = TEXT[locale === "ar" ? "ar" : "en"];
  const [price, setPrice] = useState(90000);
  const [downPayment, setDownPayment] = useState(18000);
  const [rate, setRate] = useState(4.5);
  const [term, setTerm] = useState(48);

  const { financed, monthly, total, profit } = useMemo(() => {
    const P = Math.max(0, price - downPayment);
    const n = Math.max(1, Math.round(term));
    const r = rate / 100 / 12;
    const m = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const tot = m * n;
    return { financed: P, monthly: m, total: tot, profit: tot - P };
  }, [price, downPayment, rate, term]);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-4">
        <Field label={t.price}>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </Field>
        <Field label={t.downPayment}>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
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
            max={72}
            className={inputClass}
            value={term}
            onChange={(e) => setTerm(Number(e.target.value))}
          />
        </Field>
      </div>

      <div className="flex flex-col justify-between gap-4">
        <ResultsCard>
          <ResultRow label={t.financedAmount} value={formatCurrency(financed, locale)} />
          <ResultRow label={t.monthly} value={formatCurrency(monthly, locale)} emphasize />
          <ResultRow label={t.total} value={formatCurrency(total, locale)} />
          <ResultRow label={t.profit} value={formatCurrency(profit, locale)} />
        </ResultsCard>
        <p className="text-xs leading-relaxed text-[var(--ink-3)]">{t.note}</p>
      </div>
    </div>
  );
}
