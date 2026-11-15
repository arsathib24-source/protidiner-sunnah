# Comprehensive Bug & Technical Defect Report
**Project:** Protidiner Sunnah (প্রতিদিনের সুন্নাহ)  
**Date:** November 14, 2026  
**Auditor:** Senior Full-Stack Engineer & QA Automation Architect

---

## Defect Summary by Severity

| Severity | Count | Defect IDs |
| :--- | :---: | :--- |
| **CRITICAL** | 4 | `BUG-01`, `BUG-02`, `BUG-03`, `BUG-04` |
| **HIGH** | 2 | `BUG-05`, `BUG-06` |
| **MEDIUM** | 2 | `BUG-07`, `BUG-08` |
| **LOW** | 1 | `BUG-09` |

---

### BUG-01: Authentication Callback 404 Route Interception
- **Severity:** **CRITICAL**
- **Location:** `src/middleware.ts:25-32` and `src/app/auth/callback/route.ts`
- **Expected Behavior:** When an external auth provider (Supabase magic link or OAuth) redirects to `/auth/callback?code=...`, the route handler at `src/app/auth/callback/route.ts` should execute code exchange and establish the session.
- **Actual Behavior:** `src/middleware.ts` treats `/auth/callback` as a missing-locale path and returns a 307 redirect to `/bn/auth/callback`. Because no route handler exists under `/[lang]/auth/callback/route.ts`, the browser receives an HTTP 404 Not Found error.
- **Steps to Reproduce:**
  1. Make an HTTP request to `https://protidiner-sunnah-9ceq.vercel.app/auth/callback?code=test123`.
  2. Observe 307 redirect to `/bn/auth/callback`.
  3. Observe terminal HTTP 404 response on `/bn/auth/callback`.
- **Root Cause:** The pathname exclusion check in `middleware.ts` only checks for `/api`, `/_next`, `/static`, and paths containing a dot (`.`). It does not exclude `/auth`.
- **Recommended Solution:** Update `middleware.ts` exclusion condition:
  ```typescript
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/auth') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }
  ```

---

### BUG-02: Non-Audited Reader Book Fallback Injects Bukhari Hadith 1
- **Severity:** **CRITICAL**
- **Location:** `src/app/[lang]/read/[slug]/page.tsx:82-93`
- **Expected Behavior:** If a user navigates to the online reader for a book whose full verified chapter paragraphs have not yet been transcribed (e.g. `shamail-muhammadiyyah`, `adab-al-mufrad`, `kitab-at-tawheed`, `bulugh-al-maram`), the reader should display a prominent scholarly notice stating that the digital transcription is pending audit.
- **Actual Behavior:** The fallback reader code injects Hadith 1 of Sahih al-Bukhari ("Actions are by intentions") into every single chapter of that book. As a result, reading about Prophetic physical appearance in *Ash-Shama'il al-Muhammadiyyah* displays the intention hadith across all chapters.
- **Steps to Reproduce:**
  1. Navigate to `https://protidiner-sunnah-9ceq.vercel.app/bn/read/shamail-muhammadiyyah`.
  2. Inspect the text of Chapter 1, 2, and 3.
  3. Notice that each chapter displays the Hadith of Niyyah with Bukhari 1 attribution.
- **Root Cause:** A placeholder paragraph array containing Bukhari Hadith 1 was hardcoded in `ReaderPage` fallback logic during initial prototyping.
- **Recommended Solution:** Replace the hardcoded placeholder with a dedicated, respectful "Transcription in Progress" callout component that displays original metadata, author, and reviewing scholar notes without falsifying chapter contents.

---

### BUG-03: Admin Gatekeeper Authentication Lockout in Live Environment
- **Severity:** **CRITICAL**
- **Location:** `src/components/admin/admin-login-form.tsx:32` & `src/lib/auth/admin-auth.ts:31-67`
- **Expected Behavior:** An administrator submits their email and password on `/admin/login`, which authenticates against Supabase Auth, retrieves their assigned role from `public.profiles`, and redirects to `/admin`.
- **Actual Behavior:** `AdminLoginForm` only sets a local cookie (`ps_admin_session=active`). When `getAdminSession()` runs on the server with live Supabase credentials, it queries `supabase.auth.getUser()`, which returns null because no Supabase session was created. The user is redirected back to `/admin/login?error=unauthorized`.
- **Steps to Reproduce:**
  1. Open `https://protidiner-sunnah-9ceq.vercel.app/bn/admin/login`.
  2. Submit the form.
  3. Notice that you remain on the login page or are immediately redirected back with an unauthorized error.
- **Root Cause:** Frontend login form was built with mock cookie state and was never wired to `supabase.auth.signInWithPassword({ email, password })`.
- **Recommended Solution:** Connect `AdminLoginForm` to `createClient().auth.signInWithPassword()` with proper error handling and CSRF session propagation.

