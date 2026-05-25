import { describe, it, expect } from 'vitest';
import { getCmsDashboardMetrics, getCmsActivities } from '../../lib/cms/data-source';

describe('CMS Activity & Metrics [RED]', () => {
  it('AC-01: dashboard metrics should be derived from data', () => {
    const metrics = getCmsDashboardMetrics();
    expect(metrics).toBeDefined();
    // Failing: Should check against derived counts, not hardcoded placeholders
    expect(metrics.totalJobs).toBeGreaterThan(0);
  });

  it('AC-03: activities should contain stable entity metadata', () => {
    const activities = getCmsActivities();
    expect(activities.length).toBeGreaterThan(0);
    const item = activities[0];
    expect(item).toHaveProperty('entityId');
    expect(item).toHaveProperty('actor');
    expect(item.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });
});
