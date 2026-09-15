"use client";

import { buildBnplSchedule } from "@/lib/calculations";
import { useMemo, useState } from "react";
import { Field, inputClass, selectClass, formatCurrency } from "./CalculatorShell";

const TEXT = {
  en: {
    price: "Purchase price (SAR)",
    installments: "Number of installments",
    frequency: "Frequency",
    biweekly: "Every 2 weeks",
    monthly: "Monthly",
    perInstallment: "Per installment",
    schedule: "Payment schedule",
    installmentLabel: (n: number) => `Installment ${n}`,
    note: "This calculator assumes a fee-free split; check the actual fees and schedule at checkout. Tamara states that it charges no late fees in Saudi Arabia, but missed payments can still affect account access and credit history. Other providers and products have their own terms.",
  },
  ar: {
    price: "سعر الشراء (ريال)",
    installments: "عدد الأقساط",
    frequency: "التكرار",
    biweekly: "كل أسبوعين",
    monthly: "شهريًا",
    perInstallment: "قيمة القسط",
    schedule: "جدول السداد",
    installmentLabel: (n: number) => `القسط ${n}`,
    note: "تفترض هذه الحاسبة تقسيمًا دون رسوم؛ تحقق من الرسوم والجدول الفعلي عند الشراء. توضح تمارا عدم فرض رسوم تأخير في السعودية، لكن التأخر قد يؤثر على استخدام الحساب والسجل الائتماني. للمزودين والمنتجات الأخرى شروطهم الخاصة.",
  },
};

export default function BNPLCalculator({ locale }: { locale: string }) {
  const t = TEXT[locale === "ar" ? "ar" : "en"];
  const [price, setPrice] = useState(1200);
  const [installments, setInstallments] = useState(4);
  const [frequency, setFrequency] = useState<"biweekly" | "monthly">("monthly");

  const [start, setStart] = useState("");
  const schedule = useMemo(() => buildBnplSchedule(price, installments, start, frequency), [price, installments, start, frequency]);

  const dateFormatter = new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-GB", {
    calendar: "gregory",
    timeZone: "UTC",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-4">
        <Field label={t.price}>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={Number.isFinite(price) ? price : ""}
            onChange={(e) => setPrice(e.target.value === "" ? NaN : Number(e.target.value))}
          />
        </Field>
        <Field label={t.installments}>
          <input
            type="number"
            min={1}
            max={24}
            className={inputClass}
            value={Number.isFinite(installments) ? installments : ""}
            onChange={(e) => setInstallments(e.target.value === "" ? NaN : Number(e.target.value))}
          />
        </Field>
        <Field label={locale === "ar" ? "تاريخ الدفعة الأولى (ميلادي)" : "First payment date (Gregorian)"}>
          <input type="date" className={inputClass} value={start} onChange={(e) => setStart(e.target.value)} />
        </Field>
        <Field label={t.frequency}>
          <select
            className={selectClass}
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as "biweekly" | "monthly")}
          >
            <option value="biweekly">{t.biweekly}</option>
            <option value="monthly">{t.monthly}</option>
          </select>
        </Field>
        <p className="text-xs leading-relaxed text-[var(--ink-3)]">{t.note}</p>
      </div>

      <div className="rounded-xl border border-[var(--rule)] bg-[var(--teal-soft)] px-5 py-4">
        <p className="text-sm font-semibold text-[var(--ink-2)]">{t.schedule}</p>
        {!schedule && <p className="mt-3 text-sm" role="status">{locale === "ar" ? "اختر تاريخ الدفعة الأولى وأدخل سعرًا صحيحًا وعدد أقساط صحيحًا من 1 إلى 24." : "Choose a first payment date and enter a valid price and 1–24 whole installments."}</p>}
        <ul className="mt-3 flex flex-col divide-y divide-[var(--rule)]">
          {schedule?.map((entry, i) => (
            <li key={i} className="flex items-center justify-between gap-3 flex-wrap py-2 text-sm">
              <span className="text-[var(--ink-3)]">{t.installmentLabel(i + 1)}</span>
              <span className="text-[var(--ink-3)]">{dateFormatter.format(entry.date)}</span>
              <span className="font-bold text-[var(--teal-dark)]">
                {formatCurrency(entry.amount, locale)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
