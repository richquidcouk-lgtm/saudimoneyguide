import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";

const CONTACT_EMAIL = "richquidcouk@gmail.com";

const SECTIONS_EN = [
  {
    title: "What we collect",
    body: [
      "Email address, only if you voluntarily subscribe to our newsletter. We don't require an account or any personal information to read guides or use any calculator on this site.",
      "Anonymous click events when you follow a link to a partner (bank, BNPL app, or other financial provider) from our site — this records which partner and which page, not who you are. No name, email, or account details are captured by this event.",
      "Standard server logs kept by our hosting provider (IP address, browser type, page requested) for security and reliability — the same baseline logging virtually every website keeps.",
    ],
  },
  {
    title: "What we don't do",
    body: [
      "We don't sell, rent, or trade your personal data to anyone, for any reason.",
      "We don't require you to create an account or hand over financial details to use any calculator — every calculator runs entirely in your browser. Numbers you type into the Zakat, loan, salary, or any other calculator never leave your device.",
      "The Find My Match quiz on our homepage works the same way: your answers are used only to filter which guide and calculator to show you, in your browser, in that moment — nothing is stored or transmitted.",
    ],
  },
  {
    title: "How we use your email",
    body: [
      "If you subscribe to our newsletter, we use your email solely to send you new guides and relevant updates. We use SendGrid to deliver these emails; your address is shared with them only for that purpose, under their own security practices.",
      "Every email includes an unsubscribe link. You can also email us directly to be removed.",
    ],
  },
  {
    title: "Cookies",
    body: [
      "We use only the cookies necessary for the site to function correctly (such as your saved language preference). We don't currently run third-party analytics or advertising cookies. If that changes, this policy will be updated accordingly, and you'll be able to see the change reflected here.",
    ],
  },
  {
    title: "Third-party links",
    body: [
      "Guides on this site link out to banks, fintech apps, and other financial providers, including some affiliate links (disclosed on our About page). Once you leave our site, that provider's own privacy policy and data practices apply — we have no visibility into or control over what they do with your information.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "You can ask us at any time what data we hold about you (realistically, just a subscribed email address, if any) and request its deletion. Email us and we'll action this promptly. This applies regardless of where you're located, in line with the principles of Saudi Arabia's Personal Data Protection Law (PDPL) and comparable international frameworks like the GDPR.",
    ],
  },
  {
    title: "Children's privacy",
    body: ["This site is not directed at children, and we don't knowingly collect data from anyone under 18."],
  },
  {
    title: "Changes to this policy",
    body: [
      "If this policy changes in a meaningful way, we'll update this page. Since this is a young site, expect this policy to get more detailed as real infrastructure (analytics, additional partners) is added — never less transparent.",
    ],
  },
];

