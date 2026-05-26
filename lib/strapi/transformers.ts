import type { Job } from '@/lib/db/types';

export const transformJob = (job: any): Partial<Job> | null => {
  if (job.status !== 'published') return null;
  return {
    id: job.documentId || job.id,
    title: job.title,
    slug: job.slug,
    description: job.description || '',
    requirements: job.requirements || '',
    benefits: job.benefits || '',
    salary_min: null,
    salary_max: null,
    location: job.location || '',
    employment_type: job.employmentType || null,
    skills: job.skills || [],
    tags: job.skills || [],
    status: job.status,
    views: 0,
    created_at: job.createdAt || new Date().toISOString(),
    updated_at: job.updatedAt || new Date().toISOString(),
    published_at: job.publishedAt || null,
    department: job.category || null,
    currency: 'VND',
    summary: job.description || '',
    closed_at: job.expiresAt || null,
    created_by: null,
    updated_by: null,
    image: null,
  };
};
