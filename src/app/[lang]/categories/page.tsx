import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, SUPPORTED_LOCALES } from '@/types/i18n';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { SectionHeader } from '@/components/ui/decorative';
import { CategoryCard } from '@/components/ui/category-card';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = (params.lang || 'bn') as Locale;
  const dict = await getDictionary(lang);

  return {
    title: `${dict.nav.categories} | ${dict.brand.name}`,
    description: dict.home.categoriesSubtitle,
    alternates: {
      canonical: `/${lang}/categories`,
      languages: {
        bn: '/bn/categories',
        ar: '/ar/categories',
        en: '/en/categories',
        'x-default': '/bn/categories',
      },
    },
    openGraph: {
      title: `${dict.nav.categories} - ${dict.brand.name}`,
      description: dict.home.categoriesSubtitle,
      locale: lang === 'bn' ? 'bn_BD' : lang === 'ar' ? 'ar_SA' : 'en_US',
    },
  };
}

export default async function CategoriesPage({
  params,
}: {
  params: { lang: string };
}) {
  const lang = (params.lang || 'bn') as 'bn' | 'ar' | 'en';
  const dict = await getDictionary(lang);
  const isRTL = SUPPORTED_LOCALES[lang]?.dir === 'rtl';

  const categories = [
    {
      id: 'cat-hadith',
      slug: 'hadith',
      title: lang === 'bn' ? 'হাদিস শরিফ' : lang === 'ar' ? 'الحديث الشريف والسنة' : 'Hadith & Sunnah',
      description: lang === 'bn' ? 'রাসুলুল্লাহ ﷺ-এর প্রামাণিক বাণী, সুন্নাহ এবং সাহাবায়ে কেরামের আমলের বিশুদ্ধ সংকলন।' : lang === 'ar' ? 'الأحاديث النبوية الصحيحة الموثقة وسنن المصطفى ﷺ.' : 'Authentic collections of the Prophet’s sayings and traditions.',
      bookCount: 24,
      iconName: 'hadith' as const,
    },
    {
      id: 'cat-fiqh',
      slug: 'fiqh',
      title: lang === 'bn' ? 'ফিকহুস সুন্নাহ' : lang === 'ar' ? 'فقه السنة النبوية' : 'Fiqh of Sunnah',
      description: lang === 'bn' ? 'দৈনন্দিন পবিত্রতা, সালাত, সিয়াম ও লেনদেন সংক্রান্ত শরয়ি বিধিবিধান।' : lang === 'ar' ? 'أحكام العبادات والمعاملات الفقهية المبنية على الدليل الصحيح.' : 'Jurisprudential rulings for daily worship and transactions.',
      bookCount: 18,
      iconName: 'fiqh' as const,
    },
    {
      id: 'cat-seerah',
      slug: 'seerah',
      title: lang === 'bn' ? 'সিরাতুন নবী ﷺ' : lang === 'ar' ? 'السيرة النبوية والشمائل' : 'Prophetic Seerah',
      description: lang === 'bn' ? 'নবীজি ﷺ-এর পবিত্র জীবনচরিত্র, اخلاق এবং ঐতিহাসিক ঘটনাবলি।' : lang === 'ar' ? 'سيرة المصطفى ﷺ وخصائصه وأخلاقه الشريفة العطرة.' : 'The sacred biography, character, and battles of Prophet Muhammad ﷺ.',
      bookCount: 15,
      iconName: 'seerah' as const,
    },
    {
      id: 'cat-duas',
      slug: 'duas',
      title: lang === 'bn' ? 'দোয়া ও আজকার' : lang === 'ar' ? 'الأدعية والأذكار المأثورة' : 'Duas & Adhkar',
      description: lang === 'bn' ? 'সকাল-সন্ধ্যা, বিপদ-আপদ ও বিভিন্ন মুহূর্তের জন্য মাসনুন দোয়াসমূহ।' : lang === 'ar' ? 'أدعية الصباح والمساء والتحصينات النبوية الصحيحة.' : 'Daily authentic supplications and remembrances of Allah.',
      bookCount: 12,
      iconName: 'dua' as const,
    },
    {
      id: 'cat-aqeedah',
      slug: 'aqeedah',
      title: lang === 'bn' ? 'আকিদা ও বিশ্বাস' : lang === 'ar' ? 'العقيدة الإسلامية والتوحيد' : 'Islamic Creed & Tawhid',
      description: lang === 'bn' ? 'আহলে সুন্নাত ওয়াল জামাআতের বিশুদ্ধ আকিদা ও তাওহিদের মূলনীতি।' : lang === 'ar' ? 'أصول التوحيد والإيمان الصافي على منهج أهل السنة والجماعة.' : 'Foundations of authentic faith, Tawhid, and Sunni creed.',
      bookCount: 9,
      iconName: 'aqeedah' as const,
    },
    {
      id: 'cat-tazkiyah',
      slug: 'tazkiyah',
      title: lang === 'bn' ? 'আখলাক ও আত্মশুদ্ধি' : lang === 'ar' ? 'تزكية النفوس والأخلاق' : 'Islamic Ethics & Purification',
      description: lang === 'bn' ? 'অন্তর পরিশুদ্ধকরণ, যুহদ এবং উত্তম আখলাক অর্জনের শিক্ষণীয় পথনির্দেশ।' : lang === 'ar' ? 'إصلاح القلوب ومكارم الأخلاق النبوية والآداب الشرعية.' : 'Purification of the heart, asceticism, and noble prophetic manners.',
      bookCount: 14,
      iconName: 'tazkiyah' as const,
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-background bg-islamic-pattern min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 space-y-12">
        <SectionHeader
          badge={lang === 'bn' ? 'বিষয়ভিত্তিক পাঠাগার' : lang === 'ar' ? 'أقسام المكتبة' : 'Browse by Category'}
          title={dict.home.categoriesTitle}
          subtitle={dict.home.categoriesSubtitle}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.slug}
              id={cat.id}
              slug={cat.slug}
              title={cat.title}
              description={cat.description}
              bookCount={cat.bookCount}
              iconName={cat.iconName}
              lang={lang}
              isRTL={isRTL}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
