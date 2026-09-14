# Saudi Money Guide

Bilingual (English + Arabic) personal finance affiliate site for Saudi Arabia. Next.js 16 App Router, `next-intl` for i18n/RTL, MDX guides, Vercel deployment.

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

## Adding a guide

1. Write English content in `content/guides/en/{slug}.mdx`.
2. Write the Arabic version in `content/guides/ar/{slug}.mdx` — **use the same
   ASCII slug** as the English file (e.g. both named `simah-guide.mdx`), not a
   translated Arabic slug. Non-ASCII characters in the URL path broke Next's
   dynamic routing in testing (confirmed 404s even with correctly
   percent-encoded requests) — the Arabic *title* and all page content is
   still fully Arabic, only the URL segment stays Latin script. This also
   means both language versions automatically get linked via hreflang.
3. Required frontmatter: `title`, `description`, `keywords`, `author`,
   `publishedAt`, `slug` (matching the filename).
4. Available in MDX: `<AffiliateLink partnerId url text variant guideSlug />`
   and `<Callout type="info|warning|tip">`. GFM tables and headings (with
   auto-generated `id` anchors) work out of the box.

See `content/guides/en/test-guide.mdx` / `content/guides/ar/test-guide.mdx`
for a working example — delete these once real guides are published.

## Environment variables

Copy `.env.local.example` to `.env.local`. Everything works without any keys
set (subscribe/track routes fall back to `console.log`); add real keys to
actually deliver emails / forward affiliate events.

## What's not done yet

This is the Day 1–5 foundation (routing, layout, homepage, MDX pipeline,
affiliate + email API stubs, SEO plumbing). Not yet built:
- Real guide content (5 EN + 5 AR cornerstone guides — see
  `SMG_COMPLETE_INSTRUCTIONS.md` in the planning docs for the list)
- Real affiliate partner integrations (currently logs locally; wire up
  `AFFILIATE_TRACKING_WEBHOOK_URL`)
- SendGrid account + template (currently logs locally; wire up
  `SENDGRID_API_KEY` / `SENDGRID_LIST_ID`)
- Analytics (Vercel Analytics / PostHog)
- Real `about`/`contact`/`privacy` copy — these are placeholders
