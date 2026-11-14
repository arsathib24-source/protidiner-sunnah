import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Share2, Copy, BookOpen, Volume2, ShieldCheck } from 'lucide-react';
import { Locale } from '@/types/i18n';
import { SectionHeader, IslamicStarIcon } from '@/components/ui/decorative';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SURAH_LIST, VERIFIED_SURAHS_CONTENT } from '@/lib/data/quran-data';

interface QuranSurahPageProps {
  params: { lang: string; surah: string };
}

export async function generateMetadata({ params }: QuranSurahPageProps): Promise<Metadata> {
  const lang = (params.lang || 'bn') as Locale;
  const surahMeta = SURAH_LIST.find((s) => s.slug === params.surah || String(s.number) === params.surah);

  if (!surahMeta) {
    return { title: 'সূরা রিডার | আল-কুরআন' };
  }

  const title = lang === 'bn' ? `সূরা ${surahMeta.nameBengali}` : lang === 'ar' ? `سورة ${surahMeta.nameArabic}` : `Surah ${surahMeta.nameEnglish}`;

  return {
    title: `${title} | আল-কুরআনুল কারীম - প্রতিদিনের সুন্নাহ`,
    description: `Read ${title} online with Arabic Uthmani script and verified translations.`,
    alternates: {
      canonical: `/${lang}/quran/${surahMeta.slug}`,
      languages: {
        bn: `/bn/quran/${surahMeta.slug}`,
        ar: `/ar/quran/${surahMeta.slug}`,
        en: `/en/quran/${surahMeta.slug}`,
        'x-default': `/bn/quran/${surahMeta.slug}`,
      },
    },
  };
}

export default function QuranSurahPage({ params }: QuranSurahPageProps) {
  const lang = (params.lang || 'bn') as 'bn' | 'ar' | 'en';
  const surahMeta = SURAH_LIST.find((s) => s.slug === params.surah || String(s.number) === params.surah);

  if (!surahMeta) {
    notFound();
  }

  const surahData = VERIFIED_SURAHS_CONTENT[surahMeta.number];

  // Surah navigation
  const currentIndex = SURAH_LIST.findIndex((s) => s.number === surahMeta.number);
  const prevSurah = currentIndex > 0 ? SURAH_LIST[currentIndex - 1] : null;
  const nextSurah = currentIndex < SURAH_LIST.length - 1 ? SURAH_LIST[currentIndex + 1] : null;

  return (
    <div className="py-12 md:py-20 bg-background bg-islamic-pattern min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 space-y-10 max-w-4xl">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href={`/${lang}/quran`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-primary transition-colors bg-surface px-4 py-2 rounded-xl border border-border shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'সকল সূরার তালিকা' : lang === 'ar' ? 'فهرس السور' : 'All Surahs'}</span>
          </Link>

          <div className="flex items-center gap-2">
            {prevSurah && (
              <Link
                href={`/${lang}/quran/${prevSurah.slug}`}
                className="p-2 rounded-xl bg-surface border border-border text-text-muted hover:text-primary transition-colors"
                title={prevSurah.nameBengali}
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
            )}
            {nextSurah && (
              <Link
                href={`/${lang}/quran/${nextSurah.slug}`}
                className="p-2 rounded-xl bg-surface border border-border text-text-muted hover:text-primary transition-colors"
                title={nextSurah.nameBengali}
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Surah Header Banner */}
        <div className="relative rounded-3xl bg-gradient-to-br from-primary via-primary-light to-secondary text-primary-foreground p-8 sm:p-12 shadow-card-hover border-2 border-accent/40 text-center overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none p-6">
            <IslamicStarIcon className="w-48 h-48 text-accent" />
          </div>

          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-semibold">
              <span>{lang === 'bn' ? `সূরা নং ${surahMeta.number}` : `Surah No. ${surahMeta.number}`}</span>
              <span>•</span>
              <span>{lang === 'bn' ? surahMeta.revelationTypeBn : surahMeta.revelationType}</span>
              <span>•</span>
              <span>{surahMeta.totalAyahs} {lang === 'bn' ? 'আয়াত' : 'Ayahs'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-arabic text-accent-light py-2">
              سُورَةُ {surahMeta.nameArabic}
            </h1>

            <h2 className="text-xl sm:text-2xl font-bold font-bengali-heading text-background">
              {lang === 'bn' ? surahMeta.nameBengali : surahMeta.nameEnglish} ({lang === 'bn' ? surahMeta.meaningBengali : surahMeta.meaningEnglish})
            </h2>

            {/* Bismillah (except Surah Tawbah, and inside Fatihah verse 1 is already bismillah) */}
            {surahMeta.number !== 1 && surahMeta.number !== 9 && (
              <div dir="rtl" className="pt-6">
                <p className="font-arabic text-2xl sm:text-3xl text-accent-light tracking-wide">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Ayahs Display */}
        {surahData && surahData.ayahs.length > 0 ? (
          <div className="space-y-6">
            {surahData.ayahs.map((ayah) => (
              <div
                key={ayah.numberInSurah}
                id={`ayah-${ayah.numberInSurah}`}
                className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-card hover:border-primary/30 transition-all space-y-5"
              >
                {/* Ayah Header */}
                <div className="flex items-center justify-between pb-4 border-b border-border/60">
                  <span className="w-9 h-9 rounded-xl bg-secondary/30 text-primary font-bold font-mono text-sm flex items-center justify-center border border-secondary/40">
                    {ayah.numberInSurah}
                  </span>

                  <span className="text-xs text-text-muted">
                    {surahMeta.number}:{ayah.numberInSurah}
                  </span>
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

                {/* Localized Translation */}
                <div className="space-y-2 pt-2 border-t border-border/40">
                  <p className="text-base sm:text-lg text-foreground font-bengali-body leading-relaxed">
                    {lang === 'en' ? ayah.textEnglish : ayah.textBengali}
                  </p>

                  {lang === 'bn' && (
                    <p className="text-xs text-text-muted italic">
                      {ayah.textEnglish}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-surface p-10 rounded-3xl border border-border shadow-card text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-bengali-heading text-primary">
              {lang === 'bn' ? 'তাহকিক ও অনুবাদ সম্পাদন প্রক্রিয়াধীন' : 'Scholarly Verification in Progress'}
            </h3>
            <p className="text-xs sm:text-sm text-text-muted max-w-lg mx-auto leading-relaxed">
              {lang === 'bn'
                ? `সূরা ${surahMeta.nameBengali}-এর আয়াত ও অনুবাদের ডিজিটাল সংস্করণটি আমাদের তাহকিক প্যানেল কর্তৃক মদিনা কমপ্লেক্সের উসমানী লিপির সাথে পুঙ্খানুপুঙ্খ মেলানো হচ্ছে। ধর্মীয় টেক্সটের সর্বোচ্চ পবিত্রতা রক্ষায় নির্ভুল যাচাই সম্পন্ন হওয়ার পর পূর্ণাঙ্গ পাঠ উন্মুক্ত হবে।`
                : `The transcription of Surah ${surahMeta.nameEnglish} is currently being verified against the King Fahd Quran Printing Complex edition. Full authenticated text will be published soon.`}
            </p>
            <div className="pt-2">
              <Link href={`/${lang}/quran`}>
                <Button variant="outline" size="sm">
                  {lang === 'bn' ? 'অন্যান্য সূরা দেখুন' : 'Browse Other Surahs'}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
