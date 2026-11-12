import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { Locale, SUPPORTED_LOCALES } from '@/types/i18n';
import { CLASSICAL_BOOKS } from '@/lib/data/books';
import { EbookCard } from '@/components/ui/ebook-card';
import { SectionHeader } from '@/components/ui/decorative';
import { Button } from '@/components/ui/button';

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  const lang = (params.lang || 'bn') as Locale;
  const books = CLASSICAL_BOOKS.filter((b) => b.category.slug === params.slug);
  const categoryName = books.length > 0 ? books[0].category[lang] : params.slug;

  return {
    title: `${categoryName} | Protidiner Sunnah`,
    description: `Browse verified Islamic literature in ${categoryName}.`,
    alternates: {
      canonical: `/${lang}/categories/${params.slug}`,
      languages: {
        bn: `/bn/categories/${params.slug}`,
        ar: `/ar/categories/${params.slug}`,
        en: `/en/categories/${params.slug}`,
        'x-default': `/bn/categories/${params.slug}`,
      },
    },
  };
}

export default function CategoryDetailPage({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  const lang = (params.lang || 'bn') as 'bn' | 'ar' | 'en';
  const isRTL = SUPPORTED_LOCALES[lang]?.dir === 'rtl';
  const slug = params.slug;

  const books = CLASSICAL_BOOKS.filter((b) => b.category.slug === slug);
  const categoryName = books.length > 0 ? books[0].category[lang] : slug;
  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="py-12 md:py-20 bg-background bg-islamic-pattern min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 space-y-10">
        <div>
          <Link href={`/${lang}/categories`}>
            <Button variant="ghost" size="sm" className="gap-1.5 text-primary mb-4">
              <ArrowIcon className="w-4 h-4" />
              <span>{lang === 'bn' ? 'সকল ক্যাটাগরিতে ফিরে যান' : lang === 'ar' ? 'العودة لجميع التصنيفات' : 'Back to Categories'}</span>
            </Button>
          </Link>
          <SectionHeader
            badge={lang === 'bn' ? 'বিষয়ভিত্তিক তালিকা' : lang === 'ar' ? 'تصنيف شرعي' : 'Category Collection'}
            title={categoryName}
            subtitle={
              lang === 'bn'
                ? `এই বিষয়ে মোট ${books.length} টি বিশুদ্ধ ইসলামিক কিতাব রয়েছে`
                : lang === 'ar'
                ? `يتوفر في هذا الباب ${books.length} مؤلفات إسلامية محققة`
                : `${books.length} verified titles available in this category`
            }
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
                isRTL={isRTL}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-surface rounded-3xl border border-border p-8">
            <BookOpen className="w-12 h-12 text-accent-dark mx-auto mb-3 opacity-50" />
            <h3 className="text-lg font-bold font-bengali-heading text-primary">
              {lang === 'bn' ? 'এই ক্যাটাগরিতে বর্তমানে কোনো কিতাব নেই' : lang === 'ar' ? 'لا توجد كتب متاحة في هذا القسم حاليًا' : 'No books available in this category yet'}
            </h3>
            <div className="pt-4">
              <Link href={`/${lang}/ebooks`}>
                <Button variant="primary" size="sm">
                  {lang === 'bn' ? 'সকল কিতাব ব্রাউজ করুন' : lang === 'ar' ? 'تصفح كل الكتب' : 'Browse All Books'}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
