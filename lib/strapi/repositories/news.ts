import { strapiClient } from '../client';
import { isStrapiDataMode } from '../../config/data-source';
import { NewsArticle } from '../../db/types';

export const newsRepository = {
  async findAllPublished(locale: string = 'vi'): Promise<NewsArticle[]> {
    if (!isStrapiDataMode()) return [];
    const response = await strapiClient.get<{ data: any[] }>('articles', {
      'filters[status][$eq]': 'published',
      'locale': locale,
    });
    return response.data.map(mapToArticle);
  },

  async findBySlug(slug: string, locale: string = 'vi'): Promise<NewsArticle | null> {
    if (!isStrapiDataMode()) return null;
    const response = await strapiClient.get<{ data: any[] }>(
      `articles?filters[slug][$eq]=${slug}&locale=${locale}&pagination[limit]=1`
    );
    if (!response.data?.[0]) return null;
    return mapToArticle(response.data[0]);
  },

  async findById(id: string): Promise<NewsArticle | null> {
    if (!isStrapiDataMode()) return null;
    const response = await strapiClient.get<{ data: any }>(`articles/${id}`);
    if (!response.data) return null;
    return mapToArticle(response.data);
  },
};

function mapToArticle(item: any): NewsArticle {
  return {
    id: item.documentId,
    title: item.title,
    slug: item.slug,
    content: item.body || '',
    excerpt: item.excerpt || '',
    thumbnail_url: item.coverImage?.url || null,
    content_images: [],
    author_name: item.author || '',
    author_role: null,
    tags: item.tags || [],
    status: item.status || 'published',
    views: 0,
    created_at: item.createdAt || new Date().toISOString(),
    updated_at: item.updatedAt || new Date().toISOString(),
    published_at: item.publishedAt || null,
  };
}