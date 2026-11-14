import React from 'react';
import type { Metadata } from 'next';
import { Locale } from '@/types/i18n';
import { SectionHeader } from '@/components/ui/decorative';
import { UnifiedSearchView } from '@/components/search/unified-search-view';

interface SearchPageProps {
  params: { lang: string };
  searchParams?: { q?: string };
}

export async function generateMetadata({
  params,
}: SearchPageProps): Promise<Metadata> {
  const lang = (params.lang || 'bn') as Locale;

  return {
    title: lang === 'bn' ? 'সার্বজনীন অনুসন্ধান | প্রতিদিনের সুন্নাহ' : lang === 'ar' ? 'البحث الشامل | سنة اليوم' : 'Global Search | Protidiner Sunnah',
    description: 'Cross-corpus unified search across Islamic ebooks, Quran Surahs, Hadith collections, and Duas.',
    alternates: {
      canonical: `/${lang}/search`,
      languages: {
        bn: '/bn/search',
        ar: '/ar/search',
        en: '/en/search',
        'x-default': '/bn/search',
      },
    },
  };
}

export default function SearchPage({
  params,
  searchParams,
}: SearchPageProps) {
  const lang = (params.lang || 'bn') as 'bn' | 'ar' | 'en';
  const query = searchParams?.q || '';

  return (
    <div className="py-12 md:py-20 bg-background bg-islamic-pattern min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 space-y-10 max-w-4xl">
        <SectionHeader
          badge={lang === 'bn' ? 'অনুসন্ধান কেন্দ্র' : lang === 'ar' ? 'البحث في المحتوى' : 'Global Search'}
          title={lang === 'bn' ? 'ইসলামিক জ্ঞান ভাণ্ডারে অনুসন্ধান' : lang === 'ar' ? 'البحث في القرآن والسنة والكتب' : 'Search the Islamic Corpus'}
          subtitle={
            lang === 'bn'
              ? 'কুরআনের সূরা, সহিহ হাদিস, প্রামাণ্য ই-বুক ও মাসনূন দু‘আর বিশাল সংগ্রহশালা থেকে মুহূর্তেই খুঁজে নিন কাঙ্ক্ষিত জ্ঞান।'
              : 'Instantly find relevant Quranic verses, authentic hadiths, classical ebooks, and daily duas.'
          }
        />

        <UnifiedSearchView locale={lang} initialQuery={query} />
      </div>
    </div>
  );
}
