'use client';

import React, { useState } from 'react';
import { Sparkles, Copy, Check, Share2, ShieldCheck, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IslamicStarIcon } from '@/components/ui/decorative';

interface TodaysSunnahProps {
  locale: string;
}

export const TodaysSunnah: React.FC<TodaysSunnahProps> = ({ locale }) => {
  const [copied, setCopied] = useState(false);

  const hadithData = {
    arabic: '«مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا، سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ»',
    bengali: '«যে ব্যক্তি জ্ঞান অর্জনের উদ্দেশ্যে কোনো পথ অবলম্বন করে, আল্লাহ তাআলা তার জন্য জান্নাতের পথ সহজ করে দেন।»',
    english: '«Whoever takes a path upon which he seeks knowledge, Allah makes the path to Paradise easy for him.»',
    lesson: 'ইসলামে দ্বীনি জ্ঞানার্জন এবং সুন্নাহ অনুসরণের গুরুত্ব অপরিসীম। বিশুদ্ধ উৎস থেকে ধর্মীয় জ্ঞান আহরণ জান্নাত লাভের অন্যতম সহজ মাধ্যম।',
    source: 'সহিহ মুসলিম: ২৬৯৯ (আহমাদ: ৭১০৭, তিরমিজি: ২৬৪৬)',
    grade: 'সহিহ (সর্বসম্মতিক্রমে বিশুদ্ধ)',
  };

  const textToCopy = `${hadithData.bengali}\n${hadithData.arabic}\nসূত্র: ${hadithData.source} — Protidiner Sunnah`;

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'আজকের সুন্নাহ - প্রতিদিনের সুন্নাহ',
          text: textToCopy,
          url: window.location.href,
        });
      } catch (err) {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div id="todays-sunnah" className="scroll-mt-28">
      <div className="relative rounded-3xl bg-gradient-to-br from-primary via-primary-light to-secondary text-primary-foreground p-8 sm:p-12 shadow-card-hover border-2 border-accent/40 overflow-hidden">
        {/* Background Islamic Star Watermark */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
          <IslamicStarIcon className="w-80 h-80 text-accent" />
        </div>

        {/* Header Bar */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-primary-light/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent text-primary flex items-center justify-center font-bold shadow-subtle">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-accent">
                প্রাত্যহিক নসিহত
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-bengali-heading text-background">
                আজকের সুন্নাহ ও দিকনির্দেশনা
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-background/80 bg-primary-dark/80 px-3.5 py-1.5 rounded-full border border-accent/30 font-mono">
              {hadithData.source}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="relative z-10 space-y-6">
          {/* Classical Arabic with Tashkeel */}
          <div dir="rtl" className="text-right">
            <p className="text-2xl sm:text-3xl font-arabic text-accent-light leading-loose tracking-wide">
              {hadithData.arabic}
            </p>
          </div>

          {/* Bengali Translation */}
          <blockquote className="text-lg sm:text-2xl font-medium font-bengali-heading text-background leading-relaxed border-s-4 border-accent ps-5 py-1">
            {hadithData.bengali}
          </blockquote>

          {/* Scholarly Lesson */}
          <div className="p-4 rounded-2xl bg-primary-dark/60 border border-accent/20 text-xs sm:text-sm text-background/85 leading-relaxed font-bengali">
            <span className="font-bold text-accent">শিক্ষণীয় শিক্ষা: </span>
            {hadithData.lesson}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 mt-6 border-t border-primary-light/60">
          <div className="flex items-center gap-2 text-xs text-accent">
            <ShieldCheck className="w-4 h-4" />
            <span>সনদ মান: <strong className="text-background">{hadithData.grade}</strong></span>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="accent"
              size="sm"
              onClick={handleCopy}
              className="gap-1.5 text-xs font-bold"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-primary" />
                  <span>কপি হয়েছে</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>হাদিস কপি করুন</span>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="gap-1.5 text-xs text-background border-background/30 hover:border-accent hover:text-accent hover:bg-white/5"
            >
              <Share2 className="w-3.5 h-3.5 text-accent" />
              <span>শেয়ার করুন</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
