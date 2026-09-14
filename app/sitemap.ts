import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllGuideSlugs } from "@/lib/guides";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://saudimoneyguide.com";

const STATIC_PATHS = ["", "/guides", "/about", "/contact", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${BASE}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: path === "" ? 1 : 0.7,
      });
    }

    for (const slug of getAllGuideSlugs(locale)) {
      entries.push({
        url: `${BASE}/${locale}/guides/${encodeURIComponent(slug)}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
