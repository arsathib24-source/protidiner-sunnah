# Long-Term Architectural Upgrade Roadmap: Transforming Protidiner Sunnah into a Large-Scale Islamic Knowledge Platform
**Project:** Protidiner Sunnah (প্রতিদিনের সুন্নাহ)  
**Date:** November 14, 2026  
**Author:** Principal Software Architect & Islamic Digital Content Strategist

---

## 1. Vision & Architectural Philosophy

The objective is evolving **Protidiner Sunnah** from an initial classical ebook reader into an enterprise-grade, authoritative **Islamic Knowledge Platform** (ইসলামিক জ্ঞান ও সুন্নাহ প্ল্যাটফর্ম).

### Core Architectural Axioms:
1. **Authenticity First (الصحة والأمانة):** Never sacrifice theological verification for speed. Every Hadith, translation, and tafsir must carry traceable print citations and authenticity classifications.
2. **Modular Schema Evolution:** Add new modules via independent relational tables and normalized foreign keys without breaking existing library and reader structures.
3. **Decoupled Edge Performance:** Serverless SSR combined with Incremental Static Regeneration (ISR) ensures sub-second page loads across low-bandwidth mobile networks in South Asia and globally.
4. **Universal Accessibility:** Seamless support for Bengali (`bn`), Arabic (`ar`, RTL), and English (`en`, LTR) with native diacritical typography.

---

## 2. Platform Architecture Evaluation: 18 Knowledge Modules

Each proposed module is evaluated against the existing codebase to determine implementation complexity, schema compatibility, and architectural impact:

| # | Knowledge Module | Current Status in Codebase | Schema Compatibility | Complexity | Architectural Impact |
| :-: | :--- | :---: | :---: | :---: | :--- |
| **1** | **Islamic Ebook Library** | Exists (Mock/In-memory) | 100% Compatible with `public.books` | **LOW** | Direct DB query integration |
| **2** | **Advanced Online Reader** | Exists (Client-state) | Compatible with `public.chapters` | **MEDIUM** | Real-time chapter pagination & audio sync |
| **3** | **Quran Knowledge Center** | Not Implemented | Requires new `quran_surahs`, `quran_ayahs` | **HIGH** | Dedicated Uthmani text corpus + audio |
| **4** | **Hadith Knowledge Center** | Partially exists in schema | 100% Compatible with `public.hadith_references` | **MEDIUM** | Faceted sanad & matn explorer |
| **5** | **Daily Sunnah (দৈনন্দিন সুন্নাহ)** | Exists (Static component)| 100% Compatible with `public.hadith_references` | **LOW** | Daily cron rotation + social cards |
| **6** | **Dua & Adhkar Library (হিসনুল মুসলিম)**| 1 book exists | Can reuse `books` or dedicated `adhkar` table | **LOW** | Tagged categories (Morning, Evening, Prayer)|
| **7** | **Seerah & Islamic History** | 1 book exists | Reuses `books` + timeline visualization | **MEDIUM** | Chronological event mapper |
| **8** | **Islamic Articles & Research** | Not Implemented | Requires new `articles`, `article_translations` | **MEDIUM** | Markdown / Rich Text CMS |
| **9** | **Islamic Learning Center (কোর্স)**| Not Implemented | Requires `courses`, `lessons`, `quizzes` | **HIGH** | LMS state & progress tracking |
| **10**| **Quiz & Knowledge Assessment** | Not Implemented | Requires `questions`, `quiz_attempts` | **MEDIUM** | Interactive assessment engine |
| **11**| **Personal Reading Library** | Bookmarks UI placeholder | 100% Compatible with `public.bookmarks` | **LOW** | Hook up `bookmarks` & `reading_progress` |
| **12**| **Advanced Full-Text Search** | Basic query filtering | Supported by existing GIN indexes | **MEDIUM** | PostgreSQL `tsvector` or Meilisearch |
| **13**| **Audio Learning & Recitations** | Not Implemented | Requires audio URL fields in `chapters` | **MEDIUM** | Floating persistent audio player |
| **14**| **Multilingual Translation CMS** | Translation table exists | 100% Compatible with `*_translations` tables | **LOW** | Editorial comparison UI |
| **15**| **Admin CMS & Asset Manager** | Exists (In-memory) | 100% Compatible with existing schema | **MEDIUM** | Hook up Supabase Storage & PostgreSQL |
| **16**| **Scholar Verification Workflow** | UI exists in form | 100% Compatible with `public.reviews` | **LOW** | Audit trail persistence |
| **17**| **Content Version History** | Not Implemented | Requires audit log trigger table | **MEDIUM** | PostgreSQL temporal audit trigger |
| **18**| **Platform Analytics Dashboard**| Basic metrics exist | Can compute from DB or aggregate table | **LOW** | Reader telemetry & reading times |

