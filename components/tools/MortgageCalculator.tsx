"use client";

import { useMemo, useState } from "react";
import { Field, inputClass, ResultRow, ResultsCard, formatCurrency } from "./CalculatorShell";

const TEXT = {
  en: {
    price: "Property price (SAR)",
    downPayment: "Down payment (SAR)",
    rate: "Annual profit rate (%)",
    term: "Term (years)",
    financedAmount: "Amount financed",
    monthly: "Monthly installment",
    total: "Total repayment",
    profit: "Total profit over the term",
    note: "This estimates a standard Islamic home finance (Murabaha-style) repayment — see our Islamic finance guide for how that differs from a conventional mortgage. Real offers vary by bank, your SIMAH score, and whether you use a program like REDF or Sakani alongside bank financing — treat this as a starting estimate, not a formal offer.",
  },
  ar: {
    price: "سعر العقار (ريال)",
    downPayment: "الدفعة المقدمة (ريال)",
    rate: "نسبة الربح السنوية (%)",
    term: "المدة (بالسنوات)",
    financedAmount: "المبلغ الممول",
    monthly: "القسط الشهري",
    total: "إجمالي المبلغ المسدد",
    profit: "إجمالي الربح على مدة التمويل",
    note: "تقدّر هذه الحاسبة سداد تمويل عقاري إسلامي قياسي (على نمط المرابحة) — راجع دليلنا عن التمويل الإسلامي لمعرفة الفرق عن الرهن العقاري التقليدي. العروض الفعلية تختلف حسب البنك ودرجتك في سِمَه وما إذا كنت تستخدم برنامجًا مثل صندوق التنمية العقارية أو سكني إلى جانب تمويل البنك — اعتبر هذا تقديرًا أوليًا لا عرضًا رسميًا.",
  },
};

export default function MortgageCalculator({ locale }: { locale: string }) {
  const t = TEXT[locale === "ar" ? "ar" : "en"];
  const [price, setPrice] = useState(800000);
  const [downPayment, setDownPayment] = useState(160000);
  const [rate, setRate] = useState(5);
  const [term, setTerm] = useState(25);

  const { financed, monthly, total, profit } = useMemo(() => {
    const P = Math.max(0, price - downPayment);
    const n = Math.max(1, Math.round(term * 12));
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
            max={30}
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
