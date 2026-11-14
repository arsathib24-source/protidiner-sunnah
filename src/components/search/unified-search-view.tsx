'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, BookOpen, Sparkles, Heart, FileText, ArrowRight, 
  Filter, X, ShieldCheck 
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

// Arabic normalization helper: removes harakat/tashkeel and unifies alifs & yaa
function normalizeArabicText(text: string): string {
  if (!text) return '';
  return text
    .replace(/[\u064B-\u065F\u0670]/g, '') // remove fathah, dammah, kasrah, sukun, shaddah, tanween, dagger alif
    .replace(/[\u0622\u0623\u0625]/g, '\u0627') // alif with hamza / madda -> plain alif
    .replace(/\u0629/g, '\u0647') // ta marbuta -> ha
    .replace(/\u0649/g, '\u064A') // alif maqsura -> ya
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // remove zero-width spaces
    .toLowerCase();
}

const SEARCH_SUGGESTIONS = [
  { label: 'সূরা আল-ফাতিহা', query: 'ফাতিহা' },
  { label: 'নিয়ত সম্পর্কিত হাদিস', query: 'নিয়ত' },
  { label: 'সকালের দু‘আ', query: 'সকাল' },
  { label: 'মি‘রাজ রজনী', query: 'মিরাজ' },
  { label: 'রিয়াদুস সালেহীন', query: 'রিয়াদুস' },
  { label: 'আয়াতুল কুরসী', query: 'কুরসী' },
];

