import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ListTree,
  Plus,
  ArrowLeft,
  BookOpen,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  FileEdit,
} from 'lucide-react';
import { getBookById, getAllChapters } from '@/lib/admin/admin-store';
import { Button } from '@/components/ui/button';
import { AddChapterModal } from '@/components/admin/add-chapter-modal';

export default async function BookChaptersPage({
  params,
}: {
  params: { lang: string; id: string };
}) {
  const locale = params.lang || 'bn';
  const book = await getBookById(params.id);

  if (!book) {
    notFound();
  }

  const chapters = await getAllChapters(book.slug);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/admin/books`}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold font-bengali-heading text-foreground">
              অধ্যায় ব্যবস্থাপনা: {book.title.bn}
            </h2>
            <p className="text-xs text-muted-foreground">
              মোট {chapters.length} টি অধ্যায় নিবন্ধিত • নতুন অধ্যায় যোগ করুন বা পরিমার্জন করুন
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href={`/${locale}/read/${book.slug}`} target="_blank">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-accent" />
              <span>রিডারে দেখুন</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Chapters Table */}
      <div className="bg-surface rounded-3xl border border-border shadow-xs overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="font-bold text-base font-bengali-heading text-foreground flex items-center gap-2">
            <ListTree className="w-4 h-4 text-primary" />
            <span>নিবন্ধিত অধ্যায়ের তালিকা</span>
          </h3>
          <AddChapterModal bookSlug={book.slug} nextNumber={chapters.length + 1} />
        </div>

        <div className="divide-y divide-border">
          {chapters.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              এই বইয়ের জন্য কোনো অধ্যায় এখনও নিবন্ধিত হয়নি।
            </div>
          ) : (
            chapters.map((ch) => (
              <div
                key={ch.id}
                className="p-5 flex items-center justify-between gap-4 hover:bg-muted/15 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary font-bold flex items-center justify-center text-xs shrink-0">
                    {ch.chapterNumber}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">
                      {ch.title.bn}
                    </h4>
                    <p className="text-xs text-muted-foreground font-arabic mt-0.5" dir="rtl">
                      {ch.title.ar}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-accent" />
                        <span>{ch.durationMins} মিনিট পড়ার সময়</span>
                      </span>
                      <span>•</span>
                      <span className="font-mono text-accent">/{ch.slug}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/${locale}/read/${book.slug}?chapter=${ch.slug}`}
                    target="_blank"
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
                    title="অনলাইনে পড়ুন"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
