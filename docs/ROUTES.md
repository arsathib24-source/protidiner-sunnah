# Protidiner Sunnah (প্রতিদিনের সুন্নাহ)
## Application Routes & URL Structure Specification

> **Framework:** Next.js App Router  
> **Localization Prefix:** `/[lang]/` where `lang` ∈ `{'bn', 'ar', 'en'}`  
> **Root Redirect:** `/` redirects automatically to `/[lang]/` (default: `/bn`)

---

## 1. Route Tree Overview

```
src/app/
├── layout.tsx                                    # Global root HTML wrapper
├── page.tsx                                      # Redirects / -> /[default_locale]
├── globals.css                                   # Global design tokens, themes, typography
│
├── [lang]/                                       # Scoped localized tree
│   ├── layout.tsx                                # Localized layout: Header, Footer, dir, fonts
│   ├── page.tsx                                  # Homepage (Hero, Daily Sunnah, Showcase)
│   │
│   ├── library/                                  # Public Library Catalog
│   │   └── page.tsx                              # Search, category filters, book grid
│   │
│   ├── categories/                               # Category Directory
│   │   ├── page.tsx                              # All topics grid
│   │   └── [slug]/
│   │       └── page.tsx                          # Books filtered by category
│   │
│   ├── books/                                    # Book Details & Overview
│   │   └── [slug]/
│   │       └── page.tsx                          # Book synopsis, chapters, source & verification
│   │
│   ├── reader/                                   # High-Performance HTML Ebook Reader
│   │   └── [bookSlug]/
│   │       └── [chapterSlug]/
│   │           └── page.tsx                      # Reader canvas, TOC drawer, font/theme controls
│   │
│   ├── bookmarks/                                # User Bookmarks & Saved Quotes
│   │   └── page.tsx                              # List of saved bookmarks & paragraph deep links
│   │
│   ├── about/                                    # Mission & Authenticity Manifesto
│   │   └── page.tsx                              # Scholar board, sources, editorial policy
│   │
│   ├── auth/                                     # Authentication Portal
│   │   ├── login/
│   │   │   └── page.tsx                          # Email & Magic link sign-in
│   │   ├── signup/
│   │   │   └── page.tsx                          # Reader registration
│   │   └── callback/
│   │       └── route.ts                          # Supabase auth exchange handler
│   │
│   └── admin/                                    # Protected Editorial & Review CMS
│       ├── layout.tsx                            # Admin sidebar & role gatekeeper
│       ├── page.tsx                              # Dashboard analytics & queue summaries
│       ├── books/
│       │   ├── page.tsx                          # Book catalog management table
│       │   ├── new/
│       │   │   └── page.tsx                      # New book submission form
│       │   └── [id]/
│       │       ├── edit/
│       │       │   └── page.tsx                  # Edit book metadata & citation
│       │       └── chapters/
│       │           ├── page.tsx                  # Chapter list & reordering
│       │           ├── new/
│       │           │   └── page.tsx              # Add new chapter
│       │           └── [chapterId]/
│       │               └── page.tsx              # Chapter HTML WYSIWYG editor
│       ├── review/
│       │   └── page.tsx                          # Editorial & Scholar verification queue
│       └── categories/
│           └── page.tsx                          # Taxonomy manager
│
├── api/                                          # Server Endpoints
│   ├── revalidate/
│   │   └── route.ts                              # On-demand ISR cache revalidator
│   └── sitemap/
│       └── route.ts                              # Dynamic multilingual XML sitemap generator
│
└── middleware.ts                                 # Locale interception & session validation
```

---

## 2. Public Route Specifications

### 2.1 Homepage
* **URL:** `/[lang]` (e.g., `/bn`, `/ar`, `/en`)
* **Access:** Public (All users)
* **Rendering:** Server Component (ISR / dynamic)
* **Key Sections:**
  * **Hero Section:** Golden arch backdrop, platform mission statement, CTA buttons to Library and Daily Sunnah.
  * **Daily Sunnah Spotlight:** Verified Hadith callout with Arabic text, localized translation, and exact citation reference.
  * **Value Pillars:** Authenticity guarantee, free access statement, multi-device reader features.
  * **Featured Books Carousel/Grid:** Hand-picked foundational Islamic books with direct "Read Now" buttons.
  * **Browse by Category:** Quick topic tiles (Hadith, Fiqh, Seerah, Duas, etc.).

---

### 2.2 Library Catalog & Search
* **URL:** `/[lang]/library`
* **Query Parameters:**
  * `q`: Search keyword (matched against title, author, description, source).
  * `category`: Category slug filter.
  * `sort`: `'popular'` | `'newest'` | `'alphabetical'`.
  * `page`: Pagination index.
