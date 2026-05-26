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

    return rows.map(row => ({
      ...row,
      skills: parseJson<string[]>(row.skills as string, []),
      tags: parseJson<string[]>(row.tags as string, []),
      department: row.department || null,
      currency: row.currency || 'VND',
      summary: row.summary || row.description,
      closed_at: row.closed_at || null,
      created_by: row.created_by || null,
      updated_by: row.updated_by || null,
      image: row.image || null
    })) as Job[];
  }
};
