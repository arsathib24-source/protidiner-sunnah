'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Bookmark, Menu, X, Library, Search } from 'lucide-react';
import { Locale } from '@/types/i18n';
import { LanguageSwitcher } from './language-switcher';

interface HeaderProps {
  locale: Locale;
  dict: any;
}

export const Header: React.FC<HeaderProps> = ({ locale, dict }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/library`, label: dict.nav.library },
    { href: `/${locale}/categories`, label: dict.nav.categories },
    { href: `/${locale}/bookmarks`, label: dict.nav.bookmarks },
  ];

  return (
    <header className="sticky top-0 z-40 bg-islamic-ivory/95 dark:bg-islamic-forest-dark/95 backdrop-blur-md border-b border-islamic-forest/10 transition-colors">
      <div className="container mx-auto flex items-center justify-between h-20 px-4 md:px-6">
        {/* Brand Emblem & Titles */}
        <Link href={`/${locale}`} className="flex items-center gap-3.5 group">
          <div className="w-12 h-12 rounded-xl bg-islamic-forest flex items-center justify-center text-islamic-gold shadow-islamic transition-transform group-hover:scale-105 border border-islamic-gold/30">
            <BookOpen className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl md:text-2xl text-islamic-forest dark:text-islamic-ivory tracking-tight group-hover:text-islamic-deep transition-colors">
              {dict.brand.name}
            </span>
            <span className="text-xs text-islamic-gold-dark font-medium -mt-0.5">
              {dict.brand.tagline}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-islamic-charcoal/80 dark:text-islamic-ivory/80 hover:text-islamic-forest dark:hover:text-islamic-gold transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher currentLocale={locale} />

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-islamic-forest dark:text-islamic-ivory hover:bg-islamic-forest/10"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Gold Accent Line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-islamic-gold/60 to-transparent" />

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-islamic-ivory dark:bg-islamic-forest-dark border-b border-border px-6 py-5 shadow-islamic-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-islamic-forest dark:text-islamic-ivory hover:text-islamic-gold py-2 border-b border-islamic-forest/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
