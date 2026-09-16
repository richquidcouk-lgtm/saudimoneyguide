import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { TOPICS } from '@/lib/topics';
import { buildAlternates, buildOpenGraph } from '@/lib/seo';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
 const {locale}=await params;const title=locale==='ar'?'موضوعات المال في السعودية: أدلة وأدوات':'Saudi Money Topics: Guides, Articles & Calculators';
 const description=locale==='ar'?'تصفح أدلة البنوك والراتب والسكن والتأمين وتكلفة المعيشة والاستثمار في السعودية، مع مقالات عملية وحاسبات مرتبطة بكل موضوع.':'Explore Saudi banking, salary, housing, insurance, living costs and investing with connected guides, practical articles and calculators.';
 return {title,description,alternates:buildAlternates('/topics',locale as Locale),...buildOpenGraph({title,description,path:'/topics',locale:locale as Locale})};
}
export default async function TopicsPage({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;setRequestLocale(locale as Locale);const ar=locale==='ar';
 return <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6"><p className="eyebrow">{ar?'ابدأ من سؤالك':'Start with your question'}</p><h1 className="font-display mt-3 text-4xl font-semibold">{ar?'موضوعات المال في السعودية':'Money topics for life in Saudi Arabia'}</h1><p className="mt-4 max-w-2xl leading-relaxed text-[var(--ink-2)]">{ar?'اختر الموضوع المناسب لتجد الدليل والمثال والأداة في مكان واحد.':'Choose a topic to find the background guide, a practical example and a useful tool in one place.'}</p><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{TOPICS.map(topic=><a key={topic.id} href={`/${locale}/topics/${topic.id}`} className="card-premium p-6"><h2 className="font-display text-xl font-semibold">{ar?topic.labelAr:topic.labelEn}</h2><p className="mt-3 text-sm leading-relaxed text-[var(--ink-3)]">{ar?topic.descriptionAr:topic.descriptionEn}</p></a>)}</div></section>;
}
