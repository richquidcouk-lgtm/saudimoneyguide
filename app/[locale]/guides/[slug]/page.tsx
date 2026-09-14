import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { getAllGuideSlugs, getAllGuides, getGuideBySlug } from "@/lib/guides";
import { getMdxComponents } from "@/components/mdx-components";
import { buildAlternatesFromMap } from "@/lib/seo";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/schema";

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

  const articleSchema = buildArticleSchema({
    title: guide.title,
    description: guide.description,
    slug: guide.slug,
    author: guide.author,
    publishedAt: guide.publishedAt,
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
      <header className="border-b border-[var(--rule)] pb-6">
        <h1 className="text-3xl font-extrabold leading-tight text-[var(--ink)]">
          {guide.title}
        </h1>
        <p className="mt-3 text-[var(--ink-3)]">{guide.description}</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[var(--ink-3)]">
          {guide.author} · {guide.publishedAt}
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
          }}
        />
      </div>

      {otherGuides.length > 0 && (
        <footer className="mt-16 border-t border-[var(--rule)] pt-8">
          <h2 className="text-lg font-extrabold text-[var(--ink)]">More guides</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {otherGuides.map((g) => (
              <li key={g.slug}>
                <a
                  href={`/${locale}/guides/${g.slug}`}
                  className="font-semibold text-[var(--teal)] hover:underline"
                >
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  );
}
