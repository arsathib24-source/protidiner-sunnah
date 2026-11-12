import React from 'react';
import { Settings, ShieldCheck, Database, Globe, Mail } from 'lucide-react';
import { getWebsiteSettings } from '@/lib/admin/admin-store';
import { SettingsForm } from '@/components/admin/settings-form';

export default async function AdminSettingsPage({
  params,
}: {
  params: { lang: string };
}) {
  const locale = params.lang || 'bn';
  const settings = await getWebsiteSettings();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold font-bengali-heading text-foreground flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-primary" />
            <span>ওয়েবসাইট সেটিংস ও নিরাপত্তা (Website Settings)</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            প্ল্যাটফর্মের সাধারণ কনফিগারেশন, ব্র্যান্ড তথ্য এবং ডাটাবেজ সিকিউরিটি স্ট্যাটাস
          </p>
        </div>
      </div>

      {/* RLS Security Status Card */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-xs space-y-3">
        <h3 className="font-bold text-sm font-bengali-heading text-foreground flex items-center gap-2">
          <Database className="w-4 h-4 text-primary" />
          <span>PostgreSQL & Supabase RLS সিকিউরিটি স্থিতি</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="text-[11px] font-semibold text-emerald-700">Row Level Security (RLS)</div>
            <div className="text-base font-bold text-emerald-800 mt-1">১৩ টি টেবিলে সক্রিয়</div>
            <div className="text-[11px] text-emerald-700/80 mt-0.5">পাবলিক কন্টেন্ট কেবল পড়ার জন্য সীমিত</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/20">
            <div className="text-[11px] font-semibold text-primary">সার্ভার-সাইড রোল ভেরিফিকেশন</div>
            <div className="text-base font-bold text-foreground mt-1">সক্রিয় ও সুরক্ষিত</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">ক্লায়েন্ট বোতামের উপর নির্ভরতাহীন</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-accent/15 border border-accent/30">
            <div className="text-[11px] font-semibold text-accent-dark">তাহকিক রিভিউ প্রোটোকল</div>
            <div className="text-base font-bold text-foreground mt-1">অনলাইন ও বলবৎ</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">আলেম অনুমোদন ছাড়া প্রকাশ নিষিদ্ধ</div>
          </div>
        </div>
      </div>

      {/* Settings Form */}
      <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-xs">
        <SettingsForm initialSettings={settings} locale={locale} />
      </div>
    </div>
  );
}
