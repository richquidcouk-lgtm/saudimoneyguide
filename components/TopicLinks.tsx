import { TOPICS } from '@/lib/topics';
import type { Locale } from '@/i18n/routing';
export default function TopicLinks({ locale }: { locale: Locale }) {
  return <nav aria-label={locale === 'ar' ? 'الموضوعات المالية' : 'Finance topics'} className="mt-8 flex flex-wrap gap-2">{TOPICS.map(topic => <a key={topic.id} href={`/${locale}/topics/${topic.id}`} className="chip hover:border-[var(--teal)] hover:text-[var(--teal-dark)]">{locale === 'ar' ? topic.labelAr : topic.labelEn}</a>)}</nav>;
}
