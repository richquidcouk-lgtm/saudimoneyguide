"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

type Status = "idle" | "loading" | "success" | "error";

export default function EmailForm() {
  const t = useTranslations("newsletter");
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/email/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  // This form is designed to sit on the dark teal newsletter panel on the
  // homepage — text colors are chosen for contrast against that background,
  // not the page background.
  if (status === "success") {
    return <p className="text-sm font-semibold text-[var(--gold-soft)]">{t("success")}</p>;
  }

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-2">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("placeholder")}
          className="w-full rounded-md border border-transparent bg-white px-4 py-2.5 text-sm text-[var(--ink)] focus:border-[var(--gold)] focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-md bg-[var(--gold)] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[var(--gold-dark)] disabled:opacity-60"
        >
          {status === "loading" ? "…" : t("submit")}
        </button>
      </form>
      {status === "error" && (
        <p className="text-xs font-semibold text-[#F3B4B0]">{t("error")}</p>
      )}
    </div>
  );
}
