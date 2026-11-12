'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { Locale } from '@/types/i18n';
import { IslamicStarIcon } from '../ui/decorative';

interface FooterProps {
  locale: Locale;
  dict: any;
}

export const Footer: React.FC<FooterProps> = ({ locale, dict }) => {
  const pathname = usePathname();

  // Suppress public footer inside dedicated admin console
  if (pathname?.includes('/admin')) {
    return null;
  }
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-12 border-t-2 border-accent/40 relative overflow-hidden">
      {/* Background Decorative Star Motif */}
      <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none translate-x-12 translate-y-12">
        <IslamicStarIcon className="w-96 h-96 text-accent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-primary-light">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-secondary flex items-center justify-center text-accent border border-accent/40 shadow-subtle">
                <IslamicStarIcon className="w-5 h-5 text-accent" />
              </div>
              <span className="font-bold font-bengali-heading text-2xl tracking-tight text-background">
                {dict.brand.name}
              </span>
            </div>
            <p className="text-sm text-background/80 max-w-md leading-relaxed font-bengali">
              {dict.brand.description}
            </p>

            {/* Verification & Neutral Manifesto Quote Box */}
            <div className="p-4 rounded-2xl bg-primary-dark/80 border border-accent/30 text-xs text-accent-light max-w-md shadow-subtle">
              <div className="flex items-center gap-2 mb-1.5 font-bold text-accent">
                <ShieldCheck className="w-4 h-4" />
                <span>প্রামাণিকতা ও বিশুদ্ধতার মূলনীতি</span>
              </div>
              <p className="opacity-90 leading-relaxed">
                সকল কিতাব, সনদ ও তথ্য যাচাইকৃত মূল পাণ্ডুলিপির আলোকে সংকলিত। কৃত্রিম বুদ্ধিমত্তা দ্বারা অনিরীক্ষিত ধর্মীয় বাণী প্রকাশ সম্পূর্ণরূপে নিষিদ্ধ।
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold font-bengali-heading uppercase tracking-wider text-accent">
              {dict.nav.library}
            </h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <Link href={`/${locale}`} className="hover:text-accent transition-colors">
                  {dict.nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/library`} className="hover:text-accent transition-colors">
                  {dict.nav.library}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/categories`} className="hover:text-accent transition-colors">
                  {dict.nav.categories}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/bookmarks`} className="hover:text-accent transition-colors">
                  {dict.nav.bookmarks}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/design-system`} className="hover:text-accent transition-colors">
                  ডিজাইন সিস্টেম
                </Link>
              </li>
            </ul>
          </div>

          {/* Authenticity Assurance */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-accent">
              <ShieldCheck className="w-5 h-5" />
              <h4 className="text-sm font-semibold font-bengali-heading uppercase tracking-wider">
                উন্মুক্ত দ্বীনি পাঠাগার
              </h4>
            </div>
            <p className="text-xs text-background/70 leading-relaxed font-bengali">
              {dict.footer.disclaimer}
            </p>
            <div className="pt-2 text-xs text-accent-light">
              <span>ট্যাগলাইন: </span>
              <span className="font-semibold">{dict.brand.tagline}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-background/60 gap-4">
          <p>{dict.footer.rights}</p>
          <div className="flex items-center gap-1.5 text-background/75">
            <span>স্থাপত্য:</span>
            <span className="font-semibold text-accent">Protidiner Sunnah Design System</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
