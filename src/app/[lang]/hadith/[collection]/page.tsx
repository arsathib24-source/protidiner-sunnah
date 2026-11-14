import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, ArrowRight, ShieldCheck, BookOpen, Search, 
  Sparkles, Layers, UserCheck, Calendar 
} from 'lucide-react';
import { Locale } from '@/types/i18n';
import { SectionHeader, IslamicStarIcon } from '@/components/ui/decorative';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HADITH_COLLECTIONS, FEATURED_HADITHS } from '@/lib/data/hadith-data';

interface HadithCollectionPageProps {
  params: { lang: string; collection: string };
  searchParams?: { q?: string; chapter?: string };
}

export async function generateMetadata({ params }: HadithCollectionPageProps): Promise<Metadata> {
  const lang = (params.lang || 'bn') as Locale;
  const col = HADITH_COLLECTIONS.find((c) => c.slug === params.collection);

  if (!col) {
    return { title: 'হাদিস সংকলন | প্রতিদিনের সুন্নাহ' };
  }

  const title = lang === 'bn' ? col.nameBengali : lang === 'ar' ? col.nameArabic : col.nameEnglish;

  return {
    title: `${title} | হাদিস শাস্ত্র - প্রতিদিনের সুন্নাহ`,
    description: `Explore authentic narrations and verified hadiths from ${title}.`,
    alternates: {
      canonical: `/${lang}/hadith/${col.slug}`,
      languages: {
        bn: `/bn/hadith/${col.slug}`,
        ar: `/ar/hadith/${col.slug}`,
        en: `/en/hadith/${col.slug}`,
        'x-default': `/bn/hadith/${col.slug}`,
      },
    },
  };
}

export default function HadithCollectionPage({ params, searchParams }: HadithCollectionPageProps) {
  const lang = (params.lang || 'bn') as 'bn' | 'ar' | 'en';
  const col = HADITH_COLLECTIONS.find((c) => c.slug === params.collection);

  if (!col) {
    notFound();
  }

  const query = (searchParams?.q || '').toLowerCase().trim();

  // Filter hadiths belonging to this collection
  let hadiths = FEATURED_HADITHS.filter((h) => h.collectionSlug === col.slug);

  if (query) {
    hadiths = hadiths.filter(
      (h) =>
        h.hadithNumber === query ||
        h.bengaliText.toLowerCase().includes(query) ||
        h.englishText.toLowerCase().includes(query) ||
        h.narratorBn.toLowerCase().includes(query) ||
        h.arabicText.includes(query)
    );
  }

  return (
    <div className="py-12 md:py-20 bg-background bg-islamic-pattern min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 space-y-12 max-w-5xl">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href={`/${lang}/hadith`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-primary transition-colors bg-surface px-4 py-2 rounded-xl border border-border shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
            <span>{lang === 'bn' ? 'সকল হাদিস গ্রন্থ' : 'All Collections'}</span>
          </Link>
        </div>

        {/* Collection Hero Banner */}
        <div className="relative rounded-3xl bg-gradient-to-br from-primary via-primary-light to-secondary text-primary-foreground p-8 sm:p-12 shadow-card-hover border-2 border-accent/40 overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none p-6">
            <IslamicStarIcon className="w-56 h-56 text-accent" />
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-accent text-primary font-bold">
                কুতুবে সিত্তাহ
              </span>
              <span className="px-3 py-1 rounded-full bg-primary-dark/80 text-accent font-mono border border-accent/30">
                মোট {col.totalHadithCount} টি হাদিস
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-900/80 text-emerald-300 font-semibold border border-emerald-500/30">
                {col.authenticityStatusBn}
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold font-bengali-heading text-background">
                {lang === 'bn' ? col.nameBengali : col.nameEnglish}
              </h1>
              <p className="font-arabic text-2xl text-accent-light mt-1" dir="rtl">
                {col.nameArabic}
              </p>
            </div>

            <p className="text-sm sm:text-base text-background/85 leading-relaxed max-w-2xl font-bengali-body">
              {col.descriptionBn}
            </p>

            {/* Compiler Info */}
            <div className="pt-4 border-t border-primary-light/60 flex flex-wrap items-center gap-6 text-xs text-background/80">
              <span>
                <strong>সংকলক:</strong> {col.authorBengali}
              </span>
              <span>
                <strong>তিরোধান:</strong> {col.deathYearHijri}
              </span>
            </div>
          </div>
        </div>

        {/* Hadith List for this Collection */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <h3 className="text-lg font-bold font-bengali-heading text-primary flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-accent" />
              <span>{lang === 'bn' ? 'সংকলনভুক্ত প্রামাণ্য হাদিসসমূহ' : 'Hadiths in Collection'}</span>
            </h3>
            <span className="text-xs text-text-muted">
              {hadiths.length}টি হাদিস প্রদর্শিত
            </span>
          </div>

          {hadiths.length > 0 ? (
            <div className="space-y-6">
              {hadiths.map((item) => (
                <div
                  key={item.id}
                  id={`hadith-${item.hadithNumber}`}
                  className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border/60">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" size="sm">
                        {item.collectionNameBn}
                      </Badge>
                      <span className="text-xs text-text-muted font-bold font-mono">
                        হাদিস নং {item.hadithNumber}
                      </span>
                      <span className="text-xs text-text-muted">• {item.chapterTitleBn}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                      <ShieldCheck className="w-4 h-4" />
                      <span>{item.gradeBn}</span>
                    </div>
                  </div>

                  {/* Arabic Text with Tashkeel */}
                  <div dir="rtl" className="text-right py-2">
                    <p className="font-arabic text-2xl sm:text-3xl text-primary leading-loose tracking-wide">
                      {item.arabicText}
                    </p>
                  </div>

                  {/* Narrator & Bengali Translation */}
                  <div className="space-y-2">
                    <p className="text-xs text-text-muted font-semibold">
                      {lang === 'bn' ? `বর্ণনাকারী: ${item.narratorBn}` : `Narrator: ${item.narratorEn}`}
                    </p>
                    <blockquote className="text-base sm:text-lg text-foreground font-bengali-body leading-relaxed border-s-4 border-accent ps-4 py-1">
                      {item.bengaliText}
                    </blockquote>
                    <p className="text-xs text-text-muted italic pt-1">
                      {item.englishText}
                    </p>
                  </div>

                  {/* Scholarly Commentary */}
                  {item.explanationBn && (
                    <div className="p-4 rounded-2xl bg-secondary/15 border border-secondary/30 text-xs sm:text-sm text-foreground/85 leading-relaxed">
                      <span className="font-bold text-primary block mb-1">
                        মুহাদ্দিসীনদের ব্যাখ্যা ও ফায়দা:
                      </span>
                      {item.explanationBn}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-surface p-12 rounded-3xl border border-border text-center space-y-3">
              <p className="text-sm text-text-muted">
                এই মুহূর্তে নির্বাচিত হাদিসটি প্রক্রিয়াকরণাধীন। অতি শীঘ্রই আরও হাদিস উন্মুক্ত করা হবে।
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
