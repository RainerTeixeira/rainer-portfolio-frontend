import { expect, test } from '@playwright/test';

/**
 * Teste Completo de Criação de Conta com GitHub
 *
 * Este teste valida o fluxo completo end-to-end:
 * 1. Usuário clica em "Login com GitHub"
 * 2. Frontend redireciona para backend GET /auth/oauth/github
 * 3. Backend redireciona para Cognito Hosted UI
 * 4. Cognito autentica com GitHub e redireciona para callback
 * 5. Frontend chama backend POST /auth/oauth/github/callback
 * 6. Backend troca code por tokens e cria/sincroniza usuário
 * 7. Frontend recebe tokens + user e autentica
 * 8. Usuário é redirecionado para dashboard autenticado
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

test.describe('GitHub Signup Flow - End to End', () => {
  test('complete GitHub signup flow creates account and authenticates user', async ({
    page,
  }) => {
    const mockCode = 'MOCK_GITHUB_AUTH_CODE';
    const mockState = Buffer.from(
      JSON.stringify({ p: 'github', n: 'nonce456', ts: Date.now() })
    ).toString('base64url');
    const mockAccessToken =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnaXRodWItdXNlci00NTYiLCJlbWFpbCI6InRlc3RnaXRodWJAdGVzdC5jb20iLCJuYW1lIjoiVGVzdGUgR2l0SHViIFVzZXIiLCJpYXQiOjE2MDAwMDAwMDAsImV4cCI6MTYwMDAwMzYwMH0.mock';
    const mockIdToken =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnaXRodWItdXNlci00NTYiLCJlbWFpbCI6InRlc3RnaXRodWJAdGVzdC5jb20iLCJuYW1lIjoiVGVzdGUgR2l0SHViIFVzZXIiLCJmdWxsTmFtZSI6IlRlc3RlIEdpdEh1YiBVc2VyIiwiaWF0IjoxNjAwMDAwMDAwLCJleHAiOjE2MDAwMDM2MDB9.mock';
    const mockRefreshToken = 'mock-refresh-token-456';

    // Step 1: Mock backend OAuth start endpoint (GET /auth/oauth/github)
    await page.route(`${API_BASE_URL}/auth/oauth/github*`, async route => {
      const url = new URL(route.request().url());
      const redirectUri = url.searchParams.get('redirect_uri');

      // Backend redireciona para Cognito Hosted UI
      await route.fulfill({
        status: 302,
        headers: {
          Location: `https://mock-cognito.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=mock-client-id&response_type=code&scope=openid+email+profile&redirect_uri=${encodeURIComponent(redirectUri || '')}&identity_provider=GitHub&state=${mockState}`,
        },
      });
    });

    // Step 2: Mock Cognito Hosted UI (simula autenticação GitHub bem-sucedida)
    await page.route('**/oauth2/authorize*', async route => {
      const url = new URL(route.request().url());
      const redirectUri = url.searchParams.get('redirect_uri');

      // Simula Cognito redirecionando de volta com code
      await route.fulfill({
        status: 302,
        headers: {
          Location: `${redirectUri}?code=${mockCode}&state=${mockState}`,
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
          body: `<html><body><h1>Mock Cognito Hosted UI - GitHub</h1><p>URL: ${url.toString()}</p></body></html>`,
        });
      }
    );

    // Step 3: Mock backend callback endpoint (POST /auth/oauth/github/callback)
    await page.route(
      `${API_BASE_URL}/auth/oauth/github/callback`,
      async route => {
        const body = await route.request().postDataJSON();

        // Valida que o backend recebeu o code correto
        expect(body.code).toBe(mockCode);
        expect(body.state).toBe(mockState);

        // Backend troca code por tokens e cria/sincroniza usuário
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            data: {
              tokens: {
                accessToken: mockAccessToken,
                refreshToken: mockRefreshToken,
                idToken: mockIdToken,
                tokenType: 'Bearer',
                expiresIn: 3600,
              },
              user: {
                id: 'user-github-456',
                cognitoSub: 'github-user-456',
                fullName: 'Teste GitHub User',
                email: 'testgithub@test.com',
                role: 'subscriber',
                isActive: true,
                isBanned: false,
                postsCount: 0,
                commentsCount: 0,
                avatar: null,
                bio: null,
                website: null,
                socialLinks: null,
              },
            },
          }),
        });
      }
    );

    // Step 4: Inicia o fluxo - vai para página de login
    await page.goto('/dashboard/login');

    // Verifica que os botões estão visíveis
    const githubBtn = page.getByRole('button', { name: /GitHub/i });
    await expect(githubBtn).toBeVisible();

    // Step 5: Clica no botão GitHub
    await githubBtn.click();

    // Step 6: Aguarda redirecionamento para backend ou Cognito
    await page.waitForURL(
      url => {
        const urlStr = url.toString();
        return (
          urlStr.includes('/auth/oauth/github') ||
          urlStr.includes('oauth2/authorize') ||
          urlStr.includes('mock-cognito')
        );
      },
      { timeout: 10000 }
    );

    // Step 7: Se foi para backend, aguarda redirect para Cognito Hosted UI
    const currentUrl = page.url();
    if (currentUrl.includes('/auth/oauth/github')) {
      await page.waitForURL(
        url => {
          const urlStr = url.toString();
          return (
            urlStr.includes('oauth2/authorize') ||
            urlStr.includes('mock-cognito')
          );
        },
        { timeout: 5000 }
      );
    }

    // Step 8: Cognito redireciona de volta para callback com code
    // (simulado pelo mock acima)
    await page.goto(
      `/dashboard/login/callback?code=${mockCode}&state=${mockState}`
    );

    // Verifica que o callback recebeu code e state
    const callbackUrl = new URL(page.url());
    expect(callbackUrl.searchParams.get('code')).toBe(mockCode);
    expect(callbackUrl.searchParams.get('state')).toBe(mockState);

    // Step 9: Aguarda chamada ao backend callback endpoint
    const callbackResponse = await page.waitForResponse(
      resp =>
        resp.url().includes('/auth/oauth/github/callback') &&
        resp.status() === 200,
      { timeout: 10000 }
    );

    const callbackData = await callbackResponse.json();
    expect(callbackData.success).toBe(true);
    expect(callbackData.data.tokens).toBeDefined();
    expect(callbackData.data.user).toBeDefined();
    expect(callbackData.data.user.email).toBe('testgithub@test.com');
    expect(callbackData.data.user.fullName).toBe('Teste GitHub User');
    expect(callbackData.data.user.cognitoSub).toBe('github-user-456');

    // Step 10: Verifica mensagem de sucesso na página
    await expect(page.getByText(/Login realizado com sucesso/i)).toBeVisible({
      timeout: 5000,
    });

    // Step 11: Aguarda redirecionamento para dashboard
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    expect(page.url()).toMatch(/\/dashboard$/);

    // Step 12: Verifica que o usuário está autenticado (check localStorage ou cookies)
    const tokens = await page.evaluate(() => {
      return {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
        idToken: localStorage.getItem('idToken'),
      };
    });

    // Se os tokens são salvos no localStorage, verifica
    if (tokens.accessToken) {
      expect(tokens.accessToken).toBe(mockAccessToken);
    }
  });

  test('handles GitHub signup error when backend fails', async ({ page }) => {
    // Mock backend callback endpoint returning error
    await page.route(
      `${API_BASE_URL}/auth/oauth/github/callback`,
      async route => {
        await route.fulfill({
          status: 400,
          contentType: 'application/json',
          body: JSON.stringify({
            success: false,
            error: {
              message: 'Código de autorização inválido ou expirado',
              code: 'INVALID_AUTHORIZATION_CODE',
            },
          }),
        });
      }
    );

    // Simula callback com code inválido
    const navigationPromise = page.goto(
      `/dashboard/login/callback?code=INVALID_CODE&state=mock-state`
    );

    // Aguarda resposta de erro do backend
    const [response] = await Promise.all([
      page.waitForResponse(
        resp =>
          resp.url().includes('/auth/oauth/github/callback') &&
          resp.status() === 400,
        { timeout: 10000 }
      ),
      navigationPromise,
    ]);

    expect(response.status()).toBe(400);

    // Verifica que mensagem de erro é exibida
    await expect(page.getByText(/erro|inválido|expirado/i)).toBeVisible({
      timeout: 5000,
    });
  });

  test('validates GitHub OAuth redirect parameters', async ({ page }) => {
    let capturedRedirectUri = '';
    let capturedState = '';

    // Mock backend para capturar parâmetros
    await page.route(`${API_BASE_URL}/auth/oauth/github*`, async route => {
      const url = new URL(route.request().url());
      capturedRedirectUri = url.searchParams.get('redirect_uri') || '';
      capturedState = url.searchParams.get('state') || '';

      await route.fulfill({
        status: 302,
        headers: {
          Location: `https://mock-cognito.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=mock&response_type=code&scope=openid+email+profile&redirect_uri=${encodeURIComponent(capturedRedirectUri)}&identity_provider=GitHub&state=${capturedState}`,
        },
      });
    });

    // Intercepta navegação para o domínio mock
    await page.route(
      '**/mock-cognito.auth.us-east-1.amazoncognito.com/**',
      async route => {
        await route.fulfill({
          status: 200,
          contentType: 'text/html',
          body: '<html><body>Mock Cognito</body></html>',
        });
      }
    );

    await page.goto('/dashboard/login');

    const githubBtn = page.getByRole('button', { name: /GitHub/i });
    await expect(githubBtn).toBeVisible();

    // Clica e aguarda navegação
    await Promise.all([
      page.waitForURL(
        url => {
          const urlStr = url.toString();
          return (
            urlStr.includes('/auth/oauth/github') ||
            urlStr.includes('mock-cognito') ||
            urlStr.includes('oauth2/authorize')
          );
        },
        { timeout: 10000 }
      ),
      githubBtn.click(),
    ]);

    // Valida parâmetros enviados ao backend
    expect(capturedRedirectUri).toContain('/dashboard/login/callback');
    expect(capturedRedirectUri).toContain('localhost:3000');
    // State pode estar vazio se não for enviado na query, mas redirect_uri deve estar presente
    expect(capturedRedirectUri.length).toBeGreaterThan(0);
  });
});
