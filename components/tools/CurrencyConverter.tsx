"use client";

import { useMemo, useState } from "react";
import { Field, inputClass, selectClass, ResultRow, ResultsCard } from "./CalculatorShell";

const TEXT = {
  en: {
    amount: "Amount",
    direction: "Convert",
    sarToOther: "SAR → foreign currency",
    otherToSar: "Foreign currency → SAR",
    currency: "Currency",
    usd: "US Dollar (USD) — fixed peg",
    other: "Other currency — enter today's rate",
    rate: "Exchange rate (1 foreign unit = ? SAR)",
    result: "Result",
    note: "The SAR/USD rate (3.75) has been fixed since 1986 — that part is always accurate. For any other currency, this tool does not fetch live rates: enter the current rate yourself from your bank or a live FX source before relying on the result, since rates move throughout the day.",
  },
  ar: {
    amount: "المبلغ",
    direction: "التحويل",
    sarToOther: "ريال سعودي ← عملة أجنبية",
    otherToSar: "عملة أجنبية ← ريال سعودي",
    currency: "العملة",
    usd: "دولار أمريكي (USD) — سعر ثابت",
    other: "عملة أخرى — أدخل السعر الحالي",
    rate: "سعر الصرف (1 وحدة أجنبية = ؟ ريال)",
    result: "النتيجة",
    note: "سعر صرف الريال مقابل الدولار (3.75) ثابت منذ عام 1986 — هذا الجزء دقيق دائمًا. أما لأي عملة أخرى، فهذه الأداة لا تجلب أسعارًا مباشرة: أدخل السعر الحالي بنفسك من بنكك أو مصدر أسعار صرف مباشر قبل الاعتماد على النتيجة، لأن الأسعار تتغير خلال اليوم.",
  },
};

export default function CurrencyConverter({ locale }: { locale: string }) {
  const t = TEXT[locale === "ar" ? "ar" : "en"];
  const [amount, setAmount] = useState(1000);
  const [direction, setDirection] = useState<"sarToOther" | "otherToSar">("sarToOther");
  const [currency, setCurrency] = useState<"usd" | "other">("usd");
  const [customRate, setCustomRate] = useState(1);

  const rate = currency === "usd" ? 3.75 : customRate;

  const result = useMemo(() => {
    if (!rate || rate <= 0) return 0;
    return direction === "sarToOther" ? amount / rate : amount * rate;
  }, [amount, rate, direction]);

  const numberFormatter = new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", {
    maximumFractionDigits: 2,
  });

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-4">
        <Field label={t.direction}>
          <select
            className={selectClass}
            value={direction}
            onChange={(e) => setDirection(e.target.value as "sarToOther" | "otherToSar")}
          >
            <option value="sarToOther">{t.sarToOther}</option>
            <option value="otherToSar">{t.otherToSar}</option>
          </select>
        </Field>
        <Field label={t.currency}>
          <select
            className={selectClass}
            value={currency}
            onChange={(e) => setCurrency(e.target.value as "usd" | "other")}
          >
            <option value="usd">{t.usd}</option>
            <option value="other">{t.other}</option>
          </select>
        </Field>
        {currency === "other" && (
          <Field label={t.rate}>
            <input
              type="number"
              min={0}
              step={0.001}
              className={inputClass}
              value={customRate}
              onChange={(e) => setCustomRate(Number(e.target.value))}
            />
          </Field>
        )}
        <Field label={t.amount}>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </Field>
      </div>

      <div className="flex flex-col justify-between gap-4">
        <ResultsCard>
          <ResultRow label={t.result} value={numberFormatter.format(result)} emphasize />
        </ResultsCard>
        <p className="text-xs leading-relaxed text-[var(--ink-3)]">{t.note}</p>
      </div>
    </div>
  );
}
