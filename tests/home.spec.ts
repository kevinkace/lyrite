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

test.describe('Home Page Content', () => {
  test('has home-usp, has 2 CTAs, and has featured songs', async ({ page }) => {
    await page.goto('/');

    const homeUsp = page.getByTestId('home-usp');
    await expect(homeUsp).toBeVisible();

    const newSongCta = page.getByTestId('home-new-song-cta');
    await expect(newSongCta).toBeVisible();
    await expect(newSongCta).toHaveAttribute('href', '/songs/new');

    const createAccountCta = page.getByTestId('home-create-account-cta');
    await expect(createAccountCta).toBeVisible();
    await expect(createAccountCta).toHaveAttribute('href', '/login');

    const featuredSongs = page.getByTestId('home-featured-songs');
    await expect(featuredSongs).toBeVisible();
  });
});