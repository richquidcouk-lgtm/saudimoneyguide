# SAUDI MONEY GUIDE — CLAUDE CODE DEVELOPMENT PLAN
## Using Claude to Build Next.js Bilingual Platform

**Framework:** Next.js 14 (App Router)  
**Languages:** Arabic + English (i18n)  
**Deployment:** Vercel  
**Development approach:** You provide requirements → Claude Code generates components → You copy/deploy  

---

## HOW IT WORKS (Claude Code Workflow)

### Step 1: You Provide Requirements
```
I need a Next.js guide page component for a bilingual finance platform.

Requirements:
- Route: /[locale]/guides/[slug]
- Load content from MDX files (/content/guides/{locale}/{slug}.mdx)
- Languages: English (en), Arabic (ar)
- Display: Title, description, table of contents, full content, affiliate CTAs
- Styling: Tailwind CSS with RTL support for Arabic
- SEO: Generate hreflang tags + JSON-LD schema
- Affiliate: Track clicks via API
```

### Step 2: Claude Code Generates
- Complete TypeScript component
- Type definitions
- MDX loader
- Error handling
- Mobile responsive
- Accessibility (a11y)

### Step 3: You Copy & Deploy
- Copy generated code to project
- Commit to GitHub
- Vercel auto-deploys

---

## WEEK-BY-WEEK CLAUDE CODE TASKS

### WEEK 1: FOUNDATION (Days 1-7)

#### Day 1: Project Setup Template
**What you do:** Create Next.js project locally
```bash
npx create-next-app@latest saudi-money-guide --typescript --tailwind --eslint
cd saudi-money-guide
npm install next-intl axios dotenv
```

**What you do:** Create folder structure
```bash
mkdir -p app/{api,\[locale\]/guides/\[slug\]} components lib content/{guides/en,guides/ar,metadata} public/{images,locales,fonts}
```

#### Day 2: Claude Code Task #1 — i18n Configuration
**Request to Claude Code:**
```
Generate Next.js 14 App Router i18n configuration with next-intl.

Requirements:
- Support English (en) and Arabic (ar) languages
- URL structure: /en/page and /ar/page
- Language detection on first visit (browser language)
- Language switcher component
- Translation files (en.json, ar.json)

Include:
- i18n.ts configuration file
- middleware.ts for language routing
- LanguageSwitcher component
- translations en.json and ar.json with 20 common strings
```

**Claude Code generates:**
- `i18n.ts` (i18n config)
- `middleware.ts` (routing logic)
- `components/LanguageSwitcher.tsx`
- `public/locales/en.json`
- `public/locales/ar.json`

**Your action:**
1. Copy files to project
2. Update `next.config.js` to register middleware
3. Test language switching at `localhost:3000/en` and `localhost:3000/ar`

---

#### Day 3: Claude Code Task #2 — Layout Components
**Request to Claude Code:**
```
Generate bilingual header and footer for Saudi Money Guide.

Requirements:
- Header:
  - Logo (saudimoneyguide.com text)
  - Navigation menu (Guides, About, Contact)
  - Language switcher (en | ar)
  - Mobile hamburger menu (responsive)
  - RTL layout for Arabic
- Footer:
  - Copyright, Privacy Policy, Contact
  - Social links (Twitter, LinkedIn)
  - Email signup CTA
  - Bilingual text

Styling: Tailwind CSS, mobile-first responsive
Include: TypeScript types, prop interface, accessibility attributes
```

**Claude Code generates:**
- `components/Header.tsx`
- `components/Footer.tsx`
- `components/MobileNav.tsx`
- Tailwind RTL CSS

**Your action:**
1. Copy components to project
2. Update `app/[locale]/layout.tsx` to use Header + Footer
3. Test on mobile (hamburger menu works)

---

#### Day 4: Claude Code Task #3 — Homepage
**Request to Claude Code:**
```
Generate bilingual homepage for Saudi Money Guide.

Content sections (in order):
1. Hero section: Title + tagline + CTA button
2. Featured guides: 3 guide cards with image, title, excerpt
3. Why choose SMG: 3 benefit cards
4. Newsletter signup: Email input + subscribe button
5. FAQ: 5 common questions (accordion)

Bilingual strings:
- English hero: "Your trusted guide to Saudi personal finance"
- Arabic hero: "دليلك الموثوق للخدمات المالية السعودية"

Styling: Tailwind, responsive, animated elements (hover effects)
Include: TypeScript, prop interfaces, reusable card components
```

**Claude Code generates:**
- `app/[locale]/page.tsx` (homepage)
- `components/GuideCard.tsx`
- `components/BenefitCard.tsx`
- `components/EmailForm.tsx`

