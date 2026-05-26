import { describe, test, expect } from 'vitest';
import { handleRevalidate } from '@/app/api/revalidate';

describe('Revalidate API', () => {
  test('should fail when Strapi is not reachable', async () => {
    // This test should fail until revalidate API is implemented to use Strapi
    await expect(handleRevalidate({ path: '/test' })).rejects.toThrow();
  });
});
