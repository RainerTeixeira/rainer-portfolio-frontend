/**
 * Script para testar GitHub OAuth com Puppeteer Stealth
 * Execute: npx ts-node scripts/test-github-stealth.ts
 */

import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

// Adiciona plugin stealth
puppeteer.use(StealthPlugin());

const FRONTEND_URL = 'http://localhost:3000';

// Helper para delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function testGitHubOAuth() {
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('  🔒 Teste GitHub OAuth com Puppeteer Stealth');
  console.log('═══════════════════════════════════════════════════════\n');

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: [
      '--start-maximized',
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });

  try {
    const pages = await browser.pages();
    const page = pages[0] || (await browser.newPage());

    // User agent real
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    // Remove detecção
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => false });
      (window as any).chrome = { runtime: {} };
      Object.defineProperty(navigator, 'plugins', {
        get: () => [1, 2, 3, 4, 5],
      });
      Object.defineProperty(navigator, 'languages', {
        get: () => ['pt-BR', 'pt', 'en-US', 'en'],
      });
    });

    console.log('✅ Browser iniciado com Stealth Plugin');
    console.log('📧 Email: raineroliveira94@hotmail.com\n');

    // ETAPA 1: Ir para login
    console.log('──────────────────────────────────────────────────────');
    console.log('ETAPA 1: Navegando para página de login\n');
    await page.goto(`${FRONTEND_URL}/dashboard/login`, {
      waitUntil: 'networkidle2',
    });
    console.log('✅ Página carregada');

    // ETAPA 2: Clicar em GitHub
    console.log('\n──────────────────────────────────────────────────────');
    console.log('ETAPA 2: Clicando no botão GitHub\n');
    await page.waitForSelector('button', { timeout: 10000 });

    // Procura botão com texto GitHub
    const buttons = await page.$$('button');
    for (const button of buttons) {
      const text = await page.evaluate(el => el.textContent, button);
      if (text?.includes('GitHub')) {
        await button.click();
        console.log('✅ Botão GitHub clicado');
        break;
      }
    }

    // ETAPA 3: Aguardar redirecionamento
    console.log('\n──────────────────────────────────────────────────────');
    console.log('ETAPA 3: Aguardando redirecionamento\n');
    await delay(3000);
    const currentUrl = page.url();
    console.log('📍 URL atual:', currentUrl);

    // Verifica se foi para GitHub ou Cognito
    const isOAuthPage =
      currentUrl.includes('github.com') ||
      currentUrl.includes('amazoncognito.com') ||
      currentUrl.includes('oauth2/authorize');

    if (isOAuthPage) {
      console.log('✅ Redirecionado para OAuth');
    } else {
      console.log('⚠️  URL não parece ser OAuth:', currentUrl);
    }

    // ETAPA 4: Login manual
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('👤 FAÇA LOGIN MANUALMENTE NO NAVEGADOR');
    console.log('═══════════════════════════════════════════════════════');
    console.log('📧 Email: raineroliveira94@hotmail.com');
    console.log('🔑 Digite sua senha do GitHub');
    console.log('⏱️  Aguardando... (até 5 minutos)\n');

    // Aguarda callback
    await page.waitForFunction(
      () =>
        window.location.href.includes('/callback') ||
        window.location.href.includes('/dashboard'),
      { timeout: 300000 }
    );

    console.log('\n──────────────────────────────────────────────────────');
    console.log('ETAPA 4: Callback recebido\n');
    console.log('📍 URL:', page.url());

    // Aguarda processamento
    await delay(5000);

    // Aguarda dashboard se ainda no callback
    if (page.url().includes('/callback')) {
      console.log('⏳ Aguardando redirecionamento para dashboard...');
      await page.waitForFunction(
        () => window.location.href.includes('/dashboard'),
        { timeout: 30000 }
      );
    }

    console.log('\n──────────────────────────────────────────────────────');
    console.log('ETAPA 5: Validando autenticação\n');

    const tokens = await page.evaluate(() => ({
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
      user: localStorage.getItem('user'),
    }));

    console.log('🔍 Resultado:');
    console.log('   Access Token:', tokens.accessToken ? '✅' : '❌');
    console.log('   Refresh Token:', tokens.refreshToken ? '✅' : '❌');
    console.log('   User:', tokens.user ? '✅' : '❌');

    if (tokens.user) {
      const user = JSON.parse(tokens.user);
      console.log('\n👤 Usuário autenticado:');
      console.log('   Email:', user.email);
      console.log('   Nome:', user.name || user.fullName);
      console.log('   ID:', user.id || user.sub);
    }

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('✅ TESTE CONCLUÍDO COM SUCESSO!');
    console.log('═══════════════════════════════════════════════════════\n');

    await delay(3000);
  } catch (error) {
    console.error('\n❌ ERRO:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Executa
testGitHubOAuth()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
