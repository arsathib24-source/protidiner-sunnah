'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ReaderBook, ReaderPreferences, ReaderBookmark, 
  ReaderTheme, ArabicFont, ReaderChapter 
} from '@/types/reader';
import { ReaderHeader } from './reader-header';
import { ReaderTOCSidebar } from './reader-toc-sidebar';
import { ReaderSettingsModal } from './reader-settings-modal';
import { ReaderSearchModal } from './reader-search-modal';
import { ReadingCanvas } from './reading-canvas';

interface ReaderEngineProps {
  book: ReaderBook;
  initialChapterNumber?: number;
  locale: string;
  isRTL?: boolean;
}

const DEFAULT_PREFERENCES: ReaderPreferences = {
  theme: 'ivory',
  fontSize: 18,
  arabicFont: 'font-amiri',
  lineHeight: 'relaxed',
  readerWidth: 'standard',
  textAlign: 'left',
  displayLanguage: 'all',
};

export const ReaderEngine: React.FC<ReaderEngineProps> = ({
  book,
  initialChapterNumber = 1,
  locale,
  isRTL = false,
}) => {
  const router = useRouter();

  // 1. Reader Preferences State (with LocalStorage)
  const [preferences, setPreferences] = useState<ReaderPreferences>(DEFAULT_PREFERENCES);
  const [activeChapterNumber, setActiveChapterNumber] = useState<number>(initialChapterNumber);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // 2. Modals & Sidebars Visibility
  const [isTOCOpen, setIsTOCOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // 3. Bookmarks State (LocalStorage)
  const [bookmarkedChapters, setBookmarkedChapters] = useState<number[]>([]);
  const [bookmarkedParagraphs, setBookmarkedParagraphs] = useState<string[]>([]);

  // Find active chapter
  const currentChapter =
    book.chapters.find((c) => c.number === activeChapterNumber) || book.chapters[0];
  const activeChapterIndex = book.chapters.findIndex((c) => c.number === activeChapterNumber);

  const prevChapter = activeChapterIndex > 0 ? book.chapters[activeChapterIndex - 1] : null;
  const nextChapter =
    activeChapterIndex < book.chapters.length - 1 ? book.chapters[activeChapterIndex + 1] : null;

  // Initialize and load preferences and bookmarks from localStorage
  useEffect(() => {
    try {
      const savedPrefs = localStorage.getItem('protidiner_sunnah_reader_prefs');
      if (savedPrefs) {
        setPreferences((prev) => ({ ...prev, ...JSON.parse(savedPrefs) }));
      }

      const savedProgress = localStorage.getItem(`progress_${book.slug}`);
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        if (parsed.chapterNumber && !initialChapterNumber) {
          setActiveChapterNumber(parsed.chapterNumber);
        }
      }

      const savedBMChapters = localStorage.getItem(`bm_chapters_${book.slug}`);
      if (savedBMChapters) {
        setBookmarkedChapters(JSON.parse(savedBMChapters));
      }

      const savedBMParagraphs = localStorage.getItem(`bm_paragraphs_${book.slug}`);
      if (savedBMParagraphs) {
        setBookmarkedParagraphs(JSON.parse(savedBMParagraphs));
      }
    } catch (e) {
      console.warn('LocalStorage is unavailable:', e);
    }
  }, [book.slug, initialChapterNumber]);

  // Save Preferences to LocalStorage
  const handleUpdatePreferences = (updates: Partial<ReaderPreferences>) => {
    setPreferences((prev) => {
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem('protidiner_sunnah_reader_prefs', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleResetPreferences = () => {
    setPreferences(DEFAULT_PREFERENCES);
    try {
      localStorage.setItem('protidiner_sunnah_reader_prefs', JSON.stringify(DEFAULT_PREFERENCES));
    } catch (e) {}
  };

  // Scroll Progress Calculator
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setScrollProgress(100);
        return;
      }
      const percentage = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      setScrollProgress(percentage);

      // Save reading progress debounced
      try {
        localStorage.setItem(
          `progress_${book.slug}`,
          JSON.stringify({
            bookSlug: book.slug,
            chapterNumber: activeChapterNumber,
            scrollPercentage: percentage,
            lastReadAt: new Date().toISOString(),
          })
        );
      } catch (e) {}
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [book.slug, activeChapterNumber]);

  // Fullscreen Handler
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowRight' && nextChapter) {
        setActiveChapterNumber(nextChapter.number);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (e.key === 'ArrowLeft' && prevChapter) {
        setActiveChapterNumber(prevChapter.number);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (e.key === 'Escape') {
        setIsTOCOpen(false);
        setIsSettingsOpen(false);
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextChapter, prevChapter]);

  // Bookmark Chapter Toggle
  const isCurrentChapterBookmarked = bookmarkedChapters.includes(activeChapterNumber);

  const handleToggleChapterBookmark = () => {
    setBookmarkedChapters((prev) => {
      const next = prev.includes(activeChapterNumber)
        ? prev.filter((n) => n !== activeChapterNumber)
        : [...prev, activeChapterNumber];
      try {
        localStorage.setItem(`bm_chapters_${book.slug}`, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  // Paragraph Bookmark Toggle
  const handleToggleParagraphBookmark = (paragraphId: string, snippet: string) => {
    setBookmarkedParagraphs((prev) => {
      const next = prev.includes(paragraphId)
        ? prev.filter((id) => id !== paragraphId)
        : [...prev, paragraphId];
      try {
        localStorage.setItem(`bm_paragraphs_${book.slug}`, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  // Jump to specific chapter and paragraph
  const handleSelectChapter = (chapterNum: number, paragraphId?: string) => {
    setActiveChapterNumber(chapterNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (paragraphId) {
      setTimeout(() => {
        const el = document.getElementById(paragraphId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }
  };

  // Theme styling map
  const getThemeClass = () => {
    switch (preferences.theme) {
      case 'sepia':
        return 'theme-sepia bg-[#F2E8D5] text-[#3B2E24]';
      case 'charcoal':
        return 'theme-charcoal bg-[#141E1C] text-[#EAE3D2]';
      case 'ivory':
      default:
        return 'theme-ivory bg-[#F7F1E5] text-[#26332F]';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${getThemeClass()}`}>
      {/* 1. Sticky Reader Header */}
      <ReaderHeader
        locale={locale}
        bookSlug={book.slug}
        bookTitle={book.title.bn}
        chapterTitle={currentChapter.title.bn}
        chapterNumber={currentChapter.number}
        totalChapters={book.chapters.length}
        progressPercentage={scrollProgress}
        isBookmarked={isCurrentChapterBookmarked}
        isFullscreen={isFullscreen}
        onToggleTOC={() => setIsTOCOpen(!isTOCOpen)}
        onToggleSettings={() => setIsSettingsOpen(!isSettingsOpen)}
        onToggleSearch={() => setIsSearchOpen(!isSearchOpen)}
        onToggleFullscreen={handleToggleFullscreen}
        onToggleBookmark={handleToggleChapterBookmark}
        isRTL={isRTL}
      />

      {/* 2. Slide-over Table of Contents Sidebar */}
      <ReaderTOCSidebar
        isOpen={isTOCOpen}
        onClose={() => setIsTOCOpen(false)}
        chapters={book.chapters}
        activeChapterNumber={activeChapterNumber}
        totalCompiledChapters={book.totalCompiledChapters}
        onSelectChapter={(num) => handleSelectChapter(num)}
        locale={locale}
      />

      {/* 3. Reader Settings Modal / Drawer */}
      <ReaderSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        preferences={preferences}
        onUpdatePreferences={handleUpdatePreferences}
        onResetPreferences={handleResetPreferences}
      />

      {/* 4. In-Book Search Modal */}
      <ReaderSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        chapters={book.chapters}
        onSelectResult={(chapterNum, paragraphId) =>
          handleSelectChapter(chapterNum, paragraphId)
        }
        locale={locale}
        isRTL={isRTL}
      />

      {/* 5. Main Reading Canvas with Semantic HTML */}
      <main className="min-h-[80vh]">
        <ReadingCanvas
          chapter={currentChapter}
          preferences={preferences}
          bookTitle={book.title.bn}
          verifiedSource={book.verifiedSource}
          hasPrevChapter={Boolean(prevChapter)}
          hasNextChapter={Boolean(nextChapter)}
          prevChapterTitle={prevChapter?.title.bn}
          nextChapterTitle={nextChapter?.title.bn}
          onPrevChapter={() => {
            if (prevChapter) {
              handleSelectChapter(prevChapter.number);
            }
          }}
          onNextChapter={() => {
            if (nextChapter) {
              handleSelectChapter(nextChapter.number);
            }
          }}
          onToggleParagraphBookmark={handleToggleParagraphBookmark}
          bookmarkedParagraphs={bookmarkedParagraphs}
          locale={locale}
          isRTL={isRTL}
        />
      </main>
    </div>
  );
};
