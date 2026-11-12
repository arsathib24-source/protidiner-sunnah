'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { Locale, SUPPORTED_LOCALES } from '@/types/i18n';

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLocale }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    // Preserve the current path segments while substituting the locale
    const segments = pathname.split('/');
    if (segments.length > 1 && (segments[1] === 'bn' || segments[1] === 'ar' || segments[1] === 'en')) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }

    let newPath = segments.join('/') || `/${newLocale}`;

    // Preserve query search parameters (e.g. ?chapter=2 or ?q=hadith)
    const queryString = searchParams?.toString();
    if (queryString) {
      newPath += `?${queryString}`;
    }

    router.push(newPath);
    setIsOpen(false);
  };

  const currentConfig = SUPPORTED_LOCALES[currentLocale] || SUPPORTED_LOCALES.bn;
  const localesList: Locale[] = ['bn', 'ar', 'en'];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-primary/20 hover:border-accent hover:bg-surface text-primary dark:text-background text-xs font-semibold transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-accent/40"
        aria-label="Change Language"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 text-accent" />
        <span className={currentConfig.fontClass}>{currentConfig.nativeName}</span>
        <ChevronDown className="w-3 h-3 text-muted-foreground transition-transform" />
      </button>

      {isOpen && (
        <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-48 rounded-2xl bg-surface border border-border shadow-xl z-50 py-1.5 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border">
            {currentLocale === 'bn'
              ? 'ভাষা নির্বাচন করুন'
              : currentLocale === 'ar'
              ? 'اختر اللغة'
              : 'Select Language'}
          </div>

          <div className="py-1">
            {localesList.map((loc) => {
              const cfg = SUPPORTED_LOCALES[loc];
              const isSelected = loc === currentLocale;

              return (
                <button
                  key={loc}
                  onClick={() => handleLanguageChange(loc)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 text-xs transition-colors text-left rtl:text-right ${
                    isSelected
                      ? 'bg-accent/15 text-primary font-bold'
                      : 'text-foreground hover:bg-muted/60'
                  }`}
                  dir={cfg.dir}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[10px] font-bold text-accent uppercase w-5">
                      {cfg.code}
                    </span>
                    <span className={`text-sm ${cfg.fontClass}`}>{cfg.nativeName}</span>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-accent shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="px-3 py-1.5 text-[10px] text-muted-foreground border-t border-border bg-muted/20">
            {currentLocale === 'bn'
              ? 'প্রামাণ্য অনুবাদ সংস্করণ'
              : currentLocale === 'ar'
              ? 'نصوص عربية موثقة'
              : 'Authentic verified texts'}
          </div>
        </div>
      )}
    </div>
  );
};
