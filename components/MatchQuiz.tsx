"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { GuideSummary } from "@/lib/guides";
import { QUIZ_CATEGORIES, getQuizCategory, type QuizCategoryId } from "@/lib/quiz-data";
import { TOOLS } from "@/lib/tools-data";
import { QuizIcon, ToolIcon } from "@/components/icons";

type Nationality = "saudi" | "nonSaudi";
type Step = "category" | "nationality" | "results";

const COPY = {
  en: {
    stepLabel: "Step",
    q1: "What do you need help with?",
    q2: "Are you a Saudi national or a resident (Iqama holder)?",
    saudi: "Saudi national",
    nonSaudi: "Resident (Iqama)",
    back: "Back",
    startOver: "Start over",
    resultsEyebrow: "Your Matches",
    guidesHeading: "Guides worth reading",
    toolsHeading: "Free calculators for this",
    noGuides: "We don't have a dedicated guide for this yet — the calculator below still works.",
    disclaimer:
      "This shows relevant guides and free calculators based on your answers — it isn't a personalized recommendation, an eligibility check, or financial advice, and no data you enter here is stored or sent anywhere. Always compare current offers and confirm eligibility directly with each bank or provider.",
    readGuide: "Read guide →",
    useTool: "Use calculator →",
  },
  ar: {
    stepLabel: "الخطوة",
    q1: "بماذا تحتاج المساعدة؟",
    q2: "هل أنت مواطن سعودي أم مقيم (حامل إقامة)؟",
    saudi: "مواطن سعودي",
    nonSaudi: "مقيم (إقامة)",
    back: "رجوع",
    startOver: "ابدأ من جديد",
    resultsEyebrow: "أفضل ما يناسبك",
    guidesHeading: "أدلة تستحق القراءة",
    toolsHeading: "حاسبات مجانية لهذا",
    noGuides: "لا يوجد لدينا دليل مخصص لهذا بعد — الحاسبة أدناه لا تزال تعمل.",
    disclaimer:
      "يعرض هذا أدلة وحاسبات مجانية ذات صلة بناءً على إجاباتك — وليس توصية شخصية أو فحص أهلية أو استشارة مالية، ولا يتم تخزين أو إرسال أي بيانات تُدخلها هنا إلى أي جهة. قارن دائمًا العروض الحالية وتأكد من الأهلية مباشرة مع كل بنك أو مزوّد.",
    readGuide: "اقرأ الدليل ←",
    useTool: "استخدم الحاسبة ←",
  },
};

