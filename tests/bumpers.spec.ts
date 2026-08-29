import { test, expect } from '@playwright/test';

test.describe('Header', () => {
  test('should have logo, logo should be a link, and should have login button', async ({ page }) => {
    await page.goto('/');

    const logoLink = page.getByTestId('header-logo-link');

    await expect(logoLink).toBeVisible();
    await expect(logoLink).toContainText('Lyrite');
    await expect(logoLink).toHaveAttribute('href', '/');

    // Check that login button exists and is visible
    const loginButton = page.getByTestId('header-login-button');

    await expect(loginButton).toBeVisible();
    await expect(loginButton).toContainText('Login');
    await expect(loginButton).toHaveAttribute('href', '/login');
  });
});

test.describe('Footer', () => {
  test('has release notes, terms of service, privacy policy, and version', async ({ page }) => {
    await page.goto('/');

    // Check that footer exists and is visible
    const footer = page.getByTestId('footer');
    await expect(footer).toBeVisible();

    // Check release notes link
    const releaseNotesLink = page.getByTestId('footer-release-notes');
    await expect(releaseNotesLink).toBeVisible();
    await expect(releaseNotesLink).toContainText('Release Notes');
    await expect(releaseNotesLink).toHaveAttribute('href', '/docs/release-notes');

    // Check terms of service link
    const tosLink = page.getByTestId('footer-terms-of-service');
    await expect(tosLink).toBeVisible();
    await expect(tosLink).toContainText('Terms of Service');
    await expect(tosLink).toHaveAttribute('href', '/legal/terms-of-service');

    // Check privacy policy link
    const privacyLink = page.getByTestId('footer-privacy-policy');
    await expect(privacyLink).toBeVisible();
    await expect(privacyLink).toContainText('Privacy Policy');
    await expect(privacyLink).toHaveAttribute('href', '/legal/privacy-policy');

    // Check version link
    const versionLink = page.getByTestId('footer-version');
    await expect(versionLink).toBeVisible();
    await expect(versionLink).toContainText(/^v\d+\.\d+\.\d+/); // Matches version pattern like v1.2.3
    await expect(versionLink).toHaveAttribute('href', 'https://github.com/kevinkace/lyrite/tree/nextjs-supabase');
  });
});