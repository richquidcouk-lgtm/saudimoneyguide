"use client";

import { calculateGratuity } from "@/lib/calculations";
import { useMemo, useState } from "react";
import { Field, inputClass, selectClass, ResultRow, ResultsCard, formatCurrency } from "./CalculatorShell";

const TEXT = {
  en: {
    salary: "Last monthly wage — basic + fixed allowances (SAR)",
    years: "Years of service",
    reason: "Reason for leaving",
    resigned: "Resigned",
    terminated: "Terminated by employer",
    fullAmount: "Full gratuity (reference)",
    due: "Estimated gratuity due",
    note: "Based on Saudi Labor Law Articles 84–87: half a month's wage per year for the first 5 years, then a full month's wage per year after that. \"Wage\" here means your last basic salary plus any regular fixed allowances (e.g. housing, transport) — not basic salary alone. Resignation reduces this — under 2 years: none, 2–5 years: 1/3, over 5 but under 10 years: 2/3, 10+ years: full amount. Termination by the employer (not for a disciplinary reason under Article 80) is normally paid in full, and Article 87 grants the full amount regardless of tenure in specific cases (e.g. a female worker resigning within 6 months of marriage or 3 months of childbirth, or termination due to force majeure). This is an estimate only — confirm your exact entitlement with the Ministry of Human Resources (Qiwa) or a labor lawyer, as contract terms and recent law changes can affect the calculation.",
  },
  ar: {
    salary: "آخر أجر شهري — الأساسي + البدلات الثابتة (ريال)",
    years: "سنوات الخدمة",
    reason: "سبب انتهاء الخدمة",
    resigned: "استقالة",
    terminated: "إنهاء الخدمة من صاحب العمل",
    fullAmount: "المكافأة الكاملة (مرجعية)",
    due: "المكافأة التقديرية المستحقة",
    note: "بناءً على المواد 84–87 من نظام العمل السعودي: نصف أجر شهر عن كل سنة من السنوات الخمس الأولى، ثم أجر شهر كامل عن كل سنة بعدها. \"الأجر\" هنا يعني آخر راتب أساسي مضافًا إليه أي بدلات ثابتة منتظمة (كالسكن والنقل)، وليس الراتب الأساسي وحده. الاستقالة تُخفّض هذا المبلغ — أقل من سنتين: لا شيء، من 2 إلى 5 سنوات: الثلث، أكثر من 5 وأقل من 10 سنوات: الثلثان، 10 سنوات فأكثر: المبلغ كاملاً. إنهاء الخدمة من صاحب العمل (لغير الأسباب التأديبية بالمادة 80) يُدفع عادة كاملاً، وتمنح المادة 87 المكافأة كاملة بغض النظر عن مدة الخدمة في حالات محددة (مثل استقالة العاملة خلال 6 أشهر من الزواج أو 3 أشهر من الولادة، أو إنهاء الخدمة بسبب قوة قاهرة). هذا تقدير فقط — تأكد من استحقاقك الدقيق عبر وزارة الموارد البشرية (قوى) أو محامٍ متخصص في العمل، لأن بنود العقد والتعديلات الأخيرة على النظام قد تؤثر في الحساب.",
  },
};

export default function GratuityCalculator({ locale }: { locale: string }) {
  const t = TEXT[locale === "ar" ? "ar" : "en"];
  const [salary, setSalary] = useState(8000);
  const [years, setYears] = useState(6);
  const [reason, setReason] = useState<"resigned" | "terminated">("terminated");

  const result = useMemo(() => calculateGratuity(salary, years, reason === "resigned"), [salary, years, reason]);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-4">
        <Field label={t.salary}>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={Number.isFinite(salary) ? salary : ""}
            onChange={(e) => setSalary(e.target.value === "" ? NaN : Number(e.target.value))}
          />
        </Field>
        <Field label={t.years}>
          <input
            type="number"
            min={0}
            step={0.01} max={100}
            className={inputClass}
            value={Number.isFinite(years) ? years : ""}
            onChange={(e) => setYears(e.target.value === "" ? NaN : Number(e.target.value))}
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
          {result ? <>
          <ResultRow label={t.fullAmount} value={formatCurrency(result.fullAmount, locale)} />
          <ResultRow label={t.due} value={formatCurrency(result.due, locale)} emphasize />
                  </> : <p role="alert">{locale === "ar" ? "تحقق من المدخلات: مبالغ غير سالبة ونسب من 0 إلى 100 ومدد ضمن الحدود الموضحة." : "Check your inputs: use non-negative amounts, rates from 0 to 100, and terms within the stated limits."}</p>}
        </ResultsCard>
        <p className="text-xs leading-relaxed text-[var(--ink-3)]">{t.note} <a className="underline" href="https://www.hrsd.gov.sa/sites/default/files/2025-12/awareness-guide-on-the-rights-and-duties-of-employers-and-workers.pdf">{locale === "ar" ? "المصدر: وزارة الموارد البشرية" : "Source: HRSD (2025)"}</a></p>
      </div>
    </div>
  );
}
