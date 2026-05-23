import type { JobStatus, ApplicationStatus, NewsStatus } from '@/types/domain';
import { cn } from '@/lib/utils';

type Status = JobStatus | ApplicationStatus | NewsStatus | string;

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  // Job status
  draft: { label: 'Nháp', className: 'bg-surface-container text-on-surface-variant' },
  review: { label: 'Đang xem xét', className: 'bg-tertiary-container text-on-tertiary-container' },
  published: { label: 'Đã đăng', className: 'bg-secondary-container text-on-secondary-container' },
  closed: { label: 'Đã đóng', className: 'bg-surface-container-high text-on-surface-variant' },
  archived: { label: 'Lưu trữ', className: 'bg-surface-container text-outline' },
  // Application status
  new: { label: 'Mới', className: 'bg-primary-fixed text-on-primary-fixed' },
  reviewing: { label: 'Đang xem xét', className: 'bg-tertiary-container text-on-tertiary-container' },
  shortlisted: { label: 'Trong danh sách', className: 'bg-secondary-container text-on-secondary-container' },
  rejected: { label: 'Từ chối', className: 'bg-error-container text-on-error-container' },
  hired: { label: 'Đã tuyển', className: 'bg-secondary-container text-on-secondary-container' },
};

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? { label: status, className: 'bg-surface-container text-on-surface-variant' };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded text-label-sm font-semibold',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}