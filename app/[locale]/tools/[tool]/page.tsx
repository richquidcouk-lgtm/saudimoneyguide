import ToolReading from "@/components/tools/ToolReading";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { TOOLS, getToolBySlug, getToolKeywords } from "@/lib/tools-data";
import { TOOL_COMPONENTS } from "@/components/tools/registry";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";
import { ToolIcon } from "@/components/icons";

export function generateStaticParams() {
  const locales: Locale[] = ["en", "ar"];
  return locales.flatMap((locale) => TOOLS.map((tool) => ({ locale, tool: tool.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; tool: string }>;
}): Promise<Metadata> {
  const { locale, tool: slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  const title = locale === "ar" ? tool.titleAr : tool.titleEn;
  const description = locale === "ar" ? tool.descriptionAr : tool.descriptionEn;

  return {
    title,
    description,
    keywords: getToolKeywords(slug, locale),
    alternates: buildAlternates(`/tools/${slug}`, locale as Locale),
    ...buildOpenGraph({ title, description, path: `/tools/${slug}`, locale: locale as Locale }),
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ locale: string; tool: string }>;
}) {
  const { locale, tool: slug } = await params;
  setRequestLocale(locale as Locale);

  const tool = getToolBySlug(slug);
  const Calculator = TOOL_COMPONENTS[slug];
  if (!tool || !Calculator) notFound();

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <header className="flex items-start gap-4 border-b border-[var(--rule)] pb-6">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--teal-soft)] text-[var(--teal-dark)]">
          <ToolIcon slug={tool.slug} className="h-6 w-6" />
        </span>
        <div>
          <p className="eyebrow">{locale === "ar" ? "أداة" : "Tool"}</p>
          <h1 className="font-display mt-2 text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
            {locale === "ar" ? tool.titleAr : tool.titleEn}
          </h1>
          <p className="mt-3 text-[var(--ink-3)]">
            {locale === "ar" ? tool.descriptionAr : tool.descriptionEn}
          </p>
        </div>
      </header>

      <div className="relative mt-8 overflow-hidden rounded-xl border border-[var(--rule)] bg-[var(--paper)] p-6 shadow-[var(--shadow-card)] sm:p-8">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--gold)] via-[var(--teal-mid)] to-[var(--gold)]" />
        <Calculator locale={locale} />
      </div>
      <ToolReading slug={slug} locale={locale as Locale} />
    </section>
  );
}
