"use client";

import { useMemo, useState } from "react";
import { Field, inputClass, selectClass, ResultRow, ResultsCard, formatCurrency } from "./CalculatorShell";

const TEXT = {
  en: {
    mode: "Calculate",
    addVat: "Add VAT to a net price",
    removeVat: "Remove VAT from a gross price",
    amount: "Amount (SAR)",
    rate: "VAT rate (%)",
    net: "Price before VAT",
    vatAmount: "VAT amount",
    gross: "Price including VAT",
    note: "Saudi Arabia's standard VAT rate is 15% (raised from 5% in July 2020). Some goods and services are zero-rated or exempt (e.g. certain financial services, some healthcare and education) — this calculator assumes the standard rate applies to your amount.",
  },
  ar: {
    mode: "الحساب",
    addVat: "إضافة الضريبة إلى سعر صافٍ",
    removeVat: "استخراج الضريبة من سعر شامل",
    amount: "المبلغ (ريال)",
    rate: "نسبة ضريبة القيمة المضافة (%)",
    net: "السعر قبل الضريبة",
    vatAmount: "قيمة الضريبة",
    gross: "السعر شاملًا الضريبة",
    note: "النسبة الأساسية لضريبة القيمة المضافة في السعودية 15% (رُفعت من 5% في يوليو 2020). بعض السلع والخدمات معفاة أو بنسبة صفر (مثل بعض الخدمات المالية والرعاية الصحية والتعليم) — تفترض هذه الحاسبة تطبيق النسبة الأساسية على مبلغك.",
  },
};

export default function VATCalculator({ locale }: { locale: string }) {
  const t = TEXT[locale === "ar" ? "ar" : "en"];
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(15);

  const { net, vatAmount, gross } = useMemo(() => {
    const r = rate / 100;
    if (mode === "add") {
      const n = amount;
      const v = n * r;
      return { net: n, vatAmount: v, gross: n + v };
    }
    const g = amount;
    const n = g / (1 + r);
    return { net: n, vatAmount: g - n, gross: g };
  }, [mode, amount, rate]);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-4">
        <Field label={t.mode}>
          <select
            className={selectClass}
            value={mode}
            onChange={(e) => setMode(e.target.value as "add" | "remove")}
          >
            <option value="add">{t.addVat}</option>
            <option value="remove">{t.removeVat}</option>
          </select>
        </Field>
        <Field label={t.amount}>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
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
        <p className="text-xs leading-relaxed text-[var(--ink-3)]">{t.note}</p>
      </div>

      <div className="flex flex-col justify-between gap-4">
        <ResultsCard>
          <ResultRow label={t.net} value={formatCurrency(net, locale)} />
          <ResultRow label={t.vatAmount} value={formatCurrency(vatAmount, locale)} />
          <ResultRow label={t.gross} value={formatCurrency(gross, locale)} emphasize />
        </ResultsCard>
      </div>
    </div>
  );
}
