import { sql } from './connection';
import { stringifyJson } from './json';
import fs from 'fs';
import { parseCrawledPages, parseImageMapping, buildImportPlan } from './crawl-parser';

export interface SeedData {
  jobs: Array<{
    title: string;
    slug: string;
    description: string;
    requirements: string;
    benefits: string;
    salary_min?: number;
    salary_max?: number;
    location: string;
    employment_type: string;
    skills: string[];
    tags: string[];
    status: string;
  }>;
  news: Array<{
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    author_name: string;
    author_role?: string;
    tags: string[];
    status: string;
    published_at?: string;
    thumbnail_url?: string | null;
  }>;
  settings: Array<{
    key: string;
    value: string;
    type: string;
  }>;
  adminUser?: {
    email: string;
    name: string;
    password: string;
    role: string;
  };
  aboutContent?: {
    id?: string;
    locale: string;
    hero_title: string;
    hero_subtitle?: string;
    hero_image_url?: string | null;
    mission_title?: string;
    mission_content?: string;
    vision_title?: string;
    vision_content?: string;
    values_title?: string;
    values?: Array<{ icon: string; title: string; description: string }>;
    team_title?: string;
    team_members?: Array<{ name: string; role: string; image_url?: string }>;
    stats?: Array<{ value: string; label: string }>;
    content?: string;
  };
}

function generateId(): string {
  return crypto.randomUUID();
}

function hashPassword(password: string): string {
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(password + 'fabbi-salt-2024').digest('hex');
}

export async function seed(data: SeedData): Promise<void> {
  await sql.begin(async (tx) => {
    for (const job of data.jobs) {
      const id = generateId();
      const publishedAt = job.status === 'published' ? new Date() : null;
      await tx`
        INSERT INTO jobs (id, title, slug, description, requirements, benefits, salary_min, salary_max, location, employment_type, skills, tags, status, published_at)
        VALUES (${id}, ${job.title}, ${job.slug}, ${job.description}, ${job.requirements}, ${job.benefits}, ${job.salary_min ?? null}, ${job.salary_max ?? null}, ${job.location}, ${job.employment_type}, ${stringifyJson(job.skills)}, ${stringifyJson(job.tags)}, ${job.status}, ${publishedAt})
        ON CONFLICT(slug) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          requirements = EXCLUDED.requirements,
          benefits = EXCLUDED.benefits,
          salary_min = EXCLUDED.salary_min,
          salary_max = EXCLUDED.salary_max,
          location = EXCLUDED.location,
          employment_type = EXCLUDED.employment_type,
          skills = EXCLUDED.skills,
          tags = EXCLUDED.tags,
          status = EXCLUDED.status,
          updated_at = NOW()
      `;
    }

    for (const article of data.news) {
      const id = generateId();
      const publishedAt = article.published_at ? new Date(article.published_at) : (article.status === 'published' ? new Date() : null);
      await tx`
        INSERT INTO news_articles (id, title, slug, content, excerpt, thumbnail_url, author_name, author_role, tags, status, published_at)
        VALUES (${id}, ${article.title}, ${article.slug}, ${article.content}, ${article.excerpt}, ${article.thumbnail_url ?? null}, ${article.author_name}, ${article.author_role ?? null}, ${stringifyJson(article.tags)}, ${article.status}, ${publishedAt})
        ON CONFLICT(slug) DO UPDATE SET
          title = EXCLUDED.title,
          content = EXCLUDED.content,
          excerpt = EXCLUDED.excerpt,
          thumbnail_url = EXCLUDED.thumbnail_url,
          updated_at = NOW()
      `;
    }

    for (const setting of data.settings) {
      await tx`
        INSERT INTO site_settings (id, key, value, type)
        VALUES (${generateId()}, ${setting.key}, ${setting.value}, ${setting.type})
        ON CONFLICT(key) DO UPDATE SET
          value = EXCLUDED.value,
          updated_at = NOW()
      `;
    }

    if (data.adminUser) {
      const adminId = generateId();
      await tx`
        INSERT INTO admin_users (id, email, name, password_hash, role)
        VALUES (${adminId}, ${data.adminUser.email}, ${data.adminUser.name}, ${hashPassword(data.adminUser.password)}, ${data.adminUser.role})
        ON CONFLICT(email) DO NOTHING
      `;
    }

    if (data.aboutContent) {
      const aboutId = data.aboutContent.id || 'about-us';
      await tx`
        INSERT INTO about_content (id, locale, hero_title, hero_subtitle, hero_image_url, mission_title, mission_content, vision_title, vision_content, values_title, "values", team_title, team_members, stats)
        VALUES (${aboutId}, ${data.aboutContent.locale}, ${data.aboutContent.hero_title}, ${data.aboutContent.hero_subtitle || ''}, ${data.aboutContent.hero_image_url ?? null}, ${data.aboutContent.mission_title || ''}, ${data.aboutContent.mission_content || (data.aboutContent.content || '')}, ${data.aboutContent.vision_title || ''}, ${data.aboutContent.vision_content || ''}, ${data.aboutContent.values_title || ''}, ${stringifyJson(data.aboutContent.values || [])}, ${data.aboutContent.team_title || ''}, ${stringifyJson(data.aboutContent.team_members || [])}, ${stringifyJson(data.aboutContent.stats || [])})
        ON CONFLICT(id, locale) DO UPDATE SET
          hero_title = EXCLUDED.hero_title,
          hero_subtitle = EXCLUDED.hero_subtitle,
          hero_image_url = EXCLUDED.hero_image_url,
          mission_title = EXCLUDED.mission_title,
          mission_content = EXCLUDED.mission_content,
          vision_title = EXCLUDED.vision_title,
          vision_content = EXCLUDED.vision_content,
          values_title = EXCLUDED.values_title,
          "values" = EXCLUDED."values",
          team_title = EXCLUDED.team_title,
          team_members = EXCLUDED.team_members,
          stats = EXCLUDED.stats,
          updated_at = NOW()
      `;
    }
  });
}