---

## 3. Recommended Phased Implementation Order

```
[Phase 1: Stabilization & DB Wiring]
       │
       ▼
[Phase 2: Personal Library & Daily Sunnah Engine]
       │
       ▼
[Phase 3: Hadith & Quran Knowledge Centers]
       │
       ▼
[Phase 4: Islamic Articles, Seerah & Audio]
       │
       ▼
[Phase 5: Learning Center, Quizzes & Community]
```

### Phase 1: Core Foundation Stabilization & Production Wiring
- **Objective:** Fix critical defects, connect the existing UI to live Supabase PostgreSQL, and enforce authentic administrator access.
- **Key Deliverables:**
  1. Fix `src/middleware.ts` to exclude `/auth` routes (resolving `BUG-01`).
  2. Implement real Supabase email/password login in `AdminLoginForm` (resolving `BUG-03`).
  3. Wire `EbooksPage`, `EbookDetailPage`, and `ReaderPage` to query `public.books` and `public.chapters` directly with ISR caching (resolving `BUG-04`, `BUG-06`).
  4. Fix reader fallback behavior so that non-transcribed books display a clear "Under Scholarly Review" callout instead of duplicating Bukhari Hadith 1 (resolving `BUG-02`).
  5. Seed production Supabase database with the 7 classical books and verified chapter contents.
- **Estimated Complexity:** **MEDIUM (1–2 weeks)**

---

### Phase 2: Personal Library, Reading Sync & Daily Sunnah Engine
- **Objective:** Enable reader bookmarking, reading progress persistence, and automated daily Hadith rotations.
- **Key Deliverables:**
  1. Hydrate `src/app/[lang]/bookmarks/page.tsx` from `localStorage` for guests and `public.bookmarks` for authenticated readers (resolving `BUG-05`).
  2. Implement reading progress synchronization between `ReaderEngine` and `public.reading_progress`.
  3. Transform "Today's Sunnah" into an automated daily scheduler that rotates through verified authentic Hadiths with downloadable quote card generators.
  4. Restrict `next.config.mjs` image optimizer `remotePatterns` to trusted CDNs.
- **Estimated Complexity:** **LOW (1 week)**

---

### Phase 3: Hadith & Quran Knowledge Centers
- **Objective:** Build dedicated search and exploration hubs for prophetic traditions and the Holy Quran.
- **Key Deliverables:**
  1. Dedicated **Hadith Knowledge Center** (`/[lang]/hadith`):
     - Browse by classical collection (Bukhari, Muslim, Tirmidhi, Abu Dawud, Nasa'i, Ibn Majah, Muwatta).
     - Filter by Authenticity Grade (Sahih, Hasan, Mutawatir).
     - Search by Narrator (Sanad) and Matn keywords in Bengali, Arabic, and English.
  2. Dedicated **Quran Knowledge Center** (`/[lang]/quran`):
     - Complete 114 Surahs with Uthmani script and verified translations.
     - Verse-by-verse audio recitation streaming.
     - Classical tafsir references (Ibn Kathir, Al-Baghawi).
- **Estimated Complexity:** **HIGH (3–4 weeks)**

---

### Phase 4: Islamic Research Articles, Seerah Timeline & Audio Learning
- **Objective:** Expand editorial depth with scholarly research papers and interactive historical timelines.
- **Key Deliverables:**
  1. Research Articles CMS (`/[lang]/articles`):
     - Scholarly articles categorized by Fiqh, Aqeedah, Tazkiyah, and Contemporary Issues.
     - Peer-review verification badge for approved articles.
  2. Interactive Prophetic Seerah Timeline (`/[lang]/seerah`):
     - Makkah and Madinah eras, key expeditions, treaties, and prophetic milestones.
  3. Audio Learning:
     - Background audio player with chapter-by-chapter Islamic lectures and audiobooks.
- **Estimated Complexity:** **MEDIUM (2–3 weeks)**

---

### Phase 5: Islamic Learning Center, Quizzes & Community Engagement
- **Objective:** Structured Islamic education and knowledge retention.
- **Key Deliverables:**
  1. Interactive Courses (`/[lang]/learn`):
     - Modules on Prayer Rules, Tajweed Basics, Ramadhan Fiqh, and Zakat Calculation.
  2. Self-Assessment Quizzes (`/[lang]/quiz`):
     - Chapter-end knowledge checks and certificates of completion.
  3. Scholar Q&A and Community Forum with moderated editorial queues.
- **Estimated Complexity:** **HIGH (3–4 weeks)**
