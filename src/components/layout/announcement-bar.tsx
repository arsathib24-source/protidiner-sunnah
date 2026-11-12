'use client';

import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { IslamicStarIcon } from '../ui/decorative';

export interface AnnouncementBarProps {
  message?: string;
  badge?: string;
  linkText?: string;
  linkHref?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  message = 'পবিত্র কুরআন ও সহিহ সুন্নাহর প্রামাণ্য ইসলামিক ই-বুক সম্পূর্ণ বিনামূল্যে পড়ুন',
  badge = 'উন্মুক্ত দাওয়াহ ও জ্ঞান',
  linkText = 'লাইব্রেরি দেখুন',
  linkHref = '/library',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-primary via-primary-dark to-primary text-primary-foreground py-2 px-4 text-xs font-medium border-b border-accent/30 relative z-50">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2.5 text-center">
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent text-primary font-bold text-[10px]">
            <IslamicStarIcon className="w-2.5 h-2.5" />
            <span>{badge}</span>
          </span>

          <span className="text-background/90 font-bengali">
            {message}
          </span>

          {linkHref && (
            <a
              href={linkHref}
              className="text-accent underline underline-offset-2 hover:text-accent-light transition-colors font-bold ms-1"
            >
              {linkText} →
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="p-1 rounded text-background/60 hover:text-accent transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
