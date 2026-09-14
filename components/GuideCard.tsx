import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { GuideSummary } from "@/lib/guides";

export default function GuideCard({ guide }: { guide: GuideSummary }) {
  const t = useTranslations("featured");

  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group flex flex-col rounded-lg border border-[var(--rule)] bg-[var(--paper)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--teal-mid)] hover:shadow-[0_8px_24px_-12px_rgba(11,93,82,0.35)]"
    >
      <h3 className="font-display text-lg font-semibold leading-snug text-[var(--ink)] group-hover:text-[var(--teal-dark)]">
        {guide.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-3)]">
        {guide.description}
      </p>
      <span className="mt-4 text-sm font-bold text-[var(--teal-dark)]">{t("readMore")} →</span>
    </Link>
  );
}
