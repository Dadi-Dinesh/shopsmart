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

test('shows mocked products', async ({ page }) => {
    // Mock the api/products endpoint
    await page.route('*/**/api/products', async route => {
        const json = [
            { id: 1, name: 'Playwright Headphones', price: 99.99, category: 'Electronics' },
            { id: 2, name: 'Playwright Shoes', price: 59.99, category: 'Sports' }
        ];
        await route.fulfill({ json });
    });

    await page.goto('/');

    // Expect the products to be displayed
    await expect(page.locator('.product-item')).toHaveCount(2);
    await expect(page.getByText('Playwright Headphones')).toBeVisible();
    await expect(page.getByText('Playwright Shoes')).toBeVisible();
});
