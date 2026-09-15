"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { TOOLS } from "@/lib/tools-data";
import Logo from "./Logo";

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="pattern-dark relative bg-[var(--teal-dark)] text-[#DCEAE4]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/60 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-xs lg:col-span-1">
            <Link href="/" className="inline-flex">
              <Logo theme="dark" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#B7D0C7]">{t("footer.tagline")}</p>
          </div>

          <div>
            <p className="eyebrow text-[#C9A867]">{t("nav.guides")}</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/guides" className="text-[#DCEAE4] transition-colors hover:text-white">
                  {t("guides.title")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[#DCEAE4] transition-colors hover:text-white">
                  {t("nav.blog")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-[#C9A867]">{t("nav.tools")}</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {TOOLS.slice(0, 5).map((tool) => (
                <li key={tool.slug}>
                  <Link href={`/tools/${tool.slug}`} className="text-[#DCEAE4] transition-colors hover:text-white">
                    {locale === "ar" ? tool.titleAr : tool.titleEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-[#C9A867]">{t("footer.links")}</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/about" className="text-[#DCEAE4] transition-colors hover:text-white">
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#DCEAE4] transition-colors hover:text-white">
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[#DCEAE4] transition-colors hover:text-white">
                  {t("footer.privacy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[#8FB8AB] sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {t("site.name")}. {t("footer.rights")}
          </span>
        </div>
      </div>
    </footer>
  );
}
