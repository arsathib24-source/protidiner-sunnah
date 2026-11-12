'use client';

import React, { useState } from 'react';
import { X, Search, Clock, CheckCircle2, BookOpen } from 'lucide-react';
import { ReaderChapter } from '@/types/reader';
import { IslamicStarIcon } from '@/components/ui/decorative';

interface ReaderTOCSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  chapters: ReaderChapter[];
  activeChapterNumber: number;
  onSelectChapter: (chapterNumber: number) => void;
  locale: string;
}

export const ReaderTOCSidebar: React.FC<ReaderTOCSidebarProps> = ({
  isOpen,
  onClose,
  chapters,
  activeChapterNumber,
  onSelectChapter,
  locale,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  if (!isOpen) return null;

  const filteredChapters = chapters.filter((c) => {
    const q = filterQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.title.bn.toLowerCase().includes(q) ||
      c.title.ar.toLowerCase().includes(q) ||
      c.title.en.toLowerCase().includes(q) ||
      String(c.number).includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 max-w-sm w-full bg-surface shadow-2xl border-r rtl:border-r-0 rtl:border-l border-border flex flex-col z-10 animate-in slide-in-from-left rtl:slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent/15 text-accent-dark flex items-center justify-center font-bold">
              <IslamicStarIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold font-bengali-heading text-primary dark:text-background">
                সূচিপত্র (Table of Contents)
              </h3>
              <p className="text-[11px] text-text-muted">
                মোট {chapters.length} টি পরিচ্ছেদ
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-muted hover:text-primary hover:bg-surface-muted transition-colors"
            aria-label="সূচিপত্র বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Chapter */}
        <div className="p-4 border-b border-border/70">
          <div className="relative">
            <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="অধ্যায়ের শিরোনাম দিয়ে খুঁজুন..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full h-10 ps-9 pe-3 text-xs rounded-xl bg-surface-muted border border-border text-foreground focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        {/* Chapters List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {filteredChapters.map((chapter) => {
            const isActive = chapter.number === activeChapterNumber;

            return (
              <button
                key={chapter.slug}
                onClick={() => {
                  onSelectChapter(chapter.number);
                  onClose();
                }}
                className={`w-full text-left rtl:text-right p-3.5 rounded-2xl transition-all duration-150 flex items-start justify-between gap-3 ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-bold shadow-subtle border border-accent/40'
                    : 'hover:bg-surface-muted text-foreground border border-transparent'
                }`}
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isActive
                          ? 'bg-accent text-primary font-bold'
                          : 'bg-surface-muted text-text-muted'
                      }`}
                    >
                      #{chapter.number}
                    </span>
                    {isActive && (
                      <span className="text-[10px] text-accent font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-accent" />
                        <span>বর্তমানে পাঠরত</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold font-bengali-heading line-clamp-1 leading-snug">
                    {chapter.title.bn}
                  </h4>
                  <p
                    className={`text-xs font-arabic line-clamp-1 ${
                      isActive ? 'text-accent-light' : 'text-accent-dark'
                    }`}
                    dir="rtl"
                  >
                    {chapter.title.ar}
                  </p>
                </div>

                <div
                  className={`flex items-center gap-1 text-[11px] flex-shrink-0 pt-0.5 ${
                    isActive ? 'text-accent-light' : 'text-text-muted'
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  <span>{chapter.durationMins} মি.</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
