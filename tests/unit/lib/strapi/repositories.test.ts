import { jobsRepository } from '@/lib/strapi/repositories';

describe('Jobs Repository', () => {
  it('should return empty array when not in strapi mode', async () => {
    const jobs = await jobsRepository.findAllPublished();
    expect(jobs).toEqual([]);
  });
});
