import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ShieldCheck, Sparkles, ArrowRight, UserCheck, Search } from 'lucide-react';
import { Locale } from '@/types/i18n';
import { SectionHeader, IslamicStarIcon } from '@/components/ui/decorative';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HADITH_COLLECTIONS, FEATURED_HADITHS } from '@/lib/data/hadith-data';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = (params.lang || 'bn') as Locale;

  return {
    title: lang === 'bn' ? 'হাদিস জ্ঞান কেন্দ্র (কুতুবে সিত্তাহ) | প্রতিদিনের সুন্নাহ' : lang === 'ar' ? 'مركز الحديث الشريف (الكتب الستة) | سنة اليوم' : 'Hadith Knowledge Center | Protidiner Sunnah',
    description: 'Explore the canonical Kutub al-Sittah hadith collections: Sahih Bukhari, Sahih Muslim, Abu Dawood, Tirmidhi, Nasa\'i, and Ibn Majah with verified grading.',
    alternates: {
      canonical: `/${lang}/hadith`,
      languages: {
        bn: '/bn/hadith',
        ar: '/ar/hadith',
        en: '/en/hadith',
        'x-default': '/bn/hadith',
      },
    },
  };
}

export default function HadithIndexPage({
  params,
}: {
  params: { lang: string };
}) {
  const lang = (params.lang || 'bn') as 'bn' | 'ar' | 'en';

  return (
    <div className="py-12 md:py-20 bg-background bg-islamic-pattern min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 space-y-16 max-w-6xl">
        <SectionHeader
          badge={lang === 'bn' ? 'কুতুবে সিত্তাহ' : lang === 'ar' ? 'أمهات كتب الحديث' : 'The Six Canonical Hadith Books'}
          title={lang === 'bn' ? 'হাদিস শাস্ত্র ও সুন্নাহর প্রামাণ্য সংকলন' : lang === 'ar' ? 'مركز الحديث الشريف والسنن المعتمدة' : 'Hadith Knowledge Center'}
          subtitle={
            lang === 'bn'
              ? 'রাসুলুল্লাহ ﷺ-এর পবিত্র বাণী, কর্ম ও সম্মতির বিশুদ্ধতম সংকলনসমূহ: বুখারি, মুসলিম, তিরমিজি, আবু দাউদ, নাসায়ী ও ইবনে মাজাহ।'
              : lang === 'ar'
              ? 'تصفح أصح كتب السنة النبوية المطهرة مع التحقيق والتدقيق وتخريج الأحاديث.'
              : 'Explore the foundational Hadith collections of Prophet Muhammad ﷺ with verified sanad chains and scholarly grading.'
          }
        />

        {/* 1. Kutub al-Sittah Collections Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-bengali-heading text-primary flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent" />
              <span>{lang === 'bn' ? 'প্রধান হাদিস গ্রন্থসমূহ' : lang === 'ar' ? 'الكتب الستة المعتمدة' : 'Major Hadith Compilations'}</span>
            </h3>
            <span className="text-xs text-text-muted">৬টি কিতাব</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HADITH_COLLECTIONS.map((col) => (
              <div
                key={col.slug}
                className="bg-surface rounded-3xl border border-border hover:border-primary/40 transition-all p-6 shadow-card hover:shadow-card-hover flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-arabic text-xl text-accent font-semibold">
                      {col.nameArabic}
                    </span>
                    <Badge variant="outline" size="sm">
                      {col.totalHadithCount} {lang === 'bn' ? 'হাদিস' : 'Hadiths'}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg text-primary">
                      {lang === 'bn' ? col.nameBengali : col.nameEnglish}
                    </h4>
                    <p className="text-xs text-text-muted mt-0.5">
                      {lang === 'bn' ? col.authorBengali : col.authorEnglish} ({col.deathYearHijri})
                    </p>
                  </div>

                  <p className="text-xs text-foreground/80 leading-relaxed font-bengali-body">
                    {lang === 'bn' ? col.descriptionBn : col.descriptionEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? col.authenticityStatusBn : col.authenticityStatusEn}</span>
                  </span>

                  <Link
                    href={`/${lang}/ebooks`}
                    className="text-primary hover:text-accent font-semibold inline-flex items-center gap-1 transition-colors"
                  >
                    <span>{lang === 'bn' ? 'কিতাব পড়ুন' : 'Read'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Featured Verified Hadiths */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-bengali-heading text-primary flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <span>{lang === 'bn' ? 'নির্বাচিত প্রামাণ্য হাদিস ও তাহকিক' : 'Featured Authentic Hadiths'}</span>
            </h3>
          </div>

          <div className="space-y-6">
            {FEATURED_HADITHS.map((item) => (
              <div
                key={item.id}
                className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border/60">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" size="sm">
                      {item.collectionNameBn}
                    </Badge>
                    <span className="text-xs text-text-muted">• হাদিস নং {item.hadithNumber}</span>
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
                </div>

                {/* Scholarly Commentary */}
                {item.explanationBn && (
                  <div className="p-4 rounded-2xl bg-secondary/15 border border-secondary/30 text-xs sm:text-sm text-foreground/85 leading-relaxed">
                    <span className="font-bold text-primary block mb-1">
                      {lang === 'bn' ? 'মুহাদ্দিসীনদের ব্যাখ্যা ও ফায়দা:' : 'Scholarly Insights:'}
                    </span>
                    {item.explanationBn}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
