'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Menu, X, Sparkles, Search } from 'lucide-react';
import { Locale } from '@/types/i18n';
import { LanguageSwitcher } from './language-switcher';
import { IslamicStarIcon } from '../ui/decorative';
import { AnnouncementBar } from './announcement-bar';

interface HeaderProps {
  locale: Locale;
  dict: any;
}

export const Header: React.FC<HeaderProps> = ({ locale, dict }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Suppress public header inside dedicated admin console
  if (pathname?.includes('/admin')) {
    return null;
  }

  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/ebooks`, label: dict.nav.library },
    { href: `/${locale}/categories`, label: dict.nav.categories },
    { href: `/${locale}#todays-sunnah`, label: dict.nav.todaysSunnah || (locale === 'bn' ? 'আজকের সুন্নাহ' : locale === 'ar' ? 'سنة اليوم' : "Today's Sunnah") },
    { href: `/${locale}/bookmarks`, label: dict.nav.bookmarks },
    { href: `/${locale}/design-system`, label: dict.nav.designSystem || (locale === 'bn' ? 'ডিজাইন সিস্টেম' : locale === 'ar' ? 'نظام التصميم' : 'Design System') },
  ];

  return (
    <div className="sticky top-0 z-40">
      {/* 1. Announcement Bar */}
      <AnnouncementBar
        linkHref={`/${locale}/ebooks`}
        linkText={locale === 'bn' ? 'লাইব্রেরি দেখুন' : locale === 'ar' ? 'تصفح المكتبة' : 'Browse Library'}
        message={
          locale === 'bn'
            ? 'পবিত্র কুরআন ও সহিহ সুন্নাহর প্রামাণ্য ইসলামিক ই-বুক সম্পূর্ণ বিনামূল্যে পড়ুন'
            : locale === 'ar'
            ? 'قراءة الكتب الإسلامية الصحيحة والموثقة مجانًا بالكامل لجميع المسلمين'
            : 'Read authentic Islamic ebooks from Quran and Sunnah 100% free forever'
        }
      />

      {/* 2. Responsive Navigation */}
      <header className="bg-background/95 dark:bg-surface-dark/95 backdrop-blur-md border-b border-border transition-colors">
        <div className="container mx-auto flex items-center justify-between h-20 px-4 sm:px-6">
          {/* Brand Logo & Emblem */}
          <Link href={`/${locale}`} className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-accent shadow-subtle border border-accent/40 transition-transform group-hover:scale-105">
              <IslamicStarIcon className="w-6 h-6 text-accent" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold font-bengali-heading text-xl sm:text-2xl text-primary dark:text-background tracking-tight group-hover:text-secondary transition-colors">
                {dict.brand.name}
              </span>
              <span className="text-xs text-accent-dark font-medium -mt-0.5">
                {dict.brand.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-muted hover:text-primary dark:hover:text-accent transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-accent after:transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Header Right Actions */}
          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}#search-section`}
              className="p-2.5 rounded-xl text-text-muted hover:text-primary hover:bg-surface transition-colors border border-transparent hover:border-border"
              aria-label="Search Library"
            >
              <Search className="w-4 h-4 text-accent-dark" />
            </Link>

            <LanguageSwitcher currentLocale={locale} />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-primary dark:text-background hover:bg-surface-muted transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Decorative Gold Accent Border Line */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-accent/70 to-transparent" />

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-surface dark:bg-surface-dark border-b border-border px-6 py-5 shadow-card-hover animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium font-bengali-heading text-primary dark:text-background hover:text-accent py-2.5 px-3 rounded-lg hover:bg-surface-muted transition-colors border-b border-border/40"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};
