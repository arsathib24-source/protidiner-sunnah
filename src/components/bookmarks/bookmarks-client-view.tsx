'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bookmark, BookOpen, Trash2, ArrowRight, ExternalLink, 
  Clock, CheckCircle, Sparkles, FileText, Plus, Edit2, Check 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CLASSICAL_BOOKS } from '@/lib/data/books';
import { VERIFIED_READER_BOOKS } from '@/lib/data/reader-content';
import { SURAH_LIST } from '@/lib/data/quran-data';

interface SavedBookmarkItem {
  id: string;
  type: 'book' | 'quran' | 'hadith' | 'dua';
  typeLabelBn: string;
  title: string;
  subtitle: string;
  snippet?: string;
  href: string;
  savedAt: string;
  rawKey: string;
  itemRef?: any;
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

interface PersonalNoteItem {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

interface BookmarksClientViewProps {
  locale: 'bn' | 'ar' | 'en';
}

export const BookmarksClientView: React.FC<BookmarksClientViewProps> = ({ locale }) => {
  const [bookmarks, setBookmarks] = useState<SavedBookmarkItem[]>([]);
  const [readingList, setReadingList] = useState<ReadingProgressItem[]>([]);
  const [notes, setNotes] = useState<PersonalNoteItem[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'books' | 'quran' | 'progress' | 'notes'>('all');
  const [isLoaded, setIsLoaded] = useState(false);

  // New Note Modal / Inline Form State
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [showNoteForm, setShowNoteForm] = useState(false);

  useEffect(() => {
    // Safety watchdog to prevent endless loading under any browser storage condition
    const watchdogTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 150);

    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        setIsLoaded(true);
        clearTimeout(watchdogTimer);
        return;
      }

      const loadedBookmarks: SavedBookmarkItem[] = [];
      const loadedProgress: ReadingProgressItem[] = [];
      const loadedNotes: PersonalNoteItem[] = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;

        // 1. Quran Ayahs
        if (key.startsWith('bm_quran_')) {
          const surahNum = parseInt(key.replace('bm_quran_', ''), 10);
          const surah = SURAH_LIST.find((s) => s.number === surahNum);
          const raw = localStorage.getItem(key);
          if (raw && surah) {
            try {
              const ayahNums: number[] = JSON.parse(raw);
              ayahNums.forEach((aNum) => {
                loadedBookmarks.push({
                  id: `q-${surahNum}-${aNum}`,
                  type: 'quran',
                  typeLabelBn: 'কুরআন আয়াত',
                  title: `সূরা ${surah.nameBengali}: আয়াত ${aNum}`,
                  subtitle: `${surah.meaningBengali} • পারা ${surah.juzStart}`,
                  snippet: `সূরা ${surah.nameArabic} - আয়াত ${aNum}`,
                  href: `/${locale}/quran/${surah.slug}#ayah-${aNum}`,
                  savedAt: 'সংরক্ষিত',
                  rawKey: key,
                  itemRef: aNum,
                });
              });
            } catch (e) {}
          }
        }

        // 2. Bookmarked Chapters
        if (key.startsWith('bm_chapters_')) {
          const slug = key.replace('bm_chapters_', '');
          const book = CLASSICAL_BOOKS.find((b) => b.slug === slug);
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
                  type: 'book',
                  typeLabelBn: 'ই-বুক অধ্যায়',
                  title: `${title} — ${chTitle}`,
                  subtitle: author,
                  href: `/${locale}/read/${slug}?chapter=${num}`,
                  savedAt: 'সংরক্ষিত',
                  rawKey: key,
                  itemRef: num,
                });
              });
            } catch (e) {}
          }
        }

        // 3. Bookmarked Paragraphs
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
                  type: 'book',
                  typeLabelBn: 'অনুচ্ছেদ',
                  title: `${title} — ${chapterTitle}`,
                  subtitle: author,
                  snippet: snippet ? `${snippet}...` : undefined,
                  href: `/${locale}/read/${slug}?chapter=${chapterNum}#${pid}`,
                  savedAt: 'সংরক্ষিত',
                  rawKey: key,
                  itemRef: pid,
                });
              });
            } catch (e) {}
          }
        }

        // 4. Reading Progress
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

        // 5. Personal Notes
        if (key.startsWith('ps_user_notes_')) {
          const raw = localStorage.getItem(key);
          if (raw) {
            try {
              const noteData = JSON.parse(raw);
              loadedNotes.push(noteData);
            } catch (e) {}
          }
        }
      }

      setBookmarks(loadedBookmarks);
      setReadingList(loadedProgress);
      setNotes(loadedNotes);
    } catch (e) {
      console.warn('LocalStorage access exception:', e);
    } finally {
      setIsLoaded(true);
    }
  }, [locale]);

  const removeBookmark = (item: SavedBookmarkItem) => {
    try {
      const raw = localStorage.getItem(item.rawKey);
      if (raw) {
        const arr: any[] = JSON.parse(raw);
        const filtered = arr.filter((x) => x !== item.itemRef);
        if (filtered.length > 0) {
          localStorage.setItem(item.rawKey, JSON.stringify(filtered));
        } else {
          localStorage.removeItem(item.rawKey);
        }
      }
      setBookmarks((prev) => prev.filter((b) => b.id !== item.id));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;

    const noteItem: PersonalNoteItem = {
      id: `note-${Date.now()}`,
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
      updatedAt: new Date().toLocaleDateString(locale === 'bn' ? 'bn-BD' : 'en-US'),
    };

    try {
      localStorage.setItem(`ps_user_notes_${noteItem.id}`, JSON.stringify(noteItem));
      setNotes((prev) => [noteItem, ...prev]);
      setNewNoteTitle('');
      setNewNoteContent('');
      setShowNoteForm(false);
    } catch (e) {}
  };

  const deleteNote = (noteId: string) => {
    try {
      localStorage.removeItem(`ps_user_notes_${noteId}`);
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
    } catch (e) {}
  };

  if (!isLoaded) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-12 bg-surface rounded-2xl border border-border" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-32 bg-surface rounded-2xl border border-border" />
          <div className="h-32 bg-surface rounded-2xl border border-border" />
        </div>
      </div>
    );
  }

  const filteredBookmarks = bookmarks.filter((b) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'books' && b.type === 'book') return true;
    if (activeTab === 'quran' && b.type === 'quran') return true;
    return false;
  });

  const totalItemsCount = bookmarks.length + readingList.length + notes.length;

  return (
    <div className="space-y-8">
      {/* Tab Filter & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface p-3.5 rounded-2xl border border-border shadow-sm">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'all'
                ? 'bg-primary text-background shadow-sm'
                : 'text-text-muted hover:text-primary hover:bg-muted/40'
            }`}
          >
            {locale === 'bn' ? `সব (${totalItemsCount})` : `All (${totalItemsCount})`}
          </button>
          <button
            onClick={() => setActiveTab('quran')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'quran'
                ? 'bg-primary text-background shadow-sm'
                : 'text-text-muted hover:text-primary hover:bg-muted/40'
            }`}
          >
            {locale === 'bn' ? `কুরআন আয়াত (${bookmarks.filter(b => b.type === 'quran').length})` : 'Quran Ayahs'}
          </button>
          <button
            onClick={() => setActiveTab('books')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'books'
                ? 'bg-primary text-background shadow-sm'
                : 'text-text-muted hover:text-primary hover:bg-muted/40'
            }`}
          >
            {locale === 'bn' ? `ই-বুক (${bookmarks.filter(b => b.type === 'book').length})` : 'Books'}
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'progress'
                ? 'bg-primary text-background shadow-sm'
                : 'text-text-muted hover:text-primary hover:bg-muted/40'
            }`}
          >
            {locale === 'bn' ? `পড়ার অগ্রগতি (${readingList.length})` : 'Progress'}
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'notes'
                ? 'bg-primary text-background shadow-sm'
                : 'text-text-muted hover:text-primary hover:bg-muted/40'
            }`}
          >
            {locale === 'bn' ? `ব্যক্তিগত নোট (${notes.length})` : 'Notes'}
          </button>
        </div>

        <button
          onClick={() => setShowNoteForm(!showNoteForm)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent text-primary font-semibold text-xs hover:bg-accent-hover transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{locale === 'bn' ? 'নোট লিখুন' : 'New Note'}</span>
        </button>
      </div>

      {/* New Note Form */}
      {showNoteForm && (
        <form onSubmit={handleSaveNote} className="bg-surface p-6 rounded-3xl border border-accent/40 shadow-card space-y-4 animate-in fade-in">
          <h4 className="font-bold text-sm text-primary flex items-center gap-2">
            <Edit2 className="w-4 h-4 text-accent" />
            <span>{locale === 'bn' ? 'ইসলামিক অধ্যয়ন নোট সংরক্ষণ করুন' : 'Create Personal Study Note'}</span>
          </h4>
          <div>
            <input
              type="text"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              placeholder={locale === 'bn' ? 'নোটের শিরোনাম (যেমন: নিয়তের শর্তাবলী)' : 'Note Title...'}
              className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-xs focus:border-accent"
              required
            />
          </div>
          <div>
            <textarea
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder={locale === 'bn' ? 'আপনার ব্যক্তিগত গবেষণামূলক বা শিক্ষণীয় নোট লিখুন...' : 'Write your notes...'}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-xs focus:border-accent"
              required
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowNoteForm(false)}
              className="px-4 py-2 rounded-xl text-xs text-text-muted hover:text-foreground"
            >
              বাতিল
            </button>
            <Button type="submit" variant="accent" size="sm" className="font-semibold text-xs">
              নোট সংরক্ষণ করুন
            </Button>
          </div>
        </form>
      )}

      {/* Empty State */}
      {totalItemsCount === 0 && (
        <div className="text-center py-20 bg-surface rounded-3xl border border-border/80 shadow-card p-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-accent/15 text-accent-dark flex items-center justify-center mx-auto">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold font-bengali-heading text-primary">
            {locale === 'bn' ? 'বর্তমানে কোনো আইটেম সংরক্ষিত নেই' : 'Your Personal Library is Empty'}
          </h3>
          <p className="text-sm text-text-muted max-w-md mx-auto leading-relaxed">
            {locale === 'bn'
              ? 'কুরআন তিলাওয়াত বা কিতাব পড়ার সময় বুকমার্ক আইকনে ক্লিক করে প্রিয় আয়াত, হাদিস ও পড়ার অগ্রগতি এখানে সংগ্রহ করে রাখতে পারেন।'
              : 'Save your favorite Quranic verses, authentic hadiths, and ebooks here with a single tap.'}
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Link href={`/${locale}/quran`}>
              <Button variant="primary" size="sm">
                <span>{locale === 'bn' ? 'আল-কুরআন পড়ুন' : 'Read Quran'}</span>
              </Button>
            </Link>
            <Link href={`/${locale}/ebooks`}>
              <Button variant="outline" size="sm">
                <span>{locale === 'bn' ? 'ই-বুক লাইব্রেরি' : 'Browse Ebooks'}</span>
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
            <span>{locale === 'bn' ? 'পড়ার ধারাবাহিক অগ্রগতি' : 'Reading Progress'}</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {readingList.map((prog) => (
              <div
                key={prog.bookSlug}
                className="bg-surface p-5 rounded-2xl border border-border hover:border-primary/40 transition-shadow shadow-sm flex flex-col justify-between"
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
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-primary text-background font-semibold text-xs hover:bg-primary-hover transition-colors"
                >
                  <span>{locale === 'bn' ? 'পড়া চালিয়ে যান' : 'Continue Reading'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Personal Notes Section */}
      {(activeTab === 'all' || activeTab === 'notes') && notes.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-text-muted uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-accent" />
            <span>{locale === 'bn' ? 'ব্যক্তিগত অধ্যয়ন নোট' : 'Personal Study Notes'}</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.map((n) => (
              <div
                key={n.id}
                className="bg-surface p-5 rounded-2xl border border-border shadow-sm flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-border/60">
                    <h5 className="font-bold text-sm text-primary">{n.title}</h5>
                    <button
                      onClick={() => deleteNote(n.id)}
                      className="text-text-muted hover:text-destructive p-1 rounded-lg"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-foreground/85 leading-relaxed pt-2 font-bengali-body">
                    {n.content}
                  </p>
                </div>
                <span className="text-[10px] text-text-muted block text-right font-mono">
                  {n.updatedAt}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bookmarked Items Section */}
      {(activeTab === 'all' || activeTab === 'books' || activeTab === 'quran') && filteredBookmarks.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-text-muted uppercase tracking-wider flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-accent" />
            <span>{locale === 'bn' ? 'সংরক্ষিত আয়াত ও কিতাব' : 'Saved Ayahs & Books'}</span>
          </h4>

          <div className="space-y-3">
            {filteredBookmarks.map((bm) => (
              <div
                key={bm.id}
                className="bg-surface p-5 rounded-2xl border border-border hover:border-primary/30 transition-all shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={bm.type === 'quran' ? 'accent' : 'outline'} size="sm">
                      {bm.typeLabelBn}
                    </Badge>
                    <h5 className="text-sm font-bold text-primary">{bm.title}</h5>
                  </div>

                  {bm.snippet && (
                    <blockquote className="text-xs text-foreground/80 italic border-s-2 border-accent/60 ps-3 py-1 my-1">
                      &quot;{bm.snippet}&quot;
                    </blockquote>
                  )}

                  <span className="text-[11px] text-text-muted block">{bm.subtitle}</span>
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
                    href={bm.href}
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
