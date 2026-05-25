import { SiteSetting } from '../types';
import { isMockDataMode } from '../../config/data-source';
import mockData from '../../../coding-packs/crawlings/processed/mock-seed.json';
import { sql } from '../connection';

export const settingsRepository = {
  get: async (key: string): Promise<string | null> => {
    if (isMockDataMode()) {
      const settings = mockData.siteSettings as any;
      const keyMap: Record<string, any> = {
        companyName: settings.companyName?.vi || '',
        slogan: settings.slogan?.vi || '',
        contactEmail: settings.contactEmail || '',
        contactPhone: settings.contactPhone || '',
      };
      return keyMap[key] || null;
    }
    const [row] = await sql`SELECT value FROM site_settings WHERE key = ${key}`;
    return (row as any)?.value || null;
  },

  getAll: async (): Promise<Record<string, string>> => {
    if (isMockDataMode()) {
      const s = mockData.siteSettings as any;
      return {
        companyName: s.companyName?.vi || '',
        slogan: s.slogan?.vi || '',
        contactEmail: s.contactEmail || '',
        contactPhone: s.contactPhone || '',
        facebook: s.socialLinks?.facebook || '',
        twitter: s.socialLinks?.twitter || '',
        linkedin: s.socialLinks?.linkedin || '',
        tiktok: s.socialLinks?.tiktok || '',
      };
    }
    const rows = await sql`SELECT key, value FROM site_settings`;
    const settings: Record<string, string> = {};
    for (const row of rows as any[]) {
      settings[row.key] = row.value;
    }
    return settings;
  },

  set: async (key: string, value: string, type: 'string' | 'number' | 'boolean' | 'json' = 'string'): Promise<void> => {
    if (isMockDataMode()) return;
    await sql`
      INSERT INTO site_settings (id, key, value, type, updated_at)
      VALUES (${crypto.randomUUID()}, ${key}, ${value}, ${type}, NOW())
      ON CONFLICT(key) DO UPDATE SET value = EXCLUDED.value, type = EXCLUDED.type, updated_at = NOW()
    `;
  },

  delete: async (key: string): Promise<boolean> => {
    if (isMockDataMode()) return true;
    const result = await sql`DELETE FROM site_settings WHERE key = ${key}`;
    return result.count > 0;
  }
};