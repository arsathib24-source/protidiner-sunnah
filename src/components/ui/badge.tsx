import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'accent' | 'primary' | 'secondary' | 'surface' | 'outline' | 'gold' | 'forest' | 'ivory';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'accent',
  size = 'md',
  children,
  ...props
}) => {
  const variants = {
    accent: 'bg-accent/15 text-primary border-accent/40 font-semibold dark:text-accent dark:border-accent/30',
    gold: 'bg-accent/15 text-primary border-accent/40 font-semibold dark:text-accent dark:border-accent/30',
    primary: 'bg-primary text-primary-foreground border-transparent shadow-subtle',
    forest: 'bg-primary text-primary-foreground border-transparent shadow-subtle',
    secondary: 'bg-secondary text-secondary-foreground border-transparent',
    surface: 'bg-surface text-foreground border-border shadow-subtle',
    ivory: 'bg-background text-primary border-border shadow-subtle',
    outline: 'border-primary/20 text-primary dark:text-background dark:border-border',
  };

  const sizes = {
    sm: 'text-[11px] px-2.5 py-0.5',
    md: 'text-xs px-3 py-1',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border tracking-wide transition-colors select-none font-medium',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
