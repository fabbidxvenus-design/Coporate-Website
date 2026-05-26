/**
 * Payload about page repository.
 * Returns mock data when USE_MOCK_DATA=true (data-source mode 'mock').
 */

import { isMockDataMode } from '@/lib/config/data-source';
import { aboutContent as mockAboutContent } from '@/lib/mock-data';
import type { AboutContent } from '@/lib/db/types';

function payloadAboutToDb(doc: {
  locale: string;
  heroTitle: Record<string, string>;
  heroSubtitle: Record<string, string>;
  heroImage?: { url: string } | null;
  visionTitle: string;
  visionContent: Record<string, string>;
  missionTitle: string;
  missionContent: Record<string, string>;
  valuesTitle: string;
  values: Array<{ key: string; title: Record<string, string>; description: Record<string, string> }>;
  teamTitle: string;
  teamMembers: Array<{ name: Record<string, string>; role: Record<string, string>; imageUrl?: { url: string } | null }>;
  stats: Array<{ value: string; label: Record<string, string> }>;
}, locale: string): AboutContent {
  const lk = locale as 'vi' | 'ja';
  return {
    id: `about-${locale}`,
    locale,
    hero_title: doc.heroTitle[lk] || doc.heroTitle.vi,
    hero_subtitle: doc.heroSubtitle[lk] || doc.heroSubtitle.vi,
    hero_image_url: doc.heroImage?.url || null,
    vision_title: doc.visionTitle,
    vision_content: doc.visionContent[lk] || doc.visionContent.vi,
    mission_title: doc.missionTitle,
    mission_content: doc.missionContent[lk] || doc.missionContent.vi,
    values_title: doc.valuesTitle,
    values: doc.values.map(v => ({
      key: v.key,
      icon: '',
      title: v.title[lk] || v.title.vi,
      description: v.description[lk] || v.description.vi,
    })),
    team_title: doc.teamTitle,
    team_members: doc.teamMembers.map(m => ({
      name: m.name[lk] || m.name.vi,
      role: m.role[lk] || m.role.vi,
      image_url: m.imageUrl?.url || null,
    })),
    stats: doc.stats.map(s => ({
      value: s.value,
      label: s.label[lk] || s.label.vi,
    })),
    updated_at: new Date().toISOString(),
  };
}

export const payloadAboutRepository = {
  findByLocale: async (locale: string): Promise<AboutContent | null> => {
    if (isMockDataMode()) {
      return {
        id: `about-${locale}`,
        locale,
        hero_title: mockAboutContent.heroTitle[locale as keyof typeof mockAboutContent.heroTitle] || mockAboutContent.heroTitle.vi,
        hero_subtitle: mockAboutContent.heroSubtitle[locale as keyof typeof mockAboutContent.heroSubtitle] || mockAboutContent.heroSubtitle.vi,
        hero_image_url: null,
        vision_title: locale === 'vi' ? 'Tầm nhìn' : 'ビジョン',
        vision_content: mockAboutContent.vision[locale as keyof typeof mockAboutContent.vision] || mockAboutContent.vision.vi,
        mission_title: locale === 'vi' ? 'Sứ mệnh' : 'ミッション',
        mission_content: mockAboutContent.mission[locale as keyof typeof mockAboutContent.mission] || mockAboutContent.mission.vi,
        values_title: locale === 'vi' ? 'Giá trị cốt lõi' : 'コアバリュー',
        values: mockAboutContent.values.map(v => ({
          key: v.key,
          icon: '',
          title: v.title[locale as keyof typeof v.title] || v.title.vi,
          description: v.description[locale as keyof typeof v.description] || v.description.vi,
        })),
        team_title: locale === 'vi' ? 'Đội ngũ' : 'チーム',
        team_members: [],
        stats: [],
        updated_at: new Date().toISOString(),
      };
    }

    const { initPayloadClient } = await import('../client');
    const client = await initPayloadClient();
    const config = (await import('../config')).getPayloadConfig();

    const doc = await client.find({
      collection: config.collections.aboutPages,
      where: { locale: { equals: locale } },
      depth: 1,
      limit: 1,
    }).then((r: { docs: Record<string, unknown>[] }) => r.docs[0] || null);

    if (!doc) return null;
    return payloadAboutToDb(doc as Parameters<typeof payloadAboutToDb>[0], locale);
  },
};