import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale } from '@/types/i18n';
import { SURAH_LIST, VERIFIED_SURAHS_CONTENT } from '@/lib/data/quran-data';
import { SurahReaderView } from '@/components/quran/surah-reader-view';

interface QuranSurahPageProps {
  params: { lang: string; surah: string };
}

export async function generateMetadata({ params }: QuranSurahPageProps): Promise<Metadata> {
  const lang = (params.lang || 'bn') as Locale;
  const surahMeta = SURAH_LIST.find((s) => s.slug === params.surah || String(s.number) === params.surah);

  if (!surahMeta) {
    return { title: 'সূরা রিডার | আল-কুরআন' };
  }

  const title = lang === 'bn' ? `সূরা ${surahMeta.nameBengali}` : lang === 'ar' ? `سورة ${surahMeta.nameArabic}` : `Surah ${surahMeta.nameEnglish}`;

  return {
    title: `${title} (${surahMeta.meaningBengali}) | আল-কুরআনুল কারীম - প্রতিদিনের সুন্নাহ`,
    description: `Read ${title} online with Arabic Uthmani script and verified translations.`,
    alternates: {
      canonical: `/${lang}/quran/${surahMeta.slug}`,
      languages: {
        bn: `/bn/quran/${surahMeta.slug}`,
        ar: `/ar/quran/${surahMeta.slug}`,
        en: `/en/quran/${surahMeta.slug}`,
        'x-default': `/bn/quran/${surahMeta.slug}`,
      },
    },
  };
}

export default function QuranSurahPage({ params }: QuranSurahPageProps) {
  const lang = (params.lang || 'bn') as 'bn' | 'ar' | 'en';
  const surahMeta = SURAH_LIST.find((s) => s.slug === params.surah || String(s.number) === params.surah);

  if (!surahMeta) {
    notFound();
  }

  const surahData = VERIFIED_SURAHS_CONTENT[surahMeta.number];
  const ayahs = surahData ? surahData.ayahs : [];

  // Surah navigation
  const currentIndex = SURAH_LIST.findIndex((s) => s.number === surahMeta.number);
  const prevSurah = currentIndex > 0 ? SURAH_LIST[currentIndex - 1] : null;
  const nextSurah = currentIndex < SURAH_LIST.length - 1 ? SURAH_LIST[currentIndex + 1] : null;

  return (
    <div className="py-12 md:py-20 bg-background bg-islamic-pattern min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <SurahReaderView
          surahMeta={surahMeta}
          ayahs={ayahs}
          prevSurah={prevSurah}
          nextSurah={nextSurah}
          locale={lang}
        />
      </div>
    </div>
  );
}
