"use client";

import { useMemo, useState } from "react";
import { Field, inputClass, selectClass, ResultRow, ResultsCard, formatCurrency } from "./CalculatorShell";

const TEXT = {
  en: {
    basic: "Basic monthly salary (SAR)",
    allowances: "Housing & other allowances (SAR)",
    nationality: "Nationality",
    saudi: "Saudi national",
    nonSaudi: "Non-Saudi (expat)",
    gosiRate: "Your GOSI employee deduction (%)",
    gross: "Gross monthly salary",
    gosiAmount: "GOSI deduction",
    net: "Estimated take-home salary",
    note: "GOSI (social insurance) deductions apply mainly to Saudi employees — pension plus unemployment insurance (SANED). The contributory wage is capped at SAR 45,000/month, so very high earners see a smaller effective deduction than the flat percentage below suggests. GOSI is also phasing in higher rates gradually (System B) for employees who joined after July 2024, rising toward 11.75% by 2028 — the figure below is the current baseline. Non-Saudi employees usually have no employee-side GOSI deduction (only an employer-paid occupational hazards contribution, which doesn't reduce your salary). The percentage above is editable because exact rates and your specific wage basis vary — confirm the current rate and cap on gosi.gov.sa. This estimate doesn't include income tax, since Saudi Arabia does not levy personal income tax on employment salaries.",
  },
  ar: {
    basic: "الراتب الأساسي الشهري (ريال)",
    allowances: "بدل السكن والبدلات الأخرى (ريال)",
    nationality: "الجنسية",
    saudi: "سعودي الجنسية",
    nonSaudi: "غير سعودي (مقيم)",
    gosiRate: "نسبة خصم التأمينات الاجتماعية على الموظف (%)",
    gross: "إجمالي الراتب الشهري",
    gosiAmount: "خصم التأمينات الاجتماعية",
    net: "صافي الراتب التقديري",
    note: "تُطبَّق خصومات التأمينات الاجتماعية (جوسي) بشكل أساسي على الموظفين السعوديين — التقاعد بالإضافة إلى التأمين ضد التعطل عن العمل (ساند). الأجر الخاضع للاشتراك محدود بسقف 45,000 ريال شهريًا، لذا ذوو الدخل المرتفع جدًا يرون خصمًا فعليًا أقل نسبيًا مما توحي به النسبة الثابتة أدناه. كما تطبّق جوسي زيادة تدريجية في النسب (المسار ب) للموظفين المنضمين بعد يوليو 2024، ترتفع تدريجيًا نحو 11.75% بحلول 2028 — الرقم أدناه هو النسبة الأساسية الحالية. غير السعوديين عادة لا يوجد لديهم خصم من جانب الموظف (فقط اشتراك الأخطار المهنية يدفعه صاحب العمل ولا يُخصم من الراتب). النسبة أعلاه قابلة للتعديل لأن النسب الرسمية والأساس الدقيق لراتبك قد يختلفان — تأكد من النسبة والسقف الحاليين عبر موقع gosi.gov.sa. هذا التقدير لا يشمل ضريبة الدخل، حيث لا تفرض السعودية ضريبة دخل شخصية على رواتب الموظفين.",
  },
};

export default function SalaryCalculator({ locale }: { locale: string }) {
  const t = TEXT[locale === "ar" ? "ar" : "en"];
  const [basic, setBasic] = useState(10000);
  const [allowances, setAllowances] = useState(2000);
  const [nationality, setNationality] = useState<"saudi" | "nonSaudi">("saudi");
  const [gosiRate, setGosiRate] = useState(9.75);

  const { gross, gosiAmount, net } = useMemo(() => {
    const g = basic + allowances;
    const rate = nationality === "saudi" ? gosiRate : 0;
    const deduction = basic * (rate / 100);
    return { gross: g, gosiAmount: deduction, net: g - deduction };
  }, [basic, allowances, nationality, gosiRate]);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-4">
        <Field label={t.basic}>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={basic}
            onChange={(e) => setBasic(Number(e.target.value))}
          />
        </Field>
        <Field label={t.allowances}>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={allowances}
            onChange={(e) => setAllowances(Number(e.target.value))}
          />
        </Field>
        <Field label={t.nationality}>
          <select
            className={selectClass}
            value={nationality}
            onChange={(e) => setNationality(e.target.value as "saudi" | "nonSaudi")}
          >
            <option value="saudi">{t.saudi}</option>
            <option value="nonSaudi">{t.nonSaudi}</option>
          </select>
        </Field>
        {nationality === "saudi" && (
          <Field label={t.gosiRate}>
            <input
              type="number"
              min={0}
              step={0.05}
              className={inputClass}
              value={gosiRate}
              onChange={(e) => setGosiRate(Number(e.target.value))}
            />
          </Field>
        )}
      </div>

      <div className="flex flex-col justify-between gap-4">
        <ResultsCard>
          <ResultRow label={t.gross} value={formatCurrency(gross, locale)} />
          <ResultRow label={t.gosiAmount} value={formatCurrency(gosiAmount, locale)} />
          <ResultRow label={t.net} value={formatCurrency(net, locale)} emphasize />
        </ResultsCard>
        <p className="text-xs leading-relaxed text-[var(--ink-3)]">{t.note}</p>
      </div>
    </div>
  );
}
