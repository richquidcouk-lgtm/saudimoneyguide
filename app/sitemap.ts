import { TOPICS } from "@/lib/topics";
import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllGuides } from "@/lib/guides";
import { getAllBlogPosts } from "@/lib/blog";
import { TOOLS } from "@/lib/tools-data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.saudimoneyguide.com";

const STATIC_PATHS = ["", "/guides", "/blog", "/tools", "/match", "/about", "/contact", "/privacy", "/topics"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${BASE}/${locale}${path}`,
        changeFrequency: "weekly",
        priority: path === "" ? 1 : 0.7,
      });
    }

    for (const topic of TOPICS) {
      entries.push({ url: `${BASE}/${locale}/topics/${topic.id}`, changeFrequency: "monthly", priority: 0.8 });
    }

    for (const guide of getAllGuides(locale)) {
      const slug = guide.slug;
      entries.push({
        url: `${BASE}/${locale}/guides/${encodeURIComponent(slug)}`,
        lastModified: guide.updatedAt ?? guide.publishedAt,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }

    for (const post of getAllBlogPosts(locale)) {
      const slug = post.slug;
      entries.push({
        url: `${BASE}/${locale}/blog/${encodeURIComponent(slug)}`,
        lastModified: post.updatedAt ?? post.publishedAt,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    for (const tool of TOOLS) {
      entries.push({
        url: `${BASE}/${locale}/tools/${tool.slug}`,
        changeFrequency: "monthly",
        priority: 0.75,
      });
    }
  }

  return entries;
}
