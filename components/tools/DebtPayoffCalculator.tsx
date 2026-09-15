"use client";

import { calculateDebtPayoff } from "@/lib/calculations";
import { useMemo, useState } from "react";
import { Field, inputClass, ResultRow, ResultsCard, formatCurrency } from "./CalculatorShell";

const TEXT = {
  en: {
    balance: "Current balance (SAR)",
    rate: "Annual rate/profit (%)",
    payment: "Monthly payment (SAR)",
    months: "Months to pay off",
    years: "That's roughly",
    totalPaid: "Total you'll pay",
    totalCost: "Total profit/interest paid",
    tooLow: "This payment barely covers the monthly charge — the balance won't meaningfully reduce. Increase the payment.",
    note: "Works for any revolving balance with a fixed rate — a credit card, an overdraft, or a financing balance. If you're deciding between paying off several debts, tackling the highest-rate balance first (while making minimum payments on the rest) usually costs you the least overall.",
  },
  ar: {
    balance: "الرصيد الحالي (ريال)",
    rate: "النسبة السنوية/الربح (%)",
    payment: "الدفعة الشهرية (ريال)",
    months: "عدد الأشهر للسداد الكامل",
    years: "أي ما يقارب",
    totalPaid: "إجمالي ما ستدفعه",
    totalCost: "إجمالي الربح/الفائدة المدفوعة",
    tooLow: "هذه الدفعة بالكاد تغطي الرسم الشهري — الرصيد لن ينخفض فعليًا. زِد قيمة الدفعة.",
    note: "تعمل مع أي رصيد متجدد بنسبة ثابتة — بطاقة ائتمان، سحب على المكشوف، أو رصيد تمويل. إذا كنت تقرر أي دين تسدد أولاً بين عدة ديون، فسداد الرصيد ذي النسبة الأعلى أولاً (مع دفع الحد الأدنى على البقية) عادة يكلفك أقل إجمالًا.",
  },
};

export default function DebtPayoffCalculator({ locale }: { locale: string }) {
  const t = TEXT[locale === "ar" ? "ar" : "en"];
  const [balance, setBalance] = useState(15000);
  const [rate, setRate] = useState(20);
  const [payment, setPayment] = useState(800);

  const result = useMemo(() => calculateDebtPayoff(balance, rate, payment), [balance, rate, payment]);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-4">
        <Field label={t.balance}>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={Number.isFinite(balance) ? balance : ""}
            onChange={(e) => setBalance(e.target.value === "" ? NaN : Number(e.target.value))}
          />
        </Field>
        <Field label={t.rate}>
          <input
            type="number"
            min={0}
            step={0.5}
            className={inputClass}
            value={Number.isFinite(rate) ? rate : ""}
            onChange={(e) => setRate(e.target.value === "" ? NaN : Number(e.target.value))}
          />
        </Field>
        <Field label={t.payment}>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={Number.isFinite(payment) ? payment : ""}
            onChange={(e) => setPayment(e.target.value === "" ? NaN : Number(e.target.value))}
          />
        </Field>
        <p className="text-xs leading-relaxed text-[var(--ink-3)]">{t.note} {locale === "ar" ? "أقصى مدة مدعومة: 1000 سنة. لا يشمل التقدير رسوم المزوّد." : "Maximum supported payoff period: 1,000 years. Provider fees are excluded."}</p>
      </div>

      <div className="flex flex-col justify-between gap-4">
        <ResultsCard>
          {!result ? <p role="alert">{locale === "ar" ? "تحقق من المدخلات: مبالغ غير سالبة ونسب من 0 إلى 100 ومدد ضمن الحدود الموضحة." : "Check your inputs: use non-negative amounts, rates from 0 to 100, and terms within the stated limits."}</p> : result.tooLow ? (
            <p className="text-sm font-semibold text-[var(--burgundy)]">{t.tooLow}</p>
          ) : (
            <>
              <ResultRow
                label={t.months}
                value={`${result.months} (${t.years} ${(result.months / 12).toFixed(1)} ${locale === "ar" ? "سنة" : "years"})`}
                emphasize
              />
              <ResultRow label={locale === "ar" ? "الدفعة الأخيرة" : "Final payment"} value={formatCurrency(result.finalPayment, locale)} />
              <ResultRow label={t.totalPaid} value={formatCurrency(result.totalPaid, locale)} />
              <ResultRow label={t.totalCost} value={formatCurrency(result.totalCost, locale)} />
            </>
          )}
        </ResultsCard>
      </div>
    </div>
  );
}
