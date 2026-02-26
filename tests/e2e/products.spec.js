import { test, expect } from '@playwright/test';

test.describe('Product Browsing', () => {
    test('should allow browsing products and viewing details', async ({ page }) => {
        // Log console messages from the browser
        page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

        await page.goto('/');

        // Check if products section is loaded
        await expect(page.locator('h2:has-text("Featured Products")')).toBeVisible({ timeout: 15000 });

        // Find the first product card. Based on HomePage.jsx, they are inside the Featured Products section.
        // They are Card components inside the grid.
        const firstProduct = page.locator('section:has-text("Featured Products") .group').first();

        // Clicking the card should navigate
        await firstProduct.click();

        // Verify product details page
        await expect(page).toHaveURL(/\/product\/.*/, { timeout: 15000 });
        await expect(page.locator('button:has-text("Add to Cart")')).toBeVisible();
    });
});
