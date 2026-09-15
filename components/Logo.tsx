import { useTranslations } from "next-intl";

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
  const [first, second] = splitBrandName(t("name"));

  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--teal)] to-[var(--teal-dark)] shadow-[0_0_0_1.5px_var(--gold),0_6px_16px_-6px_rgba(11,93,82,0.55)]"
        aria-hidden="true"
      >
        <span className="pointer-events-none absolute inset-[3px] rounded-full border border-[var(--gold)]/40" />
        {/* A date palm — the one motif that reads unmistakably "Saudi" without
            religious or political ambiguity (it's on the real Riyal coins),
            which doubles it as a "money" cue too since the mark sits inside
            a coin medallion. */}
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" className="relative" aria-hidden="true">
          <path d="M8,19 L16,19" stroke="var(--gold-soft)" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12,19 L12,8" stroke="var(--gold-soft)" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M12,8 L3,11" stroke="var(--gold-soft)" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12,8 L5,3" stroke="var(--gold-soft)" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12,8 L12,1" stroke="var(--gold-soft)" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12,8 L19,3" stroke="var(--gold-soft)" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12,8 L21,11" stroke="var(--gold-soft)" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
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
