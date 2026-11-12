import React from 'react';
import Link from 'next/link';
import { BookOpen, Sparkles, ShieldCheck, Heart, ArrowRight, ArrowLeft, Smartphone, LayoutGrid } from 'lucide-react';
import { Locale, SUPPORTED_LOCALES } from '@/types/i18n';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ArabesqueDivider, SectionHeader, IslamicStarIcon } from '@/components/ui/decorative';
import { EbookCard } from '@/components/ui/ebook-card';
import { CategoryCard } from '@/components/ui/category-card';

export default async function HomePage({
  params,
}: {
  params: { lang: string };
}) {
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const isRTL = SUPPORTED_LOCALES[lang]?.dir === 'rtl';

  // Authentic Classical Placeholder Books (Strictly verified classical sources)
  const sampleBooks = [
    {
      id: 'riyad-us-saliheen',
      slug: 'riyad-us-saliheen',
      title: lang === 'bn' ? 'রিয়াদুস সলেহিন' : lang === 'ar' ? 'رياض الصالحين' : 'Riyad us-Saliheen',
      author: lang === 'bn' ? 'ইমাম আন-নববী (রহ.)' : lang === 'ar' ? 'الإمام النووي رحمه الله' : 'Imam An-Nawawi (rah.)',
      category: lang === 'bn' ? 'হাদিস সংকলন' : lang === 'ar' ? 'الحديث الشريف' : 'Hadith Collection',
      readingTimeMins: 20,
      chapterCount: 1896,
      verifiedSource: 'দারুসসালাম প্রকাশনী',
      description: lang === 'bn' 
        ? 'দৈনন্দিন জীবনে আমলযোগ্য সহিহ হাদিসের সর্বজনগ্রাহ্য এক অনুপম সংকলন।'
        : lang === 'ar'
        ? 'دليل يومي شامل يجمع أمهات الأحاديث النبوية في الآداب والأخلاق والعبادات.'
        : 'An essential compilation of authentic traditions guiding everyday conduct and morals.',
    },
    {
      id: 'hisnul-muslim',
      slug: 'hisnul-muslim',
      title: lang === 'bn' ? 'হিসনুল মুসলিম' : lang === 'ar' ? 'حصن المسلم' : 'Hisnul Muslim',
      author: lang === 'bn' ? 'সাঈদ ইবন ওয়াহফ আল-কাহত্বানী' : lang === 'ar' ? 'سعيد بن علي بن وهف القحطاني' : 'Saeed bin Ali al-Qahtani',
      category: lang === 'bn' ? 'দোয়া ও জিকির' : lang === 'ar' ? 'الأذكار والدعاء' : 'Duas & Remembrances',
      readingTimeMins: 8,
      chapterCount: 132,
      verifiedSource: 'মাকতাবাতুল মাআরিফ',
      description: lang === 'bn'
        ? 'কুরআন ও সহিহ হাদিস থেকে চয়নকৃত প্রাত্যহিক জীবনের প্রয়োজনীয় দোয়া ও জিকির।'
        : lang === 'ar'
        ? 'أذكار اليوم والليلة من القرآن والسنة الصحيحة لحصن المؤمن.'
        : 'Fortress of the Muslim: Authentic supplications and daily dhikr from Quran and Sunnah.',
    },
    {
      id: 'arbain-nawawi',
      slug: 'arbain-nawawi',
      title: lang === 'bn' ? 'চল্লিশ হাদিস (আল-আরবাঈন)' : lang === 'ar' ? 'الأربعون النووية' : 'An-Nawawi’s Forty Hadith',
      author: lang === 'bn' ? 'ইমাম আন-নববী (রহ.)' : lang === 'ar' ? 'الإمام النووي رحمه الله' : 'Imam An-Nawawi (rah.)',
      category: lang === 'bn' ? 'মৌলিক ইসলাম' : lang === 'ar' ? 'أصول الدين' : 'Foundations of Faith',
      readingTimeMins: 6,
      chapterCount: 42,
      verifiedSource: 'তাহকিককৃত মূল পাঠ',
      description: lang === 'bn'
        ? 'ইসলাম ধর্মের মৌলিক স্তম্ভ ও মূলনীতি তুলে ধরা বিয়াল্লিশটি গুরুত্বপূর্ণ সহিহ হাদিস।'
        : lang === 'ar'
        ? 'جوامع الكلم وقواعد الدين الإسلامي الأساسية في اثنين وأربعين حديثًا نبويًا.'
        : 'The forty-two pivotal prophetic statements embodying the comprehensive principles of Islam.',
    },
  ];

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20 bg-background bg-islamic-pattern">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 bg-gradient-to-b from-background via-surface-muted/30 to-background border-b border-border">
        {/* Subtle Golden Blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-accent/15 blur-3xl pointer-events-none rounded-full" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-3xl">
          <Badge variant="accent" className="mb-6 shadow-subtle">
            <IslamicStarIcon className="w-3.5 h-3.5" />
            <span>{dict.home.heroBadge}</span>
          </Badge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-bengali-heading text-primary dark:text-background tracking-tight leading-[1.2] mb-6">
            {dict.home.heroTitle}
          </h1>

          <p className="text-base sm:text-lg text-text-muted leading-relaxed mb-10 max-w-2xl mx-auto font-bengali">
            {dict.home.heroSubtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href={`/${lang}/library`}>
              <Button variant="primary" size="lg" className="gap-2.5">
                <BookOpen className="w-5 h-5" />
                <span>{dict.actions.exploreLibrary}</span>
                <ArrowIcon className="w-4 h-4" />
              </Button>
            </Link>

            <Link href={`/${lang}/design-system`}>
              <Button variant="outline" size="lg" className="gap-2">
                <LayoutGrid className="w-4 h-4 text-accent-dark" />
                <span>ডিজাইন সিস্টেম গ্যালারি</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Daily Sunnah Spotlight Card */}
      <section id="daily-sunnah" className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-primary via-primary-light to-secondary text-primary-foreground p-8 md:p-12 shadow-card-hover border-2 border-accent/40 overflow-hidden">
            {/* Background Rosette */}
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-10 translate-y-10">
              <IslamicStarIcon className="w-64 h-64 text-accent" />
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-primary-light">
              <div className="flex items-center gap-2.5 text-accent">
                <Sparkles className="w-5 h-5" />
                <span className="text-xs uppercase font-bold tracking-wider">
                  {dict.home.dailySunnahTitle}
                </span>
              </div>
              <span className="text-xs text-background/80 bg-primary-dark/70 px-3.5 py-1 rounded-full border border-accent/30 font-mono">
                {dict.home.dailySunnahSource}
              </span>
            </div>

            <blockquote className="relative z-10 text-xl sm:text-2xl md:text-3xl font-medium font-bengali-heading leading-relaxed text-background mb-6">
              {dict.home.dailySunnahText}
            </blockquote>

            <div className="relative z-10 flex items-center justify-between pt-4 text-xs text-accent-light">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-accent" />
                সহিহ সনদে বর্ণিত প্রামাণিক বাণী
              </span>
              <span className="font-semibold text-accent">Protidiner Sunnah</span>
            </div>
          </div>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 border border-primary/20">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold font-bengali-heading text-primary dark:text-background mb-2">
              ১০০% প্রামাণিক ও যাচাইকৃত
            </h3>
            <p className="text-sm text-text-muted leading-relaxed font-bengali">
              কুরআন ও সুন্নাহর আলোকে বিশুদ্ধ উৎস এবং নির্ভরযোগ্য সনদের ভিত্তিতে কিতাবসমূহ সংকলিত ও পর্যালোচিত।
            </p>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent-dark mb-4 border border-accent/30">
              <Heart className="w-6 h-6 text-accent-dark" />
            </div>
            <h3 className="text-lg font-bold font-bengali-heading text-primary dark:text-background mb-2">
              সবার জন্য সম্পূর্ণ বিনামূল্যে
            </h3>
            <p className="text-sm text-text-muted leading-relaxed font-bengali">
              কোনো সাবস্ক্রিপশন ফি বা বাণিজ্যিক বিজ্ঞাপন ছাড়াই যে কেউ যেকোনো স্থান থেকে সহজে পড়তে পারবেন।
            </p>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary mb-4 border border-secondary/25">
              <Smartphone className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-lg font-bold font-bengali-heading text-primary dark:text-background mb-2">
              আধুনিক আরামদায়ক রিডার
            </h3>
            <p className="text-sm text-text-muted leading-relaxed font-bengali">
              ফন্ট সাইজ পরিবর্তন, আইভরি-সেপিয়া-ডার্ক থিম এবং বুকমার্কিং সুবিধার সাথে চোখের জন্য আরামদায়ক পাঠ অভিজ্ঞতা।
            </p>
          </Card>
        </div>
      </section>

      {/* Featured Books Preview */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="accent" size="sm" className="mb-2">নির্বাচিত কিতাব</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold font-bengali-heading text-primary dark:text-background">
              {dict.home.featuredBooksTitle}
            </h2>
            <p className="text-sm text-text-muted mt-1 font-bengali">
              {dict.home.featuredBooksSubtitle}
            </p>
          </div>
          <Link href={`/${lang}/library`}>
            <Button variant="ghost" size="sm" className="gap-1.5 text-primary font-semibold">
              <span>{dict.home.viewAll}</span>
              <ArrowIcon className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleBooks.map((book) => (
            <EbookCard
              key={book.id}
              id={book.id}
              slug={book.slug}
              title={book.title}
              author={book.author}
              category={book.category}
              description={book.description}
              chapterCount={book.chapterCount}
              readingTimeMins={book.readingTimeMins}
              verifiedSource={book.verifiedSource}
              lang={lang}
              isRTL={isRTL}
            />
          ))}
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="বিষয়ভিত্তিক পাঠাগার"
          title={dict.home.categoriesTitle}
          subtitle={dict.home.categoriesSubtitle}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CategoryCard
            id="cat-hadith"
            slug="hadith"
            title="হাদিস শরিফ"
            description="রাসুলুল্লাহ ﷺ-এর প্রামাণিক বাণী ও সুন্নাহর বিশুদ্ধ সংকলন।"
            bookCount={24}
            iconName="hadith"
            lang={lang}
            isRTL={isRTL}
          />
          <CategoryCard
            id="cat-fiqh"
            slug="fiqh"
            title="ফিকহুস সুন্নাহ"
            description="দৈনন্দিন তাহরাত, সালাত, সিয়াম ও লেনদেন সংক্রান্ত শরয়ি বিধিবিধান।"
            bookCount={18}
            iconName="fiqh"
            lang={lang}
            isRTL={isRTL}
          />
          <CategoryCard
            id="cat-seerah"
            slug="seerah"
            title="সিরাতুন নবী ﷺ"
            description="নবীজি ﷺ-এর পবিত্র জীবনচরিত ও ঐতিহাসিক ঘটনাবলি।"
            bookCount={15}
            iconName="seerah"
            lang={lang}
            isRTL={isRTL}
          />
        </div>
      </section>
    </div>
  );
}
