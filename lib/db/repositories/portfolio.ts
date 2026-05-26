import { PortfolioItem } from '../types';
import { isMockDataMode } from '../../config/data-source';
import { portfolioItems } from '../../mock-data';
import { sql } from '../connection';

export const portfolioRepository = {
  findAllPublished: async (locale: string = 'vi'): Promise<any[]> => {
    if (isMockDataMode()) {
      return portfolioItems.map(item => ({
        ...item,
        title: item.title[locale as keyof typeof item.title] || item.title.vi,
        client: item.client[locale as keyof typeof item.client] || item.client.vi,
        summary: item.summary[locale as keyof typeof item.summary] || item.summary.vi,
        problem: item.problem ? (item.problem[locale as keyof typeof item.problem] || item.problem.vi) : null,
        solution: item.solution ? (item.solution[locale as keyof typeof item.solution] || item.solution.vi) : null,
      }));
    }

    const rows = await sql`
      SELECT * FROM portfolio_items
      WHERE status = 'completed'
      ORDER BY year DESC, created_at DESC
    `;
    return rows;
  },

  findBySlug: async (slug: string, locale: string = 'vi'): Promise<any | null> => {
    if (isMockDataMode()) {
      const item = portfolioItems.find(i => i.slug === slug);
      if (!item) return null;
      return {
        ...item,
        title: item.title[locale as keyof typeof item.title] || item.title.vi,
        client: item.client[locale as keyof typeof item.client] || item.client.vi,
        summary: item.summary[locale as keyof typeof item.summary] || item.summary.vi,
        problem: item.problem ? (item.problem[locale as keyof typeof item.problem] || item.problem.vi) : null,
        solution: item.solution ? (item.solution[locale as keyof typeof item.solution] || item.solution.vi) : null,
      };
    }

    const [row] = await sql`
      SELECT * FROM portfolio_items
      WHERE slug = ${slug}
      LIMIT 1
    `;
    return row || null;
  }
};
