'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  FolderTree,
  ListTree,
  Quote,
  Languages,
  ClipboardCheck,
  Image as ImageIcon,
  Users,
  Settings,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  X,
} from 'lucide-react';
import { IslamicStarIcon } from '@/components/ui/decorative';

interface AdminSidebarProps {
  locale: string;
  isOpen: boolean;
  onClose: () => void;
  pendingReviewsCount?: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  locale,
  isOpen,
  onClose,
  pendingReviewsCount = 2,
}) => {
  const pathname = usePathname();

  const navigationItems = [
    {
      title: 'ড্যাশবোর্ড',
      titleEn: 'Dashboard',
      href: `/${locale}/admin`,
      icon: LayoutDashboard,
      exact: true,
    },
    {
      title: 'ই-বুক ব্যবস্থাপনা',
      titleEn: 'Ebook Management',
      href: `/${locale}/admin/books`,
      icon: BookOpen,
      matchSubpaths: true,
    },
    {
      title: 'ক্যাটাগরি',
      titleEn: 'Categories',
      href: `/${locale}/admin/categories`,
      icon: FolderTree,
    },
    {
      title: 'অধ্যায়সমূহ',
      titleEn: 'Chapters',
      href: `/${locale}/admin/chapters`,
      icon: ListTree,
    },
    {
      title: 'হাদিস রেফারেন্স',
      titleEn: 'Hadith References',
      href: `/${locale}/admin/hadith-references`,
      icon: Quote,
    },
    {
      title: 'অনুবাদসমূহ',
      titleEn: 'Translations',
      href: `/${locale}/admin/translations`,
      icon: Languages,
    },
    {
      title: 'পর্যালোচনা ব্যবস্থাপনা',
      titleEn: 'Review Management',
      href: `/${locale}/admin/reviews`,
      icon: ClipboardCheck,
      badge: pendingReviewsCount > 0 ? pendingReviewsCount : undefined,
    },
    {
      title: 'মিডিয়া লাইব্রেরি',
      titleEn: 'Media Library',
      href: `/${locale}/admin/media`,
      icon: ImageIcon,
    },
    {
      title: 'ব্যবহারকারী ব্যবস্থাপনা',
      titleEn: 'User Management',
      href: `/${locale}/admin/users`,
      icon: Users,
    },
    {
      title: 'ওয়েবসাইট সেটিংস',
      titleEn: 'Website Settings',
      href: `/${locale}/admin/settings`,
      icon: Settings,
    },
  ];

  const isActive = (item: (typeof navigationItems)[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-primary text-white flex flex-col border-r border-accent/20 shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand & Editorial Seal */}
        <div className="p-6 border-b border-accent/20 flex items-center justify-between">
          <Link
            href={`/${locale}/admin`}
            className="flex items-center gap-3 group focus:outline-none"
            onClick={onClose}
          >
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-accent border border-accent/40 shadow-inner group-hover:scale-105 transition-transform">
              <IslamicStarIcon className="w-6 h-6 text-accent" />
            </div>
            <div>
              <div className="font-bold text-lg tracking-tight font-bengali-heading flex items-center gap-1.5">
                <span>প্রতিদিনের সুন্নাহ</span>
                <span className="text-[10px] bg-accent/20 text-accent px-1.5 py-0.5 rounded font-mono font-semibold">
                  CMS
                </span>
              </div>
              <div className="text-xs text-background/60 font-medium">
                অ্যাডমিন ও তাহকিক প্যানেল
              </div>
            </div>
          </Link>

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-background/70 hover:text-white hover:bg-white/10 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Badge Pill */}
        <div className="px-5 py-3 mx-4 my-3 bg-secondary/80 rounded-xl border border-accent/20 flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
          <div className="text-xs">
            <span className="text-accent font-semibold">RLS সুরক্ষিত:</span>{' '}
            <span className="text-white/80">সার্ভার-সাইড রোল যাচাইকৃত</span>
          </div>
        </div>

        {/* Navigation Items (10 Items) */}
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto scrollbar-thin">
          {navigationItems.map((item) => {
            const active = isActive(item);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group ${
                  active
                    ? 'bg-accent text-primary font-semibold shadow-md'
                    : 'text-background/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                      active ? 'text-primary' : 'text-accent/80'
                    }`}
                  />
                  <span>{item.title}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        active
                          ? 'bg-primary text-accent'
                          : 'bg-amber-500/90 text-white animate-pulse'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {active && <ChevronRight className="w-4 h-4 text-primary" />}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Public Website Quick Link */}
        <div className="p-4 border-t border-accent/20 bg-primary-dark/40">
          <Link
            href={`/${locale}`}
            target="_blank"
            className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-background/90 border border-white/10 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-accent" />
              <span>মূল পাবলিক ওয়েবসাইট দেখুন</span>
            </span>
            <span className="text-accent text-[11px] font-mono">লাইভ</span>
          </Link>
        </div>
      </aside>
    </>
  );
};
