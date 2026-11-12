import React from 'react';
import Link from 'next/link';
import { BookOpen, ShieldCheck, Heart } from 'lucide-react';
import { Locale } from '@/types/i18n';

interface FooterProps {
  locale: Locale;
  dict: any;
}

export const Footer: React.FC<FooterProps> = ({ locale, dict }) => {
  return (
    <footer className="bg-islamic-forest text-islamic-ivory pt-16 pb-10 border-t-2 border-islamic-gold/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-islamic-forest-light">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-islamic-deep flex items-center justify-center text-islamic-gold border border-islamic-gold/40">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-islamic-ivory">
                {dict.brand.name}
              </span>
            </div>
            <p className="text-sm text-islamic-ivory/80 max-w-md leading-relaxed">
              {dict.brand.description}
            </p>

            {/* Hadith Quote Box */}
            <div className="p-4 rounded-xl bg-islamic-forest-dark/70 border border-islamic-gold/20 text-xs italic text-islamic-gold-light max-w-md">
              {dict.footer.quote}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-islamic-gold">
              {dict.nav.library}
            </h4>
            <ul className="space-y-2 text-sm text-islamic-ivory/80">
              <li>
                <Link href={`/${locale}`} className="hover:text-islamic-gold transition-colors">
                  {dict.nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/library`} className="hover:text-islamic-gold transition-colors">
                  {dict.nav.library}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/categories`} className="hover:text-islamic-gold transition-colors">
                  {dict.nav.categories}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/bookmarks`} className="hover:text-islamic-gold transition-colors">
                  {dict.nav.bookmarks}
                </Link>
              </li>
            </ul>
          </div>

          {/* Authenticity & Verification Assurance */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-islamic-gold">
              <ShieldCheck className="w-5 h-5" />
              <h4 className="text-sm font-semibold uppercase tracking-wider">
                প্রামাণিকতা ও শুদ্ধতা
              </h4>
            </div>
            <p className="text-xs text-islamic-ivory/70 leading-relaxed">
              {dict.footer.disclaimer}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-islamic-ivory/60 gap-4">
          <p>{dict.footer.rights}</p>
          <div className="flex items-center gap-1.5 text-islamic-ivory/70">
            <span>Powered by</span>
            <span className="font-semibold text-islamic-gold">Protidiner Sunnah</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
