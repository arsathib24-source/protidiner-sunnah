# Security, Permissions & Access Control Audit
**Project:** Protidiner Sunnah (প্রতিদিনের সুন্নাহ)  
**Date:** November 14, 2026  
**Auditor:** Senior Security Engineer & Application Security Architect  
**Audit Scope:** Authentication, Authorization, RLS Policies, Route Boundaries, Secret Isolation, HTTP Headers, and Dependency Vulnerabilities.

---

## 1. Executive Summary: Security Posture

The application demonstrates strong baseline security in environment variable isolation, HTTP security headers, and PostgreSQL Row-Level Security (RLS) schema architecture. However, several critical vulnerabilities and architectural misalignments were identified in the authentication layer and server-side authorization boundaries that require mitigation before storing production user data.

---

## 2. Authentication & Session Security Findings

### 2.1 Critical Vulnerability: Authentication Redirect 404 Interception (`SEC-CRIT-01`)
- **Severity:** **CRITICAL**
- **Component:** `src/middleware.ts` & `src/app/auth/callback/route.ts`
- **Analysis:** Supabase email confirmations, magic links, and OAuth sign-in workflows redirect returning users to `/auth/callback?code=<auth_code>`. Because `src/middleware.ts` does not exclude `/auth` from locale rewrites, it issues an HTTP 307 redirect to `/bn/auth/callback`, which returns an HTTP 404 Not Found error. Users are unable to complete authentication flows.
- **Remediation:** Whitelist `/auth` in the middleware exclusion pattern.

### 2.2 Critical Vulnerability: Mock Cookie Auth in Production (`SEC-CRIT-02`)
- **Severity:** **CRITICAL**
- **Component:** `src/components/admin/admin-login-form.tsx`
- **Analysis:** The admin login form sets a client-accessible cookie `ps_admin_session=active` via `document.cookie` without verifying email or password with Supabase Auth (`supabase.auth.signInWithPassword`). While `src/lib/auth/admin-auth.ts` attempts to inspect `supabase.auth.getUser()` when Supabase credentials are present, this produces a complete lockout because the client never created a Supabase session.
- **Remediation:** Replace mock cookie assignment with real Supabase Auth `signInWithPassword` and HttpOnly cookie session propagation.

---

## 3. Server-Side RBAC & Route Boundary Inspection

### 3.1 Role Hierarchy in Database Schema
The database migration defines four strict roles in `public.roles`:
1. `admin` (Super Administrator with full editorial and user management rights)
2. `reviewer` (Islamic Scholar / Auditor with content verification and approval authority)
3. `editor` (Content Creator / Translator with draft creation authority)
4. `reader` (General Public Reader with bookmarking and reading progress tracking)

### 3.2 Server Action Access Control
- In `src/lib/admin/actions.ts`, all server actions (`createBookAction`, `updateBookAction`, `updateBookStatusAction`, `updateWebsiteSettingsAction`) invoke `await requireAdminSession()`.
- **Finding:** The authorization check verifies whether the caller possesses an active admin session. However, because the live session creation is blocked (as described in `SEC-CRIT-02`), these server actions are currently inaccessible in production.

---

## 4. Supabase Row-Level Security (RLS) Audit

The database migration script `20261112_normalized_schema.sql` establishes comprehensive RLS policies across all 13 tables:

| Table Name | RLS Enabled? | Public Access Policy | Staff / Admin Policy | Audit Assessment |
| :--- | :---: | :--- | :--- | :---: |
| `public.roles` | **YES** | Read-only (`SELECT true`) | System seeded | **SECURE** |
| `public.profiles` | **YES** | Read-only public profiles | Users update own (`id = auth.uid()`) | **SECURE** |
| `public.media` | **YES** | Read-only (`SELECT true`) | Upload by `admin`, `editor` | **SECURE** |
| `public.categories` | **YES** | Read-only (`SELECT true`) | Admin manage | **SECURE** |
| `public.category_translations` | **YES** | Read-only (`SELECT true`) | Admin manage | **SECURE** |
| `public.books` | **YES** | `status = 'published'` only | Staff view drafts/reviews, admin manage | **SECURE** |
| `public.book_translations` | **YES** | Published books only | Staff view all, admin/editor manage | **SECURE** |
| `public.chapters` | **YES** | Published chapters only | Staff view all, admin/editor manage | **SECURE** |
| `public.chapter_translations` | **YES** | Published chapters only | Staff view all, admin/editor manage | **SECURE** |
| `public.hadith_references` | **YES** | Published chapters only | Staff manage | **SECURE** |
| `public.bookmarks` | **YES** | None | User isolated (`auth.uid() = user_id`) | **SECURE** |
| `public.reading_progress` | **YES** | None | User isolated (`auth.uid() = user_id`) | **SECURE** |
| `public.reviews` | **YES** | None | Staff view, reviewers insert, admin update | **SECURE** |

---

## 5. Secret Key Handling & Git Hygiene

- **`.gitignore` Verification:** Line 27-28 explicitly ignores `.env` and `.env*.local`.
- **Git History Verification:** An audit of all commits (`git log --all --full-history -- "**.env*"`) confirms that only the harmless template `.env.example` was ever committed.
- **Service Role Key Verification:** The `SUPABASE_SERVICE_ROLE_KEY` is not prefixed with `NEXT_PUBLIC_` and is never referenced in client-side components.

---

## 6. HTTP Security Headers Verification

Live HTTP response headers from `https://protidiner-sunnah-9ceq.vercel.app` were verified via `curl`:
```http
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
X-DNS-Prefetch-Control: on
Referrer-Policy: origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
```
- **HSTS:** 2-year preload enforces encrypted HTTPS connections.
- **Clickjacking Prevention:** `X-Frame-Options: SAMEORIGIN` prevents malicious embedding inside unauthorized iframes.
- **MIME Sniffing Prevention:** `X-Content-Type-Options: nosniff` stops content sniffing attacks.

---

## 7. Dependency Vulnerabilities Inspection (`npm audit`)

An audit of the production package graph revealed 2 vulnerabilities in the underlying `next` and `postcss` transitive dependencies:
- **`next` version `14.2.18`:** Several high/critical advisories exist for older 14.x releases relating to Next.js image optimization API remote patterns (GHSA-2xp9-vwfh-vxw4, GHSA-2464-fhr4-w9xw).
- **Recommendation:** When permitted, update `next` to the latest secured patch version `14.2.24+` or `15.x` to patch all known upstream Image Optimizer vulnerabilities.
