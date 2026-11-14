'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, BookOpen, Layers, X, Sparkles, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SURAH_LIST, JUZ_LIST, SurahMeta, JuzMeta } from '@/lib/data/quran-data';

interface QuranIndexViewProps {
  locale: 'bn' | 'ar' | 'en';
}

export const QuranIndexView: React.FC<QuranIndexViewProps> = ({ locale }) => {
  const [activeTab, setActiveTab] = useState<'surah' | 'juz'>('surah');
  const [revelationFilter, setRevelationFilter] = useState<'all' | 'Meccan' | 'Medinan'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSurahs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return SURAH_LIST.filter((surah) => {
      // 1. Revelation filter
      if (revelationFilter !== 'all' && surah.revelationType !== revelationFilter) {
        return false;
      }
      // 2. Query filter
      if (!q) return true;
      return (
        surah.nameBengali.toLowerCase().includes(q) ||
        surah.nameEnglish.toLowerCase().includes(q) ||
        surah.nameArabic.includes(q) ||
        surah.meaningBengali.toLowerCase().includes(q) ||
        surah.meaningEnglish.toLowerCase().includes(q) ||
        String(surah.number) === q
      );
    });
  }, [searchQuery, revelationFilter]);

  return (
    <div className="space-y-8">
      {/* 1. View Switcher (Surah vs Juz) & Search Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-surface p-4 rounded-3xl border border-border shadow-card">
        {/* Tab Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('surah')}
            className={`flex-1 md:flex-none px-5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
              activeTab === 'surah'
                ? 'bg-primary text-background shadow-md'
                : 'text-text-muted hover:text-primary hover:bg-muted/40'
            }`}
          >
            {locale === 'bn' ? `সূরা অনুযায়ী (${SURAH_LIST.length})` : locale === 'ar' ? 'فهرس السور' : `By Surah (${SURAH_LIST.length})`}
          </button>
          <button
            onClick={() => setActiveTab('juz')}
            className={`flex-1 md:flex-none px-5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
              activeTab === 'juz'
                ? 'bg-primary text-background shadow-md'
                : 'text-text-muted hover:text-primary hover:bg-muted/40'
            }`}
          >
            {locale === 'bn' ? `পারা অনুযায়ী (${JUZ_LIST.length})` : locale === 'ar' ? 'فهرس الأجزاء' : `By Juz (${JUZ_LIST.length})`}
          </button>
        </div>

        {/* Search Input for Surahs */}
        {activeTab === 'surah' && (
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === 'bn' ? 'সূরার নাম বা নম্বর দিয়ে খুঁজুন...' : 'Search surah by name or number...'}
              className="pl-9 pr-9 py-2 text-xs rounded-xl bg-background border-border/80 focus:border-accent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* 2. Revelation Filters (Makki / Madani) when in Surah mode */}
      {activeTab === 'surah' && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setRevelationFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              revelationFilter === 'all'
                ? 'bg-secondary text-primary font-bold'
                : 'bg-surface text-text-muted hover:text-primary border border-border'
            }`}
          >
            {locale === 'bn' ? `সকল সূরা (${SURAH_LIST.length})` : `All (${SURAH_LIST.length})`}
          </button>
          <button
            onClick={() => setRevelationFilter('Meccan')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              revelationFilter === 'Meccan'
                ? 'bg-secondary text-primary font-bold'
                : 'bg-surface text-text-muted hover:text-primary border border-border'
            }`}
          >
            {locale === 'bn' ? 'মাক্কী সূরাসমূহ' : 'Meccan Surahs'}
          </button>
          <button
            onClick={() => setRevelationFilter('Medinan')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              revelationFilter === 'Medinan'
                ? 'bg-secondary text-primary font-bold'
                : 'bg-surface text-text-muted hover:text-primary border border-border'
            }`}
          >
            {locale === 'bn' ? 'মাদানী সূরাসমূহ' : 'Medinan Surahs'}
          </button>
        </div>
      )}

      {/* 3. Surah Grid View */}
      {activeTab === 'surah' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredSurahs.map((surah) => (
            <Link
              key={surah.number}
              href={`/${locale}/quran/${surah.slug}`}
              className="group bg-surface hover:bg-surface-muted/40 p-5 rounded-3xl border border-border hover:border-primary/40 transition-all duration-300 shadow-card hover:shadow-card-hover flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-secondary/20 group-hover:bg-primary group-hover:text-background text-primary font-bold font-mono text-sm flex items-center justify-center border border-secondary/30 transition-colors shrink-0">
                  {surah.number}
                </div>

                <div>
                  <h4 className="font-bold text-base text-primary group-hover:text-primary transition-colors flex items-center gap-2">
                    <span>{locale === 'bn' ? surah.nameBengali : locale === 'ar' ? surah.nameArabic : surah.nameEnglish}</span>
                  </h4>
                  <p className="text-xs text-text-muted mt-0.5 line-clamp-1">
                    {locale === 'bn' ? surah.meaningBengali : surah.meaningEnglish} • {surah.totalAyahs} {locale === 'bn' ? 'আয়াত' : 'Ayahs'}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <Badge variant="outline" size="sm">
                      {locale === 'bn' ? surah.revelationTypeBn : surah.revelationType}
                    </Badge>
                    <span className="text-[10px] text-text-muted font-mono">
                      {locale === 'bn' ? `পারা ${surah.juzStart}` : `Juz ${surah.juzStart}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Classical Arabic Calligraphy Name */}
              <div dir="rtl" className="text-right shrink-0">
                <span className="font-arabic text-xl sm:text-2xl text-accent font-semibold block group-hover:scale-105 transition-transform">
                  {surah.nameArabic}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* 4. Juz (30 Para) Grid View */}
      {activeTab === 'juz' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {JUZ_LIST.map((juz) => (
            <div
              key={juz.number}
              className="bg-surface p-6 rounded-3xl border border-border hover:border-primary/40 transition-all shadow-card flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-9 h-9 rounded-xl bg-secondary/30 text-primary font-bold font-mono text-sm flex items-center justify-center border border-secondary/40">
                    {juz.number}
                  </span>
                  <span className="font-arabic text-xl text-accent font-semibold" dir="rtl">
                    {juz.nameArabic}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-base text-primary">
                    {locale === 'bn' ? `পারা ${juz.number}: ${juz.nameBengali}` : `Juz ${juz.number}: ${juz.nameEnglish}`}
                  </h4>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    {locale === 'bn' ? juz.surahSpanBn : juz.surahSpanEn}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-border/60">
                <Link
                  href={`/${locale}/quran`}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-secondary text-primary font-semibold text-xs hover:bg-secondary-hover transition-colors"
                >
                  <span>{locale === 'bn' ? 'সূরায় দেখুন' : 'Explore Surahs'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
