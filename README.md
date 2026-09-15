# SaudiMoney

Bilingual (English + Arabic) personal finance content and tools site for Saudi Arabia. Next.js 16 App Router, `next-intl` for i18n/RTL, MDX guides, Netlify deployment.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **next-intl** — locale routing (`/en`, `/ar`), RTL, translations
- **Tailwind CSS v4**
- **next-mdx-remote** — guide content compiled from `content/guides/{locale}/{slug}.mdx`
- **gray-matter** — MDX frontmatter parsing

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` — it redirects to `/en` or `/ar` based on browser language.

## Content

- **16 cornerstone guides**, each published in English and Arabic (32 pages
  total): SIMAH credit score, Islamic finance (Tawarruq vs Murabaha), BNPL,
  salary advance apps, expat banking, home finance/mortgages, car finance,
  health insurance, car insurance, cost of living, VAT explained, investing
  (Tadawul), credit cards, GOSI/retirement, and freelancing. Arabic guides
  are independently written for a Saudi audience, not machine-translated.
- **12 interactive financial calculators** under `/tools`: personal loan,
  Zakat, end-of-service gratuity, take-home salary (GOSI), BNPL installment
  schedule, SAR currency converter, home finance, car finance, VAT, savings
  goal, debt payoff, and investment growth. All client-side, no backend.
  Anything tied to a regulatory rate that changes (GOSI %, gold price) is an
  editable input with a sensible default, not a hardcoded assumption —
  check `components/tools/*.tsx` for the exact caveats shown to users.
- **A blog** (`/blog`, `content/blog/{locale}/{slug}.mdx`) for visual,
  concept-level explainers (regulatory map, salary breakdown, Islamic vs
  conventional finance, a newcomer's financial timeline) that deliberately
  don't duplicate the reference-style guides — see "Adding a blog post"
  below. Posts use three diagram components (`FlowSteps`, `CompareBars`,
  `SplitCompare`) not available in guides.
- **A "Find My Match" quiz** (`/match`, embedded directly in the homepage
  hero) — two questions route a visitor to the right existing guide and
  calculator. Entirely client-side (`components/MatchQuiz.tsx`,
  `lib/quiz-data.ts`); nothing is stored or sent anywhere.
- **Site search** (`/search`) — a simple client-side substring search across
  every guide, blog post, and tool title/description/keywords
  (`components/SearchClient.tsx`). Backs the `WebSite` `SearchAction`
  structured data in the root layout, so it's also what Google's sitelinks
  searchbox would hit.

## Adding a guide

1. Write English content in `content/guides/en/{slug}.mdx`.
2. Write the Arabic version in `content/guides/ar/{slug}.mdx` — **use the same
   ASCII slug** as the English file (e.g. both named `simah-credit-score.mdx`),
   not a translated Arabic slug. Non-ASCII characters in the URL path broke
   Next's dynamic routing in testing (confirmed 404s even with correctly
   percent-encoded requests) — the Arabic *title* and all page content is
   still fully Arabic, only the URL segment stays Latin script. This also
   means both language versions automatically get linked via hreflang.
3. Required frontmatter: `title`, `description`, `keywords`, `author`,
   `publishedAt`, `slug` (matching the filename).
4. Available in MDX: `<AffiliateLink partnerId url text variant guideSlug />`
   and `<Callout type="info|warning|tip">`. GFM tables and headings (with
   auto-generated `id` anchors) work out of the box. Internal links written
   as `/guides/other-slug` or `/tools/loan-calculator` (no locale prefix) are
   automatically rewritten to the current locale at render time — see
   `components/mdx-components.tsx`.
5. A guide only needs to exist in one language to publish — the other
   language's hreflang entry is simply omitted until it exists too (see
   "SEO" below).

## Adding a blog post

1. Write English content in `content/blog/en/{slug}.mdx`, Arabic in
   `content/blog/ar/{slug}.mdx` — same same-slug convention as guides.
2. Required frontmatter: the same fields as a guide, plus `relatedGuides`
   (an array of guide slugs). This drives two things automatically: the
   "Related full guides" block at the bottom of the post, and the reverse
   "From the blog" block that appears on each of those guide pages
   (`lib/blog.ts`'s `getRelatedBlogPosts`). No guide-side edit needed.
3. Available in MDX, on top of everything guides have: `<FlowSteps steps={[{title, body}]} />`,
   `<CompareBars title items={[{label, value, display}]} />`, and
   `<SplitCompare left={{title, points}} right={{title, points}} />`
   (`components/diagrams/`). These take object/array props, which is why
   `MDXRemote`'s `blockJS` is explicitly set to `false` for guide and blog
   pages — it defaults to `true` (stripping exactly this kind of prop) as
   an XSS guard for untrusted MDX, which doesn't apply here since we author
   every word of this content ourselves.
4. Pick a topic that's a genuinely different angle from the guides, not a
   visual reskin of one — a process/timeline, a comparison, or a map of how
   several guides relate, not "guide content with a chart bolted on."

## Adding a tool

1. Add an entry to `TOOLS` in `lib/tools-data.ts` (slug, bilingual title/description).
2. Build the calculator as a client component in `components/tools/`, taking
   a `locale` prop and using the shared `CalculatorShell` primitives
   (`Field`, `ResultsCard`, `ResultRow`, `formatCurrency`) for a consistent look.
3. Register it in `components/tools/registry.tsx` under the same slug.

## SEO

- Every page sets a **self-referencing canonical** (the Arabic page's
  canonical is its own Arabic URL, never the English one) plus a **full
  reciprocal hreflang set** (`en`, `ar`, and `x-default`) via
  `lib/seo.ts`. Getting the canonical wrong here is a classic way to
  accidentally make Google treat two real, distinct-language pages as
  duplicates of one — see the comments in `lib/seo.ts` before changing it.
- Guide pages emit `Article` and `BreadcrumbList` JSON-LD
  (`lib/schema.ts`); the root layout emits `Organization` JSON-LD.
- `app/sitemap.ts` lists every locale × page combination separately —
  submit both `/en/...` and `/ar/...` URLs to Search Console, they're not
  duplicates of each other.
- A guide that only exists in one language gets a self-canonical and no
  cross-language hreflang entry (rather than a broken link to a page that
  doesn't exist) — this is intentional, see `buildAlternatesFromMap`.
- Every guide and blog post gets `FAQPage` JSON-LD automatically, generated
  by parsing the existing "## Frequently Asked Questions" section of the
  MDX content (`lib/faq.ts`) — there's no separate FAQ data to maintain, so
  it can't drift out of sync with what's actually on the page.
- Open Graph + Twitter Card metadata (`buildOpenGraph` in `lib/seo.ts`) on
  every page. The preview image comes from `app/[locale]/opengraph-image.tsx`
  (generated at build time via `next/og`, inherited by every nested route).
  **It intentionally renders the English "SaudiMoney" wordmark on both
  locales** — Satori (the renderer behind `ImageResponse`) throws on real
  Arabic text (`lookupType: 5 - substFormat: 3 is not yet supported`,
  a contextual-substitution/letter-joining feature it doesn't implement).
  Confirmed by testing the short brand name alone, not just longer text.
  Same constraint applies to `app/icon.tsx` (the favicon).
- `proxy.ts`'s middleware matcher excludes `icon`, `opengraph-image`, etc.
  on top of `api`/`_next`/dotted-extension paths — these Next.js metadata
  file-convention routes are root-level, not per-locale, so without the
  exclusion the locale-detection middleware 404s the favicon by redirecting
  `/icon` to `/en/icon`.
- `WebSite` JSON-LD with a `SearchAction` pointing at `/search` (root
  layout) — for Google's sitelinks searchbox. `/search` is `noindex,follow`
  (thin per-query content) but must stay crawlable and actually functional
  for the SearchAction to be valid, not decorative.

## Environment variables

Copy `.env.local.example` to `.env.local`. Calculators and content work without keys. Newsletter signup requires both
`SENDGRID_API_KEY` and `SENDGRID_LIST_ID`; otherwise it returns 503. The optional
`SENDGRID_LOCALE_FIELD_ID` must be a generated SendGrid custom-field ID. A successful
response means the contact-import job was accepted, not that an email was delivered.
Configure campaigns/automation and check import-job completion in SendGrid separately.
Affiliate tracking falls back to server logging without a webhook.

## What's not done yet

- Real affiliate partnerships (currently `AffiliateLink`s point to
  providers' real public homepages, not tracked affiliate URLs — swap in
  the tracked URL once a partnership is signed; wire up
  `AFFILIATE_TRACKING_WEBHOOK_URL` to forward click events to Refersion/Tapfiliate/CJ)
- SendGrid account + campaign/automation (signup fails clearly when unconfigured; wire up
  `SENDGRID_API_KEY` / `SENDGRID_LIST_ID`) — this also means the contact
  page's email is a `mailto:` link, not a form, since there's no delivery
  mechanism yet to POST a form to
- Analytics (Vercel Analytics / PostHog) — the privacy policy explicitly
  says none is running yet; update it in the same change that adds one
- `docs/planning/` is historical context only (the original AI-generated
  brief this project started from) — it's not the content roadmap anymore.
  Topic selection is now driven by real personal-finance search categories,
  not that document; see the guide/tool lists above for current coverage.
- Genuine gaps still open: Takaful (Islamic insurance) as its own guide,
  Sukuk in more depth, remittance/money-transfer comparison, a
  retirement/pension planning calculator, and building out the guide
  library toward every major Saudi personal-finance search category.

## Validation

Run `npm test`, `npm run lint`, `npx tsc --noEmit --incremental false`, and
`npm run build` before deployment. Regression tests cover salary contribution
basis/caps, gratuity thresholds, final debt payments, BNPL dates/rounding and
newsletter failure handling, using production functions and mocked email transport.

Financial calculations remain estimates; the salary tool uses an editable employee
rate and cash housing allowance. GCC and other special cases need separate review.
BNPL schedules use an explicit Gregorian start date and calendar months. Amounts
are displayed to two decimal places. Public article dates are not a scheduler;
only publish content when it is ready, and set `updatedAt` on actual revisions.
