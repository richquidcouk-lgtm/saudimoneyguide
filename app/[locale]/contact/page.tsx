import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

const CONTACT_EMAIL = "richquidcouk@gmail.com";

const COPY = {
  en: {
    title: "Contact Us",
    description: "Get in touch with SaudiMoney — corrections, questions, or partnership inquiries.",
    eyebrow: "Get In Touch",
    intro:
      "Spotted a figure that's out of date, found something unclear, or have a partnership inquiry? Email us directly — a real person reads every message.",
    emailLabel: "Email",
    reasonsTitle: "What to write to us about",
    reasons: [
      {
        title: "Corrections",
        body: "Tell us which guide, the specific number, and — if you have it — a source, so we can verify and fix it quickly.",
      },
      {
        title: "Topic requests",
        body: "A personal finance question you can't find covered anywhere on the site yet — this genuinely shapes what we write next.",
      },
      {
        title: "Partnerships",
        body: "Banks, fintechs, and financial platforms — reach out about affiliate or content partnerships.",
      },
    ],
    responseNote:
      "We reply to most messages within a few business days. This inbox is not monitored for financial emergencies — for anything urgent involving your own account or money, contact your bank or provider directly.",
  },
  ar: {
    title: "تواصل معنا",
    description: "تواصل مع فريق المال السعودي — تصحيحات، أسئلة، أو استفسارات شراكة.",
    eyebrow: "تواصل",
    intro:
      "لاحظت رقمًا قديمًا، أو وجدت شيئًا غير واضح، أو لديك استفسار عن شراكة؟ راسلنا مباشرة — شخص حقيقي يقرأ كل رسالة.",
    emailLabel: "البريد الإلكتروني",
    reasonsTitle: "ماذا تكتب لنا عنه",
    reasons: [
      {
        title: "تصحيحات",
        body: "أخبرنا بالدليل المحدد والرقم بالضبط، وإن أمكن مصدرك، لنتحقق ونصحح بسرعة.",
      },
      {
        title: "طلبات مواضيع",
        body: "سؤال في التمويل الشخصي لا تجد تغطية له في الموقع بعد — هذا فعليًا يوجّه ما نكتبه لاحقًا.",
      },
      {
        title: "شراكات",
        body: "البنوك وشركات التقنية المالية والمنصات المالية — تواصلوا معنا بخصوص شراكات المحتوى أو الأفلييت.",
      },
    ],
    responseNote:
      "نرد على معظم الرسائل خلال أيام عمل قليلة. هذا البريد غير مخصص لحالات الطوارئ المالية — لأي أمر عاجل يخص حسابك أو أموالك، تواصل مباشرة مع بنكك أو مزوّد الخدمة.",
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
    alternates: buildAlternates("/contact", locale as Locale),
    ...buildOpenGraph({ title: c.title, description: c.description, path: "/contact", locale: locale as Locale }),
  };
}

export default async function ContactPage({
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
      <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink-2)]">{c.intro}</p>

      <div className="card-premium mt-8 flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow">{c.emailLabel}</p>
          <p className="font-display mt-1 text-xl font-semibold text-[var(--ink)]" dir="ltr">
            {CONTACT_EMAIL}
          </p>
        </div>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[var(--teal)] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--teal-dark)]"
        >
          {locale === "ar" ? "أرسل بريدًا ←" : "Send an email →"}
        </a>
      </div>

      <h2 className="font-display mt-12 text-xl font-semibold text-[var(--ink)]">
        {c.reasonsTitle}
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {c.reasons.map((reason) => (
          <div key={reason.title} className="card-premium p-5">
            <h3 className="text-sm font-bold text-[var(--ink)]">{reason.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-3)]">{reason.body}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 border-t border-[var(--rule)] pt-6 text-xs leading-relaxed text-[var(--ink-4)]">
        {c.responseNote}
      </p>
    </section>
  );
}
