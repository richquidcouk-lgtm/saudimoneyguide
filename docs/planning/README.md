# Planning docs — read with caveats

These are the original AI-generated planning documents for this project.
Two things changed since they were written:

1. **Tech stack**: `SMG_30_Day_Launch_Plan.md` and
   `SMG_Bilingual_Implementation_Strategy.md` assume WordPress + WPML on
   Bluehost/Kinsta hosting. That was superseded — the project is built on
   **Next.js 16 + Vercel** instead, matching `SMG_COMPLETE_INSTRUCTIONS.md`,
   `SMG_NextJS_Architecture.md`, and `SMG_Claude_Code_Development_Plan.md`
   (and matching the other two sites on this account, richquid.co.uk and
   gcsemathsai.co.uk). Ignore the WordPress-specific setup steps in those
   two docs — the content strategy, keyword research, and business-model
   sections in all five docs are still valid.

2. **Arabic guide URLs**: the docs assume Arabic guides live at Arabic-script
   URLs (e.g. `/ar/guides/دليل-سيماه`). In testing, non-ASCII characters in
   the Next.js dynamic route segment caused genuine 404s even with correctly
   percent-encoded requests. Guides now use the same Latin-script slug for
   both languages (e.g. both `simah-guide.mdx`) — see the root `README.md`
   for details. The Arabic *content and titles* are unaffected.

Everything else in these docs (keyword targets, affiliate partner list,
revenue projections, content calendar, guide structure) still applies.
