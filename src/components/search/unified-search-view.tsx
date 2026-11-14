'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, BookOpen, Sparkles, Heart, FileText, ArrowRight, 
  Filter, X 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CLASSICAL_BOOKS } from '@/lib/data/books';
import { SURAH_LIST } from '@/lib/data/quran-data';
import { FEATURED_HADITHS } from '@/lib/data/hadith-data';
import { AUTHENTIC_DUAS } from '@/lib/data/duas-data';
import { SEERAH_TIMELINE } from '@/lib/data/seerah-data';

interface SearchResultItem {
  id: string;
  type: 'book' | 'quran' | 'hadith' | 'dua' | 'seerah';
  typeLabelBn: string;
  title: string;
  subtitle: string;
  snippet: string;
  href: string;
}

interface UnifiedSearchViewProps {
  locale: 'bn' | 'ar' | 'en';
  initialQuery?: string;
}

export const UnifiedSearchView: React.FC<UnifiedSearchViewProps> = ({ locale, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<'all' | 'book' | 'quran' | 'hadith' | 'dua' | 'seerah'>('all');

  const allItems: SearchResultItem[] = useMemo(() => {
    const list: SearchResultItem[] = [];

    // Books
    CLASSICAL_BOOKS.forEach((b) => {
      list.push({
        id: `book-${b.slug}`,
        type: 'book',
        typeLabelBn: 'ই-বুক',
        title: b.title[locale] || b.title.bn,
        subtitle: `${b.author[locale] || b.author.bn} • ${b.category[locale] || b.category.bn}`,
        snippet: b.description[locale] || b.description.bn,
        href: `/${locale}/ebooks/${b.slug}`,
      });
    });

    // Quran Surahs
    SURAH_LIST.forEach((s) => {
      list.push({
        id: `quran-${s.number}`,
        type: 'quran',
        typeLabelBn: 'আল-কুরআন',
        title: `সূরা ${s.nameBengali} (${s.nameArabic})`,
        subtitle: `${s.meaningBengali} • ${s.revelationTypeBn} • ${s.totalAyahs} আয়াত`,
        snippet: `পবিত্র কুরআনুল কারীমের ${s.number} নম্বর সূরা (${s.nameEnglish})। মূল উসমানী পাঠ ও নির্ভরযোগ্য বাংলা তর্জমা।`,
        href: `/${locale}/quran/${s.slug}`,
      });
    });

    // Hadiths
    FEATURED_HADITHS.forEach((h) => {
      list.push({
        id: `hadith-${h.id}`,
        type: 'hadith',
        typeLabelBn: 'হাদিস',
        title: `${h.collectionNameBn} — হাদিস নং ${h.hadithNumber}`,
        subtitle: `বর্ণনাকারী: ${h.narratorBn} • সনদ মান: ${h.gradeBn}`,
        snippet: `${h.bengaliText} (${h.arabicText.slice(0, 80)}...)`,
        href: `/${locale}/hadith`,
      });
    });

    // Duas
    AUTHENTIC_DUAS.forEach((d) => {
      list.push({
        id: `dua-${d.id}`,
        type: 'dua',
        typeLabelBn: 'দু‘আ ও যিকির',
        title: d.titleBn,
        subtitle: `${d.categoryTitleBn} • ${d.referenceBn}`,
        snippet: `${d.translationBn} (${d.arabic.slice(0, 80)}...)`,
        href: `/${locale}/duas`,
      });
    });

    // Seerah
    SEERAH_TIMELINE.forEach((s) => {
      list.push({
        id: `seerah-${s.id}`,
        type: 'seerah',
        typeLabelBn: 'সীরাতুন্নবী ﷺ',
        title: s.titleBn,
        subtitle: `${s.eraTitleBn} • ${s.yearHijri} (${s.yearCE})`,
        snippet: s.summaryBn,
        href: `/${locale}/seerah`,
      });
    });

    return list;
  }, [locale]);

  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allItems.filter((item) => {
      if (activeFilter !== 'all' && item.type !== activeFilter) {
        return false;
      }
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.snippet.toLowerCase().includes(q)
      );
    });
  }, [allItems, query, activeFilter]);

  return (
    <div className="space-y-8">
      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-5 h-5 text-accent-dark absolute left-4 top-1/2 -translate-y-1/2" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={locale === 'bn' ? 'কুরআন, হাদিস, ই-বুক বা দু‘আ অনুসন্ধান করুন...' : 'Search books, Quran, Hadith, Duas...'}
          className="ps-12 pe-12 py-6 text-base rounded-2xl bg-surface border-border shadow-md focus:border-primary"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full text-text-muted hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
            activeFilter === 'all'
              ? 'bg-primary text-background shadow-sm'
              : 'bg-surface text-text-muted hover:text-primary border border-border'
          }`}
        >
          {locale === 'bn' ? `সকল ফলাফল (${filteredResults.length})` : `All (${filteredResults.length})`}
        </button>
        <button
          onClick={() => setActiveFilter('book')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
            activeFilter === 'book'
              ? 'bg-primary text-background shadow-sm'
              : 'bg-surface text-text-muted hover:text-primary border border-border'
          }`}
        >
          ই-বুক
        </button>
        <button
          onClick={() => setActiveFilter('quran')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
            activeFilter === 'quran'
              ? 'bg-primary text-background shadow-sm'
              : 'bg-surface text-text-muted hover:text-primary border border-border'
          }`}
        >
          আল-কুরআন
        </button>
        <button
          onClick={() => setActiveFilter('hadith')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
            activeFilter === 'hadith'
              ? 'bg-primary text-background shadow-sm'
              : 'bg-surface text-text-muted hover:text-primary border border-border'
          }`}
        >
          হাদিস
        </button>
        <button
          onClick={() => setActiveFilter('dua')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
            activeFilter === 'dua'
              ? 'bg-primary text-background shadow-sm'
              : 'bg-surface text-text-muted hover:text-primary border border-border'
          }`}
        >
          দু‘আ
        </button>
        <button
          onClick={() => setActiveFilter('seerah')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
            activeFilter === 'seerah'
              ? 'bg-primary text-background shadow-sm'
              : 'bg-surface text-text-muted hover:text-primary border border-border'
          }`}
        >
          সীরাতুন্নবী
        </button>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {filteredResults.length > 0 ? (
          filteredResults.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="block bg-surface p-6 rounded-3xl border border-border hover:border-primary/40 transition-all shadow-sm hover:shadow-card group"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge variant="secondary" size="sm">
                  {item.typeLabelBn}
                </Badge>
                <span className="text-primary group-hover:text-accent font-semibold text-xs inline-flex items-center gap-1 transition-colors">
                  <span>দেখুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-bold font-bengali-heading text-primary group-hover:text-primary transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-text-muted mt-0.5 mb-2 font-mono">
                {item.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-foreground/80 font-bengali-body line-clamp-2 leading-relaxed">
                {item.snippet}
              </p>
            </Link>
          ))
        ) : (
          <div className="py-16 text-center bg-surface rounded-3xl border border-border p-8 space-y-3">
            <Search className="w-10 h-10 text-text-muted mx-auto" />
            <h4 className="font-bold text-base text-primary">
              {locale === 'bn' ? 'কোনো ফলাফল পাওয়া যায়নি' : 'No Results Found'}
            </h4>
            <p className="text-xs text-text-muted max-w-sm mx-auto">
              অনুগ্রহ করে অন্য শব্দ বা বানান দিয়ে অনুসন্ধান করার চেষ্টা করুন।
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
