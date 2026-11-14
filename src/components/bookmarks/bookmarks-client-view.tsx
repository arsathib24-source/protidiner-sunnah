'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bookmark, BookOpen, Trash2, ArrowRight, ExternalLink, 
  Clock, CheckCircle, Sparkles, AlertCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CLASSICAL_BOOKS } from '@/lib/data/books';
import { VERIFIED_READER_BOOKS } from '@/lib/data/reader-content';

interface SavedBookmarkItem {
  id: string;
  bookSlug: string;
  bookTitle: string;
  bookAuthor: string;
  chapterNumber: number;
  chapterTitle: string;
  paragraphId?: string;
  snippet?: string;
  savedAt: string;
}

interface ReadingProgressItem {
  bookSlug: string;
  bookTitle: string;
  bookAuthor: string;
  chapterNumber: number;
  chapterTitle: string;
  scrollPercentage: number;
  lastReadAt: string;
}

interface BookmarksClientViewProps {
  locale: 'bn' | 'ar' | 'en';
}

export const BookmarksClientView: React.FC<BookmarksClientViewProps> = ({ locale }) => {
  const [bookmarks, setBookmarks] = useState<SavedBookmarkItem[]>([]);
  const [readingList, setReadingList] = useState<ReadingProgressItem[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'bookmarks' | 'progress'>('all');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const loadedBookmarks: SavedBookmarkItem[] = [];
      const loadedProgress: ReadingProgressItem[] = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;

        // Check for bookmarked chapters
        if (key.startsWith('bm_chapters_')) {
          const slug = key.replace('bm_chapters_', '');
          const book = CLASSICAL_BOOKS.find((b) => b.slug === slug);
          const readerBook = VERIFIED_READER_BOOKS[slug];
          const raw = localStorage.getItem(key);
          if (raw) {
            try {
              const chapterNums: number[] = JSON.parse(raw);
              chapterNums.forEach((num) => {
                const ch = book?.chapters.find((c) => c.number === num);
                const title = book ? (book.title[locale] || book.title.bn) : slug;
                const author = book ? (book.author[locale] || book.author.bn) : '';
                const chTitle = ch ? (ch.title[locale] || ch.title.bn) : `অধ্যায় ${num}`;
                loadedBookmarks.push({
                  id: `ch-${slug}-${num}`,
                  bookSlug: slug,
                  bookTitle: title,
                  bookAuthor: author,
                  chapterNumber: num,
                  chapterTitle: chTitle,
                  savedAt: new Date().toLocaleDateString(locale === 'bn' ? 'bn-BD' : 'en-US'),
                });
              });
            } catch (e) {}
          }
        }

        // Check for bookmarked paragraphs
        if (key.startsWith('bm_paragraphs_')) {
          const slug = key.replace('bm_paragraphs_', '');
          const book = CLASSICAL_BOOKS.find((b) => b.slug === slug);
          const readerBook = VERIFIED_READER_BOOKS[slug];
          const raw = localStorage.getItem(key);
          if (raw) {
            try {
              const paragraphIds: string[] = JSON.parse(raw);
              paragraphIds.forEach((pid) => {
                let snippet = '';
                let chapterNum = 1;
                let chapterTitle = 'অধ্যায় ১';

                if (readerBook) {
                  for (const ch of readerBook.chapters) {
                    const p = ch.paragraphs.find((para) => para.id === pid);
                    if (p) {
                      chapterNum = ch.number;
                      chapterTitle = ch.title[locale] || ch.title.bn;
                      snippet = p.bengali?.slice(0, 160) || p.arabic?.slice(0, 160) || '';
                      break;
                    }
                  }
                }

                const title = book ? (book.title[locale] || book.title.bn) : slug;
                const author = book ? (book.author[locale] || book.author.bn) : '';

                loadedBookmarks.push({
                  id: `p-${slug}-${pid}`,
                  bookSlug: slug,
                  bookTitle: title,
                  bookAuthor: author,
                  chapterNumber: chapterNum,
                  chapterTitle: chapterTitle,
                  paragraphId: pid,
                  snippet: snippet ? `${snippet}...` : undefined,
                  savedAt: new Date().toLocaleDateString(locale === 'bn' ? 'bn-BD' : 'en-US'),
                });
              });
            } catch (e) {}
          }
        }

        // Check for reading progress
        if (key.startsWith('progress_')) {
          const slug = key.replace('progress_', '');
          const book = CLASSICAL_BOOKS.find((b) => b.slug === slug);
          const raw = localStorage.getItem(key);
          if (raw) {
            try {
              const data = JSON.parse(raw);
              const title = book ? (book.title[locale] || book.title.bn) : slug;
              const author = book ? (book.author[locale] || book.author.bn) : '';
              const ch = book?.chapters.find((c) => c.number === data.chapterNumber);
              const chTitle = ch ? (ch.title[locale] || ch.title.bn) : `অধ্যায় ${data.chapterNumber || 1}`;

              loadedProgress.push({
                bookSlug: slug,
                bookTitle: title,
                bookAuthor: author,
                chapterNumber: data.chapterNumber || 1,
                chapterTitle: chTitle,
                scrollPercentage: Math.round(data.scrollPercentage || 0),
                lastReadAt: data.lastReadAt ? new Date(data.lastReadAt).toLocaleDateString(locale === 'bn' ? 'bn-BD' : 'en-US') : 'সম্প্রতি',
              });
            } catch (e) {}
          }
        }
      }

      setBookmarks(loadedBookmarks);
      setReadingList(loadedProgress);
    } catch (e) {
      console.warn('Failed to load local bookmarks:', e);
    } finally {
      setIsLoaded(true);
    }
  }, [locale]);

  const removeBookmark = (item: SavedBookmarkItem) => {
    try {
      if (item.paragraphId) {
        const key = `bm_paragraphs_${item.bookSlug}`;
        const raw = localStorage.getItem(key);
        if (raw) {
          const arr: string[] = JSON.parse(raw);
          const filtered = arr.filter((id) => id !== item.paragraphId);
          localStorage.setItem(key, JSON.stringify(filtered));
        }
      } else {
        const key = `bm_chapters_${item.bookSlug}`;
        const raw = localStorage.getItem(key);
        if (raw) {
          const arr: number[] = JSON.parse(raw);
          const filtered = arr.filter((num) => num !== item.chapterNumber);
          localStorage.setItem(key, JSON.stringify(filtered));
        }
      }
      setBookmarks((prev) => prev.filter((b) => b.id !== item.id));
    } catch (e) {
      console.error('Error removing bookmark:', e);
    }
  };

  const clearAllBookmarks = () => {
    if (!confirm(locale === 'bn' ? 'আপনি কি নিশ্চিত সব সংরক্ষিত বুকমার্ক মুছে ফেলতে চান?' : 'Are you sure you want to clear all bookmarks?')) {
      return;
    }
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && (k.startsWith('bm_chapters_') || k.startsWith('bm_paragraphs_'))) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
      setBookmarks([]);
    } catch (e) {}
  };

  if (!isLoaded) {
    return (
      <div className="py-20 text-center text-text-muted">
        <p className="animate-pulse">{locale === 'bn' ? 'সংরক্ষিত তথ্য লোড হচ্ছে...' : 'Loading saved items...'}</p>
      </div>
    );
  }

  const hasAnyItems = bookmarks.length > 0 || readingList.length > 0;

  return (
    <div className="space-y-8">
      {/* Tab Filter & Actions Bar */}
      {hasAnyItems && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface p-3.5 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'all'
                  ? 'bg-primary text-background shadow-sm'
                  : 'text-text-muted hover:text-primary hover:bg-muted/40'
              }`}
            >
              {locale === 'bn' ? `সব (${bookmarks.length + readingList.length})` : `All (${bookmarks.length + readingList.length})`}
            </button>
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'bookmarks'
                  ? 'bg-primary text-background shadow-sm'
                  : 'text-text-muted hover:text-primary hover:bg-muted/40'
              }`}
            >
              {locale === 'bn' ? `বুকমার্ক (${bookmarks.length})` : `Bookmarks (${bookmarks.length})`}
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'progress'
                  ? 'bg-primary text-background shadow-sm'
                  : 'text-text-muted hover:text-primary hover:bg-muted/40'
              }`}
            >
              {locale === 'bn' ? `পড়ার অগ্রগতি (${readingList.length})` : `Progress (${readingList.length})`}
            </button>
          </div>

          {bookmarks.length > 0 && (
            <button
              onClick={clearAllBookmarks}
              className="text-xs text-destructive hover:underline flex items-center gap-1.5 px-3 py-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{locale === 'bn' ? 'সব মুছে ফেলুন' : 'Clear All'}</span>
            </button>
          )}
        </div>
      )}

      {/* Empty State */}
      {!hasAnyItems && (
        <div className="text-center py-20 bg-surface rounded-3xl border border-border/80 shadow-card p-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-accent/15 text-accent-dark flex items-center justify-center mx-auto">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold font-bengali-heading text-primary">
            {locale === 'bn' ? 'বর্তমানে কোনো বুকমার্ক সংরক্ষিত নেই' : locale === 'ar' ? 'لا توجد إشارات مرجعية محفوظة حاليًا' : 'No Bookmarks Saved Yet'}
          </h3>
          <p className="text-sm text-text-muted max-w-md mx-auto">
            {locale === 'bn'
              ? 'যেকোনো কিতাব পড়ার সময় ডানপাশের বুকমার্ক রিবনে ক্লিক করে আপনার গুরুত্বপূর্ণ অংশগুলো এখানে সহজে সংরক্ষণ করে রাখতে পারেন।'
              : locale === 'ar'
              ? 'أثناء تصفح الكتب وقراءتها، اضغط على زر الإشارة المرجعية لحفظ الفقرة التي وصلت إليها بسهولة.'
              : 'While reading any ebook, click the bookmark icon next to any paragraph to save your favorite passages here.'}
          </p>
          <div className="pt-2">
            <Link href={`/${locale}/ebooks`}>
              <Button variant="primary" size="md">
                <BookOpen className="w-4 h-4 me-2" />
                <span>{locale === 'bn' ? 'লাইব্রেরিতে বই খুঁজুন' : locale === 'ar' ? 'تصفح المكتبة' : 'Browse Ebook Library'}</span>
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Reading Progress Section */}
      {(activeTab === 'all' || activeTab === 'progress') && readingList.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-text-muted uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent" />
            <span>{locale === 'bn' ? 'সাম্প্রতিক পড়ার অগ্রগতি' : 'Recent Reading Progress'}</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {readingList.map((prog) => (
              <div
                key={prog.bookSlug}
                className="bg-surface p-5 rounded-2xl border border-border hover:border-primary/40 transition-shadow shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge variant="secondary" size="sm">
                      {prog.chapterTitle}
                    </Badge>
                    <span className="text-xs text-text-muted">{prog.lastReadAt}</span>
                  </div>
                  <h5 className="font-bold text-base text-primary mb-1 line-clamp-1">
                    {prog.bookTitle}
                  </h5>
                  <p className="text-xs text-text-muted mb-4">{prog.bookAuthor}</p>

                  {/* Progress Bar */}
                  <div className="space-y-1 mb-4">
                    <div className="flex justify-between text-xs font-semibold text-text-muted">
                      <span>{locale === 'bn' ? 'অগ্রগতি' : 'Progress'}</span>
                      <span className="text-primary">{prog.scrollPercentage}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-muted/60 overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full transition-all duration-500"
                        style={{ width: `${prog.scrollPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                <Link
                  href={`/${locale}/read/${prog.bookSlug}?chapter=${prog.chapterNumber}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary text-background font-semibold text-xs hover:bg-primary-hover transition-colors"
                >
                  <span>{locale === 'bn' ? 'পড়া চালিয়ে যান' : 'Continue Reading'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bookmarked Items Section */}
      {(activeTab === 'all' || activeTab === 'bookmarks') && bookmarks.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-text-muted uppercase tracking-wider flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-accent" />
            <span>{locale === 'bn' ? 'সংরক্ষিত অনুচ্ছেদ ও অধ্যায়' : 'Saved Paragraphs & Chapters'}</span>
          </h4>

          <div className="space-y-3">
            {bookmarks.map((bm) => (
              <div
                key={bm.id}
                className="bg-surface p-5 rounded-2xl border border-border hover:border-primary/30 transition-all shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" size="sm">
                      {bm.bookTitle}
                    </Badge>
                    <span className="text-xs text-text-muted">• {bm.chapterTitle}</span>
                  </div>

                  {bm.snippet ? (
                    <blockquote className="text-xs text-foreground/80 italic border-s-2 border-accent/60 ps-3 py-1 my-1">
                      &quot;{bm.snippet}&quot;
                    </blockquote>
                  ) : (
                    <p className="text-xs text-text-muted">{bm.bookAuthor}</p>
                  )}

                  <span className="text-[11px] text-text-muted block">{bm.savedAt}</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
                  <button
                    onClick={() => removeBookmark(bm)}
                    className="p-2.5 rounded-xl text-text-muted hover:text-destructive hover:bg-destructive/10 transition-colors"
                    title={locale === 'bn' ? 'মুছে ফেলুন' : 'Remove'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <Link
                    href={`/${locale}/read/${bm.bookSlug}?chapter=${bm.chapterNumber}${bm.paragraphId ? `#${bm.paragraphId}` : ''}`}
                    className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-secondary text-primary font-semibold text-xs hover:bg-secondary-hover transition-colors"
                  >
                    <span>{locale === 'bn' ? 'দেখুন' : 'View'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
