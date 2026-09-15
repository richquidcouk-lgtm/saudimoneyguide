import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Locale } from "@/i18n/routing";

const GUIDES_DIR = path.join(process.cwd(), "content", "guides");

export type GuideFrontmatter = {
  title: string;
  description: string;
  keywords: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  reviewedAt?: string;
  reviewer?: string;
  summary?: string[];
  slug: string;
};

export type Guide = GuideFrontmatter & {
  content: string;
};

export type GuideSummary = GuideFrontmatter;

function localeDir(locale: Locale) {
  return path.join(GUIDES_DIR, locale);
}

export function getAllGuideSlugs(locale: Locale): string[] {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getGuideBySlug(locale: Locale, slug: string): Guide | null {
  const filePath = path.join(localeDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    keywords: String(data.keywords ?? ""),
    author: String(data.author ?? "SaudiMoney"),
    publishedAt: String(data.publishedAt ?? ""),
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    reviewedAt: data.reviewedAt ? String(data.reviewedAt) : undefined,
    reviewer: data.reviewer ? String(data.reviewer) : undefined,
    summary: Array.isArray(data.summary) ? data.summary.map(String).filter(Boolean) : undefined,
    slug: String(data.slug ?? slug),
    content,
  };
}

export function getAllGuides(locale: Locale): GuideSummary[] {
  return getAllGuideSlugs(locale)
    .map((slug) => getGuideBySlug(locale, slug))
    .filter((guide): guide is Guide => guide !== null)
    .map(
      (guide): GuideSummary => ({
        title: guide.title,
        description: guide.description,
        keywords: guide.keywords,
        author: guide.author,
        publishedAt: guide.publishedAt,
        updatedAt: guide.updatedAt,
        slug: guide.slug,
      }),
    )
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}
