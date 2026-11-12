import React from 'react';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, helperText, leftIcon, rightIcon, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 rtl:left-auto rtl:right-3.5 text-text-muted pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              'w-full h-11 px-4 text-sm rounded-xl bg-surface border border-border text-foreground transition-all duration-200',
              'placeholder:text-text-muted/60',
              'focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              leftIcon && 'ps-11',
              rightIcon && 'pe-11',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-200',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 rtl:right-auto rtl:left-3.5 text-text-muted">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-text-muted">{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export interface SearchInputProps extends Omit<InputProps, 'leftIcon' | 'rightIcon'> {
  onClear?: () => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onClear, onChange, ...props }, ref) => {
    const hasValue = Boolean(value);

    return (
      <div className="relative w-full">
        <Search className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-accent-dark pointer-events-none" />
        <input
          ref={ref}
          type="search"
          value={value}
          onChange={onChange}
          className={cn(
            'w-full h-12 ps-11 pe-10 text-sm rounded-2xl bg-surface border border-border/80 text-foreground shadow-subtle transition-all duration-200',
            'placeholder:text-text-muted/70',
            'focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 focus:shadow-card',
            className
          )}
          {...props}
        />
        {hasValue && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3.5 rtl:right-auto rtl:left-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-text-muted hover:text-foreground hover:bg-surface-muted transition-colors"
            aria-label="Clear search query"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }
);
SearchInput.displayName = 'SearchInput';
