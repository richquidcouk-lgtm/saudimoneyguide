import { routing, type Locale } from "@/i18n/routing";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://saudimoneyguide.com";

/**
 * Builds `alternates` for Next.js Metadata given a path that is the SAME
 * across locales (e.g. "/guides/simah-credit-score") and the locale of the
 * page currently being rendered.
 *
 * Two things Google's hreflang guidance requires that are easy to get wrong:
 *
 * 1. The canonical URL must be SELF-referencing per locale — the Arabic
 *    page's canonical is the Arabic URL, not the English one. Pointing every
 *    locale's canonical at one "default" URL (a mistake this had earlier)
 *    tells Google the other locale isn't the real page, which suppresses it
 *    from the index instead of preventing duplicate-content treatment.
 * 2. hreflang must be RECIPROCAL — every language version needs to list
 *    every other version, itself included, plus x-default. Since this
 *    returns the same `languages` map regardless of which locale calls it,
 *    calling it once per locale automatically produces a reciprocal set.
 */
export function buildAlternates(path: string, currentLocale: Locale) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${BASE}/${locale}${path}`;
  }
  languages["x-default"] = `${BASE}/${routing.defaultLocale}${path}`;

  return {
    canonical: `${BASE}/${currentLocale}${path}`,
    languages,
  };
}

/**
 * Same as buildAlternates, but for content whose URL path differs per
 * locale (e.g. a guide that only exists in one language, or one day has a
 * genuinely different slug per language). Pass every locale where the page
 * exists; omit a locale entirely if there's no version of it there yet.
 */
export function buildAlternatesFromMap(
  pathsByLocale: Partial<Record<Locale, string>>,
  currentLocale: Locale,
) {
  const languages: Record<string, string> = {};
  for (const [locale, path] of Object.entries(pathsByLocale)) {
    languages[locale] = `${BASE}/${locale}${path}`;
  }
  if (pathsByLocale[routing.defaultLocale]) {
    languages["x-default"] = `${BASE}/${routing.defaultLocale}${pathsByLocale[routing.defaultLocale]}`;
  }

  const currentPath = pathsByLocale[currentLocale];
  return {
    canonical: currentPath ? `${BASE}/${currentLocale}${currentPath}` : undefined,
    languages,
  };
}

const OG_LOCALE: Record<Locale, string> = { en: "en_US", ar: "ar_SA" };

/**
 * Consistent Open Graph + Twitter Card metadata for a page. The actual
 * preview image comes from the nearest `opengraph-image.tsx` file
 * convention (inherited from app/[locale]/opengraph-image.tsx unless a
 * route defines its own) — Next.js wires that up automatically, so this
 * only needs to supply the text fields and locale reciprocity.
 */
export function buildOpenGraph({
  title,
  description,
  path,
  locale,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  type?: "website" | "article";
}) {
  return {
    openGraph: {
      title,
      description,
      url: `${BASE}/${locale}${path}`,
      siteName: "SaudiMoney",
      locale: OG_LOCALE[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      type,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
    },
  };
}