**Your action:**
1. Copy to project
2. Update content strings in bilingual JSON
3. Test mobile responsiveness

---

#### Day 5: Claude Code Task #4 — Tailwind + RTL Setup
**Request to Claude Code:**
```
Generate complete Tailwind RTL configuration for Next.js + MDX.

Requirements:
- Enable Tailwind RTL support
- Custom CSS for Arabic typography (font-size, line-height)
- Dark mode support
- MDX integration (syntax highlighting, responsive tables)
- Custom Tailwind plugins for RTL

Include:
- tailwind.config.js (complete configuration)
- tailwind-rtl plugin setup
- globals.css (global styles + RTL utilities)
- MDX prose styling

All components must support RTL automatically.
```

**Claude Code generates:**
- `tailwind.config.js`
- `styles/globals.css`
- `styles/rtl.css`
- `styles/mdx.css`

**Your action:**
1. Replace your `tailwind.config.js` and CSS files
2. Test RTL layout: navigate to `/ar/` and verify all layouts are mirrored
3. Test in Chrome DevTools (toggle to RTL mode)

---

#### Day 6-7: Claude Code Task #5 — MDX Content System
**Request to Claude Code:**
```
Generate MDX content loading + guide page template for Next.js.

Requirements:
- Load guides from /content/guides/{locale}/{slug}.mdx
- Extract frontmatter (title, description, keywords, author, publishedAt)
- Generate table of contents from headings
- Support embedded code blocks (syntax highlighting)
- Responsive images
- Custom components (callouts, highlights, comparison tables)

Include:
- lib/guides.ts (MDX loader + metadata extraction)
- lib/mdx-client.ts (runtime MDX compilation)
- app/[locale]/guides/page.tsx (guides index)
- app/[locale]/guides/[slug]/page.tsx (individual guide)
- components/GuideLayout.tsx (guide template)
- components/TableOfContents.tsx
- components/CodeBlock.tsx

Bilingual support: Guides in /en/ and /ar/ directories
SEO: Generate hreflang tags + canonical URLs
```

**Claude Code generates:**
- `lib/guides.ts`
- `lib/mdx-client.ts`
- `app/[locale]/guides/page.tsx`
- `app/[locale]/guides/[slug]/page.tsx`
- `components/GuideLayout.tsx`
- `components/TableOfContents.tsx`

**Your action:**
1. Copy files to project
2. Create sample guide: `content/guides/en/simah-guide.mdx`
3. Test loading at `/en/guides/simah-guide`

---

### WEEK 2: CONTENT + AFFILIATE SYSTEM (Days 8-14)

#### Day 8: Write English Guides (Manual)
**Your action (not Claude Code):**
- Write 5 guides in English (MDX format):
  1. SIMAH guide (2,500 words)
  2. Islamic Finance (2,000 words)
  3. BNPL Comparison (2,200 words)
  4. Salary Advances (1,800 words)
  5. Expat Banking (2,000 words)

Save to: `content/guides/en/{slug}.mdx`

---

#### Day 9: Claude Code Task #6 — Affiliate Tracking API
**Request to Claude Code:**
```
Generate Next.js API route for affiliate click tracking.

Requirements:
- Endpoint: POST /api/affiliate/track
- Payload: { partnerId, guideSlug, action: 'click' | 'signup' }
- Log to:
  1. Console (for testing)
  2. SendGrid event log (production)
  3. Custom webhook to affiliate platform (Refersion, Tapfiliate, etc.)
- Response: { success: true, trackingId }

Include:
- Error handling (validate payload)
- Rate limiting (prevent spam)
- Logging (timestamp, user agent, referer)
- Environment variables (AFFILIATE_API_KEY, SENDGRID_KEY)

Security: CSRF protection, request validation
```

**Claude Code generates:**
- `app/api/affiliate/track/route.ts`
- `lib/affiliate.ts` (tracking utilities)
- `.env.local.example`

**Your action:**
1. Copy API route
2. Create `.env.local` with affiliate keys
3. Test with: `curl -X POST http://localhost:3000/api/affiliate/track -d '{"partnerId":"tamara","action":"click"}'`

---

#### Day 10: Claude Code Task #7 — Affiliate Link Component
**Request to Claude Code:**
```
Generate AffiliateLink component for embedding in guides.

Requirements:
- Props: partnerId, text, url, variant (button | link | badge)
- On click: 
  1. Send tracking request to /api/affiliate/track
  2. Open URL in new tab
  3. Show success toast notification
- Support bilingual text (English + Arabic)
- Styling: Match guide styling (Tailwind)
- Accessibility: aria-label, keyboard navigation

Include:
- AffiliateLink.tsx component
- Toast notification component (success message)
- Usage example in MDX

The component should track which affiliate the user clicked on for analytics.
```

