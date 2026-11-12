import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'gold' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none';

    const variants = {
      primary:
        'bg-primary hover:bg-primary-light text-primary-foreground shadow-subtle hover:shadow-card focus:ring-primary',
      secondary:
        'bg-secondary hover:bg-secondary-light text-secondary-foreground shadow-subtle hover:shadow-card focus:ring-secondary',
      accent:
        'bg-accent hover:bg-accent-light text-accent-foreground font-semibold shadow-gold hover:brightness-105 focus:ring-accent',
      gold:
        'bg-accent hover:bg-accent-light text-accent-foreground font-semibold shadow-gold hover:brightness-105 focus:ring-accent',
      outline:
        'border border-primary/25 hover:border-primary hover:bg-primary/5 text-primary dark:text-background focus:ring-primary',
      ghost:
        'hover:bg-primary/10 text-primary dark:text-background focus:ring-primary',
    };

    const sizes = {
      sm: 'text-xs px-3.5 py-1.5 h-8 gap-1.5 rounded-lg',
      md: 'text-sm px-5 py-2.5 h-11 gap-2',
      lg: 'text-base px-7 py-3.5 h-13 gap-2.5 rounded-2xl',
      icon: 'h-11 w-11 p-0 rounded-xl',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
