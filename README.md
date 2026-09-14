# SaudiMoney

Bilingual (English + Arabic) personal finance content and tools site for Saudi Arabia. Next.js 16 App Router, `next-intl` for i18n/RTL, MDX guides, Vercel deployment.

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

- **15 cornerstone guides**, each published in English and Arabic (30 pages
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

## Environment variables

Copy `.env.local.example` to `.env.local`. Everything works without any keys
set (subscribe/track routes fall back to `console.log`); add real keys to
actually deliver emails / forward affiliate events.

## What's not done yet

- Real affiliate partnerships (currently `AffiliateLink`s point to
  providers' real public homepages, not tracked affiliate URLs — swap in
  the tracked URL once a partnership is signed; wire up
  `AFFILIATE_TRACKING_WEBHOOK_URL` to forward click events to Refersion/Tapfiliate/CJ)
- SendGrid account + template (currently logs locally; wire up
  `SENDGRID_API_KEY` / `SENDGRID_LIST_ID`)
- Analytics (Vercel Analytics / PostHog)
- Real `about`/`contact`/`privacy` copy — these are placeholders
- `docs/planning/` is historical context only (the original AI-generated
  brief this project started from) — it's not the content roadmap anymore.
  Topic selection is now driven by real personal-finance search categories,
  not that document; see the guide/tool lists above for current coverage.
- Genuine gaps still open: Takaful (Islamic insurance) as its own guide,
  Sukuk in more depth, remittance/money-transfer comparison, a
  retirement/pension planning calculator, and building out the guide
  library toward every major Saudi personal-finance search category.
