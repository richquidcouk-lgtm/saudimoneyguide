import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import GuideCard from "@/components/GuideCard";
import { getAllGuides } from "@/lib/guides";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guides" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: buildAlternates("/guides", locale as Locale),
  };
}

export default async function GuidesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations("guides");
  const guides = getAllGuides(locale);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-extrabold text-[var(--ink)]">{t("title")}</h1>
      <p className="mt-2 max-w-2xl text-[var(--ink-3)]">{t("subtitle")}</p>

      {guides.length === 0 ? (
        <p className="mt-10 text-sm text-[var(--ink-3)]">{t("empty")}</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      )}
    </section>
  );
}
