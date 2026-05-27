/**
 * Payload CMS content seed script.
 * Idempotent — re-running will not create duplicates due to slug uniqueness.
 *
 * Usage: pnpm payload:seed
 *
 * Prerequisites:
 *   1. Postgres running with DATABASE_URL configured in .env.local
 *   2. PAYLOAD_SECRET configured in .env.local
 *   3. pnpm dev:payload (Payload server) running in background
 *
 * Exit codes:
 *   0 — seed complete (or nothing to do)
 *   1 — fatal error (missing env, connection failure)
 */

import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { initPayloadClient, type PayloadClient } from '../lib/payload/client';
import {
  jobs,
  newsArticles,
  siteSettings,
  aboutContent,
} from '../lib/mock-data';

async function seedJobs(payload: PayloadClient) {
  let seeded = 0;
  for (const job of jobs) {
    const existing = await payload.find({
      collection: 'jobs',
      where: { slug: { equals: job.slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      console.log(`  [skip] Job "${job.slug}" already exists`);
      continue;
    }
    await payload.create({
      collection: 'jobs',
      data: {
        title: job.title,
        slug: job.slug,
        department: job.department,
        location: job.location,
        employment_type: job.employment_type,
        salary_range: job.salary_range,
        skills: job.skills,
        description: job.description,
        requirements: job.requirements,
        benefits: job.benefits,
        status: job.status,
        published_at: job.published_at,
        image: undefined,
      },
    });
    seeded++;
    console.log(`  [seed] Job "${job.slug}" created (status: ${job.status})`);
  }
  // Add 1 draft job (AC-01: at least 1 draft)
  const draftJobSlug = 'junior-devops-engineer';
  const existingDraft = await payload.find({
    collection: 'jobs',
    where: { slug: { equals: draftJobSlug } },
    limit: 1,
  });
  if (existingDraft.docs.length === 0) {
    await payload.create({
      collection: 'jobs',
      data: {
        title: { vi: 'Junior DevOps Engineer', ja: 'ジュニアDevOpsエンジニア' },
        slug: draftJobSlug,
        department: { vi: 'Infrastructure', ja: 'インフラ' },
        location: { vi: 'Hà Nội', ja: 'ハノイ' },
        employment_type: { vi: 'Toàn thời gian', ja: '正社員' },
        salary_range: { vi: '15.000.000 - 25.000.000 VND', ja: '15,000,000 - 25,000,000 VND' },
        skills: ['Docker', 'Kubernetes', 'CI/CD', 'Linux', 'AWS'],
        description: { vi: 'Tham gia xây dựng và vận hành hạ tầng CI/CD.', ja: 'CI/CDインフラの構築と運用に参加します。' },
        requirements: { vi: 'Ít nhất 1 năm kinh nghiệm DevOps.', ja: 'DevOps経験1年以上。' },
        benefits: { vi: 'Đào tạo, hỗ trợ chứng chỉ, bảo hiểm.', ja: '研修、資格支援、保険。' },
        status: 'draft',
        published_at: new Date().toISOString(),
      },
    });
    seeded++;
    console.log(`  [seed] Draft job "${draftJobSlug}" created`);
  } else {
    console.log(`  [skip] Draft job "${draftJobSlug}" already exists`);
  }
  return seeded;
}

async function seedArticles(
  payload: PayloadClient,
) {
  let seeded = 0;
  for (const article of newsArticles) {
    const existing = await payload.find({
      collection: 'articles',
      where: { slug: { equals: article.slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      console.log(`  [skip] Article "${article.slug}" already exists`);
      continue;
    }
    await payload.create({
      collection: 'articles',
      data: {
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        body: article.body,
        cover_image: undefined,
        category: article.category,
        tags: article.tags,
        status: article.status,
        author: article.author,
        published_at: article.published_at,
      },
    });
    seeded++;
    console.log(`  [seed] Article "${article.slug}" created (status: ${article.status})`);
  }
  // Add 1 draft article (AC-02: at least 1 draft)
  const draftSlug = 'product-update-q2-2024';
  const existingDraft = await payload.find({
    collection: 'articles',
    where: { slug: { equals: draftSlug } },
    limit: 1,
  });
  if (existingDraft.docs.length === 0) {
    await payload.create({
      collection: 'articles',
      data: {
        title: { vi: 'Cập nhật sản phẩm Q2 2024', ja: '2024年Q2製品アップデート' },
        slug: draftSlug,
        excerpt: { vi: 'Những tính năng mới trong Q2.', ja: 'Q2の新機能について。' },
        body: { vi: 'Đang soạn thảo...', ja: '起草中...' },
        category: 'san_pham',
        tags: ['Product'],
        status: 'draft',
        author: { vi: 'Fabbi Team', ja: 'Fabbiチーム' },
        published_at: new Date().toISOString(),
      },
    });
    seeded++;
    console.log(`  [seed] Draft article "${draftSlug}" created`);
  } else {
    console.log(`  [skip] Draft article "${draftSlug}" already exists`);
  }
  return seeded;
}

async function seedSiteSettings(
  payload: PayloadClient,
) {
  const existing = await payload.find({
    collection: 'site-settings',
    limit: 1,
  });
  if (existing.docs.length > 0) {
    console.log(`  [skip] Site settings already exist (id: ${existing.docs[0].id})`);
    return 0;
  }
  await payload.create({
    collection: 'site-settings',
    data: {
      companyName: siteSettings.companyName,
      slogan: siteSettings.slogan,
      founded: siteSettings.founded,
      contactEmail: siteSettings.contactEmail,
      contactPhone: siteSettings.contactPhone,
      headcount: siteSettings.headcount,
      socialLinks: siteSettings.socialLinks,
      offices: siteSettings.offices,
    },
  });
  console.log(`  [seed] Site settings created`);
  return 1;
}

async function seedAboutContent(
  payload: PayloadClient,
) {
  const existing = await payload.find({
    collection: 'about-pages',
    limit: 1,
  });
  if (existing.docs.length > 0) {
    console.log(`  [skip] About page already exists (id: ${existing.docs[0].id})`);
    return 0;
  }
  await payload.create({
    collection: 'about-pages',
    data: {
      heroTitle: aboutContent.heroTitle,
      heroSubtitle: aboutContent.heroSubtitle,
      visionTitle: { vi: 'Tầm nhìn', ja: 'ビジョン' },
      visionContent: aboutContent.vision,
      missionTitle: { vi: 'Sứ mệnh', ja: 'ミッション' },
      missionContent: aboutContent.mission,
      valuesTitle: { vi: 'Giá trị cốt lõi', ja: 'コアバリュー' },
      values: aboutContent.values,
    },
  });
  console.log(`  [seed] About page created`);
  return 1;
}

export async function seed() {
  console.log('[Seed] Starting Payload CMS content seed...');

  // Validate required env vars before attempting connection
  if (!process.env.PAYLOAD_SECRET) {
    console.error('[Seed] ERROR: PAYLOAD_SECRET is not set in environment.');
    console.error('         Set PAYLOAD_SECRET in .env.local before running seed.');
    throw new Error('PAYLOAD_SECRET not configured');
  }
  if (!process.env.DATABASE_URL) {
    console.error('[Seed] ERROR: DATABASE_URL is not set in environment.');
    console.error('         Configure DATABASE_URL in .env.local to connect to Postgres.');
    throw new Error('DATABASE_URL not configured');
  }

  // Verify seed source module exists
  if (!existsSync(resolve(process.cwd(), 'lib/mock-data.ts'))) {
    throw new Error('lib/mock-data.ts not found — run this script from the project root');
  }

  let payloadClient: PayloadClient;
  try {
    payloadClient = await initPayloadClient();
  } catch (err) {
    console.error('[Seed] ERROR: Failed to initialize Payload client.');
    console.error('         Check that:');
    console.error('           1. PostgreSQL is running on port 5432');
    console.error('           2. DATABASE_URL is correct in .env.local');
    console.error('           3. Payload migrations have been run (pnpm payload:init)');
    throw err;
  }

  console.log('[Seed] Payload client connected, seeding collections...\n');

  const [jobsSeeded, articlesSeeded, settingsSeeded, aboutSeeded] = await Promise.all([
    seedJobs(payloadClient),
    seedArticles(payloadClient),
    seedSiteSettings(payloadClient),
    seedAboutContent(payloadClient),
  ]);

  const total = jobsSeeded + articlesSeeded + settingsSeeded + aboutSeeded;
  console.log(`\n[Seed] Done. ${total} new record(s) created.`);
  console.log('[Seed] Run pnpm payload:smoke to verify connectivity.');
}

// Self-execute when run directly
seed().then(() => process.exit(0)).catch(err => {
  console.error('[Seed] Fatal:', err instanceof Error ? err.message : String(err));
  process.exit(1);
});