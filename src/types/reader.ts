export type ReaderTheme = 'ivory' | 'sepia' | 'charcoal';
export type ArabicFont = 'font-amiri' | 'font-noto-naskh';
export type LineHeight = 'normal' | 'relaxed' | 'loose';
export type ReaderWidth = 'compact' | 'standard' | 'wide';
export type DisplayLanguage = 'all' | 'bn' | 'ar' | 'en';

export interface ReaderPreferences {
  theme: ReaderTheme;
  fontSize: number; // 14 to 32px
  arabicFont: ArabicFont;
  lineHeight: LineHeight;
  readerWidth: ReaderWidth;
  textAlign: 'justify' | 'left';
  displayLanguage: DisplayLanguage;
}

export interface ReaderProgress {
  bookSlug: string;
  chapterSlug: string;
  chapterNumber: number;
  scrollPercentage: number;
  lastReadAt: string;
}

export interface ReaderBookmark {
  id: string;
  bookSlug: string;
  chapterSlug: string;
  chapterTitle: string;
  paragraphId: string;
  snippet: string;
  createdAt: string;
}

export interface ContentParagraph {
  id: string; // e.g. "p-1", "p-2"
  type: 'quran' | 'hadith' | 'commentary' | 'heading';
  arabic?: string;
  bengali?: string;
  english?: string;
  source?: string;
  grade?: string;
}

export interface ReaderChapter {
  number: number;
  slug: string;
  title: { bn: string; ar: string; en: string };
  subtitle?: { bn: string; ar: string; en: string };
  durationMins: number;
  paragraphs: ContentParagraph[];
}

export interface ReaderBook {
  slug: string;
  title: { bn: string; ar: string; en: string };
  author: { bn: string; ar: string; en: string };
  category: { bn: string; ar: string; en: string };
  verifiedSource: string;
  chapters: ReaderChapter[];
}
