import React from 'react';
import { EbookStatus } from '@/lib/admin/admin-store';

interface EbookStatusBadgeProps {
  status: EbookStatus;
  className?: string;
}

export const EbookStatusBadge: React.FC<EbookStatusBadgeProps> = ({
  status,
  className = '',
}) => {
  const configs: Record<
    EbookStatus,
    { labelBn: string; labelEn: string; bg: string; text: string; dot: string }
  > = {
    draft: {
      labelBn: 'খসড়া',
      labelEn: 'Draft',
      bg: 'bg-muted text-muted-foreground border-border',
      text: 'text-muted-foreground',
      dot: 'bg-muted-foreground',
    },
    review: {
      labelBn: 'পর্যালোচনাধীন',
      labelEn: 'Under Review',
      bg: 'bg-amber-500/15 text-amber-800 border-amber-500/30',
      text: 'text-amber-800',
      dot: 'bg-amber-500 animate-pulse',
    },
    changes_requested: {
      labelBn: 'সংশোধন প্রত্যাশিত',
      labelEn: 'Changes Req.',
      bg: 'bg-rose-500/15 text-rose-800 border-rose-500/30',
      text: 'text-rose-800',
      dot: 'bg-rose-500',
    },
    approved: {
      labelBn: 'অনুমোদিত',
      labelEn: 'Approved',
      bg: 'bg-blue-500/15 text-blue-800 border-blue-500/30',
      text: 'text-blue-800',
      dot: 'bg-blue-500',
    },
    published: {
      labelBn: 'প্রকাশিত',
      labelEn: 'Published',
      bg: 'bg-emerald-500/15 text-emerald-800 border-emerald-500/30',
      text: 'text-emerald-800',
      dot: 'bg-emerald-500',
    },
    archived: {
      labelBn: 'আর্কাইভকৃত',
      labelEn: 'Archived',
      bg: 'bg-gray-500/15 text-gray-700 border-gray-500/30',
      text: 'text-gray-700',
      dot: 'bg-gray-400',
    },
  };

  const current = configs[status] || configs.draft;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${current.bg} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
      <span>{current.labelBn}</span>
    </span>
  );
};
