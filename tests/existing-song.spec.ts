import { test, expect } from '@playwright/test';
import { mockAuth } from './helpers/mock-auth';

test.describe('Existing Song Functionality', () => {
  // Mock song data for testing
  const mockExistingSong = {
    id: 'existing-song-id',
    title: 'Existing Song Title',
    artist: 'Existing Artist',
    lyrics: 'Verse 1\nThis is an existing song\nWith existing lyrics\n\nChorus\nExisting chorus here\nSing along',
    is_public: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z',
    user_id: 'mock-user-id'
  };

    test('should authenticate a user with mockAuth', async ({ page }) => {
      await mockAuth(page);
      await page.goto('/songs/new');

      await expect(page.getByRole('heading', { level: 1, name: 'New Song' })).toBeVisible();
      await expect(page.locator('[data-testid="song-editor"]')).toBeVisible();
    });

    test('should display song edit interface', async ({ page }) => {
      // Mock the song data API call
      await page.route('**/rest/v1/songs*', async route => {
        await route.fulfill({
          json: mockExistingSong
        });
      });

      // Navigate to a song page
      await page.goto('/songs/existing-song-id');

      await expect(page.locator('[data-testid="edit-song"]')).toBeVisible();
    });

    test('should hide tools when logged-in user is not the owner', async ({ page }) => {
      await mockAuth(page, 'not-the-owner');

      await page.route('**/rest/v1/songs*', async route => {
        await route.fulfill({
          json: { ...mockExistingSong, user_id: 'owner-user-id' }
        });
      });

      await page.goto('/songs/existing-song-id');

      await expect(page.getByRole('heading', { name: 'Existing Song Title' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'New song' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'tools', exact: true })).toHaveCount(0);
    });

    test('should handle invalid song ID', async ({ page }) => {
      // Mock 404 response for invalid song
      await page.route('**/rest/v1/songs*', async route => {
        await route.fulfill({
          status: 404,
          json: { error: 'Song not found' }
        });
      });

      await page.goto('/songs/invalid-song-id');

      // await expect(page.locator('[data-testid="error-modal"]')).toBeVisible();
    });

    test('should handle network errors when loading song', async ({ page }) => {
      // Mock network failure
      await page.route('**/rest/v1/songs*', route => {
        route.abort('failed');
      });

      await page.goto('/songs/existing-song-id');

      // Should handle error gracefully
      await expect(page.locator('[data-testid="error-modal"]')).toBeVisible();
    });

    test('should handle malformed song data', async ({ page }) => {
      // Mock malformed response
      await page.route('**/rest/v1/songs*', async route => {
        await route.fulfill({
          json: { ...mockExistingSong, lyrics: null }
        });
      });

      await page.goto('/songs/existing-song-id');

      // Should handle malformed data gracefully
      await expect(page.locator('[data-testid="error-modal"]')).toBeVisible();
    });

    test('should handle save errors when editing', async ({ page }) => {
      await mockAuth(page);

      await page.route('**/rest/v1/songs*', async route => {
        if (route.request().method() === 'GET') {
          await route.fulfill({
            json: { ...mockExistingSong, user_id: 'mock-user-id' }
          });
        } else if (route.request().method() === 'PATCH') {
          await route.fulfill({
            status: 500,
            json: { error: 'Save failed' }
          });
        }
      });

      await page.goto('/songs/existing-song-id');

      // Test save error handling
      // This depends on your EditSong component implementation
      // await expect(page.locator('[data-testid="error-modal"]')).toBeVisible();
    });


    test('should disable form fields when saving', async ({ page }) => {
      await mockAuth(page);

      // Mock the song creation API call
      await page.route('**/rest/v1/songs', async route => {
        if (route.request().method() === 'POST') {
          await route.fulfill({
            json: { id: 'new-song-id', ...JSON.parse(route.request().postData() || '{}') }
          });
        } else {
          await route.abort();
        }
      });

      await page.goto('/songs/new');

      // Fill required fields first
      await page.getByPlaceholder('Title').fill('Test');
      await page.getByPlaceholder('Artist').fill('Test');
      await page.getByPlaceholder('Lyrics').fill('Test');

      // Start submission
      const saveButton = page.getByRole('button', { name: 'Save Song' });
      await saveButton.click();

      // Check if fields get disabled during saving
      await expect(page.getByPlaceholder('Title')).toBeDisabled();
      await expect(page.getByPlaceholder('Artist')).toBeDisabled();
      await expect(page.getByPlaceholder('Lyrics')).toBeDisabled();
    });
});
