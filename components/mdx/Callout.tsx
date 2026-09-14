export default function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "warning" | "tip";
  children: React.ReactNode;
}) {
  const styles = {
    info: "border-[var(--teal)] bg-[var(--teal-soft)] text-[var(--teal-dark)]",
    warning: "border-red-300 bg-red-50 text-red-800",
    tip: "border-[var(--gold)] bg-[var(--gold-soft)] text-[#6b5326]",
  } as const;

  return (
    <div className={`my-6 rounded-lg border-s-4 px-4 py-3 text-sm leading-relaxed ${styles[type]}`}>
      {children}
    </div>
  );
}
