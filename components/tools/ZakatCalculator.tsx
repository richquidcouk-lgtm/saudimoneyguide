"use client";

import { useMemo, useState } from "react";
import { Field, inputClass, ResultRow, ResultsCard, formatCurrency } from "./CalculatorShell";

const TEXT = {
  en: {
    cash: "Cash & bank balances (SAR)",
    gold: "Value of gold & silver held as savings (SAR)",
    investments: "Other zakatable investments (SAR)",
    debts: "Short-term debts due (SAR)",
    goldPrice: "Current gold price (SAR per gram)",
    nisab: "Nisab threshold (85g gold)",
    netWealth: "Net zakatable wealth",
    due: "Zakat due (2.5%)",
    belowNisab: "Below Nisab — no Zakat due this year",
    note: "This is a simplified estimate for cash, savings, gold/silver and investments — it does not cover business inventory, agricultural Zakat, or livestock. Personal-use jewelry is a matter of scholarly difference; many scholars exclude it, some include it. For a precise calculation, especially for business assets, consult a qualified Islamic finance scholar or your local Zakat authority.",
  },
  ar: {
    cash: "النقد وأرصدة الحسابات البنكية (ريال)",
    gold: "قيمة الذهب والفضة المدّخرة (ريال)",
    investments: "استثمارات أخرى زكوية (ريال)",
    debts: "ديون قصيرة الأجل مستحقة (ريال)",
    goldPrice: "سعر الذهب الحالي (ريال للجرام)",
    nisab: "حد النصاب (85 جرام ذهب)",
    netWealth: "صافي المال الزكوي",
    due: "الزكاة الواجبة (2.5%)",
    belowNisab: "أقل من النصاب — لا زكاة واجبة هذا العام",
    note: "هذا تقدير مبسّط للنقد والمدخرات والذهب/الفضة والاستثمارات — ولا يشمل زكاة عروض التجارة أو الزراعة أو الأنعام. حلي الاستخدام الشخصي مسألة خلافية بين العلماء؛ يستثنيها بعضهم ويُدخلها آخرون. للحصول على حساب دقيق، خصوصًا لأصول الأعمال التجارية، استشر عالمًا شرعيًا مختصًا أو الجهة المعنية بالزكاة.",
  },
};

export default function ZakatCalculator({ locale }: { locale: string }) {
  const t = TEXT[locale === "ar" ? "ar" : "en"];
  const [cash, setCash] = useState(20000);
  const [gold, setGold] = useState(0);
  const [investments, setInvestments] = useState(0);
  const [debts, setDebts] = useState(0);
  const [goldPrice, setGoldPrice] = useState(300);

  const { nisabValue, netWealth, due, aboveNisab } = useMemo(() => {
    const nisab = goldPrice * 85;
    const net = Math.max(0, cash + gold + investments - debts);
    const above = net >= nisab;
    return {
      nisabValue: nisab,
      netWealth: net,
      due: above ? net * 0.025 : 0,
      aboveNisab: above,
    };
  }, [cash, gold, investments, debts, goldPrice]);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-4">
        <Field label={t.cash}>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={cash}
            onChange={(e) => setCash(Number(e.target.value))}
          />
        </Field>
        <Field label={t.gold}>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={gold}
            onChange={(e) => setGold(Number(e.target.value))}
          />
        </Field>
        <Field label={t.investments}>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={investments}
            onChange={(e) => setInvestments(Number(e.target.value))}
          />
        </Field>
        <Field label={t.debts}>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={debts}
            onChange={(e) => setDebts(Number(e.target.value))}
          />
        </Field>
        <Field label={t.goldPrice}>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={goldPrice}
            onChange={(e) => setGoldPrice(Number(e.target.value))}
          />
        </Field>
      </div>

      <div className="flex flex-col justify-between gap-4">
        <ResultsCard>
          <ResultRow label={t.nisab} value={formatCurrency(nisabValue, locale)} />
          <ResultRow label={t.netWealth} value={formatCurrency(netWealth, locale)} />
          <ResultRow
            label={t.due}
            value={aboveNisab ? formatCurrency(due, locale) : t.belowNisab}
            emphasize={aboveNisab}
          />
        </ResultsCard>
        <p className="text-xs leading-relaxed text-[var(--ink-3)]">{t.note}</p>
      </div>
    </div>
  );
}
