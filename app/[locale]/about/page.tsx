import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";
import { ShieldCheckIcon, BookIcon, GlobeIcon } from "@/components/icons";

const COPY = {
  en: {
    title: "About SaudiMoney",
    description:
      "SaudiMoney is an independent, bilingual personal finance resource for Saudi Arabia — how it's researched, how it earns money, and who it's for.",
    eyebrow: "About Us",
    intro:
      "SaudiMoney exists to answer one question clearly: how does money actually work in Saudi Arabia? Salaries, GOSI, Zakat, Islamic financing, credit, insurance, investing — explained in plain language, in both Arabic and English, for Saudi nationals and residents alike.",
    pillarsTitle: "How we work",
    pillars: [
      {
        icon: "shield",
        title: "Fact-checked against official sources",
        body: "Figures and rates that matter — VAT, GOSI contribution bands, gratuity formulas, the SAR/USD peg — are checked against ZATCA, GOSI, and SAMA rather than assumed. Where a rule changes over time or varies by situation, we say so explicitly instead of presenting a single number as universal.",
      },
      {
        icon: "book",
        title: "Educational, not financial advice",
        body: "Nothing on this site is a personalized recommendation, an eligibility guarantee, or a substitute for advice from a licensed bank, broker, or financial advisor. Our calculators are planning tools based on the numbers you enter — always confirm your exact terms directly with a provider before acting.",
      },
      {
        icon: "globe",
        title: "Written for two audiences, not translated between them",
        body: "Our Arabic content isn't a machine translation of the English — many topics (GOSI, gratuity, banking access) genuinely differ by nationality, and we write each version to actually answer the reader's real situation.",
      },
    ],
    moneyTitle: "How this site makes money",
    moneyBody:
      "Some links on SaudiMoney — to providers like banks, BNPL apps, or financial platforms — are affiliate links, meaning we may earn a commission if you sign up through them, at no extra cost to you. This never changes what we write: guides are researched and fact-checked the same way regardless of whether a partnership exists, and we link to a provider's own official site rather than a disguised tracking link. If we haven't reviewed a category thoroughly enough to say something useful, we say that instead of forcing a recommendation.",
    contactCta: "Questions, corrections, or a partnership inquiry? ",
    contactLink: "Get in touch →",
  },
  ar: {
    title: "عن المال السعودي",
    description:
      "المال السعودي مصدر مستقل وثنائي اللغة للتمويل الشخصي في السعودية — كيف نُعِدّ المحتوى، وكيف نُموِّل الموقع، ولمن هذا الموقع.",
    eyebrow: "من نحن",
    intro:
      "يهدف المال السعودي للإجابة بوضوح عن سؤال واحد: كيف تعمل الأمور المالية فعليًا في السعودية؟ الرواتب، جوسي، الزكاة، التمويل الإسلامي، الائتمان، التأمين، الاستثمار — نشرحها بلغة بسيطة، بالعربية والإنجليزية، للمواطنين والمقيمين على حدٍ سواء.",
    pillarsTitle: "كيف نعمل",
    pillars: [
      {
        icon: "shield",
        title: "محتوى مُتحقَّق من مصادر رسمية",
        body: "الأرقام والنسب المهمة — ضريبة القيمة المضافة، شرائح اشتراك جوسي، معادلات مكافأة نهاية الخدمة، ربط الريال بالدولار — نتحقق منها عبر زاتكا وجوسي والبنك المركزي السعودي بدلًا من افتراضها. وعندما تتغير قاعدة ما مع الوقت أو تختلف حسب الحالة، نوضح ذلك صراحة بدلًا من تقديم رقم واحد كأنه ثابت للجميع.",
      },
      {
        icon: "book",
        title: "محتوى تعليمي، وليس استشارة مالية",
        body: "لا شيء في هذا الموقع يُعد توصية شخصية أو ضمان أهلية أو بديلاً عن استشارة بنك أو وسيط مرخّص أو مستشار مالي. حاسباتنا أدوات تخطيطية تعتمد على الأرقام التي تُدخلها أنت — تأكد دائمًا من شروطك الدقيقة مباشرة مع الجهة المعنية قبل اتخاذ أي قرار.",
      },
      {
        icon: "globe",
        title: "محتوى مكتوب لجمهورين، لا مترجم بينهما",
        body: "محتوانا العربي ليس ترجمة آلية للإنجليزي — كثير من المواضيع (جوسي، مكافأة نهاية الخدمة، الوصول للخدمات المصرفية) تختلف فعليًا حسب الجنسية، ونكتب كل نسخة لتجيب فعليًا على وضع القارئ الحقيقي.",
      },
    ],
    moneyTitle: "كيف يُموَّل هذا الموقع",
    moneyBody:
      "بعض الروابط على المال السعودي — لبنوك أو تطبيقات دفع آجل أو منصات مالية — هي روابط شراكة (أفلييت)، بمعنى أننا قد نكسب عمولة إذا سجّلت عبرها، دون أي تكلفة إضافية عليك. هذا لا يغيّر أبدًا ما نكتبه: الأدلة تُبحث وتُتحقَّق بنفس الطريقة بغض النظر عن وجود شراكة، ونربط بالموقع الرسمي لمزوّد الخدمة مباشرة بدلًا من رابط تتبع مموَّه. وإذا لم نراجع فئة معينة بعمق كافٍ لنقول شيئًا مفيدًا، نقول ذلك بدلًا من فرض توصية.",
    contactCta: "أسئلة أو تصحيحات أو استفسار عن شراكة؟ ",
    contactLink: "تواصل معنا ←",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = COPY[locale === "ar" ? "ar" : "en"];
  return {
    title: c.title,
    description: c.description,
    alternates: buildAlternates("/about", locale as Locale),
    ...buildOpenGraph({ title: c.title, description: c.description, path: "/about", locale: locale as Locale }),
  };
}

const ICONS = { shield: ShieldCheckIcon, book: BookIcon, globe: GlobeIcon };

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const c = COPY[locale === "ar" ? "ar" : "en"];

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="eyebrow">{c.eyebrow}</p>
      <h1 className="font-display mt-2 text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
        {c.title}
      </h1>
      <p className="mt-5 text-[15px] leading-relaxed text-[var(--ink-2)]">{c.intro}</p>

      <h2 className="font-display mt-12 text-xl font-semibold text-[var(--ink)]">
        {c.pillarsTitle}
      </h2>
      <div className="mt-6 flex flex-col gap-5">
        {c.pillars.map((pillar) => {
          const Icon = ICONS[pillar.icon as keyof typeof ICONS];
          return (
            <div key={pillar.title} className="card-premium flex gap-4 p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--gold)] text-[var(--gold-dark)]">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base font-bold text-[var(--ink)]">{pillar.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-3)]">{pillar.body}</p>
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="font-display mt-12 text-xl font-semibold text-[var(--ink)]">
        {c.moneyTitle}
      </h2>
      <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink-2)]">{c.moneyBody}</p>

      <p className="mt-10 border-t border-[var(--rule)] pt-6 text-sm text-[var(--ink-3)]">
        {c.contactCta}
        <Link href="/contact" className="nav-link font-bold text-[var(--teal-dark)]">
          {c.contactLink}
        </Link>
      </p>
    </section>
  );
}
