import type { Locale } from "@/i18n/routing";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://saudimoneyguide.com";

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
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
  locale,
}: {
  title: string;
  description: string;
  path: string;
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
    publisher: { "@type": "Organization", name: "SaudiMoney" },
    datePublished: publishedAt,
    dateModified: publishedAt,
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

