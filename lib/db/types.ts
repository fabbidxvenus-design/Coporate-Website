
export type JobStatus = 'draft' | 'review' | 'published' | 'closed' | 'archived';
export type ArticleStatus = 'draft' | 'published';
export type ApplicationStatus = 'pending' | 'reviewing' | 'interview' | 'offer' | 'rejected' | 'withdrawn';
export type SessionStatus = 'active' | 'expired' | 'revoked';

export interface Job {
  id: string;
  title: string;
  slug: string;
  description: string;
  requirements: string;
  benefits: string;
  salary_min: number | null;
  salary_max: number | null;
  location: string;
  employment_type: 'full-time' | 'part-time' | 'contract' | 'internship' | null;
  skills: string[];
  tags: string[];
  status: JobStatus;
  views: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  department: string | null;
  currency: string;
  summary: string | null;
  closed_at: string | null;
  created_by: string | null;
  updated_by: string | null;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  thumbnail_url: string | null;
  cover_image_url?: string | null; // Compatibility
  author_name: string;
  author_role: string | null;
  tags: string[];
  category?: string | null; // Compatibility
  status: ArticleStatus;
  views: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface Application {
  id: string;
  job_id: string;
  full_name: string;
  email: string;
  phone: string;
  portfolio_url?: string | null;
  message?: string | null;
  cv_filename: string | null;
  cv_path: string | null;
  cv_mime_type: string | null;
  cv_size: number | null;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  type: 'string' | 'number' | 'boolean' | 'json';
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  role: 'admin' | 'editor';
  created_at: string;
  updated_at: string;
}

export interface AdminSession {
  id: string;
  user_id: string;
  token: string;
  token_hash: string;
  ip_address: string | null;
  user_agent: string | null;
  expires_at: string;
  created_at: string;
}

export interface AboutContent {
  id: string;
  locale: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image_url: string | null;
  mission_title: string;
  mission_content: string;
  vision_title: string;
  vision_content: string;
  values_title: string;
  values: ValueItem[];
  team_title: string;
  team_members: TeamMember[];
  stats: StatItem[];
  updated_at: string;
}

export interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image_url: string | null;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  offset?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface JobFilter {
  status?: JobStatus;
  search?: string;
  location?: string;
  employment_type?: string;
  tags?: string[];
}

export interface NewsFilter {
  status?: ArticleStatus;
  search?: string;
  tags?: string[];
}