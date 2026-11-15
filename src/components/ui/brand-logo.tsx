'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { IslamicStarIcon } from './decorative';

export type LogoEmblemType = 'star' | 'book' | 'crescent' | 'minaret' | 'image';

export interface BrandLogoProps {
  locale?: string;
  title?: string;
  tagline?: string;
  logoType?: LogoEmblemType;
  logoImageUrl?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'header' | 'footer' | 'admin' | 'standalone';
  href?: string | null;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  locale = 'bn',
  title = 'প্রতিদিনের সুন্নাহ',
  tagline = 'রাসুলুল্লাহ ﷺ-এর আদর্শে প্রতিদিন',
  logoType = 'image',
  logoImageUrl = '/logo.png',
  showTagline = true,
  size = 'md',
  variant = 'header',
  href,
  className,
  onClick,
}) => {
  // Dimension settings preserving exact original colors and proportions
  const sizeClasses = {
    sm: {
      box: 'w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl',
      icon: 'w-5 h-5',
      title: 'text-lg sm:text-xl',
      tagline: 'text-[11px]',
      gap: 'gap-3',
    },
    md: {
      box: 'w-12 h-12 rounded-2xl',
      icon: 'w-6 h-6',
      title: 'text-xl sm:text-2xl',
      tagline: 'text-xs',
      gap: 'gap-3.5',
    },
    lg: {
      box: 'w-16 h-16 rounded-3xl',
      icon: 'w-8 h-8',
      title: 'text-2xl sm:text-3xl',
      tagline: 'text-sm',
      gap: 'gap-4',
    },
  }[size];

  // Color variants matching the design system
  const titleColorClass = {
    header: 'text-primary dark:text-background group-hover:text-secondary transition-colors',
    footer: 'text-background',
    admin: 'text-background',
    standalone: 'text-primary dark:text-background',
  }[variant];

  const taglineColorClass = {
    header: 'text-accent-dark font-medium -mt-0.5',
    footer: 'text-background/70 font-medium -mt-0.5',
    admin: 'text-accent font-medium -mt-0.5',
    standalone: 'text-accent-dark font-medium -mt-0.5',
  }[variant];

  // Render emblem icon based on dynamic type
  const renderEmblem = () => {
    if (logoType === 'image' || !logoType) {
      const src = logoImageUrl || '/logo.png';
      return (
        <div className="relative w-full h-full p-0.5 flex items-center justify-center">
          <Image
            src={src}
            alt={title}
            width={64}
            height={64}
            className="w-full h-full object-contain"
            priority
          />
        </div>
      );
    }

    if (logoType === 'book') {
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn('text-accent', sizeClasses.icon)}
          aria-hidden="true"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          <path d="M6 8h2" />
          <path d="M16 8h2" />
        </svg>
      );
    }

    if (logoType === 'crescent') {
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={cn('text-accent', sizeClasses.icon)}
          aria-hidden="true"
        >
          <path d="M12 2a10 10 0 1 0 10 10 1 1 0 0 0-1.07-1 8 8 0 1 1-8.93-8.93A1 1 0 0 0 12 2z" />
          <polygon points="17 4 18.5 7.5 22 8 19.5 10.5 20 14 17 12 14 14 14.5 10.5 12 8 15.5 7.5 17 4" />
        </svg>
      );
    }

    if (logoType === 'minaret') {
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn('text-accent', sizeClasses.icon)}
          aria-hidden="true"
        >
          <path d="M12 2v3" />
          <path d="M12 5c-3 0-5 2.5-5 6v11h10V11c0-3.5-2-6-5-6z" />
          <path d="M9 16c0-1.66 1.34-3 3-3s3 1.34 3 3v6H9v-6z" />
        </svg>
      );
    }

    // Default: Elegant Islamic 8-Point Geometric Star Rosette
    return <IslamicStarIcon className={cn('text-accent', sizeClasses.icon)} />;
  };

  const content = (
    <div
      className={cn(
        'flex items-center group cursor-pointer select-none',
        sizeClasses.gap,
        className
      )}
      onClick={onClick}
    >
      {/* Emblem Box */}
      <div
        className={cn(
          sizeClasses.box,
          logoType === 'image' || !logoType
            ? 'bg-white shadow-subtle border border-accent/40 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 shrink-0'
            : 'bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-accent shadow-subtle border border-accent/40 transition-transform group-hover:scale-105 shrink-0'
        )}
      >
        {renderEmblem()}
      </div>

      {/* Typography: Title & Tagline */}
      <div className="flex flex-col">
        <span
          className={cn(
            'font-bold font-bengali-heading tracking-tight leading-tight',
            sizeClasses.title,
            titleColorClass
          )}
        >
          {title}
        </span>
        {showTagline && tagline && (
          <span className={cn('font-medium leading-none', sizeClasses.tagline, taglineColorClass)}>
            {tagline}
          </span>
        )}
      </div>
    </div>
  );

  // If href is explicitly null, render without link
  if (href === null) {
    return content;
  }

  // Default link destination
  const targetHref = href || `/${locale}`;

  return (
    <Link href={targetHref} className="inline-flex">
      {content}
    </Link>
  );
};
