import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, Sparkles, ShieldCheck, Heart, ArrowRight, ArrowLeft, 
  Smartphone, Search, Layers, CheckCircle2, Star, Clock, Users,
  BookMarked, ScrollText
} from 'lucide-react';
import { Locale, SUPPORTED_LOCALES } from '@/types/i18n';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { CLASSICAL_BOOKS } from '@/lib/data/books';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { SectionHeader, ArabesqueDivider, IslamicStarIcon } from '@/components/ui/decorative';
import { EbookCard } from '@/components/ui/ebook-card';
import { CategoryCard } from '@/components/ui/category-card';
import { HomeSearch } from '@/components/home/home-search';
import { TodaysSunnah } from '@/components/home/todays-sunnah';

export default async function HomePage({
  params,
}: {
  params: { lang: string };
}) {
  const lang = (params.lang || 'bn') as 'bn' | 'ar' | 'en';
  const dict = await getDictionary(lang);
  const isRTL = SUPPORTED_LOCALES[lang]?.dir === 'rtl';

  const featuredBooks = CLASSICAL_BOOKS.filter((b) => b.isFeatured);
  const popularBooks = CLASSICAL_BOOKS.filter((b) => b.isPopular);
  const recentBooks = CLASSICAL_BOOKS.filter((b) => b.isRecent);

  const categories = [
    { slug: 'hadith', title: 'হাদিস শরিফ', description: 'রাসুলুল্লাহ ﷺ-এর প্রামাণিক বাণী ও সুন্নাহর বিশুদ্ধ সংকলন।', bookCount: 24, iconName: 'hadith' as const },
    { slug: 'fiqh', title: 'ফিকহুস সুন্নাহ', description: 'দৈনন্দিন তাহরাত, সালাত, সিয়াম ও লেনদেন সংক্রান্ত শরয়ি বিধিবিধান।', bookCount: 18, iconName: 'fiqh' as const },
    { slug: 'seerah', title: 'সিরাতুন নবী ﷺ', description: 'নবীজি ﷺ-এর পবিত্র জীবনচরিত ও ঐতিহাসিক ঘটনাবলি।', bookCount: 15, iconName: 'seerah' as const },
    { slug: 'duas', title: 'দোয়া ও আজকার', description: 'সকাল-সন্ধ্যা, বিপদ-আপদ ও বিভিন্ন মুহূর্তের জন্য মাসনুন দোয়াসমূহ।', bookCount: 12, iconName: 'dua' as const },
    { slug: 'aqeedah', title: 'আকিদা ও বিশ্বাস', description: 'আহলে সুন্নাত ওয়াল জামাআতের বিশুদ্ধ আকিদা ও তাওহিদের মূলনীতি।', bookCount: 9, iconName: 'aqeedah' as const },
    { slug: 'tazkiyah', title: 'আখলাক ও শিষ্টাচার', description: 'অন্তর পরিশুদ্ধকরণ, যুহদ এবং উত্তম চরিত্র অর্জনের শিক্ষণীয় গ্রন্থ।', bookCount: 14, iconName: 'tazkiyah' as const },
  ];

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20 bg-background bg-islamic-pattern">
      {/* 3. PREMIUM HERO SECTION */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 bg-gradient-to-b from-background via-surface-muted/30 to-background border-b border-border">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-accent/15 blur-3xl pointer-events-none rounded-full" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-3xl">
          <Badge variant="accent" className="mb-6 shadow-subtle">
            <IslamicStarIcon className="w-3.5 h-3.5" />
            <span>ফ্রি ও উন্মুক্ত ইসলামিক পাঠাগার</span>
          </Badge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-bengali-heading text-primary dark:text-background tracking-tight leading-[1.2] mb-6">
            সুন্নাহর আলোয় আলোকিত হোক প্রতিটি দিন
          </h1>

          <p className="text-base sm:text-lg text-text-muted leading-relaxed mb-10 max-w-2xl mx-auto font-bengali">
            রাসুলুল্লাহ ﷺ-এর দৈনন্দিন জীবনের সুন্নাহ জানুন, পড়ুন এবং নির্ভরযোগ্য জ্ঞান অর্জনের মাধ্যমে নিজের জীবনকে সাজান।
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href={`/${lang}/ebooks`}>
              <Button variant="primary" size="lg" className="gap-2.5 font-bengali-heading font-bold shadow-card">
                <BookOpen className="w-5 h-5 text-accent" />
                <span>ইবুক পড়ুন</span>
                <ArrowIcon className="w-4 h-4" />
              </Button>
            </Link>

            <a href="#search-section">
              <Button variant="accent" size="lg" className="gap-2 font-bengali-heading font-bold shadow-gold">
                <Search className="w-4 h-4" />
                <span>সুন্নাহ খুঁজুন</span>
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-8 border-t border-border/60 text-xs text-text-muted">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-accent-dark" />
              <span>১০০% যাচাইকৃত ও প্রামাণ্য উৎস</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Heart className="w-4 h-4 text-accent-dark" />
              <span>সবার জন্য আজীবন সম্পূর্ণ ফ্রি</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Smartphone className="w-4 h-4 text-accent-dark" />
              <span>মোবাইল ও পিসিতে আরামদায়ক রিডার</span>
            </span>
          </div>
        </div>
      </section>

      {/* 4. SEARCH BAR SECTION */}
      <section className="container mx-auto px-4 sm:px-6">
        <HomeSearch locale={lang} isRTL={isRTL} />
      </section>

      {/* 5. FEATURED EBOOKS */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="accent" size="sm" className="mb-2">নির্বাচিত কিতাব</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold font-bengali-heading text-primary dark:text-background">
              নির্বাচিত ও মৌলিক গ্রন্থাবলি
            </h2>
            <p className="text-sm text-text-muted mt-1 font-bengali">
              ইসলামের মৌলিক স্তম্ভ ও প্রাত্যহিক সুন্নাহ চর্চার প্রধানতম নির্ভরযোগ্য সংকলন
            </p>
          </div>
          <Link href={`/${lang}/ebooks`}>
            <Button variant="ghost" size="sm" className="gap-1.5 text-primary font-semibold">
              <span>সকল কিতাব দেখুন</span>
              <ArrowIcon className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBooks.map((book) => (
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
      </section>

      {/* 6. BROWSE CATEGORIES */}
      <section className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="বিষয়ভিত্তিক পাঠাগার"
          title="ইসলামের মৌলিক বিষয়সমূহ"
          subtitle="হাদিস, ফিকহ, সিরাত ও দোয়ার মতো গুরুত্বপূর্ণ শাখাসমূহে সহজে গ্রন্থ অনুসন্ধান করুন"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.slug}
              id={cat.slug}
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
      </section>

      {/* 7. TODAY'S SUNNAH */}
      <section className="container mx-auto px-4 sm:px-6">
        <TodaysSunnah locale={lang} />
      </section>

      {/* 8. POPULAR EBOOKS */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="accent" size="sm" className="mb-2">সর্বাধিক পঠিত</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold font-bengali-heading text-primary dark:text-background">
              জনপ্রিয় কিতাবসমূহ
            </h2>
            <p className="text-sm text-text-muted mt-1 font-bengali">
              পাঠক সমাজে সর্বাধিক সমাদৃত ও পঠিত প্রামাণ্য ইসলামিক সাহিত্য
            </p>
          </div>
          <Link href={`/${lang}/ebooks?sort=popular`}>
            <Button variant="ghost" size="sm" className="gap-1.5 text-primary font-semibold">
              <span>সব দেখুন</span>
              <ArrowIcon className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularBooks.slice(0, 4).map((book) => (
            <EbookCard
              key={book.id}
              id={book.id}
              slug={book.slug}
              title={book.title[lang]}
              author={book.author[lang]}
              category={book.category[lang]}
              chapterCount={book.chapterCount}
              readingTimeMins={book.readingTimeMins}
              verifiedSource={book.verifiedSource}
              lang={lang}
              isRTL={isRTL}
            />
          ))}
        </div>
      </section>

      {/* 9. RECENTLY ADDED EBOOKS */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="primary" size="sm" className="mb-2">নতুন সংযোজন</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold font-bengali-heading text-primary dark:text-background">
              সম্প্রতি যুক্ত হওয়া কিতাব
            </h2>
            <p className="text-sm text-text-muted mt-1 font-bengali">
              যাচাই-বাছাই সম্পন্ন হওয়ার পর লাইব্রেরিতে অন্তর্ভুক্ত হওয়া সর্বশেষ কিতাবসমূহ
            </p>
          </div>
          <Link href={`/${lang}/ebooks?sort=newest`}>
            <Button variant="ghost" size="sm" className="gap-1.5 text-primary font-semibold">
              <span>লাইব্রেরি দেখুন</span>
              <ArrowIcon className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {recentBooks.map((book) => (
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
              layout="horizontal"
              lang={lang}
              isRTL={isRTL}
            />
          ))}
        </div>
      </section>

      {/* 10. ABOUT PROTIDINER SUNNAH */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-surface border border-border/80 shadow-card p-8 sm:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <Badge variant="accent">আমাদের লক্ষ্য ও নীতি</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold font-bengali-heading text-primary leading-tight">
                প্রতিদিনের সুন্নাহ সম্পর্কে
              </h2>
              <p className="text-base text-text-muted leading-relaxed font-bengali">
                <strong>প্রতিদিনের সুন্নাহ</strong> একটি অলাভজনক ও উন্মুক্ত দ্বীনি উদ্যোগ। আমাদের মূল উদ্দেশ্য হলো রাসুলুল্লাহ ﷺ-এর জীবন, বিশুদ্ধ সুন্নাহ এবং সালাফদের প্রামাণ্য কিতাবসমূহকে বাংলা, আরবি ও ইংরেজি ভাষায় সকলের কাছে সম্পূর্ণ বিনামূল্যে পৌঁছে দেওয়া।
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 text-accent-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary">সনদ ও সূত্র কঠোরভাবে পরীক্ষিত</h4>
                    <p className="text-xs text-text-muted mt-0.5">কোনো জাল, বানোয়াট বা ভিত্তিহীন হাদিস আমাদের প্ল্যাটফর্মে স্থান পায় না।</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 text-accent-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary">কোনো প্রকার বাণিজ্যিক বিজ্ঞাপন নেই</h4>
                    <p className="text-xs text-text-muted mt-0.5">পড়ার সময় মনোযোগ অক্ষুণ্ণ রাখতে সম্পূর্ণ বিজ্ঞাপনমুক্ত ও পরিচ্ছন্ন পাঠ অভিজ্ঞতা।</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 text-accent-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary">যেকোনো ডিভাইসে চোখের জন্য আরামদায়ক</h4>
                    <p className="text-xs text-text-muted mt-0.5">আইভরি, সেপিয়া এবং ডার্ক মোডের সাথে সুবিধাজনক ফন্ট পরিবর্তন অপশন।</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link href={`/${lang}/ebooks`}>
                  <Button variant="primary" size="md">
                    <span>লাইব্রেরি এক্সপ্লোর করুন</span>
                    <ArrowIcon className="w-4 h-4 ms-2" />
                  </Button>
                </Link>
                <Link href={`/${lang}/design-system`}>
                  <Button variant="outline" size="md">
                    <span>ডিজাইন সিস্টেম দেখুন</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Decorative Card Illustration */}
            <div className="relative">
              <div className="rounded-2xl bg-gradient-to-br from-primary via-primary-light to-secondary p-8 text-primary-foreground border-2 border-accent/40 shadow-card-hover space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-primary-light">
                  <IslamicStarIcon className="w-8 h-8 text-accent" />
                  <span className="text-xs font-mono text-accent">EST. 2026</span>
                </div>
                <div className="space-y-3">
                  <span className="text-xs text-accent-light uppercase tracking-widest font-bold">
                    আমাদের স্লোগান
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-bengali-heading text-background leading-tight">
                    «রাসুলুল্লাহ ﷺ-এর আদর্শে প্রতিদিন»
                  </h3>
                  <p className="text-sm text-background/85 leading-relaxed font-bengali pt-2">
                    «তোমাদের মাঝে আমি দুটি জিনিস রেখে যাচ্ছি; যতক্ষণ তোমরা এ দুটিকে আঁকড়ে ধরে রাখবে, ততক্ষণ কখনো পথভ্রষ্ট হবে না: আল্লাহর কিতাব এবং তাঁর রাসুলের সুন্নাহ।»
                  </p>
                  <span className="text-xs text-accent-light block pt-1">[মুয়াত্তা ইমাম মালিক: ৩৩৩৮]</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