export async function seedCrawledData() {
  const CRAWL_PAGES_PATH = 'coding-packs/crawlings/crawled_all_pages.md';
  const CRAWL_IMAGES_PATH = 'coding-packs/crawlings/crawled_with_images.md';
  const IMAGE_SOURCE_DIR = 'coding-packs/crawlings/images';
  const PUBLIC_IMAGE_DIR = 'public/images';

  if (!fs.existsSync(CRAWL_PAGES_PATH) || !fs.existsSync(CRAWL_IMAGES_PATH)) {
    console.warn('Crawl source files not found, skipping crawled data seeding.');
    return;
  }

  if (!fs.existsSync(PUBLIC_IMAGE_DIR)) {
    fs.mkdirSync(PUBLIC_IMAGE_DIR, { recursive: true });
  }

  const pagesMd = fs.readFileSync(CRAWL_PAGES_PATH, 'utf8');
  const imagesMd = fs.readFileSync(CRAWL_IMAGES_PATH, 'utf8');

  const pages = parseCrawledPages(pagesMd);
  const imageMap = parseImageMapping(imagesMd);
  const plan = buildImportPlan({
    pages,
    imageMap,
    imageDir: IMAGE_SOURCE_DIR,
    publicImageDir: PUBLIC_IMAGE_DIR
  });

  for (const asset of plan.assets) {
    if (fs.existsSync(asset.src)) {
      fs.copyFileSync(asset.src, asset.dest);
    }
  }

  const seedData: SeedData = {
    jobs: [],
    news: plan.news,
    settings: plan.settings,
    adminUser: undefined
  };

  await seed(seedData);

  for (const about of plan.about) {
    await seed({
      jobs: [],
      news: [],
      settings: [],
      aboutContent: about
    });
  }

  console.log(`Seeded ${plan.news.length} news articles, ${plan.about.length} about pages, and ${plan.settings.length} settings from crawled data.`);
}

export { generateId, hashPassword };