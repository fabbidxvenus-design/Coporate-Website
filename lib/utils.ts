import Link, { LinkProps } from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatDateShort(date: Date | string): string {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatDateAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Hôm nay'
  if (diffDays === 1) return '1 ngày trước'
  return `${diffDays} ngày trước`
}

export function formatDateAgoEn(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 60) return `${diffMins} min ago`
  if (diffHours < 24) return `${diffHours} hours ago`
  if (diffDays === 1) return '1 day ago'
  return `${diffDays} days ago`
}

export function formatDateLocal(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function formatDateWithTime(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDateShortLocal(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function formatSalary(min?: number | null, max?: number | null): string {
  if (!min && !max) return 'Thương lượng'
  if (min && max) return `${min / 1000000}-${max / 1000000} Triệu`
  if (min) return `Từ ${min / 1000000} Triệu`
  return `Đến ${max! / 1000000} Triệu`
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function getEmploymentTypeStyle(type: string): string {
  const styles: Record<string, string> = {
    'Full-time': 'bg-blue-50 text-blue-700',
    'Part-time': 'bg-green-50 text-green-700',
    'Freelancer': 'bg-purple-50 text-purple-700',
    'Internship': 'bg-orange-50 text-orange-700',
    'Contract': 'bg-teal-50 text-teal-700',
  }
  return styles[type] || 'bg-gray-50 text-gray-700'
}

// Constants
export const EMPLOYMENT_TYPE_LABELS: Record<string, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  'freelancer': 'Freelancer',
  'internship': 'Internship',
  'contract': 'Contract',
}

export const LOCATION_LABELS: Record<string, string> = {
  'HN': 'Hà Nội',
  'HCM': 'Hồ Chí Minh',
  'DN': 'Đà Nẵng',
  'JP': 'Japan',
}

export const JOB_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  draft: { label: 'Nháp', color: 'bg-gray-100 text-gray-600' },
  review: { label: 'Chờ duyệt', color: 'bg-yellow-100 text-yellow-700' },
  published: { label: 'Đã đăng', color: 'bg-green-100 text-green-700' },
  closed: { label: 'Đã đóng', color: 'bg-red-100 text-red-700' },
  archived: { label: 'Lưu trữ', color: 'bg-gray-200 text-gray-500' },
}

export const NEWS_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  draft: { label: 'Nháp', color: 'bg-gray-100 text-gray-600' },
  review: { label: 'Chờ duyệt', color: 'bg-yellow-100 text-yellow-700' },
  published: { label: 'Đã đăng', color: 'bg-green-100 text-green-700' },
  archived: { label: 'Lưu trữ', color: 'bg-gray-200 text-gray-500' },
}

export const APPLICATION_STATUS_LABELS: Record<string, string> = {
  new: 'Mới',
  reviewing: 'Đang xem',
  shortlisted: 'Trúng tuyển',
  rejected: 'Từ chối',
  hired: 'Đã tuyển',
}

export const NEWS_CATEGORY_LABELS: Record<string, string> = {
  'company_events': 'Company Events',
  'awards': 'Awards',
  'tech_updates': 'Tech Updates',
  'nguoi_fabbi': 'Người Fabbi',
  'cac_hoat_dong': 'Các hoạt động',
  'giai_thuong': 'Giải thưởng',
}

export const PAGINATION_LIMIT = 20
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  JOBS: '/jobs',
  NEWS: '/news',
  APPLY: '/apply',
  LOGIN: '/login',
  ADMIN: '/admin',
  ADMIN_JOBS: '/admin/jobs',
  ADMIN_NEWS: '/admin/news',
  ADMIN_APPLICATIONS: '/admin/applications',
  ADMIN_SETTINGS: '/admin/settings',
} as const;