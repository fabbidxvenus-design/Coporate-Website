import { ContactSubmission } from '../types';
import { isMockDataMode } from '../../config/data-source';
import { sql } from '../connection';

export const contactRepository = {
  create: async (data: Omit<ContactSubmission, 'id' | 'created_at' | 'updated_at'>): Promise<ContactSubmission> => {
    if (isMockDataMode()) {
        return { ...data, id: crypto.randomUUID(), status: data.status || 'new', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    }
    const id = crypto.randomUUID();
    const now = new Date();

    await sql`
      INSERT INTO contact_submissions (id, name, email, phone, company, message, status, created_at, updated_at)
      VALUES (${id}, ${data.name}, ${data.email}, ${data.phone || ''}, ${data.company || ''}, ${data.message}, ${data.status || 'new'}, ${now}, ${now})
    `;

    return { ...data, id, status: data.status || 'new', created_at: now.toISOString(), updated_at: now.toISOString() };
  },

  findAll: async (filters?: { status?: string }): Promise<ContactSubmission[]> => {
    if (isMockDataMode()) return [];

    let query = sql`SELECT * FROM contact_submissions`;
    if (filters?.status) {
      query = sql`SELECT * FROM contact_submissions WHERE status = ${filters.status}`;
    }

    const rows = await sql`${query} ORDER BY created_at DESC`;
    return rows as any as ContactSubmission[];
  },

  markAsRead: async (id: string): Promise<boolean> => {
    if (isMockDataMode()) return true;
    const result = await sql`
      UPDATE contact_submissions
      SET status = 'read', updated_at = NOW()
      WHERE id = ${id}
    `;
    return result.count > 0;
  }
};
