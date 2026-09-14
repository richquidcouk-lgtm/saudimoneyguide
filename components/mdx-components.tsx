import AffiliateLink from "@/components/AffiliateLink";
import Callout from "@/components/mdx/Callout";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  AffiliateLink,
  Callout,
  h2: (props) => (
    <h2 className="mt-10 scroll-mt-24 text-2xl font-extrabold text-[var(--ink)]" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-8 scroll-mt-24 text-xl font-bold text-[var(--ink)]" {...props} />
  ),
  p: (props) => <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink-2)]" {...props} />,
  ul: (props) => (
    <ul className="mt-4 list-disc space-y-2 ps-5 text-[15px] text-[var(--ink-2)]" {...props} />
  ),
  ol: (props) => (
    <ol className="mt-4 list-decimal space-y-2 ps-5 text-[15px] text-[var(--ink-2)]" {...props} />
  ),
  a: (props) => (
    <a className="font-semibold text-[var(--teal)] underline underline-offset-2" {...props} />
  ),
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
