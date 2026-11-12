import React from 'react';
import Link from 'next/link';
import { BookOpen, Sparkles, ShieldCheck, Heart, ArrowRight, ArrowLeft, BookMarked, Layers, Smartphone } from 'lucide-react';
import { Locale, SUPPORTED_LOCALES } from '@/types/i18n';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

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
      title: lang === 'bn' ? 'রিয়াদুস সলেহিন' : lang === 'ar' ? 'رياض الصالحين' : 'Riyad us-Saliheen',
      author: lang === 'bn' ? 'ইমাম আন-নববী (রহ.)' : lang === 'ar' ? 'الإمام النووي رحمه الله' : 'Imam An-Nawawi (rah.)',
      category: lang === 'bn' ? 'হাদিস সংকলন' : lang === 'ar' ? 'الحديث الشريف' : 'Hadith Collection',
      readTime: '15',
      chapters: '1896',
      source: 'Darussalam / Al-Maktabah',
      summary: lang === 'bn' 
        ? 'দৈনন্দিন জীবনে আমলযোগ্য সহিহ হাদিসের সর্বজনগ্রাহ্য এক অনুপম সংকলন।'
        : lang === 'ar'
        ? 'دليل يومي شامل يجمع أمهات الأحاديث النبوية في الآداب والأخلاق والعبادات.'
        : 'An essential compilation of authentic traditions guiding everyday conduct and morals.',
    },
    {
      id: 'hisnul-muslim',
      title: lang === 'bn' ? 'হিসনুল মুসলিম' : lang === 'ar' ? 'حصن المسلم' : 'Hisnul Muslim',
      author: lang === 'bn' ? 'সাঈদ ইবন ওয়াহফ আল-কাহত্বানী' : lang === 'ar' ? 'سعيد بن علي بن وهف القحطاني' : 'Saeed bin Ali al-Qahtani',
      category: lang === 'bn' ? 'দোয়া ও জিকির' : lang === 'ar' ? 'الأذكار والدعاء' : 'Duas & Remembrances',
      readTime: '8',
      chapters: '132',
      source: 'Darussalam',
      summary: lang === 'bn'
        ? 'কুরআন ও সহিহ হাদিস থেকে চয়নকৃত প্রাত্যহিক জীবনের প্রয়োজনীয় দোয়া ও জিকির।'
        : lang === 'ar'
        ? 'أذكار اليوم والليلة من القرآن والسنة الصحيحة لحصن المؤمن.'
        : 'Fortress of the Muslim: Authentic supplications and daily dhikr from Quran and Sunnah.',
    },
    {
      id: 'arbain-nawawi',
      title: lang === 'bn' ? 'চল্লিশ হাদিস (আল-আরবাঈন)' : lang === 'ar' ? 'الأربعون النووية' : 'An-Nawawi’s Forty Hadith',
      author: lang === 'bn' ? 'ইমাম আন-নববী (রহ.)' : lang === 'ar' ? 'الإمام النووي رحمه الله' : 'Imam An-Nawawi (rah.)',
      category: lang === 'bn' ? 'মৌলিক ইসলাম' : lang === 'ar' ? 'أصول الدين' : 'Foundations of Faith',
      readTime: '6',
      chapters: '42',
      source: 'Al-Maktabah Ash-Shamilah',
      summary: lang === 'bn'
        ? 'ইসলাম ধর্মের মৌলিক স্তম্ভ ও মূলনীতি তুলে ধরা বিয়াল্লিশটি গুরুত্বপূর্ণ সহিহ হাদিস।'
        : lang === 'ar'
        ? 'جوامع الكلم وقواعد الدين الإسلامي الأساسية في اثنين وأربعين حديثًا نبويًا.'
        : 'The forty-two pivotal prophetic statements embodying the comprehensive principles of Islam.',
    },
  ];

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 bg-gradient-to-b from-islamic-ivory via-islamic-ivory-light to-background border-b border-border">
        {/* Decorative Golden Arch Blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-islamic-gold/10 blur-3xl pointer-events-none rounded-full" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
          <Badge variant="gold" className="mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-islamic-gold-dark" />
            <span>{dict.home.heroBadge}</span>
          </Badge>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-islamic-forest dark:text-islamic-ivory tracking-tight leading-[1.2] mb-6">
            {dict.home.heroTitle}
          </h1>

          <p className="text-base md:text-lg text-islamic-charcoal/80 dark:text-islamic-ivory/80 leading-relaxed mb-10 max-w-2xl mx-auto">
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

            <Link href="#daily-sunnah">
              <Button variant="outline" size="lg" className="gap-2">
                <Sparkles className="w-4 h-4 text-islamic-gold" />
                <span>{dict.home.dailySunnahTitle}</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Daily Sunnah Spotlight Card */}
      <section id="daily-sunnah" className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <Card decorated className="bg-gradient-to-br from-islamic-forest to-islamic-deep text-islamic-ivory p-8 md:p-10 shadow-islamic-lg border-islamic-gold/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-islamic-forest-light">
              <div className="flex items-center gap-2.5 text-islamic-gold">
                <Sparkles className="w-5 h-5" />
                <span className="text-xs uppercase font-bold tracking-wider">
                  {dict.home.dailySunnahTitle}
                </span>
              </div>
              <span className="text-xs text-islamic-ivory/70 bg-islamic-forest-dark/60 px-3 py-1 rounded-full border border-islamic-gold/20">
                {dict.home.dailySunnahSource}
              </span>
            </div>

            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-islamic-ivory mb-6">
              {dict.home.dailySunnahText}
            </blockquote>

            <div className="flex items-center justify-between pt-4 text-xs text-islamic-gold-light/90">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-islamic-gold" />
                সহিহ সূত্রে বর্ণিত প্রামাণিক বাণী
              </span>
              <span className="italic">Protidiner Sunnah</span>
            </div>
          </Card>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-card-bg">
            <div className="w-12 h-12 rounded-xl bg-islamic-forest/10 flex items-center justify-center text-islamic-forest mb-4">
              <ShieldCheck className="w-6 h-6 text-islamic-forest" />
            </div>
            <h3 className="text-lg font-bold text-islamic-forest dark:text-islamic-ivory mb-2">
              ১০০% প্রামাণিক ও যাচাইকৃত
            </h3>
            <p className="text-sm text-islamic-charcoal/70 dark:text-islamic-ivory/70 leading-relaxed">
              কুরআন ও সুন্নাহর আলোকে বিশুদ্ধ উৎস এবং নির্ভরযোগ্য সনদের ভিত্তিতে কিতাবসমূহ সংকলিত ও পর্যালোচিত।
            </p>
          </Card>

          <Card className="p-6 bg-card-bg">
            <div className="w-12 h-12 rounded-xl bg-islamic-gold/15 flex items-center justify-center text-islamic-gold-dark mb-4">
              <Heart className="w-6 h-6 text-islamic-gold-dark" />
            </div>
            <h3 className="text-lg font-bold text-islamic-forest dark:text-islamic-ivory mb-2">
              সবার জন্য সম্পূর্ণ বিনামূল্যে
            </h3>
            <p className="text-sm text-islamic-charcoal/70 dark:text-islamic-ivory/70 leading-relaxed">
              কোনো সাবস্ক্রিপশন ফি বা বাণিজ্যিক বিজ্ঞাপন ছাড়াই যে কেউ যেকোনো স্থান থেকে সহজে পড়তে পারবেন।
            </p>
          </Card>

          <Card className="p-6 bg-card-bg">
            <div className="w-12 h-12 rounded-xl bg-islamic-deep/10 flex items-center justify-center text-islamic-deep mb-4">
              <Smartphone className="w-6 h-6 text-islamic-deep" />
            </div>
            <h3 className="text-lg font-bold text-islamic-forest dark:text-islamic-ivory mb-2">
              আধুনিক আরামদায়ক রিডার
            </h3>
            <p className="text-sm text-islamic-charcoal/70 dark:text-islamic-ivory/70 leading-relaxed">
              ফন্ট সাইজ পরিবর্তন, আইভরি-সেপিয়া-ডার্ক থিম এবং বুকমার্কিং সুবিধার সাথে চোখের জন্য আরামদায়ক পাঠ অভিজ্ঞতা।
            </p>
          </Card>
        </div>
      </section>

      {/* Featured Books Preview */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-islamic-forest dark:text-islamic-ivory">
              {dict.home.featuredBooksTitle}
            </h2>
            <p className="text-sm text-islamic-charcoal/70 dark:text-islamic-ivory/70 mt-1">
              {dict.home.featuredBooksSubtitle}
            </p>
          </div>
          <Link href={`/${lang}/library`}>
            <Button variant="ghost" size="sm" className="gap-1.5 text-islamic-forest font-semibold">
              <span>{dict.home.viewAll}</span>
              <ArrowIcon className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleBooks.map((book) => (
            <Card key={book.id} className="flex flex-col justify-between hover:border-islamic-gold/50 transition-all">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="gold">{book.category}</Badge>
                  <span className="text-xs text-islamic-charcoal/50 dark:text-islamic-ivory/50">
                    {book.chapters} {lang === 'bn' ? 'পরিচ্ছেদ' : lang === 'ar' ? 'باب' : 'sections'}
                  </span>
                </div>
                <CardTitle className="text-xl line-clamp-1">{book.title}</CardTitle>
                <CardDescription className="font-medium text-islamic-forest-light dark:text-islamic-gold-light">
                  {book.author}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-islamic-charcoal/70 dark:text-islamic-ivory/70 line-clamp-2 leading-relaxed">
                  {book.summary}
                </p>
              </CardContent>

              <CardFooter className="border-t border-border/60 pt-4 mt-2">
                <span className="text-xs text-islamic-charcoal/50 dark:text-islamic-ivory/50">
                  উৎস: {book.source}
                </span>
                <Link href={`/${lang}/reader/${book.id}`}>
                  <Button variant="primary" size="sm" className="gap-1.5">
                    <span>{dict.actions.readNow}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Design System Tokens Showcase for QA & Verification */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="p-8 rounded-2xl bg-islamic-forest/5 border border-islamic-forest/15">
          <div className="flex items-center gap-2 mb-4 text-islamic-forest dark:text-islamic-gold">
            <Layers className="w-5 h-5" />
            <h3 className="text-base font-bold uppercase tracking-wider">
              UI/UX Design System Palette & Tokens
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            <div className="p-3 rounded-lg bg-islamic-forest text-islamic-ivory text-xs font-mono">
              <div className="font-bold">Forest Green</div>
              <div>#123F35</div>
            </div>
            <div className="p-3 rounded-lg bg-islamic-deep text-islamic-ivory text-xs font-mono">
              <div className="font-bold">Deep Green</div>
              <div>#1B5547</div>
            </div>
            <div className="p-3 rounded-lg bg-islamic-gold text-islamic-forest text-xs font-mono">
              <div className="font-bold">Soft Gold</div>
              <div>#D9BD7A</div>
            </div>
            <div className="p-3 rounded-lg bg-islamic-ivory text-islamic-charcoal border border-border text-xs font-mono">
              <div className="font-bold">Ivory Canvas</div>
              <div>#F7F1E5</div>
            </div>
            <div className="p-3 rounded-lg bg-islamic-charcoal text-islamic-ivory text-xs font-mono">
              <div className="font-bold">Charcoal</div>
              <div>#26332F</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="gold">Gold Badge</Badge>
            <Badge variant="forest">Forest Badge</Badge>
            <Badge variant="ivory">Ivory Badge</Badge>
            <Badge variant="outline">Outline Badge</Badge>
            <Button variant="primary" size="sm">Primary</Button>
            <Button variant="secondary" size="sm">Secondary</Button>
            <Button variant="gold" size="sm">Gold Accent</Button>
            <Button variant="outline" size="sm">Outline</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
