export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type LanguageCode = 'bn' | 'ar' | 'en';
export type UserRole = 'admin' | 'reviewer' | 'editor' | 'reader';
export type BookStatus = 'draft' | 'review' | 'approved' | 'published' | 'archived';
export type ChapterStatus = 'draft' | 'review' | 'approved' | 'published';
export type ReviewStatus = 'pending' | 'changes_requested' | 'approved' | 'rejected';

export interface Database {
  public: {
    Tables: {
      roles: {
        Row: {
          id: string;
          name: UserRole;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: UserRole;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: UserRole;
          description?: string | null;
        };
      };
      profiles: {
        Row: {
          id: string;
          role_id: string;
          full_name: string | null;
          avatar_url: string | null;
          preferred_lang: LanguageCode;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role_id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          preferred_lang?: LanguageCode;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          role_id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          preferred_lang?: LanguageCode;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          slug: string;
          icon_name: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          icon_name?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          icon_name?: string | null;
          sort_order?: number;
          updated_at?: string;
        };
      };
      category_translations: {
        Row: {
          id: string;
          category_id: string;
          language_code: LanguageCode;
          name: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          language_code: LanguageCode;
          name: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          language_code?: LanguageCode;
          name?: string;
          description?: string | null;
          updated_at?: string;
        };
      };
      books: {
        Row: {
          id: string;
          slug: string;
          category_id: string | null;
          cover_media_id: string | null;
          status: BookStatus;
          is_featured: boolean;
          is_popular: boolean;
          source_reference: string;
          authenticity_grade: string | null;
          created_by: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          category_id?: string | null;
          cover_media_id?: string | null;
          status?: BookStatus;
          is_featured?: boolean;
          is_popular?: boolean;
          source_reference: string;
          authenticity_grade?: string | null;
          created_by?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          category_id?: string | null;
          cover_media_id?: string | null;
          status?: BookStatus;
          is_featured?: boolean;
          is_popular?: boolean;
          source_reference?: string;
          authenticity_grade?: string | null;
          created_by?: string | null;
          published_at?: string | null;
          updated_at?: string;
        };
      };
      book_translations: {
        Row: {
          id: string;
          book_id: string;
          language_code: LanguageCode;
          title: string;
          original_title: string | null;
          author_name: string;
          author_bio: string | null;
          author_death_hijri: string | null;
          description: string;
          full_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          book_id: string;
          language_code: LanguageCode;
          title: string;
          original_title?: string | null;
          author_name: string;
          author_bio?: string | null;
          author_death_hijri?: string | null;
          description: string;
          full_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          book_id?: string;
          language_code?: LanguageCode;
          title?: string;
          original_title?: string | null;
          author_name?: string;
          author_bio?: string | null;
          author_death_hijri?: string | null;
          description?: string;
          full_description?: string | null;
          updated_at?: string;
        };
      };
      chapters: {
        Row: {
          id: string;
          book_id: string;
          chapter_number: number;
          slug: string;
          status: ChapterStatus;
          duration_mins: number;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          book_id: string;
          chapter_number: number;
          slug: string;
          status?: ChapterStatus;
          duration_mins?: number;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          book_id?: string;
          chapter_number?: number;
          slug?: string;
          status?: ChapterStatus;
          duration_mins?: number;
          sort_order?: number;
          updated_at?: string;
        };
      };
      chapter_translations: {
        Row: {
          id: string;
          chapter_id: string;
          language_code: LanguageCode;
          title: string;
          subtitle: string | null;
          content_html: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          chapter_id: string;
          language_code: LanguageCode;
          title: string;
          subtitle?: string | null;
          content_html: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          chapter_id?: string;
          language_code?: LanguageCode;
          title?: string;
          subtitle?: string | null;
          content_html?: string;
          updated_at?: string;
        };
      };
      hadith_references: {
        Row: {
          id: string;
          chapter_id: string;
          hadith_number: string | null;
          collection_name: string;
          arabic_text: string;
          bengali_translation: string | null;
          english_translation: string | null;
          narrator: string | null;
          grade: string;
          scholar_notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          chapter_id: string;
          hadith_number?: string | null;
          collection_name: string;
          arabic_text: string;
          bengali_translation?: string | null;
          english_translation?: string | null;
          narrator?: string | null;
          grade?: string;
          scholar_notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          chapter_id?: string;
          hadith_number?: string | null;
          collection_name?: string;
          arabic_text?: string;
          bengali_translation?: string | null;
          english_translation?: string | null;
          narrator?: string | null;
          grade?: string;
          scholar_notes?: string | null;
        };
      };
      bookmarks: {
        Row: {
          id: string;
          user_id: string;
          book_id: string;
          chapter_id: string;
          paragraph_id: string | null;
          snippet: string | null;
          user_note: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          book_id: string;
          chapter_id: string;
          paragraph_id?: string | null;
          snippet?: string | null;
          user_note?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          book_id?: string;
          chapter_id?: string;
          paragraph_id?: string | null;
          snippet?: string | null;
          user_note?: string | null;
        };
      };
      reading_progress: {
        Row: {
          id: string;
          user_id: string;
          book_id: string;
          last_chapter_id: string | null;
          scroll_percentage: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          book_id: string;
          last_chapter_id?: string | null;
          scroll_percentage?: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          book_id?: string;
          last_chapter_id?: string | null;
          scroll_percentage?: number;
          updated_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          book_id: string;
          reviewer_id: string;
          status: ReviewStatus;
          verification_notes: string;
          physical_source_verified: boolean;
          sanad_checked: boolean;
          matn_checked: boolean;
          reviewed_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          book_id: string;
          reviewer_id: string;
          status: ReviewStatus;
          verification_notes: string;
          physical_source_verified?: boolean;
          sanad_checked?: boolean;
          matn_checked?: boolean;
          reviewed_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          book_id?: string;
          reviewer_id?: string;
          status?: ReviewStatus;
          verification_notes?: string;
          physical_source_verified?: boolean;
          sanad_checked?: boolean;
          matn_checked?: boolean;
          reviewed_at?: string;
        };
      };
      media: {
        Row: {
          id: string;
          bucket_id: string;
          file_path: string;
          mime_type: string;
          file_size_bytes: number | null;
          alt_text: string | null;
          uploaded_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          bucket_id?: string;
          file_path: string;
          mime_type: string;
          file_size_bytes?: number | null;
          alt_text?: string | null;
          uploaded_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          bucket_id?: string;
          file_path?: string;
          mime_type?: string;
          file_size_bytes?: number | null;
          alt_text?: string | null;
          uploaded_by?: string | null;
        };
      };
    };
  };
}
