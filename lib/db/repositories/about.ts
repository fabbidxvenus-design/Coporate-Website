import { AboutContent } from '../types';
import { parseJson } from '../json';
import { isMockDataMode } from '../../config/data-source';
import { aboutContent } from '../../mock-data';
import { sql } from '../connection';

export const aboutRepository = {
  findByLocale: async (locale: string): Promise<AboutContent | null> => {
    if (isMockDataMode()) {
      return {
        id: `about-${locale}`,
        locale,
        hero_title: aboutContent.heroTitle[locale as keyof typeof aboutContent.heroTitle] || aboutContent.heroTitle.vi,
        hero_subtitle: aboutContent.heroSubtitle[locale as keyof typeof aboutContent.heroSubtitle] || aboutContent.heroSubtitle.vi,
        hero_image_url: null,
        vision_title: locale === 'vi' ? 'Tầm nhìn' : 'ビジョン',
        vision_content: aboutContent.vision[locale as keyof typeof aboutContent.vision] || aboutContent.vision.vi,
        mission_title: locale === 'vi' ? 'Sứ mệnh' : 'ミッション',
        mission_content: aboutContent.mission[locale as keyof typeof aboutContent.mission] || aboutContent.mission.vi,
        values_title: locale === 'vi' ? 'Giá trị cốt lõi' : 'コアバリュー',
        values: aboutContent.values.map(v => ({
          key: v.key,
          icon: '', // Icons can be added to mock-data if needed
          title: v.title[locale as keyof typeof v.title] || v.title.vi,
          description: v.description[locale as keyof typeof v.description] || v.description.vi
        })),
        team_title: locale === 'vi' ? 'Đội ngũ' : 'チーム',
        team_members: [],
        stats: [],
        updated_at: new Date().toISOString()
      };
    }

    const [row] = await sql`SELECT * FROM about_content WHERE locale = ${locale}`;
    if (!row) return null;

    return {
      ...row as any,
      values: parseJson<any[]>(row.values as string, []),
      team_members: parseJson<any[]>(row.team_members as string, []),
      stats: parseJson<any[]>(row.stats as string, [])
    };
  }
};
