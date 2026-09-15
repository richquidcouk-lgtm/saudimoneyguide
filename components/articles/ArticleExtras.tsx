import type { Locale } from '@/i18n/routing';
import type { ArticleLink, ContentsItem } from '@/lib/article-navigation';
import { TOOLS } from '@/lib/tools-data';

type ArticleInfo = { author: string; publishedAt: string; updatedAt?: string; reviewedAt?: string; reviewer?: string; description: string; summary?: string[] };
function date(value: string, locale: Locale) {
  const parsed = new Date(value + 'T12:00:00Z');
  return Number.isNaN(parsed.getTime()) ? value : new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', calendar: 'gregory', timeZone: 'UTC' }).format(parsed);
}
export function ArticleMeta({ article, locale, minutes }: { article: ArticleInfo; locale: Locale; minutes: number }) {
  const ar = locale === 'ar';
  return <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--ink-3)]">
    <span>{ar ? 'بقلم' : 'By'} <a className="font-semibold text-[var(--teal-dark)] underline underline-offset-4" href={`/${locale}/about`}>{article.author}</a></span>
    <span>{ar ? 'نُشر في' : 'Published'} <time dateTime={article.publishedAt}>{date(article.publishedAt, locale)}</time></span>
    {article.updatedAt && <span>{ar ? 'آخر تحديث' : 'Updated'} <time dateTime={article.updatedAt}>{date(article.updatedAt, locale)}</time></span>}
    <span>{ar ? `حوالي ${minutes} دقائق للقراءة` : `About ${minutes} min read`}</span>
  </div>;
}
export function ArticleOverview({ article, locale, headings, toolSlugs }: { article: ArticleInfo; locale: Locale; headings: ContentsItem[]; toolSlugs: string[] }) {
  const ar = locale === 'ar';
  const tools = toolSlugs.map(slug => TOOLS.find(tool => tool.slug === slug)).filter(tool => tool !== undefined).slice(0, 2);
  return <div className="mt-8 space-y-5">
    <section aria-labelledby="article-overview" className="rounded-2xl border border-[var(--rule)] bg-[var(--paper)] p-5 sm:p-7">
      <h2 id="article-overview" className="eyebrow">{ar ? 'في هذا المقال' : 'At a glance'}</h2>
      {article.summary?.length ? <ul className="mt-3 list-disc space-y-2 ps-5 text-base leading-relaxed text-[var(--ink-2)]">{article.summary.map(item => <li key={item}>{item}</li>)}</ul> : <p className="mt-3 text-base leading-relaxed text-[var(--ink-2)]">{article.description}</p>}
      {tools.length > 0 && <div className="mt-5 border-t border-[var(--rule)] pt-4"><p className="text-xs font-semibold text-[var(--ink-3)]">{ar ? 'أدوات مرتبطة بالمقال' : 'Put this guide into practice'}</p><div className="mt-3 flex flex-wrap gap-2">{tools.map(tool => <a key={tool.slug} className="rounded-lg bg-[var(--teal-soft)] px-4 py-3 text-sm font-semibold text-[var(--teal-dark)] hover:underline" href={`/${locale}/tools/${tool.slug}`}>{ar ? tool.titleAr : tool.titleEn}</a>)}</div></div>}
    </section>
    {headings.some(h => h.depth === 2) && <nav aria-label={ar ? 'محتويات المقال' : 'Article contents'} className="rounded-2xl border border-[var(--rule)] p-5 sm:p-7"><details open><summary className="cursor-pointer font-semibold text-[var(--teal-dark)]">{ar ? 'انتقل إلى القسم' : 'On this page'}</summary><ol className="mt-4 grid gap-x-6 gap-y-1 sm:grid-cols-2">{headings.filter(h => h.depth === 2).map(h => <li key={h.id}><a href={`#${h.id}`} className="block rounded-md py-2 text-sm leading-relaxed text-[var(--ink-2)] underline decoration-[var(--rule-strong)] underline-offset-4 hover:text-[var(--teal-dark)]">{h.title}</a></li>)}</ol></details></nav>}
  </div>;
}
export function ArticleTrust({ article, locale, sources }: { article: ArticleInfo; locale: Locale; sources: ArticleLink[] }) {
  const ar = locale === 'ar';
  return <aside className="mt-12 space-y-6 border-t border-[var(--rule)] pt-6" aria-label={ar ? 'المؤلف والمراجع' : 'Author and references'}>
    {sources.length > 0 && <section><h2 className="font-display text-xl font-semibold">{ar ? 'روابط وردت في المقال' : 'References and further reading'}</h2><ul className="mt-3 space-y-3">{sources.map(source => <li key={source.href}><a href={source.href} className="break-words text-sm text-[var(--teal-dark)] underline underline-offset-4">{source.title}</a><span className="ms-2 text-xs text-[var(--ink-3)]">{new URL(source.href).hostname.replace(/^www\./, '')}</span></li>)}</ul></section>}
    <div className="rounded-xl bg-[var(--teal-soft)] p-5"><p className="font-semibold text-[var(--teal-dark)]">{article.author}</p><p className="mt-2 text-sm leading-relaxed text-[var(--ink-2)]">{ar ? 'محتوى تعليمي لمساعدتك على فهم خياراتك المالية في السعودية.' : 'Educational guidance to help you understand your financial options in Saudi Arabia.'}</p>
      {article.reviewer && article.reviewedAt && <p className="mt-3 text-sm">{ar ? 'راجعه' : 'Reviewed by'} {article.reviewer} · <time dateTime={article.reviewedAt}>{date(article.reviewedAt, locale)}</time></p>}
      <div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold text-[var(--teal-dark)]"><a className="underline underline-offset-4" href={`/${locale}/about`}>{ar ? 'عن الموقع وطريقة عملنا' : 'About our approach'}</a><a className="underline underline-offset-4" href={`/${locale}/contact`}>{ar ? 'أبلغ عن تصحيح' : 'Suggest a correction'}</a></div>
    </div>
  </aside>;
}
