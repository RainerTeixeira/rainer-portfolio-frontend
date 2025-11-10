/**
 * Script para testar Google OAuth usando SEU CHROME REAL
 * Execute: node scripts/test-google-real-chrome.js
 *
 * IMPORTANTE: Feche TODOS os Chromes abertos antes de executar!
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const path = require('path');
const os = require('os');

puppeteer.use(StealthPlugin());

const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function testWithRealChrome() {
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('  🔒 Teste com SEU CHROME REAL (Sessão existente)');
  console.log('═══════════════════════════════════════════════════════\n');

  console.log('⚠️  IMPORTANTE: Feche TODOS os Chromes antes de continuar!');
  console.log('⏳ Aguardando 3 segundos...\n');
  await delay(3000);

  // Caminho do Chrome do usuário (Windows)
  const userDataDir = path.join(
    os.homedir(),
    'AppData',
    'Local',
    'Google',
    'Chrome',
    'User Data'
  );

  console.log('📁 Usando perfil:', userDataDir);
  console.log('✨ Isso vai usar suas sessões já logadas!\n');

  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: userDataDir, // USA SEU PERFIL REAL
    defaultViewport: null,
    devtools: true,
    args: [
      '--start-maximized',
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-default-browser-check',
    ],
  });

  try {
    const pages = await browser.pages();
    const page = pages[0] || (await browser.newPage());

    console.log('✅ Chrome iniciado com SEU perfil real');
    console.log('📧 Se já estiver logado no Google, vai usar sua sessão!\n');

    // ETAPA 1
    console.log('──────────────────────────────────────────────────────');
    console.log('ETAPA 1: Navegando para página de login\n');
    await page.goto(`${FRONTEND_URL}/dashboard/login`, {
      waitUntil: 'networkidle2',
    });
    console.log('✅ Página carregada');

    // ETAPA 2
    console.log('\n──────────────────────────────────────────────────────');
    console.log('ETAPA 2: Clicando no botão Google\n');
    await page.waitForSelector('button', { timeout: 10000 });

    const buttons = await page.$$('button');
    for (const button of buttons) {
      const text = await page.evaluate(el => el.textContent, button);
      if (text && text.includes('Google')) {
        await button.click();
        console.log('✅ Botão Google clicado');
        break;
      }
    }

    // ETAPA 3
    console.log('\n──────────────────────────────────────────────────────');
    console.log('ETAPA 3: Aguardando redirecionamento\n');
    await delay(3000);
    const currentUrl = page.url();
    console.log('📍 URL atual:', currentUrl);

    // ETAPA 4
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('👤 INTERAJA NO NAVEGADOR');
    console.log('═══════════════════════════════════════════════════════');
    console.log('✨ Se já estiver logado, selecione sua conta');
    console.log('🔑 Senão, faça login normalmente');
    console.log('📧 Email: raineroliveira94@hotmail.com');
    console.log('⏱️  Aguardando... (até 5 minutos)\n');

    // Aguarda callback
    await page.waitForFunction(
      () =>
        window.location.href.includes('/callback') ||
        window.location.href.includes('/dashboard'),
      { timeout: 300000 }
    );

    console.log('\n──────────────────────────────────────────────────────');
    console.log('ETAPA 4: Callback recebido!\n');
    console.log('📍 URL:', page.url());

    // Aguarda processamento
    console.log('⏳ Aguardando processamento...');
    await delay(5000);

    if (page.url().includes('/callback')) {
      console.log('⏳ Processando callback...');
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
      tokens.accessToken ? '✅ PRESENTE' : '❌ AUSENTE'
    );
    console.log(
      '   Refresh Token:',
      tokens.refreshToken ? '✅ PRESENTE' : '❌ AUSENTE'
    );
    console.log('   User:', tokens.user ? '✅ PRESENTE' : '❌ AUSENTE');

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
    console.error('\n❌ ERRO:', error.message);
    console.log('⏳ Aguardando 30 segundos para debug...');
    await delay(30000);
    throw error;
  } finally {
    await browser.close();
  }
}

testWithRealChrome()
  .then(() => {
    console.log('\n✅ Finalizado');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Erro:', error.message);
    process.exit(1);
  });
