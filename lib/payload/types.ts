/**
 * Payload CMS type definitions.
 * These types model Payload's response shape for each collection.
 */

import type { JobStatus, ArticleStatus, ApplicationStatus } from '@/lib/db/types';
import type { AboutContent } from '@/lib/db/types';
import type { Translation } from '@/lib/mock-data';

// ---------------------------------------------------------------------------
// Raw Payload collection document shapes
// ---------------------------------------------------------------------------

export interface PayloadJobDoc {
  id: string;
  slug: string;
  title: Translation;
  department: Translation;
  location: Translation;
  employment_type: Translation;
  salary_range: Translation;
  skills: string[];
  description: Translation;
  requirements: Translation;
  benefits: Translation;
  status: JobStatus;
  published_at: string;
  image?: { url: string } | null;
  createdAt: string;
  updatedAt: string;
}

export interface PayloadNewsArticleDoc {
  id: string;
  slug: string;
  title: Translation;
  excerpt: Translation;
  body: Translation;
  cover_image: { url: string } | null;
  content_images?: { url: string }[];
  category: string;
  tags: string[];
  status: ArticleStatus;
  author: Translation;
  published_at: string;
  createdAt: string;
  updatedAt: string;
}

export interface PayloadApplicationDoc {
  id: string;
  job_id: string;
  full_name: string;
  email: string;
  phone: string;
  portfolio_url?: string;
  message?: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PayloadSiteSettingsDoc {
  id: string;
  companyName: Translation;
  slogan: Translation;
  founded: string;
  representative: {
    name: Translation;
    title: Translation;
  };
  headcount: string;
  contactEmail: string;
  contactPhone: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    linkedin: string;
    tiktok: string;
  };
  offices: Array<{
    name: Translation;
    address: Translation;
    phone: string;
  }>;
}

export interface PayloadAboutPageDoc {
  id: string;
  locale: string;
  heroTitle: Translation;
  heroSubtitle: Translation;
  heroImage?: { url: string } | null;
  visionTitle: Translation;
  visionContent: Translation;
  missionTitle: Translation;
  missionContent: Translation;
  valuesTitle: Translation;
  values: Array<{
    key: string;
    title: Translation;
    description: Translation;
  }>;
  teamTitle: string;
  teamMembers: Array<{
    name: Translation;
    role: Translation;
    imageUrl?: { url: string } | null;
  }>;
  stats: Array<{
    value: string;
    label: Translation;
  }>;
}