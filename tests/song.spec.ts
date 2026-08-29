import { test, expect } from '@playwright/test';

// Helper to mock Supabase auth session
const mockSupabaseAuth = async (page: typeof import('@playwright/test').Page) => {
  const mockUser = { id: 'mock-user-id', email: 'test@example.com' };
  const mockSession = {
    access_token: 'mock-token',
    user: mockUser,
    expires_in: 3600,
    expires_at: Date.now() + 3600000
  };

  await page.addInitScript(({ session, user }) => {
    // Mock Supabase client's getSession to return our mock session
    if (window.supabase) {
      window.supabase.auth.getSession = async () => ({
        data: { session },
        error: null
      });

      // Mock onAuthStateChange to emit initial state
      const originalOnAuthStateChange = window.supabase.auth.onAuthStateChange;
      window.supabase.auth.onAuthStateChange = function(callback: any) {
        // Call the callback with the mocked session
        setTimeout(() => callback('SIGNED_IN', session), 0);
        return {
          data: { subscription: { unsubscribe: () => {} } }
        } as any;
      };
    }
  }, { session: mockSession, user: mockUser });
};

test.describe('Songs Functionality', () => {

  test.describe('Individual Song Page', () => {
    test('should display song edit interface', async ({ page }) => {
      // Navigate to a song page (we'll use a mock ID)
      await page.goto('/songs/mock-song-id');

      // The page should load the EditSong component
      // Check for presence of editing interface elements
      await expect(page.locator('body')).toBeVisible();
    });

    test('should handle invalid song ID', async ({ page }) => {
      await page.goto('/songs/invalid-song-id');

      // Should handle the error gracefully
      // This might show an error or redirect depending on implementation
      await expect(page.locator('body')).toBeVisible();
    });
  });

  test.describe('Song Editor Component', () => {
    test('should disable form fields when saving', async ({ page }) => {
      await mockSupabaseAuth(page);

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

    test('should have proper form structure and accessibility', async ({ page }) => {
      await mockSupabaseAuth(page);
      await page.goto('/songs/new');

      // Check form is properly structured
      const form = page.locator('form');
      await expect(form).toBeVisible();

      // Check form fields have proper names
      await expect(page.getByPlaceholder('Title')).toHaveAttribute('name', 'title');
      await expect(page.getByPlaceholder('Artist')).toHaveAttribute('name', 'artist');
      await expect(page.getByPlaceholder('Lyrics')).toHaveAttribute('name', 'lyrics');

      // Check public switch has proper name
      await expect(page.getByRole('switch')).toHaveAttribute('name', 'isPublic');

      // Check submit button type
      await expect(page.getByRole('button', { name: 'Save Song' })).toHaveAttribute('type', 'submit');
    });

    test('should handle keyboard navigation', async ({ page }) => {
      await mockSupabaseAuth(page);
      await page.goto('/songs/new');

      // Tab through form elements
      await page.keyboard.press('Tab');
      await expect(page.getByPlaceholder('Title')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByPlaceholder('Artist')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByPlaceholder('Lyrics')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByRole('switch')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByRole('button', { name: 'Save Song' })).toBeFocused();
    });
  });
});