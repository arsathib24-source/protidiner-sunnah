'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, Check } from 'lucide-react';
import { Locale, SUPPORTED_LOCALES } from '@/types/i18n';

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLocale }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
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

    // Replace the locale in current pathname
    const segments = pathname.split('/');
    if (segments.length > 1 && (segments[1] === 'bn' || segments[1] === 'ar' || segments[1] === 'en')) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    const newPath = segments.join('/') || `/${newLocale}`;
    router.push(newPath);
    setIsOpen(false);
  };

  const currentConfig = SUPPORTED_LOCALES[currentLocale] || SUPPORTED_LOCALES.bn;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-islamic-forest/20 hover:border-islamic-gold hover:bg-islamic-forest/5 text-islamic-forest dark:text-islamic-ivory text-sm font-medium transition-colors focus:outline-none"
        aria-label="Change Language"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 text-islamic-gold" />
        <span>{currentConfig.nativeName}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-44 rounded-xl bg-card-bg shadow-islamic-lg border border-border py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          {(Object.keys(SUPPORTED_LOCALES) as Locale[]).map((loc) => {
            const config = SUPPORTED_LOCALES[loc];
            const isSelected = loc === currentLocale;
            return (
              <button
                key={loc}
                onClick={() => handleLanguageChange(loc)}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-sm text-left rtl:text-right transition-colors ${
                  isSelected
                    ? 'bg-islamic-forest/10 font-bold text-islamic-forest dark:text-islamic-gold'
                    : 'text-islamic-charcoal/80 dark:text-islamic-ivory/80 hover:bg-islamic-forest/5'
                }`}
              >
                <div className="flex flex-col">
                  <span>{config.nativeName}</span>
                  <span className="text-xs text-islamic-charcoal/50 dark:text-islamic-ivory/50">
                    {config.name}
                  </span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-islamic-forest dark:text-islamic-gold" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
