export const getStrapiConfig = () => ({
  url: process.env.STRAPI_URL || 'http://localhost:1337',
  token: process.env.STRAPI_API_TOKEN || '',
});
