import { getDb, closeDb } from './lib/db/connection';
import { runMigrations } from './lib/db/migrate';
import { seed } from './lib/db/seed';

const mockSeed = require('./coding-packs/crawlings/processed/mock-seed.json');

async function initDb() {
  console.log('Initializing SQLite database...');

  try {
    // Ensure DB connection is initialized
    getDb();

    // Run migrations
    runMigrations();
    console.log('Migrations applied successfully');

    // Seed data
    const data = {
      jobs: mockSeed.jobs.map((job: any) => ({
        title: job.title,
        slug: job.slug,
        description: job.description,
        requirements: job.requirements,
        benefits: job.benefits,
        salary_min: typeof job.salary_range === 'string' ? parseInt(job.salary_range.split('-')[0]) || 0 : 0,
        salary_max: typeof job.salary_range === 'string' ? parseInt(job.salary_range.split('-')[1]) || 0 : 0,
        location: job.location,
        employment_type: job.employment_type,
        skills: job.skills || [],
        tags: job.tags || [],
        status: job.status || 'draft'
      })),
      news: mockSeed.newsArticles.map((article: any) => ({
        title: article.title,
        slug: article.slug,
        content: article.body,
        excerpt: article.excerpt,
        author_name: article.author,
        tags: article.tags || [],
        status: article.status || 'draft'
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

    seed(data);
    console.log('Database seeded successfully');

    closeDb();
    console.log('Database initialization complete.');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
}

initDb();