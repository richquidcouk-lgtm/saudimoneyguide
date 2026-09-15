"use client";

import { calculateSalary } from "@/lib/calculations";
import { useMemo, useState } from "react";
import { Field, inputClass, selectClass, ResultRow, ResultsCard, formatCurrency } from "./CalculatorShell";

const TEXT = {
  en: {
    basic: "Basic monthly salary (SAR)",
    housing: "Monthly housing allowance (SAR)",
    allowances: "Other monthly cash allowances (SAR)",
    nationality: "Nationality",
    saudi: "Saudi national",
    nonSaudi: "Non-Saudi (expat)",
    gosiRate: "Your GOSI employee deduction (%)",
    gross: "Gross monthly salary",
    gosiAmount: "GOSI deduction",
    net: "Estimated take-home salary",
    note: "This estimate applies your entered employee rate to basic salary plus housing allowance, capped at SAR 45,000/month. Other cash allowances are included in take-home pay but excluded from this estimated contribution basis. The 9.75% starting rate is illustrative for the established Saudi scheme, not a universal current rate. Check your registered wage and applicable pension/SANED rate with GOSI, especially under the newer scheme or with housing in kind. The non-Saudi option assumes no employee deduction; GCC nationals and other special cases need their own calculation. Other payroll deductions are excluded.",
  },
  ar: {
    basic: "الراتب الأساسي الشهري (ريال)",
    housing: "بدل السكن الشهري (ريال)",
    allowances: "البدلات النقدية الشهرية الأخرى (ريال)",
    nationality: "الجنسية",
    saudi: "سعودي الجنسية",
    nonSaudi: "غير سعودي (مقيم)",
    gosiRate: "نسبة خصم التأمينات الاجتماعية على الموظف (%)",
    gross: "إجمالي الراتب الشهري",
    gosiAmount: "خصم التأمينات الاجتماعية",
    net: "صافي الراتب التقديري",
    note: "يطبق التقدير نسبة الموظف التي تدخلها على الأساسي وبدل السكن، بسقف 45,000 ريال شهريًا. تدخل البدلات النقدية الأخرى في صافي الراتب ولا تدخل في أساس الاشتراك التقديري هنا. نسبة البداية 9.75% مثال للنظام السابق للسعوديين وليست نسبة حالية موحدة. تحقق من أجرك المسجل ونسبة المعاشات وساند لدى التأمينات الاجتماعية، خصوصًا في النظام الجديد أو عند توفير سكن عيني. يفترض خيار غير السعودي عدم وجود خصم على الموظف؛ ويحتاج مواطنو الخليج والحالات الخاصة إلى حساب منفصل. لا يشمل التقدير الخصومات الأخرى.",
  },
};

export default function SalaryCalculator({ locale }: { locale: string }) {
  const t = TEXT[locale === "ar" ? "ar" : "en"];
  const [basic, setBasic] = useState(10000);
  const [housing, setHousing] = useState(2000);
  const [allowances, setAllowances] = useState(0);
  const [nationality, setNationality] = useState<"saudi" | "nonSaudi">("saudi");
  const [gosiRate, setGosiRate] = useState(9.75);

  const result = useMemo(() => calculateSalary(basic, housing, allowances, gosiRate, nationality === "saudi"), [basic, housing, allowances, nationality, gosiRate]);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-4">
        <Field label={t.basic}>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={Number.isFinite(basic) ? basic : ""}
            onChange={(e) => setBasic(e.target.value === "" ? NaN : Number(e.target.value))}
          />
        </Field>
        <Field label={t.housing}>
          <input type="number" min={0} className={inputClass} value={Number.isFinite(housing) ? housing : ""}
            onChange={(e) => setHousing(e.target.value === "" ? NaN : Number(e.target.value))} />
        </Field>
        <Field label={t.allowances}>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={Number.isFinite(allowances) ? allowances : ""}
            onChange={(e) => setAllowances(e.target.value === "" ? NaN : Number(e.target.value))}
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
              value={Number.isFinite(gosiRate) ? gosiRate : ""}
              onChange={(e) => setGosiRate(e.target.value === "" ? NaN : Number(e.target.value))}
            />
          </Field>
        )}
      </div>

      <div className="flex flex-col justify-between gap-4">
        <ResultsCard>
          {result ? <>
          <ResultRow label={t.gross} value={formatCurrency(result.gross, locale)} />
          <ResultRow label={t.gosiAmount} value={formatCurrency(result.gosiAmount, locale)} />
          <ResultRow label={t.net} value={formatCurrency(result.net, locale)} emphasize />
                  </> : <p role="alert">{locale === "ar" ? "تحقق من المدخلات: مبالغ غير سالبة ونسب من 0 إلى 100 ومدد ضمن الحدود الموضحة." : "Check your inputs: use non-negative amounts, rates from 0 to 100, and terms within the stated limits."}</p>}
        </ResultsCard>
        <p className="text-xs leading-relaxed text-[var(--ink-3)]">{t.note} <a className="underline" href="https://www.gosi.gov.sa/GOSIOnline/FAQ_Contributor">{locale === "ar" ? "المصدر: التأمينات الاجتماعية" : "Source: GOSI"}</a></p>
      </div>
    </div>
  );
}
