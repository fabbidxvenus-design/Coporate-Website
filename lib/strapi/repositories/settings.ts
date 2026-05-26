import { strapiClient } from '../client';
import { isStrapiDataMode } from '../../config/data-source';

export const settingsRepository = {
  async get(key: string): Promise<string | null> {
    if (!isStrapiDataMode()) return null;
    const response = await strapiClient.get<{ data: any }>(`site-settings?filters[key][$eq]=${key}`);
    return response.data?.value || null;
  },

  async getAll(): Promise<Record<string, string>> {
    if (!isStrapiDataMode()) return {};
    const response = await strapiClient.get<{ data: any[] }>('site-settings');
    const settings: Record<string, string> = {};
    for (const item of response.data) {
      settings[item.key] = item.value;
    }
    return settings;
  },

  async set(key: string, value: string): Promise<void> {
    await strapiClient.put(`site-settings/${key}`, { value });
  },
};