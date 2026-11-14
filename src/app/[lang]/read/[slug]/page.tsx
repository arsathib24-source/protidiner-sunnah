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

  const title = book.title[lang] || book.title.bn;
  const author = book.author[lang] || book.author.bn;

  return {
    title: `${title} - ${lang === 'bn' ? 'অনলাইন রিডার' : lang === 'ar' ? 'القارئ الإلكتروني' : 'Online Reader'} | Protidiner Sunnah`,
    description:
      lang === 'bn'
        ? `অনলাইনে পড়ুন: ${title} - রচয়িতা: ${author}`
        : lang === 'ar'
        ? `اقرأ أونلاين: ${title} - تأليف: ${author}`
        : `Read online: ${title} by ${author}`,
    alternates: {
      canonical: `/${lang}/read/${params.slug}`,
      languages: {
        bn: `/bn/read/${params.slug}`,
        ar: `/ar/read/${params.slug}`,
        en: `/en/read/${params.slug}`,
        'x-default': `/bn/read/${params.slug}`,
      },
    },
    openGraph: {
      title: `${title} | Protidiner Sunnah Reader`,
      description: `Read ${title} online free with bilingual side-by-side Arabic translation.`,
      locale: lang === 'bn' ? 'bn_BD' : lang === 'ar' ? 'ar_SA' : 'en_US',
    },
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
  const matchedClassical = CLASSICAL_BOOKS.find((b) => b.slug === slug);

  if (readerBook && matchedClassical) {
    readerBook = {
      ...readerBook,
      totalCompiledChapters: matchedClassical.totalCompiledChapters,
    };
  }

  // If not in verified full-text dictionary, build a fallback reader book from CLASSICAL_BOOKS
  if (!readerBook) {
    const fallback = matchedClassical;
    if (!fallback) {
      notFound();
    }

    readerBook = {
      slug: fallback.slug,
      title: fallback.title,
      author: fallback.author,
      category: fallback.category,
      verifiedSource: fallback.verifiedSource,
      totalCompiledChapters: fallback.totalCompiledChapters,
      chapters: fallback.chapters.map((ch) => ({
        number: ch.number,
        slug: ch.slug,
        title: ch.title,
        durationMins: ch.durationMins,
        paragraphs: [
          {
            id: `p-${ch.number}-review-notice`,
            type: 'commentary',
            bengali: `【তাহকিক ও অনুবাদ প্রক্রিয়াধীন】\n\n${fallback.title.bn}-এর এই অধ্যায়টি (${ch.title.bn}) বর্তমানে আমাদের ইসলামিক গবেষক ও নিরীক্ষক প্যানেল দ্বারা মূল পাণ্ডুলিপির (${fallback.verifiedSource}) আলোকে যাচাই ও সম্পাদন করা হচ্ছে।\n\nধর্মীয় বিষয়ের সর্বোচ্চ বিশুদ্ধতা বজায় রাখার স্বার্থে অনিরীক্ষিত কোনো অনুবাদ বা কৃত্রিম বুদ্ধিমত্তা দ্বারা তৈরি টেক্সট প্রকাশ করা থেকে বিরত থাকা হয়েছে। অতি শীঘ্রই ইনশাআল্লাহ পূর্ণাঙ্গ নির্ভরযোগ্য তাহকিক সংস্করণ এখানে উন্মুক্ত করা হবে।`,
            english: `[SCHOLARLY AUDIT & VERIFICATION IN PROGRESS]\n\nThis chapter (${ch.title.en}) of ${fallback.title.en} is currently undergoing rigorous textual verification and translation review against the physical print edition (${fallback.verifiedSource}) by our qualified editorial board.\n\nTo uphold strict Islamic content integrity, unverified AI translations are strictly prohibited. The fully authenticated digital transcription will be published here shortly, insha'Allah.`,
            source: fallback.verifiedSource,
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
