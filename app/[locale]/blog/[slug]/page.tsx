import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/blog";
import { getGuideBySlug } from "@/lib/guides";
import { getMdxComponents } from "@/components/mdx-components";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";
import { buildArticleSchema, buildBreadcrumbSchema, buildFAQSchema } from "@/lib/schema";
import { extractFaqPairs } from "@/lib/faq";

export function generateStaticParams() {
  const locales: Locale[] = ["en", "ar"];
  return locales.flatMap((locale) => getAllBlogSlugs(locale).map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(locale as Locale, slug);
  if (!post) return {};

  const pathsByLocale: Partial<Record<Locale, string>> = {};
  for (const l of ["en", "ar"] as Locale[]) {
    if (getBlogPostBySlug(l, slug) !== null) pathsByLocale[l] = `/blog/${slug}`;
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: buildAlternates(`/blog/${slug}`, locale as Locale),
    ...buildOpenGraph({
      title: post.title,
      description: post.description,
      path: `/blog/${slug}`,
      locale: locale as Locale,
      type: "article",
    }),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const post = getBlogPostBySlug(locale, slug);
  if (!post) notFound();

  const relatedGuides = post.relatedGuides
    .map((guideSlug) => getGuideBySlug(locale, guideSlug))
    .filter((guide): guide is NonNullable<typeof guide> => guide !== null);

  const articleSchema = buildArticleSchema({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    author: post.author,
    publishedAt: post.publishedAt,
    locale,
  });
  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      { name: locale === "ar" ? "الرئيسية" : "Home", path: "" },
      { name: locale === "ar" ? "المدونة" : "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ],
    locale,
  );
  const faqPairs = extractFaqPairs(post.content);
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
        <p className="eyebrow">{locale === "ar" ? "مقال" : "Article"}</p>
        <h1 className="font-display mt-2 text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-[var(--ink-3)]">{post.description}</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[var(--ink-4)]">
          {post.author} · {post.publishedAt}
        </p>
      </header>

      <div className="mt-6">
        <MDXRemote
          source={post.content}
          components={getMdxComponents(locale)}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
            // See the guide page's identical comment — content is fully
            // author-controlled, so it's safe to allow the object/array
            // literal props our diagram components need.
            blockJS: false,
          }}
        />
      </div>

      {relatedGuides.length > 0 && (
        <footer className="mt-16 border-t border-[var(--rule)] pt-8">
          <p className="eyebrow">{locale === "ar" ? "اقرأ أكثر" : "Go Deeper"}</p>
          <h2 className="font-display mt-2 text-lg font-semibold text-[var(--ink)]">
            {locale === "ar" ? "الأدلة الكاملة ذات الصلة" : "Related full guides"}
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {relatedGuides.map((guide) => (
              <li key={guide.slug}>
                <a href={`/${locale}/guides/${guide.slug}`} className="card-premium group flex h-full flex-col p-4">
                  <span className="text-sm font-bold leading-snug text-[var(--ink)] group-hover:text-[var(--teal-dark)]">
                    {guide.title}
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