export const UnifiedSearchView: React.FC<UnifiedSearchViewProps> = ({ locale, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<'all' | 'book' | 'quran' | 'hadith' | 'dua' | 'seerah'>('all');

  const allItems: SearchResultItem[] = useMemo(() => {
    const list: SearchResultItem[] = [];

    // 1. Books
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

    // 2. Quran Surahs
    SURAH_LIST.forEach((s) => {
      list.push({
        id: `quran-${s.number}`,
        type: 'quran',
        typeLabelBn: 'আল-কুরআন',
        title: `সূরা ${s.nameBengali} (${s.nameArabic})`,
        subtitle: `${s.meaningBengali} • ${s.revelationTypeBn} • ${s.totalAyahs} আয়াত • পারা ${s.juzStart}`,
        snippet: `পবিত্র কুরআনুল কারীমের ${s.number} নম্বর সূরা (${s.nameEnglish})। মূল উসমানী পাঠ ও নির্ভরযোগ্য বাংলা তর্জমা।`,
        href: `/${locale}/quran/${s.slug}`,
      });
    });

    // 3. Hadiths
    FEATURED_HADITHS.forEach((h) => {
      list.push({
        id: `hadith-${h.id}`,
        type: 'hadith',
        typeLabelBn: 'হাদিস',
        title: `${h.collectionNameBn} — হাদিস নং ${h.hadithNumber}`,
        subtitle: `বর্ণনাকারী: ${h.narratorBn} • সনদ মান: ${h.gradeBn}`,
        snippet: `${h.bengaliText} (${h.arabicText.slice(0, 100)}...)`,
        href: `/${locale}/hadith/${h.collectionSlug || 'bukhari'}`,
      });
    });

    // 4. Duas & Adhkar
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

    // 5. Seerah Milestones
    SEERAH_TIMELINE.forEach((s) => {
      list.push({
        id: `seerah-${s.id}`,
        type: 'seerah',
        typeLabelBn: 'সীরাতুন্নবী ﷺ',
        title: s.titleBn,
        subtitle: `${s.eraTitleBn} • ${s.yearHijri} (${s.yearCE}) • ${s.referenceSource}`,
        snippet: s.summaryBn,
        href: `/${locale}/seerah`,
      });
    });

    return list;
  }, [locale]);

  const filteredResults = useMemo(() => {
    const rawQ = query.trim();
    if (!rawQ) {
      if (activeFilter === 'all') return allItems;
      return allItems.filter((item) => item.type === activeFilter);
    }

    const qLower = rawQ.toLowerCase();
    const qNormalizedArabic = normalizeArabicText(rawQ);

    return allItems.filter((item) => {
      if (activeFilter !== 'all' && item.type !== activeFilter) {
        return false;
      }

      const matchStandard =
        item.title.toLowerCase().includes(qLower) ||
        item.subtitle.toLowerCase().includes(qLower) ||
        item.snippet.toLowerCase().includes(qLower);

      if (matchStandard) return true;

      // Check normalized Arabic
      const titleNorm = normalizeArabicText(item.title);
      const subNorm = normalizeArabicText(item.subtitle);
      const snipNorm = normalizeArabicText(item.snippet);

      return (
        titleNorm.includes(qNormalizedArabic) ||
        subNorm.includes(qNormalizedArabic) ||
        snipNorm.includes(qNormalizedArabic)
      );
    });
  }, [allItems, query, activeFilter]);

  return (
    <div className="space-y-8">
      {/* Search Input Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-5 h-5 text-accent-dark absolute left-4 top-1/2 -translate-y-1/2" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              locale === 'bn'
                ? 'পবিত্র কুরআন, হাদিস, ই-বুক বা দু‘আ অনুসন্ধান করুন (বাংলা, আরবি বা ইংরেজি)...'
                : 'Search books, Quran Surahs, Hadith, Duas...'
            }
            className="ps-12 pe-12 py-6 text-base rounded-2xl bg-surface border-border shadow-md focus:border-primary"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-text-muted hover:text-foreground"
              aria-label="মুছে ফেলুন"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Search Suggestions */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-text-muted">
          <span className="font-semibold">{locale === 'bn' ? 'প্রস্তাবিত:' : 'Suggestions:'}</span>
          {SEARCH_SUGGESTIONS.map((item) => (
            <button
              key={item.query}
              onClick={() => setQuery(item.query)}
              className="px-2.5 py-1 rounded-lg bg-surface hover:bg-accent/15 border border-border text-foreground hover:text-accent-dark transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
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
          সীরাত
        </button>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {filteredResults.length === 0 ? (
          <div className="text-center py-16 bg-surface rounded-3xl border border-dashed border-border space-y-3">
            <Search className="w-10 h-10 text-text-muted mx-auto" />
            <h3 className="text-lg font-bold font-bengali-heading text-primary">
              {locale === 'bn' ? 'কোনো ফলাফল পাওয়া যায়নি' : 'No results found'}
            </h3>
            <p className="text-xs text-text-muted max-w-sm mx-auto">
              {locale === 'bn'
                ? `"${query}" এর সাথে মিলে এমন কোনো কিতাব বা রেফারেন্স পাওয়া যায়নি। বানান পরীক্ষা করুন অথবা উপরের প্রস্তাবিত শব্দ ব্যবহার করুন।`
                : 'Try searching with different keywords or browse our categories.'}
            </p>
          </div>
        ) : (
          filteredResults.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="block p-5 sm:p-6 bg-surface hover:bg-surface-muted/40 rounded-2xl border border-border hover:border-primary/40 transition-all shadow-sm group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        item.type === 'quran'
                          ? 'accent'
                          : item.type === 'hadith'
                          ? 'secondary'
                          : item.type === 'dua'
                          ? 'primary'
                          : 'outline'
                      }
                      size="sm"
                    >
                      {item.typeLabelBn}
                    </Badge>
                    <span className="text-xs text-text-muted font-medium">
                      {item.subtitle}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold font-bengali-heading text-primary group-hover:text-accent-dark transition-colors">
                    {item.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-foreground/80 line-clamp-2 leading-relaxed">
                    {item.snippet}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-full bg-primary/5 group-hover:bg-primary group-hover:text-background flex items-center justify-center shrink-0 text-text-muted transition-colors mt-2">
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
