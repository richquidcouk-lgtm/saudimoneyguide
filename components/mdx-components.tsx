import AffiliateLink from "@/components/AffiliateLink";
import Callout from "@/components/mdx/Callout";
import FlowSteps from "@/components/diagrams/FlowSteps";
import CompareBars from "@/components/diagrams/CompareBars";
import SplitCompare from "@/components/diagrams/SplitCompare";
import type { MDXComponents } from "mdx/types";
import type { Locale } from "@/i18n/routing";
import type { AnchorHTMLAttributes } from "react";

/**
 * Internal links written in guide content (e.g. "/guides/simah-credit-score")
 * are locale-agnostic on purpose — the author shouldn't have to know which
 * locale they're writing in. This prefixes them with the current locale at
 * render time so a reader on an Arabic guide clicking a cross-link stays in
 * Arabic instead of bouncing to the English site via the locale-detection
 * redirect.
 */
function LocaleAwareLink(
  locale: Locale,
  props: AnchorHTMLAttributes<HTMLAnchorElement>,
) {
  const { href, ...rest } = props;
  const isInternal = href?.startsWith("/") && !href.startsWith("//");
  const resolvedHref = isInternal ? `/${locale}${href}` : href;

  return (
    <a
      href={resolvedHref}
      className="font-semibold text-[var(--teal-dark)] underline decoration-[var(--rule-strong)] underline-offset-2 hover:decoration-[var(--teal-dark)]"
      {...(!isInternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    />
  );
}

export function getMdxComponents(locale: Locale): MDXComponents {
  return {
    AffiliateLink,
    Callout,
    FlowSteps,
    CompareBars,
    SplitCompare,
    h2: (props) => (
      <h2
        className="font-display mt-12 scroll-mt-24 text-2xl font-semibold text-[var(--ink)]"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="font-display mt-8 scroll-mt-24 text-xl font-semibold text-[var(--ink)]"
        {...props}
      />
    ),
    p: (props) => <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink-2)]" {...props} />,
    ul: (props) => (
      <ul className="mt-4 list-disc space-y-2 ps-5 text-[15px] text-[var(--ink-2)]" {...props} />
    ),
    ol: (props) => (
      <ol className="mt-4 list-decimal space-y-2 ps-5 text-[15px] text-[var(--ink-2)]" {...props} />
    ),
    a: (props) => LocaleAwareLink(locale, props),
    table: (props) => (
      <div className="mt-6 overflow-x-auto rounded-lg border border-[var(--rule)]">
        <table className="w-full border-collapse text-sm" {...props} />
      </div>
    ),
    th: (props) => (
      <th
        className="border-b border-[var(--rule)] bg-[var(--teal-soft)] px-4 py-2.5 text-start font-bold text-[var(--teal-dark)]"
        {...props}
      />
    ),
    td: (props) => (
      <td className="border-b border-[var(--rule)] px-4 py-2.5 text-[var(--ink-2)]" {...props} />
    ),
    blockquote: (props) => (
      <blockquote
        className="mt-4 border-s-4 border-[var(--rule)] ps-4 text-[var(--ink-3)] italic"
        {...props}
      />
    ),
  };
}
