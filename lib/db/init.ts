import { runMigrations } from './migrate';
import { seed, seedCrawledData } from './seed';
import mockSeed from '../../coding-packs/crawlings/processed/mock-seed.json';

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
        jobs: (mockSeed.jobs as any[]).map(job => ({
          title: job.title,
          slug: job.slug,
          description: job.description,
          requirements: job.requirements,
          benefits: job.benefits,
          salary_min: typeof job.salary_range === 'string' ? parseInt(job.salary_range.split('-')[0]) || 0 : 0,
          salary_max: typeof job.salary_range === 'string' ? parseInt(job.salary_range.split('-')[1]) || 0 : 0,
          location: job.location,
          employment_type: job.employment_type,
          skills: job.skills,
          tags: job.tags,
          status: job.status
        })),
        news: (mockSeed.newsArticles as any[]).map(article => ({
          title: article.title,
          slug: article.slug,
          content: article.body,
          excerpt: article.excerpt,
          thumbnail_url: article.cover_image,
          author_name: article.author,
          tags: article.tags,
          status: 'published'
        })),
        settings: [
          { key: 'site_name', value: 'Fabbi Corporate Website', type: 'string' }
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