import { getDb, closeDb } from '../lib/db/connection';
import { runMigrations } from '../lib/db/migrate';
import { seed } from '../lib/db/seed';
import { jobs, newsArticles, siteSettings, adapters } from '../lib/mock-data';

async function initDb() {
  console.log('Initializing database...');

  try {
    getDb();
    runMigrations();
    console.log('Migrations applied successfully');

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
          tags: dbJob.tags || [],
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

    seed(data as any);
    console.log('Database seeded successfully');

    closeDb();
    console.log('Database initialization complete.');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
}

initDb();
