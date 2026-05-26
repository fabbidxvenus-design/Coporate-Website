import { strapiClient } from '../client';
import { isStrapiDataMode } from '../../config/data-source';
import { Application } from '../../db/types';
import type { StrapiApplication } from '../types';

export const applicationsRepository = {
  async findById(id: string): Promise<Application | null> {
    if (!isStrapiDataMode()) return null;
    const response = await strapiClient.get<{ data: StrapiApplication }>(`applications/${id}`);
    if (!response.data) return null;
    return mapToApplication(response.data);
  },

  async findByJobId(jobId: string): Promise<Application[]> {
    if (!isStrapiDataMode()) return [];
    const response = await strapiClient.get<{ data: StrapiApplication[] }>(
      'applications',
      { 'filters[job][documentId][$eq]': jobId }
    );
    return response.data.map(mapToApplication);
  },

  async findAll(filters?: { status?: string; jobId?: string }): Promise<Application[]> {
    if (!isStrapiDataMode()) return [];
    const params: Record<string, string> = {};
    if (filters?.status) params['filters[status][$eq]'] = filters.status;
    if (filters?.jobId) params['filters[job][documentId][$eq]'] = filters.jobId;

    const response = await strapiClient.get<{ data: StrapiApplication[] }>('applications', params);
    return response.data.map(mapToApplication);
  },

  async create(data: Omit<Application, 'id' | 'created_at' | 'updated_at'>): Promise<Application> {
    const response = await strapiClient.post<{ data: StrapiApplication }>('applications', {
      candidateName: data.full_name,
      candidateEmail: data.email,
      candidatePhone: data.phone,
      message: data.message || null,
      portfolioUrl: data.portfolio_url || null,
      cvFile: data.cv_path || null,
      status: 'pending',
      job: data.job_id,
    });
    return mapToApplication(response.data);
  },

  async updateStatus(id: string, status: string): Promise<boolean> {
    try {
      await strapiClient.put(`applications/${id}`, { status });
      return true;
    } catch {
      return false;
    }
  },

  async countByJobId(jobId: string): Promise<number> {
    if (!isStrapiDataMode()) return 0;
    const response = await strapiClient.get<{ meta: { pagination: { total: number } } }>(
      'applications',
      { 'filters[job][documentId][$eq]': jobId }
    );
    return response.meta?.pagination?.total || 0;
  },
};

function mapToApplication(item: StrapiApplication): Application {
  return {
    id: item.documentId,
    job_id: item.job?.documentId || '',
    full_name: item.candidateName,
    email: item.candidateEmail,
    phone: item.candidatePhone,
    portfolio_url: item.portfolioUrl || null,
    message: item.message || null,
    cv_filename: item.cvFile?.name || null,
    cv_path: item.cvFile?.url || null,
    cv_mime_type: item.cvFile ? 'application/pdf' : null,
    cv_size: item.cvFile?.formats?.thumbnail?.size || null,
    status: item.status as Application['status'],
    created_at: item.createdAt,
    updated_at: item.updatedAt,
  };
}