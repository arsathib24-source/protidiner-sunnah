import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Bookmark, BookOpen } from 'lucide-react';
import { Locale, SUPPORTED_LOCALES } from '@/types/i18n';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { SectionHeader } from '@/components/ui/decorative';
import { Button } from '@/components/ui/button';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = (params.lang || 'bn') as Locale;
  const dict = await getDictionary(lang);

  return {
    title: `${dict.nav.bookmarks} | ${dict.brand.name}`,
    description: 'Saved bookmarks and personal notes in Protidiner Sunnah.',
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
  const dict = await getDictionary(lang);

  return (
    <div className="py-12 md:py-20 bg-background bg-islamic-pattern min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 space-y-10 max-w-4xl">
        <SectionHeader
          badge={lang === 'bn' ? 'সংরক্ষিত সংগ্রহশালা' : lang === 'ar' ? 'المحفوظات الشخصية' : 'Personal Saved Collection'}
          title={lang === 'bn' ? 'আপনার সংরক্ষিত বুকমার্ক ও নোট' : lang === 'ar' ? 'الإشارات المرجعية والملاحظات' : 'Your Bookmarks & Notes'}
          subtitle={
            lang === 'bn'
              ? 'পড়ার সময় সংরক্ষিত প্রিয় আয়াত, হাদিস ও গুরুত্বপূর্ণ অনুচ্ছেদসমূহ এখানে তালিকাভুক্ত থাকে।'
              : lang === 'ar'
              ? 'الآيات والأحاديث والفوائد الإيمانية التي قمت بحفظها أثناء القراءة للرجوع إليها سريعًا.'
              : 'Verses, Hadiths, and scholarly quotes you have saved during reading are organized here.'
          }
        />

        <div className="text-center py-20 bg-surface rounded-3xl border border-border/80 shadow-card p-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-accent/15 text-accent-dark flex items-center justify-center mx-auto">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold font-bengali-heading text-primary">
            {lang === 'bn' ? 'বর্তমানে কোনো বুকমার্ক সংরক্ষিত নেই' : lang === 'ar' ? 'لا توجد إشارات مرجعية محفوظة حاليًا' : 'No Bookmarks Saved Yet'}
          </h3>
          <p className="text-sm text-text-muted max-w-md mx-auto">
            {lang === 'bn'
              ? 'যেকোনো কিতাব পড়ার সময় ডানপাশের বুকমার্ক রিবনে ক্লিক করে আপনার গুরুত্বপূর্ণ অংশগুলো এখানে সহজে সংরক্ষণ করে রাখতে পারেন।'
              : lang === 'ar'
              ? 'أثناء تصفح الكتب وقراءتها، اضغط على زر الإشارة المرجعية لحفظ الفقرة التي وصلت إليها بسهولة.'
              : 'While reading any ebook, click the bookmark icon next to any paragraph to save your favorite passages here.'}
          </p>
          <div className="pt-2">
            <Link href={`/${lang}/ebooks`}>
              <Button variant="primary" size="md">
                <BookOpen className="w-4 h-4 me-2" />
                <span>{lang === 'bn' ? 'লাইব্রেরিতে বই খুঁজুন' : lang === 'ar' ? 'تصفح المكتبة' : 'Browse Ebook Library'}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
