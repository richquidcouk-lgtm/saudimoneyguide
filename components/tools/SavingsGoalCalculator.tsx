"use client";

import { useMemo, useState } from "react";
import { Field, inputClass, ResultRow, ResultsCard, formatCurrency } from "./CalculatorShell";

const TEXT = {
  en: {
    goal: "Savings goal (SAR)",
    current: "Amount saved already (SAR)",
    months: "Time to reach goal (months)",
    rate: "Expected annual return (%)",
    required: "Required monthly saving",
    totalContributed: "Total you'll contribute",
    growth: "Growth from returns",
    note: "Set the annual return to 0% if you're saving in a plain account. Only use a higher number if it reflects a real, specific product you're actually using — a savings goal calculator that assumes optimistic returns will just tell you to save less than you actually need to.",
  },
  ar: {
    goal: "هدف الادخار (ريال)",
    current: "المبلغ المدّخر حاليًا (ريال)",
    months: "المدة للوصول للهدف (بالأشهر)",
    rate: "العائد السنوي المتوقع (%)",
    required: "الادخار الشهري المطلوب",
    totalContributed: "إجمالي ما ستساهم به",
    growth: "النمو من العائد",
    note: "اجعل العائد السنوي 0% إذا كنت تدّخر في حساب عادي بدون عائد. استخدم رقمًا أعلى فقط إذا كان يعكس منتجًا حقيقيًا ومحددًا تستخدمه فعليًا — حاسبة هدف ادخار تفترض عوائد متفائلة ستُخبرك بادخار أقل مما تحتاجه فعليًا.",
  },
};

export default function SavingsGoalCalculator({ locale }: { locale: string }) {
  const t = TEXT[locale === "ar" ? "ar" : "en"];
  const [goal, setGoal] = useState(50000);
  const [current, setCurrent] = useState(5000);
  const [months, setMonths] = useState(24);
  const [rate, setRate] = useState(0);

  const { required, totalContributed, growth } = useMemo(() => {
    const n = Math.max(1, Math.round(months));
    const r = rate / 100 / 12;
    const fvCurrent = current * Math.pow(1 + r, n);
    const remaining = Math.max(0, goal - fvCurrent);

    const pmt = r === 0 ? remaining / n : (remaining * r) / (Math.pow(1 + r, n) - 1);
    const contributed = pmt * n;
    return {
      required: pmt,
      totalContributed: contributed + current,
      growth: goal - (contributed + current),
    };
  }, [goal, current, months, rate]);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-4">
        <Field label={t.goal}>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={goal}
            onChange={(e) => setGoal(Number(e.target.value))}
          />
        </Field>
        <Field label={t.current}>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={current}
            onChange={(e) => setCurrent(Number(e.target.value))}
          />
        </Field>
        <Field label={t.months}>
          <input
            type="number"
            min={1}
            className={inputClass}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
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
      </div>

      <div className="flex flex-col justify-between gap-4">
        <ResultsCard>
          <ResultRow label={t.required} value={formatCurrency(required, locale)} emphasize />
          <ResultRow label={t.totalContributed} value={formatCurrency(totalContributed, locale)} />
          <ResultRow label={t.growth} value={formatCurrency(Math.max(0, growth), locale)} />
        </ResultsCard>
        <p className="text-xs leading-relaxed text-[var(--ink-3)]">{t.note}</p>
      </div>
    </div>
  );
}
