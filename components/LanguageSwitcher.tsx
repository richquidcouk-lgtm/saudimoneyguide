"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import type { Locale } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const t = useTranslations("language");
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const currentLocale = params.locale as Locale;
  const nextLocale: Locale = currentLocale === "en" ? "ar" : "en";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: nextLocale })}
      className="rounded-full border border-[var(--rule)] px-3.5 py-1.5 text-sm font-semibold text-[var(--ink-2)] transition-colors hover:border-[var(--teal)] hover:text-[var(--teal)]"
      aria-label={`Switch language to ${nextLocale === "ar" ? "Arabic" : "English"}`}
    >
      {t("switchTo")}
    </button>
  );
}
