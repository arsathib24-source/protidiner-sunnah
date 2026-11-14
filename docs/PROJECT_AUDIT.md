# Comprehensive Technical & Architectural Project Audit
**Project:** Protidiner Sunnah (প্রতিদিনের সুন্নাহ)  
**Live Production URL:** [https://protidiner-sunnah-9ceq.vercel.app/bn](https://protidiner-sunnah-9ceq.vercel.app/bn)  
**Audit Date:** November 14, 2026  
**Auditor Roles:** Senior Full-Stack Engineer, Software Architect, Security Reviewer, QA Automation Engineer, Islamic Digital Content Quality Reviewer  
**Audit Mode:** Read-Only Audit & Non-Destructive Inspection (Zero code modifications, zero data mutations)

---

## 1. Executive Summary

Protidiner Sunnah is an open-access, modern Islamic digital library and online reader platform built on Next.js 14 App Router, TypeScript, Tailwind CSS, and Supabase PostgreSQL. The primary objective is delivering verified Islamic literature (Quran, Hadith, Duas, Seerah, Fiqh, Aqeedah) across Bengali (`bn`, default), Arabic (`ar`, RTL), and English (`en`, LTR).

The platform is deployed live on Vercel at `https://protidiner-sunnah-9ceq.vercel.app/bn`. The visual design, typography, RTL bidirectional rendering, and static page layouts are of premium quality. However, a deep technical inspection revealed several foundational architectural disconnects, security gaps, and content risks that must be resolved before expanding into a large-scale Islamic Knowledge Platform.

### Core Key Audit Findings:
1. **Frontend-Backend Decoupling:** The live website pages (`/ebooks`, `/ebooks/[slug]`, `/read/[slug]`, `/categories`, and `/admin`) read and mutate in-memory JavaScript datasets (`CLASSICAL_BOOKS` and `admin-store.ts`). Although Supabase PostgreSQL tables and RLS policies have been created in production, the application code has not yet been connected to query or mutate these Supabase tables.
2. **Serverless Ephemerality:** Because Admin CRUD operations currently update in-memory JavaScript variables (`booksStore`, `websiteSettings`, etc.), any changes made in the Admin console are lost when Vercel serverless function instances terminate or cold-start.
3. **Auth Callback 404 Routing Defect:** `src/middleware.ts` forces a locale redirect on all paths without excluding `/auth`. Any OAuth or magic-link callback arriving at `/auth/callback?code=...` is redirected to `/bn/auth/callback`, which returns an HTTP 404 Not Found error because the route handler is located at `/auth/callback/route.ts`.
4. **Admin Authentication Lockout in Production:** `AdminLoginForm` sets a mock cookie (`ps_admin_session=active`) rather than initiating a Supabase session (`supabase.auth.signInWithPassword`). Because Supabase environment variables are configured on Vercel, `getAdminSession()` checks for an authentic `supabase.auth.getUser()`, which evaluates to null, locking administrators out of the live dashboard.
5. **Content Repetition Fallback Risk:** When a user visits `/read/[slug]` for any book not pre-compiled in `VERIFIED_READER_BOOKS` (e.g. `shamail-muhammadiyyah`, `kitab-at-tawheed`, `adab-al-mufrad`), the fallback reader loop injects Hadith 1 of Sahih al-Bukhari ("Actions are by intentions") into every chapter of that book.
6. **Zero Automated Test Coverage:** The repository contains no unit tests, integration tests, or end-to-end test suites (no Jest, Vitest, Playwright, or Cypress in `package.json`).

---

## 2. Technical Stack & Environment Inspection

### 2.1 Framework & Core Tooling
| Component | Technology | Version | Verification / Status |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `14.2.18` (Build trace: `14.2.35`) | Active, SSG + Dynamic SSR |
| **Runtime / Language** | TypeScript | `5.6.3` / Node.js 20+ | Strict type checking passing |
| **Styling & CSS** | Tailwind CSS + Autoprefixer | `3.4.15` / `10.4.20` | Responsive utilities, custom colors |
| **Icons & Visuals** | Lucide React | `0.460.0` | SVG icons, decorative rosettes |
| **Client Database SDK** | `@supabase/supabase-js` | `^2.46.1` | Installed, ready |
| **Server SSR Database SDK** | `@supabase/ssr` | `^0.5.2` | Installed, cookie-based SSR |
| **Hosting & CDN** | Vercel (Edge Network) | Node 20 Serverless | Live at `protidiner-sunnah-9ceq.vercel.app` |
| **Database** | Supabase Managed PostgreSQL | PostgreSQL 15+ | 13 normalized tables + RLS created |

### 2.2 Environment Variables Audit (Names Only)
The application defines and checks the following environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` *(Present on Vercel & local `.env.local`)*
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` *(Present on Vercel & local `.env.local`)*
- `SUPABASE_SERVICE_ROLE_KEY` *(Present on Vercel & local `.env.local`)*
- `NEXT_PUBLIC_SITE_URL` *(Configured)*
- `NEXT_PUBLIC_DEFAULT_LOCALE` *(Configured to `bn`)*

*Security verification:* Neither `.env` nor `.env.local` is tracked in Git. The repository `.gitignore` safely isolates local secrets.

---

## 3. Architecture & Routing Inventory

### 3.1 App Router Routes (30 Total Routes)
```
/                                   -> 307 Redirect to /bn
/[lang]                             -> Localized Homepage (11 Sections)
/[lang]/ebooks                      -> Ebook Library with Category/Lang Filters & Search
/[lang]/ebooks/[slug]               -> Ebook Detail Page with Scholarly Metadata & TOC
/[lang]/read/[slug]                 -> HTML Bilingual / RTL Online Reader Engine
/[lang]/categories                  -> Category Index (Hadith, Duas, Aqeedah, Seerah, etc.)
/[lang]/categories/[slug]           -> Category Filtered View
/[lang]/bookmarks                   -> Saved Bookmarks Page (Static Empty State)
/[lang]/design-system               -> Visual Design System Showcase
/[lang]/admin                       -> Editorial CMS Dashboard Overview
/[lang]/admin/books                 -> Ebook Management Table
/[lang]/admin/books/new             -> Create New Book Form
/[lang]/admin/books/[id]/edit       -> Edit Book Metadata
/[lang]/admin/books/[id]/chapters   -> Chapter Management Table
/[lang]/admin/categories           -> Category Management Table
/[lang]/admin/chapters              -> Global Chapter Management
/[lang]/admin/hadith-references     -> Hadith Citation & Tashkeel Manager
/[lang]/admin/reviews               -> Scholarly Verification Audit Workflow
/[lang]/admin/media                 -> Media & Cover Library Manager
/[lang]/admin/users                 -> RBAC User Management & Role Switcher
/[lang]/admin/settings              -> Dynamic Branding & System Settings
/[lang]/admin/translations          -> Multilingual Translation Audit Table
/[lang]/admin/login                 -> Gatekeeper Admin Login Form
/admin                              -> 307 Redirect to /bn/admin
/auth/callback                      -> OAuth & Magic Link Code Exchange (Route Handler)
/robots.txt                         -> Web Crawler Directives
/sitemap.xml                        -> Dynamic XML Sitemap with Multilingual Alternates
```

### 3.2 Component Architecture Inventory
- **Layout:** `Header`, `Footer`, `AnnouncementBar`, `LanguageSwitcher`
- **UI System:** `Button`, `Input` (SearchInput), `Card`, `Badge`, `BrandLogo`, `CategoryCard`, `EbookCard`, `Decorative` (`IslamicStarIcon`, `ArabesqueDivider`, `SectionHeader`)
- **Homepage:** `HomeSearch`, `TodaysSunnah`, Featured Ebooks, Category Grid, About section
- **Library:** `EbookFilters`, `EbookGridCard`
- **Reader Engine:** `ReaderEngine`, `ReaderHeader`, `ReadingCanvas`, `ReaderTOCSidebar`, `ReaderSettingsModal`, `ReaderSearchModal`
- **Admin Dashboard:** `AdminShell`, `AdminSidebar`, `AdminTopbar`, `AdminLoginForm`, `EbookForm`, `EbookStatusBadge`, `QuickPublishButton`, `ReviewWorkflowCard`, `SettingsForm`, `UserRoleSwitcher`, `AddCategoryModal`, `AddChapterModal`, `AddHadithModal`, `DeleteBookButton`

---

## 4. Database & State Architecture Disconnects

| Feature Area | Current UI Source | Supabase Table Equivalent | Status / Disconnect |
| :--- | :--- | :--- | :--- |
| **Ebook Library** | `CLASSICAL_BOOKS` (`books.ts`) | `public.books`, `public.book_translations` | Disconnected: UI does not query Supabase |
| **Reader Chapters** | `VERIFIED_READER_BOOKS` (`reader-content.ts`) | `public.chapters`, `public.chapter_translations` | Disconnected: UI does not query Supabase |
| **Hadith References** | Embedded in `reader-content.ts` | `public.hadith_references` | Disconnected: Hadith refs not loaded from DB |
| **Bookmarks** | Client `localStorage` (`bm_paragraphs_...`) | `public.bookmarks` | Disconnected: `/bookmarks` page does not read LS or DB |
| **Reading Progress**| Client `localStorage` (`progress_...`) | `public.reading_progress` | Disconnected: No account sync to Supabase |
| **Today's Sunnah** | Static in `todays-sunnah.tsx` | `public.hadith_references` | Disconnected: Does not rotate from database |
| **Admin Books CRUD**| In-memory `booksStore` | `public.books` | Disconnected: Changes lost on function recycle |
| **Admin Settings** | In-memory `websiteSettings` | `public.settings` (or DB store) | Disconnected: Reverts to defaults on cold start |
| **Admin Roles** | Cookie `ps_admin_session` | `public.roles`, `public.profiles` | Disconnected: Live Supabase session not created |

---

## 5. Automated Testing & Code Quality Audit

1. **Automated Test Suites:** Zero automated test files exist in the repository (`.test.ts`, `.spec.ts`, `__tests__` are absent).
2. **Type Safety:** `tsc --noEmit` completes with 0 errors across all 30 routes.
3. **Build Stability:** Production build (`npm run build`) generates static and dynamic bundles cleanly without compilation errors.
4. **Linting:** ESLint is not included in `package.json` devDependencies.
