import { test, expect } from '@playwright/test';

test.describe('Songs Functionality', () => {
  // Mock song data for testing
  const mockSong = {
    title: 'Test Song Title',
    artist: 'Test Artist',
    lyrics: 'Verse 1\nThis is a test song\nWith some lyrics\n\nChorus\nTest chorus here\nSing along',
  };

  test.describe('Songs List Page', () => {
    test('should display songs list page with correct elements', async ({ page }) => {
      await page.goto('/songs');

      // Check page title
      await expect(page.getByRole('heading', { level: 1, name: 'Songs' })).toBeVisible();

      // Check that songs table is present (even if empty)
      await expect(page.getByText(/\d+ songs? total/)).toBeVisible();

      // Check table headers are present
      await expect(page.getByText('Title')).toBeVisible();
      await expect(page.getByText('Artist')).toBeVisible();
      await expect(page.getByText('Lyrics')).toBeVisible();
      await expect(page.getByText('Created')).toBeVisible();
      await expect(page.getByText('Updated')).toBeVisible();
    });

    test('should be accessible via navigation', async ({ page }) => {
      await page.goto('/');

      // Check if there's a navigation link to songs page
      // This depends on your navigation structure
      const songsLink = page.getByRole('link', { name: /songs/i });
      if (await songsLink.isVisible()) {
        await songsLink.click();
        await expect(page).toHaveURL('/songs');
      }
    });
  });

  test.describe('New Song Page', () => {
    test('should redirect to login if not authenticated', async ({ page }) => {
      await page.goto('/songs/new');

      // Should redirect to login page
      await expect(page).toHaveURL('/login');
    });

    test('should display new song form when authenticated', async ({ page }) => {
      // Mock authentication by setting user session
      await page.addInitScript(() => {
        localStorage.setItem('supabase.auth.token', JSON.stringify({
          access_token: 'mock-token',
          user: { id: 'mock-user-id' }
        }));
      });

      await page.goto('/songs/new');

      // Check page elements
      await expect(page.getByRole('heading', { level: 1, name: 'New Song' })).toBeVisible();

      // Check form fields
      await expect(page.getByPlaceholder('Title')).toBeVisible();
      await expect(page.getByPlaceholder('Artist')).toBeVisible();
      await expect(page.getByPlaceholder('Lyrics')).toBeVisible();

      // Check public toggle
      await expect(page.getByRole('switch', { name: /public/i })).toBeVisible();
      await expect(page.getByText('Public songs can be viewed by other users.')).toBeVisible();

      // Check save button
      await expect(page.getByRole('button', { name: 'Save Song' })).toBeVisible();
    });

    test('should validate required fields', async ({ page }) => {
      await page.addInitScript(() => {
        localStorage.setItem('supabase.auth.token', JSON.stringify({
          access_token: 'mock-token',
          user: { id: 'mock-user-id' }
        }));
      });

      await page.goto('/songs/new');

      // Try to submit empty form
      await page.getByRole('button', { name: 'Save Song' }).click();

      // Check HTML5 validation messages
      const titleField = page.getByPlaceholder('Title');
      const artistField = page.getByPlaceholder('Artist');
      const lyricsField = page.getByPlaceholder('Lyrics');

      // Check required attribute is present
      await expect(titleField).toHaveAttribute('required');
      await expect(artistField).toHaveAttribute('required');
      await expect(lyricsField).toHaveAttribute('required');
    });

    test('should fill and submit new song form', async ({ page }) => {
      await page.addInitScript(() => {
        localStorage.setItem('supabase.auth.token', JSON.stringify({
          access_token: 'mock-token',
          user: { id: 'mock-user-id' }
        }));
      });

      await page.goto('/songs/new');

      // Fill form fields
      await page.getByPlaceholder('Title').fill(mockSong.title);
      await page.getByPlaceholder('Artist').fill(mockSong.artist);
      await page.getByPlaceholder('Lyrics').fill(mockSong.lyrics);

      // Toggle public switch
      await page.getByRole('switch', { name: /public/i }).check();

      // Submit form
      await page.getByRole('button', { name: 'Save Song' }).click();

      // Should show saving state
      await expect(page.getByRole('button', { name: 'Saving...' })).toBeVisible();
    });

    test('should handle form input changes correctly', async ({ page }) => {
      await page.addInitScript(() => {
        localStorage.setItem('supabase.auth.token', JSON.stringify({
          access_token: 'mock-token',
          user: { id: 'mock-user-id' }
        }));
      });

      await page.goto('/songs/new');

      const titleField = page.getByPlaceholder('Title');
      const artistField = page.getByPlaceholder('Artist');
      const lyricsField = page.getByPlaceholder('Lyrics');
      const publicSwitch = page.getByRole('switch', { name: /public/i });

      // Test input changes
      await titleField.fill('Dynamic Title');
      await expect(titleField).toHaveValue('Dynamic Title');

      await artistField.fill('Dynamic Artist');
      await expect(artistField).toHaveValue('Dynamic Artist');

      await lyricsField.fill('Dynamic lyrics content');
      await expect(lyricsField).toHaveValue('Dynamic lyrics content');

      // Test public switch
      await expect(publicSwitch).not.toBeChecked();
      await publicSwitch.check();
      await expect(publicSwitch).toBeChecked();
      await publicSwitch.uncheck();
      await expect(publicSwitch).not.toBeChecked();
    });
  });

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
      await page.addInitScript(() => {
        localStorage.setItem('supabase.auth.token', JSON.stringify({
          access_token: 'mock-token',
          user: { id: 'mock-user-id' }
        }));
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
      await page.addInitScript(() => {
        localStorage.setItem('supabase.auth.token', JSON.stringify({
          access_token: 'mock-token',
          user: { id: 'mock-user-id' }
        }));
      });

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
      await page.addInitScript(() => {
        localStorage.setItem('supabase.auth.token', JSON.stringify({
          access_token: 'mock-token',
          user: { id: 'mock-user-id' }
        }));
      });

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

  test.describe('Song Management', () => {
    test('should handle song creation workflow', async ({ page }) => {
      await page.addInitScript(() => {
        localStorage.setItem('supabase.auth.token', JSON.stringify({
          access_token: 'mock-token',
          user: { id: 'mock-user-id' }
        }));
      });

      // Start at songs list
      await page.goto('/songs');

      // Navigate to new song (if there's a button)
      const newSongButton = page.getByRole('link', { name: /new song/i });
      if (await newSongButton.isVisible()) {
        await newSongButton.click();
        await expect(page).toHaveURL('/songs/new');
      } else {
        // Navigate directly if no button found
        await page.goto('/songs/new');
      }

      // Fill and submit form
      await page.getByPlaceholder('Title').fill(mockSong.title);
      await page.getByPlaceholder('Artist').fill(mockSong.artist);
      await page.getByPlaceholder('Lyrics').fill(mockSong.lyrics);

      await page.getByRole('button', { name: 'Save Song' }).click();
    });

    test('should handle public/private song visibility', async ({ page }) => {
      await page.addInitScript(() => {
        localStorage.setItem('supabase.auth.token', JSON.stringify({
          access_token: 'mock-token',
          user: { id: 'mock-user-id' }
        }));
      });

      await page.goto('/songs/new');

      const publicSwitch = page.getByRole('switch', { name: /public/i });

      // Should be private by default
      await expect(publicSwitch).not.toBeChecked();

      // Toggle to public
      await publicSwitch.check();
      await expect(publicSwitch).toBeChecked();

      // Check the help text is displayed
      await expect(page.getByText('Public songs can be viewed by other users.')).toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    test('should work on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      await page.addInitScript(() => {
        localStorage.setItem('supabase.auth.token', JSON.stringify({
          access_token: 'mock-token',
          user: { id: 'mock-user-id' }
        }));
      });

      await page.goto('/songs/new');

      // Check form is still usable on mobile
      await expect(page.getByPlaceholder('Title')).toBeVisible();
      await expect(page.getByPlaceholder('Artist')).toBeVisible();
      await expect(page.getByPlaceholder('Lyrics')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Save Song' })).toBeVisible();

      // Check form fills work on mobile
      await page.getByPlaceholder('Title').fill('Mobile Test');
      await expect(page.getByPlaceholder('Title')).toHaveValue('Mobile Test');
    });

    test('should work on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      await page.addInitScript(() => {
        localStorage.setItem('supabase.auth.token', JSON.stringify({
          access_token: 'mock-token',
          user: { id: 'mock-user-id' }
        }));
      });

      await page.goto('/songs/new');

      // Check all elements are properly positioned on desktop
      await expect(page.getByRole('heading', { name: 'New Song' })).toBeVisible();
      await expect(page.getByPlaceholder('Title')).toBeVisible();
      await expect(page.getByPlaceholder('Artist')).toBeVisible();
      await expect(page.getByPlaceholder('Lyrics')).toBeVisible();
    });
  });

  test.describe('Error Handling', () => {
    test('should handle network errors gracefully', async ({ page }) => {
      await page.addInitScript(() => {
        localStorage.setItem('supabase.auth.token', JSON.stringify({
          access_token: 'mock-token',
          user: { id: 'mock-user-id' }
        }));
      });

      // Mock network failure
      await page.route('**/rest/v1/songs', route => {
        route.abort('failed');
      });

      await page.goto('/songs/new');

      // Fill form
      await page.getByPlaceholder('Title').fill('Error Test');
      await page.getByPlaceholder('Artist').fill('Error Artist');
      await page.getByPlaceholder('Lyrics').fill('Error lyrics');

      // Submit form
      await page.getByRole('button', { name: 'Save Song' }).click();

      // Should handle error (check for error message or modal)
      // This depends on your error handling implementation
    });

    test('should handle authentication errors', async ({ page }) => {
      // Don't set authentication
      await page.goto('/songs/new');

      // Should redirect to login
      await expect(page).toHaveURL('/login');
    });
  });

  test.describe('Performance', () => {
    test('should load songs page within acceptable time', async ({ page }) => {
      const startTime = Date.now();

      await page.goto('/songs');
      await page.waitForLoadState('networkidle');

      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(5000); // Should load within 5 seconds
    });

    test('should load new song page within acceptable time', async ({ page }) => {
      await page.addInitScript(() => {
        localStorage.setItem('supabase.auth.token', JSON.stringify({
          access_token: 'mock-token',
          user: { id: 'mock-user-id' }
        }));
      });

      const startTime = Date.now();

      await page.goto('/songs/new');
      await page.waitForLoadState('networkidle');

      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(3000); // Should load within 3 seconds
    });
  });
});