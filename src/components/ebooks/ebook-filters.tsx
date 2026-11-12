'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, Globe, ArrowUpDown, X, RotateCcw } from 'lucide-react';
import { SearchInput } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface EbookFiltersProps {
  locale: string;
  categories: Array<{ slug: string; label: string }>;
  totalCount: number;
}

export const EbookFilters: React.FC<EbookFiltersProps> = ({
  locale,
  categories,
  totalCount,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get('q') || '';
  const currentCategory = searchParams.get('category') || 'all';
  const currentLanguage = searchParams.get('lang_filter') || 'all';
  const currentSort = searchParams.get('sort') || 'latest';

  const [searchInput, setSearchInput] = useState(currentSearch);

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all' || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/${locale}/ebooks?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters('q', searchInput.trim());
  };

  const handleClearSearch = () => {
    setSearchInput('');
    updateFilters('q', '');
  };

  const resetAllFilters = () => {
    setSearchInput('');
    router.push(`/${locale}/ebooks`);
  };

  const hasActiveFilters = Boolean(
    currentSearch ||
      (currentCategory && currentCategory !== 'all') ||
      (currentLanguage && currentLanguage !== 'all') ||
      (currentSort && currentSort !== 'latest')
  );

  const languageOptions = [
    { code: 'all', label: 'সকল ভাষা' },
    { code: 'bn', label: 'বাংলা' },
    { code: 'ar', label: 'العربية' },
    { code: 'en', label: 'English' },
  ];

  const sortOptions = [
    { value: 'latest', label: 'সর্বশেষ সংযোজিত (Latest)' },
    { value: 'popular', label: 'সর্বাধিক পঠিত (Popular)' },
    { value: 'title', label: 'শিরোনাম অনুযায়ী (A-Z)' },
  ];

  return (
    <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border/80 shadow-card space-y-6">
      {/* Top Search & Sort Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="w-full lg:max-w-xl flex gap-2">
          <SearchInput
            placeholder="কিতাবের নাম, বিষয় বা রচয়িতা দিয়ে খুঁজুন..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onClear={handleClearSearch}
            className="h-12 border-border/80 focus:border-accent"
          />
          <Button type="submit" variant="primary" className="h-12 px-6 gap-2 flex-shrink-0 font-bengali-heading">
            <Search className="w-4 h-4 text-accent" />
            <span>অনুসন্ধান</span>
          </Button>
        </form>

        {/* Sort Dropdown */}
        <div className="w-full lg:w-auto flex items-center justify-between lg:justify-end gap-3 text-xs font-medium text-text-muted">
          <span className="flex items-center gap-1.5 flex-shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-accent-dark" />
            <span>সাজান:</span>
          </span>
          <select
            value={currentSort}
            onChange={(e) => updateFilters('sort', e.target.value)}
            className="h-11 px-3.5 rounded-xl bg-surface border border-border text-foreground font-medium text-xs focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 cursor-pointer shadow-subtle"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter Row: Categories */}
      <div className="space-y-2.5 pt-3 border-t border-border/60">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-text-muted flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-accent-dark" />
            <span>বিষয় অনুযায়ী ফিল্টার করুন:</span>
          </span>
          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="text-xs text-accent-dark hover:text-primary flex items-center gap-1 font-semibold transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>রিসেট করুন</span>
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = currentCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => updateFilters('category', cat.slug)}
                className="transition-transform active:scale-95"
              >
                <Badge
                  variant={isActive ? 'primary' : 'surface'}
                  className={`cursor-pointer transition-all ${
                    isActive
                      ? 'shadow-subtle border-primary'
                      : 'hover:border-accent hover:bg-surface-muted text-text-muted'
                  }`}
                >
                  {cat.label}
                </Badge>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Row: Languages */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-border/60 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-text-muted flex items-center gap-1 font-semibold">
            <Globe className="w-3.5 h-3.5 text-accent-dark" />
            <span>ভাষার সংস্করণ:</span>
          </span>
          <div className="flex items-center gap-1.5">
            {languageOptions.map((lang) => {
              const isActive = currentLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => updateFilters('lang_filter', lang.code)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-accent text-primary font-bold shadow-subtle'
                      : 'bg-surface-muted text-text-muted hover:text-primary hover:bg-surface'
                  }`}
                >
                  {lang.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <span className="text-text-muted">
          প্রদর্শিত হচ্ছে <strong>{totalCount}</strong> টি অনুমোদিত কিতাব
        </span>
      </div>
    </div>
  );
};
