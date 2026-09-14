import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import GuideCard from "@/components/GuideCard";
import FAQ from "@/components/FAQ";
import EmailForm from "@/components/EmailForm";
import { getAllGuides } from "@/lib/guides";
import { buildAlternates } from "@/lib/seo";
import { TOOLS } from "@/lib/tools-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  const alternates = buildAlternates("", locale as Locale);

  return {
    title: t("name"),
    description: t("tagline"),
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
      <section className="relative overflow-hidden bg-[var(--paper)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--rule-strong)]" />
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <p className="eyebrow">
            {locale === "ar" ? "التمويل الشخصي — السعودية حصرًا" : "Personal Finance — Saudi Arabia Only"}
          </p>
          <h1 className="font-display mt-4 text-4xl font-semibold leading-[1.1] text-[var(--ink)] sm:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--ink-2)] sm:text-lg">
            {t("hero.subtitle")}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--teal)] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--teal-dark)]"
            >
              {t("hero.cta")}
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--rule-strong)] px-6 py-3 text-sm font-bold text-[var(--ink-2)] transition-colors hover:border-[var(--teal)] hover:text-[var(--teal-dark)]"
            >
              {locale === "ar" ? "جرّب الأدوات المجانية" : "Try the free tools"}
            </Link>
          </div>

          <dl className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-[var(--rule)] pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-3xl font-semibold text-[var(--teal-dark)]">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs font-semibold text-[var(--ink-3)]">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

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
              className="hidden shrink-0 text-sm font-bold text-[var(--teal-dark)] hover:underline sm:block"
            >
              {locale === "ar" ? "عرض كل الأدلة ←" : "View all guides →"}
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </section>
      )}

      {/* Featured tools */}
      <section className="border-y border-[var(--rule)] bg-[var(--paper)] py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="eyebrow">{locale === "ar" ? "احسب بنفسك" : "Do The Math"}</p>
          <h2 className="font-display mt-2 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
            {locale === "ar" ? "أدوات مالية مجانية" : "Free Financial Tools"}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.slice(0, 6).map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group flex flex-col rounded-lg border border-[var(--rule)] bg-[var(--background)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--teal-mid)] hover:shadow-[0_8px_24px_-12px_rgba(11,93,82,0.35)]"
              >
                <h3 className="text-base font-bold text-[var(--ink)] group-hover:text-[var(--teal-dark)]">
                  {locale === "ar" ? tool.titleAr : tool.titleEn}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-3)]">
                  {locale === "ar" ? tool.descriptionAr : tool.descriptionEn}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="eyebrow">{locale === "ar" ? "لماذا نحن" : "Why This Site"}</p>
          <h2 className="font-display mt-2 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
            {t("benefits.title")}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {benefits.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border-t-2 border-[var(--gold)] bg-[var(--paper)] p-6 shadow-sm"
              >
                <h3 className="text-base font-bold text-[var(--ink)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-3)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="rounded-2xl bg-[var(--teal-dark)] px-6 py-12 text-center sm:px-12">
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
            {t("newsletter.title")}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#B7D0C7]">{t("newsletter.subtitle")}</p>
          <div className="mt-7 flex justify-center">
            <EmailForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <p className="eyebrow text-center">{locale === "ar" ? "أسئلة متكررة" : "Common Questions"}</p>
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
