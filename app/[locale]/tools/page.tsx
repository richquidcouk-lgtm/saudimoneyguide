import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { TOOLS } from "@/lib/tools-data";
import { buildAlternates } from "@/lib/seo";

const COPY = {
  en: {
    title: "Financial Tools",
    subtitle: "Free calculators for everyday personal finance decisions in Saudi Arabia.",
  },
  ar: {
    title: "الأدوات المالية",
    subtitle: "حاسبات مجانية لقرارات التمويل الشخصي اليومية في السعودية.",
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
    alternates: buildAlternates("/tools", locale as Locale),
  };
}

export default async function ToolsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const c = COPY[locale === "ar" ? "ar" : "en"];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="eyebrow">{locale === "ar" ? "بدون تسجيل" : "No Signup Required"}</p>
      <h1 className="font-display mt-2 text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
        {c.title}
      </h1>
      <p className="mt-2 max-w-2xl text-[var(--ink-3)]">{c.subtitle}</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group flex flex-col rounded-lg border border-[var(--rule)] bg-[var(--paper)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--teal-mid)] hover:shadow-[0_8px_24px_-12px_rgba(11,93,82,0.35)]"
          >
            <h2 className="text-base font-bold text-[var(--ink)] group-hover:text-[var(--teal-dark)]">
              {locale === "ar" ? tool.titleAr : tool.titleEn}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-3)]">
              {locale === "ar" ? tool.descriptionAr : tool.descriptionEn}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