---

### BUG-04: Admin In-Memory Store Resets on Serverless Cold Starts
- **Severity:** **CRITICAL**
- **Location:** `src/lib/admin/admin-store.ts:115` & `src/lib/admin/actions.ts`
- **Expected Behavior:** When an administrator creates, edits, publishes a book, or updates website settings, the data should persist permanently in the Supabase PostgreSQL database.
- **Actual Behavior:** Server actions in `actions.ts` mutate local in-memory arrays (`booksStore`, `websiteSettings`, `chaptersStore`) in the Node process. In Vercel serverless functions, memory is discarded when container instances terminate. All changes disappear on the next request or redeploy.
- **Steps to Reproduce:**
  1. In local or serverless environment, create a new book in the Admin console.
  2. Trigger a process restart or wait for lambda recycle.
  3. Refresh the book list; the newly created book is gone.
- **Root Cause:** In-memory store was designed as a temporary scaffolding placeholder and was not migrated to Supabase database client queries.
- **Recommended Solution:** Refactor all methods in `src/lib/admin/admin-store.ts` to perform parameterized SQL queries against `public.books`, `public.book_translations`, etc., using the Supabase server client.

---

### BUG-05: Disconnected Bookmarks Page
- **Severity:** **HIGH**
- **Location:** `src/app/[lang]/bookmarks/page.tsx:56-78`
- **Expected Behavior:** Visiting `/[lang]/bookmarks` should display all paragraphs and chapters bookmarked by the user.
- **Actual Behavior:** The page is a purely static JSX template that always displays "বর্তমানে কোনো বুকমার্ক সংরক্ষিত নেই" (No bookmarks saved yet). It never reads from `localStorage` or queries the `public.bookmarks` database table.
- **Steps to Reproduce:**
  1. Go to `/bn/read/riyad-us-saliheen`.
  2. Click the bookmark icon on paragraph `p-1`.
  3. Navigate to `/bn/bookmarks`.
  4. Notice the page remains completely blank with the empty state graphic.
- **Root Cause:** `BookmarksPage` is a server component without a client reader container to load `localStorage` items or a user session to fetch from Supabase.
- **Recommended Solution:** Build a client hydration component for `BookmarksPage` that loads stored bookmarks from `localStorage` for anonymous readers, and syncs with `public.bookmarks` for logged-in readers.

---

### BUG-06: Frontend Decoupled from Live Supabase PostgreSQL Database
- **Severity:** **HIGH**
- **Location:** `src/app/[lang]/page.tsx`, `src/app/[lang]/ebooks/page.tsx`, `src/app/[lang]/ebooks/[slug]/page.tsx`
- **Expected Behavior:** Public catalog, search, and category pages should query published books from the Supabase PostgreSQL database (`public.books` where `status = 'published'`).
- **Actual Behavior:** Public pages import and iterate over the static `CLASSICAL_BOOKS` array in `src/lib/data/books.ts`.
- **Steps to Reproduce:**
  1. Insert a new row into `public.books` directly in Supabase SQL editor.
  2. Refresh `/bn/ebooks`.
  3. The newly inserted book does not appear on the website.
- **Root Cause:** Initial UI implementation used TypeScript mock objects while database schema was being designed.
- **Recommended Solution:** Replace static `CLASSICAL_BOOKS` queries in page server components with cached Supabase queries (`supabase.from('books').select('..., book_translations(*)')`).

---

### BUG-07: Static "Today's Sunnah" Component
- **Severity:** **MEDIUM**
- **Location:** `src/components/home/todays-sunnah.tsx:15-28`
- **Expected Behavior:** The "Today's Sunnah" section on the homepage should dynamically display a verified hadith corresponding to the current day of the year, rotating through a curated set of hadith references.
- **Actual Behavior:** The component contains a single hardcoded hadith (Sahih Muslim 2699 on seeking knowledge) that never changes regardless of date.
- **Root Cause:** Static mock object embedded directly inside component state.
- **Recommended Solution:** Create a daily hadith rotation utility or fetch a daily record from `public.hadith_references` keyed by day of year.

---

### BUG-08: Missing Translation Fallback in Ebook Cards
- **Severity:** **MEDIUM**
- **Location:** `src/components/ebooks/ebook-grid-card.tsx:32-35`
- **Expected Behavior:** When an Arabic reader (`/ar/ebooks`) views a book that does not yet have an Arabic description, a clear "الترجمة قيد المراجعة" (Translation under review) badge should appear.
- **Actual Behavior:** It falls back to displaying the Bengali description text inside the Arabic RTL layout, causing unformatted script mixing.
- **Root Cause:** Fallback logic defaults to `book.description.bn` when `book.description[locale]` is undefined.
- **Recommended Solution:** Provide an explicit translation-pending placeholder string localized to the current UI locale.

