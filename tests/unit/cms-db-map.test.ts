import { describe, it, expect } from 'vitest';
import { cmsDatabaseUsageMap } from '../../lib/cms/mock-data';

describe('CMS Database Usage Map [RED]', () => {
  it('AC-06: marks persisted surfaces correctly', () => {
    expect(cmsDatabaseUsageMap.jobs.databaseRequired).toBe(true);
    expect(cmsDatabaseUsageMap.applications.databaseRequired).toBe(true);
    expect(cmsDatabaseUsageMap.news.databaseRequired).toBe(true);
    expect(cmsDatabaseUsageMap.settings.databaseRequired).toBe(true);
    expect(cmsDatabaseUsageMap.activityLog.databaseRequired).toBe(true);
  });

  it('AC-07: presentation-only summaries are recomputable', () => {
    expect(cmsDatabaseUsageMap.dashboard.databaseRequired).toBe(false);
  });
});