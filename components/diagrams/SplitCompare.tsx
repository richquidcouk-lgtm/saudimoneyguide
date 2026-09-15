type Side = { title: string; points: string[] };

export default function SplitCompare({ left, right }: { left: Side; right: Side }) {
  return (
    <div className="not-prose my-8 grid gap-4 sm:grid-cols-2">
      {[left, right].map((side, i) => (
        <div
          key={side.title}
          className={`rounded-xl border p-5 ${
            i === 0
              ? "border-[var(--teal-mid)]/40 bg-[var(--teal-soft)]/40"
              : "border-[var(--gold)]/40 bg-[var(--gold-soft)]/40"
          }`}
        >
          <p className="font-display text-base font-semibold text-[var(--ink)]">{side.title}</p>
          <ul className="mt-3 flex flex-col gap-2">
            {side.points.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-[var(--ink-2)]">
                <span
                  className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                    i === 0 ? "bg-[var(--teal)]" : "bg-[var(--gold)]"
                  }`}
                />
                {point}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
