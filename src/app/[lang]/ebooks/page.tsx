import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Locale, SUPPORTED_LOCALES } from '@/types/i18n';
import { CLASSICAL_BOOKS } from '@/lib/data/books';
import { SectionHeader } from '@/components/ui/decorative';
import { EbookFilters } from '@/components/ebooks/ebook-filters';
import { EbookGridCard } from '@/components/ebooks/ebook-grid-card';
import { Button } from '@/components/ui/button';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = (params.lang || 'bn') as Locale;
  return {
    title: lang === 'bn' ? 'ইসলামিক ই-বুক লাইব্রেরি' : lang === 'ar' ? 'مكتبة الكتب الإسلامية' : 'Islamic Ebook Library',
    description: lang === 'bn'
      ? 'সহিহ হাদিস, ফিকহ, সিরাত ও দোয়ার প্রামাণ্য ইসলামিক ই-বুক সম্পূর্ণ বিনামূল্যে অনলাইনে পড়ুন।'
      : 'Read authentic Islamic ebooks from classical sources completely free.',
  };
}

export default async function EbooksPage({
  params,
  searchParams,
}: {
  params: { lang: string };
  searchParams?: {
    q?: string;
    category?: string;
    lang_filter?: string;
    sort?: string;
  };
}) {
  const lang = (params.lang || 'bn') as 'bn' | 'ar' | 'en';
  const isRTL = SUPPORTED_LOCALES[lang]?.dir === 'rtl';

  const query = (searchParams?.q || '').toLowerCase().trim();
  const categoryFilter = searchParams?.category || 'all';
  const langFilter = searchParams?.lang_filter || 'all';
  const sortMode = searchParams?.sort || 'latest';

  // Categories list
  const categories = [
    { slug: 'all', label: 'সকল কিতাব' },
    { slug: 'hadith', label: 'হাদিস সংকলন' },
    { slug: 'duas', label: 'দোয়া ও জিকির' },
    { slug: 'aqeedah', label: 'আকিদা ও বিশ্বাস' },
    { slug: 'seerah', label: 'সিরাতুন নবী ﷺ' },
    { slug: 'fiqh', label: 'ফিকহুস সুন্নাহ' },
    { slug: 'tazkiyah', label: 'আখলাক ও শিষ্টাচার' },
  ];

  // Filtering Logic
  let filteredBooks = CLASSICAL_BOOKS.filter((book) => {
    // 1. Category Filter
    const matchesCategory =
      categoryFilter === 'all' || book.category.slug === categoryFilter;

    // 2. Language Filter
    const matchesLanguage =
      langFilter === 'all' ||
      book.availableLanguages.includes(langFilter as 'bn' | 'ar' | 'en');

    // 3. Search Query by Title, Author, or Description
    const matchesQuery =
      !query ||
      book.title[lang].toLowerCase().includes(query) ||
      book.title.bn.toLowerCase().includes(query) ||
      book.title.ar.toLowerCase().includes(query) ||
      book.title.en.toLowerCase().includes(query) ||
      book.author[lang].toLowerCase().includes(query) ||
      book.description[lang].toLowerCase().includes(query);

    return matchesCategory && matchesLanguage && matchesQuery;
  });

  // Sorting Logic
  if (sortMode === 'popular') {
    filteredBooks.sort((a, b) => (b.readCount || 0) - (a.readCount || 0));
  } else if (sortMode === 'title') {
    filteredBooks.sort((a, b) => a.title[lang].localeCompare(b.title[lang]));
  } else {
    // 'latest' default sort by publishedAt
    filteredBooks.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  return (
    <div className="py-12 md:py-20 bg-background bg-islamic-pattern min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <SectionHeader
          badge="ডিজিটাল ইসলামিক লাইব্রেরি"
          title="সকল প্রামাণ্য ই-বুক ও কিতাব"
          subtitle="পবিত্র কুরআন ও সহিহ সুন্নাহর আলোকে বিজ্ঞ আলেমদের রচিত নির্ভরযোগ্য কিতাবসমূহ বিনামূল্যে অনলাইনে যেকোনো ডিভাইসে পাঠ করুন।"
        />

        {/* Search & Filter Component */}
        <EbookFilters
          locale={lang}
          categories={categories}
          totalCount={filteredBooks.length}
        />

        {/* Ebooks Grid */}
        <div>
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredBooks.map((book) => (
                <EbookGridCard
                  key={book.id}
                  book={book}
                  locale={lang}
                  isRTL={isRTL}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-surface rounded-3xl border border-border/80 shadow-card p-8 space-y-4 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-accent/15 text-accent-dark flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-bengali-heading text-primary">
                আপনার অনুসন্ধানে কোনো কিতাব পাওয়া যায়নি
              </h3>
              <p className="text-sm text-text-muted">
                অন্য কোনো শব্দ দিয়ে খুঁজুন অথবা ফিল্টার রিসেট করুন।
              </p>
              <div className="pt-2">
                <Link href={`/${lang}/ebooks`}>
                  <Button variant="primary" size="sm">
                    ফিল্টার মুছুন
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
