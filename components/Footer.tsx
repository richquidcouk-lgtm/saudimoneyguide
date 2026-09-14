"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--rule)] bg-[var(--paper)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <p className="text-base font-extrabold text-[var(--ink)]">
              {t("site.name")}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-3)]">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--ink-3)]">
              {t("footer.links")}
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              <li>
                <Link href="/about" className="text-[var(--ink-2)] hover:text-[var(--teal)]">
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[var(--ink-2)] hover:text-[var(--teal)]">
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[var(--ink-2)] hover:text-[var(--teal)]">
                  {t("footer.privacy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--rule)] pt-6 text-xs text-[var(--ink-3)]">
          © {year} {t("site.name")}. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
