import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    outputDir: './test-results',
    fullyParallel: false,
    workers: 1, // Run sequentially for stability
    forbidOnly: !!process.env.CI,
    retries: 1,
    reporter: [['html', { outputFolder: './playwright-report' }]],

    use: {
        baseURL: 'http://127.0.0.1:5173',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: [
        {
            command: 'cd ../backend && PLAYWRIGHT=true npm start',
            url: 'http://127.0.0.1:5001/api/health',
            timeout: 180000,
            reuseExistingServer: false,
            env: {
                PORT: '5001',
                NODE_ENV: 'test',
                PLAYWRIGHT: 'true',
                MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/testdb'
            }
        },
        {
            command: 'cd ../frontend && npm run dev -- --host',
            url: 'http://127.0.0.1:5173',
            timeout: 180000,
            reuseExistingServer: false,
        }
    ],
});