---

### BUG-09: Redundant Route Aliases
- **Severity:** **LOW**
- **Location:** `src/app/[lang]/library/page.tsx` vs `src/app/[lang]/ebooks/page.tsx` and `src/app/[lang]/reader/[slug]` vs `src/app/[lang]/read/[slug]`
- **Expected Behavior:** Clear, canonical URLs with 301 redirects from legacy paths.
- **Actual Behavior:** Both `/library` and `/ebooks` exist, and both `/reader/[slug]` and `/read/[slug]` exist, creating duplicate route definitions without canonical consolidation.
- **Recommended Solution:** Convert `/library` to a permanent 301 redirect to `/ebooks`, and `/reader/[slug]` to a permanent 301 redirect to `/read/[slug]`.


---

## সর্বশেষ অডিট ও রেজোলিউশন রিপোর্ট (Latest Audit & Resolution Updates)

### BUG-10: Endless Loading Screen on `/bn/bookmarks`
- **Severity:** **HIGH**
- **Status:** **FIXED & VERIFIED**
- **Root Cause:** A blocking text condition (`if (!isLoaded) return <p>সংরক্ষিত তথ্য লোড হচ্ছে...</p>`) awaited browser storage access indefinitely on devices where `localStorage` was slow or restricted.
- **Resolution:** Implemented non-blocking animated skeleton placeholders, a 150ms safety watchdog timer forcing resolution, and an actionable empty state with links to "আল-কুরআন পড়ুন" and "ই-বুক লাইব্রেরি".
- **Files Modified:** `src/components/bookmarks/bookmarks-client-view.tsx`

---

### BUG-11: Public Exposure of Developer Design System
- **Severity:** **MEDIUM**
- **Status:** **FIXED & VERIFIED**
- **Root Cause:** Developer documentation at `/design-system` was linked in public footer, homepage CTA, and XML sitemap.
- **Resolution:** Removed public links from `footer.tsx`, `page.tsx`, and `sitemap.ts`. Preserved the developer documentation exclusively in the protected Admin sidebar (`src/components/admin/admin-sidebar.tsx`).
- **Files Modified:** `src/components/layout/footer.tsx`, `src/app/[lang]/page.tsx`, `src/app/sitemap.ts`, `src/components/admin/admin-sidebar.tsx`.

---

### BUG-12: Unclear Chapter Counts & Preview Status in Classical Books (Riyad-us-Saliheen)
- **Severity:** **HIGH**
- **Status:** **FIXED & VERIFIED**
- **Root Cause:** Original manuscript chapter count (372 chapters in Riyad-us-Saliheen) conflicted with the 5 foundational digitized chapters, with no indicator whether data was missing or intentionally limited.
- **Resolution:** Added `status: 'preview'`, `totalCompiledChapters`, `isCompleted: false`, and `editorialNotice` to all 7 classical books. Updated UI cards to clearly state "৫টি উন্মুক্ত (মূল ৩৭২)" with "প্রিভিউ সংস্করণ" badge and official Darussalam print collation notes.
- **Files Modified:** `src/lib/data/books.ts`, `src/components/ebooks/ebook-grid-card.tsx`, `src/components/ui/ebook-card.tsx`, `src/app/[lang]/ebooks/[slug]/page.tsx`, `src/app/[lang]/page.tsx`.

---

### BUG-13: Hadith Records Missing Scholarly Verification Metadata
- **Severity:** **HIGH**
- **Status:** **FIXED & VERIFIED**
- **Root Cause:** Hadith display items lacked verifiable print source edition, translator, reviewer panel, and explicit review dates.
- **Resolution:** Added `sourceEdition`, `translator`, `reviewer`, `verificationStatus: 'VERIFIED_SCHOLAR_AUDITED' | 'PENDING_SCHOLAR_REVIEW'`, and `reviewDate` fields to `HadithDetailItem`. Rendered a dedicated scholarly verification box on each hadith card.
- **Files Modified:** `src/lib/data/hadith-data.ts`, `src/app/[lang]/hadith/[collection]/page.tsx`.

---

### BUG-14: Client-side Exception During Custom Logo Hydration
- **Severity:** **CRITICAL**
- **Status:** **FIXED & VERIFIED**
- **Root Cause:** Next.js dynamic metadata `icon.png` generation collided with `next/image` in `BrandLogo` during SSR/hydration.
- **Resolution:** Standardized `BrandLogo` with a resilient HTML `<img>` tag and clean static `/logo.png` favicon references.
- **Files Modified:** `src/components/ui/brand-logo.tsx`, `src/components/layout/header.tsx`, `src/components/layout/footer.tsx`, `src/app/[lang]/layout.tsx`.
