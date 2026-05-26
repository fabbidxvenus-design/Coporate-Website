import { Job } from '../types';
import { parseJson } from '../json';
import { isMockDataMode } from '../../config/data-source';
import { jobs, adapters } from '../../mock-data';
import { sql } from '../connection';

export const jobsRepository = {
  findAllPublished: async (locale: string = 'vi'): Promise<Job[]> => {
    if (isMockDataMode()) {
      return (jobs || [])
        .filter(j => j.status === 'published')
        .map(j => adapters.toDbJob(j, locale)) as Job[];
    }

    const rows = await sql`
      SELECT * FROM jobs
      WHERE status = 'published'
      ORDER BY published_at DESC
    `;

    return rows.map(row => jobsRepository._mapRowToJob(row));
  },

  findAll: async (): Promise<Job[]> => {
    if (isMockDataMode()) {
      return (jobs || []).map(j => adapters.toDbJob(j, 'vi')) as Job[];
    }
    const rows = await sql`SELECT * FROM jobs ORDER BY created_at DESC`;
    return rows.map(row => jobsRepository._mapRowToJob(row));
  },

  findById: async (id: string): Promise<Job | null> => {
    if (isMockDataMode()) {
      const job = jobs.find(j => j.id === id);
      return job ? (adapters.toDbJob(job, 'vi') as Job) : null;
    }
    const [row] = await sql`SELECT * FROM jobs WHERE id = ${id}`;
    return row ? jobsRepository._mapRowToJob(row) : null;
  },

  create: async (data: Omit<Job, 'id' | 'created_at' | 'updated_at'>): Promise<Job> => {
    const id = crypto.randomUUID();
    const now = new Date();
    await sql`
      INSERT INTO jobs (
        id, title, slug, description, requirements, benefits, salary_min, salary_max, location,
        employment_type, skills, tags, status, views, published_at, created_at, updated_at,
        department, currency, summary, closed_at, image
      )
      VALUES (
        ${id}, ${data.title ?? ''}, ${data.slug ?? ''}, ${data.description ?? ''}, ${data.requirements ?? ''}, ${data.benefits ?? ''},
        ${data.salary_min ?? null}, ${data.salary_max ?? null}, ${data.location ?? ''}, ${data.employment_type ?? null},
        ${JSON.stringify(data.skills ?? [])}, ${JSON.stringify(data.tags ?? [])}, ${data.status ?? 'draft'}, 0,
        ${data.published_at ?? null}, ${now.toISOString()}, ${now.toISOString()}, ${data.department ?? null}, ${data.currency ?? 'VND'},
        ${data.summary ?? null}, ${data.closed_at ?? null}, ${data.image ?? null}
      )
    `;
    return { ...data, id, views: 0, created_at: now.toISOString(), updated_at: now.toISOString() } as Job;
  },

  update: async (id: string, data: Partial<Job>): Promise<boolean> => {
    const now = new Date();
    const updates: any[] = [];

    // Explicitly define what can be updated to avoid SQL issues
    const allowedKeys = [
        'title', 'slug', 'description', 'requirements', 'benefits', 'salary_min',
        'salary_max', 'location', 'employment_type', 'skills', 'tags',
        'status', 'published_at', 'department', 'currency', 'summary',
        'closed_at', 'image'
    ];

    Object.entries(data).forEach(([key, value]) => {
        if (allowedKeys.includes(key)) {
            if (key === 'skills' || key === 'tags') {
                updates.push(sql`${sql(key)} = ${JSON.stringify(value)}`);
            } else {
                updates.push(sql`${sql(key)} = ${value}`);
            }
        }
    });

    if (updates.length === 0) return false;

    const res = await sql`
        UPDATE jobs
        SET ${sql.unsafe(updates.map(u => u.toString()).join(', '))}, updated_at = ${now.toISOString()}
        WHERE id = ${id}
    `;
    return res.count > 0;
  },

  delete: async (id: string): Promise<boolean> => {
    const res = await sql`DELETE FROM jobs WHERE id = ${id}`;
    return res.count > 0;
  },

  _mapRowToJob: (row: any): Job => ({
      ...row,
      id: row.id || '',
      title: row.title || '',
      slug: row.slug || '',
      description: row.description || '',
      requirements: row.requirements || '',
      benefits: row.benefits || '',
      salary_min: row.salary_min ?? null,
      salary_max: row.salary_max ?? null,
      location: row.location || '',
      employment_type: row.employment_type || null,
      skills: parseJson<string[]>(row.skills as string, []),
      tags: parseJson<string[]>(row.tags as string, []),
      status: row.status || 'draft',
      views: row.views ?? 0,
      created_at: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
      updated_at: row.updated_at ? new Date(row.updated_at).toISOString() : new Date().toISOString(),
      published_at: row.published_at ? new Date(row.published_at).toISOString() : null,
      department: row.department || null,
      currency: row.currency || 'VND',
      summary: row.summary || row.description || '',
      closed_at: row.closed_at ? new Date(row.closed_at).toISOString() : null,
      created_by: row.created_by || null,
      updated_by: row.updated_by || null,
      image: row.image || null
    })
};
