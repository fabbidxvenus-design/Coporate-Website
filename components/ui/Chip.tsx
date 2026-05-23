import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md';
  children: ReactNode;
}

export function Chip({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}: ChipProps) {
  const variants = {
    default: 'bg-surface-container text-on-surface-variant',
    primary: 'bg-primary-fixed-dim text-primary',
    secondary: 'bg-secondary-container text-on-secondary-container',
    outline: 'bg-transparent border border-outline text-on-surface-variant',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-label-sm',
    md: 'px-3 py-1 text-label-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-semibold',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}