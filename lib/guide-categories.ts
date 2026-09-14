export type GuideCategory = {
  id: string;
  labelEn: string;
  labelAr: string;
  descriptionEn: string;
  descriptionAr: string;
  icon: "credit" | "salary" | "home" | "insurance" | "living" | "invest";
};

export const GUIDE_CATEGORIES: GuideCategory[] = [
  {
    id: "credit-borrowing",
    labelEn: "Banking, Credit & Borrowing",
    labelAr: "البنوك والائتمان والاقتراض",
    descriptionEn: "Your credit file, cards, and how Sharia-compliant borrowing actually works.",
    descriptionAr: "ملفك الائتماني والبطاقات وكيفية عمل الاقتراض المتوافق مع الشريعة فعليًا.",
    icon: "credit",
  },
  {
    id: "salary-work",
    labelEn: "Salary, GOSI & Work",
    labelAr: "الراتب وجوسي والعمل",
    descriptionEn: "Take-home pay, end-of-service, retirement, and working independently.",
    descriptionAr: "صافي الراتب ومكافأة نهاية الخدمة والتقاعد والعمل المستقل.",
    icon: "salary",
  },
  {
    id: "home-vehicle",
    labelEn: "Home & Vehicle Finance",
    labelAr: "تمويل المنزل والسيارة",
    descriptionEn: "Mortgages, car finance, and the Islamic finance structures behind them.",
    descriptionAr: "التمويل العقاري وتمويل السيارات والهياكل الإسلامية خلفهما.",
    icon: "home",
  },
  {
    id: "insurance",
    labelEn: "Insurance & Protection",
    labelAr: "التأمين والحماية",
    descriptionEn: "Mandatory health cover and vehicle insurance, explained plainly.",
    descriptionAr: "التأمين الصحي الإلزامي وتأمين المركبات بشرح مبسّط.",
    icon: "insurance",
  },
  {
    id: "cost-of-living",
    labelEn: "Cost of Living & Tax",
    labelAr: "تكلفة المعيشة والضرائب",
    descriptionEn: "Budgeting for daily life in Saudi Arabia and how VAT actually applies.",
    descriptionAr: "التخطيط لميزانية الحياة اليومية في السعودية وكيفية تطبيق ضريبة القيمة المضافة.",
    icon: "living",
  },
  {
    id: "investing",
    labelEn: "Investing & Wealth",
    labelAr: "الاستثمار والثروة",
    descriptionEn: "Getting started with Tadawul, funds, and building wealth over time.",
    descriptionAr: "بداية الاستثمار في تداول والصناديق وبناء الثروة عبر الوقت.",
    icon: "invest",
  },
];

export const GUIDE_CATEGORY_MAP: Record<string, string> = {
  "simah-credit-score": "credit-borrowing",
  "best-credit-cards-saudi-arabia": "credit-borrowing",
  "bnpl-comparison-tamara-tabby": "credit-borrowing",
  "expat-banking-saudi-arabia": "credit-borrowing",

  "salary-advance-apps-saudi": "salary-work",
  "gosi-retirement-saudi-arabia": "salary-work",
  "freelancing-saudi-freelance-certificate": "salary-work",

  "home-finance-mortgages-saudi-arabia": "home-vehicle",
  "car-finance-saudi-arabia": "home-vehicle",
  "islamic-finance-tawarruq-murabaha": "home-vehicle",

  "health-insurance-expats-saudi-arabia": "insurance",
  "car-insurance-saudi-arabia": "insurance",

  "cost-of-living-saudi-arabia": "cost-of-living",
  "vat-saudi-arabia-explained": "cost-of-living",

  "investing-in-saudi-arabia-tadawul": "investing",
};

export function getCategoryForSlug(slug: string): string {
  return GUIDE_CATEGORY_MAP[slug] ?? "credit-borrowing";
}
