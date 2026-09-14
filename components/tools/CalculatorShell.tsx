export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-[var(--ink-2)]">{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-md border border-[var(--rule)] bg-[var(--paper)] px-3.5 py-2.5 text-sm text-[var(--ink)] focus:border-[var(--teal)] focus:outline-none";

export const selectClass = inputClass;

export function ResultRow({
  label,
  value,
  emphasize = false,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--rule)] py-2.5 last:border-b-0">
      <span className="text-sm text-[var(--ink-3)]">{label}</span>
      <span
        className={
          emphasize
            ? "font-display text-lg font-semibold text-[var(--teal-dark)]"
            : "text-sm font-bold text-[var(--ink)]"
        }
      >
        {value}
      </span>
    </div>
  );
}

export function ResultsCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[var(--rule)] bg-[var(--teal-soft)] px-5 py-4">
      {children}
    </div>
  );
}

export function formatCurrency(value: number, locale: string) {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(value);
}
