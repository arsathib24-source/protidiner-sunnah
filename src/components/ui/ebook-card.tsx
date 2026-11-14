'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Bookmark, Clock, Layers, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './badge';
import { Button } from './button';
import { IslamicStarIcon } from './decorative';

export interface EbookCardProps {
  id: string;
  slug: string;
  title: string;
  author: string;
  category: string;
  description?: string;
  coverImageUrl?: string;
  chapterCount?: number;
  totalCompiledChapters?: number;
  readingTimeMins?: number;
  verifiedSource?: string;
  progressPercentage?: number;
  isBookmarked?: boolean;
  onBookmarkToggle?: (id: string) => void;
  lang?: string;
  isRTL?: boolean;
  layout?: 'vertical' | 'horizontal';
  className?: string;
}

export const EbookCard: React.FC<EbookCardProps> = ({
  id,
  slug,
  title,
  author,
  category,
  description,
  chapterCount = 5,
  totalCompiledChapters,
  readingTimeMins = 15,
  verifiedSource = 'যাচাইকৃত মূল পাঠ',
  progressPercentage,
  isBookmarked: initialBookmarked = false,
  onBookmarkToggle,
  lang = 'bn',
  isRTL = false,
  layout = 'vertical',
  className,
}) => {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked(!bookmarked);
    onBookmarkToggle?.(id);
  };

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const chapterDisplay = totalCompiledChapters && totalCompiledChapters !== chapterCount
    ? lang === 'bn'
      ? `${chapterCount}টি (মূল ${totalCompiledChapters})`
      : lang === 'ar'
      ? `${chapterCount} فصول (من ${totalCompiledChapters})`
      : `${chapterCount} ch. (of ${totalCompiledChapters})`
    : lang === 'bn'
    ? `${chapterCount} অধ্যায়`
    : lang === 'ar'
    ? `${chapterCount} فصول`
    : `${chapterCount} ch.`;

  if (layout === 'horizontal') {
    return (
      <div
        className={cn(
          'group relative flex flex-col sm:flex-row gap-5 p-5 rounded-2xl bg-surface border border-border/80 shadow-card hover:shadow-card-hover hover:border-accent/50 transition-all duration-300',
          className
        )}
      >
        {/* Compact Book Spine Preview */}
        <div className="sm:w-28 h-36 flex-shrink-0 rounded-xl bg-gradient-to-br from-primary to-secondary p-3 flex flex-col justify-between text-primary-foreground border border-accent/40 shadow-subtle group-hover:scale-102 transition-transform">
          <div className="flex items-center justify-between text-accent">
            <IslamicStarIcon className="w-4 h-4" />
            <BookOpen className="w-3.5 h-3.5 opacity-80" />
          </div>
          <p className="text-xs font-bold font-bengali-heading line-clamp-3 leading-tight">
            {title}
          </p>
          <div className="text-[10px] text-accent/90 truncate">{author}</div>
        </div>

        {/* Content Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <Badge variant="accent" size="sm">
                {category}
              </Badge>
              <button
                type="button"
                onClick={handleBookmarkClick}
                className={cn(
                  'p-1.5 rounded-lg transition-colors',
                  bookmarked
                    ? 'text-accent-dark bg-accent/15'
                    : 'text-text-muted hover:text-primary hover:bg-surface-muted'
                )}
                aria-label="Toggle Bookmark"
              >
                <Bookmark className={cn('w-4 h-4', bookmarked && 'fill-current')} />
              </button>
            </div>

            <Link href={`/${lang}/ebooks/${slug}`}>
              <h3 className="text-lg font-bold font-bengali-heading text-primary dark:text-background group-hover:text-secondary transition-colors line-clamp-1">
                {title}
              </h3>
            </Link>
            <p className="text-xs text-text-muted font-medium mt-0.5">{author}</p>

            {description && (
              <p className="text-xs text-text-muted mt-2 line-clamp-2 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-3 mt-3 border-t border-border/50 text-[11px] text-text-muted">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1" title={totalCompiledChapters ? `ডিজিটাল সংস্করণে ${chapterCount}টি প্রস্তুত, মূল কিতাবে ${totalCompiledChapters}টি` : undefined}>
                <Layers className="w-3.5 h-3.5 text-accent-dark" />
                {chapterDisplay}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-accent-dark" />
                {readingTimeMins} {lang === 'bn' ? 'মি.' : 'min'}
              </span>
            </div>

            <Link href={`/${lang}/read/${slug}`}>
              <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 font-semibold text-primary">
                <span>{lang === 'bn' ? 'পড়ুন' : lang === 'ar' ? 'اقرأ' : 'Read'}</span>
                <ArrowIcon className="w-3 h-3" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Vertical Card (Default)
  return (
    <div
      className={cn(
        'group relative flex flex-col justify-between rounded-2xl bg-surface border border-border/80 shadow-card hover:shadow-card-hover hover:border-accent/50 transition-all duration-300 overflow-hidden',
        className
      )}
    >
      {/* Decorative Book Artwork Top Area */}
      <div className="relative h-44 bg-gradient-to-br from-primary via-primary-light to-secondary p-5 flex flex-col justify-between text-primary-foreground overflow-hidden">
        {/* Subtle Background Geometric Watermark */}
        <div className="absolute inset-0 bg-islamic-stars opacity-40 pointer-events-none" />

        {/* Top Badges & Bookmark */}
        <div className="relative z-10 flex items-center justify-between">
          <Badge variant="accent" size="sm" className="bg-surface/90 text-primary border-accent/30 backdrop-blur-sm">
            {category}
          </Badge>

          <button
            type="button"
            onClick={handleBookmarkClick}
            className={cn(
              'p-2 rounded-xl backdrop-blur-md transition-all duration-200 shadow-subtle',
              bookmarked
                ? 'bg-accent text-primary'
                : 'bg-primary-dark/60 text-primary-foreground hover:bg-primary-dark'
            )}
            aria-label="Toggle Bookmark"
          >
            <Bookmark className={cn('w-4 h-4', bookmarked && 'fill-current')} />
          </button>
        </div>

        {/* Center Title Display on Cover */}
        <div className="relative z-10 my-auto text-center px-3">
          <div className="inline-block p-1 mb-1">
            <IslamicStarIcon className="w-5 h-5 text-accent mx-auto" />
          </div>
          <h4 className="text-lg md:text-xl font-bold font-bengali-heading leading-tight text-background line-clamp-2">
            {title}
          </h4>
        </div>

        {/* Bottom Ribbon / Verified Stamp */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-accent/90 pt-1 border-t border-accent/20">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-accent" />
            <span className="truncate max-w-[160px]">{verifiedSource}</span>
          </span>
          <span className="font-mono text-[10px]">{chapterDisplay}</span>
        </div>
      </div>

      {/* Progress Bar (Optional, for Continuing Reading) */}
      {typeof progressPercentage === 'number' && (
        <div className="h-1 w-full bg-border">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      )}

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/${lang}/ebooks/${slug}`}>
            <h3 className="text-lg font-bold font-bengali-heading text-primary dark:text-background group-hover:text-secondary transition-colors line-clamp-1">
              {title}
            </h3>
          </Link>
          <p className="text-xs text-text-muted font-medium mt-1">{author}</p>

          {description && (
            <p className="text-xs text-text-muted mt-2.5 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Metadata Footer & CTA */}
        <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-text-muted">
            <span className="flex items-center gap-1" title={totalCompiledChapters ? `ডিজিটাল সংস্করণে ${chapterCount}টি প্রস্তুত, মূল কিতাবে ${totalCompiledChapters}টি` : undefined}>
              <Layers className="w-3.5 h-3.5 text-accent-dark" />
              <span>{chapterDisplay}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-accent-dark" />
              <span>{readingTimeMins} {lang === 'bn' ? 'মি.' : 'min'}</span>
            </span>
          </div>

          <Link href={`/${lang}/read/${slug}`}>
            <Button variant="primary" size="sm" className="gap-1.5 h-8">
              <span>{lang === 'bn' ? 'পড়ুন' : lang === 'ar' ? 'اقرأ' : 'Read'}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
