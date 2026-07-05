import { test, expect } from '@playwright/test';


/**
 * Clicks the "Accept" button on the cookie banner.
 */
async function accept(page : import('@playwright/test').Page) {
    const acceptButton = page.getByTestId('cookie-banner-accept');
    await acceptButton.click();
}

/**
 * Checks that the cookie consent cookie is set correctly.
 */
async function checkCookies(context : import('@playwright/test').BrowserContext) {
    const cookies = await context.cookies();
    const consentCookie = cookies.find(cookie => cookie.name === 'cookie_consent');

    expect(consentCookie).toBeDefined();
    expect(consentCookie?.value).toBe('true');
    expect(consentCookie?.path).toBe('/');
}

test.describe('Cookie Notification Banner', () => {
    test.beforeEach(async ({ context, page }) => {
        await context.clearCookies();
    });

    test('should display cookie banner when no consent cookie exists', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByTestId('cookie-banner')).toBeVisible();

        const acceptButton = page.getByTestId('cookie-banner-accept');
        await expect(acceptButton).toBeVisible();
    });

    test('should not display cookie banner when consent cookie exists', async ({ page, context }) => {
        await context.addCookies([{
            name: 'cookie_consent',
            value: 'true',
            domain: 'localhost',
            path: '/'
        }]);

        await page.goto('/');

        await page.waitForTimeout(1000);

        await expect(page.getByTestId('cookie-banner')).not.toBeVisible();
    });

    test('should hide banner and set cookie when Accept button is clicked', async ({ page, context }) => {
        await page.goto('/');
        await accept(page);

        await expect(page.getByTestId('cookie-banner')).not.toBeVisible();

        await checkCookies(context);
    });

    test('should persist consent across page reloads', async ({ page, context }) => {
        await page.goto('/');
        await accept(page);

        await page.reload();

        await page.waitForLoadState('networkidle');

        await expect(page.getByTestId('cookie-banner')).not.toBeVisible();

        await checkCookies(context);
    });

    test('should load Google Tag Manager after consent', async ({ page }) => {
        await page.goto('/');

        let gtmScript = page.locator('script[src*="googletagmanager.com"]');
        await expect(gtmScript).toHaveCount(0);

        await accept(page);

        await page.waitForTimeout(1000);

        gtmScript = page.locator('script[src*="googletagmanager.com"]');
        await expect(gtmScript).toHaveCount(1);
    });
});
