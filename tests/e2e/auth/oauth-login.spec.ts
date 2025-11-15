/**
 * OAuth Login E2E Tests
 *
 * Testes E2E para autenticação OAuth com Google e GitHub.
 * Testa o fluxo completo de login social usando Playwright.
 *
 * @module tests/e2e/auth/oauth-login
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import { expect, test } from '@playwright/test';

// ============================================================================
// Configuration
// ============================================================================

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Aguarda até que a URL contenha um determinado padrão
 */
async function waitForUrl(page: any, pattern: string | RegExp, timeout = 5000) {
  await page.waitForURL(pattern, { timeout });
}

/**
 * Intercepta requisições para o backend e mocka resposta OAuth
 */
async function mockOAuthBackend(page: any, provider: 'google' | 'github') {
  await page.route(`${API_URL}/auth/oauth/${provider}/callback`, async (route: any) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        data: {
          tokens: {
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
            idToken: 'mock-id-token',
            expiresIn: 3600,
            tokenType: 'Bearer',
          },
          user: {
            id: 'user-123',
            cognitoSub: 'user-123',
            fullName: 'Test User',
            email: `test@${provider}.com`,
            role: 'SUBSCRIBER',
            isActive: true,
            isBanned: false,
            postsCount: 0,
            commentsCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        },
      }),
    });
  });
}

// ============================================================================
// Tests
// ============================================================================

