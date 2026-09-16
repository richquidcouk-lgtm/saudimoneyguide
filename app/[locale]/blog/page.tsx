import TopicLinks from "@/components/TopicLinks";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getAllBlogPosts } from "@/lib/blog";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

const COPY = {
  en: {
    title: "Saudi Personal Finance Articles",
    subtitle:
      "Practical Saudi finance articles on salary, borrowing, rent, insurance, transfers and saving, with worked examples and relevant calculators.",
    eyebrow: "Explained Visually",
    empty: "No posts published yet — check back soon.",
    readPost: "Read post →",
  },
  ar: {
    title: "مقالات المال والتمويل في السعودية",
    subtitle:
      "مقالات عملية عن الرواتب والتمويل والسكن والتأمين والتحويلات والادخار في السعودية، مع أمثلة وحاسبات مرتبطة بالموضوع.",
    eyebrow: "بشرح بصري",
    empty: "لا توجد مقالات منشورة بعد — تابعنا قريبًا.",
    readPost: "اقرأ المقال ←",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = COPY[locale === "ar" ? "ar" : "en"];
  return {
    title: c.title,
    description: c.subtitle,
    alternates: buildAlternates("/blog", locale as Locale),
    ...buildOpenGraph({ title: c.title, description: c.subtitle, path: "/blog", locale: locale as Locale }),
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const c = COPY[locale === "ar" ? "ar" : "en"];
  const posts = getAllBlogPosts(locale);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="eyebrow">{c.eyebrow}</p>
      <h1 className="font-display mt-2 text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
        {c.title}
      </h1>
      <p className="mt-2 max-w-2xl text-[var(--ink-3)]">{c.subtitle}</p>
      <TopicLinks locale={locale} />

      {posts.length === 0 ? (
        <p className="mt-10 text-sm text-[var(--ink-3)]">{c.empty}</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card-premium group flex flex-col p-5">
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--ink-4)]">
                {post.publishedAt}
              </span>
              <h2 className="font-display mt-2 text-lg font-semibold leading-snug text-[var(--ink)] group-hover:text-[var(--teal-dark)]">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-3)]">
                {post.description}
              </p>
              <span className="mt-4 text-sm font-bold text-[var(--teal-dark)]">{c.readPost}</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
