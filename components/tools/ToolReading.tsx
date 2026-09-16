import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog';
import { getAllGuides, getGuideBySlug } from '@/lib/guides';
import type { Locale } from '@/i18n/routing';
export default function ToolReading({slug,locale}:{slug:string;locale:Locale}){
 const marker='/tools/'+slug+')';
 const posts=getAllBlogPosts(locale).filter(p=>getBlogPostBySlug(locale,p.slug)?.content.includes(marker)).slice(0,3);
 const guides=getAllGuides(locale).filter(g=>getGuideBySlug(locale,g.slug)?.content.includes(marker)).slice(0,3);
 const links=[...posts.map(p=>({title:p.title,description:p.description,href:'/blog/'+p.slug})),...guides.map(g=>({title:g.title,description:g.description,href:'/guides/'+g.slug}))];
 if(!links.length)return null;
 return <section className="mt-12"><h2 className="font-display text-2xl font-semibold">{locale==='ar'?'افهم النتيجة والخطوة التالية':'Understand the result and your next step'}</h2><div className="mt-5 grid gap-4 sm:grid-cols-2">{links.map(link=><a key={link.href} href={`/${locale}${link.href}`} className="card-premium p-5"><h3 className="font-semibold text-[var(--teal-dark)]">{link.title}</h3><p className="mt-3 text-sm leading-relaxed text-[var(--ink-3)]">{link.description}</p></a>)}</div></section>;
}
