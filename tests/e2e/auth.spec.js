import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
    test.beforeEach(async ({ page }) => {
        page.on('console', msg => {
            if (msg.type() === 'error' || msg.type() === 'warning') {
                console.log(`BROWSER ${msg.type().toUpperCase()}:`, msg.text());
            }
        });
    });

    async function checkErrors(page) {
        const errorDiv = page.locator('.bg-destructive\\/10');
        if (await errorDiv.isVisible()) {
            const errorText = await errorDiv.innerText();
            console.log('UI ERROR DISPLAYED:', errorText);
            return errorText;
        }
        return null;
    }

    test('should allow a user to register and see the home page', async ({ page }) => {
        test.setTimeout(120000);

        const timestamp = Date.now();
        const email = `e2e-reg-${timestamp}@example.com`;

        // Wait for networkidle to ensure everything is loaded
        await page.goto('/signin', { waitUntil: 'networkidle' });

        // Ensure we are in Customer mode (default)
        await page.getByRole('button', { name: /Customer/i }).click();

        // Click Register tab
        // There might be multiple "Register" texts, let's be specific to the tab button
        await page.getByRole('button', { name: 'Register', exact: true }).click();

        await page.fill('input[name="name"]', 'E2E User');
        await page.fill('input[name="email"]', email);
        await page.fill('input[name="password"]', 'password123');

        // Click the submit button
        const submitBtn = page.getByRole('button', { name: /Create Free Account/i });
        await submitBtn.click();

        await checkErrors(page);

        // Navigation can be slow with cloud DB
        await expect(page).toHaveURL('/', { timeout: 60000 });

        // User menu should be visible (Avatar button)
        const avatarBtn = page.locator('.h-9.w-9.rounded-full').first();
        await expect(avatarBtn).toBeVisible({ timeout: 20000 });
    });

    test('should allow a user to login', async ({ page }) => {
        test.setTimeout(120000);

        const timestamp = Date.now();
        const email = `e2e-log-${timestamp}@example.com`;
        const password = 'password123';

        // 1. Register a user first to have something to log in with
        await page.goto('/signin', { waitUntil: 'networkidle' });
        await page.getByRole('button', { name: 'Register', exact: true }).click();
        await page.fill('input[name="name"]', 'Login User');
        await page.fill('input[name="email"]', email);
        await page.fill('input[name="password"]', password);
        await page.getByRole('button', { name: /Create Free Account/i }).click();
        await expect(page).toHaveURL('/', { timeout: 60000 });

        // 2. Logout
        const avatarBtn = page.locator('.h-9.w-9.rounded-full').first();
        await avatarBtn.click();
        await page.getByRole('menuitem', { name: /Log out/i }).click();
        await expect(page.getByRole('link', { name: /Sign In/i })).toBeVisible();

        // 3. Login
        await page.goto('/signin', { waitUntil: 'networkidle' });
        await page.fill('input[name="email"]', email);
        await page.fill('input[name="password"]', password);
        await page.getByRole('button', { name: /Sign In Now/i }).click();

        await checkErrors(page);

        await expect(page).toHaveURL('/', { timeout: 45000 });
        await expect(page.locator('.h-9.w-9.rounded-full').first()).toBeVisible();
    });
});
