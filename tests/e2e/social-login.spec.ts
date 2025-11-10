import { expect, test } from '@playwright/test';

/**
 * Testes de Login Social - Fluxo Mediado pelo Backend
 *
 * O fluxo agora é:
 * 1. Frontend → GET /auth/oauth/:provider (backend)
 * 2. Backend → Redireciona para Cognito Hosted UI
 * 3. Cognito → Autentica e redireciona para /dashboard/login/callback
 * 4. Frontend → POST /auth/oauth/:provider/callback (backend)
 * 5. Backend → Retorna tokens + user
 *
 * Variáveis necessárias no .env.local:
 * - NEXT_PUBLIC_API_URL (URL do backend)
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

test.describe('Dashboard Login - Social Providers (Backend-Mediated)', () => {
  test('shows Google and GitHub login buttons', async ({ page }) => {
    await page.goto('/dashboard/login');

    const googleBtn = page.getByRole('button', { name: /Google/i });
    const githubBtn = page.getByRole('button', { name: /GitHub/i });

    await expect(googleBtn).toBeVisible();
    await expect(githubBtn).toBeVisible();
  });

  test('redirects to backend OAuth endpoint for Google provider', async ({
    page,
  }) => {
    let backendUrlCalled = false;
    let redirectUriParam = '';

    // Mock backend redirect to Cognito Hosted UI
    await page.route(`${API_BASE_URL}/auth/oauth/google*`, async route => {
      backendUrlCalled = true;
      const url = new URL(route.request().url());
      redirectUriParam = url.searchParams.get('redirect_uri') || '';

      // Backend redireciona para Cognito Hosted UI
      await route.fulfill({
        status: 302,
        headers: {
          Location: `https://mock-cognito.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=mock&response_type=code&scope=openid+email+profile&redirect_uri=${encodeURIComponent(redirectUriParam)}&identity_provider=Google&state=mock-state`,
        },
      });
    });

    // Intercepta navegação para o domínio mock do Cognito e redireciona para uma URL local
    await page.route(
      '**/mock-cognito.auth.us-east-1.amazoncognito.com/**',
      async route => {
        const url = new URL(route.request().url());
        // Redireciona para uma URL local que podemos controlar
        await route.fulfill({
          status: 200,
          contentType: 'text/html',
          body: `<html><body><h1>Mock Cognito Hosted UI</h1><p>URL: ${url.toString()}</p></body></html>`,
        });
      }
    );

    await page.goto('/dashboard/login');

    const googleBtn = page.getByRole('button', { name: /Google/i });
    await expect(googleBtn).toBeVisible();

    // Intercepta a navegação antes que aconteça
    page.on('request', request => {
      const url = request.url();
      if (url.includes('/auth/oauth/google')) {
        backendUrlCalled = true;
      }
    });

    // Click e aguarda navegação
    await Promise.all([
      page.waitForURL(
        url => {
          const urlString = url.toString();
          return (
            urlString.includes('/auth/oauth/google') ||
            urlString.includes('mock-cognito') ||
            urlString.includes('oauth2/authorize')
          );
        },
        { timeout: 10000 }
      ),
      googleBtn.click(),
    ]);

    // Verifica que o backend foi chamado
    expect(backendUrlCalled).toBeTruthy();
    expect(redirectUriParam).toContain('/dashboard/login/callback');

    // Verifica que a URL contém os parâmetros esperados
    const currentUrl = page.url();
    const hasOAuthParams =
      currentUrl.includes('oauth2/authorize') ||
      currentUrl.includes('identity_provider=Google') ||
      currentUrl.includes('mock-cognito');

    expect(hasOAuthParams).toBeTruthy();
  });

  test('redirects to backend OAuth endpoint for GitHub provider', async ({
    page,
  }) => {
    let backendUrlCalled = false;
    let redirectUriParam = '';

    // Mock backend redirect to Cognito Hosted UI
    await page.route(`${API_BASE_URL}/auth/oauth/github*`, async route => {
      backendUrlCalled = true;
      const url = new URL(route.request().url());
      redirectUriParam = url.searchParams.get('redirect_uri') || '';

      await route.fulfill({
        status: 302,
        headers: {
          Location: `https://mock-cognito.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=mock&response_type=code&scope=openid+email+profile&redirect_uri=${encodeURIComponent(redirectUriParam)}&identity_provider=GitHub&state=mock-state`,
        },
      });
    });

    // Intercepta navegação para o domínio mock do Cognito
    await page.route(
      '**/mock-cognito.auth.us-east-1.amazoncognito.com/**',
      async route => {
        const url = new URL(route.request().url());
        await route.fulfill({
          status: 200,
          contentType: 'text/html',
          body: `<html><body><h1>Mock Cognito Hosted UI</h1><p>URL: ${url.toString()}</p></body></html>`,
        });
      }
    );

    await page.goto('/dashboard/login');

    const githubBtn = page.getByRole('button', { name: /GitHub/i });
    await expect(githubBtn).toBeVisible();

    // Intercepta a navegação antes que aconteça
    page.on('request', request => {
      const url = request.url();
      if (url.includes('/auth/oauth/github')) {
        backendUrlCalled = true;
      }
    });

    // Click e aguarda navegação
    await Promise.all([
      page.waitForURL(
        url => {
          const urlString = url.toString();
          return (
            urlString.includes('/auth/oauth/github') ||
            urlString.includes('mock-cognito') ||
            urlString.includes('oauth2/authorize')
          );
        },
        { timeout: 10000 }
      ),
      githubBtn.click(),
    ]);

    // Verifica que o backend foi chamado
    expect(backendUrlCalled).toBeTruthy();
    expect(redirectUriParam).toContain('/dashboard/login/callback');

    // Verifica que a URL contém os parâmetros esperados
    const currentUrl = page.url();
    const hasOAuthParams =
      currentUrl.includes('oauth2/authorize') ||
      currentUrl.includes('identity_provider=GitHub') ||
      currentUrl.includes('mock-cognito');

    expect(hasOAuthParams).toBeTruthy();
  });
});
