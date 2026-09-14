"use client";

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
    note: "Most BNPL providers in Saudi Arabia (e.g. Tamara, Tabby) charge no extra profit if you pay on time — the total you repay equals the purchase price, just split up. Missing a payment usually triggers a late fee. This calculator assumes an on-time, fee-free split — always check the provider's exact terms at checkout.",
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
    note: "معظم مزودي خدمة الدفع الآجل في السعودية (مثل تمارا وتابي) لا يفرضون أي ربح إضافي عند السداد في الموعد — إجمالي ما تسدده يساوي سعر الشراء، مقسّمًا فقط على دفعات. التأخر عن السداد يترتب عليه عادة رسوم تأخير. تفترض هذه الحاسبة سدادًا في الموعد وبدون رسوم — تأكد دائمًا من الشروط الدقيقة للمزوّد عند إتمام الشراء.",
  },
};

export default function BNPLCalculator({ locale }: { locale: string }) {
  const t = TEXT[locale === "ar" ? "ar" : "en"];
  const [price, setPrice] = useState(1200);
  const [installments, setInstallments] = useState(4);
  const [frequency, setFrequency] = useState<"biweekly" | "monthly">("biweekly");

  const { perInstallment, schedule } = useMemo(() => {
    const n = Math.max(1, Math.round(installments));
    const per = price / n;
    const intervalDays = frequency === "biweekly" ? 14 : 30;
    const today = new Date();
    const dates = Array.from({ length: n }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() + i * intervalDays);
      return d;
    });
    return { perInstallment: per, schedule: dates };
  }, [price, installments, frequency]);

  const dateFormatter = new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-GB", {
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
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </Field>
        <Field label={t.installments}>
          <input
            type="number"
            min={1}
            max={12}
            className={inputClass}
            value={installments}
            onChange={(e) => setInstallments(Number(e.target.value))}
          />
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
        <ul className="mt-3 flex flex-col divide-y divide-[var(--rule)]">
          {schedule.map((date, i) => (
            <li key={i} className="flex items-center justify-between py-2 text-sm">
              <span className="text-[var(--ink-3)]">{t.installmentLabel(i + 1)}</span>
              <span className="text-[var(--ink-3)]">{dateFormatter.format(date)}</span>
              <span className="font-bold text-[var(--teal-dark)]">
                {formatCurrency(perInstallment, locale)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
