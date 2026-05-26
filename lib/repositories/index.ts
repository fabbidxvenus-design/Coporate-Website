import { isStrapiDataMode, isSqliteDataMode } from '@/lib/config/data-source';
import { jobsRepository as dbJobsRepo } from '@/lib/db/repositories/jobs';
import { newsRepository as dbNewsRepo } from '@/lib/db/repositories/news';
import { jobsRepository as strapiJobsRepo } from '@/lib/strapi/repositories';
import { newsRepository as strapiNewsRepo } from '@/lib/strapi/repositories';

export const jobsRepository = {
  findAllPublished: async (locale?: string) => {
    if (isStrapiDataMode()) return strapiJobsRepo.findAllPublished(locale);
    return dbJobsRepo.findAllPublished(locale);
  },
  findAll: async () => {
    if (isStrapiDataMode()) return [];
    return dbJobsRepo.findAll();
  },
  findById: async (id: string) => {
    if (isStrapiDataMode()) return strapiJobsRepo.findById(id);
    return dbJobsRepo.findById(id);
  },
  create: async (data: any) => {
    if (isStrapiDataMode()) return strapiJobsRepo.create(data);
    return dbJobsRepo.create(data);
  },
  update: async (id: string, data: any) => {
    if (isStrapiDataMode()) return strapiJobsRepo.update(id, data);
    return dbJobsRepo.update(id, data);
  },
  delete: async (id: string) => {
    if (isStrapiDataMode()) return strapiJobsRepo.delete(id);
    return dbJobsRepo.delete(id);
  },
};

export const newsRepository = {
  findAllPublished: async (locale?: string) => {
    if (isStrapiDataMode()) return strapiNewsRepo.findAllPublished(locale);
    return dbNewsRepo.findAllPublished(locale);
  },
  findBySlug: async (slug: string, locale?: string) => {
    if (isStrapiDataMode()) return strapiNewsRepo.findBySlug(slug, locale);
    return dbNewsRepo.findBySlug(slug, locale);
  },
  findById: async (id: string) => {
    if (isStrapiDataMode()) return null;
    return dbNewsRepo.findById(id);
  },
  create: async (data: any) => {
    if (isStrapiDataMode()) throw new Error('Create not yet implemented for Strapi mode');
    return dbNewsRepo.create(data);
  },
  update: async (id: string, data: any) => {
    if (isStrapiDataMode()) throw new Error('Update not yet implemented for Strapi mode');
    return dbNewsRepo.update(id, data);
  },
  delete: async (id: string) => {
    if (isStrapiDataMode()) throw new Error('Delete not yet implemented for Strapi mode');
    return dbNewsRepo.delete(id);
  },
};