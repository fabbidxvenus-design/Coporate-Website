/**
 * Payload applications repository.
 * Returns mock data when USE_MOCK_DATA=true (data-source mode 'mock').
 */

import { isMockDataMode } from '@/lib/config/data-source';
import type { PayloadApplicationDoc } from '../types';
import type { Application, ApplicationStatus } from '@/lib/db/types';

export const payloadApplicationsRepository = {
  findById: async (id: string): Promise<Application | null> => {
    if (isMockDataMode()) return null;

    const { initPayloadClient } = await import('../client');
    const client = await initPayloadClient();
    const config = (await import('../config')).getPayloadConfig();

    const doc = await client.findByID({
      collection: config.collections.applications,
      id,
      depth: 0,
    }).catch(() => null);

    if (!doc) return null;
    return doc as unknown as Application;
  },

  findByJobId: async (jobId: string): Promise<Application[]> => {
    if (isMockDataMode()) return [];

    const { initPayloadClient } = await import('../client');
    const client = await initPayloadClient();
    const config = (await import('../config')).getPayloadConfig();

    const { docs } = await client.find({
      collection: config.collections.applications,
      where: { job_id: { equals: jobId } },
      depth: 0,
    });

    return docs as unknown as Application[];
  },

  findAll: async (filters?: { status?: ApplicationStatus; jobId?: string }): Promise<Application[]> => {
    if (isMockDataMode()) return [];

    const { initPayloadClient } = await import('../client');
    const client = await initPayloadClient();
    const config = (await import('../config')).getPayloadConfig();

    const where: Record<string, unknown> = {};
    if (filters?.status) where.status = { equals: filters.status };
    if (filters?.jobId) where.job_id = { equals: filters.jobId };

    const { docs } = await client.find({
      collection: config.collections.applications,
      where,
      depth: 0,
    });

    return docs as unknown as Application[];
  },

  create: async (data: Omit<Application, 'id' | 'created_at' | 'updated_at'>): Promise<Application> => {
    // Mock mode: return a created mock object without CV fields
    if (isMockDataMode()) {
      return {
        id: crypto.randomUUID(),
        job_id: data.job_id,
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        portfolio_url: data.portfolio_url || null,
        message: data.message || null,
        cv_filename: null,
        cv_path: null,
        cv_mime_type: null,
        cv_size: null,
        status: data.status || 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }

    const { initPayloadClient } = await import('../client');
    const client = await initPayloadClient();
    const config = (await import('../config')).getPayloadConfig();

    const doc = await client.create({
      collection: config.collections.applications,
      data,
      depth: 0,
    });

    return doc as unknown as Application;
  },

  updateStatus: async (id: string, status: ApplicationStatus): Promise<boolean> => {
    if (isMockDataMode()) return true;

    const { initPayloadClient } = await import('../client');
    const client = await initPayloadClient();
    const config = (await import('../config')).getPayloadConfig();

    await client.update({
      collection: config.collections.applications,
      id,
      data: { status },
      depth: 0,
    });

    return true;
  },

  countByJobId: async (jobId: string): Promise<number> => {
    if (isMockDataMode()) return 0;

    const { initPayloadClient } = await import('../client');
    const client = await initPayloadClient();
    const config = (await import('../config')).getPayloadConfig();

    const result = await client.find({
      collection: config.collections.applications,
      where: { job_id: { equals: jobId } },
      depth: 0,
      limit: 0,
      pagination: false,
    });

    return result.totalDocs;
  },
};