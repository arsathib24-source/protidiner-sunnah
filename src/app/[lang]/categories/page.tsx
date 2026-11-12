import React from 'react';
import Link from 'next/link';
import { SectionHeader } from '@/components/ui/decorative';
import { CategoryCard } from '@/components/ui/category-card';

export default function CategoriesPage({
  params,
}: {
  params: { lang: string };
}) {
  const lang = params.lang || 'bn';

  const categories = [
    {
      id: 'cat-hadith',
      slug: 'hadith',
      title: 'হাদিস শরিফ',
      description: 'রাসুলুল্লাহ ﷺ-এর প্রামাণিক বাণী, সুন্নাহ এবং সাহাবায়ে কেরামের আমলের বিশুদ্ধ সংকলন।',
      bookCount: 24,
      iconName: 'hadith' as const,
    },
    {
      id: 'cat-fiqh',
      slug: 'fiqh',
      title: 'ফিকহুস সুন্নাহ',
      description: 'দৈনন্দিন পবিত্রতা, সালাত, সিয়াম ও লেনদেন সংক্রান্ত শরয়ি বিধিবিধান।',
      bookCount: 18,
      iconName: 'fiqh' as const,
    },
    {
      id: 'cat-seerah',
      slug: 'seerah',
      title: 'সিরাতুন নবী ﷺ',
      description: 'নবীজি ﷺ-এর পবিত্র জীবনচরিত্র, اخلاق এবং ঐতিহাসিক ঘটনাবলি।',
      bookCount: 15,
      iconName: 'seerah' as const,
    },
    {
      id: 'cat-duas',
      slug: 'duas',
      title: 'দোয়া ও আজকার',
      description: 'সকাল-সন্ধ্যা, বিপদ-আপদ ও বিভিন্ন মুহূর্তের জন্য মাসনুন দোয়াসমূহ।',
      bookCount: 12,
      iconName: 'dua' as const,
    },
    {
      id: 'cat-aqeedah',
      slug: 'aqeedah',
      title: 'আকিদা ও বিশ্বাস',
      description: 'আহলে সুন্নাত ওয়াল জামাআতের বিশুদ্ধ আকিদা ও তাওহিদের মূলনীতি।',
      bookCount: 9,
      iconName: 'aqeedah' as const,
    },
    {
      id: 'cat-tazkiyah',
      slug: 'tazkiyah',
      title: 'আখলাক ও আত্মশুদ্ধি',
      description: 'অন্তর পরিশুদ্ধকরণ, যুহদ এবং উত্তম আখলাক অর্জনের শিক্ষণীয় পথনির্দেশ।',
      bookCount: 14,
      iconName: 'tazkiyah' as const,
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-background bg-islamic-pattern min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 space-y-12">
        <SectionHeader
          badge="বিষয়ভিত্তিক পাঠাগার"
          title="সকল ইসলামিক বিষয় ও শাস্ত্র"
          subtitle="আপনার আগ্রহের ক্ষেত্রে নির্ভরযোগ্য ও বিশুদ্ধ গ্রন্থসমূহ সহজে খুঁজে নিন।"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              slug={cat.slug}
              title={cat.title}
              description={cat.description}
              bookCount={cat.bookCount}
              iconName={cat.iconName}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
