"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";

export default function Header() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/guides", label: t("nav.guides") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/tools", label: t("nav.tools") },
    { href: "/match", label: t("nav.match") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[var(--paper)]/90 shadow-[0_1px_0_rgba(20,32,27,0.04)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" aria-label={t("site.name")}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link rounded-md px-3.5 py-2 text-sm font-semibold text-[var(--ink-2)] transition-colors hover:text-[var(--teal-dark)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/search"
            aria-label={t("nav.search")}
            className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--ink-3)] transition-colors hover:bg-[var(--teal-soft)] hover:text-[var(--teal-dark)]"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </Link>
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <Link
            href="/search"
            aria-label={t("nav.search")}
            className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--ink-3)]"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </Link>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--rule)]"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="sr-only">Menu</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M2 5h14M2 13h14"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent" />

      {open && (
        <div className="border-b border-[var(--rule)] bg-[var(--paper)] px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-semibold text-[var(--ink-2)] hover:bg-[var(--teal-soft)]"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
