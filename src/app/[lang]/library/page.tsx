import React from 'react';
import Link from 'next/link';
import { BookOpen, Search, Filter } from 'lucide-react';
import { CLASSICAL_BOOKS } from '@/lib/data/books';
import { EbookCard } from '@/components/ui/ebook-card';
import { SearchInput } from '@/components/ui/input';
import { SectionHeader } from '@/components/ui/decorative';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function LibraryPage({
  params,
  searchParams,
}: {
  params: { lang: string };
  searchParams?: { q?: string; category?: string };
}) {
  const lang = (params.lang || 'bn') as 'bn' | 'ar' | 'en';
  const query = (searchParams?.q || '').toLowerCase();
  const categoryFilter = searchParams?.category || 'all';

  const filteredBooks = CLASSICAL_BOOKS.filter((book) => {
    const matchesCategory =
      categoryFilter === 'all' || book.category.slug === categoryFilter;
    const matchesQuery =
      !query ||
      book.title[lang].toLowerCase().includes(query) ||
      book.author[lang].toLowerCase().includes(query) ||
      book.description[lang].toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  const categories = [
    { slug: 'all', label: 'সকল কিতাব' },
    { slug: 'hadith', label: 'হাদিস শরিফ' },
    { slug: 'duas', label: 'দোয়া ও জিকির' },
    { slug: 'aqeedah', label: 'আকিদা ও বিশ্বাস' },
    { slug: 'seerah', label: 'সিরাতুন নবী ﷺ' },
    { slug: 'fiqh', label: 'ফিকহুস সুন্নাহ' },
    { slug: 'tazkiyah', label: 'আখলাক ও শিষ্টাচার' },
  ];

  return (
    <div className="py-12 md:py-20 bg-background bg-islamic-pattern min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 space-y-12">
        {/* Page Header */}
        <SectionHeader
          badge="উন্মুক্ত ইসলামিক লাইব্রেরি"
          title="সকল প্রামাণ্য কিতাব ও হাদিস সংকলন"
          subtitle="সহিহ সনদ ও বিশ্বস্ত আলেমদের রচিত মৌলিক ইসলামিক ই-বুক সম্পূর্ণ বিনামূল্যে যেকোনো ডিভাইসে পড়ুন।"
        />

        {/* Filter & Search Bar */}
        <div className="bg-surface p-6 rounded-3xl border border-border/80 shadow-card space-y-5">
          <form method="GET" action={`/${lang}/library`} className="flex flex-col sm:flex-row gap-3">
            <SearchInput
              name="q"
              defaultValue={searchParams?.q || ''}
              placeholder="বইয়ের নাম, লেখক বা বিষয় দিয়ে অনুসন্ধান করুন..."
              className="flex-1 h-12"
            />
            <Button type="submit" variant="primary" className="h-12 px-6 gap-2">
              <Search className="w-4 h-4 text-accent" />
              <span>অনুসন্ধান</span>
            </Button>
          </form>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/50">
            <span className="text-xs font-semibold text-text-muted flex items-center gap-1.5 me-2">
              <Filter className="w-3.5 h-3.5 text-accent-dark" />
              <span>বিষয় ফিল্টার:</span>
            </span>
            {categories.map((cat) => {
              const isActive = categoryFilter === cat.slug;
              return (
                <Link
                  key={cat.slug}
                  href={`/${lang}/library?category=${cat.slug}${query ? `&q=${encodeURIComponent(query)}` : ''}`}
                >
                  <Badge
                    variant={isActive ? 'primary' : 'surface'}
                    className={`cursor-pointer transition-all ${
                      isActive ? 'border-primary' : 'hover:border-accent hover:bg-surface-muted'
                    }`}
                  >
                    {cat.label}
                  </Badge>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Books Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-semibold text-text-muted">
              মোট <strong>{filteredBooks.length}</strong> টি কিতাব প্রদর্শিত হচ্ছে
            </span>
          </div>

          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <EbookCard
                  key={book.id}
                  id={book.id}
                  slug={book.slug}
                  title={book.title[lang]}
                  author={book.author[lang]}
                  category={book.category[lang]}
                  description={book.description[lang]}
                  chapterCount={book.chapterCount}
                  readingTimeMins={book.readingTimeMins}
                  verifiedSource={book.verifiedSource}
                  lang={lang}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-surface rounded-3xl border border-border p-8">
              <BookOpen className="w-12 h-12 text-accent-dark mx-auto mb-3 opacity-50" />
              <h3 className="text-lg font-bold font-bengali-heading text-primary">
                কোনো কিতাব খুঁজে পাওয়া যায়নি
              </h3>
              <p className="text-sm text-text-muted mt-1">
                অন্য কোনো শব্দ বা বিষয়ে অনুসন্ধান করে দেখুন।
              </p>
              <Link href={`/${lang}/library`} className="inline-block mt-4">
                <Button variant="outline" size="sm">ফিল্টার মুছুন</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
