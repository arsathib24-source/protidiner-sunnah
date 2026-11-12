import React from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Filter,
  Eye,
  FileEdit,
  ListTree,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import {
  getAllBooks,
  getAllCategories,
  EbookStatus,
} from '@/lib/admin/admin-store';
import { Button } from '@/components/ui/button';
import { EbookStatusBadge } from '@/components/admin/ebook-status-badge';
import { QuickPublishButton } from '@/components/admin/quick-publish-button';
import { DeleteBookButton } from '@/components/admin/delete-book-button';

export default async function AdminBooksPage({
  params,
  searchParams,
}: {
  params: { lang: string };
  searchParams?: { query?: string; status?: string; category?: string };
}) {
  const locale = params.lang || 'bn';
  const query = searchParams?.query || '';
  const status = searchParams?.status || 'all';
  const category = searchParams?.category || 'all';

  const books = await getAllBooks({ query, status, category });
  const categories = await getAllCategories();

  const statuses: Array<{ value: string; label: string }> = [
    { value: 'all', label: 'সকল স্ট্যাটাস' },
    { value: 'published', label: 'প্রকাশিত (Published)' },
    { value: 'draft', label: 'খসড়া (Draft)' },
    { value: 'review', label: 'পর্যালোচনাধীন (Under Review)' },
    { value: 'changes_requested', label: 'সংশোধন প্রত্যাশিত (Changes Req.)' },
    { value: 'approved', label: 'অনুমোদিত (Approved)' },
    { value: 'archived', label: 'আর্কাইভকৃত (Archived)' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-bengali-heading text-foreground flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-primary" />
            <span>ই-বুক ব্যবস্থাপনা (Ebook Management)</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            মোট {books.length} টি বই পাওয়া গেছে • নতুন বই যুক্ত করুন, তথ্য সংশোধন ও প্রকাশনা নিয়ন্ত্রণ করুন
          </p>
        </div>

        <Link href={`/${locale}/admin/books/new`}>
          <Button variant="accent" className="font-semibold shadow-md flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>নতুন ই-বুক যুক্ত করুন</span>
          </Button>
        </Link>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-surface p-4 rounded-2xl border border-border shadow-xs flex flex-col md:flex-row items-center gap-3">
        {/* Search */}
        <form method="GET" className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            name="query"
            defaultValue={query}
            placeholder="বইয়ের নাম বা লেখকের নাম দিয়ে অনুসন্ধান করুন..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
          />
          {status !== 'all' && <input type="hidden" name="status" value={status} />}
          {category !== 'all' && <input type="hidden" name="category" value={category} />}
        </form>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center gap-1.5 bg-muted/60 p-1 rounded-xl border border-border">
            {statuses.slice(0, 5).map((st) => {
              const isActive = (status || 'all') === st.value;
              return (
                <Link
                  key={st.value}
                  href={`/${locale}/admin/books?status=${st.value}${query ? `&query=${query}` : ''}${category !== 'all' ? `&category=${category}` : ''}`}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-surface text-foreground font-bold shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {st.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ebooks Table */}
      <div className="bg-surface rounded-3xl border border-border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-muted-foreground text-xs uppercase font-semibold border-b border-border">
              <tr>
                <th className="px-6 py-4">বইয়ের বিবরণ</th>
                <th className="px-4 py-4">ক্যাটাগরি</th>
                <th className="px-4 py-4">ভাষা সংস্করণ</th>
                <th className="px-4 py-4">অধ্যায়</th>
                <th className="px-4 py-4">স্ট্যাটাস</th>
                <th className="px-4 py-4">শারীরিক সনদ যাচাই</th>
                <th className="px-6 py-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {books.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                    কোনো ই-বুক পাওয়া যায়নি। ফিল্টার পরিবর্তন করুন অথবা নতুন বই যুক্ত করুন।
                  </td>
                </tr>
              ) : (
                books.map((book) => (
                  <tr key={book.id} className="hover:bg-muted/15 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-14 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs shrink-0 shadow-xs overflow-hidden">
                          <BookOpen className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <div className="font-bold text-foreground font-bengali-heading text-base leading-snug">
                            {book.title.bn}
                          </div>
                          <div className="text-xs text-muted-foreground font-arabic" dir="rtl">
                            {book.title.ar}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            রচয়িতা: {book.author.bn}
                          </div>
                          <div className="text-[11px] text-accent font-mono mt-0.5">
                            রেফারেন্স: {book.sourceReference.slice(0, 35)}...
                          </div>
                        </div>
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

                    <td className="px-4 py-4 whitespace-nowrap">
                      <Link
                        href={`/${locale}/admin/books/${book.id}/chapters`}
                        className="text-xs font-semibold text-primary hover:text-accent flex items-center gap-1 hover:underline"
                        title="অধ্যায়সমূহ পরিচালনা করুন"
                      >
                        <ListTree className="w-3.5 h-3.5" />
                        <span>{book.chapterCount} টি অধ্যায়</span>
                      </Link>
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
                          <span>তাহকিক বাকি</span>
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {/* Preview Online in Reader */}
                        <Link
                          href={`/${locale}/read/${book.slug}`}
                          target="_blank"
                          className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
                          title="অনলাইন রিডারে দেখুন"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        {/* Manage Chapters */}
                        <Link
                          href={`/${locale}/admin/books/${book.id}/chapters`}
                          className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-colors"
                          title="অধ্যায় ব্যবস্থাপনা"
                        >
                          <ListTree className="w-4 h-4" />
                        </Link>

                        {/* Edit Ebook */}
                        <Link
                          href={`/${locale}/admin/books/${book.id}/edit`}
                          className="p-2 text-accent hover:text-accent-dark hover:bg-accent/10 rounded-xl transition-colors"
                          title="সম্পাদনা করুন"
                        >
                          <FileEdit className="w-4 h-4" />
                        </Link>

                        {/* Quick Publish / Unpublish */}
                        <QuickPublishButton
                          bookId={book.id}
                          currentStatus={book.status}
                        />

                        {/* Delete Book */}
                        <DeleteBookButton
                          bookId={book.id}
                          bookTitle={book.title.bn}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