export default function MatchQuiz({ guides }: { guides: GuideSummary[] }) {
  const locale = useLocale();
  const c = COPY[locale === "ar" ? "ar" : "en"];
  const panel = useRef<HTMLDivElement>(null);
  const previousStep = useRef<Step>("category");
  const [expanded, setExpanded] = useState(false);
  const [step, setStep] = useState<Step>("category");
  const [categoryId, setCategoryId] = useState<QuizCategoryId | null>(null);
  const [nationality, setNationality] = useState<Nationality | null>(null);

  useEffect(() => {
    if (previousStep.current !== step) panel.current?.focus();
    previousStep.current = step;
  }, [step]);

  const category = categoryId ? getQuizCategory(categoryId) : undefined;

  const matchedGuides = useMemo(() => {
    if (!category) return [];
    return category.guideSlugs
      .map((slug) => guides.find((g) => g.slug === slug))
      .filter((g): g is GuideSummary => Boolean(g));
  }, [category, guides]);

  const matchedTools = useMemo(() => {
    if (!category) return [];
    return category.toolSlugs
      .map((slug) => TOOLS.find((t) => t.slug === slug))
      .filter((t): t is (typeof TOOLS)[number] => Boolean(t));
  }, [category]);

  function selectCategory(id: QuizCategoryId) {
    setCategoryId(id);
    setNationality(null);
    setStep(getQuizCategory(id)?.nationalityNote ? "nationality" : "results");
  }

  function selectNationality(value: Nationality) {
    setNationality(value);
    setStep("results");
  }

  function reset() {
    setCategoryId(null);
    setNationality(null);
    setStep("category");
  }

  const note =
    category?.nationalityNote && nationality
      ? nationality === "saudi"
        ? locale === "ar"
          ? category.nationalityNote.saudiAr
          : category.nationalityNote.saudiEn
        : locale === "ar"
          ? category.nationalityNote.nonSaudiAr
          : category.nationalityNote.nonSaudiEn
      : null;

  return (
    <div ref={panel} tabIndex={-1} className="card-premium relative overflow-hidden p-6 sm:p-8">
      {step !== "results" && (
        <p className="eyebrow">
          {step === "category" ? (locale === "ar" ? "اختر موضوعًا" : "Choose a topic") : (locale === "ar" ? "سؤال اختياري" : "Optional question")}
        </p>
      )}

      {step === "category" && (
        <>
          <h3 className="font-display mt-2 text-xl font-semibold text-[var(--ink)] sm:text-2xl">
            {c.q1}
          </h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {QUIZ_CATEGORIES.slice(0, expanded ? undefined : 6).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => selectCategory(cat.id)}
                className="card-premium flex items-center gap-3 p-4 text-start"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--teal-soft)] text-[var(--teal-dark)]">
                  <QuizIcon icon={cat.icon} className="h-5 w-5" />
                </span>
                <span className="text-sm font-bold text-[var(--ink)]">
                  {locale === "ar" ? cat.labelAr : cat.labelEn}
                </span>
              </button>
            ))}
          </div>
          <button type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)} className="mt-4 min-h-11 text-sm font-bold text-[var(--teal-dark)]">
            {locale === "ar" ? (expanded ? "عرض أقل" : "عرض جميع المواضيع") : (expanded ? "Show fewer topics" : "Show all topics")}
          </button>
        </>
      )}

      {step === "nationality" && (
        <>
          <h3 className="font-display mt-2 text-xl font-semibold text-[var(--ink)] sm:text-2xl">
            {c.q2}
          </h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => selectNationality("saudi")}
              className="card-premium p-5 text-start text-base font-bold text-[var(--ink)]"
            >
              {c.saudi}
            </button>
            <button
              type="button"
              onClick={() => selectNationality("nonSaudi")}
              className="card-premium p-5 text-start text-base font-bold text-[var(--ink)]"
            >
              {c.nonSaudi}
            </button>
          </div>
          <button type="button" onClick={() => setStep("results")} className="mt-4 block min-h-11 text-sm font-bold text-[var(--teal-dark)]">{locale === "ar" ? "تخطي وعرض الأدلة" : "Skip and show guides"}</button>
          <button
            type="button"
            onClick={() => setStep("category")}
            className="nav-link mt-6 text-sm font-bold text-[var(--teal-dark)]"
          >
            {locale === "ar" ? "→" : "←"} {c.back}
          </button>
        </>
      )}

      {step === "results" && category && (
        <>
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--gold)] text-[var(--gold-dark)]">
              <QuizIcon icon={category.icon} />
            </span>
            <div>
              <p className="eyebrow">{c.resultsEyebrow}</p>
              <h3 className="font-display mt-1 text-xl font-semibold text-[var(--ink)] sm:text-2xl">
                {locale === "ar" ? category.labelAr : category.labelEn}
              </h3>
            </div>
          </div>

          {note && (
            <div className="mt-5 rounded-lg border border-[var(--gold)]/40 bg-[var(--gold-soft)]/40 px-4 py-3 text-sm leading-relaxed text-[var(--ink-2)]">
              {note}
            </div>
          )}

          <div className="mt-7">
            <p className="text-sm font-bold text-[var(--ink)]">{c.guidesHeading}</p>
            {matchedGuides.length === 0 ? (
              <p className="mt-2 text-sm text-[var(--ink-3)]">{c.noGuides}</p>
            ) : (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {matchedGuides.map((guide) => (
                  <Link key={guide.slug} href={`/guides/${guide.slug}`} className="card-premium flex flex-col p-4">
                    <span className="text-sm font-bold leading-snug text-[var(--ink)]">{guide.title}</span>
                    <span className="mt-2 text-xs font-bold text-[var(--teal-dark)]">{c.readGuide}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {matchedTools.length > 0 && (
            <div className="mt-7">
              <p className="text-sm font-bold text-[var(--ink)]">{c.toolsHeading}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {matchedTools.map((tool) => (
                  <Link key={tool.slug} href={`/tools/${tool.slug}`} className="card-premium flex items-center gap-3 p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--teal-soft)] text-[var(--teal-dark)]">
                      <ToolIcon slug={tool.slug} className="h-4 w-4" />
                    </span>
                    <div>
                      <span className="block text-sm font-bold text-[var(--ink)]">
                        {locale === "ar" ? tool.titleAr : tool.titleEn}
                      </span>
                      <span className="text-xs font-bold text-[var(--teal-dark)]">{c.useTool}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <p className="mt-8 border-t border-[var(--rule)] pt-5 text-xs leading-relaxed text-[var(--ink-4)]">
            {c.disclaimer}
          </p>

          <button
            type="button"
            onClick={reset}
            className="mt-5 inline-flex items-center gap-2 rounded-md border border-[var(--rule-strong)] px-5 py-2.5 text-sm font-bold text-[var(--ink-2)] transition-colors hover:border-[var(--teal)] hover:text-[var(--teal-dark)]"
          >
            {c.startOver}
          </button>
        </>
      )}
    </div>
  );
}
