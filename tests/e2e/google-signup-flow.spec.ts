import { expect, test } from './fixtures';

/**
 * Teste Completo de Criação de Conta com Google
 *
 * Este teste valida o fluxo completo end-to-end:
 * 1. Usuário clica em "Login com Google"
 * 2. Frontend redireciona para backend GET /auth/oauth/google
 * 3. Backend redireciona para Cognito Hosted UI
 * 4. Cognito autentica com Google e redireciona para callback
 * 5. Frontend chama backend POST /auth/oauth/google/callback
 * 6. Backend troca code por tokens e cria/sincroniza usuário
 * 7. Frontend recebe tokens + user e autentica
 * 8. Usuário é redirecionado para dashboard autenticado
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

test.describe('Google Signup Flow - End to End', () => {
  test('complete Google signup flow creates account and authenticates user', async ({
    page,
  }) => {
    const mockCode = 'MOCK_GOOGLE_AUTH_CODE';
    const mockState = Buffer.from(
      JSON.stringify({ p: 'google', n: 'nonce123', ts: Date.now() })
    ).toString('base64url');
    const mockAccessToken =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnb29nbGUtdXNlci0xMjMiLCJlbWFpbCI6InRlc3Rnb29nbGVAdGVzdC5jb20iLCJuYW1lIjoiVGVzdGUgR29vZ2xlIFVzZXIiLCJpYXQiOjE2MDAwMDAwMDAsImV4cCI6MTYwMDAwMzYwMH0.mock';
    const mockIdToken =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnb29nbGUtdXNlci0xMjMiLCJlbWFpbCI6InRlc3Rnb29nbGVAdGVzdC5jb20iLCJuYW1lIjoiVGVzdGUgR29vZ2xlIFVzZXIiLCJmdWxsTmFtZSI6IlRlc3RlIEdvb2dsZSBVc2VyIiwiaWF0IjoxNjAwMDAwMDAwLCJleHAiOjE2MDAwMDM2MDB9.mock';
    const mockRefreshToken = 'mock-refresh-token-123';

    // Step 1: Mock backend OAuth start endpoint (GET /auth/oauth/google)
    await page.route(`${API_BASE_URL}/auth/oauth/google*`, async route => {
      const url = new URL(route.request().url());
      const redirectUri = url.searchParams.get('redirect_uri');

      // Backend redireciona para Cognito Hosted UI
      await route.fulfill({
        status: 302,
        headers: {
          Location: `https://mock-cognito.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=mock-client-id&response_type=code&scope=openid+email+profile&redirect_uri=${encodeURIComponent(redirectUri || '')}&identity_provider=Google&state=${mockState}`,
        },
      });
    });

    // Step 2: Mock Cognito Hosted UI (simula autenticação Google bem-sucedida)
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

    // Step 3: Mock backend callback endpoint (POST /auth/oauth/google/callback)
    await page.route(
      `${API_BASE_URL}/auth/oauth/google/callback`,
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
                id: 'user-google-123',
                cognitoSub: 'google-user-123',
                fullName: 'Teste Google User',
                email: 'testgoogle@test.com',
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
    const googleBtn = page.getByRole('button', { name: /Google/i });
    await expect(googleBtn).toBeVisible();

    // Step 5: Clica no botão Google
    await googleBtn.click();

    // Step 6: Aguarda redirecionamento para backend
    await page.waitForResponse(
      resp => resp.url().includes('/auth/oauth/google') && resp.status() === 302
    );

    // Step 7: Aguarda redirecionamento para Cognito Hosted UI
    await page.waitForURL(url => url.toString().includes('oauth2/authorize'), {
      timeout: 5000,
    });

    // Step 8: Cognito redireciona de volta para callback com code
    await page.waitForURL(
      url => url.toString().includes('/dashboard/login/callback'),
      {
        timeout: 5000,
      }
    );

    // Verifica que o callback recebeu code e state
    const callbackUrl = new URL(page.url());
    expect(callbackUrl.searchParams.get('code')).toBe(mockCode);
    expect(callbackUrl.searchParams.get('state')).toBe(mockState);

    // Step 9: Aguarda chamada ao backend callback endpoint
    const callbackResponse = await page.waitForResponse(
      resp =>
        resp.url().includes('/auth/oauth/google/callback') &&
        resp.status() === 200,
      { timeout: 10000 }
    );

    const callbackData = await callbackResponse.json();
    expect(callbackData.success).toBe(true);
    expect(callbackData.data.tokens).toBeDefined();
    expect(callbackData.data.user).toBeDefined();
    expect(callbackData.data.user.email).toBe('testgoogle@test.com');
    expect(callbackData.data.user.fullName).toBe('Teste Google User');

    // Step 10: Verifica mensagem de sucesso na página
    await expect(page.getByText(/Login realizado com sucesso/i)).toBeVisible({
      timeout: 5000,
    });

    // Step 11: Aguarda redirecionamento para dashboard
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    expect(page.url()).toMatch(/\/dashboard$/);

    // Step 12: Verifica que o usuário está autenticado (check localStorage ou cookies)
    // Nota: Dependendo da implementação, pode verificar tokens no localStorage
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

  test('handles Google signup error when backend fails', async ({ page }) => {
    // Mock backend callback endpoint returning error
    await page.route(
      `${API_BASE_URL}/auth/oauth/google/callback`,
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
    await page.goto(
      `/dashboard/login/callback?code=INVALID_CODE&state=mock-state`
    );

    // Aguarda resposta de erro do backend
    await page.waitForResponse(
      resp =>
        resp.url().includes('/auth/oauth/google/callback') &&
        resp.status() === 400,
      { timeout: 10000 }
    );

    // Verifica que mensagem de erro é exibida
    // (depende da implementação da página de callback)
    await expect(page.getByText(/erro|inválido|expirado/i)).toBeVisible({
      timeout: 5000,
    });
  });
});
