import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-sans font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

  const variants = {
    primary: 'bg-primary text-on-primary hover:bg-primary-container active:scale-[0.98]',
    secondary: 'bg-transparent text-primary border border-primary hover:bg-primary/5 active:scale-[0.98]',
    ghost: 'bg-transparent text-on-surface-variant hover:bg-surface-container-low active:scale-[0.98]',
    danger: 'bg-error text-on-error hover:bg-error/90 active:scale-[0.98]',
  };

  const sizes = {
    sm: 'px-4 py-2 rounded text-body-sm',
    md: 'px-6 py-3 rounded text-body-sm',
    lg: 'px-8 py-4 rounded text-body-md',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
        />
      ) : null}
      {children}
    </button>
  );
}