import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import GuideCard from "@/components/GuideCard";
import { getAllGuides } from "@/lib/guides";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";
import { GUIDE_CATEGORIES, getCategoryForSlug } from "@/lib/guide-categories";
import { CategoryIcon } from "@/components/icons";

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
    ...buildOpenGraph({ title: t("title"), description: t("subtitle"), path: "/guides", locale: locale as Locale }),
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

  const grouped = GUIDE_CATEGORIES.map((category) => ({
    category,
    guides: guides.filter((g) => getCategoryForSlug(g.slug) === category.id),
  })).filter((group) => group.guides.length > 0);

  const guideNumbers = new Map(grouped.flatMap((group) => group.guides).map((guide, index) => [guide.slug, index + 1]));

  return (
    <>
      <section className="pattern-paper relative overflow-hidden border-b border-[var(--rule)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/60 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="eyebrow">{locale === "ar" ? "المكتبة الكاملة" : "The Full Library"}</p>
          <h1 className="font-display mt-2 max-w-2xl text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--ink-2)]">
            {t("subtitle")}
          </p>

          {grouped.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {grouped.map(({ category, guides: catGuides }) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="chip transition-colors hover:border-[var(--teal-mid)] hover:text-[var(--teal-dark)]"
                >
                  <CategoryIcon id={category.id} className="h-4 w-4" />
                  {locale === "ar" ? category.labelAr : category.labelEn}
                  <span className="text-[var(--ink-4)]">{catGuides.length}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {guides.length === 0 ? (
          <p className="text-sm text-[var(--ink-3)]">{t("empty")}</p>
        ) : (
          <div className="flex flex-col gap-16">
            {grouped.map(({ category, guides: catGuides }) => (
              <section key={category.id} id={category.id} className="scroll-mt-24">
                <div className="flex items-start gap-4 border-b border-[var(--rule)] pb-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--gold)] text-[var(--gold-dark)]">
                    <CategoryIcon id={category.id} />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-[var(--ink)] sm:text-2xl">
                      <a href={`/${locale}/topics/${category.id}`} className="hover:text-[var(--teal-dark)]">{locale === "ar" ? category.labelAr : category.labelEn}</a>
                    </h2>
                    <p className="mt-1 text-sm text-[var(--ink-3)]">
                      {locale === "ar" ? category.descriptionAr : category.descriptionEn}
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {catGuides.map((guide) => (
                    <GuideCard key={guide.slug} guide={guide} index={guideNumbers.get(guide.slug)} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
