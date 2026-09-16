import TopicLinks from "@/components/TopicLinks";
import SaudiCityImage from "@/components/SaudiCityImage";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import GuideCard from "@/components/GuideCard";
import FAQ from "@/components/FAQ";
import EmailForm from "@/components/EmailForm";
import MatchQuiz from "@/components/MatchQuiz";
import { getAllGuides } from "@/lib/guides";
import { getAllBlogPosts } from "@/lib/blog";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";
import { TOOLS } from "@/lib/tools-data";
import { ToolIcon, ShieldCheckIcon, GlobeIcon, SparkleIcon } from "@/components/icons";

const BENEFIT_ICONS = [ShieldCheckIcon, GlobeIcon, SparkleIcon];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  const alternates = buildAlternates("", locale as Locale);

  return {
    title: { absolute: locale === "ar" ? "أدلة وحاسبات مالية للسعودية | المال السعودي" : "Saudi Finance Guides & Calculators | SaudiMoney" },
    description: locale === "ar" ? "أدلة وحاسبات مجانية للراتب ومكافأة نهاية الخدمة والتمويل والميزانية في السعودية، بالعربية والإنجليزية." : "Free Saudi salary, end-of-service, finance and budgeting calculators, with practical banking guides in English and Arabic.",
    ...buildOpenGraph({ title: locale === "ar" ? "أدلة وحاسبات مالية للسعودية" : "Saudi Finance Guides & Calculators", description: t("tagline"), path: "", locale: locale as Locale }),
    alternates,
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations();
  const allGuides = getAllGuides(locale);
  const guides = allGuides.slice(0, 3);
  const blogPosts = getAllBlogPosts(locale).slice(0, 3);
  const benefits = t.raw("benefits.items") as { title: string; description: string }[];
  const faqItems = t.raw("faq.items") as { question: string; answer: string }[];

  const stats = [
    { value: String(allGuides.length), label: locale === "ar" ? "دليل متعمّق" : "In-depth guides" },
    { value: String(TOOLS.length), label: locale === "ar" ? "أداة تفاعلية" : "Interactive tools" },
    { value: "2", label: locale === "ar" ? "لغتان كاملتان" : "Full languages" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pattern-paper relative overflow-hidden bg-[var(--paper)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/60 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          <div className="text-start">
          <span className="chip">
            <span className="ornament-dot" aria-hidden="true" />
            {locale === "ar" ? "التمويل الشخصي — السعودية حصرًا" : "Personal Finance — Saudi Arabia Only"}
          </span>
          <h1 className="font-display mt-6 text-4xl font-semibold leading-[1.13] text-[var(--ink)] sm:text-5xl xl:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--ink-2)] sm:text-lg">
            {t("hero.subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/tools/salary-calculator" className="rounded-lg bg-[var(--teal)] px-5 py-3 text-sm font-bold text-white hover:bg-[var(--teal-dark)]">{locale === "ar" ? "احسب صافي راتبك" : "Calculate take-home pay"}</Link>
            <Link href="/tools/gratuity-calculator" className="rounded-lg border border-[var(--teal)] px-5 py-3 text-sm font-bold text-[var(--teal-dark)]">{locale === "ar" ? "احسب مكافأة نهاية الخدمة" : "Calculate end-of-service"}</Link>
            <Link href="/guides" className="rounded-lg border border-[var(--teal)] px-5 py-3 text-sm font-bold text-[var(--teal-dark)]">{locale === "ar" ? "تصفح الأدلة" : "Explore guides"}</Link>
          </div>
          </div>
          <SaudiCityImage locale={locale} hero />
          </div>
          <div className="mx-auto mt-12 max-w-3xl text-start">
            <MatchQuiz guides={allGuides} />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
            <Link href="/guides" className="nav-link font-bold text-[var(--teal-dark)]">
              {locale === "ar" ? "أو تصفّح كل الأدلة ←" : "Or browse all guides →"}
            </Link>
            <Link href="/tools" className="nav-link font-bold text-[var(--teal-dark)]">
              {locale === "ar" ? "أو تصفّح كل الأدوات ←" : "Or browse all tools →"}
            </Link>
          </div>

          <dl className="mx-auto mt-14 flex max-w-lg items-stretch justify-center divide-x divide-[var(--rule-strong)] rtl:divide-x-reverse border-t border-[var(--rule)] pt-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex-1 px-4 text-center">
                <dt className="font-display text-3xl font-semibold text-[var(--teal-dark)]">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs font-semibold text-[var(--ink-3)]">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6"><h2 className="font-display text-2xl font-semibold">{locale === "ar" ? "استكشف حسب الموضوع" : "Explore by money topic"}</h2><TopicLinks locale={locale} /></section>

      {/* Featured guides */}
      {guides.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">{locale === "ar" ? "مختارة لك" : "Start Here"}</p>
              <h2 className="font-display mt-2 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
                {t("featured.title")}
              </h2>
            </div>
            <Link
              href="/guides"
              className="nav-link hidden shrink-0 text-sm font-bold text-[var(--teal-dark)] sm:block"
            >
              {locale === "ar" ? "عرض كل الأدلة ←" : "View all guides →"}
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {guides.map((guide, i) => (
              <GuideCard key={guide.slug} guide={guide} index={i + 1} />
            ))}
          </div>
        </section>
      )}

      {/* Featured tools */}
      <section className="pattern-paper relative border-y border-[var(--rule)] py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="eyebrow">{locale === "ar" ? "احسب بنفسك" : "Do The Math"}</p>
          <h2 className="font-display mt-2 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
            {locale === "ar" ? "أدوات مالية مجانية" : "Free Financial Tools"}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.slice(0, 6).map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`} className="card-premium group flex flex-col p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--teal-soft)] text-[var(--teal-dark)] transition-colors group-hover:bg-[var(--teal)] group-hover:text-white">
                  <ToolIcon slug={tool.slug} />
                </span>
                <h3 className="mt-4 text-base font-bold text-[var(--ink)] group-hover:text-[var(--teal-dark)]">
                  {locale === "ar" ? tool.titleAr : tool.titleEn}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-3)]">
                  {locale === "ar" ? tool.descriptionAr : tool.descriptionEn}
                </p>
                <span className="mt-4 text-sm font-bold text-[var(--teal-dark)]">
                  {locale === "ar" ? "احسب الآن ←" : "Calculate now →"}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/tools" className="nav-link text-sm font-bold text-[var(--teal-dark)]">
              {locale === "ar" ? "عرض كل الأدوات ←" : "View all tools →"}
            </Link>
          </div>
        </div>
      </section>

      {/* From the blog */}
      {blogPosts.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">{locale === "ar" ? "بشرح بصري" : "Explained Visually"}</p>
              <h2 className="font-display mt-2 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
                {locale === "ar" ? "من المدونة" : "From the Blog"}
              </h2>
            </div>
            <Link
              href="/blog"
              className="nav-link hidden shrink-0 text-sm font-bold text-[var(--teal-dark)] sm:block"
            >
              {locale === "ar" ? "عرض كل المقالات ←" : "View all posts →"}
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card-premium group flex flex-col p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--ink-4)]">
                  {post.publishedAt}
                </span>
                <h3 className="font-display mt-2 text-lg font-semibold leading-snug text-[var(--ink)] group-hover:text-[var(--teal-dark)]">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-3)]">
                  {post.description}
                </p>
                <span className="mt-4 text-sm font-bold text-[var(--teal-dark)]">
                  {locale === "ar" ? "اقرأ المقال ←" : "Read post →"}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="eyebrow">{locale === "ar" ? "لماذا نحن" : "Why This Site"}</p>
          <h2 className="font-display mt-2 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
            {t("benefits.title")}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {benefits.map((item, i) => {
              const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
              return (
                <div key={item.title} className="card-premium p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--gold)] text-[var(--gold-dark)]">
                    <Icon />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-[var(--ink)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-3)]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="pattern-dark relative overflow-hidden rounded-2xl bg-[var(--teal-dark)] px-6 py-14 text-center sm:px-12">
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-[var(--gold)]/25" />
          <p className="eyebrow relative text-[#C9A867]">
            {locale === "ar" ? "ابقَ على اطلاع" : "Stay Ahead"}
          </p>
          <h2 className="font-display relative mt-2 text-2xl font-semibold text-white sm:text-3xl">
            {t("newsletter.title")}
          </h2>
          <p className="relative mx-auto mt-2 max-w-md text-sm text-[#B7D0C7]">{t("newsletter.subtitle")}</p>
          <div className="relative mt-7 flex justify-center">
            <EmailForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="ornament">
          <span className="ornament-dot" aria-hidden="true" />
        </div>
        <p className="eyebrow mt-4 text-center">{locale === "ar" ? "أسئلة متكررة" : "Common Questions"}</p>
        <h2 className="font-display mt-2 text-center text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
          {t("faq.title")}
        </h2>
        <div className="mt-8">
          <FAQ items={faqItems} />
        </div>
      </section>
    </>
  );
}
