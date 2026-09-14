import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("site");

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-extrabold text-[var(--ink)]">{t("name")}</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink-2)]">{t("tagline")}</p>
    </section>
  );
}
