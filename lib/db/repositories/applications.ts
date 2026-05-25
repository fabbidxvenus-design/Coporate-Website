import { Application, ApplicationStatus } from '../types';
import { isMockDataMode } from '../../config/data-source';
import { sql } from '../connection';

export const applicationsRepository = {
  findById: async (id: string): Promise<Application | null> => {
    if (isMockDataMode()) return null;
    const [row] = await sql`SELECT * FROM applications WHERE id = ${id}`;
    return (row as any) || null;
  },

  findByJobId: async (jobId: string): Promise<Application[]> => {
    if (isMockDataMode()) return [];
    const rows = await sql`
      SELECT * FROM applications
      WHERE job_id = ${jobId}
      ORDER BY created_at DESC
    `;
    return rows as any as Application[];
  },

  findAll: async (filters?: { status?: ApplicationStatus; jobId?: string }): Promise<Application[]> => {
    if (isMockDataMode()) return [];

    let query = sql`SELECT * FROM applications`;

    if (filters?.status && filters?.jobId) {
      query = sql`SELECT * FROM applications WHERE status = ${filters.status} AND job_id = ${filters.jobId}`;
    } else if (filters?.status) {
      query = sql`SELECT * FROM applications WHERE status = ${filters.status}`;
    } else if (filters?.jobId) {
      query = sql`SELECT * FROM applications WHERE job_id = ${filters.jobId}`;
    }

    const rows = await sql`${query} ORDER BY created_at DESC`;
    return rows as any as Application[];
  },

  create: async (data: Omit<Application, 'id' | 'created_at' | 'updated_at'>): Promise<Application> => {
    if (isMockDataMode()) {
      return { ...data, id: crypto.randomUUID(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as Application;
    }

    const id = crypto.randomUUID();
    const now = new Date();

    await sql`
      INSERT INTO applications (id, job_id, full_name, email, phone, message, cv_filename, cv_path, cv_mime_type, cv_size, status, created_at, updated_at)
      VALUES (${id}, ${data.job_id}, ${data.full_name}, ${data.email}, ${data.phone}, ${data.message || ''}, ${data.cv_filename || null}, ${data.cv_path || null}, ${data.cv_mime_type || null}, ${data.cv_size || null}, ${data.status}, ${now}, ${now})
    `;

    return { ...data, id, created_at: now.toISOString(), updated_at: now.toISOString() };
  },

  updateStatus: async (id: string, status: ApplicationStatus): Promise<boolean> => {
    if (isMockDataMode()) return true;
    const result = await sql`
      UPDATE applications
      SET status = ${status}, updated_at = NOW()
      WHERE id = ${id}
    `;
    return result.count > 0;
  },

  countByJobId: async (jobId: string): Promise<number> => {
    if (isMockDataMode()) return 0;
    const [result] = await sql`SELECT COUNT(*) as count FROM applications WHERE job_id = ${jobId}`;
    return parseInt((result as any)?.count) || 0;
  }
};
