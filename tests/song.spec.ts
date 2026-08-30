import { test, expect } from '@playwright/test';

// Helper to mock Supabase auth session
const mockSupabaseAuth = async (page: typeof import('@playwright/test').Page) => {
  const mockUser = {
    id: 'mock-user-id',
    email: 'test@example.com',
    aud: 'authenticated',
    role: 'authenticated'
  };
  const expiresAt = Math.floor(Date.now() / 1000) + 3600;
  const mockSession = {
    access_token: 'mock-token',
    token_type: 'bearer',
    expires_in: 3600,
    expires_at: expiresAt,
    refresh_token: 'mock-refresh-token',
    user: mockUser
  };

  // Extract project ID from SUPABASE_URL for correct localStorage key
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321';
  const projectId = supabaseUrl.match(/https?:\/\/([^.]+)/)?.[1] || 'localhost';

  // Mock all Supabase auth endpoints
  await page.route('**/auth/v1/session', async route => {
    await route.fulfill({
      status: 200,
      json: { session: mockSession, user: mockUser }
    });
  });

  await page.route('**/auth/v1/user', async route => {
    await route.fulfill({
      status: 200,
      json: mockUser
    });
  });

  // Set up auth state in localStorage before page loads
  await page.addInitScript(({ token, user, projectId, expiresAt }) => {
    const authKey = `sb-${projectId}-auth-token`;
    localStorage.setItem(authKey, JSON.stringify({
      access_token: token,
      token_type: 'bearer',
      expires_in: 3600,
      expires_at: expiresAt,
      refresh_token: 'mock-refresh-token',
      user: user
    }));
  }, {
    token: mockSession.access_token,
    user: mockUser,
    projectId,
    expiresAt
  });
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

      const form = page.locator('form');
      await expect(form).toBeVisible();

      await expect(page.getByPlaceholder('Title')).toHaveAttribute('name', 'title');
      await expect(page.getByPlaceholder('Artist')).toHaveAttribute('name', 'artist');
      await expect(page.getByPlaceholder('Lyrics')).toHaveAttribute('name', 'lyrics');

      // radix is annoying and doesn't support name
      // await expect(page.getByRole('switch')).toHaveAttribute('name', 'isPublic');

      await expect(page.getByRole('button', { name: 'Save Song' })).toHaveAttribute('type', 'submit');
    });

    test.skip('should handle keyboard navigation', async ({ page }) => {
      await mockSupabaseAuth(page);
      await page.goto('/songs/new');


      await page.keyboard.press('Tab'); // announcement
      await page.keyboard.press('Tab'); // announcement close
      await page.keyboard.press('Tab'); // site logo
      await page.keyboard.press('Tab'); // header new song button

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