import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "تواصل معنا" : "Contact",
    alternates: buildAlternates("/contact", locale as Locale),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-extrabold text-[var(--ink)]">
        {locale === "ar" ? "تواصل معنا" : "Contact"}
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink-2)]">
        {locale === "ar"
          ? "لإضافة تفاصيل التواصل الفعلية (البريد الإلكتروني، النموذج) قبل الإطلاق."
          : "Add real contact details (email, form) before launch."}
      </p>
    </section>
  );
}
