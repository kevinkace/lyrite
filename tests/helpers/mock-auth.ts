import type { Page } from '@playwright/test';

export const mockAuth = async (page: Page, userId = 'mock-user-id') => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321';
  const projectId = new URL(supabaseUrl).hostname.split('.')[0];

  await page.addInitScript(({ projectId, userId }) => {
    localStorage.setItem(`sb-${projectId}-auth-token`, JSON.stringify({
      access_token: 'mock-token',
      token_type: 'bearer',
      expires_in: 3600,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      refresh_token: 'mock-refresh-token',
      user: {
        id: userId,
        email: 'test@example.com',
        aud: 'authenticated',
        role: 'authenticated',
        app_metadata: { provider: 'email', providers: ['email'] },
        user_metadata: {},
        created_at: new Date().toISOString()
      }
    }));
  }, { projectId, userId });

  await page.route('**/rest/v1/profiles*', async route => {
    await route.fulfill({
      json: {
        id: userId,
        tier_name: 'free',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      }
    });
  });
};
