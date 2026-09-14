import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { GuideSummary } from "@/lib/guides";

export default function GuideCard({ guide }: { guide: GuideSummary }) {
  const t = useTranslations("featured");

  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group flex flex-col rounded-xl border border-[var(--rule)] bg-white p-5 transition-shadow hover:shadow-md"
    >
      <h3 className="text-base font-bold text-[var(--ink)] group-hover:text-[var(--teal)]">
        {guide.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-3)]">
        {guide.description}
      </p>
      <span className="mt-4 text-sm font-bold text-[var(--teal)]">{t("readMore")} →</span>
    </Link>
  );
}
