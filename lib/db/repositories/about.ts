import { AboutContent } from '../types';
import { parseJson } from '../json';
import { isMockDataMode } from '../../config/data-source';
import mockData from '../../../coding-packs/crawlings/processed/mock-seed.json';
import { sql } from '../connection';

export const aboutRepository = {
  findByLocale: async (locale: string): Promise<AboutContent | null> => {
    if (isMockDataMode()) {
      const localeData = (mockData.aboutContent as any)[locale];
      if (!localeData) return null;

      return {
        id: `about-${locale}`,
        locale,
        hero_title: localeData.heroTitle,
        hero_subtitle: localeData.heroSubtitle,
        hero_image_url: null,
        vision_title: 'Tầm nhìn',
        vision_content: localeData.vision,
        mission_title: 'Sứ mệnh',
        mission_content: localeData.mission,
        values_title: 'Giá trị cốt lõi',
        values: [],
        team_title: 'Đội ngũ',
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
