import React from 'react';
import type { Metadata } from 'next';
import { Locale } from '@/types/i18n';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { SectionHeader } from '@/components/ui/decorative';
import { BookmarksClientView } from '@/components/bookmarks/bookmarks-client-view';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = (params.lang || 'bn') as Locale;
  const dict = await getDictionary(lang);

  return {
    title: `${dict.nav.bookmarks} | ${dict.brand.name}`,
    description: 'Saved bookmarks, reading progress, and personal study notes in Protidiner Sunnah.',
    alternates: {
      canonical: `/${lang}/bookmarks`,
      languages: {
        bn: '/bn/bookmarks',
        ar: '/ar/bookmarks',
        en: '/en/bookmarks',
        'x-default': '/bn/bookmarks',
      },
    },
  };
}

export default async function BookmarksPage({
  params,
}: {
  params: { lang: string };
}) {
  const lang = (params.lang || 'bn') as 'bn' | 'ar' | 'en';

  return (
    <div className="py-12 md:py-20 bg-background bg-islamic-pattern min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 space-y-10 max-w-4xl">
        <SectionHeader
          badge={lang === 'bn' ? 'সংরক্ষিত সংগ্রহশালা' : lang === 'ar' ? 'المحفوظات الشخصية' : 'Personal Saved Collection'}
          title={lang === 'bn' ? 'আপনার সংরক্ষিত বুকমার্ক ও পড়ার অগ্রগতি' : lang === 'ar' ? 'الإشارات المرجعية والتقدم في القراءة' : 'Your Bookmarks & Reading Progress'}
          subtitle={
            lang === 'bn'
              ? 'পড়ার সময় সংরক্ষিত প্রিয় আয়াত, হাদিস, অনুচ্ছেদ ও পড়ার অগ্রগতি এখানে স্বয়ংক্রিয়ভাবে সংরক্ষিত থাকে।'
              : lang === 'ar'
              ? 'الآيات والأحاديث والفوائد الإيمانية والتقدم القرائي التي قمت بحفظها أثناء القراءة للرجوع إليها سريعًا.'
              : 'Verses, Hadiths, paragraphs, and reading progress you have saved are neatly organized here.'
          }
        />

        <BookmarksClientView locale={lang} />
      </div>
    </div>
  );
}
