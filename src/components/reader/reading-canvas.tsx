'use client';

import React, { useState } from 'react';
import { 
  Copy, Check, Bookmark, Share2, BookOpen, Clock, 
  ArrowLeft, ArrowRight, ShieldCheck, Sparkles 
} from 'lucide-react';
import { ReaderChapter, ReaderPreferences, ContentParagraph } from '@/types/reader';
import { IslamicStarIcon, ArabesqueDivider } from '@/components/ui/decorative';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ReadingCanvasProps {
  chapter: ReaderChapter;
  preferences: ReaderPreferences;
  bookTitle: string;
  verifiedSource: string;
  hasPrevChapter: boolean;
  hasNextChapter: boolean;
  prevChapterTitle?: string;
  nextChapterTitle?: string;
  onPrevChapter: () => void;
  onNextChapter: () => void;
  onToggleParagraphBookmark: (paragraphId: string, snippet: string) => void;
  bookmarkedParagraphs: string[];
  locale: string;
  isRTL?: boolean;
}

export const ReadingCanvas: React.FC<ReadingCanvasProps> = ({
  chapter,
  preferences,
  bookTitle,
  verifiedSource,
  hasPrevChapter,
  hasNextChapter,
  prevChapterTitle,
  nextChapterTitle,
  onPrevChapter,
  onNextChapter,
  onToggleParagraphBookmark,
  bookmarkedParagraphs,
  locale,
  isRTL = false,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyParagraph = (p: ContentParagraph) => {
    const text = [
      p.arabic ? `${p.arabic}\n` : '',
      p.bengali ? `${p.bengali}\n` : '',
      p.english ? `${p.english}\n` : '',
      p.source ? `সূত্র: ${p.source}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    navigator.clipboard.writeText(text);
    setCopiedId(p.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Determine line height class
  const getLineHeightClass = () => {
    switch (preferences.lineHeight) {
      case 'normal':
        return 'leading-[1.65]';
      case 'loose':
        return 'leading-[2.25]';
      case 'relaxed':
      default:
        return 'leading-[1.95]';
    }
  };

  // Determine width class
  const getWidthClass = () => {
    switch (preferences.readerWidth) {
      case 'compact':
        return 'max-w-2xl';
      case 'wide':
        return 'max-w-4xl';
      case 'standard':
      default:
        return 'max-w-3xl';
    }
  };

  const ArrowPrev = isRTL ? ArrowRight : ArrowLeft;
  const ArrowNext = isRTL ? ArrowLeft : ArrowRight;

  return (
    <article
      className={`mx-auto px-4 sm:px-8 py-10 md:py-16 transition-all duration-200 ${getWidthClass()}`}
      style={{ fontSize: `${preferences.fontSize}px` }}
    >
      {/* Chapter Title & Header */}
      <header className="text-center space-y-4 pb-8 mb-10 border-b border-current/15">
        <div className="flex items-center justify-center gap-2">
          <Badge variant="accent" size="sm">
            <IslamicStarIcon className="w-3.5 h-3.5" />
            <span>পরিচ্ছেদ #{chapter.number}</span>
          </Badge>
          <span className="text-xs opacity-70 flex items-center gap-1 font-mono">
            <Clock className="w-3 h-3 text-accent-dark" />
            <span>{chapter.durationMins} মিনিট পাঠ</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold font-bengali-heading leading-tight tracking-tight">
          {chapter.title.bn}
        </h1>

        {chapter.title.ar && (
          <p
            className={`text-xl sm:text-2xl text-accent-dark font-medium leading-relaxed ${preferences.arabicFont}`}
            dir="rtl"
          >
            {chapter.title.ar}
          </p>
        )}

        {chapter.subtitle && (
          <p className="text-sm opacity-80 max-w-xl mx-auto italic font-bengali">
            {chapter.subtitle.bn}
          </p>
        )}

        <div className="pt-2">
          <ArabesqueDivider variant="gold" />
        </div>
      </header>

      {/* Main Paragraphs Flow */}
      <div className="space-y-10">
        {chapter.paragraphs.map((p, index) => {
          const isParagraphBookmarked = bookmarkedParagraphs.includes(p.id);

          return (
            <section
              key={p.id}
              id={p.id}
              className="group relative p-6 sm:p-8 rounded-3xl bg-surface/80 border border-current/10 shadow-subtle hover:shadow-card hover:border-accent/40 transition-all duration-200"
            >
              {/* Paragraph Ribbon & Action Buttons (Hover Toolbar) */}
              <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 flex items-center gap-1.5 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Copy Paragraph Button */}
                <button
                  type="button"
                  onClick={() => handleCopyParagraph(p)}
                  className="p-1.5 rounded-lg bg-surface hover:bg-surface-muted text-text-muted hover:text-primary transition-colors border border-border shadow-subtle"
                  title="অনুচ্ছেদ কপি করুন"
                >
                  {copiedId === p.id ? (
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>

                {/* Bookmark Paragraph Ribbon */}
                <button
                  type="button"
                  onClick={() =>
                    onToggleParagraphBookmark(
                      p.id,
                      p.bengali?.slice(0, 80) || p.arabic?.slice(0, 80) || ''
                    )
                  }
                  className={`p-1.5 rounded-lg transition-colors border border-border shadow-subtle ${
                    isParagraphBookmarked
                      ? 'bg-accent text-primary'
                      : 'bg-surface hover:bg-surface-muted text-text-muted hover:text-primary'
                  }`}
                  title={
                    isParagraphBookmarked
                      ? 'বুকমার্ক বাতিল করুন'
                      : 'এই অনুচ্ছেদটি বুকমার্ক করুন'
                  }
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      isParagraphBookmarked ? 'fill-current' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Type Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-accent/15 text-accent-dark font-bold">
                  {p.type === 'quran'
                    ? 'কুরআনিক আয়াত'
                    : p.type === 'hadith'
                    ? 'সহিহ হাদিস'
                    : 'ব্যাখ্যা ও শিক্ষা'}
                </span>
                {p.grade && (
                  <span className="text-[10px] font-semibold text-text-muted flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-accent-dark" />
                    <span>{p.grade}</span>
                  </span>
                )}
              </div>

              {/* 1. SEPARATE ARABIC TEXT BLOCK WITH TASHKEEL (dir="rtl") */}
              {p.arabic && preferences.displayLanguage !== 'bn' && preferences.displayLanguage !== 'en' && (
                <div
                  dir="rtl"
                  className={`mb-6 p-5 sm:p-7 rounded-2xl bg-surface-muted/50 border border-border text-right ${preferences.arabicFont}`}
                >
                  <p
                    className="leading-[2.1] tracking-wide text-primary dark:text-accent font-medium select-text"
                    style={{ fontSize: `${Math.round(preferences.fontSize * 1.25)}px` }}
                  >
                    {p.arabic}
                  </p>
                </div>
              )}

              {/* 2. SEPARATE BENGALI TRANSLATION BLOCK */}
              {p.bengali && preferences.displayLanguage !== 'ar' && preferences.displayLanguage !== 'en' && (
                <div
                  className={`space-y-3 font-bengali ${getLineHeightClass()} ${
                    preferences.textAlign === 'justify' ? 'text-justify' : 'text-left rtl:text-right'
                  }`}
                >
                  <p className="font-normal select-text">
                    {p.bengali}
                  </p>
                </div>
              )}

              {/* 3. ENGLISH TRANSLATION (If enabled) */}
              {p.english && (preferences.displayLanguage === 'en' || preferences.displayLanguage === 'all') && (
                <div className={`mt-4 pt-3 border-t border-current/10 text-sm font-english opacity-85 leading-relaxed`}>
                  <p className="italic">{p.english}</p>
                </div>
              )}

              {/* Source Reference Citation */}
              {p.source && (
                <footer className="mt-5 pt-3 border-t border-current/10 flex items-center justify-between text-xs opacity-75 font-mono">
                  <span className="truncate">সূত্র: {p.source}</span>
                  <span className="text-[10px] opacity-60">#{p.id}</span>
                </footer>
              )}
            </section>
          );
        })}
      </div>

      {/* Chapter Bottom Navigation Bar */}
      <nav className="mt-16 pt-10 border-t-2 border-current/15 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Previous Chapter */}
        <div className="w-full sm:w-auto">
          {hasPrevChapter ? (
            <button
              onClick={onPrevChapter}
              className="w-full sm:w-auto flex items-center gap-3 p-4 rounded-2xl border border-border bg-surface hover:border-accent hover:bg-surface-muted transition-all text-left rtl:text-right shadow-card group"
            >
              <ArrowPrev className="w-5 h-5 text-accent-dark flex-shrink-0 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
              <div>
                <span className="text-[10px] uppercase font-bold text-text-muted block">
                  পূর্ববর্তী অধ্যায়
                </span>
                <span className="text-sm font-bold font-bengali-heading text-primary line-clamp-1">
                  {prevChapterTitle}
                </span>
              </div>
            </button>
          ) : (
            <div className="text-xs text-text-muted italic px-2">
              এটি কিতাবের প্রারম্ভিক অধ্যায়
            </div>
          )}
        </div>

        {/* Next Chapter */}
        <div className="w-full sm:w-auto text-right rtl:text-left">
          {hasNextChapter ? (
            <button
              onClick={onNextChapter}
              className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 p-4 rounded-2xl border border-border bg-surface hover:border-accent hover:bg-surface-muted transition-all text-right rtl:text-left shadow-card group"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-text-muted block">
                  পরবর্তী অধ্যায়
                </span>
                <span className="text-sm font-bold font-bengali-heading text-primary line-clamp-1">
                  {nextChapterTitle}
                </span>
              </div>
              <ArrowNext className="w-5 h-5 text-accent-dark flex-shrink-0 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </button>
          ) : (
            <div className="text-xs text-text-muted italic px-2">
              আপনি কিতাবের শেষ পরিচ্ছেদে পৌঁছেছেন
            </div>
          )}
        </div>
      </nav>
    </article>
  );
};
