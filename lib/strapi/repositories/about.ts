import { strapiClient } from '../client';
import { isStrapiDataMode } from '../../config/data-source';
import type { AboutContent } from '../../db/types';
import type { StrapiAboutPage } from '../types';

export const aboutRepository = {
  async findByLocale(locale: string): Promise<AboutContent | null> {
    if (!isStrapiDataMode()) return null;
    const response = await strapiClient.get<{ data: any[] }>(
      `about-pages?filters[locale][$eq]=${locale}&pagination[limit]=1`
    );
    if (!response.data?.[0]) return null;
    return mapToAboutContent(response.data[0], locale);
  },
};

function mapToAboutContent(item: StrapiAboutPage, locale: string): AboutContent {
  return {
    id: item.documentId,
    locale: item.locale,
    hero_title: item.title,
    hero_subtitle: item.intro || '',
    hero_image_url: null,
    vision_title: locale === 'vi' ? 'Tầm nhìn' : 'Vision',
    vision_content: item.activity || '',
    mission_title: locale === 'vi' ? 'Sứ mệnh' : 'Mission',
    mission_content: item.activity || '',
    values_title: locale === 'vi' ? 'Giá trị cốt lõi' : 'Core Values',
    values: (item.values || []).map((v, i) => ({
      key: String(i),
      icon: v.icon || '',
      title: v.title,
      description: v.description,
    })),
    team_title: locale === 'vi' ? 'Đội ngũ' : 'Team',
    team_members: (item.teamMembers || []).map(m => ({
      name: m.name,
      role: m.role,
      image_url: m.imageUrl,
    })),
    stats: (item.stats || []).map(s => ({
      value: s.value,
      label: s.label,
    })),
    updated_at: item.updatedAt || new Date().toISOString(),
  };
}