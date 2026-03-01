import { test, expect } from '@playwright/test';

test.describe('Header', () => {
  test('should have logo, logo should be a link, and should have login button', async ({ page }) => {
    await page.goto('/');

    const logoLink = page.getByTestId('header-logo-link');

    await expect(logoLink).toBeVisible();
    await expect(logoLink).toContainText('lyrite');
    await expect(logoLink).toHaveAttribute('href', '/');

    // Check that login button exists and is visible
    const loginButton = page.getByTestId('header-login-button');

    await expect(loginButton).toBeVisible();
    await expect(loginButton).toContainText('Login');
    await expect(loginButton).toHaveAttribute('href', '/login');
  });
});