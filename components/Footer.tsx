"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { TOOLS } from "@/lib/tools-data";

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--teal-dark)] text-[#DCEAE4]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-xs lg:col-span-1">
            <Link href="/" className="inline-flex">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 18L10 10L14 14L20 5"
                    stroke="var(--gold-soft)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 5H20V10"
                    stroke="var(--gold-soft)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
            <p className="font-display mt-4 text-lg font-semibold text-white">{t("site.name")}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#B7D0C7]">{t("footer.tagline")}</p>
          </div>

          <div>
            <p className="eyebrow text-[#8FB8AB]">{t("nav.guides")}</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/guides" className="text-[#DCEAE4] hover:text-white">
                  {t("guides.title")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-[#8FB8AB]">{t("nav.tools")}</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {TOOLS.slice(0, 5).map((tool) => (
                <li key={tool.slug}>
                  <Link href={`/tools/${tool.slug}`} className="text-[#DCEAE4] hover:text-white">
                    {locale === "ar" ? tool.titleAr : tool.titleEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-[#8FB8AB]">{t("footer.links")}</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/about" className="text-[#DCEAE4] hover:text-white">
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#DCEAE4] hover:text-white">
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[#DCEAE4] hover:text-white">
                  {t("footer.privacy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[#8FB8AB] sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {t("site.name")}. {t("footer.rights")}
          </span>
        </div>
      </div>
    </footer>
  );
}
