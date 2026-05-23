import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/audit',
  testMatch: ['**/audit-fix-auth.spec.ts', '**/requirements.spec.ts'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3010',
  },
  projects: [
    {
      name: 'Desktop 1440px',
      use: {
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'Desktop 1920px',
      use: {
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
});