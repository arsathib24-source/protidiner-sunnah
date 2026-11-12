import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, ArrowRight, BookOpen, Clock, ShieldCheck, 
  Layers, Calendar, Globe, UserCheck, BookMarked, Share2, 
  ChevronRight, Sparkles, CheckCircle2 
} from 'lucide-react';
import { Locale, SUPPORTED_LOCALES } from '@/types/i18n';
import { CLASSICAL_BOOKS } from '@/lib/data/books';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArabesqueDivider, IslamicStarIcon } from '@/components/ui/decorative';

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  const lang = (params.lang || 'bn') as Locale;
  const book = CLASSICAL_BOOKS.find((b) => b.slug === params.slug);

  if (!book) {
    return { title: 'কিতাব পাওয়া যায়নি | Protidiner Sunnah' };
  }

  return {
    title: `${book.title[lang]} - ${book.author[lang]} | Protidiner Sunnah`,
    description: book.description[lang],
    openGraph: {
      title: `${book.title[lang]} | Protidiner Sunnah`,
      description: book.description[lang],
      type: 'book',
    },
  };
}

export default async function EbookDetailPage({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  const lang = (params.lang || 'bn') as 'bn' | 'ar' | 'en';
  const isRTL = SUPPORTED_LOCALES[lang]?.dir === 'rtl';
  const slug = params.slug;

  const book = CLASSICAL_BOOKS.find((b) => b.slug === slug);

  if (!book) {
    notFound();
  }

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const langLabels: Record<'bn' | 'ar' | 'en', string> = {
    bn: 'বাংলা সংস্করণ',
    ar: 'النسخة العربية',
    en: 'English Edition',
  };

  return (
    <div className="py-10 md:py-16 bg-background bg-islamic-pattern min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 space-y-10 max-w-6xl">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-text-muted font-medium">
          <Link href={`/${lang}`} className="hover:text-primary transition-colors">
            {lang === 'bn' ? 'নীড়পাতা' : lang === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 text-border" />
          <Link href={`/${lang}/ebooks`} className="hover:text-primary transition-colors">
            {lang === 'bn' ? 'ই-বুক লাইব্রেরি' : lang === 'ar' ? 'المكتبة' : 'Ebooks'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 text-border" />
          <span className="text-primary dark:text-accent font-semibold truncate max-w-[200px] sm:max-w-md">
            {book.title[lang]}
          </span>
        </nav>

        {/* Main Book Presentation Card */}
        <div className="rounded-3xl bg-surface border border-border/80 shadow-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12">
            {/* Left Column: Book Cover & Quick Meta */}
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-6">
              {/* Premium Book Cover */}
              <div className="w-full max-w-xs aspect-[3/4] rounded-2xl bg-gradient-to-br from-primary via-primary-light to-secondary p-6 flex flex-col justify-between text-primary-foreground border-2 border-accent/40 shadow-card-hover relative overflow-hidden group">
                <div className="absolute inset-0 bg-islamic-stars opacity-40 pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between text-accent">
                  <Badge variant="accent" size="sm" className="bg-surface/90 text-primary border-accent/40 backdrop-blur-sm">
                    {book.category[lang]}
                  </Badge>
                  <IslamicStarIcon className="w-5 h-5" />
                </div>

                <div className="relative z-10 my-auto text-center px-2">
                  <IslamicStarIcon className="w-6 h-6 text-accent mx-auto mb-2 opacity-80" />
                  <h2 className="text-2xl font-bold font-bengali-heading text-background leading-tight">
                    {book.title[lang]}
                  </h2>
                  <p className="text-xs font-arabic text-accent-light mt-1" dir="rtl">
                    {book.title.ar}
                  </p>
                </div>

                <div className="relative z-10 pt-3 border-t border-white/15 text-xs text-accent-light/90">
                  <p className="font-semibold">{book.author[lang]}</p>
                </div>
              </div>

              {/* Primary Read Online CTA */}
              <div className="w-full max-w-xs space-y-3">
                <Link href={`/${lang}/read/${book.slug}`} className="block w-full">
                  <Button variant="primary" size="lg" className="w-full gap-2 text-base font-bengali-heading font-bold shadow-card">
                    <BookOpen className="w-5 h-5 text-accent" />
                    <span>{lang === 'bn' ? 'অনলাইনে পড়ুন' : lang === 'ar' ? 'اقرأ الكتاب الآن' : 'Read Online'}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </Button>
                </Link>

                <p className="text-[11px] text-text-muted flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent-dark" />
                  <span>সম্পূর্ণ বিজ্ঞাপনমুক্ত ও বিনামূল্যে উন্মুক্ত</span>
                </p>
              </div>

              {/* Available Languages */}
              <div className="w-full max-w-xs p-4 rounded-2xl bg-surface-muted/60 border border-border/80 text-left rtl:text-right space-y-2">
                <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-accent-dark" />
                  <span>উপলব্ধ ভাষার সংস্করণ:</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {book.availableLanguages.map((l) => (
                    <Badge key={l} variant="accent" size="sm">
                      {langLabels[l]}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Title, Author, Description, Reviewer, Details */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                {/* Category & Verified Stamp */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge variant="accent">{book.category[lang]}</Badge>
                  <span className="text-xs font-medium text-text-muted flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-accent-dark" />
                    <span>পাঠ সময়: {book.readingTimeMins} মিনিট</span>
                  </span>
                  <span className="text-xs font-medium text-text-muted flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-accent-dark" />
                    <span>{book.chapterCount} টি অধ্যায়</span>
                  </span>
                </div>

                {/* Title & Classical Arabic Subtitle */}
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold font-bengali-heading text-primary dark:text-background leading-tight">
                    {book.title[lang]}
                  </h1>
                  <p className="text-lg font-arabic text-accent-dark mt-1" dir="rtl">
                    {book.title.ar}
                  </p>
                </div>

                {/* Author Information Card */}
                <div className="p-5 rounded-2xl bg-surface-muted/40 border border-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent-dark">
                      রচয়িতা পরিচিতি
                    </span>
                    {book.author.deathYearHijri && (
                      <span className="text-xs text-text-muted font-mono">
                        তিরোধান: {book.author.deathYearHijri}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold font-bengali-heading text-primary">
                    {book.author[lang]}
                  </h3>
                  {book.author.bio && (
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-bengali">
                      {book.author.bio[lang]}
                    </p>
                  )}
                </div>

                {/* Description & Detailed Synopsis */}
                <div className="space-y-3 font-bengali">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-primary">
                    কিতাবের পরিচিতি ও সারসংক্ষেপ
                  </h4>
                  <p className="text-base text-foreground leading-relaxed">
                    {book.fullDescription ? book.fullDescription[lang] : book.description[lang]}
                  </p>
                </div>

                {/* Reviewer & Authenticity Audit Information */}
                <div className="p-5 rounded-2xl bg-primary/5 border border-primary/15 space-y-3">
                  <div className="flex items-center gap-2 text-primary dark:text-accent font-bold text-sm">
                    <UserCheck className="w-4 h-4 text-accent-dark" />
                    <span>যাচাইকারী ও সনদ পর্যালোচনা (Scholar Review)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-text-muted">যাচাইকারী আলেম:</span>
                      <p className="font-bold text-primary mt-0.5">{book.reviewer.name}</p>
                      <p className="text-text-muted">{book.reviewer.title}, {book.reviewer.institution}</p>
                    </div>
                    <div>
                      <span className="text-text-muted">যাচাইকরণের তারিখ ও উৎস:</span>
                      <p className="font-bold text-primary mt-0.5">{book.reviewer.verifiedDate}</p>
                      <p className="text-accent-dark font-medium">{book.verifiedSource}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-primary/10 text-xs text-text-muted leading-relaxed font-bengali italic">
                    «{book.reviewer.notes}»
                  </div>
                </div>
              </div>

              {/* Publication Date Metadata */}
              <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between text-xs text-text-muted gap-2">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-accent-dark" />
                  <span>ডিজিটাল প্রকাশনার তারিখ: <strong>{book.publishedAt}</strong></span>
                </span>
                <span>স্বত্বাধিকার: উন্মুক্ত ইসলামিক জ্ঞান প্রচার</span>
              </div>
            </div>
          </div>
        </div>

        {/* Table of Contents Section */}
        <div className="rounded-3xl bg-surface border border-border/80 shadow-card p-6 sm:p-10 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-accent-dark" />
              <h2 className="text-xl sm:text-2xl font-bold font-bengali-heading text-primary dark:text-background">
                সূচিপত্র (Table of Contents)
              </h2>
            </div>
            <span className="text-xs text-text-muted font-semibold">
              মোট {book.chapters.length} টি পরিচ্ছেদ
            </span>
          </div>

          <div className="space-y-3">
            {book.chapters.map((chapter) => (
              <div
                key={chapter.slug}
                className="flex items-center justify-between p-4 rounded-2xl bg-surface-muted/30 border border-border/60 hover:border-accent hover:bg-surface-muted transition-all"
              >
                <div className="space-y-1">
                  <h4 className="text-base font-bold font-bengali-heading text-primary">
                    {chapter.title[lang]}
                  </h4>
                  <p className="text-xs font-arabic text-accent-dark" dir="rtl">
                    {chapter.title.ar}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-text-muted flex items-center gap-1">
                    <Clock className="w-3 h-3 text-accent-dark" />
                    <span>{chapter.durationMins} মি.</span>
                  </span>

                  <Link href={`/${lang}/read/${book.slug}?chapter=${chapter.number}`}>
                    <Button variant="ghost" size="sm" className="h-8 text-xs gap-1 font-semibold text-primary">
                      <span>পড়ুন</span>
                      <ArrowIcon className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Read Online Prompt */}
          <div className="text-center pt-4">
            <Link href={`/${lang}/read/${book.slug}`}>
              <Button variant="primary" size="lg" className="gap-2 font-bengali-heading font-bold shadow-card">
                <BookOpen className="w-5 h-5 text-accent" />
                <span>প্রথম অধ্যায় থেকে পড়া শুরু করুন</span>
                <ArrowIcon className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
