import { test, expect } from '@playwright/test';

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