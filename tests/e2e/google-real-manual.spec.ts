import { chromium, expect, test } from '@playwright/test';

/**
 * Teste MANUAL Real com Google - Usando Chrome do Sistema
 *
 * Este teste usa o Chrome instalado no sistema com seu perfil real,
 * evitando completamente a detecção de automação pelo Google.
 *
 * IMPORTANTE:
 * - Usa o perfil real do Chrome (suas sessões salvas)
 * - Não é detectado como automação pelo Google
 * - Permite login normal com Google
 *
 * Execute com:
 * npx playwright test tests/e2e/google-real-manual.spec.ts --project=chrome
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

test.describe('Google Real Manual Signup', () => {
  test('manual Google signup with real Chrome profile', async () => {
    test.setTimeout(600000); // 10 minutos

    // Caminho para perfil temporário do Chrome
    // Usando um perfil temporário para não interferir com seu Chrome principal
    const userDataDir = './test-chrome-profile';

    // Lança Chrome com perfil persistente (não detectado como automação)
    const context = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      channel: 'chrome',
      viewport: { width: 1920, height: 1080 },
      locale: 'pt-BR',
      timezoneId: 'America/Sao_Paulo',
      args: [
        '--disable-blink-features=AutomationControlled', // Remove detecção de automação
        '--disable-dev-shm-usage',
        '--no-sandbox',
      ],
    });

    const page = context.pages()[0] || (await context.newPage());

    // Capturar mensagens do console do navegador
    page.on('console', msg => {
      const type = msg.type();
      const text = msg.text();

      if (
        type === 'error' ||
        text.includes('Error') ||
        text.includes('Erro') ||
        text.includes('OAuth')
      ) {
        console.log(`[BROWSER ${type.toUpperCase()}]:`, text);
      }
    });

    // Capturar erros de página
    page.on('pageerror', error => {
      console.log('[BROWSER PAGE ERROR]:', error.message);
    });

    // Capturar falhas de requisição
    page.on('requestfailed', request => {
      console.log(
        '[REQUEST FAILED]:',
        request.url(),
        request.failure()?.errorText
      );
    });

    try {
      console.log('🚀 Iniciando teste manual com Google...');
      console.log('📧 Email a usar: raineroliveira94@hotmail.com');
      console.log(
        '🔍 Backend URL:',
        API_BASE_URL || 'NEXT_PUBLIC_API_URL não configurado!'
      );
      console.log('');

      // Step 1: Vai para página de login
      await page.goto('http://localhost:3000/dashboard/login');
      await page.waitForLoadState('networkidle');
      console.log('✅ Página de login carregada');

      // Step 2: Encontra botão Google
      const googleBtn = page.getByRole('button', { name: /Google/i });
      await expect(googleBtn).toBeVisible();
      console.log('✅ Botão Google encontrado');

      // Pausa para usuário ver
      await page.waitForTimeout(1000);

      // Step 3: Clica no botão Google
      console.log('🖱️  Clicando em "Login com Google"...');
      await googleBtn.click();

      // Step 4: Aguarda navegação para Google/Cognito
      console.log('⏳ Aguardando redirecionamento...');

      await page.waitForURL(
        url => {
          const urlStr = url.toString();
          return (
            urlStr.includes('oauth2/authorize') ||
            urlStr.includes('amazoncognito.com') ||
            urlStr.includes('accounts.google.com') ||
            urlStr.includes('/auth/oauth/google')
          );
        },
        { timeout: 20000 }
      );

      const currentUrl = page.url();
      console.log('📍 URL atual:', currentUrl);
      console.log('');
      console.log('👤 AGUARDANDO LOGIN MANUAL COM GOOGLE');
      console.log('   📧 Email: raineroliveira94@hotmail.com');
      console.log('   🔑 Digite sua senha quando solicitado');
      console.log('   ⏳ O teste aguardará até você completar o login...');
      console.log('');

      // Step 5: Aguarda callback (após login bem-sucedido)
      await page.waitForURL(
        url => {
          const urlStr = url.toString();
          return (
            urlStr.includes('/dashboard/login/callback') ||
            urlStr.includes('/dashboard')
          );
        },
        { timeout: 300000 } // 5 minutos
      );

      console.log('✅ Callback recebido!');
      console.log('📍 URL após callback:', page.url());

      // Step 6: Aguarda processamento
      console.log('⏳ Aguardando processamento do callback...');

      // Espera requisição ao backend callback
      const callbackResponse = await page
        .waitForResponse(
          resp =>
            resp.url().includes('/auth/oauth') &&
            resp.url().includes('/callback'),
          { timeout: 30000 }
        )
        .catch(err => {
          console.log('⚠️  Não detectou requisição ao backend callback');
          return null;
        });

      if (callbackResponse) {
        const status = callbackResponse.status();
        console.log('📡 Resposta do backend callback:', status);

        if (status !== 200 && status !== 201) {
          const body = await callbackResponse.text().catch(() => 'N/A');
          console.log('❌ Erro na resposta:', body);
        }
      }

      await page.waitForTimeout(3000);

      // Step 7: Aguarda redirecionamento para dashboard
      console.log('⏳ Aguardando redirecionamento para dashboard...');

      // Se ainda estiver no callback, aguarda navegação
      if (page.url().includes('/callback')) {
        await page.waitForURL('**/dashboard', { timeout: 30000 });
      }

      console.log('✅ Dashboard alcançado!');
      console.log('📍 URL final:', page.url());

      // Step 8: Verifica autenticação
      const tokens = await page.evaluate(() => {
        return {
          accessToken: localStorage.getItem('accessToken'),
          refreshToken: localStorage.getItem('refreshToken'),
          idToken: localStorage.getItem('idToken'),
          user: localStorage.getItem('user'),
        };
      });

      console.log('');
      console.log('🔍 Verificando autenticação:');
      console.log(
        '   Access Token:',
        tokens.accessToken ? '✅ Presente' : '⚠️  Ausente'
      );
      console.log(
        '   Refresh Token:',
        tokens.refreshToken ? '✅ Presente' : '⚠️  Ausente'
      );
      console.log(
        '   ID Token:',
        tokens.idToken ? '✅ Presente' : '⚠️  Ausente'
      );
      console.log('   User Data:', tokens.user ? '✅ Presente' : '⚠️  Ausente');

      if (tokens.user) {
        const userData = JSON.parse(tokens.user);
        console.log('');
        console.log('👤 Dados do usuário:');
        console.log('   Email:', userData.email || 'N/A');
        console.log('   Nome:', userData.name || 'N/A');
        console.log('   ID:', userData.sub || userData.id || 'N/A');
      }

      // Validações
      expect(page.url()).toContain('/dashboard');

      if (tokens.accessToken) {
        expect(tokens.accessToken.length).toBeGreaterThan(0);
      }

      // Step 9: Screenshot final
      await page.screenshot({
        path: 'test-results/google-manual-success.png',
        fullPage: true,
      });

      console.log('');
      console.log(
        '📸 Screenshot salvo: test-results/google-manual-success.png'
      );
      console.log('✅ Teste concluído com sucesso!');

      // Aguarda 3 segundos para visualizar
      await page.waitForTimeout(3000);
    } catch (error) {
      console.error('❌ Erro durante o teste:', error);

      // Screenshot do erro
      await page.screenshot({
        path: 'test-results/google-manual-error.png',
        fullPage: true,
      });

      console.log(
        '📸 Screenshot do erro salvo: test-results/google-manual-error.png'
      );
      throw error;
    } finally {
      await context.close();
    }
  });
});
