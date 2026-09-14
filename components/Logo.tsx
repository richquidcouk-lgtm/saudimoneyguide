import { useTranslations } from "next-intl";

export default function Logo({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("site");

  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[var(--teal)]"
        aria-hidden="true"
      >
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
      {!compact && (
        <span className="font-display text-lg font-semibold leading-none tracking-tight text-[var(--ink)]">
          {t("name")}
        </span>
      )}
    </span>
  );
}
