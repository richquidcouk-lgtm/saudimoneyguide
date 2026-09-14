"use client";

import { useState } from "react";

type Variant = "button" | "link" | "badge";

const VARIANT_CLASSES: Record<Variant, string> = {
  button:
    "inline-flex items-center gap-2 rounded-lg bg-[var(--teal)] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[var(--teal-dark)]",
  link: "font-semibold text-[var(--teal)] underline decoration-[var(--teal-soft)] underline-offset-2 hover:decoration-[var(--teal)]",
  badge:
    "inline-flex items-center gap-1.5 rounded-full bg-[var(--gold-soft)] px-3 py-1 text-xs font-bold text-[var(--gold)]",
};

export default function AffiliateLink({
  partnerId,
  url,
  text,
  guideSlug,
  variant = "button",
}: {
  partnerId: string;
  url: string;
  text: string;
  guideSlug?: string;
  variant?: Variant;
}) {
  const [pending, setPending] = useState(false);

  const handleClick = () => {
    setPending(true);
    fetch("/api/affiliate/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ partnerId, guideSlug, action: "click" }),
      keepalive: true,
    }).catch(() => {
      // Tracking failures must never block the outbound click.
    });
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      className={VARIANT_CLASSES[variant]}
      aria-label={text}
      aria-busy={pending}
    >
      {text}
      {variant === "button" && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M3 11L11 3M11 3H5M11 3V9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </a>
  );
}
