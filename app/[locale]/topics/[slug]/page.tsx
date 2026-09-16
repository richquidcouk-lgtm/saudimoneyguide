import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { TOPICS, TOPIC_TOOLS, TOPIC_PATHS, getPostTopic } from '@/lib/topics';
import { GUIDE_CATEGORY_MAP } from '@/lib/guide-categories';
import { getAllGuides } from '@/lib/guides';
import { getAllBlogPosts } from '@/lib/blog';
import { TOOLS } from '@/lib/tools-data';
import { buildAlternates, buildOpenGraph } from '@/lib/seo';
import { buildBreadcrumbSchema } from '@/lib/schema';
export function generateStaticParams(){return ['en','ar'].flatMap(locale=>TOPICS.map(topic=>({locale,slug:topic.id})));}
export async function generateMetadata({params}:{params:Promise<{locale:string;slug:string}>}):Promise<Metadata>{
 const {locale,slug}=await params;const topic=TOPICS.find(t=>t.id===slug);if(!topic)return {};
 const ar=locale==='ar';const title=ar?topic.labelAr+' في السعودية':topic.labelEn+' in Saudi Arabia';
 const description=ar?topic.descriptionAr+' أدلة ومقالات وأدوات لمساعدتك على التخطيط.':topic.descriptionEn+' Explore practical guides, examples and planning tools.';
 return {title,description,alternates:buildAlternates('/topics/'+slug,locale as Locale),...buildOpenGraph({title,description,path:'/topics/'+slug,locale:locale as Locale})};
}
export default async function TopicPage({params}:{params:Promise<{locale:string;slug:string}>}){
 const {locale:raw,slug}=await params;const locale=raw as Locale;setRequestLocale(locale);const ar=locale==='ar';
 const topic=TOPICS.find(t=>t.id===slug);if(!topic)notFound();
 const guides=getAllGuides(locale).filter(g=>GUIDE_CATEGORY_MAP[g.slug]===slug);
 const posts=getAllBlogPosts(locale).filter(p=>getPostTopic(p)===slug);
 const tools=TOOLS.filter(t=>TOPIC_TOOLS[slug].includes(t.slug));
 const title=ar?topic.labelAr:topic.labelEn;
 const groups=[{id:'guides',title:ar?'الأدلة الأساسية':'Start with the guides',items:guides.map(g=>({title:g.title,description:g.description,href:'/guides/'+g.slug}))},{id:'articles',title:ar?'أمثلة وخطوات عملية':'Practical examples and next steps',items:posts.map(p=>({title:p.title,description:p.description,href:'/blog/'+p.slug}))},{id:'tools',title:ar?'جرّب الأرقام':'Explore your numbers',items:tools.map(t=>({title:ar?t.titleAr:t.titleEn,description:ar?t.descriptionAr:t.descriptionEn,href:'/tools/'+t.slug}))}];
 return <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(buildBreadcrumbSchema([{name:ar?'الرئيسية':'Home',path:''},{name:ar?'الموضوعات':'Topics',path:'/topics'},{name:title,path:'/topics/'+slug}],locale))}} />
  <a className="text-sm font-semibold text-[var(--teal-dark)] underline" href={`/${locale}/topics`}>{ar?'جميع الموضوعات':'All topics'}</a>
  <h1 className="font-display mt-5 text-3xl font-semibold sm:text-5xl">{title}{ar?' في السعودية':' in Saudi Arabia'}</h1>
  <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--ink-2)]">{ar?topic.descriptionAr:topic.descriptionEn}</p>
  <nav className="mt-6 flex flex-wrap gap-3" aria-label={ar?'أقسام الموضوع':'Topic sections'}>{groups.filter(g=>g.items.length).map(g=><a className="chip" key={g.id} href={'#'+g.id}>{g.title} · {g.items.length}</a>)}</nav>
  <div className="mt-10 grid gap-5 md:grid-cols-3">{TOPIC_PATHS[slug][locale].map((paragraph,i)=><div key={paragraph} className="rounded-2xl border border-[var(--rule)] bg-[var(--paper)] p-6"><span className="font-display text-3xl text-[var(--gold)]">{i+1}</span><p className="mt-3 text-sm leading-relaxed text-[var(--ink-2)]">{paragraph}</p></div>)}</div>
  {groups.filter(g=>g.items.length).map(group=><section key={group.id} id={group.id} className="mt-12 scroll-mt-24"><h2 className="font-display text-2xl font-semibold">{group.title}</h2><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{group.items.map(item=><a key={item.href} href={`/${locale}${item.href}`} className="card-premium p-5"><h3 className="font-semibold text-[var(--teal-dark)]">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-[var(--ink-3)]">{item.description}</p></a>)}</div></section>)}
 </section>;
}
