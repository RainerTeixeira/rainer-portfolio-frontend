/**
 * Teste de Login com Google usando Puppeteer + Stealth Plugin
 *
 * Este teste usa puppeteer-extra com stealth plugin para evitar
 * detecção de automação pelo Google.
 */

import { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

// Adiciona plugin stealth
puppeteer.use(StealthPlugin());

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

// Helper para delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('Google OAuth com Puppeteer Stealth', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('  🚀 Iniciando Puppeteer com Stealth Plugin');
    console.log('═══════════════════════════════════════════════════════\n');

    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: [
        '--start-maximized',
        '--disable-blink-features=AutomationControlled',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
      ],
    });

    const pages = await browser.pages();
    page = pages[0] || (await browser.newPage());

    // Configurar viewport
    await page.setViewport({ width: 1920, height: 1080 });

    // Configurar user agent real
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    // Adicionar propriedades extras
    await page.evaluateOnNewDocument(() => {
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

      // Permissions
      const originalQuery = window.navigator.permissions.query;
      // @ts-ignore
      window.navigator.permissions.query = (parameters: any) =>
        parameters.name === 'notifications'
          ? Promise.resolve({ state: Notification.permission } as any)
          : originalQuery(parameters);
    });

    console.log('✅ Browser iniciado com Stealth Plugin');
    console.log('📧 Email para login: raineroliveira94@hotmail.com\n');
  }, 60000);

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  }, 30000);

  test('Login com Google - Fluxo Completo', async () => {
    console.log('───────────────────────────────────────────────────────');
    console.log('  ETAPA 1: Navegando para página de login');
    console.log('───────────────────────────────────────────────────────\n');

    await page.goto(`${FRONTEND_URL}/dashboard/login`, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    console.log('✅ Página carregada:', page.url());
    await page.screenshot({
      path: 'test-results/stealth-step1-login.png',
      fullPage: true,
    });

    console.log('\n───────────────────────────────────────────────────────');
    console.log('  ETAPA 2: Clicando no botão Google');
    console.log('───────────────────────────────────────────────────────\n');

    // Aguarda e clica no botão Google
    await page.waitForSelector('button:has-text("Google")', { timeout: 10000 });
    console.log('✅ Botão Google encontrado');

    await page.click('button:has-text("Google")');
    console.log('✅ Botão clicado');

    console.log('\n───────────────────────────────────────────────────────');
    console.log('  ETAPA 3: Aguardando redirecionamento para Google');
    console.log('───────────────────────────────────────────────────────\n');

    // Aguarda navegação para Google/Cognito
    await page.waitForNavigation({ timeout: 15000 }).catch(() => {
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
      path: 'test-results/stealth-step3-oauth.png',
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
    await page.waitForFunction(
      () => {
        return (
          window.location.href.includes('/callback') ||
          window.location.href.includes('/dashboard')
        );
      },
      { timeout: 300000 }
    );

    console.log('\n───────────────────────────────────────────────────────');
    console.log('  ETAPA 4: Callback recebido');
    console.log('───────────────────────────────────────────────────────\n');

    const callbackUrl = page.url();
    console.log('✅ Callback URL:', callbackUrl);
    await page.screenshot({
      path: 'test-results/stealth-step4-callback.png',
      fullPage: true,
    });

    console.log('\n───────────────────────────────────────────────────────');
    console.log('  ETAPA 5: Aguardando processamento');
    console.log('───────────────────────────────────────────────────────\n');

    // Aguarda processar e redirecionar
    await delay(5000);

    // Se ainda no callback, aguarda ir para dashboard
    if (page.url().includes('/callback')) {
      console.log('⏳ Ainda no callback, aguardando navegação...');
      await page.waitForFunction(
        () => window.location.href.includes('/dashboard'),
        { timeout: 30000 }
      );
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
      path: 'test-results/stealth-step6-final.png',
      fullPage: true,
    });

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('  ✅ TESTE CONCLUÍDO COM SUCESSO');
    console.log('═══════════════════════════════════════════════════════\n');

    // Validações
    expect(finalUrl).toContain('/dashboard');
    expect(tokens.accessToken).toBeTruthy();

    // Aguarda 3 segundos para visualizar
    await delay(3000);
  }, 600000); // 10 minutos de timeout
});
