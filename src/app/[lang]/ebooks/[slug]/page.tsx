import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, ArrowRight, BookOpen, Clock, ShieldCheck, 
  Layers, Calendar, Globe, UserCheck, BookMarked, Share2, 
  ChevronRight, Sparkles, CheckCircle2, AlertTriangle
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

  const title = book.title[lang] || book.title.bn;
  const author = book.author[lang] || book.author.bn;
  const description = book.description[lang] || book.description.bn;

  return {
    title: `${title} - ${author} | Protidiner Sunnah`,
    description,
    alternates: {
      canonical: `/${lang}/ebooks/${params.slug}`,
      languages: {
        bn: `/bn/ebooks/${params.slug}`,
        ar: `/ar/ebooks/${params.slug}`,
        en: `/en/ebooks/${params.slug}`,
        'x-default': `/bn/ebooks/${params.slug}`,
      },
    },
    openGraph: {
      title: `${title} | Protidiner Sunnah`,
      description,
      type: 'book',
      locale: lang === 'bn' ? 'bn_BD' : lang === 'ar' ? 'ar_SA' : 'en_US',
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

  const isTranslationAvailable = book.availableLanguages.includes(lang);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const langLabels: Record<'bn' | 'ar' | 'en', string> = {
    bn: 'বাংলা সংস্করণ',
    ar: 'النسخة العربية الأصلية',
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
            {book.title[lang] || book.title.bn}
          </span>
        </nav>

        {/* Translation Availability Warning if Requested Language is not ready */}
        {!isTranslationAvailable && (
          <div className="p-5 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-900 shadow-sm space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-800 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                {lang === 'en'
                  ? 'Scholarly Translation in Review'
                  : lang === 'ar'
                  ? 'الترجمة قيد التدقيق الشرعي'
                  : 'অনুবাদ আলেম বোর্ডের নিরীক্ষাধীন'}
              </span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed">
              {lang === 'en'
                ? 'To preserve the sacred integrity of classical Islamic literature, Protidiner Sunnah strictly avoids unverified machine translation. A verified English edition for this text is currently undergoing scholarly audit. You can explore the verified Arabic original or Bengali translation below.'
                : lang === 'ar'
                ? 'حفاظاً على أمانة النقل الشرعي، لا نعتمد الترجمات الآلية للنصوص الدينية. هذه النسخة معتمدة حالياً بالأصل العربي والترجمة البنغالية.'
                : 'ধর্মীয় কিতাবের বিশুদ্ধতা রক্ষার্থে আমরা কোনো স্বয়ংক্রিয় বা অনিরীক্ষিত অনুবাদ প্রকাশ করি না। বইটি বর্তমানে মূল আরবি ও অন্য অনুমোদিত সংস্করণে পড়তে পারেন।'}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-semibold text-amber-800">
                {lang === 'en' ? 'Available verified editions:' : lang === 'ar' ? 'النسخ المعتمدة المتوفرة:' : 'উপলব্ধ অনুমোদিত সংস্করণ:'}
              </span>
              {book.availableLanguages.map((availableLang) => (
                <Link key={availableLang} href={`/${availableLang}/ebooks/${book.slug}`}>
                  <Badge variant="accent" size="sm" className="cursor-pointer hover:scale-105 transition-transform shadow-xs">
                    {langLabels[availableLang]}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}

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
                    {book.title[lang] || book.title.bn}
                  </h2>
                  <p className="text-xs font-arabic text-accent-light mt-1" dir="rtl">
                    {book.title.ar}
                  </p>
                </div>

                <div className="relative z-10 pt-3 border-t border-white/15 text-xs text-accent-light/90">
                  <p className="font-semibold">{book.author[lang] || book.author.bn}</p>
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
                  <span>
                    {lang === 'bn' ? 'সম্পূর্ণ বিজ্ঞাপনমুক্ত ও বিনামূল্যে উন্মুক্ত' : lang === 'ar' ? 'مجاني ومتاح بالكامل للجميع بدون إعلانات' : '100% Free and Ad-Free Forever'}
                  </span>
                </p>
              </div>

              {/* Available Languages */}
              <div className="w-full max-w-xs p-4 rounded-2xl bg-surface-muted/60 border border-border/80 text-left rtl:text-right space-y-2">
                <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-accent-dark" />
                  <span>
                    {lang === 'bn' ? 'উপলব্ধ ভাষার সংস্করণ:' : lang === 'ar' ? 'النسخ اللغوية المعتمدة:' : 'Available Editions:'}
                  </span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {book.availableLanguages.map((l) => (
                    <Link key={l} href={`/${l}/ebooks/${book.slug}`}>
                      <Badge
                        variant={l === lang ? 'accent' : 'outline'}
                        size="sm"
                        className="cursor-pointer hover:border-accent"
                      >
                        {langLabels[l]}
                      </Badge>
                    </Link>
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
                  {(!book.isCompleted || (book.totalCompiledChapters && book.totalCompiledChapters !== book.chapterCount)) && (
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30 font-semibold">
                      {lang === 'bn' ? 'প্রিভিউ সংস্করণ (তাহকিকাধীন)' : 'Preview Edition (Under Audit)'}
                    </Badge>
                  )}
                  {book.license && (
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/30 font-medium">
                      {lang === 'bn' ? book.license.labelBn : book.license.labelEn}
                    </Badge>
                  )}
                  <span className="text-xs font-medium text-text-muted flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-accent-dark" />
                    <span>
                      {lang === 'bn' ? `পাঠ সময়: ${book.readingTimeMins} মিনিট` : lang === 'ar' ? `وقت القراءة: ${book.readingTimeMins} دقيقة` : `Read time: ${book.readingTimeMins} mins`}
                    </span>
                  </span>
                  <span className="text-xs font-medium text-text-muted flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-accent-dark" />
                    <span>
                      {book.totalCompiledChapters && book.totalCompiledChapters !== book.chapterCount
                        ? lang === 'bn'
                          ? `${book.chapterCount}টি পরিচ্ছেদ উন্মুক্ত (মূল কিতাবে ${book.totalCompiledChapters}টি)`
                          : lang === 'ar'
                          ? `${book.chapterCount} فصول متاحة رقمياً (من ${book.totalCompiledChapters})`
                          : `${book.chapterCount} Chapters Available (of ${book.totalCompiledChapters})`
                        : lang === 'bn'
                        ? `${book.chapterCount} টি অধ্যায়`
                        : `${book.chapterCount} Chapters`}
                    </span>
                  </span>
                </div>

                {/* Title & Classical Arabic Subtitle */}
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold font-bengali-heading text-primary dark:text-background leading-tight">
                    {book.title[lang] || book.title.bn}
                  </h1>
                  <p className="text-lg font-arabic text-accent-dark mt-1" dir="rtl">
                    {book.title.ar}
                  </p>
                </div>

                {/* Author Information Card */}
                <div className="p-5 rounded-2xl bg-surface-muted/40 border border-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent-dark">
                      {lang === 'bn' ? 'রচয়িতা পরিচিতি' : lang === 'ar' ? 'ترجمة المؤلف' : 'About the Author'}
                    </span>
                    {book.author.deathYearHijri && (
                      <span className="text-xs text-text-muted font-mono">
                        {lang === 'bn' ? `তিরোধান: ${book.author.deathYearHijri}` : lang === 'ar' ? `سنة الوفاة: ${book.author.deathYearHijri}` : `Died: ${book.author.deathYearHijri}`}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold font-bengali-heading text-primary">
                    {book.author[lang] || book.author.bn}
                  </h3>
                  {book.author.bio && (
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                      {book.author.bio[lang] || book.author.bio.bn}
                    </p>
                  )}
                </div>

                {/* Description & Detailed Synopsis */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-primary">
                    {lang === 'bn' ? 'কিতাবের পরিচিতি ও সারসংক্ষেপ' : lang === 'ar' ? 'نبذة عن الكتاب' : 'Book Synopsis'}
                  </h4>
                  <p className="text-base text-foreground leading-relaxed">
                    {book.fullDescription
                      ? book.fullDescription[lang] || book.fullDescription.bn
                      : book.description[lang] || book.description.bn}
                  </p>
                </div>

                {/* Reviewer & Authenticity Audit Information */}
                <div className="p-5 rounded-2xl bg-primary/5 border border-primary/15 space-y-3">
                  <div className="flex items-center gap-2 text-primary dark:text-accent font-bold text-sm">
                    <UserCheck className="w-4 h-4 text-accent-dark" />
                    <span>
                      {lang === 'bn' ? 'যাচাইকারী ও সনদ পর্যালোচনা (Scholar Review)' : lang === 'ar' ? 'تدقيق وضبط الأسانيد والمخطوطات' : 'Scholarly Audit & Verification'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-text-muted">
                        {lang === 'bn' ? 'যাচাইকারী আলেম:' : lang === 'ar' ? 'المحقق والمراجع:' : 'Reviewer:'}
                      </span>
                      <p className="font-bold text-primary mt-0.5">{book.reviewer.name}</p>
                      <p className="text-text-muted">{book.reviewer.title}, {book.reviewer.institution}</p>
                    </div>
                    <div>
                      <span className="text-text-muted">
                        {lang === 'bn' ? 'যাচাইকরণের তারিখ ও উৎস:' : lang === 'ar' ? 'تاريخ التوثيق والطبعة الورقية:' : 'Verified Edition & Date:'}
                      </span>
                      <p className="font-bold text-primary mt-0.5">{book.reviewer.verifiedDate}</p>
                      <p className="text-accent-dark font-medium">{book.verifiedSource}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-primary/10 text-xs text-text-muted leading-relaxed italic">
                    «{book.reviewer.notes}»
                  </div>
                </div>
              </div>

              {/* Publication Date & License Metadata */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between text-xs text-text-muted gap-2">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-accent-dark" />
                  <span>
                    {lang === 'bn' ? 'ডিজিটাল প্রকাশনার তারিখ: ' : lang === 'ar' ? 'تاريخ النشر الرقمي: ' : 'Digital Publication Date: '}
                    <strong>{book.publishedAt}</strong>
                  </span>
                </span>
                <span className="flex items-center gap-1.5" title={book.license?.terms}>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    {lang === 'bn' ? `স্বত্বাধিকার: ${book.license?.labelBn || 'উন্মুক্ত ওয়াকফ'}` : `License: ${book.license?.labelEn || 'Open Waqf'}`}
                  </span>
                </span>
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
                {lang === 'bn' ? 'সূচিপত্র (Table of Contents)' : lang === 'ar' ? 'فهرس الأبواب والفصول' : 'Table of Contents'}
              </h2>
            </div>
            <span className="text-xs text-text-muted font-semibold">
              {book.totalCompiledChapters && book.totalCompiledChapters !== book.chapters.length
                ? lang === 'bn'
                  ? `${book.chapters.length}টি পরিচ্ছেদ উন্মুক্ত (মূল কিতাবে ${book.totalCompiledChapters}টি)`
                  : lang === 'ar'
                  ? `${book.chapters.length} فصول من أصل ${book.totalCompiledChapters}`
                  : `${book.chapters.length} Chapters Ready (of ${book.totalCompiledChapters})`
                : lang === 'bn'
                ? `মোট ${book.chapters.length} টি পরিচ্ছেদ`
                : `${book.chapters.length} Chapters`}
            </span>
          </div>

          {/* Editorial Verification Notice Callout */}
          {book.editorialNotice && (
            <div className="p-4 rounded-2xl bg-secondary/15 border border-secondary/30 text-xs sm:text-sm text-foreground/85 leading-relaxed flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-primary block">
                  {lang === 'bn' ? 'তাহকিক ও ডিজিটাল সংস্করণ সংক্রান্ত সম্পাদকীয় তথ্য:' : 'Editorial Notice on Digital Verification:'}
                </span>
                <p>{book.editorialNotice[lang] || book.editorialNotice.bn}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {book.chapters.map((chapter) => (
              <Link
                key={chapter.slug}
                href={`/${lang}/read/${book.slug}?chapter=${chapter.number}`}
                className="group flex items-start gap-4 p-4 rounded-2xl bg-surface-muted/30 hover:bg-surface-muted border border-border/60 hover:border-accent transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-xl bg-accent/20 text-accent-dark font-bold font-mono text-xs flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-accent transition-colors">
                  {chapter.number}
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="text-sm font-bold text-primary group-hover:text-accent-dark transition-colors">
                    {chapter.title[lang] || chapter.title.bn}
                  </h4>
                  <p className="text-xs font-arabic text-accent-dark line-clamp-1" dir="rtl">
                    {chapter.title.ar}
                  </p>
                  <span className="text-[11px] text-text-muted block">
                    {lang === 'bn' ? `পাঠ সময়: ${chapter.durationMins} মিনিট` : lang === 'ar' ? `المدة: ${chapter.durationMins} دقيقة` : `Duration: ${chapter.durationMins} min`}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 rtl:rotate-180 text-border group-hover:text-accent transition-colors self-center" />
              </Link>
            ))}
          </div>
        </div>

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Book',
              name: book.title[lang] || book.title.bn,
              headline: book.title[lang] || book.title.bn,
              alternativeHeadline: book.title.ar,
              author: {
                '@type': 'Person',
                name: book.author[lang] || book.author.bn,
              },
              inLanguage: lang,
              description: book.description[lang] || book.description.bn,
              numberOfPages: book.chapterCount,
              publisher: {
                '@type': 'Organization',
                name: 'প্রতিদিনের সুন্নাহ',
              },
              datePublished: book.publishedAt,
            }),
          }}
        />
      </div>
    </div>
  );
}
