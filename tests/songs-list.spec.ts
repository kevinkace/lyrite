import { test, expect } from '@playwright/test';

test.describe('Songs List Page', () => {
  test('should load songs list page correctly', async ({ page }) => {
    await page.goto('/songs');

    // Check page loads with correct title
    await expect(page.getByRole('heading', { level: 1, name: 'Songs' })).toBeVisible();
  });

  test('should display correct page elements', async ({ page }) => {
    await page.goto('/songs');

    // Check that songs table headers are present
    await expect(page.getByText('Title')).toBeVisible();
    await expect(page.getByText('Artist')).toBeVisible();
    await expect(page.getByText('Lyrics')).toBeVisible();
    await expect(page.getByText('Created')).toBeVisible();
    await expect(page.getByText('Updated')).toBeVisible();

    // Check that song count is displayed
    await expect(page.getByText(/\d+ songs? total/)).toBeVisible();
  });

  test('should display song entries when songs exist', async ({ page }) => {
    // Mock some song data
    await page.route('**/rest/v1/songs*', async route => {
      await route.fulfill({
        json: [
          {
            id: '1',
            title: 'Test Song 1',
            artist: 'Test Artist 1',
            lyrics: 'Test lyrics 1',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            is_public: true
          }
        ]
      });
    });

    await page.goto('/songs');

    // Should show the mocked song data
    await expect(page.getByText('Test Song 1')).toBeVisible();
    await expect(page.getByText('Test Artist 1')).toBeVisible();
  });

  test('should have clickable song titles that navigate to song page', async ({ page }) => {
    // Mock song data with proper links
    await page.route('**/rest/v1/songs*', async route => {
      await route.fulfill({
        json: [
          {
            id: 'test-song-id',
            title: 'Clickable Song',
            artist: 'Test Artist',
            lyrics: 'Test lyrics',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            is_public: true
          }
        ]
      });
    });

    await page.goto('/songs');

    // Find song title link
    const songLink = page.getByRole('link', { name: 'Clickable Song' });
    await expect(songLink).toBeVisible();
    await expect(songLink).toHaveAttribute('href', '/songs/test-song-id');
  });

  test('should handle empty songs list', async ({ page }) => {
    await page.goto('/songs');

    // Should still show table structure even if empty
    await expect(page.getByText('Title')).toBeVisible();
    await expect(page.getByText('Artist')).toBeVisible();
    await expect(page.getByText('Lyrics')).toBeVisible();
  });
});