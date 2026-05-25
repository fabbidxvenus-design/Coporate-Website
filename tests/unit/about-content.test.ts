import { describe, it, expect } from 'vitest';
import { getAboutContent } from '../../lib/api/about'; // This should fail if it doesn't exist

describe('getAboutContent', () => {
  it('should be defined', () => {
    expect(getAboutContent).toBeDefined();
  });

  it('should return content for vi locale', async () => {
    const content = await getAboutContent('vi');
    expect(content).toBeDefined();
    expect(content.title).toBeDefined();
  });

  it('should return fallback content for invalid locale', async () => {
    const content = await getAboutContent('invalid');
    expect(content).toBeDefined();
    expect(content.title).toBeDefined();
  });
});
