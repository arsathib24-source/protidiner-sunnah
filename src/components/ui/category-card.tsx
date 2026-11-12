import React from 'react';
import Link from 'next/link';
import { BookOpen, Bookmark, Compass, Heart, ScrollText, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IslamicStarIcon } from './decorative';

export interface CategoryCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  bookCount: number;
  iconName?: 'hadith' | 'fiqh' | 'seerah' | 'dua' | 'aqeedah' | 'tazkiyah';
  lang?: string;
  isRTL?: boolean;
  className?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  slug,
  title,
  description,
  bookCount,
  iconName = 'hadith',
  lang = 'bn',
  isRTL = false,
  className,
}) => {
  const getIcon = () => {
    switch (iconName) {
      case 'hadith':
        return <ScrollText className="w-6 h-6 text-primary" />;
      case 'fiqh':
        return <Compass className="w-6 h-6 text-primary" />;
      case 'seerah':
        return <Sparkles className="w-6 h-6 text-primary" />;
      case 'dua':
        return <Heart className="w-6 h-6 text-primary" />;
      case 'aqeedah':
        return <BookOpen className="w-6 h-6 text-primary" />;
      default:
        return <IslamicStarIcon className="w-6 h-6 text-accent-dark" />;
    }
  };

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <Link
      href={`/${lang}/categories/${slug}`}
      className={cn(
        'group relative flex flex-col justify-between p-6 rounded-2xl bg-surface border border-border/80 shadow-card hover:shadow-card-hover hover:border-accent/60 transition-all duration-300 overflow-hidden',
        className
      )}
    >
      {/* Decorative Top Accent Light */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl pointer-events-none group-hover:bg-accent/20 transition-colors" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-surface-muted flex items-center justify-center border border-accent/20 group-hover:scale-105 group-hover:bg-accent/15 transition-all">
            {getIcon()}
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface-muted text-text-muted border border-border/60 group-hover:border-accent/40 group-hover:text-primary transition-colors">
            {bookCount} {lang === 'bn' ? 'কিতাব' : lang === 'ar' ? 'كتاب' : 'Books'}
          </span>
        </div>

        <h3 className="text-xl font-bold font-bengali-heading text-primary dark:text-background group-hover:text-secondary transition-colors mb-2">
          {title}
        </h3>

        <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-border/50 flex items-center justify-between text-xs font-medium text-primary dark:text-accent">
        <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform inline-flex items-center gap-1.5">
          <span>{lang === 'bn' ? 'গ্রন্থাবলি দেখুন' : lang === 'ar' ? 'تصفح الكتب' : 'Explore Books'}</span>
          <ArrowIcon className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
};
