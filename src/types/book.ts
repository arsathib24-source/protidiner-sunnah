import { I18nRecord, Locale } from './i18n';

export type BookStatus = 'draft' | 'review' | 'published' | 'archived';

export interface Category {
  id: string;
  slug: string;
  name: I18nRecord;
  description: I18nRecord;
  sortOrder: number;
}

export interface Book {
  id: string;
  slug: string;
  categoryId?: string;
  category?: Category;
  title: I18nRecord;
  author: I18nRecord;
  description: I18nRecord;
  coverImageUrl?: string;
  status: BookStatus;
  isFeatured: boolean;
  sourceReference?: string;
  authenticityNotes?: string;
  verifiedBy?: string;
  publishedAt?: string;
  chapterCount?: number;
}

export interface Chapter {
  id: string;
  bookId: string;
  chapterNumber: number;
  slug: string;
  title: I18nRecord;
  contentHtml: string;
  estimatedReadingTimeMins: number;
}

export interface Bookmark {
  id: string;
  userId: string;
  chapterId: string;
  paragraphId?: string;
  selectedText?: string;
  userNote?: string;
  createdAt: string;
}

export interface ReadingProgress {
  id: string;
  userId: string;
  bookId: string;
  lastChapterId?: string;
  progressPercentage: number;
  updatedAt: string;
}

export type ReadingTheme = 'ivory' | 'sepia' | 'charcoal';
