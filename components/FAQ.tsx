"use client";

import { useState } from "react";

type FAQItem = { question: string; answer: string };

export default function FAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col divide-y divide-[var(--rule)] overflow-hidden rounded-xl border border-[var(--rule)] bg-[var(--paper)] shadow-[var(--shadow-card)]">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start transition-colors hover:bg-[var(--teal-soft)]/40"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-bold text-[var(--ink)]">{item.question}</span>
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--gold)] text-base leading-none text-[var(--gold-dark)] transition-transform ${isOpen ? "rotate-45" : ""}`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            {isOpen && (
              <p className="px-5 pb-4 text-sm leading-relaxed text-[var(--ink-2)]">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
