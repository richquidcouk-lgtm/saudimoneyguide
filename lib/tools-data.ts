export type ToolMeta = {
  slug: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
};

export const TOOLS: ToolMeta[] = [
  {
    slug: "loan-calculator",
    titleEn: "Personal Loan Calculator",
    titleAr: "حاسبة التمويل الشخصي",
    descriptionEn:
      "Work out your monthly installment, total repayment and total profit on a personal loan or financing amount.",
    descriptionAr:
      "احسب القسط الشهري وإجمالي المبلغ المسدد وإجمالي الربح على مبلغ تمويل شخصي.",
  },
  {
    slug: "zakat-calculator",
    titleEn: "Zakat Calculator",
    titleAr: "حاسبة الزكاة",
    descriptionEn:
      "Estimate your Zakat due (2.5% of net zakatable wealth) on cash, gold, silver and investments above the Nisab threshold.",
    descriptionAr:
      "احسب مقدار الزكاة الواجبة (2.5% من صافي المال الزكوي) على النقد والذهب والفضة والاستثمارات فوق حد النصاب.",
  },
  {
    slug: "gratuity-calculator",
    titleEn: "End-of-Service Gratuity Calculator",
    titleAr: "حاسبة مكافأة نهاية الخدمة",
    descriptionEn:
      "Estimate your end-of-service award under Saudi Labor Law, for both resignation and termination.",
    descriptionAr:
      "احسب مكافأة نهاية الخدمة المقدّرة وفق نظام العمل السعودي، سواء عند الاستقالة أو إنهاء الخدمة.",
  },
  {
    slug: "salary-calculator",
    titleEn: "Take-Home Salary Calculator",
    titleAr: "حاسبة صافي الراتب",
    descriptionEn:
      "Estimate your net take-home salary after GOSI contributions, for Saudi and non-Saudi employees.",
    descriptionAr:
      "احسب صافي راتبك التقديري بعد خصومات التأمينات الاجتماعية (جوسي)، للسعوديين وغير السعوديين.",
  },
  {
    slug: "bnpl-calculator",
    titleEn: "BNPL Installment Calculator",
    titleAr: "حاسبة أقساط الدفع الآجل",
    descriptionEn:
      "See exactly how a Buy Now, Pay Later purchase splits into installments before you check out.",
    descriptionAr:
      "اعرف بالضبط كيف ينقسم مبلغ الشراء بخدمة الدفع الآجل إلى أقساط قبل إتمام عملية الشراء.",
  },
  {
    slug: "currency-converter",
    titleEn: "SAR Currency Converter",
    titleAr: "محول العملات (الريال السعودي)",
    descriptionEn:
      "Convert between Saudi Riyal and major currencies, using the fixed USD peg and a rate you enter for others.",
    descriptionAr:
      "حوّل بين الريال السعودي والعملات الرئيسية، باستخدام سعر الصرف الثابت مقابل الدولار وسعر تُدخله لبقية العملات.",
  },
  {
    slug: "mortgage-calculator",
    titleEn: "Home Finance Calculator",
    titleAr: "حاسبة التمويل العقاري",
    descriptionEn:
      "Estimate your monthly installment on a home finance (mortgage) amount, based on price, down payment, rate and term.",
    descriptionAr:
      "احسب قسطك الشهري التقديري للتمويل العقاري بناءً على السعر والدفعة المقدمة والنسبة والمدة.",
  },
  {
    slug: "car-finance-calculator",
    titleEn: "Car Finance Calculator",
    titleAr: "حاسبة تمويل السيارات",
    descriptionEn:
      "Work out your monthly installment for financing a car, including the effect of your down payment.",
    descriptionAr:
      "احسب قسطك الشهري لتمويل سيارة، بما في ذلك أثر الدفعة المقدمة.",
  },
  {
    slug: "vat-calculator",
    titleEn: "VAT Calculator",
    titleAr: "حاسبة ضريبة القيمة المضافة",
    descriptionEn: "Add or remove Saudi Arabia's 15% VAT from any price in seconds.",
    descriptionAr: "أضف أو استخرج ضريبة القيمة المضافة (15%) من أي سعر في ثوانٍ.",
  },
  {
    slug: "savings-goal-calculator",
    titleEn: "Savings Goal Calculator",
    titleAr: "حاسبة هدف الادخار",
    descriptionEn:
      "Find out how much you need to save each month to reach a savings target by a specific date.",
    descriptionAr: "اعرف كم تحتاج للادخار شهريًا للوصول إلى هدف ادخاري بحلول موعد محدد.",
  },
  {
    slug: "debt-payoff-calculator",
    titleEn: "Debt Payoff Calculator",
    titleAr: "حاسبة سداد الديون",
    descriptionEn:
      "See how many months it'll take to clear a balance at a given payment, and the total profit/interest cost.",
    descriptionAr: "اعرف عدد الأشهر اللازمة لسداد رصيد بدفعة معينة، وإجمالي تكلفة الربح/الفائدة.",
  },
  {
    slug: "investment-growth-calculator",
    titleEn: "Investment Growth Calculator",
    titleAr: "حاسبة نمو الاستثمار",
    descriptionEn:
      "Project how a starting amount plus regular contributions could grow over time at an assumed return.",
    descriptionAr: "اعرف كيف يمكن أن ينمو مبلغ ابتدائي مع مساهمات منتظمة عبر الوقت بعائد مفترض.",
  },
];

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return TOOLS.find((tool) => tool.slug === slug);
}
