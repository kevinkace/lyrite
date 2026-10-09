import { test, expect } from '@playwright/test';
import { mockAuth } from './helpers/mock-auth';

test.describe('New Song Creation', () => {
    // Mock song data for testing
    const mockSong = {
        title: 'Test Song Title',
        artist: 'Test Artist',
        lyrics: 'Verse 1\nThis is a test song\nWith some lyrics\n\nChorus\nTest chorus here\nSing along',
    };

    const mockAuthenticatedUser = async (page: import('@playwright/test').Page) => {
        await mockAuth(page);
        await page.route('**/rest/v1/songs*', async route => {
            if (route.request().method() !== 'HEAD') {
                await route.continue();
                return;
            }

            await route.fulfill({
                status: 200,
                headers: { 'content-range': '0-0/0' }
            });
        });
    };

    test('should show the new song form when not authenticated', async ({ page }) => {
        await page.goto('/songs/new');

        await expect(page.getByRole('heading', { level: 1, name: 'New Song' })).toBeVisible();
        await expect(page.locator('[data-testid="song-editor"]')).toBeVisible();
        await expect(page.getByRole('switch')).toHaveCount(0);
    });

    test('should save an anonymous song locally and show a signup CTA', async ({ page }) => {
        await page.goto('/songs/new');

        await page.getByPlaceholder('Title').fill(mockSong.title);
        await page.getByPlaceholder('Artist').fill(mockSong.artist);
        await page.getByPlaceholder('Lyrics').fill(mockSong.lyrics);
        await page.getByTestId('save-song-button').click();

        await expect(page).toHaveURL(/\/songs\/[0-9a-f-]+$/i);
        await expect(page.getByRole('link', { name: 'Sign up to save' })).toBeVisible();

        const storedSong = await page.evaluate((id) => {
            const song = JSON.parse(localStorage.getItem('lyrite:anonymous-song') ?? 'null');
            return song?.id === id ? song : null;
        }, page.url().split('/').pop());

        expect(storedSong).toMatchObject({
            title: mockSong.title,
            artist: mockSong.artist,
            lyrics: mockSong.lyrics
        });

        await page.reload();
        await expect(page.getByRole('heading', { name: mockSong.title })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Sign up to save' })).toBeVisible();
    });

    test('should load new song form when authenticated', async ({ page }) => {
        await mockAuthenticatedUser(page);
        await page.goto('/songs/new');

        // Check page loads
        await expect(page.getByRole('heading', { level: 1, name: 'New Song' })).toBeVisible();

        await expect(page.locator('[data-testid="song-editor"]')).toBeVisible();
        await expect(page.getByRole('switch')).toHaveCount(1);
    });

    test('should show validation errors for empty required fields', async ({ page }) => {
        await mockAuthenticatedUser(page);
        await page.goto('/songs/new');

        // Try to submit empty form
        await page.getByTestId('save-song-button').click();

        // Check required attributes are present (HTML5 validation)
        await expect(page.getByPlaceholder('Title')).toHaveAttribute('required');
        await expect(page.getByPlaceholder('Artist')).toHaveAttribute('required');
        await expect(page.getByPlaceholder('Lyrics')).toHaveAttribute('required');
    });

    test('should enforce title, artist and lyrics length limits in the form', async ({ page }) => {
        await mockAuthenticatedUser(page);
        await page.goto('/songs/new');

        await expect(page.getByPlaceholder('Title')).toHaveAttribute('maxlength', '100');
        await expect(page.getByPlaceholder('Artist')).toHaveAttribute('maxlength', '100');
        await expect(page.getByPlaceholder('Lyrics')).toHaveAttribute('maxlength', '2000');
    });

    test('should successfully submit form with valid data', async ({ page }) => {
        await mockAuthenticatedUser(page);
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