* **Access:** Public
* **Features:**
  * Instant debounced search bar.
  * Horizontal category chip filter bar.
  * Responsive book grid with cover art, author, chapter count, and estimated read time.

---

### 2.3 Book Overview Page
* **URL:** `/[lang]/books/[slug]` (e.g., `/bn/books/riyad-us-saliheen`)
* **Access:** Public
* **Rendering:** Server Component with OpenGraph & Schema.org `Book` metadata.
* **Features:**
  * Book cover artwork, localized title, author, and category badge.
  * Full editorial synopsis and overview.
  * **Verification Badge:** Clear verification stamp showing reviewing scholar, date, and physical edition references.
  * Table of Contents with estimated reading times per chapter.
  * "Start Reading" / "Continue Reading" button (restores last saved progress).

---

### 2.4 Online HTML Ebook Reader
* **URL:** `/[lang]/reader/[bookSlug]/[chapterSlug]`
* **Example:** `/bn/reader/riyad-us-saliheen/chapter-1-sincerity`
* **Access:** Public (Guest + Authenticated)
* **Layout:** Specialized distraction-free Zen reader layout.
* **Reader Controls & Features:**
  * **Slide-over Table of Contents:** Jump to any chapter with one click.
  * **Typography Controls:** Slider for font size (14px - 28px) and line height (1.6 - 2.4).
  * **Theme Switcher:** Ivory Paper (`#F7F1E5`), Sepia Sunlight (`#F2E8D5`), Charcoal Night (`#18211E`).
  * **Scroll Progress Bar:** Top-fixed progress indicator (0% to 100%).
  * **Paragraph Bookmarking:** Clickable ribbon icon on hover for every paragraph to save quotes or notes.
  * **Chapter Navigation:** Sticky footer with Previous Chapter and Next Chapter buttons.

---

### 2.5 Personal Bookmarks
* **URL:** `/[lang]/bookmarks`
* **Access:** Authenticated Readers (with LocalStorage fallback for guests)
* **Features:**
  * Grouped by book and chapter.
  * Displays saved paragraph excerpts, creation date, and personal reflections.
  * One-click deep link to jump directly to the exact paragraph in the reader.

---

### 2.6 About & Authenticity Manifesto
* **URL:** `/[lang]/about`
* **Access:** Public
* **Features:**
  * Vision, mission, and dedication of *Protidiner Sunnah*.
  * Strict religious methodology and authenticity verification standards.
  * Explanation of why AI-generated religious content is strictly prohibited from direct publishing.
  * Contact and volunteer scholar advisory channels.

---

## 3. Admin & Editorial CMS Routes (Protected)

| Route Path | Allowed Roles | Functional Purpose |
| :--- | :---: | :--- |
| `/[lang]/admin` | `editor`, `admin` | CMS Dashboard: Total books, chapters, pending review items, reading metrics |
| `/[lang]/admin/books` | `editor`, `admin` | Searchable table of books with status filters (`draft`, `review`, `published`) |
| `/[lang]/admin/books/new` | `editor`, `admin` | Multi-step form to add title, author, category, cover, and citation reference |
| `/[lang]/admin/books/[id]/edit` | `editor`, `admin` | Edit book metadata, update cover art, modify verification notes |
| `/[lang]/admin/books/[id]/chapters` | `editor`, `admin` | Chapter organizer: reorder chapters, add new chapters, delete drafts |
| `/[lang]/admin/books/[id]/chapters/[chapterId]` | `editor`, `admin` | Rich HTML editor for chapter content with semantic Hadith quote blocks |
| `/[lang]/admin/review` | `admin` | **Scholar Verification Queue:** Review submitted books against printed sources, approve, and publish |
| `/[lang]/admin/categories` | `admin` | Add and edit multilingual categories and sorting priorities |

---

## 4. Middleware & Route Protection Rules

[`src/middleware.ts`](file:///d:/Ebook/src/middleware.ts) enforces two primary policies:

1. **Locale Enforcement:**
   * Validates that the first pathname segment matches a supported locale (`bn`, `ar`, `en`).
   * Redirects unlocalized paths (`/library` -> `/bn/library`).
2. **Admin Route Gatekeeper:**
   * Protects any request targeting `/[lang]/admin/*`.
   * Checks Supabase Auth session token from cookie.
   * If unauthenticated, redirects to `/[lang]/auth/login?redirect=/admin`.
   * Queries user profile role; if role is `'reader'`, aborts with `403 Forbidden` or redirects to homepage.
