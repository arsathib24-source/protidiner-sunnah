import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Locale, SUPPORTED_LOCALES } from '@/types/i18n';
import { getDictionary } from '@/lib/i18n/get-dictionary';
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
  const dict = await getDictionary(lang);

  return {
    title: `${dict.library.title} | ${dict.brand.name}`,
    description: dict.library.subtitle,
    alternates: {
      canonical: `/${lang}/ebooks`,
      languages: {
        bn: '/bn/ebooks',
        ar: '/ar/ebooks',
        en: '/en/ebooks',
        'x-default': '/bn/ebooks',
      },
    },
    openGraph: {
      title: dict.library.title,
      description: dict.library.subtitle,
      locale: lang === 'bn' ? 'bn_BD' : lang === 'ar' ? 'ar_SA' : 'en_US',
    },
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
  const dict = await getDictionary(lang);
  const isRTL = SUPPORTED_LOCALES[lang]?.dir === 'rtl';

  const query = (searchParams?.q || '').toLowerCase().trim();
  const categoryFilter = searchParams?.category || 'all';
  const langFilter = searchParams?.lang_filter || 'all';
  const sortMode = searchParams?.sort || 'latest';

  // Localized Categories list
  const categories = [
    { slug: 'all', label: dict.library.allCategories },
    { slug: 'hadith', label: lang === 'bn' ? 'হাদিস সংকলন' : lang === 'ar' ? 'الحديث الشريف' : 'Hadith Collections' },
    { slug: 'duas', label: lang === 'bn' ? 'দোয়া ও জিকির' : lang === 'ar' ? 'الأدعية والأذكار' : 'Duas & Adhkar' },
    { slug: 'aqeedah', label: lang === 'bn' ? 'আকিদা ও বিশ্বাস' : lang === 'ar' ? 'العقيدة الإسلامية' : 'Aqeedah & Creed' },
    { slug: 'seerah', label: lang === 'bn' ? 'সিরাতুন নবী ﷺ' : lang === 'ar' ? 'السيرة النبوية' : 'Prophetic Seerah' },
    { slug: 'fiqh', label: lang === 'bn' ? 'ফিকহুস সুন্নাহ' : lang === 'ar' ? 'فقه السنة' : 'Fiqh of Sunnah' },
    { slug: 'tazkiyah', label: lang === 'bn' ? 'আখলাক ও শিষ্টাচার' : lang === 'ar' ? 'الأخلاق والآداب' : 'Islamic Ethics' },
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
          badge={dict.library.badge}
          title={dict.library.title}
          subtitle={dict.library.subtitle}
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
                {dict.library.noBooksFound}
              </h3>
              <p className="text-sm text-text-muted">
                {dict.library.noBooksSubtitle}
              </p>
              <div className="pt-2">
                <Link href={`/${lang}/ebooks`}>
                  <Button variant="primary" size="sm">
                    {dict.library.clearFilters}
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
