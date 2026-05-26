/**
 * Payload news/articles repository.
 * Returns mock data when USE_MOCK_DATA=true (data-source mode 'mock').
 */

import { isMockDataMode } from '@/lib/config/data-source';
import type { PayloadNewsArticleDoc } from '../types';
import type { NewsArticle, NewsFilter } from '@/lib/db/types';
import { newsArticles as mockNewsArticles, getTranslation } from '@/lib/mock-data';

function payloadArticleToDb(payloadArticle: PayloadNewsArticleDoc, locale: string): NewsArticle {
  const localeKey = locale as 'vi' | 'ja';
  return {
    id: payloadArticle.id,
    slug: payloadArticle.slug,
    title: payloadArticle.title[localeKey] || payloadArticle.title.vi,
    content: payloadArticle.body[localeKey] || payloadArticle.body.vi,
    excerpt: payloadArticle.excerpt[localeKey] || payloadArticle.excerpt.vi,
    author_name: payloadArticle.author[localeKey] || payloadArticle.author.vi,
    author_role: null,
    tags: payloadArticle.tags,
    category: payloadArticle.category,
    thumbnail_url: payloadArticle.cover_image?.url || null,
    content_images: payloadArticle.content_images?.map(i => i.url) || null,
    status: payloadArticle.status,
    views: 0,
    published_at: payloadArticle.published_at,
    created_at: payloadArticle.createdAt,
    updated_at: payloadArticle.updatedAt,
    cover_image_url: payloadArticle.cover_image?.url || null,
  };
}

export const payloadNewsRepository = {
  findAllPublished: async (locale = 'vi'): Promise<NewsArticle[]> => {
    if (isMockDataMode()) {
      return mockNewsArticles
        .filter(n => n.status === 'published')
        .map(n => ({
          id: n.id,
          slug: n.slug,
          title: getTranslation(n.title, locale),
          content: getTranslation(n.body, locale),
          excerpt: getTranslation(n.excerpt, locale),
          author_name: getTranslation(n.author, locale),
          author_role: null,
          tags: n.tags,
          category: n.category,
          thumbnail_url: n.cover_image,
          content_images: n.content_images || null,
          status: n.status,
          views: 0,
          published_at: n.published_at,
          created_at: n.published_at,
          updated_at: n.published_at,
          cover_image_url: n.cover_image,
        }));
    }

    const { initPayloadClient } = await import('../client');
    const client = await initPayloadClient();
    const config = (await import('../config')).getPayloadConfig();

    const { docs } = await client.find({
      collection: config.collections.articles,
      where: { status: { equals: 'published' } },
      depth: 0,
    });

    return (docs as PayloadNewsArticleDoc[]).map(d => payloadArticleToDb(d, locale));
  },

  findBySlug: async (slug: string, locale = 'vi'): Promise<NewsArticle | null> => {
    if (isMockDataMode()) {
      const article = mockNewsArticles.find(n => n.slug === slug && n.status === 'published');
      if (!article) return null;
      return {
        id: article.id,
        slug: article.slug,
        title: getTranslation(article.title, locale),
        content: getTranslation(article.body, locale),
        excerpt: getTranslation(article.excerpt, locale),
        author_name: getTranslation(article.author, locale),
        author_role: null,
        tags: article.tags,
        category: article.category,
        thumbnail_url: article.cover_image,
        content_images: article.content_images || null,
        status: article.status,
        views: 0,
        published_at: article.published_at,
        created_at: article.published_at,
        updated_at: article.published_at,
        cover_image_url: article.cover_image,
      };
    }

    const { initPayloadClient } = await import('../client');
    const client = await initPayloadClient();
    const config = (await import('../config')).getPayloadConfig();

    const doc = await client.find({
      collection: config.collections.articles,
      where: { slug: { equals: slug }, status: { equals: 'published' } },
      depth: 0,
      limit: 1,
    }).then((r: { docs: PayloadNewsArticleDoc[] }) => r.docs[0] || null);

    if (!doc) return null;
    return payloadArticleToDb(doc as PayloadNewsArticleDoc, locale);
  },

  findById: async (id: string): Promise<NewsArticle | null> => {
    if (isMockDataMode()) return null;

    const { initPayloadClient } = await import('../client');
    const client = await initPayloadClient();
    const config = (await import('../config')).getPayloadConfig();

    const doc = await client.findByID({
      collection: config.collections.articles,
      id,
      depth: 0,
    }).catch(() => null);

    if (!doc) return null;
    return payloadArticleToDb(doc as PayloadNewsArticleDoc, 'vi');
  },

  create: async (data: Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>): Promise<NewsArticle> => {
    if (isMockDataMode()) {
      return { ...data, id: crypto.randomUUID(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as NewsArticle;
    }

    const { initPayloadClient } = await import('../client');
    const client = await initPayloadClient();
    const config = (await import('../config')).getPayloadConfig();

    const doc = await client.create({
      collection: config.collections.articles,
      data,
      depth: 0,
    });

    return doc as unknown as NewsArticle;
  },

  update: async (id: string, data: Partial<NewsArticle>): Promise<NewsArticle> => {
    if (isMockDataMode()) {
      return { ...data, id } as NewsArticle;
    }

    const { initPayloadClient } = await import('../client');
    const client = await initPayloadClient();
    const config = (await import('../config')).getPayloadConfig();

    const doc = await client.update({
      collection: config.collections.articles,
      id,
      data,
      depth: 0,
    });

    return doc as unknown as NewsArticle;
  },

  delete: async (id: string): Promise<void> => {
    if (isMockDataMode()) return;

    const { initPayloadClient } = await import('../client');
    const client = await initPayloadClient();
    const config = (await import('../config')).getPayloadConfig();

    await client.delete({
      collection: config.collections.articles,
      id,
    });
  },

  findAll: async (): Promise<NewsArticle[]> => {
    if (isMockDataMode()) {
      return mockNewsArticles.map(n => ({
        id: n.id,
        slug: n.slug,
        title: getTranslation(n.title, 'vi'),
        content: getTranslation(n.body, 'vi'),
        excerpt: getTranslation(n.excerpt, 'vi'),
        author_name: getTranslation(n.author, 'vi'),
        author_role: null,
        tags: n.tags,
        category: n.category,
        thumbnail_url: n.cover_image,
        content_images: n.content_images || null,
        status: n.status,
        views: 0,
        published_at: n.published_at,
        created_at: n.published_at,
        updated_at: n.published_at,
        cover_image_url: n.cover_image,
      }));
    }

    const { initPayloadClient } = await import('../client');
    const client = await initPayloadClient();
    const config = (await import('../config')).getPayloadConfig();

    const { docs } = await client.find({
      collection: config.collections.articles,
      depth: 0,
    });

    return (docs as PayloadNewsArticleDoc[]).map(d => payloadArticleToDb(d, 'vi'));
  },
};