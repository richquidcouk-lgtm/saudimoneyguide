import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { GuideSummary } from "@/lib/guides";

export default function GuideCard({ guide, index }: { guide: GuideSummary; index?: number }) {
  const t = useTranslations("featured");

  return (
    <Link href={`/guides/${guide.slug}`} className="card-premium group flex flex-col p-5">
      {typeof index === "number" && (
        <span className="font-display text-sm font-semibold text-[var(--gold-dark)]">
          {String(index).padStart(2, "0")}
        </span>
      )}
      <h3 className="font-display mt-2 text-lg font-semibold leading-snug text-[var(--ink)] group-hover:text-[var(--teal-dark)]">
        {guide.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-3)]">
        {guide.description}
      </p>
      <span className="mt-4 text-sm font-bold text-[var(--teal-dark)]">{t("readMore")} →</span>
    </Link>
  );
}
