'use client';

import React, { useState, useTransition } from 'react';
import { Check, UploadCloud, EyeOff, Loader2 } from 'lucide-react';
import { togglePublishStatusAction } from '@/lib/admin/actions';
import { EbookStatus } from '@/lib/admin/admin-store';

interface QuickPublishButtonProps {
  bookId: string;
  currentStatus: EbookStatus;
}

export const QuickPublishButton: React.FC<QuickPublishButtonProps> = ({
  bookId,
  currentStatus,
}) => {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<EbookStatus>(currentStatus);

  const handleToggle = () => {
    const nextStatus: EbookStatus = status === 'published' ? 'draft' : 'published';
    startTransition(async () => {
      const res = await togglePublishStatusAction(bookId, nextStatus);
      if (res.success) {
        setStatus(nextStatus);
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50 ${
        status === 'published'
          ? 'bg-emerald-500/10 hover:bg-rose-500/10 text-emerald-700 hover:text-rose-700 border border-emerald-500/20 hover:border-rose-500/20'
          : 'bg-accent/15 hover:bg-accent/25 text-accent-dark border border-accent/30'
      }`}
      title={status === 'published' ? 'অপ্রকাশিত করুন (Unpublish)' : 'প্রকাশ করুন (Publish)'}
    >
      {isPending ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : status === 'published' ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span>প্রকাশিত</span>
        </>
      ) : (
        <>
          <UploadCloud className="w-3.5 h-3.5 text-accent" />
          <span>প্রকাশ করুন</span>
        </>
      )}
    </button>
  );
};
