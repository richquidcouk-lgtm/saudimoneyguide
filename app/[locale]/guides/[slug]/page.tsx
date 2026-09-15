import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { getAllGuideSlugs, getAllGuides, getGuideBySlug } from "@/lib/guides";
import { getRelatedBlogPosts } from "@/lib/blog";
import { getMdxComponents } from "@/components/mdx-components";
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

  const otherGuides = getAllGuides(locale)
    .filter((g) => g.slug !== slug)
    .slice(0, 3);
  const relatedPosts = getRelatedBlogPosts(slug, locale);

  const articleSchema = buildArticleSchema({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    author: guide.author,
    publishedAt: guide.publishedAt,
    updatedAt: guide.updatedAt,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <header className="border-b border-[var(--rule)] pb-6">
        <p className="eyebrow">{locale === "ar" ? "دليل" : "Guide"}</p>
        <h1 className="font-display mt-2 text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
          {guide.title}
        </h1>
        <p className="mt-3 text-[var(--ink-3)]">{guide.description}</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[var(--ink-4)]">
          {guide.author} · {guide.publishedAt}
          {guide.updatedAt && <> · {locale === "ar" ? "آخر تحديث: " : "Updated: "}{guide.updatedAt}</>}
        </p>
      </header>

      <div className="mt-6">
        <MDXRemote
          source={guide.content}
          components={getMdxComponents(locale)}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
            // All content is authored by us, not user-submitted, so it's
            // safe to allow the JS-expression JSX props (object/array
            // literals like steps={[...]}) our diagram components need —
            // next-mdx-remote strips these by default as an XSS guard
            // meant for untrusted MDX.
            blockJS: false,
          }}
        />
      </div>

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
            {locale === "ar" ? "أدلة أخرى" : "More guides"}
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
