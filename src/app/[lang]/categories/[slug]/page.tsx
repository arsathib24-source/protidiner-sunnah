import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { CLASSICAL_BOOKS } from '@/lib/data/books';
import { EbookCard } from '@/components/ui/ebook-card';
import { SectionHeader } from '@/components/ui/decorative';
import { Button } from '@/components/ui/button';

export default function CategoryDetailPage({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  const lang = (params.lang || 'bn') as 'bn' | 'ar' | 'en';
  const slug = params.slug;

  const books = CLASSICAL_BOOKS.filter((b) => b.category.slug === slug);
  const categoryName = books.length > 0 ? books[0].category[lang] : slug;

  return (
    <div className="py-12 md:py-20 bg-background bg-islamic-pattern min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 space-y-10">
        <div>
          <Link href={`/${lang}/categories`}>
            <Button variant="ghost" size="sm" className="gap-1.5 text-primary mb-4">
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>সকল ক্যাটাগরিতে ফিরে যান</span>
            </Button>
          </Link>
          <SectionHeader
            badge="বিষয়ভিত্তিক তালিকা"
            title={categoryName}
            subtitle={`এই বিষয়ে মোট ${books.length} টি বিশুদ্ধ ইসলামিক কিতাব রয়েছে`}
          />
        </div>

        {books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
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
              এই ক্যাটাগরিতে বর্তমানে কোনো কিতাব নেই
            </h3>
            <Link href={`/${lang}/library`} className="inline-block mt-4">
              <Button variant="primary" size="sm">সম্পূর্ণ লাইব্রেরি দেখুন</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
