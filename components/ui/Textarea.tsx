import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-label-md text-on-surface mb-2"
          >
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={cn(
            'w-full px-4 py-3 bg-white border rounded text-body-md text-on-surface placeholder:text-outline resize-y min-h-[120px]',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
            error ? 'border-error focus-visible:ring-error focus-visible:border-error' : 'border-outline-variant focus-visible:border-primary',
            'transition-all',
            className
          )}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-body-sm text-error">{error}</p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-body-sm text-on-surface-variant">{hint}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';