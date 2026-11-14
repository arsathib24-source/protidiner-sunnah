'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, ArrowRight, Copy, Check, Share2, Bookmark, 
  Volume2, VolumeX, ShieldCheck, Sparkles 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IslamicStarIcon } from '@/components/ui/decorative';
import { SurahMeta, AyahItem } from '@/lib/data/quran-data';

interface SurahReaderViewProps {
  surahMeta: SurahMeta;
  ayahs: AyahItem[];
  prevSurah: SurahMeta | null;
  nextSurah: SurahMeta | null;
  locale: 'bn' | 'ar' | 'en';
}

export const SurahReaderView: React.FC<SurahReaderViewProps> = ({
  surahMeta,
  ayahs,
  prevSurah,
  nextSurah,
  locale,
}) => {
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);
  const [bookmarkedAyahs, setBookmarkedAyahs] = useState<number[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(`bm_quran_${surahMeta.number}`);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const toggleBookmark = (ayahNum: number) => {
    setBookmarkedAyahs((prev) => {
      const next = prev.includes(ayahNum)
        ? prev.filter((n) => n !== ayahNum)
        : [...prev, ayahNum];
      try {
        localStorage.setItem(`bm_quran_${surahMeta.number}`, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleCopyAyah = (ayah: AyahItem) => {
    const text = `${ayah.textArabic}\n\n${ayah.textBengali}\n\n[সূরা ${surahMeta.nameBengali}: আয়াত ${ayah.numberInSurah}] — প্রতিদিনের সুন্নাহ`;
    navigator.clipboard.writeText(text);
    setCopiedAyah(ayah.numberInSurah);
    setTimeout(() => setCopiedAyah(null), 2500);
  };

  const handleShareAyah = async (ayah: AyahItem) => {
    const text = `${ayah.textArabic}\n${ayah.textBengali}\n[সূরা ${surahMeta.nameBengali}: আয়াত ${ayah.numberInSurah}]`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `সূরা ${surahMeta.nameBengali} - আয়াত ${ayah.numberInSurah}`,
          text,
          url: `${window.location.origin}/${locale}/quran/${surahMeta.slug}#ayah-${ayah.numberInSurah}`,
        });
      } catch {
        handleCopyAyah(ayah);
      }
    } else {
      handleCopyAyah(ayah);
    }
  };

  return (
    <div className="space-y-10">
      {/* 1. Surah Top Navigation Bar */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href={`/${locale}/quran`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-primary transition-colors bg-surface px-4 py-2 rounded-xl border border-border shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
          <span>{locale === 'bn' ? 'সকল সূরার তালিকা' : 'All Surahs'}</span>
        </Link>

        <div className="flex items-center gap-2">
          {prevSurah && (
            <Link
              href={`/${locale}/quran/${prevSurah.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface border border-border text-xs text-text-muted hover:text-primary transition-colors"
              title={prevSurah.nameBengali}
            >
              <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
              <span className="hidden sm:inline">{prevSurah.nameBengali}</span>
            </Link>
          )}
          {nextSurah && (
            <Link
              href={`/${locale}/quran/${nextSurah.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface border border-border text-xs text-text-muted hover:text-primary transition-colors"
              title={nextSurah.nameBengali}
            >
              <span className="hidden sm:inline">{nextSurah.nameBengali}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          )}
        </div>
      </div>

      {/* 2. Surah Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-primary via-primary-light to-secondary text-primary-foreground p-8 sm:p-12 shadow-card-hover border-2 border-accent/40 text-center overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none p-6">
          <IslamicStarIcon className="w-48 h-48 text-accent" />
        </div>

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-semibold">
            <span>{locale === 'bn' ? `সূরা নং ${surahMeta.number}` : `Surah No. ${surahMeta.number}`}</span>
            <span>•</span>
            <span>{locale === 'bn' ? surahMeta.revelationTypeBn : surahMeta.revelationType}</span>
            <span>•</span>
            <span>{surahMeta.totalAyahs} {locale === 'bn' ? 'আয়াত' : 'Ayahs'}</span>
            <span>•</span>
            <span>{locale === 'bn' ? `পারা ${surahMeta.juzStart}` : `Juz ${surahMeta.juzStart}`}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-arabic text-accent-light py-2">
            سُورَةُ {surahMeta.nameArabic}
          </h1>

          <h2 className="text-xl sm:text-2xl font-bold font-bengali-heading text-background">
            {locale === 'bn' ? surahMeta.nameBengali : surahMeta.nameEnglish} ({locale === 'bn' ? surahMeta.meaningBengali : surahMeta.meaningEnglish})
          </h2>

          {/* Bismillah */}
          {surahMeta.number !== 1 && surahMeta.number !== 9 && (
            <div dir="rtl" className="pt-6">
              <p className="font-arabic text-2xl sm:text-3xl text-accent-light tracking-wide">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Ayahs Display */}
      {ayahs.length > 0 ? (
        <div className="space-y-6">
          {ayahs.map((ayah) => {
            const isBookmarked = bookmarkedAyahs.includes(ayah.numberInSurah);

            return (
              <div
                key={ayah.numberInSurah}
                id={`ayah-${ayah.numberInSurah}`}
                className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-card hover:border-primary/30 transition-all space-y-5"
              >
                {/* Ayah Header Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-secondary/30 text-primary font-bold font-mono text-xs flex items-center justify-center border border-secondary/40">
                      {ayah.numberInSurah}
                    </span>
                    <span className="text-xs text-text-muted font-mono">
                      {surahMeta.number}:{ayah.numberInSurah}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleBookmark(ayah.numberInSurah)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isBookmarked
                          ? 'text-accent bg-accent/15'
                          : 'text-text-muted hover:text-primary'
                      }`}
                      title={locale === 'bn' ? 'আয়াত বুকমার্ক করুন' : 'Bookmark Ayah'}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={() => handleCopyAyah(ayah)}
                      className="p-1.5 rounded-lg text-text-muted hover:text-primary transition-colors"
                      title={locale === 'bn' ? 'আয়াত কপি করুন' : 'Copy Ayah'}
                    >
                      {copiedAyah === ayah.numberInSurah ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      onClick={() => handleShareAyah(ayah)}
                      className="p-1.5 rounded-lg text-text-muted hover:text-primary transition-colors"
                      title={locale === 'bn' ? 'শেয়ার করুন' : 'Share Ayah'}
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Arabic Text with Tashkeel */}
                <div dir="rtl" className="text-right py-2">
                  <p className="font-arabic text-2xl sm:text-3xl text-primary leading-loose tracking-wide">
                    {ayah.textArabic}
                    <span className="inline-block mx-2 text-accent text-xl font-bold">
                      ۝{ayah.numberInSurah}
                    </span>
                  </p>
                </div>

                {/* Localized Translations */}
                <div className="space-y-2 pt-2 border-t border-border/40">
                  <p className="text-base sm:text-lg text-foreground font-bengali-body leading-relaxed">
                    {locale === 'en' ? ayah.textEnglish : ayah.textBengali}
                  </p>

                  {locale === 'bn' && (
                    <p className="text-xs text-text-muted italic">
                      {ayah.textEnglish}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-surface p-10 rounded-3xl border border-border shadow-card text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold font-bengali-heading text-primary">
            {locale === 'bn' ? 'তাহকিক ও হরফ মেলানো প্রক্রিয়াধীন' : 'Scholarly Verification in Progress'}
          </h3>
          <p className="text-xs sm:text-sm text-text-muted max-w-lg mx-auto leading-relaxed">
            {locale === 'bn'
              ? `সূরা ${surahMeta.nameBengali}-এর আয়াতসমূহ বাদশাহ ফাহাদ কুরআন প্রিন্টিং কমপ্লেক্সের মূল উসমানী নুসখা ও ইসলামিক ফাউন্ডেশনের অনুবাদের সাথে পুঙ্খানুপুঙ্খ মেলানো হচ্ছে। ধর্মীয় পবিত্রতার স্বার্থে সম্পূর্ণ নির্ভুল যাচাই ছাড়া প্রকাশ করা হয় না।`
              : `The text of Surah ${surahMeta.nameEnglish} is undergoing letter-by-letter review against the official King Fahd Complex printing. Full verified verses will be released shortly.`}
          </p>
          <div className="pt-2">
            <Link href={`/${locale}/quran`}>
              <Button variant="outline" size="sm">
                {locale === 'bn' ? 'অন্যান্য সূরা দেখুন' : 'Browse Other Surahs'}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
