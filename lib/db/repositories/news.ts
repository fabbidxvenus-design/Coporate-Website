import { NewsArticle } from '../types';
import { parseJson } from '../json';
import { isMockDataMode } from '../../config/data-source';
import { newsArticles, adapters } from '../../mock-data';
import { sql } from '../connection';

export const newsRepository = {
  findAllPublished: async (locale: string = 'vi'): Promise<NewsArticle[]> => {
    if (isMockDataMode()) {
      return newsArticles
        .filter(a => a.status === 'published')
        .map(a => adapters.toDbNewsArticle(a, locale)) as NewsArticle[];
    }

    const rows = await sql`
      SELECT * FROM news_articles
      WHERE status = 'published'
      ORDER BY published_at DESC
    `;

    return rows.map(row => ({
      ...(row as any),
      tags: parseJson<string[]>(row.tags as string, []),
      content_images: parseJson<string[]>(row.content_images as string, [])
    } as NewsArticle));
  },

  findBySlug: async (slug: string, locale: string = 'vi'): Promise<NewsArticle | null> => {
    if (isMockDataMode()) {
      // Find the canonical article
      const article = newsArticles.find(a => a.slug === slug);
      if (!article) return null;

      return adapters.toDbNewsArticle(article, locale) as NewsArticle;
    }

    const [row] = await sql`
      SELECT * FROM news_articles
      WHERE slug = ${slug} AND status = 'published'
      LIMIT 1
    `;

    if (!row) return null;
    return {
      ...(row as any),
      tags: parseJson<string[]>(row.tags as string, []),
      content_images: parseJson<string[]>(row.content_images as string, [])
    } as NewsArticle;
  },

  findById: async (id: string): Promise<NewsArticle | null> => {
    if (isMockDataMode()) {
       const locale = id.startsWith('ja-') ? 'ja' : 'vi';
       const sourceId = id.replace(/^(vi|ja)-/, '');
       const article = newsArticles.find(a => a.id === sourceId);
       if (!article) return null;
       return adapters.toDbNewsArticle(article, locale) as NewsArticle;
    }

    const [row] = await sql`SELECT * FROM news_articles WHERE id = ${id}`;
    if (!row) return null;
    return {
      ...(row as any),
      tags: parseJson<string[]>(row.tags as string, []),
      content_images: parseJson<string[]>(row.content_images as string, [])
    } as NewsArticle;
  },

  create: async (data: Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>): Promise<NewsArticle> => {
    const id = crypto.randomUUID();
    const now = new Date();
    const publishedAt = data.status === 'published' ? now : null;

    await sql`
      INSERT INTO news_articles (id, title, slug, content, excerpt, thumbnail_url, content_images, author_name, author_role, tags, status, views, published_at, created_at, updated_at)
      VALUES (
        ${id}, ${data.title}, ${data.slug}, ${data.content}, ${data.excerpt},
        ${data.thumbnail_url ?? null}, ${stringifyJson(data.content_images || [])}, ${data.author_name ?? ''}, ${data.author_role ?? null},
        ${stringifyJson(data.tags)}, ${data.status}, ${data.views || 0}, ${publishedAt}, ${now}, ${now}
      )
    `;

    return { ...data, id, views: data.views || 0, created_at: now.toISOString(), updated_at: now.toISOString() };
  },

  update: async (id: string, data: Partial<NewsArticle>): Promise<boolean> => {
    const now = new Date();
    const updates: string[] = [];
    const values: any[] = [];

    if (data.title !== undefined) { updates.push('title'); values.push(data.title); }
    if (data.slug !== undefined) { updates.push('slug'); values.push(data.slug); }
    if (data.content !== undefined) { updates.push('content'); values.push(data.content); }
    if (data.excerpt !== undefined) { updates.push('excerpt'); values.push(data.excerpt); }
    if (data.thumbnail_url !== undefined) { updates.push('thumbnail_url'); values.push(data.thumbnail_url); }
    if (data.content_images !== undefined) { updates.push('content_images'); values.push(stringifyJson(data.content_images)); }
    if (data.author_name !== undefined) { updates.push('author_name'); values.push(data.author_name); }
    if (data.author_role !== undefined) { updates.push('author_role'); values.push(data.author_role); }
    if (data.tags !== undefined) { updates.push('tags'); values.push(stringifyJson(data.tags)); }
    if (data.status !== undefined) {
      updates.push('status');
      values.push(data.status);
      if (data.status === 'published') {
        updates.push('published_at');
        values.push(now);
      }
    }

    if (updates.length === 0) return false;

    updates.push('updated_at');
    values.push(now);
    values.push(id);

    const setClause = updates.map(f => `${f} = ?`).join(', ');
    const result = await sql.unsafe(`UPDATE news_articles SET ${setClause} WHERE id = $1 RETURNING id`, values);

    return result.count > 0;
  },

  delete: async (id: string): Promise<boolean> => {
    const result = await sql`DELETE FROM news_articles WHERE id = ${id}`;
    return result.count > 0;
  },

  incrementViews: async (id: string): Promise<void> => {
    await sql`UPDATE news_articles SET views = views + 1 WHERE id = ${id}`;
  }
};

function stringifyJson(data: any): string {
  return JSON.stringify(data);
}
