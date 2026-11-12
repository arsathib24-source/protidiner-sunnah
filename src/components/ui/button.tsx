import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';

    const variants = {
      primary:
        'bg-islamic-forest hover:bg-islamic-forest-light text-islamic-ivory shadow-islamic focus:ring-islamic-forest',
      secondary:
        'bg-islamic-deep hover:bg-islamic-deep-light text-islamic-ivory shadow-islamic focus:ring-islamic-deep',
      gold:
        'bg-islamic-gold hover:bg-islamic-gold-light text-islamic-forest font-semibold shadow-gold-glow focus:ring-islamic-gold',
      outline:
        'border border-islamic-forest/30 hover:border-islamic-forest hover:bg-islamic-forest/5 text-islamic-forest dark:text-islamic-ivory focus:ring-islamic-forest',
      ghost:
        'hover:bg-islamic-forest/10 text-islamic-forest dark:text-islamic-ivory focus:ring-islamic-forest',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 h-8 gap-1.5',
      md: 'text-sm px-4 py-2.5 h-10 gap-2',
      lg: 'text-base px-6 py-3.5 h-12 gap-2.5',
      icon: 'h-10 w-10 p-0',
    };

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
