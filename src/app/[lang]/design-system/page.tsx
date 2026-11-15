'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Bookmark, ShieldCheck, Search, Sparkles, Check, 
  Copy, Layers, Palette, Type, MousePointer, Layout, Eye, BookMarked
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input, SearchInput } from '@/components/ui/input';
import { ArabesqueDivider, SectionHeader, IslamicStarIcon } from '@/components/ui/decorative';
import { EbookCard } from '@/components/ui/ebook-card';
import { CategoryCard } from '@/components/ui/category-card';

export default function DesignSystemPage({
  params,
}: {
  params: { lang: string };
}) {
  const lang = params.lang || 'bn';
  const isRTL = lang === 'ar';

  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<'ivory' | 'sepia' | 'charcoal'>('ivory');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(text);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const colorTokens = [
    { name: 'Primary (Forest Green)', hex: '#123F35', role: 'Brand anchor, primary CTAs, main headers', bg: 'bg-primary', text: 'text-primary-foreground' },
    { name: 'Secondary (Deep Green)', hex: '#1B5547', role: 'Secondary buttons, gradients, subtle cards', bg: 'bg-secondary', text: 'text-secondary-foreground' },
    { name: 'Accent (Soft Gold)', hex: '#D9BD7A', role: 'Gold badges, star ornaments, highlight borders', bg: 'bg-accent', text: 'text-primary' },
    { name: 'Background (Ivory)', hex: '#F7F1E5', role: 'Default canvas, warm day reading backdrop', bg: 'bg-background', text: 'text-foreground', border: true },
    { name: 'Surface (White)', hex: '#FFFFFF', role: 'Card surface, inputs, elevated panels', bg: 'bg-surface', text: 'text-foreground', border: true },
    { name: 'Text (Charcoal)', hex: '#26332F', role: 'High contrast body typography, dark canvas', bg: 'bg-text', text: 'text-background' },
  ];

  return (
    <div className="py-12 md:py-20 bg-background bg-islamic-pattern min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 space-y-20">
        {/* Showcase Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="accent" className="shadow-subtle">
            <IslamicStarIcon className="w-3.5 h-3.5" />
            <span>ডিজাইন সিস্টেম ১.০ • প্রিমিয়াম ইসলামিক ডিজিটাল লাইব্রেরি</span>
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-bold font-bengali-heading text-primary dark:text-background tracking-tight">
            Protidiner Sunnah Design System
          </h1>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed font-bengali">
            উন্নত, মার্জিত এবং সুশৃঙ্খল আধুনিক ইসলামিক ডিজিটাল পাঠাগারের সম্পূর্ণ ইউআই উপাদান, কালার টোকেন, টাইপোগ্রাফি এবং ইন্টারঅ্যাক্টিভ কম্পোনেন্ট লাইব্রেরি।
          </p>
          <ArabesqueDivider />
        </div>

        {/* 1. Brand Color System */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-border">
            <Palette className="w-5 h-5 text-accent-dark" />
            <h2 className="text-2xl font-bold font-bengali-heading text-primary dark:text-background">
              ১. কালার ভেরিয়েবল ও প্যালেট (Color Tokens)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {colorTokens.map((token) => (
              <div
                key={token.hex}
                onClick={() => copyToClipboard(token.hex)}
                className="group relative rounded-2xl bg-surface border border-border/80 shadow-card p-5 cursor-pointer hover:shadow-card-hover hover:border-accent/60 transition-all duration-200"
              >
                <div
                  className={`h-24 w-full rounded-xl ${token.bg} ${token.text} flex items-center justify-between p-4 mb-4 transition-transform group-hover:scale-102 ${
                    token.border ? 'border border-border' : ''
                  }`}
                >
                  <IslamicStarIcon className="w-6 h-6 opacity-40" />
                  <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-black/15 backdrop-blur-sm">
                    {token.hex}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-primary dark:text-background font-bengali-heading">
                    {token.name}
                  </h3>
                  <button className="text-text-muted hover:text-accent p-1">
                    {copiedColor === token.hex ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-text-muted mt-1 leading-relaxed">
                  {token.role}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Typography System */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-border">
            <Type className="w-5 h-5 text-accent-dark" />
            <h2 className="text-2xl font-bold font-bengali-heading text-primary dark:text-background">
              ২. বহুভাষিক টাইপোগ্রাফি (Typography System)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bengali Typography */}
            <Card className="p-6 space-y-4">
              <Badge variant="accent">বাংলা টাইপোগ্রাফি (Tiro Bangla)</Badge>
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] uppercase font-mono text-text-muted">Display Heading (Tiro Bangla Bold 32px)</span>
                  <h1 className="text-3xl font-bold font-bengali-heading text-primary leading-tight">
                    সহিহ হাদিসের আলোয় প্রতিটি দিন
                  </h1>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-text-muted">Section Title (Tiro Bangla Semibold 24px)</span>
                  <h2 className="text-2xl font-semibold font-bengali-heading text-primary leading-tight">
                    প্রাত্যহিক জীবনের প্রয়োজনীয় আমল ও দোয়া
                  </h2>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-text-muted">Body Text (Tiro Bangla Regular 16px / 1.8 line-height)</span>
                  <p className="text-base text-foreground leading-relaxed font-bengali">
                    রাসুলুল্লাহ ﷺ-এর জীবন ও সুন্নাহ আমাদের জন্য সর্বোত্তম আদর্শ। বিশুদ্ধ জ্ঞান অর্জনের মাধ্যমে প্রতিটি মুমিন তার দৈনন্দিন জীবনকে সাজাতে পারে।
                  </p>
                </div>
              </div>
            </Card>

            {/* Arabic & English Typography */}
            <Card className="p-6 space-y-4">
              <Badge variant="accent">عربي & English (Amiri + Inter)</Badge>
              <div className="space-y-4">
                <div dir="rtl" className="text-right border-b border-border pb-4">
                  <span className="text-[10px] uppercase font-mono text-text-muted">Arabic Quranic/Hadith (Amiri 26px)</span>
                  <p className="text-2xl font-arabic text-primary leading-loose">
                    «مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا، سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ»
                  </p>
                  <span className="text-xs text-text-muted font-sans">[صحيح مسلم: 2699]</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-text-muted">English Heading & Body (Inter 18px / 14px)</span>
                  <h4 className="text-lg font-bold font-english text-primary">
                    Daily Sunnah Digital Library
                  </h4>
                  <p className="text-sm text-text-muted leading-relaxed font-english">
                    A modern, open-access platform bringing verified Islamic scholarship and authentic prophetic traditions to readers worldwide.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* 3. Button Component Suite */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-border">
            <MousePointer className="w-5 h-5 text-accent-dark" />
            <h2 className="text-2xl font-bold font-bengali-heading text-primary dark:text-background">
              ৩. বাটন কম্পোনেন্ট (Buttons Suite)
            </h2>
          </div>

          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-3">
                বাটন ভেরিয়েন্টসমূহ (Variants)
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary (#123F35)</Button>
                <Button variant="secondary">Secondary (#1B5547)</Button>
                <Button variant="accent">Accent Gold (#D9BD7A)</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-3">
                আকার ও স্টেটসমূহ (Sizes & Interactive States)
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="sm">Small (sm)</Button>
                <Button variant="primary" size="md">Medium (md)</Button>
                <Button variant="primary" size="lg">Large (lg)</Button>
                <Button variant="accent" size="icon" aria-label="Bookmark Icon">
                  <Bookmark className="w-4 h-4" />
                </Button>
                <Button
                  variant="primary"
                  isLoading={buttonLoading}
                  onClick={() => {
                    setButtonLoading(true);
                    setTimeout(() => setButtonLoading(false), 2000);
                  }}
                >
                  {buttonLoading ? 'লোড হচ্ছে...' : 'লোডিং স্টেট পরীক্ষা'}
                </Button>
                <Button variant="primary" disabled>Disabled State</Button>
              </div>
            </div>
          </Card>
        </section>

        {/* 4. Form Controls & Inputs */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-border">
            <Search className="w-5 h-5 text-accent-dark" />
            <h2 className="text-2xl font-bold font-bengali-heading text-primary dark:text-background">
              ৪. ইনপুট ও সার্চ কম্পোনেন্ট (Input Components)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 space-y-4">
              <h3 className="text-sm font-bold font-bengali-heading text-primary">
                সার্চ ইনপুট (Search Input with Clear Trigger)
              </h3>
              <SearchInput
                placeholder="কিতাবের নাম, লেখক বা বিষয় দিয়ে অনুসন্ধান করুন..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onClear={() => setSearchValue('')}
              />
              <p className="text-xs text-text-muted">
                বর্তমান ইনপুট মান: <span className="font-semibold text-primary">{searchValue || 'খালি'}</span>
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <h3 className="text-sm font-bold font-bengali-heading text-primary">
                ফর্ম টেক্সট ইনপুট (Standard Form Field)
              </h3>
              <Input
                placeholder="আপনার নাম লিখুন..."
                helperText="প্রোফাইলে প্রদর্শিত পূর্ণ নাম।"
              />
              <Input
                placeholder="ভুল ইনপুট পরীক্ষা..."
                defaultValue="invalid-format@"
                error="একটি সঠিক এবং বৈধ তথ্য প্রদান করুন"
              />
            </Card>
          </div>
        </section>

        {/* 5. Badges & Decorative Elements */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-border">
            <Sparkles className="w-5 h-5 text-accent-dark" />
            <h2 className="text-2xl font-bold font-bengali-heading text-primary dark:text-background">
              ৫. ব্যাজ ও ডেকোরেটিভ উপাদান (Badges & Islamic Ornaments)
            </h2>
          </div>

          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-3">
                ব্যাজ ভেরিয়েন্টসমূহ (Badges)
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="accent">
                  <IslamicStarIcon className="w-3.5 h-3.5 text-accent-dark" />
                  <span>Accent Gold Badge</span>
                </Badge>
                <Badge variant="primary">Primary Green</Badge>
                <Badge variant="secondary">Secondary Deep</Badge>
                <Badge variant="surface">Surface Neutral</Badge>
                <Badge variant="outline">Outline Border</Badge>
                <Badge variant="accent" size="sm">Small Accent</Badge>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-3">
                ইসলামিক অ্যারাবেস্ক ডিভাইডার (Arabesque Dividers)
              </h3>
              <div className="space-y-4 max-w-xl">
                <ArabesqueDivider variant="gold" />
                <ArabesqueDivider variant="subtle" />
              </div>
            </div>
          </Card>
        </section>

        {/* 6. Premium Ebook Cards (Vertical & Horizontal) */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-border">
            <BookOpen className="w-5 h-5 text-accent-dark" />
            <h2 className="text-2xl font-bold font-bengali-heading text-primary dark:text-background">
              ৬. প্রিমিয়াম ই-বুক কার্ড (Ebook Cards)
            </h2>
          </div>

          <div className="space-y-6">
            {/* Vertical Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <EbookCard
                id="book-1"
                slug="sample-book-1"
                title="রিয়াদুস সলেহিন (নমুনা কিতাব)"
                author="ইমাম আন-নববী (রহ.)"
                category="হাদিস সংকলন"
                description="দৈনন্দিন জীবনে আমলযোগ্য সহিহ হাদিসের প্রামাণিক সংকলন যা প্রতিটি মুমিনের চরিত্র ও ইবাদতকে সমৃদ্ধ করে।"
                chapterCount={1896}
                readingTimeMins={20}
                verifiedSource="দারুসসালাম প্রকাশনী"
                lang={lang}
                isRTL={isRTL}
              />
              <EbookCard
                id="book-2"
                slug="sample-book-2"
                title="হিসনুল মুসলিম (নমুনা কিতাব)"
                author="সাঈদ ইবন ওয়াহফ আল-কাহত্বানী"
                category="দোয়া ও জিকির"
                description="কুরআন ও সহিহ হাদিস থেকে সংকলিত সকাল-সন্ধ্যার জিকির এবং প্রাত্যহিক জীবনের প্রয়োজনীয় দোয়া।"
                chapterCount={132}
                readingTimeMins={8}
                verifiedSource="আল-মাকতাবাতুশ শামিলা"
                progressPercentage={65}
                isBookmarked={true}
                lang={lang}
                isRTL={isRTL}
              />
              <EbookCard
                id="book-3"
                slug="sample-book-3"
                title="চল্লিশ হাদিস (আল-আরবাঈন)"
                author="ইমাম আন-নববী (রহ.)"
                category="মৌলিক ইসলাম"
                description="দ্বীন ইসলামের সর্বাধিক গুরুত্বপূর্ণ মূলনীতি ও স্তম্ভ সম্বলিত বিয়াল্লিশটি সহিহ হাদিস।"
                chapterCount={42}
                readingTimeMins={6}
                verifiedSource="তাহকিককৃত বিশুদ্ধ পাঠ"
                lang={lang}
                isRTL={isRTL}
              />
            </div>

            {/* Horizontal Card Showcase */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-3">
                হরাইজন্টাল তালিকা ভিউ (Horizontal List View)
              </h3>
              <EbookCard
                id="book-4"
                slug="sample-book-4"
                title="মুওয়াত্তা ইমাম মালিক (নমুনা কিতাব)"
                author="ইমাম মালিক ইবনে আনাস (রহ.)"
                category="হাদিস ও ফিকহ"
                description="হাদিস ও ফিকহের প্রাচীনতম এবং নির্ভরযোগ্য সংকলন গ্রন্থসমূহের অন্যতম উজ্জ্বল দৃষ্টান্ত।"
                chapterCount={61}
                readingTimeMins={35}
                verifiedSource="মুহাম্মদ ফুয়াদ আব্দুল বাকি তাহকিক"
                layout="horizontal"
                lang={lang}
                isRTL={isRTL}
              />
            </div>
          </div>
        </section>

        {/* 7. Category Cards */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-border">
            <Layers className="w-5 h-5 text-accent-dark" />
            <h2 className="text-2xl font-bold font-bengali-heading text-primary dark:text-background">
              ৭. ক্যাটাগরি কার্ড (Category Cards)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CategoryCard
              id="cat-1"
              slug="hadith"
              title="হাদিস শরিফ"
              description="রাসুলুল্লাহ ﷺ-এর প্রামাণিক বাণী, সুন্নাহ এবং সাহাবায়ে কেরামের আমলের বিশুদ্ধ সংকলন।"
              bookCount={24}
              iconName="hadith"
              lang={lang}
              isRTL={isRTL}
            />
            <CategoryCard
              id="cat-2"
              slug="fiqh"
              title="ফিকহুস সুন্নাহ"
              description="দৈনন্দিন পবিত্রতা, সালাত, সিয়াম ও লেনদেন সংক্রান্ত শরয়ি বিধিবিধান।"
              bookCount={18}
              iconName="fiqh"
              lang={lang}
              isRTL={isRTL}
            />
            <CategoryCard
              id="cat-3"
              slug="seerah"
              title="সিরাতুন নবী ﷺ"
              description="নবীজি ﷺ-এর পবিত্র জীবনচরিত্র, اخلاق এবং ঐতিহাসিক ঘটনাবলি।"
              bookCount={15}
              iconName="seerah"
              lang={lang}
              isRTL={isRTL}
            />
            <CategoryCard
              id="cat-4"
              slug="duas"
              title="দোয়া ও আজকার"
              description="সকাল-সন্ধ্যা, বিপদ-আপদ ও বিভিন্ন মুহূর্তের জন্য মাসনুন দোয়াসমূহ।"
              bookCount={12}
              iconName="dua"
              lang={lang}
              isRTL={isRTL}
            />
            <CategoryCard
              id="cat-5"
              slug="aqeedah"
              title="আকিদা ও বিশ্বাস"
              description="আহলে সুন্নাত ওয়াল জামাআতের বিশুদ্ধ আকিদা ও তাওহিদের মূলনীতি।"
              bookCount={9}
              iconName="aqeedah"
              lang={lang}
              isRTL={isRTL}
            />
            <CategoryCard
              id="cat-6"
              slug="tazkiyah"
              title="আত্মশুদ্ধি ও চরিত্র"
              description="অন্তর পরিশুদ্ধকরণ, যুহদ এবং উত্তম আখলাক অর্জনের শিক্ষণীয় পথনির্দেশ।"
              bookCount={14}
              iconName="tazkiyah"
              lang={lang}
              isRTL={isRTL}
            />
          </div>
        </section>

        {/* 8. Reader Themes Interactive Preview */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-border">
            <Eye className="w-5 h-5 text-accent-dark" />
            <h2 className="text-2xl font-bold font-bengali-heading text-primary dark:text-background">
              ৮. অনলাইন রিডার থিম প্রিভিউ (Reader Themes)
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Button
              variant={selectedTheme === 'ivory' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedTheme('ivory')}
            >
              আইভরি থিম (Ivory Day Canvas)
            </Button>
            <Button
              variant={selectedTheme === 'sepia' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedTheme('sepia')}
            >
              সেপিয়া থিম (Warm Sepia Parchment)
            </Button>
            <Button
              variant={selectedTheme === 'charcoal' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedTheme('charcoal')}
            >
              চারকোল থিম (Charcoal Night Mode)
            </Button>
          </div>

          <div
            className={`p-8 md:p-12 rounded-3xl border transition-all duration-300 shadow-card ${
              selectedTheme === 'ivory'
                ? 'theme-ivory bg-[#F7F1E5] text-[#26332F] border-[#E5DAC5]'
                : selectedTheme === 'sepia'
                ? 'theme-sepia bg-[#F2E8D5] text-[#3B2E24] border-[#DEC8AC]'
                : 'theme-charcoal bg-[#141E1C] text-[#EAE3D2] border-[#263833]'
            }`}
          >
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-current/15 text-xs opacity-75">
                <span>অধ্যায় ১: ইখলাস ও নিয়ত</span>
                <span>পাঠ সময়: ৩ মিনিট</span>
              </div>
              <h3 className="text-2xl font-bold font-bengali-heading leading-tight">
                সব কাজের ফলাফল নিয়তের উপর নির্ভরশীল
              </h3>
              <p className="text-base sm:text-lg leading-relaxed opacity-90 font-bengali">
                বান্দার প্রতিটি সৎ কাজ ও আমলের প্রতিদান নির্ধারিত হয় তার অন্তরের সংকল্প ও নিষ্ঠার মাধ্যমে। যখন কোনো কর্ম একমাত্র আল্লাহর সন্তুষ্টি লাভের উদ্দেশ্যে সম্পাদিত হয়, তখন তা প্রভূত কল্যাণ বয়ে আনে।
              </p>
              <div className="p-4 rounded-xl border border-current/20 bg-current/5 text-sm italic">
                নোট: এটি রিডার ইঞ্জিনের ৩টি আরামদায়ক রঙের থিমের লাইভ ডেমো।
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
