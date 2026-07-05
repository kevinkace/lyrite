import { test, expect } from '@playwright/test';

test.describe('New Song Creation', () => {
    // Mock song data for testing
    const mockSong = {
        title: 'Test Song Title',
        artist: 'Test Artist',
        lyrics: 'Verse 1\nThis is a test song\nWith some lyrics\n\nChorus\nTest chorus here\nSing along',
    };

    // Helper function to mock authentication
    const mockAuth = async (page : import('@playwright/test').Page) => {
        await page.addInitScript(() => {
            localStorage.setItem('supabase.auth.token', JSON.stringify({
                access_token: 'mock-token',
                user: { id: 'mock-user-id' }
            }));
        });
    };

    test('should redirect to login if not authenticated', async ({ page }) => {
        await page.goto('/songs/new');

        await expect(page).toHaveURL('/login');
    });

    test('should load new song form when authenticated', async ({ page }) => {
        await mockAuth(page);
        await page.goto('/songs/new');

        // Check page loads
        await expect(page.getByRole('heading', { level: 1, name: 'New Song' })).toBeVisible();

        await expect(page.locator('[data-testid="song-editor"]')).toBeVisible();
    });

    test('should show validation errors for empty required fields', async ({ page }) => {
        await mockAuth(page);
        await page.goto('/songs/new');

        // Try to submit empty form
        await page.getByTestId('save-song-button').click();

        // Check required attributes are present (HTML5 validation)
        await expect(page.getByPlaceholder('Title')).toHaveAttribute('required');
        await expect(page.getByPlaceholder('Artist')).toHaveAttribute('required');
        await expect(page.getByPlaceholder('Lyrics')).toHaveAttribute('required');
    });

    test('should successfully submit form with valid data', async ({ page }) => {
        await mockAuth(page);
        await page.goto('/songs/new');

        // Fill out the form
        await page.getByPlaceholder('Title').fill(mockSong.title);
        await page.getByPlaceholder('Artist').fill(mockSong.artist);
        await page.getByPlaceholder('Lyrics').fill(mockSong.lyrics);

        // Submit form
        await page.getByTestId('save-song-button').click();

        // Should show saving state
        await expect(page.getByTestId('save-song-button')).toHaveText('Saving...');
    });
});