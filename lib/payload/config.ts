/**
 * Payload CMS configuration.
 * Only loaded when isPayloadDataMode() is true.
 */

export interface PayloadConfig {
  secret: string;
  url: string;
  collections: {
    jobs: string;
    articles: string;
    applications: string;
    media: string;
    siteSettings: string;
    aboutPages: string;
  };
}

export function getPayloadConfig(): PayloadConfig {
  const secret = process.env.PAYLOAD_SECRET;
  if (!secret) {
    throw new Error(
      'PAYLOAD_SECRET is not configured. ' +
      'Set PAYLOAD_SECRET in .env.local to enable Payload CMS mode. ' +
      'Alternatively, set USE_MOCK_DATA=true for local development without CMS.'
    );
  }

  const url = process.env.PAYLOAD_URL ?? 'http://localhost:3000';

  return {
    secret,
    url,
    collections: {
      jobs: process.env.PAYLOAD_COLLECTION_JOBS ?? 'jobs',
      articles: process.env.PAYLOAD_COLLECTION_ARTICLES ?? 'articles',
      applications: process.env.PAYLOAD_COLLECTION_APPLICATIONS ?? 'applications',
      media: process.env.PAYLOAD_COLLECTION_MEDIA ?? 'media',
      siteSettings: process.env.PAYLOAD_COLLECTION_SITE_SETTINGS ?? 'site-settings',
      aboutPages: process.env.PAYLOAD_COLLECTION_ABOUT_PAGES ?? 'about-pages',
    },
  };
}

export function isPayloadDataMode(): boolean {
  const useMockData = process.env.USE_MOCK_DATA;
  const payloadSecret = process.env.PAYLOAD_SECRET;
  return useMockData !== 'true' && !!payloadSecret;
}