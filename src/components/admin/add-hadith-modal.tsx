'use client';

import React, { useState, useTransition } from 'react';
import { Plus, X, Loader2, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createHadithRefAction } from '@/lib/admin/actions';

export const AddHadithModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const [bookSlug, setBookSlug] = useState('riyad-us-saliheen');
  const [collectionName, setCollectionName] = useState('সহিহ আল-বুখারি (Sahih al-Bukhari)');
  const [hadithNumber, setHadithNumber] = useState('');
  const [narrator, setNarrator] = useState('');
  const [grade, setGrade] = useState('Sahih');
  const [arabicText, setArabicText] = useState('');
  const [bengaliTranslation, setBengaliTranslation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!arabicText.trim() || !bengaliTranslation.trim() || !hadithNumber.trim()) {
      setError('হাদিস নম্বর, মূল আরবি মতন এবং বাংলা অনুবাদ আবশ্যক।');
      return;
    }

    const formData = new FormData();
    formData.append('bookSlug', bookSlug);
    formData.append('collectionName', collectionName);
    formData.append('hadithNumber', hadithNumber);
    formData.append('narrator', narrator);
    formData.append('grade', grade);
    formData.append('arabicText', arabicText);
    formData.append('bengaliTranslation', bengaliTranslation);

    startTransition(async () => {
      const res = await createHadithRefAction(formData);
      if (res.success) {
        setArabicText('');
        setBengaliTranslation('');
        setHadithNumber('');
        setIsOpen(false);
      } else {
        setError(res.error || 'হাদিস সংরক্ষণ ব্যর্থ হয়েছে।');
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
        <span>নতুন হাদিস রেফারেন্স</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-surface rounded-3xl border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-border flex items-center justify-between bg-primary text-white">
              <h3 className="font-bold text-base font-bengali-heading flex items-center gap-2">
                <Quote className="w-4 h-4 text-accent" />
                <span>বিশুদ্ধ হাদিস রেফারেন্স সংরক্ষণ</span>
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-white/80"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
              {error && (
                <div className="p-3 text-xs bg-destructive/10 text-destructive rounded-xl border border-destructive/20">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">হাদিস গ্রন্থ</label>
                  <select
                    value={collectionName}
                    onChange={(e) => setCollectionName(e.target.value)}
                    className="w-full p-2.5 text-xs bg-muted/40 border border-border rounded-xl font-medium"
                  >
                    <option value="সহিহ আল-বুখারি (Sahih al-Bukhari)">সহিহ আল-বুখারি</option>
                    <option value="সহিহ মুসলিম (Sahih Muslim)">সহিহ মুসলিম</option>
                    <option value="সুনান আত-তিরমিযী (Sunan at-Tirmidhi)">সুনান আত-তিরমিযী</option>
                    <option value="সুনান আবু দাউদ (Sunan Abi Dawud)">সুনান আবু দাউদ</option>
                    <option value="সুনান আন-নাসায়ী (Sunan an-Nasa'i)">সুনান আন-নাসায়ী</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">হাদিস নম্বর *</label>
                  <Input
                    type="text"
                    placeholder="যেমন: ১ অথবা ৫০৭২"
                    value={hadithNumber}
                    onChange={(e) => setHadithNumber(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">বর্ণনাকারী সাহাবি</label>
                  <Input
                    type="text"
                    placeholder="যেমন: উমর ইবনুল খাত্তাব (রা.)"
                    value={narrator}
                    onChange={(e) => setNarrator(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">তাহকিক গ্রেড</label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full p-2.5 text-xs bg-muted/40 border border-border rounded-xl font-medium"
                  >
                    <option value="Sahih">সহিহ (Sahih)</option>
                    <option value="Mutawatir">মুতাওয়াতির (Mutawatir)</option>
                    <option value="Hasan">হাসান (Hasan)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">
                  আরবি মূল মতন (হরকত ও নোকতা সহ) *
                </label>
                <textarea
                  rows={3}
                  dir="rtl"
                  placeholder="إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ..."
                  className="w-full p-3 text-base bg-muted/40 border border-border rounded-xl font-arabic"
                  value={arabicText}
                  onChange={(e) => setArabicText(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">বাংলা অনুবাদ *</label>
                <textarea
                  rows={3}
                  placeholder="নিশ্চয়ই আমল নিয়তের উপর নির্ভরশীল..."
                  className="w-full p-3 text-xs bg-muted/40 border border-border rounded-xl"
                  value={bengaliTranslation}
                  onChange={(e) => setBengaliTranslation(e.target.value)}
                  required
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
