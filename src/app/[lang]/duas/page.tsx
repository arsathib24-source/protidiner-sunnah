import React from 'react';
import type { Metadata } from 'next';
import { Locale } from '@/types/i18n';
import { SectionHeader } from '@/components/ui/decorative';
import { DuasInteractiveView } from '@/components/duas/duas-interactive-view';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = (params.lang || 'bn') as Locale;

  return {
    title: lang === 'bn' ? 'দু‘আ ও যিকির লাইব্রেরি (হিসনুল মুসলিম) | প্রতিদিনের সুন্নাহ' : lang === 'ar' ? 'الأدعية والأذكار (حصن المسلم) | سنة اليوم' : 'Duas & Adhkar Library | Protidiner Sunnah',
    description: 'Authentic daily supplications, morning and evening adhkar from Hisnul Muslim with Arabic text, pronunciation, translation, and interactive counter.',
    alternates: {
      canonical: `/${lang}/duas`,
      languages: {
        bn: '/bn/duas',
        ar: '/ar/duas',
        en: '/en/duas',
        'x-default': '/bn/duas',
      },
    },
  };
}

export default function DuasPage({
  params,
}: {
  params: { lang: string };
}) {
  const lang = (params.lang || 'bn') as 'bn' | 'ar' | 'en';

  return (
    <div className="py-12 md:py-20 bg-background bg-islamic-pattern min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 space-y-10 max-w-4xl">
        <SectionHeader
          badge={lang === 'bn' ? 'হিসনুল মুসলিম' : lang === 'ar' ? 'حصن المسلم' : 'Fortress of the Muslim'}
          title={lang === 'bn' ? 'দৈনন্দিন জীবনের মাসনূন দু‘আ ও যিকির' : lang === 'ar' ? 'الأدعية والأذكار النبوية اليومية' : 'Authentic Duas & Daily Remembrances'}
          subtitle={
            lang === 'bn'
              ? 'সকাল-সন্ধ্যা, ঘুমানো, জাগরণ ও প্রাত্যহিক জীবনের সহিহ হাদিসভিত্তিক দু‘আ, সঠিক উচ্চারণ, অর্থ ও ডিজিটাল কাউন্টার।'
              : lang === 'ar'
              ? 'أذكار الصباح والمساء واليوم والليلة من القرآن والسنة الصحيحة مع العداد التفاعلي.'
              : 'Authentic prophetic supplications from Hisnul Muslim with Tashkeel Arabic, transliteration, and digital tasbeeh counter.'
          }
        />

        <DuasInteractiveView locale={lang} />
      </div>
    </div>
  );
}
