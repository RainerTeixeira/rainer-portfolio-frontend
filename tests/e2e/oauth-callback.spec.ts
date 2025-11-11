import { expect, test } from './fixtures';

/**
 * Testes de OAuth Callback - Fluxo Mediado pelo Backend
 *
 * O callback agora chama o backend POST /auth/oauth/:provider/callback
 * em vez de chamar diretamente o Cognito /oauth2/token
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

test.describe('OAuth Callback Flow (Backend-Mediated)', () => {
  test('exchanges code for tokens and authenticates user via backend', async ({
    page,
  }) => {
    // Mock backend callback endpoint (POST /auth/oauth/:provider/callback)
    await page.route(`${API_BASE_URL}/auth/oauth/*/callback`, async route => {
      const body = await route.request().postDataJSON();
      expect(body.code).toBe('TEST_CODE');
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: {
            tokens: {
              accessToken: 'eyJMOCK.ACCESS',
              refreshToken: 'eyJMOCK.REFRESH',
              idToken: 'eyJMOCK.ID',
              tokenType: 'Bearer',
              expiresIn: 3600,
            },
            user: {
              id: 'sub-123',
              cognitoSub: 'sub-123',
              fullName: 'User Test',
              email: 'user@test.com',
              role: 'subscriber',
              isActive: true,
              isBanned: false,
              postsCount: 0,
              commentsCount: 0,
            },
          },
        }),
      });
    });

    // Visit the callback page with a fake code and state including provider
    const state = Buffer.from(JSON.stringify({ p: 'google' })).toString(
      'base64'
    );
    await page.goto(`/dashboard/login/callback?code=TEST_CODE&state=${state}`);

    // Should show success state then redirect to dashboard
    await expect(page.getByText(/Login realizado com sucesso/i)).toBeVisible();

    await page.waitForURL('**/dashboard', { timeout: 5000 });
    expect(page.url()).toMatch(/\/dashboard$/);
  });
});
