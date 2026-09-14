"use client";

import { useMemo, useState } from "react";
import { Field, inputClass, selectClass, ResultRow, ResultsCard, formatCurrency } from "./CalculatorShell";

const TEXT = {
  en: {
    salary: "Last basic monthly salary (SAR)",
    years: "Years of service",
    reason: "Reason for leaving",
    resigned: "Resigned",
    terminated: "Terminated by employer",
    fullAmount: "Full gratuity (reference)",
    due: "Estimated gratuity due",
    note: "Based on Saudi Labor Law Articles 84–87: half a month's wage per year for the first 5 years, then a full month's wage per year after that. Resignation reduces this — under 2 years: none, 2–5 years: 1/3, 5–10 years: 2/3, 10+ years: full amount. Termination by the employer (not for a disciplinary reason under Article 80) is normally paid in full. This is an estimate only — confirm your exact entitlement with the Ministry of Human Resources (Qiwa) or a labor lawyer, as contract terms and recent law changes can affect the calculation.",
  },
  ar: {
    salary: "آخر راتب أساسي شهري (ريال)",
    years: "سنوات الخدمة",
    reason: "سبب انتهاء الخدمة",
    resigned: "استقالة",
    terminated: "إنهاء الخدمة من صاحب العمل",
    fullAmount: "المكافأة الكاملة (مرجعية)",
    due: "المكافأة التقديرية المستحقة",
    note: "بناءً على المواد 84–87 من نظام العمل السعودي: نصف أجر شهر عن كل سنة من السنوات الخمس الأولى، ثم أجر شهر كامل عن كل سنة بعدها. الاستقالة تُخفّض هذا المبلغ — أقل من سنتين: لا شيء، من 2 إلى 5 سنوات: الثلث، من 5 إلى 10 سنوات: الثلثان، 10 سنوات فأكثر: المبلغ كاملاً. إنهاء الخدمة من صاحب العمل (لغير الأسباب التأديبية بالمادة 80) يُدفع عادة كاملاً. هذا تقدير فقط — تأكد من استحقاقك الدقيق عبر وزارة الموارد البشرية (قوى) أو محامٍ متخصص في العمل، لأن بنود العقد والتعديلات الأخيرة على النظام قد تؤثر في الحساب.",
  },
};

export default function GratuityCalculator({ locale }: { locale: string }) {
  const t = TEXT[locale === "ar" ? "ar" : "en"];
  const [salary, setSalary] = useState(8000);
  const [years, setYears] = useState(6);
  const [reason, setReason] = useState<"resigned" | "terminated">("terminated");

  const { fullAmount, due } = useMemo(() => {
    const y = Math.max(0, years);
    const firstFive = Math.min(y, 5);
    const afterFive = Math.max(0, y - 5);
    const full = firstFive * 0.5 * salary + afterFive * salary;

    let multiplier = 1;
    if (reason === "resigned") {
      if (y < 2) multiplier = 0;
      else if (y < 5) multiplier = 1 / 3;
      else if (y < 10) multiplier = 2 / 3;
      else multiplier = 1;
    }

    return { fullAmount: full, due: full * multiplier };
  }, [salary, years, reason]);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-4">
        <Field label={t.salary}>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
          />
        </Field>
        <Field label={t.years}>
          <input
            type="number"
            min={0}
            step={0.5}
            className={inputClass}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
        </Field>
        <Field label={t.reason}>
          <select
            className={selectClass}
            value={reason}
            onChange={(e) => setReason(e.target.value as "resigned" | "terminated")}
          >
            <option value="terminated">{t.terminated}</option>
            <option value="resigned">{t.resigned}</option>
          </select>
        </Field>
      </div>

      <div className="flex flex-col justify-between gap-4">
        <ResultsCard>
          <ResultRow label={t.fullAmount} value={formatCurrency(fullAmount, locale)} />
          <ResultRow label={t.due} value={formatCurrency(due, locale)} emphasize />
        </ResultsCard>
        <p className="text-xs leading-relaxed text-[var(--ink-3)]">{t.note}</p>
      </div>
    </div>
  );
}
