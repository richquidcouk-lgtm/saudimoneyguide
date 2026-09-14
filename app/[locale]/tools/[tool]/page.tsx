import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { TOOLS, getToolBySlug } from "@/lib/tools-data";
import { TOOL_COMPONENTS } from "@/components/tools/registry";
import { buildAlternates } from "@/lib/seo";

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
    alternates: buildAlternates(`/tools/${slug}`, locale as Locale),
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
      <header className="border-b border-[var(--rule)] pb-6">
        <h1 className="text-3xl font-extrabold leading-tight text-[var(--ink)]">
          {locale === "ar" ? tool.titleAr : tool.titleEn}
        </h1>
        <p className="mt-3 text-[var(--ink-3)]">
          {locale === "ar" ? tool.descriptionAr : tool.descriptionEn}
        </p>
      </header>

      <div className="mt-8 rounded-2xl border border-[var(--rule)] bg-white p-6 sm:p-8">
        <Calculator locale={locale} />
      </div>
    </section>
  );
}
