"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { GuideSummary } from "@/lib/guides";
import type { BlogSummary } from "@/lib/blog";
import type { ToolMeta } from "@/lib/tools-data";
import { ToolIcon } from "@/components/icons";

type SearchItem = {
  type: "guide" | "blog" | "tool";
  slug: string;
  title: string;
  description: string;
  keywords: string;
};

const COPY = {
  en: {
    placeholder: "Search guides, calculators, and articles…",
    guides: "Guides",
    blog: "Blog",
    tools: "Tools",
    empty: "No results yet — try a different term.",
    resultsFor: "Results for",
  },
  ar: {
    placeholder: "ابحث في الأدلة والحاسبات والمقالات…",
    guides: "الأدلة",
    blog: "المدونة",
    tools: "الأدوات",
    empty: "لا نتائج بعد — جرّب مصطلحًا مختلفًا.",
    resultsFor: "نتائج البحث عن",
  },
};

function score(item: SearchItem, query: string): number {
  const q = query.toLowerCase();
  const title = item.title.toLowerCase();
  const description = item.description.toLowerCase();
  const keywords = item.keywords.toLowerCase();
  if (title === q) return 100;
  if (title.startsWith(q)) return 80;
  if (title.includes(q)) return 60;
  if (keywords.includes(q)) return 40;
  if (description.includes(q)) return 20;
  return 0;
}

export default function SearchClient({
  guides,
  blogPosts,
  tools,
  initialQuery,
}: {
  guides: GuideSummary[];
  blogPosts: BlogSummary[];
  tools: ToolMeta[];
  initialQuery: string;
}) {
  const locale = useLocale();
  const c = COPY[locale === "ar" ? "ar" : "en"];
  const [query, setQuery] = useState(initialQuery);

  const items: SearchItem[] = useMemo(() => {
    const guideItems: SearchItem[] = guides.map((g) => ({
      type: "guide",
      slug: g.slug,
      title: g.title,
      description: g.description,
      keywords: g.keywords,
    }));
    const blogItems: SearchItem[] = blogPosts.map((p) => ({
      type: "blog",
      slug: p.slug,
      title: p.title,
      description: p.description,
      keywords: p.keywords,
    }));
    const toolItems: SearchItem[] = tools.map((t) => ({
      type: "tool",
      slug: t.slug,
      title: locale === "ar" ? t.titleAr : t.titleEn,
      description: locale === "ar" ? t.descriptionAr : t.descriptionEn,
      keywords: "",
    }));
    return [...guideItems, ...blogItems, ...toolItems];
  }, [guides, blogPosts, tools, locale]);

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    return items
      .map((item) => ({ item, s: score(item, q) }))
      .filter(({ s }) => s > 0)
      .sort((a, b) => b.s - a.s)
      .map(({ item }) => item);
  }, [items, query]);

  const grouped = {
    guide: results.filter((r) => r.type === "guide"),
    blog: results.filter((r) => r.type === "blog"),
    tool: results.filter((r) => r.type === "tool"),
  };

  const sections: { key: "guide" | "blog" | "tool"; label: string; basePath: string }[] = [
    { key: "guide", label: c.guides, basePath: "/guides" },
    { key: "blog", label: c.blog, basePath: "/blog" },
    { key: "tool", label: c.tools, basePath: "/tools" },
  ];

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={c.placeholder}
        autoFocus
        className="w-full rounded-lg border border-[var(--rule-strong)] bg-[var(--paper)] px-4 py-3.5 text-base text-[var(--ink)] shadow-[var(--shadow-card)] focus:border-[var(--teal)] focus:outline-none focus:ring-4 focus:ring-[var(--teal)]/12"
      />

      {query.trim() && (
        <p className="mt-4 text-sm text-[var(--ink-3)]">
          {c.resultsFor} <span className="font-bold text-[var(--ink)]">&quot;{query}&quot;</span>
        </p>
      )}

      {query.trim() && results.length === 0 && (
        <p className="mt-8 text-sm text-[var(--ink-3)]">{c.empty}</p>
      )}

      <div className="mt-6 flex flex-col gap-8">
        {sections.map((section) => {
          const sectionResults = grouped[section.key];
          if (sectionResults.length === 0) return null;
          return (
            <div key={section.key}>
              <p className="eyebrow">{section.label}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {sectionResults.map((item) => (
                  <Link
                    key={`${item.type}-${item.slug}`}
                    href={`${section.basePath}/${item.slug}`}
                    className="card-premium group flex items-center gap-3 p-4"
                  >
                    {section.key === "tool" ? (
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--teal-soft)] text-[var(--teal-dark)]">
                        <ToolIcon slug={item.slug} className="h-4 w-4" />
                      </span>
                    ) : null}
                    <div>
                      <span className="block text-sm font-bold text-[var(--ink)] group-hover:text-[var(--teal-dark)]">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-[var(--ink-3)]">
                        {item.description}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
