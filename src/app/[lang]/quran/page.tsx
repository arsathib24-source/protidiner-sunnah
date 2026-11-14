import React from 'react';
import type { Metadata } from 'next';
import { Locale } from '@/types/i18n';
import { SectionHeader } from '@/components/ui/decorative';
import { QuranIndexView } from '@/components/quran/quran-index-view';
import { ShieldCheck, BookOpen } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = (params.lang || 'bn') as Locale;

  return {
    title: lang === 'bn' ? 'আল-কুরআনুল কারীম (১১৪ সূরা ও ৩০ পারা) | প্রতিদিনের সুন্নাহ' : lang === 'ar' ? 'القرآن الكريم (١١٤ سورة و٣٠ جزءاً) | سنة اليوم' : 'The Noble Quran (114 Surahs & 30 Juz) | Protidiner Sunnah',
    description: 'Explore the complete 114 Surahs and 30 Juz of the Holy Quran with authentic Uthmani script and verified Bengali and English translations.',
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
          title={lang === 'bn' ? 'পবিত্র কুরআনুল কারীমের ১১৪টি সূরা ও ৩০ পারা' : lang === 'ar' ? 'فهرس سور وأجزاء القرآن الكريم' : 'Surahs & Juz of the Noble Quran'}
          subtitle={
            lang === 'bn'
              ? 'বিশুদ্ধ উসমানী লিপি, নির্ভরযোগ্য বাংলা অনুবাদ ও ইংরেজি তর্জমা সহ পবিত্র কুরআনের প্রতিটি সূরার প্রামাণ্য ডিজিটাল সংস্করণ।'
              : lang === 'ar'
              ? 'تصفح سور القرآن الكريم بالرسم العثماني المعتمد مع الترجمات الدقيقة الموثوقة.'
              : 'Browse all 114 Surahs and 30 Juz of the Holy Quran with verified Uthmani script and authentic translations.'
          }
        />

        {/* Scholarly Source Attribution Banner */}
        <div className="p-5 rounded-3xl bg-surface border border-border shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-text-muted">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold text-primary block">
                {lang === 'bn' ? 'প্রামাণিকতা ও নুসখা তথ্য:' : 'Authenticity & Edition Assurance:'}
              </span>
              <span>
                {lang === 'bn'
                  ? 'উসমানী ক্যালিগ্রাফি: মদিনা বাদশাহ ফাহাদ কুরআন প্রিন্টিং কমপ্লেক্স ও তানযীল প্রজেক্টের নির্ভরযোগ্য পাঠ • অনুবাদ: ইসলামিক ফাউন্ডেশন বাংলাদেশ ও মাওলানা মুহিউদ্দীন খান।'
                  : 'Arabic Uthmani text based on the King Fahad Quran Complex / Tanzil verified project • Translations: Islamic Foundation Bangladesh & Saheeh International.'}
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Surahs / Juz Grid */}
        <QuranIndexView locale={lang} />
      </div>
    </div>
  );
}
