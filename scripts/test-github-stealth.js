/**
 * Script para testar GitHub OAuth com Puppeteer Stealth
 * Execute: node scripts/test-github-stealth.js
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// Adiciona plugin stealth
puppeteer.use(StealthPlugin());

const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

// Helper para delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function testGitHubOAuth() {
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('  🔒 Teste GitHub OAuth com Puppeteer Stealth');
  console.log('═══════════════════════════════════════════════════════\n');

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    devtools: true, // Abre DevTools automaticamente
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
      window.chrome = { runtime: {} };
      Object.defineProperty(navigator, 'plugins', {
        get: () => [1, 2, 3, 4, 5],
      });
      Object.defineProperty(navigator, 'languages', {
        get: () => ['pt-BR', 'pt', 'en-US', 'en'],
      });
    });

    console.log('✅ Browser iniciado com Stealth Plugin');
    console.log('🔧 DevTools aberto para você ver em tempo real');
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
      if (text && text.includes('GitHub')) {
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

    // ETAPA 4: Login manual
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('👤 FAÇA LOGIN MANUALMENTE NO NAVEGADOR');
    console.log('═══════════════════════════════════════════════════════');
    console.log('📧 Email: raineroliveira94@hotmail.com');
    console.log('🔑 Digite sua senha do GitHub');
    console.log('⏱️  Aguardando... (até 5 minutos)');
    console.log('👁️  Veja o progresso no Chrome que abriu\n');

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
    console.log('⏳ Aguardando processamento (5 segundos)...');
    await delay(5000);

    // Aguarda dashboard se ainda no callback
    if (page.url().includes('/callback')) {
      console.log('⏳ Ainda no callback, aguardando redirecionamento...');
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
    console.log(
      '   Access Token:',
      tokens.accessToken ? '✅ Presente' : '❌ Ausente'
    );
    console.log(
      '   Refresh Token:',
      tokens.refreshToken ? '✅ Presente' : '❌ Ausente'
    );
    console.log('   User:', tokens.user ? '✅ Presente' : '❌ Ausente');

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

    console.log('⏳ Aguardando 10 segundos antes de fechar...');
    await delay(10000);
  } catch (error) {
    console.error('\n❌ ERRO:', error);
    console.log('\n🔍 URL atual:', page.url());
    console.log('⏳ Aguardando 30 segundos para você ver o erro...');
    await delay(30000);
    throw error;
  } finally {
    await browser.close();
  }
}

// Executa
testGitHubOAuth()
  .then(() => {
    console.log('\n✅ Processo finalizado');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Erro no teste:', error.message);
    process.exit(1);
  });
