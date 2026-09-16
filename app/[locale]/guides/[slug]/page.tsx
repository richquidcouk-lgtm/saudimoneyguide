import { ARTICLE_IMAGES, ARTICLE_IMAGE_MAP } from "@/lib/article-images";
import { notFound } from "next/navigation";
import { prepareArticle } from "@/components/articles/prepareArticle";
import { ArticleMeta, ArticleOverview, ArticleTrust } from "@/components/articles/ArticleExtras";
import ArticleImage from "@/components/articles/ArticleImage";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { getAllGuideSlugs, getAllGuides, getGuideBySlug } from "@/lib/guides";
import { GUIDE_CATEGORY_MAP } from "@/lib/guide-categories";
import { getRelatedBlogPosts } from "@/lib/blog";
import { buildAlternatesFromMap, buildOpenGraph } from "@/lib/seo";
import { buildArticleSchema, buildBreadcrumbSchema, buildFAQSchema } from "@/lib/schema";
import { extractFaqPairs } from "@/lib/faq";

export function generateStaticParams() {
  const locales: Locale[] = ["en", "ar"];
  return locales.flatMap((locale) =>
    getAllGuideSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = getGuideBySlug(locale as Locale, slug);
  if (!guide) return {};

  // Only advertise an hreflang alternate for a locale if this exact slug
  // also exists there — guides don't always publish in both languages at
  // the same time. Every guide still gets a self-referencing canonical
  // regardless, even when it's the only language it's published in.
  const pathsByLocale: Partial<Record<Locale, string>> = {};
  for (const l of ["en", "ar"] as Locale[]) {
    if (getGuideBySlug(l, slug) !== null) pathsByLocale[l] = `/guides/${slug}`;
  }
  const alternates = buildAlternatesFromMap(pathsByLocale, locale as Locale);

  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    authors: [{ name: guide.author }],
    alternates,
    ...buildOpenGraph({
      title: guide.title,
      description: guide.description,
      path: `/guides/${slug}`,
      locale: locale as Locale,
      type: "article",
    }),
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const guide = getGuideBySlug(locale, slug);
  if (!guide) notFound();
  const article = await prepareArticle(guide.content, locale);

  const otherGuides = getAllGuides(locale)
    .filter((g) => g.slug !== slug && (GUIDE_CATEGORY_MAP[g.slug] === GUIDE_CATEGORY_MAP[slug] || guide.content.includes('/guides/' + g.slug)))
    .sort((a, b) => Number(guide.content.includes('/guides/' + b.slug)) - Number(guide.content.includes('/guides/' + a.slug)))
    .slice(0, 3);
  const relatedPosts = getRelatedBlogPosts(slug, locale);

  const articleSchema = buildArticleSchema({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    author: guide.author,
    publishedAt: guide.publishedAt,
    updatedAt: guide.updatedAt,
    image: ARTICLE_IMAGE_MAP[slug] ? ARTICLE_IMAGES[ARTICLE_IMAGE_MAP[slug]].src : undefined,
    summary: guide.summary,
    sources: article.sources,
    locale,
  });
  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      { name: locale === "ar" ? "الرئيسية" : "Home", path: "" },
      { name: locale === "ar" ? "الأدلة" : "Guides", path: "/guides" },
      { name: guide.title, path: `/guides/${guide.slug}` },
    ],
    locale,
  );
  const faqPairs = extractFaqPairs(guide.content);
  const faqSchema = faqPairs.length > 0 ? buildFAQSchema(faqPairs) : null;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
        />
      )}
      <header className="border-b border-[var(--rule)] pb-6">
        <p className="eyebrow">{locale === "ar" ? "دليل" : "Guide"}</p>
        <h1 className="font-display mt-2 text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
          {guide.title}
        </h1>
        <ArticleMeta article={guide} locale={locale} minutes={article.readingMinutes} />
      </header>

      <ArticleImage slug={slug} locale={locale} />
      <ArticleOverview article={guide} locale={locale} headings={article.headings} toolSlugs={article.toolSlugs} />
      <div className="article-body mt-8">{article.content}</div>
      <ArticleTrust article={guide} locale={locale} sources={article.sources} />

      {relatedPosts.length > 0 && (
        <div className="mt-16 border-t border-[var(--rule)] pt-8">
          <p className="eyebrow">{locale === "ar" ? "بشرح بصري" : "Explained Visually"}</p>
          <h2 className="font-display mt-2 text-lg font-semibold text-[var(--ink)]">
            {locale === "ar" ? "من المدونة" : "From the blog"}
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {relatedPosts.map((post) => (
              <li key={post.slug}>
                <a href={`/${locale}/blog/${post.slug}`} className="card-premium group flex h-full flex-col p-4">
                  <span className="text-sm font-bold leading-snug text-[var(--ink)] group-hover:text-[var(--teal-dark)]">
                    {post.title}
                  </span>
                  <span className="mt-2 text-xs leading-relaxed text-[var(--ink-3)]">
                    {post.description}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {otherGuides.length > 0 && (
        <footer className="mt-10 border-t border-[var(--rule)] pt-8">
          <p className="eyebrow">{locale === "ar" ? "تابع القراءة" : "Keep Reading"}</p>
          <h2 className="font-display mt-2 text-lg font-semibold text-[var(--ink)]">
            {locale === "ar" ? "أدلة أخرى" : "Related guides"}
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {otherGuides.map((g) => (
              <li key={g.slug}>
                <a href={`/${locale}/guides/${g.slug}`} className="card-premium group flex h-full flex-col p-4">
                  <span className="text-sm font-bold leading-snug text-[var(--ink)] group-hover:text-[var(--teal-dark)]">
                    {g.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  );
}
