import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getAllGuides } from "@/lib/guides";
import { getAllBlogPosts } from "@/lib/blog";
import { TOOLS } from "@/lib/tools-data";
import { buildAlternates } from "@/lib/seo";
import SearchClient from "@/components/SearchClient";

const COPY = {
  en: { title: "Search", subtitle: "Search across every guide, calculator, and blog post on the site." },
  ar: { title: "بحث", subtitle: "ابحث في كل الأدلة والحاسبات ومقالات المدونة في الموقع." },
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
    alternates: buildAlternates("/search", locale as Locale),
    // Search results are dynamic/thin per-query — keep the endpoint crawlable
    // (required for the WebSite SearchAction to be a valid, working target)
    // without inviting individual query URLs into the index.
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const { q } = await searchParams;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const c = COPY[locale === "ar" ? "ar" : "en"];

  const guides = getAllGuides(locale);
  const blogPosts = getAllBlogPosts(locale);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="eyebrow">{locale === "ar" ? "ابحث" : "Search"}</p>
      <h1 className="font-display mt-2 text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
        {c.title}
      </h1>
      <p className="mt-2 text-[var(--ink-3)]">{c.subtitle}</p>

      <div className="mt-8">
        <SearchClient guides={guides} blogPosts={blogPosts} tools={TOOLS} initialQuery={q ?? ""} />
      </div>
    </section>
  );
}