**Claude Code generates:**
- `components/AffiliateLink.tsx`
- `components/Toast.tsx`
- `lib/toast-context.tsx` (if needed for notifications)

**Your action:**
1. Copy components
2. Add to your guides: `<AffiliateLink partnerId="tamara" url="..." text="Apply for Tamara" />`
3. Test click tracking in API logs

---

#### Day 11: Claude Code Task #8 — Email Signup API
**Request to Claude Code:**
```
Generate email signup API + form component.

Requirements:
- Endpoint: POST /api/email/subscribe
- Payload: { email, locale: 'en' | 'ar' }
- Send to SendGrid:
  1. Add to "SMG_Subscribers" list
  2. Send welcome email (bilingual)
  3. Tag by language (subscribers-en, subscribers-ar)
- Response: { success: true, message }

Form component:
- Email input field (HTML5 validation)
- Submit button
- Loading state
- Error/success messages (bilingual)
- Styling: Tailwind, inline in guides

Include:
- EmailForm.tsx component
- app/api/email/subscribe/route.ts
- SendGrid template IDs
```

**Claude Code generates:**
- `components/EmailForm.tsx`
- `app/api/email/subscribe/route.ts`
- `lib/email.ts` (SendGrid utilities)

**Your action:**
1. Set up SendGrid account (free tier)
2. Create welcome email template
3. Copy API route + component
4. Test signup at `/en/` homepage

---

#### Day 12: Claude Code Task #9 — SEO + Hreflang
**Request to Claude Code:**
```
Generate SEO utilities for bilingual Next.js site.

Requirements:
- Generate metadata for each guide (title, description, keywords, og:image)
- Hreflang tags for bilingual pages (en + ar)
- Canonical URLs
- JSON-LD schema (Article schema for guides)
- Sitemap generator (sitemap.xml)
- Robots.txt

Functions:
- generateMetadata(locale, slug, title, description)
- generateHreflang(locale, slug)
- generateSchema(type, data)

Include:
- lib/seo.ts (SEO utilities)
- app/sitemap.ts
- public/robots.txt
- Usage in page components
```

**Claude Code generates:**
- `lib/seo.ts`
- `app/sitemap.ts`
- `public/robots.txt`

**Your action:**
1. Copy files
2. Update page components to call `generateMetadata`
3. Verify hreflang tags in DevTools (inspect <head>)
4. Test sitemap at `/sitemap.xml`

---

#### Day 13: Claude Code Task #10 — Analytics Setup
**Request to Claude Code:**
```
Generate analytics tracking for Next.js app.

Integrate:
1. Vercel Web Analytics (built-in)
2. PostHog (session recording + heatmaps) - optional
3. Custom events:
   - Guide viewed (with slug + locale)
   - Affiliate clicked (with partnerId)
   - Email subscribed
   - Button clicked

Include:
- lib/analytics.ts (event tracking functions)
- Global analytics wrapper
- PostHog config (if used)
- Environmental variables

Requirements:
- Privacy-friendly (no PII)
- GDPR compliant
- Works offline
- Batches events
```

**Claude Code generates:**
- `lib/analytics.ts`
- PostHog integration (optional)
- Usage examples

**Your action:**
1. Sign up for Vercel Analytics (built-in to Vercel deployment)
2. Add PostHog if desired (free tier)
3. Copy analytics utilities
4. Test events in browser console

---

#### Day 14: Deploy to Vercel
**Your action:**
```bash
git init
git add .
git commit -m "Initial Saudi Money Guide Next.js setup"
git branch -M main

# Push to GitHub
git remote add origin https://github.com/yourusername/saudi-money-guide.git
git push -u origin main

# Then in Vercel:
# 1. Go to vercel.com
# 2. Sign in with GitHub
# 3. Import repo
# 4. Select "Next.js" preset
# 5. Add environment variables (.env.local values)
# 6. Click Deploy
```

**Live:** Site now at `saudi-money-guide.vercel.app`

---

### WEEK 3: ARABIC + MARKETING (Days 15-21)

#### Day 15: Hire Arabic Writer
**Your action:**
- Post on Fiverr/Upwork: "Arabic financial writer for Saudi personal finance guides"
- Send 5 English guides + translation brief
- Budget: $50-100 per guide or $400-600/month for ongoing

#### Day 16-17: Marketing Setup
**Your action:**
- Set up social media accounts (Twitter, LinkedIn)
- Create Reddit posts for r/saudiarabia
- Join 5 Saudi expat Facebook groups
- Prepare email template for launch

