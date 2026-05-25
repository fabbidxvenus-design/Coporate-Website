import { CmsActivity, CmsDashboardMetrics } from './types';
import { cmsActivities } from './mock-data';
import { jobs, newsArticles } from '../mock-data';

/**
 * Derived helper to compute metrics from static or database records
 */
export function getCmsDashboardMetrics(): CmsDashboardMetrics {
  const isMock = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' || process.env.USE_MOCK_DATA === 'true';

  if (isMock) {
    return {
      totalJobs: jobs.length,
      activeJobs: jobs.filter(j => j.status === 'published').length,
      newApplications: 5,
      totalApplications: 12,
      publishedNews: newsArticles.filter(n => n.status === 'published').length,
      totalNews: newsArticles.length
    };
  }

  // Fallback or database implementation path (to be expanded in later TIPs)
  return {
    totalJobs: jobs.length,
    activeJobs: jobs.filter(j => j.status === 'published').length,
    newApplications: 0,
    totalApplications: 0,
    publishedNews: newsArticles.filter(n => n.status === 'published').length,
    totalNews: newsArticles.length
  };
}

/**
 * Derived helper to fetch activities
 */
export function getCmsActivities(): CmsActivity[] {
  return cmsActivities;
}