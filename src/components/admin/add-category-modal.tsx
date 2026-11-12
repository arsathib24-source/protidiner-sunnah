'use client';

import React, { useState, useTransition } from 'react';
import { Plus, X, Loader2, FolderTree } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createCategoryAction } from '@/lib/admin/actions';

interface AddCategoryModalProps {
  nextOrder: number;
}

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ nextOrder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const [nameBn, setNameBn] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [slug, setSlug] = useState('');
  const [sortOrder, setSortOrder] = useState(nextOrder);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameBn.trim()) {
      setError('ক্যাটাগরির বাংলা নাম আবশ্যক।');
      return;
    }

    const formData = new FormData();
    formData.append('nameBn', nameBn);
    formData.append('nameAr', nameAr);
    formData.append('nameEn', nameEn);
    formData.append(
      'slug',
      slug || nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `cat-${Date.now()}`
    );
    formData.append('sortOrder', String(sortOrder));

    startTransition(async () => {
      const res = await createCategoryAction(formData);
      if (res.success) {
        setNameBn('');
        setNameAr('');
        setNameEn('');
        setSlug('');
        setIsOpen(false);
      } else {
        setError(res.error || 'ক্যাটাগরি তৈরি করতে ব্যর্থ হয়েছে।');
      }
    });
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="accent"
        size="sm"
        className="font-semibold shadow-xs flex items-center gap-1.5"
      >
        <Plus className="w-4 h-4" />
        <span>নতুন ক্যাটাগরি</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-surface rounded-3xl border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border flex items-center justify-between bg-primary text-white">
              <h3 className="font-bold text-base font-bengali-heading flex items-center gap-2">
                <FolderTree className="w-4 h-4 text-accent" />
                <span>নতুন ক্যাটাগরি তৈরি</span>
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-white/80"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 text-xs bg-destructive/10 text-destructive rounded-xl border border-destructive/20">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold mb-1">বাংলা নাম *</label>
                <Input
                  type="text"
                  placeholder="যেমন: আক্বিদা ও তাওহিদ"
                  value={nameBn}
                  onChange={(e) => setNameBn(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">আরবি নাম</label>
                <Input
                  type="text"
                  dir="rtl"
                  placeholder="العقيدة والتوحيد"
                  className="font-arabic"
                  value={nameAr}
                  onChange={(e) => setNameAr(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">ইংরেজি নাম</label>
                <Input
                  type="text"
                  placeholder="Creed & Monotheism"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">স্ল্যাগ (Slug)</label>
                <Input
                  type="text"
                  placeholder="creed"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
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
