import { test, expect } from '@playwright/test';

test.describe('Product Browsing', () => {
    test('should allow browsing products and viewing details', async ({ page }) => {
        page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

        await page.goto('/');

        await expect(page.locator('h2:has-text("Featured Products")')).toBeVisible({ timeout: 15000 });

        const featuredSection = page.locator('section:has-text("Featured Products")');
        const firstProduct = featuredSection.locator('.group').first();

        await firstProduct.waitFor({ state: 'visible', timeout: 15000 });
        await firstProduct.click();

        await expect(page).toHaveURL(/\/product\/.*/, { timeout: 15000 });
        await expect(page.locator('button:has-text("Add to Cart")')).toBeVisible();
    });
});
