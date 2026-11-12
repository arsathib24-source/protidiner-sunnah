import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen, Clock, ShieldCheck, Bookmark, Share2 } from 'lucide-react';
import { CLASSICAL_BOOKS } from '@/lib/data/books';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArabesqueDivider, IslamicStarIcon } from '@/components/ui/decorative';

export default function ReaderViewPage({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  const lang = (params.lang || 'bn') as 'bn' | 'ar' | 'en';
  const slug = params.slug;

  const book = CLASSICAL_BOOKS.find((b) => b.slug === slug);

  if (!book) {
    notFound();
  }

  return (
    <div className="py-10 md:py-16 bg-background bg-islamic-pattern min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-8">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <Link href={`/${lang}/library`}>
            <Button variant="ghost" size="sm" className="gap-1.5 text-primary">
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>লাইব্রেরিতে ফিরে যান</span>
            </Button>
          </Link>
          <Badge variant="accent">
            <ShieldCheck className="w-3.5 h-3.5 text-accent-dark" />
            <span>{book.verifiedSource}</span>
          </Badge>
        </div>

        {/* Book Header & Overview */}
        <div className="bg-surface p-8 rounded-3xl border border-border/80 shadow-card space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent">{book.category[lang]}</Badge>
            <span className="text-xs text-text-muted flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-accent-dark" />
              <span>পাঠ সময়: {book.readingTimeMins} মিনিট</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold font-bengali-heading text-primary leading-tight">
            {book.title[lang]}
          </h1>
          <p className="text-sm font-semibold text-secondary">
            রচয়িতা: {book.author[lang]}
          </p>

          <p className="text-base text-foreground leading-relaxed font-bengali pt-2">
            {book.description[lang]}
          </p>
        </div>

        {/* Sample Reading Content */}
        <div className="bg-surface p-8 sm:p-12 rounded-3xl border border-border/80 shadow-card space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-accent-dark">
              পরিচ্ছেদ ১
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-bengali-heading text-primary">
              ইখলাস ও নিয়ত শুদ্ধিকরণ
            </h2>
            <ArabesqueDivider />
          </div>

          {/* Classical Arabic Hadith */}
          <div dir="rtl" className="p-6 rounded-2xl bg-surface-muted/60 border border-border text-center space-y-3">
            <IslamicStarIcon className="w-5 h-5 text-accent mx-auto" />
            <p className="text-2xl font-arabic text-primary leading-loose">
              «إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى»
            </p>
            <span className="text-xs text-text-muted font-sans">[সহিহ আল-বুখারি: ১, সহিহ মুসলিম: ১৯০৭]</span>
          </div>

          {/* Bengali Translation & Meaning */}
          <div className="space-y-4 text-base sm:text-lg leading-relaxed text-foreground font-bengali">
            <p className="first-letter:text-3xl first-letter:font-bold first-letter:text-primary first-letter:me-1">
              আমিরুল মুমিনিন উমর ইবনুল খাত্তাব (রাদিয়াল্লাহু আনহু) থেকে বর্ণিত, তিনি বলেন: আমি রাসুলুল্লাহ ﷺ-কে বলতে শুনেছি:
            </p>
            <blockquote className="p-4 rounded-xl border-s-4 border-accent bg-accent/5 text-primary font-medium italic">
              «সকল আমলের গ্রহণযোগ্যতা কেবল নিয়তের উপর নির্ভরশীল; আর প্রত্যেক ব্যক্তি তাই পাবে, যা সে নিয়ত করেছে।»
            </blockquote>
            <p>
              অতএব যার হিজরত একমাত্র আল্লাহ ও তাঁর রাসুলের সন্তুষ্টির উদ্দেশ্যে হবে, তার হিজরত আল্লাহ ও তাঁর রাসুলের প্রতিই গণ্য হবে। আর যার হিজরত কোনো পার্থিব সম্পদ অর্জন বা কোনো নারীকে বিবাহের উদ্দেশ্যে হবে, তার হিজরত সেই উদ্দেশ্যেই গণ্য হবে যার দিকে সে হিজরত করেছে।
            </p>
          </div>

          <ArabesqueDivider />

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs text-text-muted">
            <span>উৎস যাচাইকরণ: সহিহুল বুখারি তাহকিক সংস্করণ</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-accent-dark" />
                <span>বুকমার্ক সংরক্ষণ</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
