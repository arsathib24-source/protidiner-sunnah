-- ==============================================================================
-- Protidiner Sunnah (প্রতিদিনের সুন্নাহ) - Core Database Schema
-- Migration: 20261111_init.sql
-- Description: Books, Chapters, Categories, Multilingual Content, Bookmarks,
--              Reading Progress, and Strict Role-Based Row Level Security (RLS).
-- ==============================================================================

-- 1. Enable Required Extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- 2. User Profiles & Roles
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  role text not null check (role in ('reader', 'editor', 'admin')) default 'reader',
  full_name text,
  avatar_url text,
  preferred_lang text check (preferred_lang in ('bn', 'ar', 'en')) default 'bn',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

-- Profiles Policies
create policy "Public profiles are viewable by everyone."
  on public.profiles for select
  using (true);

create policy "Users can update their own profile."
  on public.profiles for update
  using (auth.uid() = id);

-- 3. Categories (Multilingual)
create table if not exists public.categories (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  name_i18n jsonb not null, -- {"bn": "আকিদা", "ar": "العقيدة", "en": "Aqeedah"}
  description_i18n jsonb default '{}'::jsonb,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.categories enable row level security;

create policy "Categories are viewable by everyone."
  on public.categories for select
  using (true);

create policy "Categories are modifiable only by admins and editors."
  on public.categories for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role in ('admin', 'editor')
    )
  );

-- 4. Books (Ebook Master Table)
create table if not exists public.books (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  category_id uuid references public.categories(id) on delete set null,
  title_i18n jsonb not null,        -- {"bn": "...", "ar": "...", "en": "..."}
  author_i18n jsonb not null,       -- {"bn": "...", "ar": "...", "en": "..."}
  description_i18n jsonb not null,  -- {"bn": "...", "ar": "...", "en": "..."}
  cover_image_url text,
  status text not null check (status in ('draft', 'review', 'published', 'archived')) default 'draft',
  is_featured boolean default false,
  source_reference text,            -- e.g. "Sahih al-Bukhari, Darussalam ed."
  authenticity_notes text,          -- Scholarly notes on authenticity
  verified_by uuid references public.profiles(id),
  published_at timestamp with time zone,
  created_by uuid references public.profiles(id) default auth.uid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.books enable row level security;

create policy "Published books are viewable by everyone."
  on public.books for select
  using (status = 'published');

create policy "Staff can view all books."
  on public.books for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role in ('admin', 'editor')
    )
  );

create policy "Staff can insert/update books."
  on public.books for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role in ('admin', 'editor')
    )
  );

-- 5. Chapters (HTML Ebook Content)
create table if not exists public.chapters (
  id uuid default uuid_generate_v4() primary key,
  book_id uuid references public.books(id) on delete cascade not null,
  chapter_number integer not null,
  slug text not null,
  title_i18n jsonb not null,       -- {"bn": "অধ্যায় ১", "ar": "...", "en": "Chapter 1"}
  content_html text not null,      -- Sanitized HTML content
  estimated_reading_time_mins integer default 5,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (book_id, chapter_number),
  unique (book_id, slug)
);

alter table public.chapters enable row level security;

create policy "Chapters of published books are viewable by everyone."
  on public.chapters for select
  using (
    exists (
      select 1 from public.books
      where books.id = chapters.book_id
      and books.status = 'published'
    )
  );

create policy "Staff can manage all chapters."
  on public.chapters for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role in ('admin', 'editor')
    )
  );

-- 6. Reader Bookmarks
create table if not exists public.bookmarks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  chapter_id uuid references public.chapters(id) on delete cascade not null,
  paragraph_id text,
  selected_text text,
  user_note text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.bookmarks enable row level security;

create policy "Users can view and manage their own bookmarks."
  on public.bookmarks for all
  using (auth.uid() = user_id);

-- 7. Reading Progress
create table if not exists public.reading_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  book_id uuid references public.books(id) on delete cascade not null,
  last_chapter_id uuid references public.chapters(id) on delete set null,
  progress_percentage real default 0.0 check (progress_percentage >= 0.0 and progress_percentage <= 100.0),
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, book_id)
);

alter table public.reading_progress enable row level security;

create policy "Users can view and update their own reading progress."
  on public.reading_progress for all
  using (auth.uid() = user_id);

-- 8. Indexes for High Performance
create index if not exists idx_books_category on public.books(category_id);
create index if not exists idx_books_status on public.books(status);
create index if not exists idx_chapters_book on public.chapters(book_id, chapter_number);
create index if not exists idx_bookmarks_user on public.bookmarks(user_id);
create index if not exists idx_progress_user on public.reading_progress(user_id, book_id);
