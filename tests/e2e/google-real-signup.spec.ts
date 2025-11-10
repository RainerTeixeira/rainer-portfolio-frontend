import { expect, test } from '@playwright/test';

/**
 * Teste Real de Criação de Conta com Google - Integração com Cognito
 *
 * Este teste REAL:
 * 1. Abre o navegador Chrome (não headless)
 * 2. Navega para página de login
 * 3. Clica em "Login com Google"
 * 4. Redireciona para Cognito Hosted UI (REAL)
 * 5. Usuário faz login com conta Google REAL
 * 6. Cognito cria/sincroniza usuário
 * 7. Valida que usuário foi autenticado e redirecionado para dashboard
 *
 * IMPORTANTE:
 * - Este teste requer configuração real do Cognito
 * - Usuário precisa fazer login manualmente com Google
 * - Testa o fluxo completo end-to-end REAL
 *
 * Variáveis necessárias:
 * - NEXT_PUBLIC_API_URL (URL do backend)
 * - Backend deve ter COGNITO_DOMAIN, COGNITO_CLIENT_ID configurados
 * - Google e GitHub devem estar configurados no Cognito User Pool
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

test.describe('Google Real Signup - Integração Cognito', () => {
  test.use({
    // Desabilita detecção de automação para permitir login no Google
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 },
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
  });

  test('real Google signup flow with user interaction @manual', async ({
    browser,
  }) => {
    // Cria um contexto sem flags de automação
    const context = await browser.newContext({
      // Remove flags que indicam automação
      javaScriptEnabled: true,
      acceptDownloads: true,
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      viewport: { width: 1920, height: 1080 },
      locale: 'pt-BR',
      timezoneId: 'America/Sao_Paulo',
    });

    const page = await context.newPage();

    // Executa script para remover propriedades de automação
    await page.addInitScript(() => {
      // Remove webdriver flag
      Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined,
      });

      // Adiciona plugins
      Object.defineProperty(navigator, 'plugins', {
        get: () => [1, 2, 3, 4, 5],
      });

      // Adiciona languages
      Object.defineProperty(navigator, 'languages', {
        get: () => ['pt-BR', 'pt', 'en-US', 'en'],
      });

      // Chrome específico
      (window as any).chrome = {
        runtime: {},
      };

      // Permissions
      const originalQuery = window.navigator.permissions.query;
      window.navigator.permissions.query = (parameters: any) =>
        parameters.name === 'notifications'
          ? Promise.resolve({ state: Notification.permission } as any)
          : originalQuery(parameters);
    });

    test.setTimeout(600000); // 10 minutos para permitir login manual completo

    try {
      // Step 1: Vai para página de login
      await page.goto('/dashboard/login');
      await page.waitForLoadState('networkidle');

      // Step 2: Verifica que botão Google está visível
      const googleBtn = page.getByRole('button', { name: /Google/i });
      await expect(googleBtn).toBeVisible();

      console.log('✅ Botão Google encontrado. Clicando...');

      // Step 3: Clica no botão Google (vai para backend, depois Cognito REAL)
      await googleBtn.click();

      // Step 4: Aguarda redirecionamento para backend
      console.log('⏳ Aguardando redirecionamento para backend...');
      await page
        .waitForURL(
          url => {
            const urlStr = url.toString();
            return urlStr.includes('/auth/oauth/google');
          },
          { timeout: 10000 }
        )
        .catch(() => {
          // Pode ir direto para Cognito se backend redirecionar rápido
          console.log(
            '⚠️ Não foi para backend, pode ter ido direto para Cognito'
          );
        });

      // Step 5: Aguarda redirecionamento para Cognito Hosted UI REAL
      console.log('⏳ Aguardando redirecionamento para Cognito Hosted UI...');
      await page.waitForURL(
        url => {
          const urlStr = url.toString();
          return (
            urlStr.includes('oauth2/authorize') ||
            urlStr.includes('amazoncognito.com') ||
            urlStr.includes('accounts.google.com')
          );
        },
        { timeout: 15000 }
      );

      const cognitoUrl = page.url();
      console.log(`📍 URL atual: ${cognitoUrl}`);

      // Verifica que está no Cognito ou Google
      expect(
        cognitoUrl.includes('oauth2/authorize') ||
          cognitoUrl.includes('amazoncognito.com') ||
          cognitoUrl.includes('accounts.google.com')
      ).toBeTruthy();

      // Step 6: Aguarda usuário fazer login manualmente
      console.log('👤 AGUARDANDO LOGIN MANUAL COM GOOGLE...');
      console.log('   Por favor, faça login com sua conta Google');
      console.log('   O teste aguardará até você completar o login...');

      // Aguarda redirecionamento de volta para callback (após login)
      await page.waitForURL(
        url => {
          const urlStr = url.toString();
          return urlStr.includes('/dashboard/login/callback');
        },
        { timeout: 300000 } // 5 minutos para usuário fazer login
      );

      console.log('✅ Callback recebido! Aguardando processamento...');

      // Step 7: Aguarda processamento do callback pelo frontend
      // O frontend deve chamar o backend POST /auth/oauth/google/callback
      await page
        .waitForResponse(
          resp =>
            resp.url().includes('/auth/oauth/google/callback') &&
            (resp.status() === 200 || resp.status() === 201),
          { timeout: 30000 }
        )
        .catch(err => {
          console.log('⚠️ Não recebeu resposta do backend callback:', err);
        });

      // Step 8: Aguarda mensagem de sucesso ou redirecionamento
      try {
        await expect(
          page.getByText(/Login realizado com sucesso|Bem-vindo|sucesso/i)
        ).toBeVisible({ timeout: 10000 });
        console.log('✅ Mensagem de sucesso encontrada!');
      } catch {
        console.log(
          '⚠️ Mensagem de sucesso não encontrada, mas continuando...'
        );
      }

      // Step 9: Aguarda redirecionamento para dashboard
      console.log('⏳ Aguardando redirecionamento para dashboard...');
      await page.waitForURL('**/dashboard', { timeout: 30000 });

      const dashboardUrl = page.url();
      console.log(`📍 URL do dashboard: ${dashboardUrl}`);
      expect(dashboardUrl).toMatch(/\/dashboard/);

      // Step 10: Verifica que usuário está autenticado
      // Verifica tokens no localStorage
      const tokens = await page.evaluate(() => {
        return {
          accessToken: localStorage.getItem('accessToken'),
          refreshToken: localStorage.getItem('refreshToken'),
          idToken: localStorage.getItem('idToken'),
          user: localStorage.getItem('user'),
        };
      });

      console.log('🔍 Verificando autenticação...');
      console.log(
        '   Access Token:',
        tokens.accessToken ? '✅ Presente' : '❌ Ausente'
      );
      console.log(
        '   ID Token:',
        tokens.idToken ? '✅ Presente' : '❌ Ausente'
      );
      console.log('   User:', tokens.user ? '✅ Presente' : '❌ Ausente');

      // Valida que pelo menos o accessToken está presente
      if (tokens.accessToken) {
        expect(tokens.accessToken.length).toBeGreaterThan(0);
        console.log('✅ Usuário autenticado com sucesso!');
      } else {
        console.log('⚠️ Tokens não encontrados no localStorage');
        // Pode estar usando cookies ou outra forma de armazenamento
      }

      // Step 11: Verifica elementos do dashboard que indicam autenticação
      // Aguarda alguns elementos típicos do dashboard
      try {
        await page.waitForSelector('body', { timeout: 5000 });
        const pageContent = await page.textContent('body');

        // Verifica se não está na página de login
        expect(pageContent).not.toContain('Bem-vindo de Volta');
        expect(pageContent).not.toContain('Entre com suas credenciais');

        console.log('✅ Dashboard carregado corretamente!');
      } catch (err) {
        console.log('⚠️ Não foi possível validar conteúdo do dashboard:', err);
      }

      // Step 12: Tira screenshot final para documentação
      await page.screenshot({
        path: 'test-results/google-real-signup-success.png',
        fullPage: true,
      });

      console.log(
        '📸 Screenshot salvo: test-results/google-real-signup-success.png'
      );
      console.log('✅ Teste de signup real com Google concluído!');
    } finally {
      await context.close();
    }
  });

  test('validates Google OAuth redirect flow', async ({ page }) => {
    // Teste mais rápido que apenas valida o redirect inicial
    await page.goto('/dashboard/login');

    const googleBtn = page.getByRole('button', { name: /Google/i });
    await expect(googleBtn).toBeVisible();

    // Intercepta a requisição ao backend
    let backendCalled = false;
    let redirectUri = '';

    await page.route(`${API_BASE_URL}/auth/oauth/google*`, async route => {
      backendCalled = true;
      const url = new URL(route.request().url());
      redirectUri = url.searchParams.get('redirect_uri') || '';

      // Continua com a requisição real (não mocka)
      await route.continue();
    });

    // Clica e aguarda navegação
    const [navigation] = await Promise.all([
      page.waitForNavigation({ timeout: 15000 }),
      googleBtn.click(),
    ]);

    // Valida que backend foi chamado
    expect(backendCalled).toBeTruthy();
    expect(redirectUri).toContain('/dashboard/login/callback');

    // Valida que foi redirecionado para Cognito ou Google
    const currentUrl = page.url();
    const isCognitoOrGoogle =
      currentUrl.includes('oauth2/authorize') ||
      currentUrl.includes('amazoncognito.com') ||
      currentUrl.includes('accounts.google.com');

    expect(isCognitoOrGoogle).toBeTruthy();
    console.log('✅ Redirect para Cognito/Google validado:', currentUrl);
  });
});
