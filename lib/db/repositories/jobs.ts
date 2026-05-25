import { Job } from '../types';
import { parseJson } from '../json';
import { isMockDataMode } from '../../config/data-source';
import mockData from '../../../coding-packs/crawlings/processed/mock-seed.json';
import { sql } from '../connection';

export const jobsRepository = {
  findAllPublished: async (): Promise<Job[]> => {
    if (isMockDataMode()) {
      return (mockData.jobs as any[]).filter((j: any) => j.status === 'published').map((j: any) => ({
        ...j,
        department: j.department || null,
        skills: j.skills || [],
        tags: j.tags || [],
        currency: 'VND',
        summary: j.description,
        closed_at: null,
        created_by: null,
        updated_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));
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
      department: null,
      currency: 'VND',
      summary: row.description,
      closed_at: null,
      created_by: null,
      updated_by: null
    })) as Job[];
  }
};