const SECTIONS_AR = [
  {
    title: "ما الذي نجمعه",
    body: [
      "بريدك الإلكتروني فقط إذا اشتركت طواعية في نشرتنا البريدية. لا نطلب إنشاء حساب أو أي معلومات شخصية لقراءة الأدلة أو استخدام أي حاسبة في الموقع.",
      "أحداث نقر مجهولة الهوية عند اتباعك رابطًا لشريك (بنك، تطبيق دفع آجل، أو مزوّد مالي آخر) من موقعنا — يسجّل هذا الشريك والصفحة، لا هويتك. لا يُجمَع أي اسم أو بريد إلكتروني أو تفاصيل حساب عبر هذا الحدث.",
      "سجلات خادم قياسية يحتفظ بها مزوّد الاستضافة لدينا (عنوان IP، نوع المتصفح، الصفحة المطلوبة) لأغراض الأمان والموثوقية — نفس التسجيل الأساسي الذي يحتفظ به تقريبًا كل موقع إلكتروني.",
    ],
  },
  {
    title: "ما لا نفعله",
    body: [
      "لا نبيع أو نؤجر أو نتاجر ببياناتك الشخصية لأي أحد، لأي سبب.",
      "لا نطلب منك إنشاء حساب أو تسليم تفاصيل مالية لاستخدام أي حاسبة — كل حاسبة تعمل بالكامل داخل متصفحك. الأرقام التي تكتبها في حاسبة الزكاة أو القرض أو الراتب أو أي حاسبة أخرى لا تغادر جهازك أبدًا.",
      "أداة \"اعثر على الأنسب لك\" في الصفحة الرئيسية تعمل بنفس الطريقة: تُستخدم إجاباتك فقط لتحديد الدليل والحاسبة المناسبين لعرضهما، داخل متصفحك، في تلك اللحظة — لا يُخزَّن أو يُرسَل أي شيء.",
    ],
  },
  {
    title: "كيف نستخدم بريدك الإلكتروني",
    body: [
      "إذا اشتركت في نشرتنا، نستخدم بريدك فقط لإرسال أدلة جديدة وتحديثات ذات صلة. نستخدم SendGrid لإرسال هذه الرسائل؛ يُشارَك بريدك معهم فقط لهذا الغرض، وفق ممارسات الأمان الخاصة بهم.",
      "كل رسالة تتضمن رابط إلغاء اشتراك. يمكنك أيضًا مراسلتنا مباشرة لإزالة بريدك.",
    ],
  },
  {
    title: "ملفات تعريف الارتباط (الكوكيز)",
    body: [
      "نستخدم فقط ملفات تعريف الارتباط الضرورية لعمل الموقع بشكل صحيح (مثل تفضيل اللغة المحفوظ). لا نستخدم حاليًا ملفات تعريف ارتباط للتحليلات أو الإعلانات من طرف ثالث. إذا تغيّر ذلك، سيتم تحديث هذه السياسة وفق ذلك، وستتمكن من رؤية التغيير هنا.",
    ],
  },
  {
    title: "روابط أطراف ثالثة",
    body: [
      "تتضمن أدلة هذا الموقع روابط لبنوك وتطبيقات تقنية مالية ومزوّدين ماليين آخرين، بما يشمل بعض روابط الشراكة (مُفصح عنها في صفحة من نحن). بمجرد مغادرتك موقعنا، تنطبق سياسة الخصوصية وممارسات البيانات الخاصة بذلك المزوّد — ليس لدينا أي رؤية أو تحكم فيما يفعلونه بمعلوماتك.",
    ],
  },
  {
    title: "حقوقك",
    body: [
      "يمكنك أن تسألنا في أي وقت عن البيانات التي نحتفظ بها عنك (واقعيًا، فقط بريد إلكتروني مشترك إن وُجد) وطلب حذفها. راسلنا وسننفذ ذلك بسرعة. ينطبق هذا بغض النظر عن مكان تواجدك، بما يتماشى مع مبادئ نظام حماية البيانات الشخصية السعودي (PDPL) والأطر الدولية المماثلة مثل GDPR.",
    ],
  },
  {
    title: "خصوصية الأطفال",
    body: ["هذا الموقع غير موجّه للأطفال، ولا نجمع عن علم بيانات من أي شخص دون 18 عامًا."],
  },
  {
    title: "تغييرات على هذه السياسة",
    body: [
      "إذا تغيّرت هذه السياسة بشكل جوهري، سنحدّث هذه الصفحة. بما أن هذا موقع حديث، توقع أن تصبح هذه السياسة أكثر تفصيلاً مع إضافة بنية تحتية حقيقية (تحليلات، شركاء إضافيون) — لا أقل شفافية أبدًا.",
    ],
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "سياسة الخصوصية" : "Privacy Policy",
    description: isAr
      ? "كيف يجمع المال السعودي بياناتك ويستخدمها ويحميها — مكتوبة بوضوح، بدون لغة قانونية مبهمة."
      : "How SaudiMoney collects, uses, and protects your data — written in plain language, not legalese.",
    alternates: buildAlternates("/privacy", locale as Locale),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const isAr = locale === "ar";
  const sections = isAr ? SECTIONS_AR : SECTIONS_EN;

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="eyebrow">{isAr ? "قانوني" : "Legal"}</p>
      <h1 className="font-display mt-2 text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
        {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
      </h1>
      <p className="mt-4 text-sm text-[var(--ink-4)]">
        {isAr ? "آخر تحديث: 15 سبتمبر 2026" : "Last updated: September 15, 2026"}
      </p>

      <div className="mt-8 flex flex-col gap-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="font-display text-lg font-semibold text-[var(--ink)]">
              {section.title}
            </h2>
            <div className="mt-2.5 flex flex-col gap-2.5">
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed text-[var(--ink-2)]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-10 border-t border-[var(--rule)] pt-6 text-sm text-[var(--ink-3)]">
        {isAr ? "أسئلة عن الخصوصية؟ راسلنا على " : "Questions about privacy? Email us at "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-[var(--teal-dark)]" dir="ltr">
          {CONTACT_EMAIL}
        </a>
      </p>
    </section>
  );
}
