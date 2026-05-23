import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {icon && <span className="text-4xl mb-4">{icon}</span>}
      <h3 className="text-headline-sm font-semibold text-on-surface mb-2">{title}</h3>
      {description && (
        <p className="text-body-md text-on-surface-variant max-w-sm mb-6">{description}</p>
      )}
      {action}
    </div>
  );
}

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Đang tải...' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-body-sm text-on-surface-variant">{message}</p>
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  action?: ReactNode;
}

export function ErrorState({
  title = 'Đã xảy ra lỗi',
  message = 'Vui lòng thử lại sau.',
  action,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <span className="text-4xl mb-4">⚠️</span>
      <h3 className="text-headline-sm font-semibold text-on-surface mb-2">{title}</h3>
      <p className="text-body-md text-on-surface-variant max-w-sm mb-6">{message}</p>
      {action}
    </div>
  );
}