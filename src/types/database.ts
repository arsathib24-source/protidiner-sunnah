export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: 'reader' | 'editor' | 'admin';
          full_name: string | null;
          avatar_url: string | null;
          preferred_lang: 'bn' | 'ar' | 'en';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role?: 'reader' | 'editor' | 'admin';
          full_name?: string | null;
          avatar_url?: string | null;
          preferred_lang?: 'bn' | 'ar' | 'en';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          role?: 'reader' | 'editor' | 'admin';
          full_name?: string | null;
          avatar_url?: string | null;
          preferred_lang?: 'bn' | 'ar' | 'en';
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          slug: string;
          name_i18n: Json;
          description_i18n: Json;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name_i18n: Json;
          description_i18n?: Json;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name_i18n?: Json;
          description_i18n?: Json;
          sort_order?: number;
        };
      };
      books: {
        Row: {
          id: string;
          slug: string;
          category_id: string | null;
          title_i18n: Json;
          author_i18n: Json;
          description_i18n: Json;
          cover_image_url: string | null;
          status: 'draft' | 'review' | 'published' | 'archived';
          is_featured: boolean;
          source_reference: string | null;
          authenticity_notes: string | null;
          verified_by: string | null;
          published_at: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          category_id?: string | null;
          title_i18n: Json;
          author_i18n: Json;
          description_i18n: Json;
          cover_image_url?: string | null;
          status?: 'draft' | 'review' | 'published' | 'archived';
          is_featured?: boolean;
          source_reference?: string | null;
          authenticity_notes?: string | null;
          verified_by?: string | null;
          published_at?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          category_id?: string | null;
          title_i18n?: Json;
          author_i18n?: Json;
          description_i18n?: Json;
          cover_image_url?: string | null;
          status?: 'draft' | 'review' | 'published' | 'archived';
          is_featured?: boolean;
          source_reference?: string | null;
          authenticity_notes?: string | null;
          verified_by?: string | null;
          published_at?: string | null;
          updated_at?: string;
        };
      };
      chapters: {
        Row: {
          id: string;
          book_id: string;
          chapter_number: number;
          slug: string;
          title_i18n: Json;
          content_html: string;
          estimated_reading_time_mins: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          book_id: string;
          chapter_number: number;
          slug: string;
          title_i18n: Json;
          content_html: string;
          estimated_reading_time_mins?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          book_id?: string;
          chapter_number?: number;
          slug?: string;
          title_i18n?: Json;
          content_html?: string;
          estimated_reading_time_mins?: number;
          updated_at?: string;
        };
      };
      bookmarks: {
        Row: {
          id: string;
          user_id: string;
          chapter_id: string;
          paragraph_id: string | null;
          selected_text: string | null;
          user_note: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          chapter_id: string;
          paragraph_id?: string | null;
          selected_text?: string | null;
          user_note?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          chapter_id?: string;
          paragraph_id?: string | null;
          selected_text?: string | null;
          user_note?: string | null;
        };
      };
      reading_progress: {
        Row: {
          id: string;
          user_id: string;
          book_id: string;
          last_chapter_id: string | null;
          progress_percentage: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          book_id: string;
          last_chapter_id?: string | null;
          progress_percentage?: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          book_id?: string;
          last_chapter_id?: string | null;
          progress_percentage?: number;
          updated_at?: string;
        };
      };
    };
  };
}
