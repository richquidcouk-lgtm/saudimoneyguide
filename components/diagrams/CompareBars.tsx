type BarItem = { label: string; value: number; display: string };

export default function CompareBars({ title, items }: { title?: string; items: BarItem[] }) {
  const max = Math.max(...items.map((item) => item.value), 1);

  return (
    <div className="not-prose my-8 rounded-xl border border-[var(--rule)] bg-[var(--paper)] p-5 sm:p-6">
      {title && <p className="text-sm font-bold text-[var(--ink)]">{title}</p>}
      <div className={`flex flex-col gap-4 ${title ? "mt-5" : ""}`}>
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-semibold text-[var(--ink-2)]">{item.label}</span>
              <span className="font-display text-sm font-bold text-[var(--teal-dark)]">
                {item.display}
              </span>
            </div>
            <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-[var(--rule)]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--teal-mid)] to-[var(--teal)]"
                style={{ width: `${Math.max(4, (item.value / max) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
