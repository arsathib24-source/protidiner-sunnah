import React from 'react';
import Link from 'next/link';
import {
  ClipboardCheck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileEdit,
  Clock,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { getAllBooks, AdminEbook } from '@/lib/admin/admin-store';
import { EbookStatusBadge } from '@/components/admin/ebook-status-badge';
import { ReviewWorkflowCard } from '@/components/admin/review-workflow-card';

export default async function AdminReviewsPage({
  params,
}: {
  params: { lang: string };
}) {
  const locale = params.lang || 'bn';
  const allBooks = await getAllBooks();

  // Partition into pending audit vs already audited
  const reviewQueue = allBooks.filter(
    (b) => b.status === 'review' || b.status === 'changes_requested' || b.status === 'draft'
  );
  const approvedOrPublished = allBooks.filter(
    (b) => b.status === 'approved' || b.status === 'published'
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold font-bengali-heading text-foreground flex items-center gap-2.5">
            <ClipboardCheck className="w-6 h-6 text-primary" />
            <span>তাহকিক ও রিভিউ ব্যবস্থাপনা (Review Workflow)</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            ইসলামিক স্কলার ও মুহাদ্দিসদের দ্বারা সনদ, মতন ও শারীরিক মূল প্রিন্ট যাচাই প্রক্রিয়া
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-800 border border-amber-500/20">
            {reviewQueue.length} টি বই পর্যালোচনার অপেক্ষায়
          </span>
        </div>
      </div>

      {/* Review Workflow Rules Banner */}
      <div className="p-5 rounded-3xl bg-secondary/10 border border-secondary/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-accent shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <span className="font-bold text-foreground block text-sm">
              সম্পাদকীয় ও ধর্মীয় নীতিমালার শপথ:
            </span>
            <span className="text-muted-foreground">
              কোনো কুরআন আয়াত বা হাদিস বানিয়ে বলা যাবে না। কৃত্রিম বুদ্ধিমত্তার তৈরি কন্টেন্ট আলেমদের যাচাই ব্যতীত প্রকাশ করা নিষিদ্ধ।
            </span>
          </div>
        </div>
      </div>

      {/* 1. Pending Audit Queue */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg font-bengali-heading text-foreground flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          <span>তাহকিক কিউ (অপেক্ষমাণ ও সংশোধন প্রক্রিয়াধীন বই)</span>
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {reviewQueue.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground bg-surface rounded-3xl border border-border">
              বর্তমানে কোনো বই পর্যালোচনার অপেক্ষায় নেই।
            </div>
          ) : (
            reviewQueue.map((book) => (
              <ReviewWorkflowCard key={book.id} book={book} locale={locale} />
            ))
          )}
        </div>
      </div>

      {/* 2. Approved & Published Books with Complete Audit Records */}
      <div className="space-y-4 pt-6 border-t border-border">
        <h3 className="font-bold text-lg font-bengali-heading text-foreground flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>অনুমোদিত ও প্রকাশিত বইয়ের অডিট রেকর্ড</span>
        </h3>

        <div className="bg-surface rounded-3xl border border-border shadow-xs overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-muted-foreground text-xs uppercase font-semibold border-b border-border">
              <tr>
                <th className="px-6 py-4">বইয়ের শিরোনাম</th>
                <th className="px-4 py-4">যাচাইকারী আলেম</th>
                <th className="px-4 py-4">মূল প্রিন্ট চেক</th>
                <th className="px-4 py-4">সনদ ও মতন</th>
                <th className="px-4 py-4">স্ট্যাটাস</th>
                <th className="px-6 py-4 text-right">তারিখ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {approvedOrPublished.map((b) => (
                <tr key={b.id} className="hover:bg-muted/15 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-foreground font-bengali-heading">
                      {b.title.bn}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {b.sourceReference.slice(0, 40)}...
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs font-medium text-foreground">
                    {b.audit.reviewerName}
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>যাচাইকৃত</span>
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>বিশুদ্ধ</span>
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <EbookStatusBadge status={b.status} />
                  </td>
                  <td className="px-6 py-4 text-right text-xs font-mono text-muted-foreground">
                    {b.audit.verifiedDate || b.publishedAt || '২০২৬-০২-১২'}
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
