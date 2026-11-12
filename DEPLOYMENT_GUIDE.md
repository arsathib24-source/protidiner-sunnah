# Protidiner Sunnah (প্রতিদিনের সুন্নাহ) - Production Deployment Guide

This guide provides step-by-step instructions for deploying **Protidiner Sunnah** to **Vercel** with source code hosted on **GitHub** and PostgreSQL backend powered by **Supabase**.

---

## 1. Security & Pre-Flight Verification Checklist

Before pushing to GitHub or connecting to Vercel, verify that no secrets or sensitive files are tracked:

- [x] **Git Tracking Guard**: `.env` and `.env*.local` are explicitly ignored in `.gitignore`.
- [x] **Zero Hardcoded Secrets**: Service role keys and database passwords are NOT present in client code or Git repository.
- [x] **Security Headers**: HSTS, `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, and `Permissions-Policy` configured in `next.config.mjs`.
- [x] **Crawler Directives**: `robots.txt` disallows `/admin/*`, `/api/*`, and `/auth/*` while granting index access to public library pages.
- [x] **Sitemap**: Dynamic `sitemap.xml` generated with hreflang alternates across Bengali (`bn`), Arabic (`ar`), and English (`en`).
- [x] **Auth Callbacks**: `/auth/callback` handles code exchange for magic links and OAuth sessions.

---

## 2. GitHub Repository Setup

### Step 2.1: Initialize or Verify Git Status
Ensure all local files are committed cleanly:
```bash
git status
```

### Step 2.2: Add Remote and Push to GitHub
Create a new private or public repository on GitHub named `protidiner-sunnah` (or your chosen repository name):

```bash
# Add your GitHub remote (replace with your actual GitHub repository URL)
git remote add origin https://github.com/<your-username>/protidiner-sunnah.git

# Rename branch to main if preferred
git branch -M main

# Push code to GitHub
git push -u origin main
```

> [!CAUTION]
> Never use `git add -f .env.local`. Always double-check `git status` before pushing to ensure `.env.local` is NOT staged.

---

## 3. Supabase Production Setup

### Step 3.1: Create a Production Supabase Project
1. Go to the [Supabase Dashboard](https://supabase.com/dashboard).
2. Click **New Project**.
3. Choose a project name (e.g. `protidiner-sunnah-prod`) and a secure database password.
4. Select the closest AWS region to your audience (e.g., `Singapore - ap-southeast-1` or `Frankfurt - eu-central-1`).

### Step 3.2: Run Database Schema Migrations
1. In the Supabase project sidebar, navigate to the **SQL Editor**.
2. Click **New query**.
3. Open `supabase/migrations/20261112_normalized_schema.sql` from this repository.
4. Copy the entire SQL content and paste it into the Supabase SQL Editor.
5. Click **Run** to execute the migration.
6. Verify that all 13 tables are created:
   - `roles`
   - `profiles`
   - `media`
   - `categories`
   - `category_translations`
   - `books`
   - `book_translations`
   - `chapters`
   - `chapter_translations`
   - `hadith_references`
   - `bookmarks`
   - `reading_progress`
   - `reviews`

### Step 3.3: Configure Supabase Auth Redirect URLs
1. Navigate to **Authentication** $\rightarrow$ **URL Configuration** in the Supabase Dashboard.
2. In **Site URL**, set:
   ```
   https://protidinersunnah.com
   ```
   *(Or your Vercel deployment URL during preview: `https://<project-name>.vercel.app`)*
3. In **Redirect URLs**, add:
   ```
   https://protidinersunnah.com/auth/callback
   https://<project-name>.vercel.app/auth/callback
   http://localhost:3000/auth/callback
   ```

---

## 4. Vercel Deployment Setup

### Step 4.1: Import Project into Vercel
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New...** $\rightarrow$ **Project**.
3. Select your GitHub repository: `protidiner-sunnah`.
4. Keep the Framework Preset as **Next.js**.
5. Leave Root Directory as `./`.

### Step 4.2: Configure Production Environment Variables
Under the **Environment Variables** section in the Vercel project setup, add the following variables:

| Variable Name | Environment | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Production, Preview, Dev | Supabase Project URL (`https://<project-ref>.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production, Preview, Dev | Supabase Anonymous Public Key |
| `SUPABASE_SERVICE_ROLE_KEY` | Production | Supabase Secret Service Role Key (Keep secret! Only on server) |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical site URL (e.g., `https://protidinersunnah.com`) |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | Production, Preview, Dev | `bn` |

> [!IMPORTANT]
> `SUPABASE_SERVICE_ROLE_KEY` must **NEVER** have the `NEXT_PUBLIC_` prefix. This ensures it is never leaked to the browser.

### Step 4.3: Deploy
1. Click **Deploy**.
2. Vercel will trigger the build pipeline (`npm run build`).
3. Upon completion, you will be assigned an instant preview URL (e.g. `https://protidiner-sunnah.vercel.app`).

---

## 5. Custom Domain Configuration (Optional & Recommended)

1. In the Vercel project dashboard, go to **Settings** $\rightarrow$ **Domains**.
2. Add your custom domain (e.g. `protidinersunnah.com` and `www.protidinersunnah.com`).
3. Add the corresponding DNS records in your domain registrar (e.g., Cloudflare, Namecheap, GoDaddy):
   - **Type A**: `@` $\rightarrow$ `76.76.21.21`
   - **Type CNAME**: `www` $\rightarrow$ `cname.vercel-dns.com`
4. Vercel will automatically provision a free Let's Encrypt SSL/TLS certificate.

---

## 6. Post-Deployment Verification & Testing

Once deployed, perform the following verification:

1. **Homepage & Multilingual Routes**:
   - Access `/bn` (Bengali default).
   - Access `/ar` (Arabic RTL direction, Amiri typography).
   - Access `/en` (English LTR direction).
2. **Library & Filters**:
   - Navigate to `/bn/ebooks`.
   - Test search, category filtering, and sorting.
3. **Reader Engine**:
   - Navigate to `/bn/read/riyad-us-saliheen`.
   - Test font scaling, theme toggle (Ivory, Sepia, Charcoal), and chapter navigation.
4. **Editorial Admin Panel**:
   - Access `/bn/admin/login`.
   - Confirm unauthenticated users cannot access `/bn/admin` without role authorization.
5. **SEO & Crawlers**:
   - Inspect `/robots.txt` (verify admin routes are disallowed).
   - Inspect `/sitemap.xml` (verify all canonical and alternate locale URLs are present).
