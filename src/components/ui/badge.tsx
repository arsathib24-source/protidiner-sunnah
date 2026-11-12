import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'forest' | 'ivory' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'gold',
  children,
  ...props
}) => {
  const variants = {
    gold: 'bg-islamic-gold/15 text-islamic-forest-dark border-islamic-gold/40 dark:text-islamic-gold',
    forest: 'bg-islamic-forest text-islamic-ivory border-transparent',
    ivory: 'bg-islamic-ivory text-islamic-forest border-islamic-ivory-dark',
    outline: 'border-islamic-forest/20 text-islamic-forest dark:text-islamic-ivory',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
