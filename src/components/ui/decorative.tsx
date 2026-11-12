import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from './badge';

// Elegant Islamic 8-Point Geometric Star Rosette
export const IslamicStarIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn('text-accent', className)}
    aria-hidden="true"
  >
    <path d="M12 0l2.8 5.7 6.4-1.2-2.1 6.1 5.9 2.5-4.8 4.3 2.9 5.8-6.3-1.6L12 24l-4.8-2.4-6.3 1.6 2.9-5.8L0 13.1l5.9-2.5-2.1-6.1 6.4 1.2L12 0z" />
  </svg>
);

// Decorative Arabesque Divider with Central Rosette
export interface ArabesqueDividerProps {
  className?: string;
  variant?: 'gold' | 'subtle';
}

export const ArabesqueDivider: React.FC<ArabesqueDividerProps> = ({
  className,
  variant = 'gold',
}) => {
  return (
    <div className={cn('flex items-center justify-center gap-3 w-full my-6', className)}>
      <div
        className={cn(
          'flex-1 h-px bg-gradient-to-r from-transparent',
          variant === 'gold' ? 'to-accent/60' : 'to-border'
        )}
      />
      <div className="flex items-center gap-1.5 px-2">
        <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
        <IslamicStarIcon className="w-4 h-4 text-accent" />
        <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
      </div>
      <div
        className={cn(
          'flex-1 h-px bg-gradient-to-l from-transparent',
          variant === 'gold' ? 'to-accent/60' : 'to-border'
        )}
      />
    </div>
  );
};

// Reusable Section Header Component
export interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: 'accent' | 'primary' | 'secondary' | 'surface' | 'outline';
  title: string;
  subtitle?: string;
  align?: 'center' | 'left' | 'right';
  className?: string;
  children?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeVariant = 'accent',
  title,
  subtitle,
  align = 'center',
  className,
  children,
}) => {
  const alignments = {
    center: 'text-center items-center',
    left: 'text-left rtl:text-right items-start',
    right: 'text-right rtl:text-left items-end',
  };

  return (
    <div className={cn('flex flex-col mb-10 max-w-3xl mx-auto', alignments[align], className)}>
      {badge && (
        <Badge variant={badgeVariant} className="mb-3.5 shadow-subtle">
          <IslamicStarIcon className="w-3 h-3 text-accent-dark" />
          <span>{badge}</span>
        </Badge>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-bengali-heading text-primary dark:text-background tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-text-muted mt-2.5 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
};
