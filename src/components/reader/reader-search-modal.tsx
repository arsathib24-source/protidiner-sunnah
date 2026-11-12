'use client';

import React, { useState } from 'react';
import { X, Search, BookOpen, ArrowRight, ArrowLeft } from 'lucide-react';
import { ReaderChapter } from '@/types/reader';

interface ReaderSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapters: ReaderChapter[];
  onSelectResult: (chapterNumber: number, paragraphId?: string) => void;
  locale: string;
  isRTL?: boolean;
}

export const ReaderSearchModal: React.FC<ReaderSearchModalProps> = ({
  isOpen,
  onClose,
  chapters,
  onSelectResult,
  locale,
  isRTL = false,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  interface SearchResult {
    chapterNumber: number;
    chapterTitle: string;
    paragraphId: string;
    text: string;
    type: string;
  }

  const results: SearchResult[] = [];
  const q = query.toLowerCase().trim();

  if (q.length >= 2) {
    chapters.forEach((chapter) => {
      chapter.paragraphs.forEach((p) => {
        const arabicMatch = p.arabic?.toLowerCase().includes(q);
        const bengaliMatch = p.bengali?.toLowerCase().includes(q);
        const englishMatch = p.english?.toLowerCase().includes(q);
        const sourceMatch = p.source?.toLowerCase().includes(q);

        if (arabicMatch || bengaliMatch || englishMatch || sourceMatch) {
          results.push({
            chapterNumber: chapter.number,
            chapterTitle: chapter.title.bn,
            paragraphId: p.id,
            text: p.bengali || p.english || p.arabic || '',
            type: p.type,
          });
        }
      });
    });
  }

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-start justify-center p-4 pt-16 sm:pt-24">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-surface rounded-3xl shadow-2xl border border-border p-6 space-y-4 z-10 max-h-[80vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <Search className="w-5 h-5 text-accent-dark flex-shrink-0" />
          <input
            type="search"
            autoFocus
            placeholder="কিতাবের ভেতরে কোনো শব্দ বা বাক্য খুঁজুন..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm bg-transparent border-0 text-foreground placeholder:text-text-muted focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-text-muted hover:text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto space-y-2 pt-1">
          {query.trim().length < 2 ? (
            <p className="text-center text-xs text-text-muted py-10 font-bengali">
              অনুসন্ধানের জন্য কমপক্ষে ২ অক্ষর লিখুন (যেমন: নিয়ত, ইখলাস, জান্নাত, সালাত)।
            </p>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-text-muted block pb-1">
                {results.length} টি ফলাফল পাওয়া গেছে:
              </span>
              {results.map((res, idx) => (
                <button
                  key={`${res.chapterNumber}-${res.paragraphId}-${idx}`}
                  onClick={() => {
                    onSelectResult(res.chapterNumber, res.paragraphId);
                    onClose();
                  }}
                  className="w-full text-left rtl:text-right p-3.5 rounded-2xl bg-surface-muted/50 hover:bg-surface-muted border border-border/70 hover:border-accent transition-all space-y-1 block"
                >
                  <div className="flex items-center justify-between text-[11px] text-accent-dark font-semibold">
                    <span>অধ্যায় {res.chapterNumber}: {res.chapterTitle}</span>
                    <span className="uppercase text-[10px] font-mono opacity-70">
                      {res.type}
                    </span>
                  </div>
                  <p className="text-xs text-foreground line-clamp-2 leading-relaxed font-bengali">
                    {res.text}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-text-muted space-y-1">
              <p className="text-sm font-bold font-bengali-heading text-primary">
                কোনো ফলাফল পাওয়া যায়নি
              </p>
              <p className="text-xs">বানান পরীক্ষা করুন বা অন্য কোনো সাধারণ শব্দ লিখুন।</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
