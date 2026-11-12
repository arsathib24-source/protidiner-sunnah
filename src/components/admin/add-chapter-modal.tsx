'use client';

import React, { useState, useTransition } from 'react';
import { Plus, X, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createChapterAction } from '@/lib/admin/actions';

interface AddChapterModalProps {
  bookSlug: string;
  nextNumber: number;
}

export const AddChapterModal: React.FC<AddChapterModalProps> = ({
  bookSlug,
  nextNumber,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const [chapterNumber, setChapterNumber] = useState(nextNumber);
  const [titleBn, setTitleBn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [durationMins, setDurationMins] = useState(5);
  const [contentSnippet, setContentSnippet] = useState('');

  const handleOpen = () => {
    setIsOpen(true);
    setError('');
  };

  const handleClose = () => {
    setIsOpen(false);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleBn.trim()) {
      setError('অধ্যায়ের শিরোনাম আবশ্যক।');
      return;
    }

    const formData = new FormData();
    formData.append('bookSlug', bookSlug);
    formData.append('chapterNumber', String(chapterNumber));
    formData.append(
      'slug',
      `chapter-${chapterNumber}-${titleEn ? titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'section'}`
    );
    formData.append('titleBn', titleBn);
    formData.append('titleAr', titleAr);
    formData.append('titleEn', titleEn);
    formData.append('durationMins', String(durationMins));
    formData.append('contentSnippet', contentSnippet);
    formData.append('status', 'published');

    startTransition(async () => {
      const res = await createChapterAction(formData);
      if (res.success) {
        setTitleBn('');
        setTitleAr('');
        setTitleEn('');
        setContentSnippet('');
        setIsOpen(false);
      } else {
        setError(res.error || 'অধ্যায় যুক্ত করতে সমস্যা হয়েছে।');
      }
    });
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="accent"
        size="sm"
        className="font-semibold shadow-xs flex items-center gap-1.5"
      >
        <Plus className="w-4 h-4" />
        <span>নতুন অধ্যায় যোগ করুন</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-surface rounded-3xl border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-border flex items-center justify-between bg-primary text-white">
              <h3 className="font-bold text-base font-bengali-heading flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>নতুন অধ্যায় নিবন্ধন</span>
              </h3>
              <button
                onClick={handleClose}
                className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 text-xs bg-destructive/10 text-destructive rounded-xl border border-destructive/20">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">অধ্যায় নম্বর</label>
                  <Input
                    type="number"
                    min={1}
                    value={chapterNumber}
                    onChange={(e) => setChapterNumber(Number(e.target.value))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">পড়ার সময় (মিনিট)</label>
                  <Input
                    type="number"
                    min={1}
                    value={durationMins}
                    onChange={(e) => setDurationMins(Number(e.target.value))}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">অধ্যায়ের শিরোনাম (বাংলা) *</label>
                <Input
                  type="text"
                  placeholder="যেমন: ১. ইখলাস ও নিয়তের একনিষ্ঠতা"
                  value={titleBn}
                  onChange={(e) => setTitleBn(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">আরবি শিরোনাম (Arabic Title)</label>
                <Input
                  type="text"
                  dir="rtl"
                  placeholder="باب الإخلاص وإحضار النية"
                  className="font-arabic"
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">ইংরেজি শিরোনাম</label>
                <Input
                  type="text"
                  placeholder="Chapter on Sincerity"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">প্রাথমিক সারসংক্ষেপ বা মতন</label>
                <textarea
                  rows={3}
                  placeholder="অধ্যায়ের প্রথম কয়েকটি বাক্য বা হাদিস..."
                  value={contentSnippet}
                  onChange={(e) => setContentSnippet(e.target.value)}
                  className="w-full p-2.5 text-xs bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                <Button type="button" variant="outline" size="sm" onClick={handleClose}>
                  বাতিল
                </Button>
                <Button type="submit" variant="accent" size="sm" disabled={isPending}>
                  {isPending && <Loader2 className="w-4 h-4 animate-spin mr-1" />}
                  <span>সংরক্ষণ করুন</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
