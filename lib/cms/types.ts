import { Translation } from '../mock-data';

export type CmsActivityType =
  | 'job_created' | 'job_updated' | 'job_published' | 'job_closed' | 'job_archived'
  | 'news_draft_created' | 'news_updated' | 'news_published' | 'news_unpublished'
  | 'application_submitted' | 'application_viewed' | 'application_status_changed' | 'cv_downloaded'
  | 'settings_updated'
  | 'admin_signin' | 'admin_signout';

export type CmsEntityType = 'job' | 'news' | 'application' | 'settings' | 'admin';

export interface CmsActivity {
  id: string;
  type: CmsActivityType;
  entityType: CmsEntityType;
  entityId: string;
  title: Translation;
  message: Translation;
  actor: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface CmsDashboardMetrics {
  totalJobs: number;
  activeJobs: number;
  newApplications: number;
  totalApplications: number;
  publishedNews: number;
  totalNews: number;
}

export interface CmsDatabaseUsageItem {
  surface: string;
  databaseRequired: boolean;
  notes?: string;
}

export type CmsDatabaseUsageMap = Record<string, CmsDatabaseUsageItem>;