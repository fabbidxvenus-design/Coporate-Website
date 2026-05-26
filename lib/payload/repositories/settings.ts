/**
 * Payload settings repository.
 * Returns mock data when USE_MOCK_DATA=true (data-source mode 'mock').
 */

import { isMockDataMode } from '@/lib/config/data-source';
import { siteSettings as mockSettings } from '@/lib/mock-data';

export const payloadSettingsRepository = {
  get: async (key: string): Promise<string | null> => {
    if (isMockDataMode()) {
      const keyMap: Record<string, string> = {
        companyName: mockSettings.companyName.vi,
        slogan: mockSettings.slogan.vi,
        contactEmail: mockSettings.contactEmail,
        contactPhone: mockSettings.contactPhone,
      };
      return keyMap[key] || null;
    }

    const { initPayloadClient } = await import('../client');
    const client = await initPayloadClient();
    const config = (await import('../config')).getPayloadConfig();

    const doc = await client.find({
      collection: config.collections.siteSettings,
      depth: 1,
      limit: 1,
    }).then((r: { docs: Record<string, unknown>[] }) => r.docs[0] || null);

    if (!doc) return null;
    return (doc as Record<string, unknown>)[key] as string | null;
  },

  getAll: async (): Promise<Record<string, string>> => {
    if (isMockDataMode()) {
      return {
        companyName: mockSettings.companyName.vi,
        slogan: mockSettings.slogan.vi,
        contactEmail: mockSettings.contactEmail,
        contactPhone: mockSettings.contactPhone,
        facebook: mockSettings.socialLinks.facebook,
        twitter: mockSettings.socialLinks.twitter,
        linkedin: mockSettings.socialLinks.linkedin,
        tiktok: mockSettings.socialLinks.tiktok,
      };
    }

    const { initPayloadClient } = await import('../client');
    const client = await initPayloadClient();
    const config = (await import('../config')).getPayloadConfig();

    const doc = await client.find({
      collection: config.collections.siteSettings,
      depth: 1,
      limit: 1,
    }).then((r: { docs: Record<string, unknown>[] }) => r.docs[0] || null);

    if (!doc) return {};
    const record: Record<string, string> = {};
    for (const [k, v] of Object.entries(doc)) {
      if (typeof v === 'string') record[k] = v;
    }
    return record;
  },
};