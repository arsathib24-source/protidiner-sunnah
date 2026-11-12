'use client';

import React, { useState, useTransition } from 'react';
import { Save, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateWebsiteSettingsAction } from '@/lib/admin/actions';

interface SettingsFormProps {
  initialSettings: any;
  locale: string;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  initialSettings,
  locale,
}) => {
  const [isPending, startTransition] = useTransition();
  const [siteNameBn, setSiteNameBn] = useState(initialSettings.siteNameBn);
  const [taglineBn, setTaglineBn] = useState(initialSettings.taglineBn);
  const [contactEmail, setContactEmail] = useState(initialSettings.contactEmail);
  const [maintenanceMode, setMaintenanceMode] = useState(
    initialSettings.maintenanceMode
  );
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(false);

    const formData = new FormData();
    formData.append('siteNameBn', siteNameBn);
    formData.append('taglineBn', taglineBn);
    formData.append('contactEmail', contactEmail);
    formData.append('maintenanceMode', String(maintenanceMode));

    startTransition(async () => {
      const res = await updateWebsiteSettingsAction(formData);
      if (res.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {saved && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>ওয়েবসাইট সেটিংস সফলভাবে সংরক্ষিত হয়েছে।</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-foreground mb-1.5">
          ওয়েবসাইটের নাম (বাংলা)
        </label>
        <Input
          type="text"
          value={siteNameBn}
          onChange={(e) => setSiteNameBn(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-foreground mb-1.5">
          ট্যাগলাইন
        </label>
        <Input
          type="text"
          value={taglineBn}
          onChange={(e) => setTaglineBn(e.target.value)}
          required
        />
      </div>

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

      <div className="pt-2 border-t border-border">
        <label className="flex items-center gap-3 cursor-pointer">
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

      <div className="flex justify-end pt-4 border-t border-border">
        <Button
          type="submit"
          variant="accent"
          size="sm"
          disabled={isPending}
          className="font-semibold shadow-xs flex items-center gap-2"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>সেটিংস সংরক্ষণ করুন</span>
        </Button>
      </div>
    </form>
  );
};
