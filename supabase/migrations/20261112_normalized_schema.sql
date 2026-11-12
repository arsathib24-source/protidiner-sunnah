-- ==============================================================================
-- Protidiner Sunnah (প্রতিদিনের সুন্নাহ)
-- Complete Normalized Relational Database Schema
-- Migration: 20261112_normalized_schema.sql
-- Description: 13 Normalized Tables, UUID PKs, Strict FKs, Multi-language
--              unique constraints, Full-Text indexes, and RLS Policies for
--              Public, Reviewer, and Admin roles.
-- ==============================================================================

-- 0. Enable Essential Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. ROLES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL CHECK (name IN ('admin', 'reviewer', 'editor', 'reader')),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed Default System Roles
INSERT INTO public.roles (name, description) VALUES
    ('admin', 'Super Administrator with full editorial and user management rights'),
    ('reviewer', 'Islamic Scholar / Auditor with content verification and approval authority'),
    ('editor', 'Content Creator / Translator with draft creation authority'),
    ('reader', 'General Public Reader with bookmarking and reading progress tracking')
ON CONFLICT (name) DO NOTHING;

-- ==============================================================================
-- 2. MEDIA TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bucket_id TEXT NOT NULL DEFAULT 'book-covers',
    file_path TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    file_size_bytes BIGINT,
    alt_text TEXT,
    uploaded_by UUID, -- References auth.users or profiles
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 3. PROFILES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES public.roles(id) ON DELETE RESTRICT,
    full_name TEXT,
    avatar_url TEXT,
    preferred_lang TEXT NOT NULL DEFAULT 'bn' CHECK (preferred_lang IN ('bn', 'ar', 'en')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Wire foreign key for media.uploaded_by
ALTER TABLE public.media
    ADD CONSTRAINT fk_media_uploader
    FOREIGN KEY (uploaded_by) REFERENCES public.profiles(id) ON DELETE SET NULL;

-- ==============================================================================
-- 4. CATEGORIES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    icon_name TEXT DEFAULT 'hadith',
    sort_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 5. CATEGORY TRANSLATIONS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.category_translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
    language_code TEXT NOT NULL CHECK (language_code IN ('bn', 'ar', 'en')),
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT uq_category_language UNIQUE (category_id, language_code)
);

-- ==============================================================================
-- 6. BOOKS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    cover_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'approved', 'published', 'archived')),
    is_featured BOOLEAN DEFAULT false NOT NULL,
    is_popular BOOLEAN DEFAULT false NOT NULL,
    source_reference TEXT NOT NULL, -- Physical print edition, publisher, volume, year
    authenticity_grade TEXT,        -- E.g. Sahih, Mutawatir, Hasan
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 7. BOOK TRANSLATIONS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.book_translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
    language_code TEXT NOT NULL CHECK (language_code IN ('bn', 'ar', 'en')),
    title TEXT NOT NULL,
    original_title TEXT,
    author_name TEXT NOT NULL,
    author_bio TEXT,
    author_death_hijri TEXT,
    description TEXT NOT NULL,
    full_description TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT uq_book_language UNIQUE (book_id, language_code)
);

-- ==============================================================================
-- 8. CHAPTERS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.chapters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
    chapter_number INTEGER NOT NULL,
    slug TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'approved', 'published')),
    duration_mins INTEGER DEFAULT 5 NOT NULL,
    sort_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT uq_book_chapter_number UNIQUE (book_id, chapter_number),
    CONSTRAINT uq_book_chapter_slug UNIQUE (book_id, slug)
);

-- ==============================================================================
-- 9. CHAPTER TRANSLATIONS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.chapter_translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
    language_code TEXT NOT NULL CHECK (language_code IN ('bn', 'ar', 'en')),
    title TEXT NOT NULL,
    subtitle TEXT,
    content_html TEXT NOT NULL, -- Semantic, sanitized HTML
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT uq_chapter_language UNIQUE (chapter_id, language_code)
);

