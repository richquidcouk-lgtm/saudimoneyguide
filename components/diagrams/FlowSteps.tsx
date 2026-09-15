type Step = { title: string; body: string };

export default function FlowSteps({ steps }: { steps: Step[] }) {
  return (
    <div className="not-prose my-8 flex flex-col gap-0">
      {steps.map((step, i) => (
        <div key={step.title} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span className="font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--teal)] text-sm font-bold text-white">
              {i + 1}
            </span>
            {i < steps.length - 1 && (
              <span className="my-1 w-px flex-1 bg-gradient-to-b from-[var(--gold)] to-[var(--rule-strong)]" />
            )}
          </div>
          <div className={i < steps.length - 1 ? "pb-7" : ""}>
            <h4 className="text-sm font-bold text-[var(--ink)]">{step.title}</h4>
            <p className="mt-1 text-sm leading-relaxed text-[var(--ink-3)]">{step.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
