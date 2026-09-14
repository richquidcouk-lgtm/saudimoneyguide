export default function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "warning" | "tip";
  children: React.ReactNode;
}) {
  const styles = {
    info: "border-[var(--teal)] bg-[var(--teal-soft)] text-[var(--teal-dark)]",
    warning: "border-[var(--burgundy)] bg-[var(--burgundy-soft)] text-[var(--burgundy)]",
    tip: "border-[var(--gold)] bg-[var(--gold-soft)] text-[var(--gold-dark)]",
  } as const;

  return (
    <div className={`my-6 rounded-md border-s-4 px-4 py-3 text-sm leading-relaxed ${styles[type]}`}>
      {children}
    </div>
  );
}
