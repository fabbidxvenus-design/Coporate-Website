export const JOB_STATUS = {
  DRAFT: 'draft',
  REVIEW: 'review',
  PUBLISHED: 'published',
  CLOSED: 'closed',
  ARCHIVED: 'archived',
} as const;

export const APPLICATION_STATUS = {
  NEW: 'new',
  REVIEWING: 'reviewing',
  SHORTLISTED: 'shortlisted',
  REJECTED: 'rejected',
  HIRED: 'hired',
} as const;

export const NEWS_STATUS = {
  DRAFT: 'draft',
  REVIEW: 'review',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;

export const EMPLOYMENT_TYPES = [
  'full-time',
  'part-time',
  'contract',
  'internship',
] as const;

export const DEPARTMENTS = [
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Sales',
  'Operations',
  'HR',
  'Finance',
] as const;

export const LOCATIONS = [
  'Ho Chi Minh City',
  'Hanoi',
  'Da Nang',
  'Remote',
  'Hybrid',
] as const;