-- ==============================================================================
-- 10. HADITH REFERENCES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.hadith_references (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
    hadith_number TEXT,
    collection_name TEXT NOT NULL, -- E.g. Sahih al-Bukhari, Sahih Muslim, Sunan at-Tirmidhi
    arabic_text TEXT NOT NULL,     -- Full classical Arabic with preserved tashkeel
    bengali_translation TEXT,
    english_translation TEXT,
    narrator TEXT,                 -- E.g. Umar ibn al-Khattab RA
    grade TEXT NOT NULL DEFAULT 'Sahih', -- Sahih, Hasan, Mutawatir
    scholar_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 11. BOOKMARKS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.bookmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
    chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
    paragraph_id TEXT,             -- DOM Anchor e.g. "p-3"
    snippet TEXT,                  -- Excerpt quote snippet
    user_note TEXT,                -- Reader reflection note
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 12. READING PROGRESS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.reading_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
    last_chapter_id UUID REFERENCES public.chapters(id) ON DELETE SET NULL,
    scroll_percentage REAL DEFAULT 0.0 CHECK (scroll_percentage >= 0.0 AND scroll_percentage <= 100.0) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT uq_user_book_progress UNIQUE (user_id, book_id)
);

-- ==============================================================================
-- 13. REVIEWS & VERIFICATION AUDIT TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    status TEXT NOT NULL CHECK (status IN ('pending', 'changes_requested', 'approved', 'rejected')),
    verification_notes TEXT NOT NULL,
    physical_source_verified BOOLEAN NOT NULL DEFAULT false,
    sanad_checked BOOLEAN NOT NULL DEFAULT false,
    matn_checked BOOLEAN NOT NULL DEFAULT false,
    reviewed_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- PERFORMANCE & FULL-TEXT INDEXES
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_books_status ON public.books(status);
CREATE INDEX IF NOT EXISTS idx_books_category ON public.books(category_id);
CREATE INDEX IF NOT EXISTS idx_books_slug ON public.books(slug);
CREATE INDEX IF NOT EXISTS idx_book_translations_lookup ON public.book_translations(book_id, language_code);
CREATE INDEX IF NOT EXISTS idx_chapters_book_order ON public.chapters(book_id, chapter_number);
CREATE INDEX IF NOT EXISTS idx_chapter_translations_lookup ON public.chapter_translations(chapter_id, language_code);
CREATE INDEX IF NOT EXISTS idx_hadith_refs_chapter ON public.hadith_references(chapter_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON public.bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_user ON public.reading_progress(user_id, book_id);
CREATE INDEX IF NOT EXISTS idx_reviews_book ON public.reviews(book_id);

-- GIN Full-Text Search Indexes for Title and Author
CREATE INDEX IF NOT EXISTS idx_book_translations_title_gin ON public.book_translations USING gin(to_tsvector('simple', title));
CREATE INDEX IF NOT EXISTS idx_book_translations_author_gin ON public.book_translations USING gin(to_tsvector('simple', author_name));

-- ==============================================================================
-- AUTOMATED TRIGGERS (Updated_at)
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trg_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trg_category_translations_updated_at BEFORE UPDATE ON public.category_translations FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trg_books_updated_at BEFORE UPDATE ON public.books FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trg_book_translations_updated_at BEFORE UPDATE ON public.book_translations FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trg_chapters_updated_at BEFORE UPDATE ON public.chapters FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trg_chapter_translations_updated_at BEFORE UPDATE ON public.chapter_translations FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trg_reading_progress_updated_at BEFORE UPDATE ON public.reading_progress FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Auto-create profile on auth signup trigger
CREATE OR REPLACE FUNCTION public.handle_auth_user_signup()
RETURNS TRIGGER AS $$
DECLARE
    default_role_id UUID;
BEGIN
    SELECT id INTO default_role_id FROM public.roles WHERE name = 'reader' LIMIT 1;
    
    INSERT INTO public.profiles (id, role_id, full_name, avatar_url, preferred_lang)
    VALUES (
        NEW.id,
        default_role_id,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url',
        COALESCE(NEW.raw_user_meta_data->>'preferred_lang', 'bn')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_auth_user_signup();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.book_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapter_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hadith_references ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reading_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Helper security function to check current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
    SELECT r.name FROM public.roles r
    JOIN public.profiles p ON p.role_id = r.id
    WHERE p.id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- 1. Roles Policy (Public read)
CREATE POLICY "Public can view roles" ON public.roles FOR SELECT USING (true);

-- 2. Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 3. Categories & Translations Policies (Public read, Admin manage)
CREATE POLICY "Public can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admin can manage categories" ON public.categories FOR ALL USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Public can view category translations" ON public.category_translations FOR SELECT USING (true);
CREATE POLICY "Admin can manage category translations" ON public.category_translations FOR ALL USING (public.get_current_user_role() = 'admin');

-- 4. Books Policies
-- Public: published books only
CREATE POLICY "Public can view published books" ON public.books FOR SELECT 
    USING (status = 'published');

-- Reviewer: review, approved and published books
CREATE POLICY "Reviewers can view auditable books" ON public.books FOR SELECT 
    USING (public.get_current_user_role() IN ('reviewer', 'admin', 'editor'));

-- Admin / Editor: full manage
CREATE POLICY "Admins and editors can manage books" ON public.books FOR ALL 
    USING (public.get_current_user_role() IN ('admin', 'editor'));

-- 5. Book Translations Policies
CREATE POLICY "Public can view translations of published books" ON public.book_translations FOR SELECT 
    USING (EXISTS (SELECT 1 FROM public.books b WHERE b.id = book_id AND b.status = 'published'));

CREATE POLICY "Staff can view all book translations" ON public.book_translations FOR SELECT 
    USING (public.get_current_user_role() IN ('admin', 'editor', 'reviewer'));

CREATE POLICY "Admins and editors can manage book translations" ON public.book_translations FOR ALL 
    USING (public.get_current_user_role() IN ('admin', 'editor'));

-- 6. Chapters Policies
CREATE POLICY "Public can view approved published chapters" ON public.chapters FOR SELECT 
    USING (status = 'published' AND EXISTS (SELECT 1 FROM public.books b WHERE b.id = book_id AND b.status = 'published'));

CREATE POLICY "Staff can view all chapters" ON public.chapters FOR SELECT 
    USING (public.get_current_user_role() IN ('admin', 'editor', 'reviewer'));

CREATE POLICY "Admins and editors can manage chapters" ON public.chapters FOR ALL 
    USING (public.get_current_user_role() IN ('admin', 'editor'));

-- 7. Chapter Translations Policies
CREATE POLICY "Public can view translations of published chapters" ON public.chapter_translations FOR SELECT 
    USING (EXISTS (
        SELECT 1 FROM public.chapters c 
        JOIN public.books b ON b.id = c.book_id 
        WHERE c.id = chapter_id AND c.status = 'published' AND b.status = 'published'
    ));

CREATE POLICY "Staff can view all chapter translations" ON public.chapter_translations FOR SELECT 
    USING (public.get_current_user_role() IN ('admin', 'editor', 'reviewer'));

CREATE POLICY "Admins and editors can manage chapter translations" ON public.chapter_translations FOR ALL 
    USING (public.get_current_user_role() IN ('admin', 'editor'));

-- 8. Hadith References Policies
CREATE POLICY "Public can view hadith references of published chapters" ON public.hadith_references FOR SELECT 
    USING (EXISTS (
        SELECT 1 FROM public.chapters c 
        JOIN public.books b ON b.id = c.book_id 
        WHERE c.id = chapter_id AND c.status = 'published' AND b.status = 'published'
    ));

CREATE POLICY "Staff can manage hadith references" ON public.hadith_references FOR ALL 
    USING (public.get_current_user_role() IN ('admin', 'editor', 'reviewer'));

-- 9. Bookmarks Policies (Strict user isolation)
CREATE POLICY "Users can manage own bookmarks" ON public.bookmarks FOR ALL 
    USING (auth.uid() = user_id);

-- 10. Reading Progress Policies (Strict user isolation)
CREATE POLICY "Users can manage own reading progress" ON public.reading_progress FOR ALL 
    USING (auth.uid() = user_id);

-- 11. Reviews Policies
CREATE POLICY "Staff can view reviews" ON public.reviews FOR SELECT 
    USING (public.get_current_user_role() IN ('admin', 'reviewer', 'editor'));

CREATE POLICY "Reviewers and admins can submit reviews" ON public.reviews FOR INSERT 
    WITH CHECK (public.get_current_user_role() IN ('admin', 'reviewer'));

CREATE POLICY "Admins can update reviews" ON public.reviews FOR UPDATE 
    USING (public.get_current_user_role() = 'admin');

-- 12. Media Policies
CREATE POLICY "Public can view media" ON public.media FOR SELECT USING (true);
CREATE POLICY "Staff can upload media" ON public.media FOR ALL 
    USING (public.get_current_user_role() IN ('admin', 'editor'));
