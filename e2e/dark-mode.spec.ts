import { test, expect } from '@playwright/test';

test.describe('Dark Mode Toggle', () => {
  const pages = [
    { path: '/', name: 'Homepage' },
    { path: '/about', name: 'About' },
    { path: '/contact', name: 'Contact' },
    { path: '/services', name: 'Services' },
    { path: '/portfolio', name: 'Portfolio' },
    { path: '/pricing', name: 'Pricing' },
  ];

  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  for (const { path, name } of pages) {
    test(`should toggle dark mode on ${name}`, async ({ page }) => {
      await page.goto(path);

      // Wait for page to be ready
      await page.waitForLoadState('networkidle');

      // Verify page starts in light mode
      const htmlElement = page.locator('html');
      await expect(htmlElement).not.toHaveClass(/dark/);

      // Find and click the theme toggle button
      const toggleButton = page.locator('button[aria-label*="dark mode"]');
      await expect(toggleButton).toBeVisible();
      await toggleButton.click();

      // Verify dark class was added
      await expect(htmlElement).toHaveClass(/dark/);

      // Verify localStorage was set
      const theme = await page.evaluate(() => localStorage.getItem('onesquad-theme'));
      expect(theme).toBe('dark');

      // Verify background color changed
      const bodyColor = await page.evaluate(() => {
        return window.getComputedStyle(document.body).backgroundColor;
      });
      // Dark mode body should have rgb(10, 22, 40) which is #0a1628
      expect(bodyColor).toContain('rgb(10, 22, 40)');

      // Click toggle again to switch back to light
      await toggleButton.click();
      await expect(htmlElement).not.toHaveClass(/dark/);

      const themeAfter = await page.evaluate(() => localStorage.getItem('onesquad-theme'));
      expect(themeAfter).toBe('light');
    });
  }

  test('should prevent FOUC when dark mode is saved', async ({ page }) => {
    // First, set dark mode
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const toggleButton = page.locator('button[aria-label*="dark mode"]');
    await toggleButton.click();

    // Verify dark mode is active
    const htmlElement = page.locator('html');
    await expect(htmlElement).toHaveClass(/dark/);

    // Refresh the page
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Check that .dark class is present immediately (inline script applied it)
    const hasDarkClass = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    expect(hasDarkClass).toBe(true);

    // Verify no white background flash - body should have dark background
    const bodyColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    expect(bodyColor).toContain('rgb(10, 22, 40)');
  });
});
