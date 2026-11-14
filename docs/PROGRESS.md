# Protidiner Sunnah (প্রতিদিনের সুন্নাহ) — Development Progress

## Phase 1: Audit & Discovery (Completed)
- Full architectural and code inspection across all routes and components.
- Technical audits generated:
  - `docs/PROJECT_AUDIT.md`: Architecture overview and tech stack breakdown.
  - `docs/FEATURE_TEST_MATRIX.md`: 30-route test matrix.
  - `docs/BUG_REPORT.md`: Comprehensive bug catalog with root cause analysis.
  - `docs/CONTENT_AUDIT.md`: Arabic diacritics and Islamic citation analysis.
  - `docs/SECURITY_AUDIT.md`: Authentication, RLS, and Next.js vulnerability analysis.
  - `docs/PERFORMANCE_AUDIT.md`: Web Vitals and bundle optimization.
  - `docs/UPGRADE_ROADMAP.md`: Phased roadmap for 18 knowledge modules.

## Phase 2: Live Database & Schema Deployment (Completed)
- Live PostgreSQL instance configured on Supabase: `pookfbvytzyjbntvvesw.supabase.co`.
- 13-table normalized relational schema deployed with strict RLS:
  `roles`, `profiles`, `media`, `categories`, `category_translations`, `books`, `book_translations`, `chapters`, `chapter_translations`, `hadith_references`, `bookmarks`, `reading_progress`, `reviews`.
- Production database seeded with 4 core categories and 7 classical books with chapter translations and authentic hadith references (`scripts/seed-data.mjs`).

## Phase 3: P0/P1 Defects Fixed & Verified (Completed)
1. **BUG-01 (Auth Callback 404):** Resolved middleware routing exclusion in `src/middleware.ts` for `/auth`.
2. **BUG-02 (Silent Content Duplication):** Replaced placeholder Bukhari Hadith 1 across non-transcribed books with reverent "তাহকিক ও অনুবাদ প্রক্রিয়াধীন" (Verification in Progress) scholarly notice.
3. **BUG-03 (Admin Auth & Session Flow):** Enhanced `src/lib/auth/admin-auth.ts` and `src/components/admin/admin-login-form.tsx` with Supabase Auth integration and dual-mode demo fallback.
4. **BUG-04 (Bookmarks Hydration):** Built `src/components/bookmarks/bookmarks-client-view.tsx` with dynamic `localStorage` and `public.bookmarks` hydration, reading progress bars, and direct reader jump links.
5. **BUG-05 (Dynamic Today's Sunnah Engine):** Built `src/components/home/todays-sunnah.tsx` with 7+ verified multi-hadith rotational dataset based on day of year, previous/next controls, and citation verification.
6. **BUG-06 (Image Optimizer Remote Patterns SSRF):** Restricted `next.config.mjs` remote patterns to authorized Supabase domains and trusted CDNs.
7. **BUG-07 (Riyad-us-Saliheen Chapter Discrepancy Resolved):** Classical physical compilation has 372 chapters; digital verified release has 5 chapters ready. Transparently represented as `(১/৫ প্রস্তুত, মূল ৩৭২)` with editorial disclaimer callout box.

## Phase 4: Islamic Knowledge Platform Modules Deployed (Completed)
1. **Module A: Classical Ebook Library & Advanced Reader**
   - Routes: `/[lang]/ebooks`, `/[lang]/ebooks/[slug]`, `/[lang]/read/[slug]`
   - Full TOC drawer, typography controls, Ivory/Sepia/Dark theme engine, copy/share, and verified chapter progress.
2. **Module B: Quran Knowledge Center**
   - Routes: `/[lang]/quran` & `/[lang]/quran/[surah]`
   - Full 114 Surah index with Arabic names, meanings, revelation place, and ayah count.
   - 30 Juz catalogue and navigation.
   - Interactive Surah reader with authentic Uthmani script and verified side-by-side Bengali/English translations.
3. **Module C: Hadith Knowledge Center**
   - Routes: `/[lang]/hadith` & `/[lang]/hadith/[collection]`
   - Canonical Kutub al-Sittah collection overview with sanad/matn breakdown, collection filters, and authenticity grading badges.
4. **Module D: Dua & Adhkar Library**
   - Route: `/[lang]/duas`
   - Authentic supplications from *Hisnul Muslim* with Tashkeel Arabic, Bengali pronunciation, translation, and interactive digital tasbeeh counter.
   - `localStorage` persistence, daily reset, and haptic vibration feedback.
5. **Module E: Seerah & Prophetic Characteristics**
   - Route: `/[lang]/seerah`
   - Chronological timeline based on *Ar-Raheeq Al-Makhtum* with Meccan and Medinan era filters and scholarly citations.
6. **Module F: Unified Global Search**
   - Route: `/[lang]/search`
   - Cross-corpus search engine across Books, Quran Surahs, Hadith, Duas, and Seerah with real-time category filtering and Arabic Tashkeel normalization.
7. **Module G: Personal Study Library**
   - Route: `/[lang]/bookmarks`
   - Multi-tab storage for Quran Ayahs, Ebook Chapters, Reading Progress, and Personal Notes.
8. **Module H: SEO & Structured Schema**
   - Implemented `schema.org/Organization`, `schema.org/WebSite`, and `schema.org/Book` JSON-LD across all dynamic pages.
   - Cleaned public header navigation; moved Design System to discreet footer link.
