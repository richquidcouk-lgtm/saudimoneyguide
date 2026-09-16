import type { Locale } from "@/i18n/routing";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.saudimoneyguide.com";

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE}/#organization`,
    name: "SaudiMoney",
    alternateName: "المال السعودي",
    url: BASE,
    logo: `${BASE}/icon`,
    contactPoint: {
      "@type": "ContactPoint",
      email: "richquidcouk@gmail.com",
      contactType: "customer support",
      areaServed: "SA",
      availableLanguage: ["en", "ar"],
    },
  };
}

export function buildWebsiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/${locale}#website`,
    publisher: { "@id": `${BASE}/#organization` },
    name: "SaudiMoney",
    url: `${BASE}/${locale}`,
    inLanguage: locale,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE}/${locale}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildArticleSchema({
  title,
  description,
  path,
  author,
  publishedAt,
  updatedAt,
  image,
  summary,
  sources = [],
  locale,
}: {
  title: string;
  description: string;
  path: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
  summary?: string[];
  sources?: { title: string; href: string }[];
  locale: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${BASE}/${locale}${path}#article`,
    url: `${BASE}/${locale}${path}`,
    isPartOf: { "@id": `${BASE}/${locale}#website` },
    ...(image ? { image: `${BASE}${image}` } : {}),
    ...(summary?.length ? { abstract: summary.join(" ") } : {}),
    ...(sources.length ? { citation: sources.map(source => ({ "@type": "CreativeWork", name: source.title, url: source.href })) } : {}),
    headline: title,
    description,
    author: { "@type": "Organization", name: author, url: `${BASE}/${locale}/about` },
    publisher: { "@id": `${BASE}/#organization` },
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    inLanguage: locale,
    mainEntityOfPage: `${BASE}/${locale}${path}`,
  };
}

export function buildFAQSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
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