#### Day 18: Claude Code Task #11 — Blog/News Section (Optional)
**Request to Claude Code:**
```
Generate blog listing page for announcements + news.

Requirements:
- Route: /[locale]/blog
- List blog posts (similar to guides, but different category)
- Sorting: By date (newest first)
- Filtering: By category (news, tips, announcement)
- Bilingual support

Include:
- app/[locale]/blog/page.tsx
- app/[locale]/blog/[slug]/page.tsx
- components/BlogCard.tsx
- lib/blogs.ts (blog loader)

Similar to guides but separate content folder.
```

**Claude Code generates:**
- Blog infrastructure

---

#### Day 19-20: Receive & Publish Arabic Guides
**Your action:**
- Receive Arabic guides from writer
- Create: `content/guides/ar/{slug}.mdx` (copy English structure)
- Verify MDX formatting works
- Publish guides

#### Day 21: Launch & Market
**Your action:**
- Set domain to Vercel
- Post announcements on social media
- Submit to Google Search Console
- Share on Reddit + Facebook groups

---

### WEEK 4: OPTIMIZE + SCALE (Days 22-30)

#### Day 22-23: Claude Code Task #12 — Admin Dashboard (Optional)
**Request to Claude Code:**
```
Generate simple analytics dashboard.

Requirements:
- Route: /admin/dashboard (protected by env variable)
- Display:
  1. Pageviews last 7 days (chart)
  2. Affiliate clicks by partner (table)
  3. Email subscribers count
  4. Top guides by views
  5. Top keywords ranking

Data source: PostHog API or manual logs

Include:
- app/admin/dashboard/page.tsx
- lib/admin-auth.ts (basic protection)
- components/AnalyticsChart.tsx

Simple, lightweight (no complex libraries)
```

#### Day 24-25: Performance Optimization
**Your action:**
- Run Lighthouse (DevTools)
- Use Claude Code to optimize slow components if needed
- Reduce image sizes
- Test Core Web Vitals

#### Day 26-30: Month 2 Planning
**Your action:**
- Analyze analytics
- Plan next 5 guides
- Identify high-performing keywords
- Plan content calendar

---

## CLAUDE CODE PROMPT TEMPLATE (Reusable)

Use this template for any future Claude Code requests:

```
Generate [component type] for Next.js bilingual site (Arabic + English).

Requirements:
- Route: [where it appears]
- Props: [what it accepts]
- Functionality: [what it does]
- Styling: Tailwind CSS, mobile-responsive, RTL support for Arabic
- Features: [accessibility, dark mode, animations, etc.]

Include:
- TypeScript types
- Error handling
- Loading states
- Bilingual strings
- Example usage

Framework: Next.js 14 App Router
```

---

## FINAL CHECKLIST (End of Month 1)

### Code Completed by Claude
- [x] i18n configuration (Day 2)
- [x] Header + Footer (Day 3)
- [x] Homepage (Day 4)
- [x] Tailwind + RTL (Day 5)
- [x] MDX guide system (Day 5)
- [x] Affiliate tracking API (Day 9)
- [x] AffiliateLink component (Day 10)
- [x] Email signup API (Day 11)
- [x] SEO utilities (Day 12)
- [x] Analytics setup (Day 13)

### Content Completed by You
- [x] 5 English guides (Day 8)
- [x] 5 Arabic guides (Week 3)
- [x] Social media posts
- [x] Email templates

### Deployed
- [x] Live on Vercel (Day 14)
- [x] Custom domain configured
- [x] Google Search Console verified

---

## COST SUMMARY (Month 1)

| Item | Cost |
|------|------|
| Domain (saudimoneyguide.com) | $12 |
| Vercel hosting | $0 (free tier) |
| SendGrid (email) | $0 (free tier) |
| PostHog (analytics) | $0 (free tier) |
| Arabic writer (Weeks 2-3) | $400-600 |
| **Total Month 1** | **$412-612** |

**Month 2 onwards:** +$0-100 hosting as you scale

---

## SUCCESS METRICS (End of Month 1)

✓ **Code quality:** All TypeScript, fully typed, no errors  
✓ **Performance:** Lighthouse 90+, Core Web Vitals green  
✓ **Bilingual:** Both English + Arabic working, RTL correct  
✓ **SEO:** Hreflang tags, sitemap, schema markup  
✓ **Affiliate:** Tracking working, conversions logging  
✓ **Traffic:** 800-1,800 visitors from Week 3-4  
✓ **Email:** 100-500 subscribers  
✓ **Deployment:** Live on Vercel, custom domain working  

---

**You're ready to build with Claude Code. Let's go. 🚀**

