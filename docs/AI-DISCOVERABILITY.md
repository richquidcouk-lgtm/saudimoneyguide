# Search and AI discoverability

Reviewed 16 September 2026. Revisit organic performance around 30 September 2026.

## Implemented

- Explicit OAI-SearchBot, ChatGPT-User, Claude-SearchBot and Claude-User access in robots.txt, preserving the API exclusion. Wildcard access already allowed these agents; this records the intended search/retrieval policy.
- Connected publisher, language-specific website and article identifiers in JSON-LD.
- Article and guide structured data includes the actual displayed topic image, authored summary where present, and references collected from the rendered content. No invented credentials or external endorsements.
- Existing foundations: server-rendered English/Arabic content, canonical URLs, reciprocal language links, XML sitemap, topic hubs, readable headings, visible dates and source links.

## Limits and follow-up

Access and structured data do not guarantee indexing, ranking or citations. ChatGPT-User is user-directed retrieval, not ChatGPT search indexing. Training crawlers are separate and their existing wildcard policy is unchanged. No special AI-only copy or llms.txt ranking claims are needed.

At the two-week review, compare Google Search Console and Bing Webmaster Tools indexed URLs, impressions, clicks and queries by language and landing page. Verification tags exist, but account access and sitemap submission have not been verified. Check analytics referral traffic from ChatGPT/Claude where recorded; missing referrers do not prove absence of AI visits. Record a consistent set of Saudi finance questions in both languages and observe citations manually, without treating a small sample as guaranteed coverage.

Hosting logs should confirm genuine crawler requests and any WAF blocks. Requests using crawler user-agent names from a development machine cannot prove access from providers' real IP ranges. Review current provider IP guidance before changing firewall rules.

## Primary guidance

- OpenAI: https://developers.openai.com/api/docs/bots
- Anthropic: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- Google: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
