import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Locale } from "@/i18n/routing";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogFrontmatter = {
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
  /** Guide slugs this post is the visual/explainer companion to — drives
   * the reciprocal "Related reading" block shown on those guide pages. */
  relatedGuides: string[];
};

export type BlogPost = BlogFrontmatter & { content: string };
export type BlogSummary = BlogFrontmatter;

function localeDir(locale: Locale) {
  return path.join(BLOG_DIR, locale);
}

export function getAllBlogSlugs(locale: Locale): string[] {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getBlogPostBySlug(locale: Locale, slug: string): BlogPost | null {
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
    relatedGuides: Array.isArray(data.relatedGuides) ? data.relatedGuides.map(String) : [],
    content,
  };
}

export function getAllBlogPosts(locale: Locale): BlogSummary[] {
  return getAllBlogSlugs(locale)
    .map((slug) => getBlogPostBySlug(locale, slug))
    .filter((post): post is BlogPost => post !== null)
    .map(
      (post): BlogSummary => ({
        title: post.title,
        description: post.description,
        keywords: post.keywords,
        author: post.author,
        publishedAt: post.publishedAt,
        updatedAt: post.updatedAt,
        slug: post.slug,
        relatedGuides: post.relatedGuides,
      }),
    )
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

/** Reverse lookup for guide pages: which blog posts declare this guide as related. */
export function getRelatedBlogPosts(guideSlug: string, locale: Locale): BlogSummary[] {
  return getAllBlogPosts(locale).filter((post) => post.relatedGuides.includes(guideSlug));
}
