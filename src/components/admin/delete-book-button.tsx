'use client';

import React, { useState, useTransition } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { deleteBookAction } from '@/lib/admin/actions';

interface DeleteBookButtonProps {
  bookId: string;
  bookTitle: string;
}

export const DeleteBookButton: React.FC<DeleteBookButtonProps> = ({
  bookId,
  bookTitle,
}) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`আপনি কি নিশ্চিত যে "${bookTitle}" ই-বুকটি মুছে ফেলতে চান?`)) {
      startTransition(async () => {
        await deleteBookAction(bookId);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-colors disabled:opacity-50"
      title="মুছে ফেলুন"
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin text-destructive" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
};
