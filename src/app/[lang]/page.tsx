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
    {
      slug: 'hadith',
      title: lang === 'bn' ? 'হাদিস শরিফ' : lang === 'ar' ? 'الحديث الشريف' : 'Hadith Collections',
      description: lang === 'bn' ? 'রাসুলুল্লাহ ﷺ-এর প্রামাণিক বাণী ও সুন্নাহর বিশুদ্ধ সংকলন।' : lang === 'ar' ? 'الأحاديث النبوية الصحيحة والسنن المعتمدة.' : 'Authentic collections of the Prophet’s sayings and traditions.',
      bookCount: 24,
      iconName: 'hadith' as const,
    },
    {
      slug: 'fiqh',
      title: lang === 'bn' ? 'ফিকহুস সুন্নাহ' : lang === 'ar' ? 'فقه السنة' : 'Fiqh of Sunnah',
      description: lang === 'bn' ? 'দৈনন্দিন তাহরাত, সালাত, সিয়াম ও লেনদেন সংক্রান্ত শরয়ি বিধিবিধান।' : lang === 'ar' ? 'الأحكام الشرعية في العبادات والمعاملات اليومية.' : 'Jurisprudential rulings for daily worship and transactions.',
      bookCount: 18,
      iconName: 'fiqh' as const,
    },
    {
      slug: 'seerah',
      title: lang === 'bn' ? 'সিরাতুন নবী ﷺ' : lang === 'ar' ? 'السيرة النبوية' : 'Prophetic Seerah',
      description: lang === 'bn' ? 'নবীজি ﷺ-এর পবিত্র জীবনচরিত ও ঐতিহাসিক ঘটনাবলি।' : lang === 'ar' ? 'سيرة المصطفى ﷺ وأخلاقه وشمائله العطرة.' : 'The sacred biography and sublime character of the Prophet ﷺ.',
      bookCount: 15,
      iconName: 'seerah' as const,
    },
    {
      slug: 'duas',
      title: lang === 'bn' ? 'দোয়া ও আজকার' : lang === 'ar' ? 'الأدعية والأذكار' : 'Duas & Adhkar',
      description: lang === 'bn' ? 'সকাল-সন্ধ্যা, বিপদ-আপদ ও বিভিন্ন মুহূর্তের জন্য মাসনুন দোয়াসমূহ।' : lang === 'ar' ? 'أدعية الصباح والمساء والتحصينات النبوية المأثورة.' : 'Daily supplications and remembrances of Allah.',
      bookCount: 12,
      iconName: 'dua' as const,
    },
    {
      slug: 'aqeedah',
      title: lang === 'bn' ? 'আকিদা ও বিশ্বাস' : lang === 'ar' ? 'العقيدة الإسلامية' : 'Islamic Creed',
      description: lang === 'bn' ? 'আহলে সুন্নাত ওয়াল জামাআতের বিশুদ্ধ আকিদা ও তাওহিদের মূলনীতি।' : lang === 'ar' ? 'أصول الإيمان والتوحيد الخالص على منهج السلف.' : 'Foundations of authentic faith, Tawhid, and Sunni creed.',
      bookCount: 9,
      iconName: 'aqeedah' as const,
    },
    {
      slug: 'tazkiyah',
      title: lang === 'bn' ? 'আখলাক ও শিষ্টাচার' : lang === 'ar' ? 'الأخلاق والآداب' : 'Islamic Ethics',
      description: lang === 'bn' ? 'অন্তর পরিশুদ্ধকরণ, যুহদ এবং উত্তম চরিত্র অর্জনের শিক্ষণীয় গ্রন্থ।' : lang === 'ar' ? 'تزكية النفوس ومكارم الأخلاق والآداب الإسلامية.' : 'Purification of the soul, asceticism, and noble character.',
      bookCount: 14,
      iconName: 'tazkiyah' as const,
    },
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
            <span>{dict.hero.badge}</span>
          </Badge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-bengali-heading text-primary dark:text-background tracking-tight leading-[1.2] mb-6">
            {dict.hero.title}
          </h1>

          <p className="text-base sm:text-lg text-text-muted leading-relaxed mb-10 max-w-2xl mx-auto">
            {dict.hero.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href={`/${lang}/ebooks`}>
              <Button variant="primary" size="lg" className="gap-2.5 font-bengali-heading font-bold shadow-card">
                <BookOpen className="w-5 h-5 text-accent" />
                <span>{dict.hero.readEbooks}</span>
                <ArrowIcon className="w-4 h-4" />
              </Button>
            </Link>

            <a href="#search-section">
              <Button variant="accent" size="lg" className="gap-2 font-bengali-heading font-bold shadow-gold">
                <Search className="w-4 h-4" />
                <span>{dict.hero.searchSunnah}</span>
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-8 border-t border-border/60 text-xs text-text-muted">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-accent-dark" />
              <span>
                {lang === 'bn' ? '১০০% যাচাইকৃত ও প্রামাণ্য উৎস' : lang === 'ar' ? 'مصادر موثقة ومحققة 100%' : '100% Verified Classical Sources'}
              </span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Heart className="w-4 h-4 text-accent-dark" />
              <span>
                {lang === 'bn' ? 'সবার জন্য আজীবন সম্পূর্ণ ফ্রি' : lang === 'ar' ? 'مجاني بالكامل للجميع دائمًا' : '100% Free Forever for Everyone'}
              </span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Smartphone className="w-4 h-4 text-accent-dark" />
              <span>
                {lang === 'bn' ? 'মোবাইল ও পিসিতে আরামদায়ক রিডার' : lang === 'ar' ? 'قارئ إلكتروني مريح على الجوال والحاسوب' : 'Comfortable Reader on Mobile & PC'}
              </span>
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
            <Badge variant="accent" size="sm" className="mb-2">
              {lang === 'bn' ? 'নির্বাচিত কিতাব' : lang === 'ar' ? 'كتب مختارة' : 'Featured Books'}
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold font-bengali-heading text-primary dark:text-background">
              {dict.home.featuredBooksTitle}
            </h2>
            <p className="text-sm text-text-muted mt-1">
              {dict.home.featuredBooksSubtitle}
            </p>
          </div>
          <Link href={`/${lang}/ebooks`}>
            <Button variant="ghost" size="sm" className="gap-1.5 text-primary font-semibold">
              <span>{lang === 'bn' ? 'সকল কিতাব দেখুন' : lang === 'ar' ? 'عرض جميع الكتب' : 'View All Books'}</span>
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
              totalCompiledChapters={book.totalCompiledChapters}
              status={book.status}
              licenseLabel={lang === 'bn' ? book.license?.labelBn : book.license?.labelEn}
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
          badge={lang === 'bn' ? 'বিষয়ভিত্তিক পাঠাগার' : lang === 'ar' ? 'أقسام المكتبة' : 'Browse by Category'}
          title={dict.home.categoriesTitle}
          subtitle={dict.home.categoriesSubtitle}
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
            <Badge variant="accent" size="sm" className="mb-2">
              {lang === 'bn' ? 'সর্বাধিক পঠিত' : lang === 'ar' ? 'الأكثر قراءة' : 'Most Popular'}
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold font-bengali-heading text-primary dark:text-background">
              {dict.home.popularBooksTitle}
            </h2>
            <p className="text-sm text-text-muted mt-1">
              {dict.home.popularBooksSubtitle}
            </p>
          </div>
          <Link href={`/${lang}/ebooks?sort=popular`}>
            <Button variant="ghost" size="sm" className="gap-1.5 text-primary font-semibold">
              <span>{dict.home.viewAll}</span>
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
              totalCompiledChapters={book.totalCompiledChapters}
              status={book.status}
              licenseLabel={lang === 'bn' ? book.license?.labelBn : book.license?.labelEn}
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
            <Badge variant="primary" size="sm" className="mb-2">
              {lang === 'bn' ? 'নতুন সংযোজন' : lang === 'ar' ? 'أحدث الإضافات' : 'Recently Added'}
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold font-bengali-heading text-primary dark:text-background">
              {dict.home.recentBooksTitle}
            </h2>
            <p className="text-sm text-text-muted mt-1">
              {dict.home.recentBooksSubtitle}
            </p>
          </div>
          <Link href={`/${lang}/ebooks?sort=newest`}>
            <Button variant="ghost" size="sm" className="gap-1.5 text-primary font-semibold">
              <span>{lang === 'bn' ? 'লাইব্রেরি দেখুন' : lang === 'ar' ? 'تصفح المكتبة' : 'Browse Library'}</span>
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
              totalCompiledChapters={book.totalCompiledChapters}
              status={book.status}
              licenseLabel={lang === 'bn' ? book.license?.labelBn : book.license?.labelEn}
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
              <Badge variant="accent">
                {lang === 'bn' ? 'আমাদের লক্ষ্য ও নীতি' : lang === 'ar' ? 'رؤيتنا ورسالتنا' : 'Our Mission & Ethics'}
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold font-bengali-heading text-primary leading-tight">
                {lang === 'bn' ? 'প্রতিদিনের সুন্নাহ সম্পর্কে' : lang === 'ar' ? 'عن مشروع سُنَّةُ كُلِّ يَوْم' : 'About Daily Sunnah'}
              </h2>
              <p className="text-base text-text-muted leading-relaxed">
                {lang === 'bn' ? (
                  <>
                    <strong>প্রতিদিনের সুন্নাহ</strong> একটি অলাভজনক ও উন্মুক্ত দ্বীনি উদ্যোগ। আমাদের মূল উদ্দেশ্য হলো রাসুলুল্লাহ ﷺ-এর জীবন, বিশুদ্ধ সুন্নাহ এবং সালাফদের প্রামাণ্য কিতাবসমূহকে বাংলা, আরবি ও ইংরেজি ভাষায় সকলের কাছে সম্পূর্ণ বিনামূল্যে পৌঁছে দেওয়া।
                  </>
                ) : lang === 'ar' ? (
                  <>
                    <strong>سنة كل يوم</strong> مبادرة إسلامية غير ربحية مفتوحة تهدف إلى تقريب السنة النبوية الصحيحة وكتب التراث المعتمدة للمسلمين باللغات العربية والبنغالية والإنجليزية مجانًا بالكامل.
                  </>
                ) : (
                  <>
                    <strong>Daily Sunnah</strong> is an open-access, non-profit educational initiative dedicated to providing authentic prophetic traditions and classical Islamic literature free forever across Bengali, Arabic, and English.
                  </>
                )}
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 text-accent-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary">
                      {lang === 'bn' ? 'সনদ ও সূত্র কঠোরভাবে পরীক্ষিত' : lang === 'ar' ? 'أسانيد ونصوص محققة بدقة' : 'Strictly Verified Chains and Sources'}
                    </h4>
                    <p className="text-xs text-text-muted mt-0.5">
                      {lang === 'bn' ? 'কোনো জাল, বানোয়াট বা ভিত্তিহীন হাদিস আমাদের প্ল্যাটফর্মে স্থান পায় না।' : lang === 'ar' ? 'لا ننشر أي نصوص موضوعة أو أحاديث ضعيفة دون بيان حكمها.' : 'No fabricated or unverified traditions are published on this platform.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 text-accent-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary">
                      {lang === 'bn' ? 'কোনো প্রকার বাণিজ্যিক বিজ্ঞাপন নেই' : lang === 'ar' ? 'خالٍ تمامًا من الإعلانات التجارية' : '100% Ad-Free Reading Experience'}
                    </h4>
                    <p className="text-xs text-text-muted mt-0.5">
                      {lang === 'bn' ? 'পড়ার সময় মনোযোগ অক্ষুণ্ণ রাখতে সম্পূর্ণ বিজ্ঞাপনমুক্ত ও পরিচ্ছন্ন পাঠ অভিজ্ঞতা।' : lang === 'ar' ? 'تجربة قراءة إلكترونية نقية ومريحة تحترم خصوصية القارئ وتركيزه.' : 'Clean, distraction-free typography designed for focused study.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 text-accent-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary">
                      {lang === 'bn' ? 'যেকোনো ডিভাইসে চোখের জন্য আরামদায়ক' : lang === 'ar' ? 'تجربة مريحة للعين على كافة الشاشات' : 'Accessible, Reader-First Interface'}
                    </h4>
                    <p className="text-xs text-text-muted mt-0.5">
                      {lang === 'bn' ? 'আইভরি, সেপিয়া এবং ডার্ক মোডের সাথে সুবিধাজনক ফন্ট পরিবর্তন অপশন।' : lang === 'ar' ? 'خطوط عربية عريقة مع سمات العاجي والبني والفحمي للقراءة الممتعة.' : 'Custom Arabic and Bengali fonts with Ivory, Sepia, and Charcoal themes.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link href={`/${lang}/ebooks`}>
                  <Button variant="primary" size="md">
                    <span>{lang === 'bn' ? 'লাইব্রেরি এক্সপ্লোর করুন' : lang === 'ar' ? 'استكشف المكتبة' : 'Explore Library'}</span>
                    <ArrowIcon className="w-4 h-4 ms-2" />
                  </Button>
                </Link>
                <Link href={`/${lang}/hadith`}>
                  <Button variant="outline" size="md">
                    <span>{lang === 'bn' ? 'সহিহ হাদিস সংকলন' : lang === 'ar' ? 'موسوعة الحديث' : 'Hadith Collections'}</span>
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
                    {lang === 'bn' ? 'আমাদের স্লোগান' : lang === 'ar' ? 'شعارنا المبارك' : 'Our Motto'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-bengali-heading text-background leading-tight">
                    {dict.brand.tagline}
                  </h3>
                  <p className="text-sm text-background/85 leading-relaxed pt-2">
                    {lang === 'bn'
                      ? '«তোমাদের মাঝে আমি দুটি জিনিস রেখে যাচ্ছি; যতক্ষণ তোমরা এ দুটিকে আঁকড়ে ধরে রাখবে, ততক্ষণ কখনো পথভ্রষ্ট হবে না: আল্লাহর কিতাব এবং তাঁর রাসুলের সুন্নাহ।»'
                      : lang === 'ar'
                      ? '«تَرَكْتُ فِيكُمْ أَمْرَيْنِ لَنْ تَضِلُّوا مَا تَمَسَّكْتُمْ بِهِمَا: كِتَابَ اللَّهِ وَسُنَّةَ نَبِيِّهِ»'
                      : '«I have left among you two matters which if you adhere to, you will never go astray: the Book of Allah and the Sunnah of His Prophet.»'}
                  </p>
                  <span className="text-xs text-accent-light block pt-1">
                    {lang === 'bn' ? '[মুয়াত্তা ইমাম মালিক: ৩৩৩৮]' : lang === 'ar' ? '[موطأ الإمام مالك: 3338]' : '[Muwatta Imam Malik: 3338]'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
