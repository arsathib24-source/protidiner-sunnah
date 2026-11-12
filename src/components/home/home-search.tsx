'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/input';

interface HomeSearchProps {
  locale: string;
  isRTL?: boolean;
}

export const HomeSearch: React.FC<HomeSearchProps> = ({ locale, isRTL = false }) => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/${locale}/ebooks?q=${encodeURIComponent(query.trim())}`);
  };

  const quickSearchesByLocale: Record<string, Array<{ label: string; q: string }>> = {
    bn: [
      { label: 'দৈনন্দিন দোয়া', q: 'দোয়া' },
      { label: 'সহিহ বুখারি', q: 'বুখারি' },
      { label: 'ইখলাস ও নিয়ত', q: 'নিয়ত' },
      { label: 'সালাতের বিধান', q: 'সালাত' },
      { label: 'সকাল-সন্ধ্যার জিকির', q: 'জিকির' },
    ],
    ar: [
      { label: 'أذكار الصباح والمساء', q: 'أذكار' },
      { label: 'صحيح البخاري', q: 'البخاري' },
      { label: 'باب الإخلاص والنية', q: 'النية' },
      { label: 'أحكام الصلاة', q: 'الصلاة' },
      { label: 'حصن المسلم', q: 'حصن' },
    ],
    en: [
      { label: 'Daily Supplications', q: 'Dua' },
      { label: 'Sahih al-Bukhari', q: 'Bukhari' },
      { label: 'Sincerity & Intention', q: 'Intention' },
      { label: 'Rules of Prayer', q: 'Prayer' },
      { label: 'Hisnul Muslim', q: 'Hisnul' },
    ],
  };

  const quickSearches = quickSearchesByLocale[locale] || quickSearchesByLocale.bn;
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div id="search-section" className="w-full max-w-3xl mx-auto scroll-mt-32">
      <form onSubmit={handleSearch} className="relative flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchInput
            placeholder={
              locale === 'bn'
                ? 'কিতাবের নাম, লেখক, হাদিসের পরিচ্ছেদ বা বিষয় দিয়ে অনুসন্ধান করুন...'
                : locale === 'ar'
                ? 'ابحث عن كتاب، مؤلف، باب حديثي أو موضوع شرعي...'
                : 'Search by book title, author, hadith chapter, or topic...'
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClear={() => setQuery('')}
            className="h-14 text-base shadow-card rounded-2xl border-accent/40 focus:border-accent"
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="h-14 px-8 rounded-2xl gap-2 font-bengali-heading font-bold shadow-card flex-shrink-0"
        >
          <Search className="w-4 h-4 text-accent" />
          <span>{locale === 'bn' ? 'সুন্নাহ খুঁজুন' : locale === 'ar' ? 'بحث في السنن' : 'Search Sunnah'}</span>
          <ArrowIcon className="w-4 h-4" />
        </Button>
      </form>

      {/* Suggested Quick Topics */}
      <div className="flex flex-wrap items-center gap-2 mt-4 text-xs">
        <span className="flex items-center gap-1 text-text-muted font-medium">
          <Sparkles className="w-3.5 h-3.5 text-accent-dark" />
          <span>
            {locale === 'bn' ? 'প্রস্তাবিত বিষয়সমূহ:' : locale === 'ar' ? 'موضوعات مقترحة:' : 'Suggested Topics:'}
          </span>
        </span>
        {quickSearches.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => router.push(`/${locale}/ebooks?q=${encodeURIComponent(item.q)}`)}
            className="px-3 py-1 rounded-full bg-surface border border-border/80 text-text-muted hover:text-primary hover:border-accent hover:bg-surface-muted transition-colors font-medium shadow-subtle"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
