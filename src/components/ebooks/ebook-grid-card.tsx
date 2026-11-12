'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Layers, Clock, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { ClassicalBook } from '@/lib/data/books';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IslamicStarIcon } from '@/components/ui/decorative';

interface EbookGridCardProps {
  book: ClassicalBook;
  locale: 'bn' | 'ar' | 'en';
  isRTL?: boolean;
}

export const EbookGridCard: React.FC<EbookGridCardProps> = ({
  book,
  locale,
  isRTL = false,
}) => {
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const langNames: Record<'bn' | 'ar' | 'en', string> = {
    bn: 'বাংলা',
    ar: 'عربي',
    en: 'EN',
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-3xl bg-surface border border-border/80 shadow-card hover:shadow-card-hover hover:border-accent/60 transition-all duration-300 overflow-hidden">
      {/* 1. Book Cover Preview Area */}
      <div className="relative h-48 bg-gradient-to-br from-primary via-primary-light to-secondary p-5 flex flex-col justify-between text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-islamic-stars opacity-40 pointer-events-none" />

        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between">
          <Badge variant="accent" size="sm" className="bg-surface/90 text-primary border-accent/40 backdrop-blur-sm">
            {book.category[locale]}
          </Badge>

          {/* Available Languages Badges */}
          <div className="flex items-center gap-1">
            {book.availableLanguages.map((lang) => (
              <span
                key={lang}
                className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary-dark/80 text-accent border border-accent/30"
              >
                {langNames[lang]}
              </span>
            ))}
          </div>
        </div>

        {/* Center Title Display */}
        <div className="relative z-10 text-center px-2 my-auto">
          <IslamicStarIcon className="w-5 h-5 text-accent mx-auto mb-1.5 opacity-90" />
          <h3 className="text-xl font-bold font-bengali-heading text-background line-clamp-2 leading-tight">
            {book.title[locale]}
          </h3>
        </div>

        {/* Verified Source Ribbon */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-accent-light/90 pt-2 border-t border-white/10">
          <span className="flex items-center gap-1 truncate max-w-[200px]">
            <ShieldCheck className="w-3.5 h-3.5 text-accent flex-shrink-0" />
            <span className="truncate">{book.verifiedSource}</span>
          </span>
          <span className="opacity-80 font-medium">{book.author.deathYearHijri || ''}</span>
        </div>
      </div>

      {/* 2. Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <Link href={`/${locale}/ebooks/${book.slug}`}>
            <h4 className="text-lg font-bold font-bengali-heading text-primary dark:text-background group-hover:text-secondary transition-colors line-clamp-1">
              {book.title[locale]}
            </h4>
          </Link>
          <p className="text-xs text-secondary font-medium mt-1">
            {book.author[locale]}
          </p>

          <p className="text-xs text-text-muted mt-2.5 line-clamp-3 leading-relaxed font-bengali">
            {book.description[locale]}
          </p>
        </div>

        {/* 3. Metadata & Read Online CTA */}
        <div className="pt-4 border-t border-border/60 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-text-muted">
            <span className="flex items-center gap-1" title="মোট অধ্যায়">
              <Layers className="w-3.5 h-3.5 text-accent-dark" />
              <span>{book.chapterCount} {locale === 'bn' ? 'অধ্যায়' : locale === 'ar' ? 'أبواب' : 'chs'}</span>
            </span>
            <span className="flex items-center gap-1" title="আনুমানিক পাঠ সময়">
              <Clock className="w-3.5 h-3.5 text-accent-dark" />
              <span>{book.readingTimeMins} {locale === 'bn' ? 'মি.' : 'm'}</span>
            </span>
          </div>

          {/* Read Online Button */}
          <Link href={`/${locale}/ebooks/${book.slug}`}>
            <Button variant="primary" size="sm" className="gap-1.5 h-9 font-bengali-heading font-semibold shadow-subtle">
              <span>{locale === 'bn' ? 'অনলাইনে পড়ুন' : locale === 'ar' ? 'اقرأ الآن' : 'Read Online'}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
