export type QuizCategoryId =
  | "credit-card"
  | "personal-loan"
  | "bnpl"
  | "home-finance"
  | "car-finance"
  | "salary-work"
  | "zakat"
  | "investing"
  | "insurance"
  | "cost-of-living";

export type QuizCategory = {
  id: QuizCategoryId;
  labelEn: string;
  labelAr: string;
  icon:
    | "credit"
    | "loan"
    | "bnpl"
    | "home"
    | "car"
    | "salary"
    | "zakat"
    | "invest"
    | "insurance"
    | "living";
  guideSlugs: string[];
  toolSlugs: string[];
  /** Only categories where nationality meaningfully changes the answer get a note. */
  nationalityNote?: { saudiEn: string; saudiAr: string; nonSaudiEn: string; nonSaudiAr: string };
};

export const QUIZ_CATEGORIES: QuizCategory[] = [
  {
    id: "credit-card",
    labelEn: "Credit Card",
    labelAr: "بطاقة ائتمان",
    icon: "credit",
    guideSlugs: ["best-credit-cards-saudi-arabia", "simah-credit-score"],
    toolSlugs: ["debt-payoff-calculator"],
    nationalityNote: {
      saudiEn: "As a Saudi national, you'll generally have the widest choice of card issuers and tiers, assuming you meet each bank's income requirement.",
      saudiAr: "بصفتك مواطنًا سعوديًا، ستجد عادة أوسع خيارات لمُصدري البطاقات وفئاتها، بشرط استيفاء متطلبات الدخل لدى كل بنك.",
      nonSaudiEn: "As a resident, most banks still offer credit cards, but expect a minimum salary threshold and a valid Iqama — and if you're new to the country, start with a low-limit card to begin building a SIMAH file.",
      nonSaudiAr: "بصفتك مقيمًا، تقدّم معظم البنوك بطاقات ائتمان أيضًا، لكن توقع حدًا أدنى للراتب وإقامة سارية — وإذا كنت جديدًا في البلاد، ابدأ ببطاقة بحد ائتماني منخفض لبناء ملف سِمَه.",
    },
  },
  {
    id: "personal-loan",
    labelEn: "Personal Loan / Financing",
    labelAr: "تمويل شخصي",
    icon: "loan",
    guideSlugs: ["islamic-finance-tawarruq-murabaha", "simah-credit-score"],
    toolSlugs: ["loan-calculator", "debt-payoff-calculator"],
  },
  {
    id: "bnpl",
    labelEn: "Buy Now, Pay Later",
    labelAr: "الدفع الآجل",
    icon: "bnpl",
    guideSlugs: ["bnpl-comparison-tamara-tabby"],
    toolSlugs: ["bnpl-calculator"],
  },
  {
    id: "home-finance",
    labelEn: "Home Finance / Mortgage",
    labelAr: "تمويل عقاري",
    icon: "home",
    guideSlugs: ["home-finance-mortgages-saudi-arabia", "islamic-finance-tawarruq-murabaha"],
    toolSlugs: ["mortgage-calculator"],
    nationalityNote: {
      saudiEn: "Saudi nationals have access to the widest range of home finance options, including government-backed support programs.",
      saudiAr: "يملك المواطنون السعوديون أوسع نطاق من خيارات التمويل العقاري، بما يشمل برامج الدعم الحكومي.",
      nonSaudiEn: "Residents can generally get home finance too, but property ownership rules and eligibility vary by bank and by area — confirm current requirements directly before assuming a specific property qualifies.",
      nonSaudiAr: "يمكن للمقيمين الحصول على تمويل عقاري أيضًا، لكن قواعد تملك العقار والأهلية تختلف حسب البنك والمنطقة — تأكد من المتطلبات الحالية مباشرة قبل افتراض أن عقارًا معينًا مؤهل.",
    },
  },
  {
    id: "car-finance",
    labelEn: "Car Finance",
    labelAr: "تمويل سيارة",
    icon: "car",
    guideSlugs: ["car-finance-saudi-arabia", "car-insurance-saudi-arabia"],
    toolSlugs: ["car-finance-calculator"],
  },
  {
    id: "salary-work",
    labelEn: "Salary, GOSI & Work",
    labelAr: "الراتب وجوسي والعمل",
    icon: "salary",
    guideSlugs: ["gosi-retirement-saudi-arabia", "salary-advance-apps-saudi", "freelancing-saudi-freelance-certificate"],
    toolSlugs: ["salary-calculator", "gratuity-calculator"],
    nationalityNote: {
      saudiEn: "As a Saudi national, GOSI's pension branch applies to you — your contributions build toward an actual retirement pension.",
      saudiAr: "بصفتك مواطنًا سعوديًا، ينطبق عليك فرع المعاشات في جوسي — اشتراكاتك تبني معاشًا تقاعديًا فعليًا.",
      nonSaudiEn: "As a non-Saudi employee, you're generally only covered by GOSI's employer-paid occupational hazards branch — you likely won't see a GOSI deduction from your own salary, and won't build a Saudi pension through it.",
      nonSaudiAr: "بصفتك موظفًا غير سعودي، أنت مشمول عادة فقط بفرع الأخطار المهنية في جوسي الممول من صاحب العمل — على الأرجح لن ترى خصمًا من جوسي من راتبك الخاص، ولن تبني معاشًا سعوديًا عبره.",
    },
  },
  {
    id: "zakat",
    labelEn: "Zakat",
    labelAr: "الزكاة",
    icon: "zakat",
    guideSlugs: [],
    toolSlugs: ["zakat-calculator"],
  },
  {
    id: "investing",
    labelEn: "Investing & Wealth",
    labelAr: "الاستثمار والثروة",
    icon: "invest",
    guideSlugs: ["investing-in-saudi-arabia-tadawul"],
    toolSlugs: ["investment-growth-calculator", "savings-goal-calculator"],
  },
  {
    id: "insurance",
    labelEn: "Health & Car Insurance",
    labelAr: "التأمين الصحي وتأمين السيارات",
    icon: "insurance",
    guideSlugs: ["health-insurance-expats-saudi-arabia", "car-insurance-saudi-arabia"],
    toolSlugs: [],
    nationalityNote: {
      saudiEn: "Health insurance rules differ slightly by sector for Saudi nationals (public-sector coverage often runs through government healthcare) — check what applies to your specific employer.",
      saudiAr: "تختلف قواعد التأمين الصحي قليلًا حسب القطاع للمواطنين السعوديين (القطاع الحكومي غالبًا يعتمد على الرعاية الصحية الحكومية) — تحقق مما ينطبق على جهة عملك تحديدًا.",
      nonSaudiEn: "Health insurance is a mandatory requirement for residents in Saudi Arabia — your employer or sponsor is generally responsible for arranging it, but it's worth confirming your coverage is active.",
      nonSaudiAr: "التأمين الصحي متطلب إلزامي للمقيمين في السعودية — صاحب العمل أو الكفيل مسؤول عادة عن ترتيبه، لكن يستحق التأكد من أن تغطيتك فعّالة.",
    },
  },
  {
    id: "cost-of-living",
    labelEn: "Cost of Living & Budgeting",
    labelAr: "تكلفة المعيشة والميزانية",
    icon: "living",
    guideSlugs: ["cost-of-living-saudi-arabia", "vat-saudi-arabia-explained"],
    toolSlugs: ["savings-goal-calculator", "vat-calculator"],
  },
];

export function getQuizCategory(id: string): QuizCategory | undefined {
  return QUIZ_CATEGORIES.find((c) => c.id === id);
}
