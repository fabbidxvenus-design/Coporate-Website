import { describe, test, expect } from 'vitest';
import { handleRevalidate } from '@/app/api/revalidate';

describe('Revalidate API', () => {
  test('should return success in mock mode (no Payload configured)', async () => {
    // In mock mode (no PAYLOAD_SECRET), handleRevalidate returns success JSON
    const result = await handleRevalidate({ path: '/test' });
    expect(result).toBeDefined();
    expect(result.status).toBe(200);
  });
});