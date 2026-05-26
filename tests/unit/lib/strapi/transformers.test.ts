import { describe, it, expect } from 'vitest';
import { transformJob } from '@/lib/strapi/transformers';

describe('Strapi Transformers', () => {
  it('should filter out unpublished jobs', () => {
    const unpublishedJob = { status: 'draft', title: 'Draft Job' };
    // Red Gate: should fail as transformJob is not yet implemented
    expect(transformJob(unpublishedJob)).toBeNull();
  });
});
