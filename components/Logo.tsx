import { useTranslations, useLocale } from "next-intl";

// Splits the brand name into a two-tone wordmark lockup. Works for the
// English "SaudiMoney" (no space — split at the internal capital letter)
// and the Arabic "المال السعودي" (split on the first space) without
// hardcoding either literal string, so a future copy tweak in messages/
// still renders correctly.
function splitBrandName(name: string): [string, string] {
  const spaceIndex = name.indexOf(" ");
  if (spaceIndex !== -1) {
    return [name.slice(0, spaceIndex), name.slice(spaceIndex)];
  }
  const capitalMatch = name.slice(1).match(/[A-Z]/);
  if (capitalMatch && capitalMatch.index !== undefined) {
    const splitAt = capitalMatch.index + 1;
    return [name.slice(0, splitAt), name.slice(splitAt)];
  }
  return [name, ""];
}

export default function Logo({
  compact = false,
  theme = "light",
}: {
  compact?: boolean;
  theme?: "light" | "dark";
}) {
  const t = useTranslations("site");
  const locale = useLocale();
  const [first, second] = splitBrandName(t("name"));
  const monogram = locale === "ar" ? "م" : "S";

  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--teal)] to-[var(--teal-dark)] shadow-[0_0_0_1.5px_var(--gold),0_6px_16px_-6px_rgba(11,93,82,0.55)]"
        aria-hidden="true"
      >
        <span className="pointer-events-none absolute inset-[3px] rounded-full border border-[var(--gold)]/40" />
        <span className="font-display relative text-[17px] font-bold leading-none text-[var(--gold-soft)]">
          {monogram}
        </span>
      </span>
      {!compact && (
        <span className="font-display text-lg font-semibold leading-none tracking-tight">
          <span className={theme === "dark" ? "text-white" : "text-[var(--ink)]"}>{first}</span>
          <span className={theme === "dark" ? "text-[#E8C77E]" : "text-gold-foil"}>{second}</span>
        </span>
      )}
    </span>
  );
}
