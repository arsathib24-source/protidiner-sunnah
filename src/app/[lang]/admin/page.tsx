import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  CheckCircle2,
  FileEdit,
  ListTree,
  AlertCircle,
  Users,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  Eye,
  Clock,
  Sparkles,
} from 'lucide-react';
import {
  getDashboardMetrics,
  getAllBooks,
  AdminEbook,
} from '@/lib/admin/admin-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EbookStatusBadge } from '@/components/admin/ebook-status-badge';
import { QuickPublishButton } from '@/components/admin/quick-publish-button';

export default async function AdminDashboardPage({
  params,
}: {
  params: { lang: string };
}) {
  const locale = params.lang || 'bn';
  const metrics = await getDashboardMetrics();
  const allBooks = await getAllBooks();
  const recentBooks = allBooks.slice(0, 6);

  // Workflow counts
  const workflowCounts = {
    draft: allBooks.filter((b) => b.status === 'draft').length,
    review: allBooks.filter((b) => b.status === 'review').length,
    changes_requested: allBooks.filter((b) => b.status === 'changes_requested').length,
    approved: allBooks.filter((b) => b.status === 'approved').length,
    published: allBooks.filter((b) => b.status === 'published').length,
    archived: allBooks.filter((b) => b.status === 'archived').length,
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-3xl p-6 sm:p-8 border border-accent/30 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>প্রামাণ্য ইসলামিক জ্ঞান প্রচারের পবিত্র দায়িত্ব</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-bengali-heading leading-tight text-background">
            স্বাগতম, অ্যাডমিন কন্ট্রোল সেন্টারে
          </h2>
          <p className="text-sm text-background/80 mt-2 leading-relaxed">
            এখানে আপনি ই-বুকের পাণ্ডুলিপি প্রস্তুত, আলেমদের সনদ ও মতন তাহকিক নিরীক্ষা এবং শতভাগ নির্ভরযোগ্য হাদিস ও সুন্নাহর বই উন্মুক্ত করতে পারেন।
          </p>

          <div className="flex flex-wrap gap-3 mt-5">
            <Link href={`/${locale}/admin/books/new`}>
              <Button variant="accent" size="sm" className="font-semibold shadow-sm flex items-center gap-1.5">
                <Plus className="w-4 h-4" />
                <span>নতুন ই-বুক যুক্ত করুন</span>
              </Button>
            </Link>
            <Link href={`/${locale}/admin/reviews`}>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>তাহকিক ও রিভিউ কিউ ({metrics.pendingReviews})</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute right-4 -bottom-10 opacity-10 pointer-events-none select-none text-[120px] font-arabic font-bold text-accent">
          السنّة
        </div>
      </div>

      {/* DASHBOARD OVERVIEW: 6 Required Metric Cards */}
      <div>
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
          লাইব্রেরি পরিসংখ্যান ওভারভিউ
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* 1. Total Books */}
          <div className="bg-surface p-5 rounded-2xl border border-border shadow-xs hover:border-accent/40 transition-all">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs font-semibold">সর্বমোট বই</span>
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
            <div className="text-3xl font-bold font-bengali-heading text-foreground">
              {metrics.totalBooks}
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">
              সকল ভাষার মোট শিরোনাম
            </div>
          </div>

          {/* 2. Published Books */}
          <div className="bg-surface p-5 rounded-2xl border border-border shadow-xs hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between text-emerald-600 mb-2">
              <span className="text-xs font-semibold">প্রকাশিত বই</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-bold font-bengali-heading text-emerald-600">
              {metrics.publishedBooks}
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">
              সাধারণ পাঠকদের জন্য উন্মুক্ত
            </div>
          </div>

          {/* 3. Draft Books */}
          <div className="bg-surface p-5 rounded-2xl border border-border shadow-xs hover:border-amber-500/40 transition-all">
            <div className="flex items-center justify-between text-amber-600 mb-2">
              <span className="text-xs font-semibold">খসড়া বই</span>
              <FileEdit className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-3xl font-bold font-bengali-heading text-amber-600">
              {metrics.draftBooks}
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">
              প্রস্তুতিমূলক পর্যায়ে আছে
            </div>
          </div>

          {/* 4. Total Chapters */}
          <div className="bg-surface p-5 rounded-2xl border border-border shadow-xs hover:border-primary/40 transition-all">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs font-semibold">সর্বমোট অধ্যায়</span>
              <ListTree className="w-4 h-4 text-primary" />
            </div>
            <div className="text-3xl font-bold font-bengali-heading text-foreground">
              {metrics.totalChapters}
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">
              ডিজিটাইজড পরিচ্ছেদ
            </div>
          </div>

          {/* 5. Pending Reviews */}
          <div className="bg-surface p-5 rounded-2xl border border-border shadow-xs hover:border-rose-500/40 transition-all">
            <div className="flex items-center justify-between text-rose-600 mb-2">
              <span className="text-xs font-semibold">অপেক্ষমাণ রিভিউ</span>
              <AlertCircle className="w-4 h-4 text-rose-600" />
            </div>
            <div className="text-3xl font-bold font-bengali-heading text-rose-600">
              {metrics.pendingReviews}
            </div>
            <div className="text-[11px] text-rose-600/80 font-medium mt-1">
              তাহকিক ও আলেম নিরীক্ষা প্রয়োজন
            </div>
          </div>

          {/* 6. Total Registered Readers */}
          <div className="bg-surface p-5 rounded-2xl border border-border shadow-xs hover:border-accent/40 transition-all">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs font-semibold">নিবন্ধিত পাঠক</span>
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div className="text-3xl font-bold font-bengali-heading text-foreground">
              {metrics.totalReaders.toLocaleString()}
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">
              বুকমার্ক ও অগ্রগতি ব্যবহারকারী
            </div>
          </div>
        </div>
      </div>

      {/* REVIEW WORKFLOW VISUAL PIPELINE */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-base font-bengali-heading text-foreground">
              তাহকিক ও প্রকাশনা ওয়ার্কফ্লো পাইপলাইন (Review Workflow)
            </h3>
            <p className="text-xs text-muted-foreground">
              ইসলামিক বইয়ের সত্যতা নিশ্চিত করার ৬-ধাপের প্রামাণ্য পর্যায়
            </p>
          </div>
          <Link
            href={`/${locale}/admin/reviews`}
            className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
          >
            <span>রিভিউ বোর্ড খুলুন</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Step 1: Draft */}
          <div className="p-3.5 rounded-2xl bg-muted/40 border border-border">
            <div className="text-[11px] font-semibold text-muted-foreground uppercase">
              ১. Draft
            </div>
            <div className="text-lg font-bold text-foreground mt-0.5">
              {workflowCounts.draft}
            </div>
            <div className="text-[11px] text-muted-foreground">খসড়া সংকলন</div>
          </div>

          {/* Step 2: Under Review */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <div className="text-[11px] font-semibold text-amber-700 uppercase">
              ২. Under Review
            </div>
            <div className="text-lg font-bold text-amber-800 mt-0.5">
              {workflowCounts.review}
            </div>
            <div className="text-[11px] text-amber-700/80">তাহকিক চলছে</div>
          </div>

          {/* Step 3: Changes Requested */}
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20">
            <div className="text-[11px] font-semibold text-rose-700 uppercase">
              ৩. Changes Requested
            </div>
            <div className="text-lg font-bold text-rose-800 mt-0.5">
              {workflowCounts.changes_requested}
            </div>
            <div className="text-[11px] text-rose-700/80">সংশোধন প্রত্যাশিত</div>
          </div>

          {/* Step 4: Approved */}
          <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <div className="text-[11px] font-semibold text-blue-700 uppercase">
              ৪. Approved
            </div>
            <div className="text-lg font-bold text-blue-800 mt-0.5">
              {workflowCounts.approved}
            </div>
            <div className="text-[11px] text-blue-700/80">আলেম অনুমোদিত</div>
          </div>

          {/* Step 5: Published */}
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="text-[11px] font-semibold text-emerald-700 uppercase">
              ৫. Published
            </div>
            <div className="text-lg font-bold text-emerald-800 mt-0.5">
              {workflowCounts.published}
            </div>
            <div className="text-[11px] text-emerald-700/80">লাইভ ও উন্মুক্ত</div>
          </div>

          {/* Step 6: Archived */}
          <div className="p-3.5 rounded-2xl bg-muted/60 border border-border">
            <div className="text-[11px] font-semibold text-muted-foreground uppercase">
              ৬. Archived
            </div>
            <div className="text-lg font-bold text-foreground mt-0.5">
              {workflowCounts.archived}
            </div>
            <div className="text-[11px] text-muted-foreground">সংরক্ষিত</div>
          </div>
        </div>
      </div>

      {/* RECENT EBOOKS TABLE WITH ACTIONS */}
      <div className="bg-surface rounded-3xl border border-border shadow-xs overflow-hidden">
        <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-base font-bengali-heading text-foreground">
              সাম্প্রতিক ই-বুকসমূহ
            </h3>
            <p className="text-xs text-muted-foreground">
              সর্বশেষ সংযোজিত ও হালনাগাদকৃত ইসলামিক বইয়ের তালিকা
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/${locale}/admin/books`}>
              <Button variant="outline" size="sm" className="text-xs font-semibold">
                সকল ই-বুক দেখুন ({metrics.totalBooks})
              </Button>
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-muted-foreground text-xs uppercase font-semibold border-b border-border">
              <tr>
                <th className="px-6 py-3.5">বইয়ের শিরোনাম ও রচয়িতা</th>
                <th className="px-4 py-3.5">ক্যাটাগরি</th>
                <th className="px-4 py-3.5">ভাষা</th>
                <th className="px-4 py-3.5">অধ্যায়</th>
                <th className="px-4 py-3.5">স্ট্যাটাস</th>
                <th className="px-4 py-3.5">মূল প্রিন্ট নিরীক্ষা</th>
                <th className="px-6 py-3.5 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentBooks.map((book) => (
                <tr key={book.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-foreground font-bengali-heading text-base leading-snug">
                      {book.title.bn}
                    </div>
                    <div className="text-xs text-muted-foreground font-arabic" dir="rtl">
                      {book.title.ar}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      রচয়িতা: {book.author.bn}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-xs font-medium text-foreground bg-muted px-2.5 py-1 rounded-lg">
                      {book.category.name.bn}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {book.availableLanguages.map((lang) => (
                        <span
                          key={lang}
                          className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded bg-accent/15 text-accent"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-foreground">
                    {book.chapterCount} টি
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <EbookStatusBadge status={book.status} />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {book.audit.physicalSourceVerified ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>যাচাইকৃত</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-amber-700 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>অপেক্ষমাণ</span>
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/${locale}/read/${book.slug}`}
                        target="_blank"
                        className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                        title="অনলাইন প্রিভিউ"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/${locale}/admin/books/${book.id}/edit`}
                        className="p-1.5 text-accent hover:text-accent-dark hover:bg-accent/10 rounded-lg transition-colors"
                        title="সম্পাদনা"
                      >
                        <FileEdit className="w-4 h-4" />
                      </Link>
                      <QuickPublishButton
                        bookId={book.id}
                        currentStatus={book.status}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
