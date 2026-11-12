'use client';

import React from 'react';
import { X, Sliders, Type, Sun, Moon, Coffee, Maximize2, RotateCcw } from 'lucide-react';
import { ReaderPreferences, ReaderTheme, ArabicFont, LineHeight, ReaderWidth, DisplayLanguage } from '@/types/reader';

interface ReaderSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: ReaderPreferences;
  onUpdatePreferences: (updates: Partial<ReaderPreferences>) => void;
  onResetPreferences: () => void;
}

export const ReaderSettingsModal: React.FC<ReaderSettingsModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onUpdatePreferences,
  onResetPreferences,
}) => {
  if (!isOpen) return null;

  const themes: Array<{ id: ReaderTheme; label: string; icon: any; bg: string; fg: string }> = [
    { id: 'ivory', label: 'আইভরি (দিনের পাঠ)', icon: Sun, bg: 'bg-[#F7F1E5]', fg: 'text-[#26332F]' },
    { id: 'sepia', label: 'সেপিয়া (চোখের আরাম)', icon: Coffee, bg: 'bg-[#F2E8D5]', fg: 'text-[#3B2E24]' },
    { id: 'charcoal', label: 'চারকোল (রাতের পাঠ)', icon: Moon, bg: 'bg-[#141E1C]', fg: 'text-[#EAE3D2]' },
  ];

  const arabicFonts: Array<{ id: ArabicFont; name: string; sample: string }> = [
    { id: 'font-amiri', name: 'আমিরী (Amiri)', sample: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' },
    { id: 'font-noto-naskh', name: 'নাসখ (Noto Naskh)', sample: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' },
  ];

  const lineHeights: Array<{ id: LineHeight; label: string }> = [
    { id: 'normal', label: 'স্বাভাবিক (১.৬)' },
    { id: 'relaxed', label: 'আরামদায়ক (১.৯)' },
    { id: 'loose', label: 'প্রশস্ত (২.৩)' },
  ];

  const readerWidths: Array<{ id: ReaderWidth; label: string }> = [
    { id: 'compact', label: 'সংকীর্ণ (Compact)' },
    { id: 'standard', label: 'সাধারণ (Standard)' },
    { id: 'wide', label: 'প্রশস্ত (Wide)' },
  ];

  const languageViews: Array<{ id: DisplayLanguage; label: string }> = [
    { id: 'all', label: 'দ্বিভাষিক (আরবি + বাংলা)' },
    { id: 'bn', label: 'শুধু বাংলা' },
    { id: 'ar', label: 'শুধু আরবি' },
    { id: 'en', label: 'English Translation' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-surface rounded-3xl shadow-2xl border border-border p-6 sm:p-8 space-y-6 z-10 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-accent-dark" />
            <h3 className="text-lg font-bold font-bengali-heading text-primary dark:text-background">
              পড়ার সেটিংস ও কাস্টমাইজেশন
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-text-muted hover:text-primary hover:bg-surface-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Theme Selection */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
            ১. রিডিং কালার থিম
          </span>
          <div className="grid grid-cols-3 gap-2.5">
            {themes.map((t) => {
              const isSelected = preferences.theme === t.id;
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => onUpdatePreferences({ theme: t.id })}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${t.bg} ${t.fg} ${
                    isSelected
                      ? 'border-accent shadow-card ring-2 ring-accent/40 font-bold'
                      : 'border-border/80 opacity-80 hover:opacity-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs leading-tight">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Font Size Slider */}
        <div className="space-y-2.5 pt-3 border-t border-border/70">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-accent-dark" />
              <span>২. হরফের আকার (Font Size)</span>
            </span>
            <span className="text-xs font-mono font-bold text-primary dark:text-accent">
              {preferences.fontSize}px
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                onUpdatePreferences({ fontSize: Math.max(14, preferences.fontSize - 1) })
              }
              className="w-9 h-9 rounded-xl border border-border bg-surface-muted text-foreground font-bold hover:bg-surface transition-colors flex items-center justify-center text-sm"
              aria-label="Decrease Font Size"
            >
              A-
            </button>
            <input
              type="range"
              min="14"
              max="32"
              value={preferences.fontSize}
              onChange={(e) => onUpdatePreferences({ fontSize: Number(e.target.value) })}
              className="flex-1 accent-primary h-2 bg-border rounded-lg cursor-pointer"
            />
            <button
              onClick={() =>
                onUpdatePreferences({ fontSize: Math.min(32, preferences.fontSize + 1) })
              }
              className="w-9 h-9 rounded-xl border border-border bg-surface-muted text-foreground font-bold hover:bg-surface transition-colors flex items-center justify-center text-sm"
              aria-label="Increase Font Size"
            >
              A+
            </button>
          </div>
        </div>

        {/* 3. Arabic Font Family Selection */}
        <div className="space-y-2.5 pt-3 border-t border-border/70">
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
            ৩. আরবি ফন্ট স্টাইল (Arabic Font Selection)
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            {arabicFonts.map((af) => {
              const isSelected = preferences.arabicFont === af.id;
              return (
                <button
                  key={af.id}
                  onClick={() => onUpdatePreferences({ arabicFont: af.id })}
                  className={`p-3 rounded-2xl border text-left rtl:text-right transition-all space-y-1 ${
                    isSelected
                      ? 'border-accent bg-accent/10 shadow-subtle'
                      : 'border-border/80 bg-surface-muted hover:bg-surface'
                  }`}
                >
                  <p className="text-xs font-bold text-primary dark:text-accent">{af.name}</p>
                  <p className={`text-base text-text-muted ${af.id}`} dir="rtl">
                    {af.sample}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Line Spacing */}
        <div className="space-y-2.5 pt-3 border-t border-border/70">
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
            ৪. লাইন স্পেসিং (Line Spacing)
          </span>
          <div className="grid grid-cols-3 gap-2">
            {lineHeights.map((lh) => {
              const isSelected = preferences.lineHeight === lh.id;
              return (
                <button
                  key={lh.id}
                  onClick={() => onUpdatePreferences({ lineHeight: lh.id })}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                    isSelected
                      ? 'border-accent bg-accent text-primary font-bold'
                      : 'border-border/80 bg-surface-muted text-text-muted hover:text-primary'
                  }`}
                >
                  {lh.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Reading Width */}
        <div className="space-y-2.5 pt-3 border-t border-border/70">
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
            ৫. পৃষ্ঠার প্রশস্ততা (Reading Canvas Width)
          </span>
          <div className="grid grid-cols-3 gap-2">
            {readerWidths.map((rw) => {
              const isSelected = preferences.readerWidth === rw.id;
              return (
                <button
                  key={rw.id}
                  onClick={() => onUpdatePreferences({ readerWidth: rw.id })}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                    isSelected
                      ? 'border-accent bg-accent text-primary font-bold'
                      : 'border-border/80 bg-surface-muted text-text-muted hover:text-primary'
                  }`}
                >
                  {rw.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6. Language Display Selection */}
        <div className="space-y-2.5 pt-3 border-t border-border/70">
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
            ৬. ভাষা প্রদর্শন (Language Views)
          </span>
          <div className="grid grid-cols-2 gap-2">
            {languageViews.map((lv) => {
              const isSelected = preferences.displayLanguage === lv.id;
              return (
                <button
                  key={lv.id}
                  onClick={() => onUpdatePreferences({ displayLanguage: lv.id })}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium text-center transition-all ${
                    isSelected
                      ? 'border-primary bg-primary text-primary-foreground font-bold shadow-subtle'
                      : 'border-border/80 bg-surface-muted text-text-muted hover:text-primary'
                  }`}
                >
                  {lv.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
          <button
            onClick={onResetPreferences}
            className="flex items-center gap-1.5 text-text-muted hover:text-primary transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ডিফল্ট সেটিংসে ফিরুন</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary-light transition-colors"
          >
            সেটিংস বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
