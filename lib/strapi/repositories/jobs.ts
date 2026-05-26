import { strapiClient } from '../client';
import { transformJob } from '../transformers';
import { isStrapiDataMode } from '../../config/data-source';
import { Job } from '../../db/types';

export const jobsRepository = {
  async findAllPublished(locale: string = 'vi'): Promise<Job[]> {
    if (!isStrapiDataMode()) return [];
    const response = await strapiClient.get<{ data: any[] }>('jobs', {
      'filters[status][$eq]': 'published',
      'locale': locale,
    });
    return response.data.map(transformJob).filter(Boolean) as Job[];
  },

  async findAll(): Promise<Job[]> {
    if (!isStrapiDataMode()) return [];
    const response = await strapiClient.get<{ data: any[] }>('jobs');
    return response.data.map(transformJob).filter(Boolean) as Job[];
  },

  async findById(id: string): Promise<Job | null> {
    if (!isStrapiDataMode()) return null;
    const response = await strapiClient.get<{ data: any }>(`jobs/${id}`);
    const result = transformJob(response.data);
    return result as Job | null;
  },

  async create(data: Partial<Job>): Promise<Job> {
    const response = await strapiClient.post<{ data: any }>('jobs', data);
    return response.data as Job;
  },

  async update(id: string, data: Partial<Job>): Promise<boolean> {
    try {
      await strapiClient.put(`jobs/${id}`, data);
      return true;
    } catch {
      return false;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      await strapiClient.delete(`jobs/${id}`);
      return true;
    } catch {
      return false;
    }
  },
};