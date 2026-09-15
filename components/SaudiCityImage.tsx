import Image from 'next/image';
import type { Locale } from '@/i18n/routing';
export default function SaudiCityImage({ locale, compact = false, hero = false, coastal = false }: { locale: Locale; compact?: boolean; hero?: boolean; coastal?: boolean }) {
  const ar = locale === 'ar';
  const caption = coastal ? (ar ? 'رسم مستوحى من الواجهة البحرية في جدة' : 'Inspired by Jeddah’s waterfront') : (ar ? 'رسم مستوحى من الحي المالي في الرياض' : 'Inspired by Riyadh’s financial district');
  return <figure className={hero ? 'overflow-hidden rounded-[1.5rem] border border-[var(--rule)] bg-[var(--paper)] shadow-[var(--shadow-premium)]' : 'mt-8 overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--paper)]'}>
    <div className={hero ? 'relative aspect-[3/2] lg:aspect-[6/5]' : compact ? 'relative aspect-[3/1] min-h-36' : 'relative aspect-[2/1]'}>
      <Image src={coastal ? '/images/jeddah-waterfront.webp' : '/images/riyadh-financial-district.webp'} fill sizes={hero ? '(max-width: 1024px) 100vw, 560px' : '(max-width: 768px) 100vw, 720px'} preload={hero} alt={coastal ? (ar ? 'رسم توضيحي لأبراج أعمال ونخيل على ساحل البحر الأحمر' : 'Illustrated business towers and palms on the Red Sea waterfront') : (ar ? 'رسم توضيحي لأبراج زجاجية ونخيل مستوحى من الحي المالي في الرياض' : 'Illustrated glass towers and palms inspired by Riyadh’s financial district')} className="object-cover object-center" />
    </div>
    <figcaption className="flex flex-wrap justify-between gap-x-3 gap-y-1 px-4 py-3 text-xs leading-relaxed text-[var(--ink-3)]"><span>{caption}</span><span>{ar ? 'رسم مولّد بالذكاء الاصطناعي' : 'AI-generated illustration'}</span></figcaption>
  </figure>;
}
