/**
 * Payload jobs repository.
 * Returns mock data when USE_MOCK_DATA=true (data-source mode 'mock').
 */

import { isMockDataMode } from '@/lib/config/data-source';
import type { PayloadJobDoc } from '../types';
import type { Job, JobFilter, PaginatedResult } from '@/lib/db/types';
import { jobs as mockJobs, getTranslation } from '@/lib/mock-data';
import type { Translation } from '@/lib/mock-data';

function payloadJobToDb(payloadJob: PayloadJobDoc, locale: string): Job {
  const localeKey = locale as keyof Translation;
  return {
    id: payloadJob.id,
    slug: payloadJob.slug,
    title: payloadJob.title[localeKey] || payloadJob.title.vi,
    description: payloadJob.description[localeKey] || payloadJob.description.vi,
    requirements: payloadJob.requirements[localeKey] || payloadJob.requirements.vi,
    benefits: payloadJob.benefits[localeKey] || payloadJob.benefits.vi,
    location: payloadJob.location[localeKey] || payloadJob.location.vi,
    department: payloadJob.department[localeKey] || payloadJob.department.vi,
    employment_type: mapEmploymentType(payloadJob.employment_type[localeKey] || payloadJob.employment_type.vi),
    skills: payloadJob.skills,
    tags: payloadJob.skills,
    salary_min: parseSalaryMin(payloadJob.salary_range[localeKey] || payloadJob.salary_range.vi),
    salary_max: parseSalaryMax(payloadJob.salary_range[localeKey] || payloadJob.salary_range.vi),
    currency: 'VND',
    status: payloadJob.status,
    views: 0,
    published_at: payloadJob.published_at,
    created_at: payloadJob.createdAt,
    updated_at: payloadJob.updatedAt,
    summary: (payloadJob.description[localeKey] || payloadJob.description.vi).split('\n\n')[0],
    closed_at: null,
    created_by: null,
    updated_by: null,
    image: payloadJob.image?.url || null,
  };
}

function mapEmploymentType(raw: string): Job['employment_type'] {
  const lower = raw.toLowerCase();
  if (lower.includes('part')) return 'part-time';
  if (lower.includes('contract')) return 'contract';
  if (lower.includes('intern')) return 'internship';
  return 'full-time';
}

function parseSalaryMin(range: string): number | null {
  const match = range.match(/([\d.]+)/);
  return match ? Number(match[1].replace(/\./g, '')) : null;
}

function parseSalaryMax(range: string): number | null {
  const match = range.match(/\d+.*?-\s*([\d.]+)/);
  return match ? Number(match[1].replace(/\./g, '')) : null;
}

export const payloadJobsRepository = {
  findAllPublished: async (locale = 'vi'): Promise<Job[]> => {
    if (isMockDataMode()) {
      return mockJobs
        .filter(j => j.status === 'published')
        .map(j => ({
          id: j.id,
          slug: j.slug,
          title: getTranslation(j.title, locale),
          description: getTranslation(j.description, locale),
          requirements: getTranslation(j.requirements, locale),
          benefits: getTranslation(j.benefits, locale),
          location: getTranslation(j.location, locale),
          department: getTranslation(j.department, locale),
          employment_type: 'full-time',
          skills: j.skills,
          tags: j.skills,
          salary_min: parseSalaryMin(getTranslation(j.salary_range, locale)),
          salary_max: parseSalaryMax(getTranslation(j.salary_range, locale)),
          currency: 'VND',
          status: j.status,
          views: 0,
          published_at: j.published_at,
          created_at: j.published_at,
          updated_at: j.published_at,
          summary: getTranslation(j.description, locale).split('\n\n')[0],
          closed_at: null,
          created_by: null,
          updated_by: null,
          image: j.image || null,
        }));
    }

    const { initPayloadClient } = await import('../client');
    const client = await initPayloadClient();
    const config = (await import('../config')).getPayloadConfig();

    const { docs } = await client.find({
      collection: config.collections.jobs,
      where: { status: { equals: 'published' } },
      depth: 0,
    });

    return (docs as PayloadJobDoc[]).map(d => payloadJobToDb(d, locale));
  },

  findAll: async (): Promise<Job[]> => {
    if (isMockDataMode()) return [];

    const { initPayloadClient } = await import('../client');
    const client = await initPayloadClient();
    const config = (await import('../config')).getPayloadConfig();

    const { docs } = await client.find({
      collection: config.collections.jobs,
      depth: 0,
    });

    return (docs as PayloadJobDoc[]).map(d => payloadJobToDb(d, 'vi'));
  },

  findById: async (id: string): Promise<Job | null> => {
    if (isMockDataMode()) return null;

    const { initPayloadClient } = await import('../client');
    const client = await initPayloadClient();
    const config = (await import('../config')).getPayloadConfig();

    const doc = await client.findByID({
      collection: config.collections.jobs,
      id,
      depth: 0,
    }).catch(() => null);

    if (!doc) return null;
    return payloadJobToDb(doc as PayloadJobDoc, 'vi');
  },

  create: async (data: Omit<Job, 'id' | 'created_at' | 'updated_at'>): Promise<Job> => {
    if (isMockDataMode()) {
      return { ...data, id: crypto.randomUUID(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as Job;
    }

    const { initPayloadClient } = await import('../client');
    const client = await initPayloadClient();
    const config = (await import('../config')).getPayloadConfig();

    const doc = await client.create({
      collection: config.collections.jobs,
      data,
      depth: 0,
    });

    return doc as unknown as Job;
  },

  update: async (id: string, data: Partial<Job>): Promise<Job> => {
    if (isMockDataMode()) {
      return { ...data, id } as Job;
    }

    const { initPayloadClient } = await import('../client');
    const client = await initPayloadClient();
    const config = (await import('../config')).getPayloadConfig();

    const doc = await client.update({
      collection: config.collections.jobs,
      id,
      data,
      depth: 0,
    });

    return doc as unknown as Job;
  },

  delete: async (id: string): Promise<void> => {
    if (isMockDataMode()) return;

    const { initPayloadClient } = await import('../client');
    const client = await initPayloadClient();
    const config = (await import('../config')).getPayloadConfig();

    await client.delete({
      collection: config.collections.jobs,
      id,
    });
  },
};