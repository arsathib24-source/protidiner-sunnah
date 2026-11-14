'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, Calendar, BookOpen, Clock, ShieldCheck, 
  MapPin, ArrowRight, Heart 
} from 'lucide-react';
import { SectionHeader, IslamicStarIcon } from '@/components/ui/decorative';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SEERAH_TIMELINE, SeerahMilestone } from '@/lib/data/seerah-data';

export default function SeerahTimelinePage({
  params,
}: {
  params: { lang: string };
}) {
  const lang = (params.lang || 'bn') as 'bn' | 'ar' | 'en';
  const [activeEra, setActiveEra] = useState<'all' | 'meccan' | 'medinan'>('all');

  const filteredTimeline = activeEra === 'all'
    ? SEERAH_TIMELINE
    : SEERAH_TIMELINE.filter((m) => m.era === activeEra);

  return (
    <div className="py-12 md:py-20 bg-background bg-islamic-pattern min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 space-y-12 max-w-4xl">
        <SectionHeader
          badge={lang === 'bn' ? 'সীরাতুন্নবী ﷺ' : lang === 'ar' ? 'السيرة النبوية المطهرة' : 'The Prophetic Biography'}
          title={lang === 'bn' ? 'নবীজি ﷺ-এর পবিত্র জীবনচরিত ও কালপঞ্জি' : lang === 'ar' ? 'المحطات الكبرى في السيرة النبوية' : 'Chronological Timeline of the Seerah'}
          subtitle={
            lang === 'bn'
              ? 'বিশ্বসেরা প্রামাণ্য সীরাত গ্রন্থ ‘আর-রাহীকুল মাখতূম’ ও ‘শামায়েলে তিরমিযী’-র আলোকে রাসুলুল্লাহ ﷺ-এর নবুওয়াতি জীবনের ঐতিহাসিক মাইলফলক।'
              : lang === 'ar'
              ? 'سيرة النبي المصطفى ﷺ من المولد الشريف حتى الوفاة مستخلصة من أمهات كتب السيرة المعتمدة.'
              : 'Chronological exploration of the Prophet Muhammad\'s ﷺ blessed life based on Ar-Raheeq Al-Makhtum.'
          }
        />

        {/* Era Filter Tabs */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setActiveEra('all')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
              activeEra === 'all'
                ? 'bg-primary text-background shadow-md'
                : 'bg-surface text-text-muted hover:text-primary border border-border'
            }`}
          >
            {lang === 'bn' ? 'সম্পূর্ণ জীবনচরিত (৭টি পর্ব)' : 'All Eras'}
          </button>
          <button
            onClick={() => setActiveEra('meccan')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
              activeEra === 'meccan'
                ? 'bg-primary text-background shadow-md'
                : 'bg-surface text-text-muted hover:text-primary border border-border'
            }`}
          >
            {lang === 'bn' ? 'মাক্কী জীবন (নবুওয়াত পূর্ব ও মক্কা পর্ব)' : 'Meccan Era'}
          </button>
          <button
            onClick={() => setActiveEra('medinan')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
              activeEra === 'medinan'
                ? 'bg-primary text-background shadow-md'
                : 'bg-surface text-text-muted hover:text-primary border border-border'
            }`}
          >
            {lang === 'bn' ? 'মাদানী জীবন (হিজরত ও ইসলামি রাষ্ট্র)' : 'Medinan Era'}
          </button>
        </div>

        {/* Timeline Events Vertical Stack */}
        <div className="relative border-s-2 border-accent/40 ms-4 sm:ms-8 ps-6 sm:ps-10 space-y-10">
          {filteredTimeline.map((item, idx) => (
            <div key={item.id} className="relative group">
              {/* Timeline Marker Dot */}
              <div className="absolute -start-[31px] sm:-start-[47px] top-6 w-5 h-5 rounded-full bg-accent border-4 border-background group-hover:scale-125 transition-transform" />

              <div className="bg-surface rounded-3xl border border-border hover:border-primary/40 transition-all p-6 sm:p-8 shadow-card space-y-4">
                {/* Milestone Dates & Era */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border/60">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={item.era === 'meccan' ? 'outline' : 'secondary'} size="sm">
                      {lang === 'bn' ? item.eraTitleBn : item.eraTitleEn}
                    </Badge>
                    <span className="text-xs font-mono font-bold text-accent">
                      {item.yearHijri} • {item.yearCE}
                    </span>
                  </div>

                  <span className="text-xs text-text-muted font-mono">
                    পর্ব {idx + 1}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-bengali-heading text-primary">
                    {lang === 'bn' ? item.titleBn : item.titleEn}
                  </h3>
                  <p className="font-arabic text-sm text-accent-dark mt-1" dir="rtl">
                    {item.titleAr}
                  </p>
                </div>

                {/* Summary */}
                <p className="text-sm sm:text-base text-foreground font-bengali-body leading-relaxed">
                  {lang === 'bn' ? item.summaryBn : item.summaryEn}
                </p>

                {/* Detailed Scholarly Narration */}
                <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 text-xs sm:text-sm text-foreground/85 leading-relaxed font-bengali-body">
                  {item.detailsBn}
                </div>

                {/* Source Citation */}
                <div className="pt-2 flex items-center justify-between text-xs text-text-muted">
                  <span className="flex items-center gap-1.5 font-mono text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>উৎস: {item.referenceSource}</span>
                  </span>

                  <Link
                    href={`/${lang}/ebooks/ar-raheeq-al-makhtum`}
                    className="text-primary hover:text-accent font-semibold inline-flex items-center gap-1 transition-colors"
                  >
                    <span>{lang === 'bn' ? 'সীরাত গ্রন্থে পড়ুন' : 'Read Book'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shama'il Section Callout */}
        <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-8 rounded-3xl border border-accent/40 shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-start">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              শামায়েলে তিরমিযী
            </span>
            <h4 className="text-xl font-bold font-bengali-heading text-background">
              নবীজি ﷺ-এর মুবারক আকৃতি ও চারিত্রিক সৌন্দর্য
            </h4>
            <p className="text-xs text-background/80 max-w-md">
              রাসুলুল্লাহ ﷺ-এর দৈহিক রূপ, বেশভূষা, হাঁটাচলা ও চারিত্রিক গুণাবলি জানতে আমাদের বিশেষ শামায়েল সংগ্রহশালা পড়ুন।
            </p>
          </div>

          <Link href={`/${lang}/ebooks/shamail-tirmidhi`}>
            <Button variant="accent" size="md" className="shrink-0 font-semibold shadow-md">
              <BookOpen className="w-4 h-4 me-2" />
              <span>শামায়েলে তিরমিযী পড়ুন</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
