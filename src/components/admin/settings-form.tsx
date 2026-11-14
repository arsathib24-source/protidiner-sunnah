'use client';

import React, { useState, useTransition } from 'react';
import { Save, Loader2, CheckCircle2, Sparkles, Image as ImageIcon, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateWebsiteSettingsAction } from '@/lib/admin/actions';
import { BrandLogo, LogoEmblemType } from '@/components/ui/brand-logo';

interface SettingsFormProps {
  initialSettings: any;
  locale: string;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  initialSettings,
  locale,
}) => {
  const [isPending, startTransition] = useTransition();

  // Dynamic branding fields
  const [siteNameBn, setSiteNameBn] = useState(initialSettings.siteNameBn || 'প্রতিদিনের সুন্নাহ');
  const [siteNameEn, setSiteNameEn] = useState(initialSettings.siteNameEn || 'Daily Sunnah');
  const [taglineBn, setTaglineBn] = useState(initialSettings.taglineBn || 'রাসুলুল্লাহ ﷺ-এর আদর্শে প্রতিদিন');
  const [taglineAr, setTaglineAr] = useState(initialSettings.taglineAr || 'على هدي رسول الله ﷺ في كل يوم');
  const [taglineEn, setTaglineEn] = useState(initialSettings.taglineEn || 'Living the Prophet’s Sunnah Every Day');
  const [logoType, setLogoType] = useState<LogoEmblemType>(initialSettings.logoType || 'star');
  const [logoImageUrl, setLogoImageUrl] = useState(initialSettings.logoImageUrl || '');
  const [showTagline, setShowTagline] = useState(initialSettings.showTagline !== false);

  // System settings
  const [contactEmail, setContactEmail] = useState(initialSettings.contactEmail || 'contact@protidinersunnah.com');
  const [maintenanceMode, setMaintenanceMode] = useState(
    initialSettings.maintenanceMode || false
  );
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(false);

    const formData = new FormData();
    formData.append('siteNameBn', siteNameBn);
    formData.append('siteNameEn', siteNameEn);
    formData.append('taglineBn', taglineBn);
    formData.append('taglineAr', taglineAr);
    formData.append('taglineEn', taglineEn);
    formData.append('logoType', logoType);
    formData.append('logoImageUrl', logoImageUrl);
    formData.append('showTagline', String(showTagline));
    formData.append('contactEmail', contactEmail);
    formData.append('maintenanceMode', String(maintenanceMode));

    startTransition(async () => {
      const res = await updateWebsiteSettingsAction(formData);
      if (res.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3500);
      }
    });
  };

  const emblemOptions: Array<{ type: LogoEmblemType; label: string; desc: string }> = [
    { type: 'star', label: 'ইসলামিক তারকা (Star)', desc: 'ঐতিহ্যবাহী ৮-কোণা ইসলামিক জ্যামিতিক রোজেট' },
    { type: 'book', label: 'খোলা কিতাব (Open Book)', desc: 'কুরআন ও হাদিসের পবিত্র পাণ্ডুলিপির প্রতীক' },
    { type: 'crescent', label: 'চাঁদ ও তারা (Crescent)', desc: 'চিরন্তন হিলাল ও তারকা মোটিফ' },
    { type: 'minaret', label: 'মেহরাব / মিনার (Mihrab)', desc: 'মসজিদের মেহরাব ও গম্বুজ আর্চ' },
    { type: 'image', label: 'কাস্টম ইমেজ লোগো (Custom Image)', desc: 'নিজের তৈরি করা পিএনজি/এসভিজি লোগো ফাইল' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>ওয়েবসাইট ব্র্যান্ডিং ও সেটিংস সফলভাবে সংরক্ষিত হয়েছে। ওয়েবসাইটের হেডারে পরিবর্তন যুক্ত হয়েছে।</span>
        </div>
      )}

      {/* Real-time Dynamic Brand Logo Preview Box */}
      <div className="p-6 rounded-3xl bg-background border border-accent/30 shadow-subtle relative overflow-hidden">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
          <div className="flex items-center gap-2 text-xs font-bold text-primary dark:text-accent">
            <Eye className="w-4 h-4 text-accent" />
            <span>ব্র্যান্ড লোগো ও হেডারের লাইভ প্রিভিউ (Live Preview)</span>
          </div>
          <span className="text-[11px] text-muted-foreground bg-surface px-2.5 py-1 rounded-full border border-border">
            কালার ও সাইজ অটোমেটিক সিঙ্ক হচ্ছে
          </span>
        </div>

        {/* Live Rendering in Header Environment */}
        <div className="bg-surface p-6 rounded-2xl border border-border/70 flex items-center justify-between">
          <BrandLogo
            locale={locale}
            title={siteNameBn}
            tagline={taglineBn}
            logoType={logoType}
            logoImageUrl={logoImageUrl}
            showTagline={showTagline}
            size="md"
            variant="header"
            href={null}
          />

          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>হেডারে যেমন দেখাবে</span>
          </div>
        </div>
      </div>

      {/* 1. Logo Emblem Selection */}
      <div className="space-y-4">
        <label className="block text-sm font-bold text-foreground">
          লোগো আইকন বা এমব্লেম নির্বাচন (Dynamic Logo Emblem)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {emblemOptions.map((opt) => {
            const isSelected = logoType === opt.type;
            return (
              <button
                key={opt.type}
                type="button"
                onClick={() => setLogoType(opt.type)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-accent bg-accent/10 shadow-xs ring-2 ring-accent/40'
                    : 'border-border bg-surface hover:border-accent/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-accent border border-accent/40">
                    {opt.type === 'image' ? (
                      <ImageIcon className="w-4 h-4 text-accent" />
                    ) : (
                      <BrandLogo
                        title=""
                        tagline=""
                        showTagline={false}
                        logoType={opt.type}
                        size="sm"
                        href={null}
                        className="pointer-events-none"
                      />
                    )}
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-accent ring-4 ring-accent/20" />
                  )}
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">{opt.label}</div>
                  <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                    {opt.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* If Custom Image is selected, show URL input */}
        {logoType === 'image' && (
          <div className="p-4 rounded-2xl bg-surface border border-accent/30 space-y-2 mt-3 animate-fadeIn">
            <label className="block text-xs font-semibold text-foreground">
              কাস্টম লোগো ইমেজের লিঙ্ক বা পাথ (Logo Image URL / Path)
            </label>
            <Input
              type="text"
              placeholder="/logo.png অথবা https://..."
              value={logoImageUrl}
              onChange={(e) => setLogoImageUrl(e.target.value)}
              className="text-xs font-mono"
            />
            <p className="text-[11px] text-muted-foreground">
              টিপস: ট্রান্সপারেন্ট ব্যাকগ্রাউন্ডের স্কয়ার `.png` বা `.svg` ছবি ব্যবহার করলে সবচেয়ে সুন্দর দেখাবে।
            </p>
          </div>
        )}
      </div>

      {/* 2. Brand Name & Tagline Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            ওয়েবসাইটের নাম (বাংলা)
          </label>
          <Input
            type="text"
            value={siteNameBn}
            onChange={(e) => setSiteNameBn(e.target.value)}
            required
            className="font-bengali-heading text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            ওয়েবসাইটের নাম (ইংরেজি)
          </label>
          <Input
            type="text"
            value={siteNameEn}
            onChange={(e) => setSiteNameEn(e.target.value)}
            required
            className="text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            ট্যাগলাইন (বাংলা)
          </label>
          <Input
            type="text"
            value={taglineBn}
            onChange={(e) => setTaglineBn(e.target.value)}
            required
            className="text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            ট্যাগলাইন (আরবি)
          </label>
          <Input
            type="text"
            dir="rtl"
            value={taglineAr}
            onChange={(e) => setTaglineAr(e.target.value)}
            className="font-arabic text-sm"
          />
        </div>
      </div>

      {/* 3. Visibility Options */}
      <div className="space-y-4 pt-4 border-t border-border">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={showTagline}
            onChange={(e) => setShowTagline(e.target.checked)}
            className="rounded text-primary focus:ring-accent w-4 h-4"
          />
          <div>
            <span className="text-xs font-bold text-foreground block">
              হেডারে ট্যাগলাইন প্রদর্শন করুন (Show Tagline in Header)
            </span>
            <span className="text-[11px] text-muted-foreground">
              আনচেক করলে হেডারে শুধু মূল নামটি প্রদর্শিত হবে।
            </span>
          </div>
        </label>

        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            যোগাযোগের অফিসিয়াল ইমেইল
          </label>
          <Input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            required
          />
        </div>

        <label className="flex items-center gap-3 cursor-pointer select-none pt-2">
          <input
            type="checkbox"
            checked={maintenanceMode}
            onChange={(e) => setMaintenanceMode(e.target.checked)}
            className="rounded text-primary focus:ring-accent w-4 h-4"
          />
          <div>
            <span className="text-xs font-bold text-foreground block">
              মেইনটেন্যান্স মোড (Maintenance Mode)
            </span>
            <span className="text-[11px] text-muted-foreground">
              চালু থাকলে সাধারণ পাঠকদের মেইনটেন্যান্স নোটিশ দেখানো হবে।
            </span>
          </div>
        </label>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4 border-t border-border">
        <Button
          type="submit"
          variant="accent"
          size="md"
          disabled={isPending}
          className="font-semibold shadow-xs flex items-center gap-2"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>পরিবর্তন সংরক্ষণ করুন</span>
        </Button>
      </div>
    </form>
  );
};
