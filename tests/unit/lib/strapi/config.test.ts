import { getStrapiConfig } from '@/lib/strapi/config';

describe('Strapi Config', () => {
  it('should return config with defaults', () => {
    const config = getStrapiConfig();
    expect(config.url).toBeDefined();
    expect(config.token).toBeDefined();
  });
});
