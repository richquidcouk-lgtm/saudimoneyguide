import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import GuideCard from "@/components/GuideCard";
import FAQ from "@/components/FAQ";
import EmailForm from "@/components/EmailForm";
import { getAllGuides } from "@/lib/guides";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  const alternates = buildAlternates("");

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
  const guides = getAllGuides(locale).slice(0, 3);
  const benefits = t.raw("benefits.items") as { title: string; description: string }[];
  const faqItems = t.raw("faq.items") as { question: string; answer: string }[];

  return (
    <>
      {/* Hero */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper)]">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <h1 className="text-3xl font-extrabold leading-tight text-[var(--ink)] sm:text-5xl">
            {t("hero.title")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--ink-2)] sm:text-lg">
            {t("hero.subtitle")}
          </p>
          <Link
            href="/guides"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--teal)] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--teal-dark)]"
          >
            {t("hero.cta")}
          </Link>
        </div>
      </section>

      {/* Featured guides */}
      {guides.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-extrabold text-[var(--ink)]">{t("featured.title")}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </section>
      )}

      {/* Benefits */}
      <section className="bg-[var(--paper)] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-[var(--ink)]">{t("benefits.title")}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {benefits.map((item) => (
              <div key={item.title} className="rounded-xl border border-[var(--rule)] bg-white p-6">
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
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl bg-[var(--teal)] px-6 py-10 text-center sm:px-12">
          <h2 className="text-xl font-extrabold text-white sm:text-2xl">
            {t("newsletter.title")}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/80">
            {t("newsletter.subtitle")}
          </p>
          <div className="mt-6 flex justify-center">
            <EmailForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-extrabold text-[var(--ink)]">{t("faq.title")}</h2>
        <div className="mt-6">
          <FAQ items={faqItems} />
        </div>
      </section>
    </>
  );
}
