"use client";

import { useMemo, useState } from "react";
import { Field, inputClass, ResultRow, ResultsCard, formatCurrency } from "./CalculatorShell";

const TEXT = {
  en: {
    initial: "Starting amount (SAR)",
    monthly: "Monthly contribution (SAR)",
    rate: "Expected annual return (%)",
    years: "Time horizon (years)",
    futureValue: "Projected value",
    contributed: "Total you'll contribute",
    growth: "Projected growth",
    note: "This is a projection based on a constant assumed return — real investments fluctuate, and past or expected performance is never guaranteed. Nothing here is investment advice; it's a way to see how starting amount, monthly contributions, time, and rate interact. See our guide to investing in Saudi Arabia before choosing an actual return assumption.",
  },
  ar: {
    initial: "المبلغ الابتدائي (ريال)",
    monthly: "المساهمة الشهرية (ريال)",
    rate: "العائد السنوي المتوقع (%)",
    years: "الأفق الزمني (بالسنوات)",
    futureValue: "القيمة المتوقعة",
    contributed: "إجمالي ما ستساهم به",
    growth: "النمو المتوقع",
    note: "هذا إسقاط مبني على عائد ثابت مفترض — الاستثمارات الحقيقية تتقلب، والأداء الماضي أو المتوقع غير مضمون أبدًا. لا يُعتبر هذا نصيحة استثمارية؛ إنه وسيلة لرؤية كيف يتفاعل المبلغ الابتدائي والمساهمات الشهرية والوقت والنسبة. راجع دليلنا عن الاستثمار في السعودية قبل اختيار افتراض عائد فعلي.",
  },
};

export default function InvestmentGrowthCalculator({ locale }: { locale: string }) {
  const t = TEXT[locale === "ar" ? "ar" : "en"];
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(1000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(10);

  const { futureValue, contributed, growth } = useMemo(() => {
    const n = Math.max(1, Math.round(years * 12));
    const r = rate / 100 / 12;
    const fvInitial = initial * Math.pow(1 + r, n);
    const fvContributions = r === 0 ? monthly * n : monthly * ((Math.pow(1 + r, n) - 1) / r);
    const fv = fvInitial + fvContributions;
    const totalContributed = initial + monthly * n;
    return { futureValue: fv, contributed: totalContributed, growth: fv - totalContributed };
  }, [initial, monthly, rate, years]);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-4">
        <Field label={t.initial}>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={initial}
            onChange={(e) => setInitial(Number(e.target.value))}
          />
        </Field>
        <Field label={t.monthly}>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
          />
        </Field>
        <Field label={t.rate}>
          <input
            type="number"
            min={0}
            step={0.5}
            className={inputClass}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
        </Field>
        <Field label={t.years}>
          <input
            type="number"
            min={1}
            max={50}
            className={inputClass}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
        </Field>
      </div>

      <div className="flex flex-col justify-between gap-4">
        <ResultsCard>
          <ResultRow label={t.futureValue} value={formatCurrency(futureValue, locale)} emphasize />
          <ResultRow label={t.contributed} value={formatCurrency(contributed, locale)} />
          <ResultRow label={t.growth} value={formatCurrency(growth, locale)} />
        </ResultsCard>
        <p className="text-xs leading-relaxed text-[var(--ink-3)]">{t.note}</p>
      </div>
    </div>
  );
}
