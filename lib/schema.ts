import type { Locale } from "@/i18n/routing";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://saudimoneyguide.com";

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Saudi Money Guide",
    url: BASE,
  };
}

export function buildArticleSchema({
  title,
  description,
  slug,
  author,
  publishedAt,
  locale,
}: {
  title: string;
  description: string;
  slug: string;
  author: string;
  publishedAt: string;
  locale: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: { "@type": "Organization", name: author },
    publisher: { "@type": "Organization", name: "Saudi Money Guide" },
    datePublished: publishedAt,
    dateModified: publishedAt,
    inLanguage: locale,
    mainEntityOfPage: `${BASE}/${locale}/guides/${slug}`,
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; path: string }[],
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE}/${locale}${item.path}`,
    })),
  };
}

