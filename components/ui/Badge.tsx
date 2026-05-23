import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  children: ReactNode;
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-surface-container text-on-surface-variant',
    success: 'bg-secondary-container text-on-secondary-container',
    warning: 'bg-tertiary-container text-on-tertiary-container',
    error: 'bg-error-container text-on-error-container',
    info: 'bg-primary-fixed text-on-primary-fixed',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded text-label-sm font-semibold',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}