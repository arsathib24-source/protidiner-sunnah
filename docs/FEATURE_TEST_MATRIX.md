# Feature Test Matrix & Quality Verification
**Project:** Protidiner Sunnah (প্রতিদিনের সুন্নাহ)  
**Live Target:** [https://protidiner-sunnah-9ceq.vercel.app](https://protidiner-sunnah-9ceq.vercel.app)  
**Status Legend:**
- **PASS:** Feature functions exactly as expected in production.
- **FAIL:** Feature behaves contrary to specification or errors out.
- **PARTIALLY WORKING:** Core visual UI works, but lacks persistence or complete functionality.
- **NOT IMPLEMENTED:** UI placeholder exists, but underlying logic or data is not connected.
- **NOT TESTED:** Blocked by environment access or scheduled for future verification.
- **BLOCKED:** Cannot be executed due to dependency or technical limitation.

---

## 1. Homepage & Navigation Features

| Feature ID | Feature / Component | Status | Expected Behavior | Actual Behavior | Severity | Evidence / Notes |
| :--- | :--- | :---: | :--- | :--- | :---: | :--- |
| **HP-01** | Header Navigation | **PASS** | Navigation bar displays localized links and sticks to top on scroll. | Displays correctly with backdrop blur and sticky positioning. | LOW | Verified on live site |
| **HP-02** | Brand Logo & Emblem | **PASS** | Displays 48px gradient box, golden star, title, and tagline. | Matches design system tokens with subtle hover scale. | LOW | Verified on live site |
| **HP-03** | Language Switcher | **PASS** | Switches between Bengali (`bn`), Arabic (`ar`), and English (`en`). | URL path updates correctly while preserving sub-path. | LOW | Tested across all 3 locales |
| **HP-04** | Announcement Bar | **PASS** | Top banner displays free Islamic literature notice and library link. | Renders with high contrast and links to `/ebooks`. | LOW | Verified on live site |
| **HP-05** | Hero Section CTAs | **PASS** | "ইবুক পড়ুন" links to `/ebooks`, "সুন্নাহ খুঁজুন" scrolls to search bar. | Smooth scroll and navigation both function as specified. | LOW | Verified on live site |
| **HP-06** | Homepage Search Bar | **PASS** | Typing keyword and submitting navigates to `/ebooks?q=...`. | Form navigates to library with query string. | MEDIUM | Quick search pills also function |
| **HP-07** | Featured Ebooks Carousel | **PASS** | Shows cards for featured classical books with read CTA. | Cards display covers, authors, chapter counts, and links. | LOW | Verified on live site |
| **HP-08** | Category Cards Grid | **PASS** | Clicking category card filters library by that category slug. | Navigates to `/categories/[slug]` and `/ebooks?category=...`. | LOW | Verified on live site |
| **HP-09** | Today's Sunnah Section | **PARTIALLY WORKING** | Displays daily hadith with copy and share functionality. | Hadith copies to clipboard, but the hadith is hardcoded (does not rotate daily). | MEDIUM | `todays-sunnah.tsx:16` |
| **HP-10** | About Section | **PASS** | Editorial policy and neutral Islamic manifesto displayed. | Clear typography and scholarly authenticity badge. | LOW | Verified on live site |
| **HP-11** | Footer & Quick Links | **PASS** | Displays brand overview, navigational links, and copyright notice. | All links are valid and localized. | LOW | Verified on live site |

---

## 2. Ebook Library & Details Pages

| Feature ID | Feature / Component | Status | Expected Behavior | Actual Behavior | Severity | Evidence / Notes |
| :--- | :--- | :---: | :--- | :--- | :---: | :--- |
| **LIB-01** | Ebook Grid Listing | **PASS** | Displays 7 classical books in responsive 3-column grid. | Cards render correctly with aspect ratio and metadata. | LOW | `/bn/ebooks` |
| **LIB-02** | Search by Title & Author | **PASS** | Real-time filtering by Bengali, Arabic, or English text. | In-memory filter matches title, author, or description. | MEDIUM | Limited to mock dataset |
| **LIB-03** | Category Filters | **PASS** | Selecting category pill isolates matching books. | Filters books by category slug smoothly. | LOW | Verified on live site |
| **LIB-04** | Language Filter | **PASS** | Isolates books by available languages (`bn`, `ar`, `en`). | Successfully filters items based on language array. | LOW | Verified on live site |
| **LIB-05** | Sorting Options | **PASS** | Sorts by latest published, popularity, or alphabetical title. | Array sort re-orders cards correctly. | LOW | Verified on live site |
| **LIB-06** | Empty Search State | **PASS** | Shows friendly message and reset button when 0 books match. | Displays clear empty state with reset filters button. | LOW | Query: `?q=xyznonexistent` |
| **LIB-07** | Ebook Detail View | **PASS** | Displays cover, author biography, reviewer verification card, TOC. | Complete editorial details rendered with classical citation. | LOW | `/bn/ebooks/riyad-us-saliheen` |
| **LIB-08** | Reviewer Verification Card | **PASS** | Shows reviewing scholar's name, institution, and verification date. | Renders with gold border and authenticity badge. | LOW | Verified on detail page |
| **LIB-09** | Table of Contents Navigation | **PASS** | Clicking chapter from TOC navigates to `/read/[slug]?chapter=N`. | Navigates to online reader with matching initial chapter. | LOW | Verified on live site |

---

## 3. Online HTML Multilingual Reader Engine

| Feature ID | Feature / Component | Status | Expected Behavior | Actual Behavior | Severity | Evidence / Notes |
| :--- | :--- | :---: | :--- | :--- | :---: | :--- |
| **RDR-01** | Arabic Text & Diacritics | **PASS** | Renders classical Arabic text with full tashkeel/harakat. | Amiri font renders diacritics without clipping or overlaps. | HIGH | Verified in Chapter 1 |
| **RDR-02** | RTL Directionality | **PASS** | Arabic text and Arabic UI switch to right-to-left. | Text container and punctuation render properly in RTL. | HIGH | Verified on `/ar/read/...` |
| **RDR-03** | Bilingual Display Mode | **PASS** | Displays Arabic original side-by-side with Bengali/English. | Dual-column or stacked view provides clean side-by-side. | LOW | Verified in Reader Engine |
| **RDR-04** | Chapter Navigation | **PASS** | Previous and Next buttons switch chapters smoothly. | Chapter state updates without full page reloads. | LOW | Verified in Chapter 1, 2, 3 |
| **RDR-05** | Table of Contents Drawer | **PASS** | Slide-over drawer lists all chapters with durations. | Clicking any chapter closes drawer and loads chapter. | LOW | Verified in Reader Engine |
| **RDR-06** | Font Size Controls | **PASS** | Adjusts text size from 14px to 28px in real-time. | Font scale slider and presets (`A- / A+`) resize typography. | LOW | Stored in `localStorage` |
| **RDR-07** | Reader Themes | **PASS** | Toggles between Ivory (Day), Sepia (Warm), and Charcoal (Night). | Background, surface, text, and border colors update instantly. | LOW | CSS class switching active |
| **RDR-08** | Paragraph Bookmarking | **PARTIALLY WORKING** | Saves bookmark for specific paragraph and updates icon. | Bookmark saved to `localStorage`, but never syncs to DB. | MEDIUM | `reader-engine.tsx:85` |
| **RDR-09** | Reading Progress Indicator | **PARTIALLY WORKING** | Top progress bar tracks scroll percentage and saves position. | Progress bar works and saves to LS, but does not sync to DB. | MEDIUM | `reader-engine.tsx:72` |
| **RDR-10** | In-Book Search Modal | **PASS** | Searches text across current book chapters. | Modal filters matching paragraphs and scrolls to anchor. | LOW | Search modal active |
| **RDR-11** | Non-Verified Book Fallback | **FAIL** | Unavailable books should display clear pending audit notice. | Falls back to injecting Bukhari Hadith 1 into every chapter! | **CRITICAL** | `src/app/[lang]/read/[slug]/page.tsx:82` |

---

## 4. Bookmarks & Personal Library

| Feature ID | Feature / Component | Status | Expected Behavior | Actual Behavior | Severity | Evidence / Notes |
| :--- | :--- | :---: | :--- | :--- | :---: | :--- |
| **BM-01** | Saved Bookmarks Page | **FAIL** | Displays user's bookmarked paragraphs with direct links. | Always displays static empty state ("কোনো বুকমার্ক নেই"). | **HIGH** | `src/app/[lang]/bookmarks/page.tsx` |
| **BM-02** | Bookmark Deletion | **NOT IMPLEMENTED** | Ability to remove saved bookmark from personal list. | No management UI exists on `/bookmarks`. | MEDIUM | Feature missing |
| **BM-03** | Account Bookmark Sync | **NOT IMPLEMENTED** | Authenticated readers sync bookmarks to Supabase table. | Code only writes to `localStorage`; no Supabase API call. | HIGH | Database table `bookmarks` unused |

---

## 5. Admin Console & Editorial CMS

| Feature ID | Feature / Component | Status | Expected Behavior | Actual Behavior | Severity | Evidence / Notes |
| :--- | :--- | :---: | :--- | :--- | :---: | :--- |
| **ADM-01** | Admin Gatekeeper Login | **FAIL** | Admin enters credentials and authenticates via Supabase Auth. | Sets a mock cookie (`ps_admin_session=active`); fails on live DB. | **CRITICAL** | `admin-login-form.tsx:32` |
| **ADM-02** | Server-Side RBAC Guard | **PASS** | Unauthenticated requests to `/admin` are rejected. | Returns login form when session is unverified. | HIGH | `admin/layout.tsx:30` |
| **ADM-03** | Dashboard Metrics | **PARTIALLY WORKING** | Displays counts of total, published, draft, and review books. | Numbers calculate from in-memory `booksStore`, not DB. | HIGH | `admin-store.ts:446` |
| **ADM-04** | Ebook Creation Form | **PARTIALLY WORKING** | Admin fills multi-language fields and creates new book. | Validates form and appends to in-memory store; lost on restart. | **CRITICAL** | `actions.ts:48` |
| **ADM-05** | 6-Stage Review Workflow | **PARTIALLY WORKING** | Transitions book between Draft, Review, Approved, Published. | State updates in-memory array only; no audit trail in DB. | HIGH | `actions.ts:182` |
| **ADM-06** | Sanad & Matn Audit Checks | **PASS** | Checkboxes enforce physical print, sanad, and matn audit. | Interactive UI enforces scholarly checkboxes before publish. | MEDIUM | `ebook-form.tsx` |
| **ADM-07** | Dynamic Brand Settings | **PARTIALLY WORKING** | Admin changes site title, tagline, and logo emblem. | Live preview works; changes saved in-memory; lost on restart. | HIGH | `settings-form.tsx` |
| **ADM-08** | Media Library Upload | **NOT IMPLEMENTED** | Admin uploads cover image to Supabase Storage bucket. | Only displays static mock list; file upload is not connected. | HIGH | Database table `media` unused |

---

## 6. Security, Multilingual & SEO

| Feature ID | Feature / Component | Status | Expected Behavior | Actual Behavior | Severity | Evidence / Notes |
| :--- | :--- | :---: | :--- | :--- | :---: | :--- |
| **SEC-01** | Auth Callback Route | **FAIL** | `/auth/callback?code=...` exchanges code for session. | Middleware redirects to `/bn/auth/callback` which returns 404! | **CRITICAL** | `middleware.ts:25` |
| **SEC-02** | Security Headers | **PASS** | HSTS, X-Frame-Options, X-Content-Type-Options enforced. | Headers verified in HTTP responses from Vercel. | LOW | Verified via curl |
| **SEC-03** | Secret Key Isolation | **PASS** | Zero secrets or service role keys exposed in Git or client. | Verified clean git tree and strict `.gitignore`. | LOW | Verified via git grep |
| **SEO-01** | Dynamic Sitemap XML | **PASS** | `sitemap.xml` lists all locale pages with priorities. | Returns valid XML with 13.4 KB payload and alternates. | LOW | Verified via curl |
| **SEO-02** | Robots Configuration | **PASS** | Disallows `/admin/*` and allows public pages. | Returns valid robots.txt with sitemap reference. | LOW | Verified via curl |
| **SEO-03** | Hreflang Alternates | **PASS** | Every page declares alternate URLs for `bn`, `ar`, `en`. | Metadata contains correct `languages` mappings. | LOW | Verified in HTML head |


---

## ৭. সর্বশেষ অডিট ও ফিচার টেস্ট ম্যাট্রিক্স (v1.2.0 Test Matrix)

| টেস্ট আইডি | ফিচার / মডিউল | স্ট্যাটাস | টেস্ট কেস ও যাচাইকৃত আচরণ | ফলাফল |
| :--- | :--- | :---: | :--- | :---: |
| **AUD-01** | রিয়াযুস সলেহিন ও ই-বুক চ্যাপ্টার স্ট্যাটাস | **PASS** | মূল কিতাবের মোট ৩৭২টি অধ্যায় এবং প্ল্যাটফর্মে ৫টি উন্মুক্ত অধ্যায়ের তথ্য "প্রিভিউ সংস্করণ" ব্যাজ সহ প্রদর্শিত হচ্ছে। | **FIXED & VERIFIED** |
| **AUD-02** | ৭টি ক্লাসিক্যাল বইয়ের প্রিভিউ লেবেল | **PASS** | হিসনুল মুসলিম (৪/১৩২), আল-আরবাঈন (৪/৪২), শামায়েল (৩/৫৬), আদাবুল মুফরাদ (৩/৬৪৪), বুলুগুল মারাম (৩/৪৫০), কিতাবুত তাওহিদ (৩/৬৭) প্রতিটিতে প্রিভিউ ও ওয়াকফ নোটিশ দৃশ্যমান। | **FIXED & VERIFIED** |
| **AUD-03** | আল-কুরআন ১১৪ সূরা ও পারা সূচক | **PASS** | ১১৪টি সূরার আরবি, বাংলা ও ইংরেজি নাম, অর্থ, আয়াত সংখ্যা, পারা নম্বর এবং স্লাগ সঠিকভাবে লোড হচ্ছে। | **FIXED & VERIFIED** |
| **AUD-04** | আল-কুরআন সূরা ন্যাভিগেশন ও আয়াত প্রদর্শন | **PASS** | পূর্ববর্তী ও পরবর্তী সূরার বোতাম কার্যকর; যাচাইকৃত সূরাগুলোর উসমানী টেক্সট ও অনুবাদ সঠিক; অপরীক্ষিত সূরাগুলোতে তাহকিক নোটিশ দৃশ্যমান। কোনো এআই টেক্সট জেনারেট করা হয়নি। | **FIXED & VERIFIED** |
| **AUD-05** | বুকমার্ক লোডিং স্ক্রিন ও এম্পটি স্টেট | **PASS** | `/bn/bookmarks` আর আটকে থাকে না। ১৫০ মি.সে. ওয়াচডগ ও স্কেলিটন লোডার কার্যকর। ডাটা না থাকলে "বর্তমানে কোনো আইটেম সংরক্ষিত নেই" এবং অ্যাকশন বোতাম দৃশ্যমান। | **FIXED & VERIFIED** |
| **AUD-06** | ডিজাইন সিস্টেম পাবলিক লিঙ্ক অপসারণ | **PASS** | সাধারণ হেডার, ফুটার এবং হোমপেজের এবাউট সেকশন থেকে ডিজাইন সিস্টেম বাটন অপসারিত। এক্সএমএল সাইটম্যাপ থেকে অপসারিত। সংরক্ষিত অ্যাডমিন সাইডবারে সংরক্ষিত। | **FIXED & VERIFIED** |
| **AUD-07** | হাদিস তাহকিক মেটাডাটা ও রিভিউ বক্স | **PASS** | হাদিস কার্ডে মুদ্রিত উৎস, অনুবাদক, পর্যালোচক আলেম, তাহকিক স্ট্যাটাস ও রিভিউ তারিখের ব্যাজ সুস্পষ্টভাবে প্রদর্শিত। | **FIXED & VERIFIED** |
| **AUD-08** | বইভিত্তিক কপিরাইট ও লাইসেন্সিং সিস্টেম | **PASS** | ৫-স্তরের লাইসেন্স আর্কিটেকচার কার্যকর: `public_domain`, `open_license`, `permission_granted`, `permission_pending`, `restricted_use`। | **FIXED & VERIFIED** |
| **AUD-09** | সার্চ ও সমন্বিত ন্যাভিগেশন | **PASS** | ইবুক সার্চ, কুরআন ফিল্টার, হাদিস ফিল্টার, দোয়া ও সীরাত ন্যাভিগেশন এবং রেসপনসিভ মোবাইল ড্রয়ার সচল। | **FIXED & VERIFIED** |
| **AUD-10** | ইউআই ও ব্রেকপয়েন্ট টেস্ট (390px, 768px, 1440px) | **PASS** | ৩৯০px মোবাইলে কোনো অনুভূমিক স্ক্রল বা টেক্সট ক্লিপিং নেই। আরবি ফন্ট ও হরকত স্পষ্ট। বাংলা টাইপোগ্রাফি ন্যাচারাল। | **FIXED & VERIFIED** |
| **AUD-11** | TypeScript কম্পাইলেশন (`tsc --noEmit`) | **PASS** | সম্পূর্ণ কোডবেস কোনো এরর ছাড়া কম্পাইল হয়েছে (Exit Code 0)। | **FIXED & VERIFIED** |
| **AUD-12** | Next.js প্রোডাকশন বিল্ড (`next build`) | **PASS** | ৩৬টি পেজ এবং স্ট্যাটিক রুট সফলভাবে অপ্টিমাইজড ও বিল্ড হয়েছে (Exit Code 0)। | **FIXED & VERIFIED** |
