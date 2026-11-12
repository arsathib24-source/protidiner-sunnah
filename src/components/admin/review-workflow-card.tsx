'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  AlertTriangle,
  Send,
  Eye,
  FileEdit,
  Loader2,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminEbook, EbookStatus } from '@/lib/admin/admin-store';
import { togglePublishStatusAction, updateBookAction } from '@/lib/admin/actions';
import { EbookStatusBadge } from './ebook-status-badge';

interface ReviewWorkflowCardProps {
  book: AdminEbook;
  locale: string;
}

export const ReviewWorkflowCard: React.FC<ReviewWorkflowCardProps> = ({
  book,
  locale,
}) => {
  const [isPending, startTransition] = useTransition();
  const [currentStatus, setCurrentStatus] = useState<EbookStatus>(book.status);
  const [notes, setNotes] = useState(book.audit.reviewerNotes);
  const [physicalVerified, setPhysicalVerified] = useState(
    book.audit.physicalSourceVerified
  );
  const [sanadVerified, setSanadVerified] = useState(book.audit.sanadChecked);
  const [matnVerified, setMatnVerified] = useState(book.audit.matnChecked);
  const [message, setMessage] = useState('');

  const handleUpdateStatus = (newStatus: EbookStatus) => {
    startTransition(async () => {
      const res = await togglePublishStatusAction(book.id, newStatus);
      if (res.success) {
        setCurrentStatus(newStatus);
        setMessage(
          newStatus === 'approved'
            ? 'বইটি অনুমোদিত হয়েছে।'
            : newStatus === 'changes_requested'
            ? 'সংশোধনের অনুরোধ পাঠানো হয়েছে।'
            : newStatus === 'published'
            ? 'বইটি সফলভাবে প্রকাশিত হয়েছে!'
            : 'স্ট্যাটাস হালনাগাদ করা হয়েছে।'
        );
      }
    });
  };

  return (
    <div className="bg-surface p-6 rounded-3xl border border-border shadow-xs hover:border-accent/40 transition-all space-y-4">
      {/* Title & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-lg font-bengali-heading text-foreground">
              {book.title.bn}
            </h4>
            <EbookStatusBadge status={currentStatus} />
          </div>
          <div className="text-xs text-muted-foreground font-arabic mt-0.5" dir="rtl">
            {book.title.ar}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            রচয়িতা: {book.author.bn} • ক্যাটাগরি: {book.category.name.bn}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/${locale}/read/${book.slug}`} target="_blank">
            <Button variant="outline" size="sm" className="text-xs flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-accent" />
              <span>রিডারে নিরীক্ষা করুন</span>
            </Button>
          </Link>
          <Link href={`/${locale}/admin/books/${book.id}/edit`}>
            <Button variant="outline" size="sm" className="text-xs flex items-center gap-1.5">
              <FileEdit className="w-3.5 h-3.5 text-accent" />
              <span>সম্পাদনা</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Physical Source Info */}
      <div className="p-3.5 rounded-2xl bg-muted/30 border border-border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <span className="font-semibold text-foreground">শারীরিক সংস্করণের রেফারেন্স:</span>{' '}
          <span className="font-mono text-accent-dark">{book.sourceReference}</span>
        </div>
        <div className="text-muted-foreground">
          তাহকিক গ্রেড: <span className="font-semibold text-foreground">{book.authenticityGrade}</span>
        </div>
      </div>

      {/* Verification Checkboxes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        <label className="flex items-center gap-2 text-xs font-medium cursor-pointer p-2.5 rounded-xl bg-muted/20 border border-border hover:bg-muted/40">
          <input
            type="checkbox"
            checked={physicalVerified}
            onChange={(e) => setPhysicalVerified(e.target.checked)}
            className="rounded text-primary focus:ring-accent"
          />
          <span>শারীরিক মূল সংস্করণ যাচাইকৃত</span>
        </label>

        <label className="flex items-center gap-2 text-xs font-medium cursor-pointer p-2.5 rounded-xl bg-muted/20 border border-border hover:bg-muted/40">
          <input
            type="checkbox"
            checked={sanadVerified}
            onChange={(e) => setSanadVerified(e.target.checked)}
            className="rounded text-primary focus:ring-accent"
          />
          <span>সনদ পরম্পরা বিশুদ্ধ</span>
        </label>

        <label className="flex items-center gap-2 text-xs font-medium cursor-pointer p-2.5 rounded-xl bg-muted/20 border border-border hover:bg-muted/40">
          <input
            type="checkbox"
            checked={matnVerified}
            onChange={(e) => setMatnVerified(e.target.checked)}
            className="rounded text-primary focus:ring-accent"
          />
          <span>আরবি মতন ও অনুবাদ নির্ভুল</span>
        </label>
      </div>

      {/* Scholar Notes */}
      <div>
        <label className="block text-xs font-semibold text-foreground mb-1">
          তাহকিক ও রিভিউ নোট (Scholarly Remarks)
        </label>
        <textarea
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="মুহাদ্দিস ও গবেষক প্যানেলের মন্তব্য..."
          className="w-full p-2.5 text-xs bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
      </div>

      {/* Message feedback */}
      {message && (
        <div className="text-xs font-semibold text-emerald-700 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
          {message}
        </div>
      )}

      {/* Workflow Action Buttons */}
      <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2 border-t border-border">
        {/* Request Changes */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isPending}
          onClick={() => handleUpdateStatus('changes_requested')}
          className="text-xs text-rose-700 hover:text-rose-800 hover:bg-rose-500/10 border-rose-500/20"
        >
          <AlertTriangle className="w-3.5 h-3.5 mr-1" />
          <span>সংশোধন প্রত্যাশা (Request Changes)</span>
        </Button>

        {/* Approve */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isPending}
          onClick={() => handleUpdateStatus('approved')}
          className="text-xs text-blue-700 hover:text-blue-800 hover:bg-blue-500/10 border-blue-500/20"
        >
          <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
          <span>অনুমোদন করুন (Approve)</span>
        </Button>

        {/* Publish */}
        <Button
          type="button"
          variant="accent"
          size="sm"
          disabled={isPending}
          onClick={() => handleUpdateStatus('published')}
          className="text-xs font-semibold shadow-xs"
        >
          {isPending ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
          ) : (
            <Check className="w-3.5 h-3.5 mr-1" />
          )}
          <span>চূড়ান্ত প্রকাশ করুন (Publish to Public)</span>
        </Button>
      </div>
    </div>
  );
};
