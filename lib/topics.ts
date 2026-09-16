import { GUIDE_CATEGORIES, GUIDE_CATEGORY_MAP } from '@/lib/guide-categories';
import type { BlogSummary } from '@/lib/blog';
export const TOPICS = GUIDE_CATEGORIES;
export const TOPIC_TOOLS: Record<string, string[]> = {
  'credit-borrowing': ['loan-calculator', 'debt-payoff-calculator', 'bnpl-calculator', 'currency-converter'],
  'salary-work': ['salary-calculator', 'gratuity-calculator'],
  'home-vehicle': ['mortgage-calculator', 'car-finance-calculator'],
  insurance: [],
  'cost-of-living': ['vat-calculator', 'savings-goal-calculator'],
  investing: ['zakat-calculator', 'investment-growth-calculator', 'savings-goal-calculator'],
};
export function getPostTopic(post: BlogSummary) {
  return post.category ?? GUIDE_CATEGORY_MAP[post.relatedGuides[0]] ?? 'credit-borrowing';
}
export const TOPIC_PATHS: Record<string, { en: string[]; ar: string[] }> = {
  'credit-borrowing': {
    en: ['Start with your account and credit file. Understand how banking, SIMAH, card borrowing and payment commitments fit together before comparing providers.', 'For a financing offer, compare the same amount and term using the disclosed APR and total repayment. For a transfer, compare the final recipient amount for the same SAR budget.', 'Use the examples below to prepare questions, then verify the current terms with the provider. Calculator estimates help with planning but do not establish eligibility or an executable quote.'],
    ar: ['ابدأ بالحساب والملف الائتماني، وافهم العلاقة بين الخدمات المصرفية وسمة والبطاقات والالتزامات قبل مقارنة الجهات.', 'قارن عروض التمويل للمبلغ والمدة نفسيهما بمعدل النسبة السنوي وإجمالي السداد. وفي الحوالات قارن ما يصل للمستفيد بميزانية ريال متساوية.', 'استخدم الأمثلة لتجهيز أسئلتك ثم تحقق من الشروط الحالية لدى الجهة. الحاسبات للتخطيط ولا تثبت الأهلية أو تصدر عرضًا قابلًا للتنفيذ.'],
  },
  'salary-work': {
    en: ['Read your offer as separate components: basic salary, fixed allowances and benefits. Comparing annual cash and the costs you pay yourself gives a clearer picture than one headline number.', 'Check the contribution assumptions used for take-home pay. When employment ends, review gratuity and other settlement items separately instead of assuming one formula covers everything.', 'Use the calculators alongside your documented contract and payroll records. The articles explain worked examples and the questions to resolve when the underlying dates, wage or circumstances differ.'],
    ar: ['اقرأ العرض كمكونات مستقلة: الأساسي والبدلات الثابتة والمزايا. قارن النقد السنوي والمصاريف التي تتحملها بدل الاعتماد على رقم واحد.', 'تحقق من افتراضات الاشتراك عند حساب الصافي. وعند انتهاء العمل افصل المكافأة عن بقية المخالصة بدل افتراض معادلة تغطي كل شيء.', 'استخدم الحاسبات بجانب العقد الموثق وسجلات الراتب. توضح المقالات أمثلة وأسئلة مهمة عند اختلاف الأجر أو التواريخ أو الظروف.'],
  },
  'home-vehicle': {
    en: ['Begin with what the household can pay upfront and each month. Rent installments, deposits, a vehicle down payment and a mortgage commitment have different cash-flow patterns.', 'For a car, include any final lump sum and running costs. For housing, compare the payment timetable with when your salary and savings will be available.', 'Read the guides for the product structure, then use the tools to explore a scenario. Keep the lender’s actual schedule and the rental agreement as the records for your obligations.'],
    ar: ['ابدأ بما تستطيع الأسرة دفعه مقدمًا وشهريًا. تختلف مواعيد دفعات الإيجار والتأمين ومقدم السيارة والتمويل العقاري.', 'أضف الدفعة الأخيرة والتشغيل للسيارة، وقارن جدول السكن بمواعيد الراتب والسيولة المتاحة.', 'اقرأ الأدلة لفهم البنية ثم استخدم الأدوات لاستكشاف سيناريو. يبقى جدول جهة التمويل والعقد مرجعًا لالتزاماتك الفعلية.'],
  },
  insurance: {
    en: ['Compare the policy’s coverage and exclusions before focusing on price. Health and motor cover solve different problems, and your household’s needs should shape the questions you ask.', 'If a claim is rejected, identify the written reason and the relevant policy clause. Organize the evidence around that reason instead of repeatedly resending an unexplained bundle of documents.', 'The guides and complaint checklist below help you prepare. Confirm the current official route for the issue, and keep urgent health needs separate from the administrative review.'],
    ar: ['قارن التغطية والاستثناءات قبل السعر. يعالج تأمين الصحة والمركبات احتياجات مختلفة، وتحدد ظروف أسرتك الأسئلة المناسبة.', 'عند رفض المطالبة حدد السبب المكتوب وبند الوثيقة، ثم نظم الأدلة المرتبطة به بدل تكرار إرسال ملف دون تفسير.', 'تساعدك الأدلة وقائمة الشكوى على التجهيز. تحقق من المسار الرسمي الحالي وافصل الاحتياج الصحي العاجل عن المراجعة الإدارية.'],
  },
  'cost-of-living': {
    en: ['Build a budget for the city, neighborhood and household you actually have. Separate essential monthly spending, predictable annual bills and occasional discretionary costs.', 'Use real quotes for rent and services. The examples here show a method of calculation, not a promise that a particular salary or price will suit every household in Saudi Arabia.', 'Set a savings target for the next known bill and a separate emergency reserve. Revisit the plan when housing, employment or family circumstances change.'],
    ar: ['ابنِ ميزانية للمدينة والحي والأسرة الفعلية. افصل الأساسيات الشهرية والفواتير السنوية المتوقعة والمصروف الاختياري.', 'استخدم أسعارًا فعلية للسكن والخدمات. توضح الأمثلة طريقة الحساب ولا تضمن ملاءمة راتب أو سعر لكل أسرة في المملكة.', 'حدد هدفًا للفاتورة القادمة واحتياطيًا مستقلًا للطوارئ، وراجع الخطة عند تغير السكن أو العمل أو الأسرة.'],
  },
  investing: {
    en: ['Start with the goal and the date the money is needed. A long-term investment, a known bill and an emergency reserve call for different access and risk considerations.', 'Understand what you are buying and whether you are eligible. Read the current product terms instead of assuming that a historic return or another investor’s experience will apply to you.', 'Use growth calculations as scenarios and keep Zakat records organized. The linked articles explain preparation and comparisons; they do not promise returns or replace a product-specific assessment.'],
    ar: ['ابدأ بالهدف وموعد الحاجة للمال. يختلف الاستثمار الطويل عن فاتورة معروفة واحتياطي الطوارئ من حيث السيولة والمخاطر.', 'افهم ما تشتريه وتحقق من الأهلية وشروط المنتج الحالية، ولا تفترض انطباق عائد سابق أو تجربة مستثمر آخر.', 'استخدم حسابات النمو كسيناريوهات ونظم سجلات الزكاة. تشرح المقالات التحضير والمقارنة دون ضمان عائد أو استبدال التقييم الخاص بالمنتج.'],
  },
};
