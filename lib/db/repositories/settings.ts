import { SiteSetting } from '../types';
import { isMockDataMode } from '../../config/data-source';
import { siteSettings } from '../../mock-data';
import { sql } from '../connection';

export const settingsRepository = {
  get: async (key: string): Promise<string | null> => {
    if (isMockDataMode()) {
      const keyMap: Record<string, any> = {
        companyName: siteSettings.companyName.vi,
        slogan: siteSettings.slogan.vi,
        contactEmail: siteSettings.contactEmail,
        contactPhone: siteSettings.contactPhone,
      };
      return keyMap[key] || null;
    }
    const [row] = await sql`SELECT value FROM site_settings WHERE key = ${key}`;
    return (row as any)?.value || null;
  },

  getAll: async (): Promise<Record<string, string>> => {
    if (isMockDataMode()) {
      return {
        companyName: siteSettings.companyName.vi,
        slogan: siteSettings.slogan.vi,
        contactEmail: siteSettings.contactEmail,
        contactPhone: siteSettings.contactPhone,
        facebook: siteSettings.socialLinks.facebook,
        twitter: siteSettings.socialLinks.twitter,
        linkedin: siteSettings.socialLinks.linkedin,
        tiktok: siteSettings.socialLinks.tiktok,
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