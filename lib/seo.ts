import { routing } from "@/i18n/routing";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://saudimoneyguide.com";

/**
 * Builds `alternates.languages` for Next.js Metadata given a path that is
 * the SAME across locales (e.g. "/guides/simah-guide"). For guides whose
 * slug differs by locale (Arabic guides use Arabic slugs), pass an explicit
 * per-locale path map instead.
 */
export function buildAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${BASE}/${locale}${path}`;
  }
  return { languages, canonical: languages[routing.defaultLocale] };
}

export function buildAlternatesFromMap(pathsByLocale: Record<string, string>) {
  const languages: Record<string, string> = {};
  for (const [locale, path] of Object.entries(pathsByLocale)) {
    languages[locale] = `${BASE}/${locale}${path}`;
  }
  return { languages, canonical: languages[routing.defaultLocale] };
}
