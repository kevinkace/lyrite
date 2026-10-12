import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'node:crypto';
import { mockAuth } from './helpers/mock-auth';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Song route tests require NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function findPublicSong() {
  const { data, error } = await supabase
    .from('songs')
    .select('id, title')
    .eq('is_public', true)
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
}

test.describe('Song routes', () => {
    test('should authenticate a user with mockAuth', async ({ page }) => {
      await mockAuth(page);
      await page.goto('/songs/new');

      await expect(page.getByRole('heading', { level: 1, name: 'New Song' })).toBeVisible();
      await expect(page.locator('[data-testid="song-editor"]')).toBeVisible();
    });

    test('should render a public song loaded on the server', async ({ page }) => {
      const song = await findPublicSong();
      if (!song) {
        test.skip(true, 'Requires at least one public song in the test Supabase project');
        return;
      }
      const response = await page.goto(`/songs/${song.id}`);

      expect(response?.status()).toBe(200);
      await expect(page.locator('[data-testid="edit-song"]')).toBeVisible();
    });

    test('should hide tools for a non-owner of a public song', async ({ page }) => {
      const song = await findPublicSong();
      if (!song) {
        test.skip(true, 'Requires at least one public song in the test Supabase project');
        return;
      }
      await mockAuth(page, 'not-the-owner');

      await page.goto(`/songs/${song.id}`);

      await expect(page.getByRole('heading', { name: song.title })).toBeVisible();
      await expect(page.getByRole('link', { name: 'New song' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'tools', exact: true })).toHaveCount(0);
    });

    test('should handle invalid song ID', async ({ page }) => {
      const response = await page.goto('/songs/laskdjf');

      expect(response?.status()).toBe(404);
      await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
      await expect(page.getByText('404', { exact: true })).toBeVisible();
      await expect(page.locator('[data-testid="error-modal"]')).toHaveCount(0);
    });

    test('should show 404 for a valid UUID with no matching song', async ({ page }) => {
      const response = await page.goto(`/songs/${randomUUID()}`);

      expect(response?.status()).toBe(404);
      await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
      await expect(page.getByText('404', { exact: true })).toBeVisible();
      await expect(page.locator('[data-testid="error-modal"]')).toHaveCount(0);
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
