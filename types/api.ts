export type { JobStatus, ApplicationStatus, NewsStatus, EmploymentType } from './domain';
export type { JobSummary, JobDetail, NewsSummary, NewsArticle, Application, ApplicationDetail, SiteSetting, Profile, AdminUser, PaginatedResponse, DashboardMetrics } from './domain';

export type { ApiResponse } from '../lib/api-response';

export interface JobInput {
  title: string;
  slug: string;
  department?: string;
  location?: string;
  employmentType?: string;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  summary?: string;
  description: string;
  requirements?: string;
  benefits?: string;
  skills?: string[];
  status?: string;
}

export interface NewsInput {
  title: string;
  slug: string;
  excerpt?: string;
  body: string;
  coverImageUrl?: string;
  category?: string;
  tags?: string[];
  status?: string;
}

export interface ApplicationInput {
  jobId?: string;
  fullName: string;
  email: string;
  phone: string;
  portfolioUrl?: string;
  message?: string;
  cv: File;
}

export interface SettingsInput {
  settings: Record<string, unknown>;
}

export type StatusTransition = {
  from: string[];
  to: string;
};