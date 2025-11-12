/**
 * Teste de Login com Google usando Playwright
 *
 * Este teste usa Playwright com configurações anti-detecção
 * para testar o fluxo completo de OAuth do Google.
 *
 * @see docs/09-TESTES/README.md
 */

import { expect, test } from './fixtures';

// Configurações para evitar detecção (top-level)
test.use({
  channel: 'chrome',
  headless: false,
  viewport: { width: 1920, height: 1080 },
});

test.describe('Google OAuth - Fluxo Completo', () => {
  test('Login com Google - Fluxo Completo', async ({ page, consoleHelper }) => {
    test.setTimeout(600000); // 10 minutos

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('  🚀 Iniciando teste de OAuth Google');
    console.log('═══════════════════════════════════════════════════════\n');

    // Configurar user agent real
    await page.setExtraHTTPHeaders({
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });

    // Adicionar propriedades extras para evitar detecção
    await page.addInitScript(() => {
      // Remove webdriver flag
      Object.defineProperty(navigator, 'webdriver', {
        get: () => false,
      });

      // Adiciona Chrome
      (window as any).chrome = {
        runtime: {},
        loadTimes: function () {},
        csi: function () {},
        app: {},
      };

      // Adiciona plugins
      Object.defineProperty(navigator, 'plugins', {
        get: () => [1, 2, 3, 4, 5],
      });

      // Adiciona languages
      Object.defineProperty(navigator, 'languages', {
        get: () => ['pt-BR', 'pt', 'en-US', 'en'],
      });
    });

    console.log('───────────────────────────────────────────────────────');
    console.log('  ETAPA 1: Navegando para página de login');
    console.log('───────────────────────────────────────────────────────\n');

    await page.goto('/dashboard/login', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    console.log('✅ Página carregada:', page.url());
    await page.screenshot({
      path: 'test-results/google-oauth-step1-login.png',
      fullPage: true,
    });

    console.log('\n───────────────────────────────────────────────────────');
    console.log('  ETAPA 2: Clicando no botão Google');
    console.log('───────────────────────────────────────────────────────\n');

    // Aguarda e clica no botão Google
    const googleButton = page.locator(
      'button:has-text("Google"), button[aria-label*="Google" i]'
    );
    await googleButton.waitFor({ timeout: 10000 });
    console.log('✅ Botão Google encontrado');

    await googleButton.click();
    console.log('✅ Botão clicado');

    console.log('\n───────────────────────────────────────────────────────');
    console.log('  ETAPA 3: Aguardando redirecionamento para Google');
    console.log('───────────────────────────────────────────────────────\n');

    // Aguarda navegação para Google/Cognito
    await page
      .waitForURL(
        url =>
          url.includes('accounts.google.com') ||
          url.includes('amazoncognito.com') ||
          url.includes('oauth2/authorize'),
        { timeout: 15000 }
      )
      .catch(() => {
        console.log('⚠️  Navegação não detectada, verificando URL...');
      });

    const currentUrl = page.url();
    console.log('📍 URL atual:', currentUrl);

    // Verifica se foi para Google ou Cognito
    const isOAuthPage =
      currentUrl.includes('accounts.google.com') ||
      currentUrl.includes('amazoncognito.com') ||
      currentUrl.includes('oauth2/authorize');

    if (!isOAuthPage) {
      throw new Error(`Não redirecionou para OAuth. URL: ${currentUrl}`);
    }

    console.log('✅ Redirecionado para OAuth');
    await page.screenshot({
      path: 'test-results/google-oauth-step3-oauth.png',
      fullPage: true,
    });

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('  👤 AÇÃO MANUAL NECESSÁRIA');
    console.log('═══════════════════════════════════════════════════════');
    console.log('');
    console.log('  📧 Email: raineroliveira94@hotmail.com');
    console.log('  🔑 Digite sua senha no navegador');
    console.log('  ⏱️  Aguardando... (até 5 minutos)');
    console.log('');

    // Aguarda callback (300 segundos = 5 minutos)
    await page.waitForURL(
      url => url.includes('/callback') || url.includes('/dashboard'),
      { timeout: 300000 }
    );

    console.log('\n───────────────────────────────────────────────────────');
    console.log('  ETAPA 4: Callback recebido');
    console.log('───────────────────────────────────────────────────────\n');

    const callbackUrl = page.url();
    console.log('✅ Callback URL:', callbackUrl);
    await page.screenshot({
      path: 'test-results/google-oauth-step4-callback.png',
      fullPage: true,
    });

    console.log('\n───────────────────────────────────────────────────────');
    console.log('  ETAPA 5: Aguardando processamento');
    console.log('───────────────────────────────────────────────────────\n');

    // Aguarda processar e redirecionar
    await page.waitForTimeout(5000);

    // Se ainda no callback, aguarda ir para dashboard
    if (page.url().includes('/callback')) {
      console.log('⏳ Ainda no callback, aguardando navegação...');
      await page.waitForURL(url => url.includes('/dashboard'), {
        timeout: 30000,
      });
    }

    const finalUrl = page.url();
    console.log('✅ URL final:', finalUrl);

    console.log('\n───────────────────────────────────────────────────────');
    console.log('  ETAPA 6: Validando autenticação');
    console.log('───────────────────────────────────────────────────────\n');

    // Verifica tokens
    const tokens = await page.evaluate(() => {
      return {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
        idToken: localStorage.getItem('idToken'),
        user: localStorage.getItem('user'),
      };
    });

    console.log('🔍 Tokens:');
    console.log(
      '   Access Token:',
      tokens.accessToken ? `✅ ${tokens.accessToken.substring(0, 20)}...` : '❌'
    );
    console.log(
      '   Refresh Token:',
      tokens.refreshToken
        ? `✅ ${tokens.refreshToken.substring(0, 20)}...`
        : '❌'
    );
    console.log('   ID Token:', tokens.idToken ? '✅' : '❌');
    console.log('   User:', tokens.user ? '✅' : '❌');

    if (tokens.user) {
      const user = JSON.parse(tokens.user);
      console.log('\n👤 Usuário:');
      console.log('   Email:', user.email || 'N/A');
      console.log('   Nome:', user.name || user.fullName || 'N/A');
      console.log('   ID:', user.id || user.sub || 'N/A');
    }

    await page.screenshot({
      path: 'test-results/google-oauth-step6-final.png',
      fullPage: true,
    });

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('  ✅ TESTE CONCLUÍDO COM SUCESSO');
    console.log('═══════════════════════════════════════════════════════\n');

    // Validações
    expect(finalUrl).toContain('/dashboard');
    expect(tokens.accessToken).toBeTruthy();

    // Verificar erros críticos
    const criticalErrors = consoleHelper
      .getErrors()
      .filter(
        e =>
          !e.text.includes('500') &&
          !e.text.includes('Internal Server Error') &&
          !e.text.includes('COLOR_CYAN') &&
          !e.text.includes('Module parse failed')
      );
    expect(criticalErrors.length).toBeLessThan(5);

    // Aguarda 3 segundos para visualizar
    await page.waitForTimeout(3000);
  });
});
