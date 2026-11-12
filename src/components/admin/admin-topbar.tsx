'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, Search, Plus, Bell, Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminTopbarProps {
  locale: string;
  onMenuClick: () => void;
  adminName?: string;
  adminRole?: string;
}

export const AdminTopbar: React.FC<AdminTopbarProps> = ({
  locale,
  onMenuClick,
  adminName = 'মুফতি আবদুল্লাহ আল-মাসউদ',
  adminRole = 'সুপার অ্যাডমিন',
}) => {
  return (
    <header className="sticky top-0 z-30 bg-surface/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Hamburger & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-xl text-foreground/70 hover:text-foreground hover:bg-muted lg:hidden focus:outline-none"
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden sm:block">
            <h1 className="text-lg font-bold font-bengali-heading text-foreground">
              অ্যাডমিন কন্ট্রোল সেন্টার
            </h1>
            <p className="text-xs text-muted-foreground">
              প্রামাণ্য ইসলামিক ই-বুক ও তাহকিক ব্যবস্থাপনা
            </p>
          </div>
        </div>

        {/* Center: Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="বই, হাদিস বা লেখক অনুসন্ধান করুন..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-muted/60 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
            />
          </div>
        </div>

        {/* Right: Quick Action, Notifications, User Badge */}
        <div className="flex items-center gap-3">
          <Link href={`/${locale}/admin/books/new`}>
            <Button
              size="sm"
              variant="accent"
              className="flex items-center gap-1.5 shadow-sm text-xs font-semibold"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">নতুন ই-বুক</span>
            </Button>
          </Link>

          {/* Review notification pill */}
          <Link
            href={`/${locale}/admin/reviews`}
            className="relative p-2 rounded-xl text-foreground/70 hover:bg-muted hover:text-foreground transition-colors"
            title="পর্যালোচনা নোটিফিকেশন"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
          </Link>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-border">
            <div className="w-9 h-9 rounded-xl bg-primary text-accent flex items-center justify-center font-bold text-sm shadow-sm border border-accent/30">
              {adminName[0] || 'ম'}
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-foreground leading-tight">
                {adminName}
              </div>
              <div className="text-[10px] text-accent font-semibold flex items-center gap-1">
                <Shield className="w-3 h-3 text-accent inline" />
                <span>{adminRole}</span>
              </div>
            </div>

            <Link
              href={`/${locale}/admin/login?logout=true`}
              title="লগআউট"
              className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors ml-1"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
