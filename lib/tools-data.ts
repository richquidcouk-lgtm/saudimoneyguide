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
];

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return TOOLS.find((tool) => tool.slug === slug);
}
