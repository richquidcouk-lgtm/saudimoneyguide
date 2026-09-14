import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getAllGuides } from "@/lib/guides";
import { buildAlternates } from "@/lib/seo";
import MatchQuiz from "@/components/MatchQuiz";

const COPY = {
  en: {
    title: "Find Your Match — Which Guide & Calculator Fits You",
    subtitle:
      "Answer two quick questions and we'll point you to the right guide and free calculator for what you actually need — no account, no data stored.",
  },
  ar: {
    title: "اعثر على الأنسب لك — الدليل والحاسبة المناسبان لك",
    subtitle:
      "أجب عن سؤالين سريعين وسنوجهك إلى الدليل والحاسبة المجانية الأنسب لاحتياجك فعليًا — بدون حساب وبدون تخزين أي بيانات.",
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
    description: c.subtitle,
    alternates: buildAlternates("/match", locale as Locale),
  };
}

export default async function MatchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const c = COPY[locale === "ar" ? "ar" : "en"];
  const guides = getAllGuides(locale);

  return (
    <>
      <section className="pattern-paper relative overflow-hidden border-b border-[var(--rule)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/60 to-transparent" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <span className="chip mx-auto">
            <span className="ornament-dot" aria-hidden="true" />
            {locale === "ar" ? "أداة مطابقة سريعة" : "Quick Match Tool"}
          </span>
          <h1 className="font-display mt-6 text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-5xl">
            {c.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--ink-2)]">
            {c.subtitle}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <MatchQuiz guides={guides} />
      </div>
    </>
  );
}