test.describe('OAuth Login E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar para página de login
    await page.goto(`${BASE_URL}/dashboard/login`);
  });

  // ==========================================================================
  // Renderização de Botões OAuth
  // ==========================================================================

  test.describe('Renderização', () => {
    test('deve exibir botões OAuth na página de login', async ({ page }) => {
      // Verificar se botões OAuth existem
      const googleButton = page.getByRole('button', { name: /continuar com google/i });
      const githubButton = page.getByRole('button', { name: /continuar com github/i });

      await expect(googleButton).toBeVisible();
      await expect(githubButton).toBeVisible();
    });

    test('deve exibir separador "ou" entre formulário e OAuth', async ({ page }) => {
      const separator = page.getByText('ou');
      await expect(separator).toBeVisible();
    });

    test('deve exibir ícones nos botões OAuth', async ({ page }) => {
      // Verificar se há SVGs (ícones) nos botões
      const googleButton = page.getByRole('button', { name: /continuar com google/i });
      const githubButton = page.getByRole('button', { name: /continuar com github/i });

      const googleIcon = googleButton.locator('svg').first();
      const githubIcon = githubButton.locator('svg').first();

      await expect(googleIcon).toBeVisible();
      await expect(githubIcon).toBeVisible();
    });
  });

  // ==========================================================================
  // Login com Google (Mock)
  // ==========================================================================

  test.describe('Login com Google (Mock)', () => {
    test('deve iniciar fluxo OAuth ao clicar no botão Google', async ({ page }) => {
      // Interceptar navegação para o backend
      const navigationPromise = page.waitForURL(/\/auth\/oauth\/google/);

      const googleButton = page.getByRole('button', { name: /continuar com google/i });
      await googleButton.click();

      // Aguardar redirecionamento
      await navigationPromise;

      // Verificar se foi redirecionado para o backend OAuth
      expect(page.url()).toContain('/auth/oauth/google');
    });

    test('deve incluir redirect_uri correto na URL OAuth', async ({ page }) => {
      // Interceptar navegação
      page.on('request', request => {
        if (request.url().includes('/auth/oauth/google')) {
          const url = new URL(request.url());
          expect(url.searchParams.get('redirect_uri')).toContain('/dashboard/login/callback');
        }
      });

      const googleButton = page.getByRole('button', { name: /continuar com google/i });
      await googleButton.click();

      // Aguardar um pouco para capturar a requisição
      await page.waitForTimeout(1000);
    });
  });

  // ==========================================================================
  // Login com GitHub (Mock)
  // ==========================================================================

  test.describe('Login com GitHub (Mock)', () => {
    test('deve iniciar fluxo OAuth ao clicar no botão GitHub', async ({ page }) => {
      // Interceptar navegação para o backend
      const navigationPromise = page.waitForURL(/\/auth\/oauth\/github/);

      const githubButton = page.getByRole('button', { name: /continuar com github/i });
      await githubButton.click();

      // Aguardar redirecionamento
      await navigationPromise;

      // Verificar se foi redirecionado para o backend OAuth
      expect(page.url()).toContain('/auth/oauth/github');
    });

    test('deve incluir redirect_uri correto na URL OAuth', async ({ page }) => {
      // Interceptar navegação
      page.on('request', request => {
        if (request.url().includes('/auth/oauth/github')) {
          const url = new URL(request.url());
          expect(url.searchParams.get('redirect_uri')).toContain('/dashboard/login/callback');
        }
      });

      const githubButton = page.getByRole('button', { name: /continuar com github/i });
      await githubButton.click();

      // Aguardar um pouco para capturar a requisição
      await page.waitForTimeout(1000);
    });
  });

  // ==========================================================================
  // Callback OAuth
  // ==========================================================================

  test.describe('Callback OAuth', () => {
    test('deve processar callback com sucesso (Google)', async ({ page }) => {
      // Mockar resposta do backend
      await mockOAuthBackend(page, 'google');

      // Simular callback com código OAuth
      await page.goto(`${BASE_URL}/dashboard/login/callback?code=mock-google-code&state=mock-state`);

      // Aguardar processamento
      await page.waitForTimeout(2000);

      // Verificar redirecionamento para dashboard
      await expect(page).toHaveURL(/\/dashboard/);
    });

    test('deve processar callback com sucesso (GitHub)', async ({ page }) => {
      // Mockar resposta do backend
      await mockOAuthBackend(page, 'github');

      // Simular callback com código OAuth
      await page.goto(`${BASE_URL}/dashboard/login/callback?code=mock-github-code&state=mock-state`);

      // Aguardar processamento
      await page.waitForTimeout(2000);

      // Verificar redirecionamento para dashboard
      await expect(page).toHaveURL(/\/dashboard/);
    });

    test('deve mostrar erro quando código é inválido', async ({ page }) => {
      // Mockar resposta de erro do backend
      await page.route(`${API_URL}/auth/oauth/google/callback`, async (route: any) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: false,
            message: 'Código OAuth inválido',
          }),
        });
      });

      // Simular callback com código inválido
      await page.goto(`${BASE_URL}/dashboard/login/callback?code=invalid-code`);

      // Aguardar mensagem de erro
      await page.waitForTimeout(2000);

      // Verificar se mensagem de erro é exibida
      const errorMessage = page.getByText(/código oauth inválido/i);
      await expect(errorMessage).toBeVisible();
    });

    test('deve mostrar erro quando OAuth é cancelado', async ({ page }) => {
      // Simular callback com erro de acesso negado
      await page.goto(`${BASE_URL}/dashboard/login/callback?error=access_denied&error_description=User+cancelled`);

      // Aguardar mensagem de erro
      await page.waitForTimeout(1000);

      // Verificar se mensagem de erro é exibida
      const errorMessage = page.getByText(/user cancelled/i);
      await expect(errorMessage).toBeVisible();
    });

    test('deve ter botão para voltar ao login em caso de erro', async ({ page }) => {
      // Simular callback com erro
      await page.goto(`${BASE_URL}/dashboard/login/callback?error=access_denied&error_description=Error`);

      // Aguardar mensagem de erro
      await page.waitForTimeout(1000);

      // Verificar botão de voltar
      const backButton = page.getByRole('button', { name: /voltar para login/i });
      await expect(backButton).toBeVisible();

      // Clicar no botão
      await backButton.click();

      // Verificar redirecionamento para login
      await expect(page).toHaveURL(/\/dashboard\/login$/);
    });
  });

  // ==========================================================================
  // Estados de Loading
  // ==========================================================================

  test.describe('Estados de Loading', () => {
    test('deve mostrar loading durante processamento de callback', async ({ page }) => {
      // Mockar resposta lenta do backend
      await page.route(`${API_URL}/auth/oauth/google/callback`, async (route: any) => {
        // Delay de 1 segundo
        await new Promise(resolve => setTimeout(resolve, 1000));
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            data: {
              tokens: {
                accessToken: 'mock-token',
                refreshToken: 'mock-refresh',
                idToken: 'mock-id',
                expiresIn: 3600,
                tokenType: 'Bearer',
              },
              user: {
                id: 'user-123',
                cognitoSub: 'user-123',
                fullName: 'Test User',
                role: 'SUBSCRIBER',
                isActive: true,
                isBanned: false,
                postsCount: 0,
                commentsCount: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            },
          }),
        });
      });

      // Navegar para callback
      await page.goto(`${BASE_URL}/dashboard/login/callback?code=test-code`);

      // Verificar se loading é exibido
      const loadingText = page.getByText(/processando login/i);
      await expect(loadingText).toBeVisible();
    });

    test('deve desabilitar botões OAuth durante login tradicional', async ({ page }) => {
      // Mockar resposta lenta de login
      await page.route(`${API_URL}/auth/login`, async (route: any) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: false,
            message: 'Credenciais inválidas',
          }),
        });
      });

      // Preencher formulário
      await page.fill('input[type="email"]', 'test@example.com');
      await page.fill('input[type="password"]', 'wrongpassword');

      // Submeter formulário
      await page.click('button[type="submit"]');

      // Verificar se botões OAuth estão desabilitados
      const googleButton = page.getByRole('button', { name: /continuar com google/i });
      const githubButton = page.getByRole('button', { name: /continuar com github/i });

      await expect(googleButton).toBeDisabled();
      await expect(githubButton).toBeDisabled();
    });
  });

  // ==========================================================================
  // Persistência de Sessão
  // ==========================================================================

  test.describe('Persistência de Sessão', () => {
    test('deve manter usuário logado após reload', async ({ page, context }) => {
      // Mockar resposta do backend
      await mockOAuthBackend(page, 'google');

      // Simular callback OAuth bem-sucedido
      await page.goto(`${BASE_URL}/dashboard/login/callback?code=mock-code`);

      // Aguardar redirecionamento
      await page.waitForURL(/\/dashboard/);

      // Verificar localStorage
      const accessToken = await page.evaluate(() => localStorage.getItem('accessToken'));
      expect(accessToken).toBeTruthy();

      // Reload da página
      await page.reload();

      // Verificar se ainda está na página do dashboard (autenticado)
      await expect(page).toHaveURL(/\/dashboard/);
    });

    test('deve redirecionar para login se não autenticado', async ({ page }) => {
      // Limpar localStorage
      await page.evaluate(() => localStorage.clear());

      // Tentar acessar dashboard
      await page.goto(`${BASE_URL}/dashboard`);

      // Verificar redirecionamento para login
      await expect(page).toHaveURL(/\/dashboard\/login/);
    });
  });

  // ==========================================================================
  // Acessibilidade
  // ==========================================================================

  test.describe('Acessibilidade', () => {
    test('deve ter textos descritivos nos botões OAuth', async ({ page }) => {
      const googleButton = page.getByRole('button', { name: /continuar com google/i });
      const githubButton = page.getByRole('button', { name: /continuar com github/i });

      await expect(googleButton).toHaveAccessibleName(/google/i);
      await expect(githubButton).toHaveAccessibleName(/github/i);
    });

    test('deve permitir navegação por teclado', async ({ page }) => {
      // Tab até o primeiro botão OAuth
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab'); // Assumindo que há campos antes

      // Verificar se um dos botões OAuth está focado
      const focusedElement = await page.evaluate(() => {
        const activeElement = document.activeElement;
        return activeElement?.textContent?.toLowerCase();
      });

      const isOAuthButtonFocused =
        focusedElement?.includes('google') || focusedElement?.includes('github');

      expect(isOAuthButtonFocused).toBe(true);
    });
  });
});

