import { setRequestLocale } from "next-intl/server";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-extrabold text-[var(--ink)]">
        {locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink-2)]">
        {locale === "ar"
          ? "يجب استبدال هذا النص بسياسة خصوصية فعلية قبل الإطلاق العلني — يتضمن ذلك الإفصاح عن استخدام روابط الشراكة (الأفلييت)."
          : "Placeholder — replace with a real privacy policy before public launch, including affiliate-link disclosure."}
      </p>
    </section>
  );
}
