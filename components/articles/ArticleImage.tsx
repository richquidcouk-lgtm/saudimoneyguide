import Image from 'next/image';
import type { Locale } from '@/i18n/routing';
import { ARTICLE_IMAGES, ARTICLE_IMAGE_MAP } from '@/lib/article-images';
export default function ArticleImage({ slug, locale }: { slug: string; locale: Locale }) {
  const key = ARTICLE_IMAGE_MAP[slug];
  if (!key) return null;
  const image = ARTICLE_IMAGES[key];
  const ar = locale === 'ar';
  return <figure className="mt-8 overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--paper)]">
    <div className="relative aspect-[2/1] sm:aspect-[5/2]"><Image src={image.src} fill sizes="(max-width: 768px) 100vw, 720px" alt={ar ? image.altAr : image.altEn} className="object-cover object-center" /></div>
    <figcaption className="flex flex-wrap justify-between gap-2 px-4 py-3 text-xs leading-relaxed text-[var(--ink-3)]"><span>{ar ? image.ar : image.en}</span><span>{ar ? 'رسم توضيحي مولّد بالذكاء الاصطناعي' : 'AI-generated editorial illustration'}</span></figcaption>
  </figure>;
}
