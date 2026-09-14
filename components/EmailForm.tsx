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

  if (status === "success") {
    return <p className="text-sm font-semibold text-[var(--teal)]">{t("success")}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("placeholder")}
        className="w-full rounded-lg border border-[var(--rule)] bg-white px-4 py-2.5 text-sm text-[var(--ink)] focus:border-[var(--teal)] focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="shrink-0 rounded-lg bg-[var(--teal)] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[var(--teal-dark)] disabled:opacity-60"
      >
        {status === "loading" ? "…" : t("submit")}
      </button>
      {status === "error" && (
        <p className="text-xs font-semibold text-red-600 sm:absolute sm:mt-10">{t("error")}</p>
      )}
    </form>
  );
}
