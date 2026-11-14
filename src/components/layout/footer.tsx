'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { Locale } from '@/types/i18n';
import { IslamicStarIcon } from '../ui/decorative';
import { BrandLogo } from '../ui/brand-logo';

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
            <BrandLogo
              locale={locale}
              title={dict.brand.name}
              size="sm"
              variant="footer"
              showTagline={false}
              className="mb-1"
            />
            <p className="text-sm text-background/80 max-w-md leading-relaxed">
              {dict.brand.description}
            </p>

            {/* Verification & Neutral Manifesto Quote Box */}
            <div className="p-4 rounded-2xl bg-primary-dark/80 border border-accent/30 text-xs text-accent-light max-w-md shadow-subtle">
              <div className="flex items-center gap-2 mb-1.5 font-bold text-accent">
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {dict.footer.manifestoTitle || (locale === 'bn' ? 'প্রামাণিকতা ও বিশুদ্ধতার মূলনীতি' : locale === 'ar' ? 'ميثاق الأمانة والتحقيق' : 'Authenticity & Neutral Integrity')}
                </span>
              </div>
              <p className="opacity-90 leading-relaxed">
                {dict.footer.manifestoText || (locale === 'bn' ? 'সকল কিতাব, সনদ ও তথ্য যাচাইকৃত মূল পাণ্ডুলিপির আলোকে সংকলিত। কৃত্রিম বুদ্ধিমত্তা দ্বারা অনিরীক্ষিত ধর্মীয় বাণী প্রকাশ সম্পূর্ণরূপে নিষিদ্ধ।' : locale === 'ar' ? 'جميع النصوص والأحاديث منقولة بأمانة من الطبعات المحققة دون أي توليد آلي غير مراجع.' : 'All literature and traditions are verified against physical print manuscripts. Automated unverified AI generation is strictly prohibited.')}
              </p>
            </div>
          </div>

          {/* Quick Knowledge Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold font-bengali-heading uppercase tracking-wider text-accent">
              {locale === 'bn' ? 'জ্ঞান ভাণ্ডার' : locale === 'ar' ? 'أبواب المعرفة' : 'Knowledge Centers'}
            </h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <Link href={`/${locale}/quran`} className="hover:text-accent transition-colors">
                  {locale === 'bn' ? 'পবিত্র আল-কুরআন' : 'The Holy Quran'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/hadith`} className="hover:text-accent transition-colors">
                  {locale === 'bn' ? 'হাদিস শাস্ত্র (কুতুবে সিত্তাহ)' : 'Hadith Collections'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/duas`} className="hover:text-accent transition-colors">
                  {locale === 'bn' ? 'হিসনুল মুসলিম (দু‘আ ও যিকির)' : 'Hisnul Muslim (Duas)'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/seerah`} className="hover:text-accent transition-colors">
                  {locale === 'bn' ? 'সীরাতুন্নবী ﷺ ও কালপঞ্জি' : 'Prophetic Seerah'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/ebooks`} className="hover:text-accent transition-colors">
                  {dict.nav.library}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/search`} className="hover:text-accent transition-colors">
                  {locale === 'bn' ? 'সার্বজনীন অনুসন্ধান' : 'Global Search'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Authenticity Assurance */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-accent">
              <ShieldCheck className="w-5 h-5" />
              <h4 className="text-sm font-semibold font-bengali-heading uppercase tracking-wider">
                {locale === 'bn' ? 'উন্মুক্ত দ্বীনি পাঠাগার' : locale === 'ar' ? 'مكتبة إسلامية موثقة' : 'Verified Islamic Library'}
              </h4>
            </div>
            <p className="text-xs text-background/70 leading-relaxed">
              {dict.footer.disclaimer}
            </p>
            <div className="pt-2 text-xs text-accent-light">
              <span>{locale === 'bn' ? 'ট্যাগলাইন: ' : locale === 'ar' ? 'شعارنا: ' : 'Tagline: '}</span>
              <span className="font-semibold">{dict.brand.tagline}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-background/60 gap-4">
          <p>{dict.footer.rights}</p>
          <div className="flex items-center gap-1.5 text-background/75">
            <span>{locale === 'bn' ? 'স্থাপত্য:' : locale === 'ar' ? 'الهندسة والتصميم:' : 'Architecture:'}</span>
            <Link
              href={`/${locale}/design-system`}
              className="font-semibold text-accent hover:underline hover:text-accent-light transition-colors"
            >
              Protidiner Sunnah Design System
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
