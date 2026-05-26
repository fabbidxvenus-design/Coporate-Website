import { runMigrations } from './migrate';
import { seed, seedCrawledData } from './seed';
import { jobs, newsArticles, siteSettings, adapters } from '../mock-data';

export async function initDb(options?: { forceSeed?: boolean; useCrawledData?: boolean }) {
  const { forceSeed = false, useCrawledData = false } = options ?? {};

  if (process.env.USE_MOCK_DATA === 'true') {
    console.log('Skipping DB initialization in mock mode.');
    return;
  }

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is missing but USE_MOCK_DATA is false.');
  }

  console.log('Initializing PostgreSQL database...');
  await runMigrations();

  if (forceSeed) {
    if (useCrawledData) {
      console.log('Seeding database with crawled data...');
      await seedCrawledData();
    } else {
      console.log('Seeding database with mock data...');
      const data = {
        jobs: jobs.map(job => {
          const dbJob = adapters.toDbJob(job, 'vi');
          return {
            title: dbJob.title,
            slug: dbJob.slug,
            description: dbJob.description,
            requirements: dbJob.requirements,
            benefits: dbJob.benefits,
            salary_min: typeof job.salary_range.vi === 'string' ? parseInt(job.salary_range.vi.split('-')[0]) || 0 : 0,
            salary_max: typeof job.salary_range.vi === 'string' ? parseInt(job.salary_range.vi.split('-')[1]) || 0 : 0,
            location: dbJob.location,
            employment_type: dbJob.employment_type,
            skills: dbJob.skills,
            tags: [],
            status: job.status
          };
        }),
        news: newsArticles.map(article => {
          const dbNews = adapters.toDbNewsArticle(article, 'vi');
          return {
            title: dbNews.title,
            slug: dbNews.slug,
            content: dbNews.content,
            excerpt: dbNews.excerpt,
            thumbnail_url: dbNews.thumbnail_url,
            author_name: dbNews.author_name,
            tags: dbNews.tags,
            status: 'published'
          };
        }),
        settings: [
          { key: 'site_name', value: siteSettings.companyName.vi, type: 'string' },
          { key: 'companyName', value: siteSettings.companyName.vi, type: 'string' },
          { key: 'contactEmail', value: siteSettings.contactEmail, type: 'string' },
          { key: 'contactPhone', value: siteSettings.contactPhone, type: 'string' }
        ],
        adminUser: {
          email: 'admin@fabbi.com',
          name: 'Admin',
          password: 'password123',
          role: 'admin'
        }
      };
      await seed(data as any);
    }
  }

  console.log('Database initialization complete.');
}

// Support running directly via ts-node or similar
if (require.main === module) {
  // Default: use crawled data if available, fall back to mock
  initDb({ forceSeed: true, useCrawledData: true }).catch(console.error);
}
