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
        baseURL: 'http://localhost:5173',
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
            command: 'cd ../backend && npm run seed && PLAYWRIGHT=true npm start',
            url: 'http://localhost:5001/api/health',
            timeout: 300000,
            reuseExistingServer: false,
            env: {
                PORT: '5001',
                NODE_ENV: 'test',
                PLAYWRIGHT: 'true',
                MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/testdb'
            }
        },
        {
            command: 'cd ../frontend && npm run dev -- --host --port 5173 --strictPort',
            url: 'http://localhost:5173',
            timeout: 300000,
            reuseExistingServer: false,
        }
    ],
});
