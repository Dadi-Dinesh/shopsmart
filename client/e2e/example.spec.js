import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/ShopSmart/);
});

test('shows mocked backend status', async ({ page }) => {
    // Mock the api/health endpoint
    await page.route('*/**/api/health', async route => {
        const json = {
            status: 'ok',
            message: 'Playwright Mocked Response',
            timestamp: new Date().toISOString()
        };
        await route.fulfill({ json });
    });

    await page.goto('/');

    // Expect the page to show the mocked data
    await expect(page.locator('h1')).toHaveText('ShopSmart');
    await expect(page.locator('.card h2')).toHaveText('Backend Status');
    await expect(page.getByText('Status:')).toBeVisible();
    await expect(page.getByText('ok')).toBeVisible();
    await expect(page.getByText('Playwright Mocked Response')).toBeVisible();
});
