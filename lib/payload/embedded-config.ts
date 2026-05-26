// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Payload CMS embedded configuration.
 * Mounted as a Next.js route group — accessible at /admin.
 *
 * Payload v3 auto-detects DATABASE_URL from process.env.DATABASE_URL
 * for its PostgreSQL adapter. No manual database config needed.
 */

import { buildConfig } from 'payload';

// Custom Job collection definition
const JobsCollection = {
  slug: 'jobs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'published_at'],
    description: 'Job postings for the careers site',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'department', type: 'text' },
    { name: 'location', type: 'text' },
    { name: 'employment_type', type: 'text' },
    { name: 'salary_range', type: 'text' },
    { name: 'skills', type: 'text', hasMany: true },
    { name: 'description', type: 'textarea' },
    { name: 'requirements', type: 'textarea' },
    { name: 'benefits', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      options: ['draft', 'review', 'published', 'closed', 'archived'],
      defaultValue: 'draft',
      required: true,
    },
    { name: 'published_at', type: 'date' },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
};

// Custom Articles collection definition
const ArticlesCollection = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'published_at'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'excerpt', type: 'textarea' },
    { name: 'body', type: 'textarea' },
    { name: 'cover_image', type: 'upload', relationTo: 'media' },
    { name: 'category', type: 'text' },
    { name: 'tags', type: 'text', hasMany: true },
    {
      name: 'status',
      type: 'select',
      options: ['draft', 'published'],
      defaultValue: 'draft',
    },
    { name: 'author', type: 'text' },
    { name: 'published_at', type: 'date' },
  ],
};

// Custom Applications collection
const ApplicationsCollection = {
  slug: 'applications',
  admin: {
    useAsTitle: 'full_name',
    defaultColumns: ['full_name', 'email', 'job_id', 'status', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    { name: 'job_id', type: 'text', required: true },
    { name: 'full_name', type: 'text', required: true },
    { name: 'email', type: 'text', required: true },
    { name: 'phone', type: 'text' },
    { name: 'portfolio_url', type: 'text' },
    { name: 'message', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      options: ['pending', 'reviewing', 'interview', 'offer', 'rejected', 'withdrawn'],
      defaultValue: 'pending',
    },
  ],
};

// Custom Media collection
const MediaCollection = {
  slug: 'media',
  admin: {
    listSearchableFields: ['filename'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  upload: {
    limits: {
      maxFileSize: 10_000_000, // 10MB
      maxImageWidth: 4096,
      maxImageHeight: 4096,
    },
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300 },
      { name: 'og', width: 1200, height: 630 },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
};

// Custom Site Settings (singleton)
const SiteSettingsCollection = {
  slug: 'site-settings',
  admin: {
    description: 'Global site settings — company info, contact, social links',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    { name: 'companyName', type: 'text' },
    { name: 'slogan', type: 'text' },
    { name: 'founded', type: 'text' },
    { name: 'contactEmail', type: 'text' },
    { name: 'contactPhone', type: 'text' },
    { name: 'headcount', type: 'text' },
    { name: 'socialLinks', type: 'json' },
    { name: 'offices', type: 'json' },
  ],
};

// Custom About Pages
const AboutPagesCollection = {
  slug: 'about-pages',
  admin: {
    useAsTitle: 'heroTitle',
    defaultColumns: ['heroTitle', 'locale'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    { name: 'heroTitle', type: 'text' },
    { name: 'heroSubtitle', type: 'text' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'visionTitle', type: 'text' },
    { name: 'visionContent', type: 'textarea' },
    { name: 'missionTitle', type: 'text' },
    { name: 'missionContent', type: 'textarea' },
    { name: 'valuesTitle', type: 'text' },
    { name: 'values', type: 'json' },
    { name: 'teamTitle', type: 'text' },
    { name: 'teamMembers', type: 'json' },
    { name: 'stats', type: 'json' },
  ],
};

export const payloadConfig = buildConfig({
  // Payload v3 reads DATABASE_URL automatically from process.env for PostgreSQL adapter
  secret: process.env.PAYLOAD_SECRET ?? '',
  url: process.env.PAYLOAD_URL ?? 'http://localhost:3000',
  collections: [
    JobsCollection,
    ArticlesCollection,
    ApplicationsCollection,
    MediaCollection,
    SiteSettingsCollection,
    AboutPagesCollection,
  ],
  localization: {
    locales: ['vi', 'ja'],
    defaultLocale: 'vi',
  },
  editor: undefined,
  cors: [
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ],
  csrf: {
    origin: [
      process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    ],
  },
});