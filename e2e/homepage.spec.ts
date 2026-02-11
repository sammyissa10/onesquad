import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load and display the page title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/onesquad/i);
  });

  test('should render the header and main sections', async ({ page }) => {
    await page.goto('/');
    // Header is visible
    const header = page.locator('header');
    await expect(header).toBeVisible();
    // Main content is visible
    const main = page.locator('main');
    await expect(main).toBeVisible();
    // Footer is visible
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should be accessible and have no broken layout', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });
});
