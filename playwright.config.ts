import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', {open: 'never'}]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  // The developer starts the app; tests never start or stop an app server.
  projects: [
    { name: 'desktop', use: {...devices['Desktop Chrome']} },
    { name: 'mobile', use: {...devices['Pixel 7'], defaultBrowserType: 'chromium'} },
  ],
});
