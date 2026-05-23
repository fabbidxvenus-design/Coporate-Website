export type JobStatus = 'draft' | 'review' | 'published' | 'closed' | 'archived';
export type ApplicationStatus = 'new' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired';
export type NewsStatus = 'draft' | 'review' | 'published' | 'archived';
export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship';

export interface JobSummary {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType: EmploymentType;
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  summary: string;
  skills: string[];
  status: JobStatus;
  publishedAt?: string;
  createdAt: string;
}

export interface JobDetail extends JobSummary {
  description: string;
  requirements: string;
  benefits: string;
  createdBy: string;
  updatedBy: string;
  updatedAt: string;
  closedAt?: string;
}

export interface NewsSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl?: string;
  category?: string;
  tags: string[];
  status: NewsStatus;
  publishedAt?: string;
  createdAt: string;
}

export interface NewsArticle extends NewsSummary {
  body: string;
  authorId: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  jobId?: string;
  fullName: string;
  email: string;
  phone: string;
  portfolioUrl?: string;
  message?: string;
  cvFilePath: string;
  cvFileName: string;
  cvFileSize: number;
  cvMimeType: string;
  source: string;
  status: ApplicationStatus;
  submittedAt: string;
  updatedAt: string;
}

export interface ApplicationDetail extends Application {
  job?: JobSummary;
}

export interface SiteSetting {
  key: string;
  value: Record<string, unknown>;
  updatedAt: string;
}

export interface Profile {
  id: string;
  email: string;
  displayName?: string;
  role: 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  displayName?: string;
  role: 'admin';
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  total: number;
  pageSize: number;
}

export interface DashboardMetrics {
  openJobs: number;
  newApplications: number;
  publishedNews: number;
  applicationsByStatus: Record<ApplicationStatus, number>;
}