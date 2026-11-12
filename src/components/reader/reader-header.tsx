'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, ArrowRight, ListFilter, Sliders, Search, 
  Maximize, Minimize, Bookmark, Share2, BookOpen 
} from 'lucide-react';
import { IslamicStarIcon } from '@/components/ui/decorative';

interface ReaderHeaderProps {
  locale: string;
  bookSlug: string;
  bookTitle: string;
  chapterTitle: string;
  chapterNumber: number;
  totalChapters: number;
  progressPercentage: number;
  isBookmarked: boolean;
  isFullscreen: boolean;
  onToggleTOC: () => void;
  onToggleSettings: () => void;
  onToggleSearch: () => void;
  onToggleFullscreen: () => void;
  onToggleBookmark: () => void;
  isRTL?: boolean;
}

export const ReaderHeader: React.FC<ReaderHeaderProps> = ({
  locale,
  bookSlug,
  bookTitle,
  chapterTitle,
  chapterNumber,
  totalChapters,
  progressPercentage,
  isBookmarked,
  isFullscreen,
  onToggleTOC,
  onToggleSettings,
  onToggleSearch,
  onToggleFullscreen,
  onToggleBookmark,
  isRTL = false,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-border transition-colors">
      {/* Top Reading Progress Bar */}
      <div className="w-full bg-border/50 h-1">
        <div
          className="bg-accent h-1 transition-all duration-150 ease-out"
          style={{ width: `${Math.min(Math.max(progressPercentage, 0), 100)}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progressPercentage)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Left: Back & TOC Trigger */}
        <div className="flex items-center gap-2">
          <Link
            href={`/${locale}/ebooks/${bookSlug}`}
            className="p-2 rounded-xl text-text-muted hover:text-primary hover:bg-surface-muted transition-colors"
            title="কিতাবের বিবরণে ফিরে যান"
          >
            <ArrowLeft className="w-5 h-5 rtl:rotate-180" />
          </Link>

          <button
            type="button"
            onClick={onToggleTOC}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border/80 hover:border-accent text-xs font-semibold text-primary hover:bg-surface-muted transition-colors shadow-subtle"
            aria-label="সূচিপত্র খুলুন"
          >
            <ListFilter className="w-4 h-4 text-accent-dark" />
            <span className="hidden sm:inline">সূচিপত্র</span>
            <span className="text-[11px] font-mono opacity-60">
              ({chapterNumber}/{totalChapters})
            </span>
          </button>
        </div>

        {/* Center: Active Title (Truncated on small screens) */}
        <div className="text-center px-2 flex-1 min-w-0 max-w-xl hidden md:block">
          <p className="text-xs text-text-muted truncate font-medium">
            {bookTitle}
          </p>
          <h2 className="text-sm font-bold font-bengali-heading text-primary dark:text-background truncate -mt-0.5">
            {chapterTitle}
          </h2>
        </div>

        {/* Right: Actions (Search, Bookmark, Settings, Fullscreen) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Search in Book */}
          <button
            type="button"
            onClick={onToggleSearch}
            className="p-2 rounded-xl text-text-muted hover:text-primary hover:bg-surface-muted transition-colors"
            title="কিতাবে অনুসন্ধান করুন"
            aria-label="Search within book"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Bookmark Chapter */}
          <button
            type="button"
            onClick={onToggleBookmark}
            className={`p-2 rounded-xl transition-colors ${
              isBookmarked
                ? 'bg-accent/20 text-accent-dark font-bold'
                : 'text-text-muted hover:text-primary hover:bg-surface-muted'
            }`}
            title={isBookmarked ? 'বুকমার্ক সংরক্ষিত' : 'অধ্যায় বুকমার্ক করুন'}
            aria-label="Toggle Bookmark"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={onToggleFullscreen}
            className="hidden sm:block p-2 rounded-xl text-text-muted hover:text-primary hover:bg-surface-muted transition-colors"
            title={isFullscreen ? 'ফুলস্ক্রিন থেকে প্রস্থান' : 'ফুলস্ক্রিন ভিউ'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Settings Panel Toggle */}
          <button
            type="button"
            onClick={onToggleSettings}
            className="p-2 rounded-xl text-primary bg-surface-muted hover:bg-accent/20 hover:text-accent-dark transition-colors border border-border/80 shadow-subtle"
            title="পড়ার সেটিংস (ফন্ট, থিম)"
            aria-label="Reader Settings"
          >
            <Sliders className="w-4 h-4 text-accent-dark" />
          </button>
        </div>
      </div>
    </header>
  );
};
