import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale, SUPPORTED_LOCALES } from '@/types/i18n';
import { VERIFIED_READER_BOOKS } from '@/lib/data/reader-content';
import { CLASSICAL_BOOKS } from '@/lib/data/books';
import { ReaderEngine } from '@/components/reader/reader-engine';
import { ReaderBook } from '@/types/reader';

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  const lang = (params.lang || 'bn') as Locale;
  const book = VERIFIED_READER_BOOKS[params.slug] || CLASSICAL_BOOKS.find((b) => b.slug === params.slug);

  if (!book) {
    return { title: 'ই-বুক রিডার | Protidiner Sunnah' };
  }

  return {
    title: `${book.title[lang]} - অনলাইন রিডার | Protidiner Sunnah`,
    description: `অনলাইনে পড়ুন: ${book.title[lang]} - রচয়িতা: ${book.author[lang]}`,
  };
}

export default async function ReaderPage({
  params,
  searchParams,
}: {
  params: { lang: string; slug: string };
  searchParams?: { chapter?: string };
}) {
  const lang = (params.lang || 'bn') as 'bn' | 'ar' | 'en';
  const isRTL = SUPPORTED_LOCALES[lang]?.dir === 'rtl';
  const slug = params.slug;

  // Fetch book from verified reader contents
  let readerBook: ReaderBook | undefined = VERIFIED_READER_BOOKS[slug];

  // If not in verified full-text dictionary, build a fallback reader book from CLASSICAL_BOOKS
  if (!readerBook) {
    const fallback = CLASSICAL_BOOKS.find((b) => b.slug === slug);
    if (!fallback) {
      notFound();
    }

    readerBook = {
      slug: fallback.slug,
      title: fallback.title,
      author: fallback.author,
      category: fallback.category,
      verifiedSource: fallback.verifiedSource,
      chapters: fallback.chapters.map((ch) => ({
        number: ch.number,
        slug: ch.slug,
        title: ch.title,
        durationMins: ch.durationMins,
        paragraphs: [
          {
            id: `p-${ch.number}-1`,
            type: 'hadith',
            arabic: '«إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى»',
            bengali: 'আমিরুল মুমিনিন উমর ইবনুল খাত্তাব (রা.) বলেন: আমি রাসুলুল্লাহ ﷺ-কে বলতে শুনেছি: «সকল আমল নিয়তের উপর নির্ভরশীল; আর প্রত্যেক ব্যক্তি তাই পাবে যার সে নিয়ত করেছে...»',
            english: 'Narrated Umar ibn al-Khattab: I heard the Messenger of Allah ﷺ say: "Actions are according to intentions..."',
            source: 'সহিহ বুখারি: ১',
            grade: 'সহিহ',
          },
        ],
      })),
    };
  }

  const initialChapter = searchParams?.chapter ? parseInt(searchParams.chapter, 10) : 1;

  return (
    <ReaderEngine
      book={readerBook}
      initialChapterNumber={isNaN(initialChapter) ? 1 : initialChapter}
      locale={lang}
      isRTL={isRTL}
    />
  );
}
