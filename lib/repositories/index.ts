import { isPayloadDataMode, isMockDataMode } from '@/lib/config/data-source';
import { jobsRepository as dbJobsRepo } from '@/lib/db/repositories/jobs';
import { newsRepository as dbNewsRepo } from '@/lib/db/repositories/news';
import {
  payloadJobsRepository,
  payloadNewsRepository,
  payloadApplicationsRepository,
  payloadSettingsRepository,
  payloadAboutRepository,
} from '@/lib/payload/repositories';
import { applicationsRepository as dbApplicationsRepo } from '@/lib/db/repositories/applications';
import { settingsRepository as dbSettingsRepo } from '@/lib/db/repositories/settings';
import { aboutRepository as dbAboutRepo } from '@/lib/db/repositories/about';

export const jobsRepository = {
  findAllPublished: async (locale?: string) => {
    if (isPayloadDataMode()) return payloadJobsRepository.findAllPublished(locale);
    return dbJobsRepo.findAllPublished(locale);
  },
  findAll: async () => {
    if (isPayloadDataMode()) return payloadJobsRepository.findAll();
    return dbJobsRepo.findAll();
  },
  findById: async (id: string) => {
    if (isPayloadDataMode()) return payloadJobsRepository.findById(id);
    return dbJobsRepo.findById(id);
  },
  create: async (data: any) => {
    if (isPayloadDataMode()) return payloadJobsRepository.create(data);
    return dbJobsRepo.create(data);
  },
  update: async (id: string, data: any) => {
    if (isPayloadDataMode()) return payloadJobsRepository.update(id, data);
    return dbJobsRepo.update(id, data);
  },
  delete: async (id: string) => {
    if (isPayloadDataMode()) return payloadJobsRepository.delete(id);
    return dbJobsRepo.delete(id);
  },
};

export const newsRepository = {
  findAllPublished: async (locale?: string) => {
    if (isPayloadDataMode()) return payloadNewsRepository.findAllPublished(locale);
    return dbNewsRepo.findAllPublished(locale);
  },
  findBySlug: async (slug: string, locale?: string) => {
    if (isPayloadDataMode()) return payloadNewsRepository.findBySlug(slug, locale);
    return dbNewsRepo.findBySlug(slug, locale);
  },
  findById: async (id: string) => {
    if (isPayloadDataMode()) return payloadNewsRepository.findById(id);
    return dbNewsRepo.findById(id);
  },
  create: async (data: any) => {
    if (isPayloadDataMode()) return payloadNewsRepository.create(data);
    return dbNewsRepo.create(data);
  },
  update: async (id: string, data: any) => {
    if (isPayloadDataMode()) return payloadNewsRepository.update(id, data);
    return dbNewsRepo.update(id, data);
  },
  delete: async (id: string) => {
    if (isPayloadDataMode()) return payloadNewsRepository.delete(id);
    return dbNewsRepo.delete(id);
  },
  findAll: async () => {
    if (isPayloadDataMode()) return payloadNewsRepository.findAll();
    return dbNewsRepo.findAll();
  },
};

export const applicationsRepository = {
  findById: async (id: string) => {
    if (isPayloadDataMode()) return payloadApplicationsRepository.findById(id);
    return dbApplicationsRepo.findById(id);
  },
  findByJobId: async (jobId: string) => {
    if (isPayloadDataMode()) return payloadApplicationsRepository.findByJobId(jobId);
    return dbApplicationsRepo.findByJobId(jobId);
  },
  findAll: async (filters?: { status?: any; jobId?: string }) => {
    if (isPayloadDataMode()) return payloadApplicationsRepository.findAll(filters);
    return dbApplicationsRepo.findAll(filters);
  },
  create: async (data: any) => {
    if (isPayloadDataMode()) return payloadApplicationsRepository.create(data);
    return dbApplicationsRepo.create(data);
  },
  updateStatus: async (id: string, status: any) => {
    if (isPayloadDataMode()) return payloadApplicationsRepository.updateStatus(id, status);
    return dbApplicationsRepo.updateStatus(id, status);
  },
  countByJobId: async (jobId: string) => {
    if (isPayloadDataMode()) return payloadApplicationsRepository.countByJobId(jobId);
    return dbApplicationsRepo.countByJobId(jobId);
  },
};

export const settingsRepository = {
  get: async (key: string) => {
    if (isPayloadDataMode()) return payloadSettingsRepository.get(key);
    return dbSettingsRepo.get(key);
  },
  getAll: async () => {
    if (isPayloadDataMode()) return payloadSettingsRepository.getAll();
    return dbSettingsRepo.getAll();
  },
  set: async (key: string, value: string, type?: any) => {
    if (isPayloadDataMode()) return;
    return dbSettingsRepo.set(key, value, type);
  },
  delete: async (key: string) => {
    if (isPayloadDataMode()) return true;
    return dbSettingsRepo.delete(key);
  },
};

export const aboutRepository = {
  findByLocale: async (locale: string) => {
    if (isPayloadDataMode()) return payloadAboutRepository.findByLocale(locale);
    return dbAboutRepo.findByLocale(locale);
  },
};