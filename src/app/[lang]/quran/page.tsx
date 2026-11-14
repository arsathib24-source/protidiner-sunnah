import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Search, Sparkles, ArrowRight } from 'lucide-react';
import { Locale } from '@/types/i18n';
import { SectionHeader, IslamicStarIcon } from '@/components/ui/decorative';
import { Badge } from '@/components/ui/badge';
import { SURAH_LIST } from '@/lib/data/quran-data';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = (params.lang || 'bn') as Locale;

  return {
    title: lang === 'bn' ? 'আল-কুরআনুল কারীম | প্রতিদিনের সুন্নাহ' : lang === 'ar' ? 'القرآن الكريم | سنة اليوم' : 'The Noble Quran | Protidiner Sunnah',
    description: 'Explore the 114 Surahs of the Holy Quran with authentic Uthmani script and verified Bengali and English translations.',
    alternates: {
      canonical: `/${lang}/quran`,
      languages: {
        bn: '/bn/quran',
        ar: '/ar/quran',
        en: '/en/quran',
        'x-default': '/bn/quran',
      },
    },
  };
}

export default function QuranIndexPage({
  params,
}: {
  params: { lang: string };
}) {
  const lang = (params.lang || 'bn') as 'bn' | 'ar' | 'en';

  return (
    <div className="py-12 md:py-20 bg-background bg-islamic-pattern min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 space-y-12 max-w-6xl">
        <SectionHeader
          badge={lang === 'bn' ? 'আল-কুরআনুল কারীম' : lang === 'ar' ? 'كتاب الله الحكيم' : 'The Holy Quran'}
          title={lang === 'bn' ? 'পবিত্র কুরআনুল কারীমের সূরাসমূহ' : lang === 'ar' ? 'فهرس سور القرآن الكريم' : 'Surahs of the Noble Quran'}
          subtitle={
            lang === 'bn'
              ? 'বিশুদ্ধ উসমানী লিপি, নির্ভরযোগ্য বাংলা অনুবাদ ও ইংরেজি তর্জমা সহ পবিত্র কুরআনের প্রতিটি সূরার প্রামাণ্য ডিজিটাল সংস্করণ।'
              : lang === 'ar'
              ? 'تصفح سور القرآن الكريم بالرسم العثماني المعتمد مع الترجمات الدقيقة الموثوقة.'
              : 'Browse the 114 Surahs of the Holy Quran with verified Uthmani script and authentic translations.'
          }
        />

        {/* Quick Surah Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SURAH_LIST.map((surah) => (
            <Link
              key={surah.number}
              href={`/${lang}/quran/${surah.slug}`}
              className="group bg-surface hover:bg-surface-muted/40 p-5 rounded-3xl border border-border hover:border-primary/40 transition-all duration-300 shadow-card hover:shadow-card-hover flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                {/* Number Badge */}
                <div className="w-12 h-12 rounded-2xl bg-secondary/20 group-hover:bg-primary group-hover:text-background text-primary font-bold font-mono text-base flex items-center justify-center border border-secondary/30 transition-colors shrink-0">
                  {surah.number}
                </div>

                <div>
                  <h4 className="font-bold text-base text-primary group-hover:text-primary transition-colors flex items-center gap-2">
                    <span>{lang === 'bn' ? surah.nameBengali : lang === 'ar' ? surah.nameArabic : surah.nameEnglish}</span>
                  </h4>
                  <p className="text-xs text-text-muted mt-0.5">
                    {lang === 'bn' ? surah.meaningBengali : surah.meaningEnglish} • {surah.totalAyahs} {lang === 'bn' ? 'আয়াত' : lang === 'ar' ? 'آية' : 'Ayahs'}
                  </p>
                  <div className="mt-2">
                    <Badge variant="outline" size="sm">
                      {lang === 'bn' ? surah.revelationTypeBn : surah.revelationType}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Arabic Calligraphy Name */}
              <div dir="rtl" className="text-right shrink-0">
                <span className="font-arabic text-xl sm:text-2xl text-accent font-semibold block group-hover:scale-105 transition-transform">
                  {surah.nameArabic}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
