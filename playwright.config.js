// @ts-check
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  fullyParallel: true,
  retries: 1,
  workers: 1,
  timeout:90000,
  reporter: [['html',{open:'never'}]],
  projects: [
    {
      name: 'chrome',
      testDir: './tests/',
      use: {
        ...devices['Desktop Chrome'],
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
      }
    }
  ],
});