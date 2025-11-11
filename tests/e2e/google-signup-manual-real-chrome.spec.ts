import { chromium } from '@playwright/test';
import * as os from 'os';
import * as path from 'path';
import { expect, test } from './fixtures';

/**
 * Teste MANUAL com Chrome REAL do Sistema
 *
 * Este teste usa o perfil REAL do usuário do Chrome instalado,
 * evitando TOTALMENTE a detecção de automação.
 *
 * IMPORTANTE:
 * - Usa o Chrome instalado no Windows
 * - Pode usar sessões já logadas do Google
 * - Não é detectado como bot
 */

test.describe('Google Real Browser Test', () => {
  test('manual signup with real user Chrome profile', async () => {
    test.setTimeout(600000); // 10 minutos

    // Caminho do perfil do Chrome do usuário (Windows)
    const userDataDir = path.join(
      os.homedir(),
      'AppData',
      'Local',
      'Google',
      'Chrome',
      'User Data'
    );

    console.log('');
    console.log('═══════════════════════════════════════════════════════');
    console.log('  🚀 TESTE COM CHROME REAL DO SISTEMA');
    console.log('═══════════════════════════════════════════════════════');
    console.log('');
    console.log('📁 Perfil Chrome:', userDataDir);
    console.log('📧 Email para usar: raineroliveira94@hotmail.com');
    console.log('🔍 Backend: http://localhost:4000');
    console.log('');

    // Lança Chrome com perfil DO USUÁRIO
    // ATENÇÃO: Fecha todos os Chromes abertos antes!
    const context = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      channel: 'chrome',
      viewport: { width: 1920, height: 1080 },
      args: [
        '--disable-blink-features=AutomationControlled',
        '--disable-dev-shm-usage',
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-popup-blocking',
        '--disable-infobars',
        '--start-maximized',
      ],
    });

    const page = context.pages()[0] || (await context.newPage());

    // ========================================================================
    // CAPTURA DE LOGS COMPLETA
    // ========================================================================

    const logs: string[] = [];
    const errors: string[] = [];
    const networkLogs: { url: string; status: number; method: string }[] = [];

    // Console do navegador
    page.on('console', msg => {
      const type = msg.type();
      const text = msg.text();
      const log = `[BROWSER ${type.toUpperCase()}]: ${text}`;
      logs.push(log);
      console.log(log);
    });

    // Erros de página
    page.on('pageerror', error => {
      const log = `[PAGE ERROR]: ${error.message}`;
      errors.push(log);
      console.log(log);
    });

    // Requisições
    page.on('request', request => {
      const url = request.url();
      if (url.includes('localhost:4000') || url.includes('/auth/oauth')) {
        const log = `[REQUEST] ${request.method()} ${url}`;
        console.log(log);
        logs.push(log);
      }
    });

    // Respostas
    page.on('response', response => {
      const url = response.url();
      if (url.includes('localhost:4000') || url.includes('/auth/oauth')) {
        const status = response.status();
        const method = response.request().method();
        const log = `[RESPONSE] ${method} ${url} - Status: ${status}`;
        console.log(log);
        networkLogs.push({ url, status, method });

        if (status >= 400) {
          errors.push(log);
        }
      }
    });

    // Falhas de requisição
    page.on('requestfailed', request => {
      const url = request.url();
      const failure = request.failure();
      const log = `[REQUEST FAILED]: ${url} - ${failure?.errorText}`;
      errors.push(log);
      console.log(log);
    });

    // ========================================================================
    // TESTE
    // ========================================================================

    try {
      console.log('');
      console.log('───────────────────────────────────────────────────────');
      console.log('  ETAPA 1: Navegando para página de login');
      console.log('───────────────────────────────────────────────────────');

      await page.goto('/dashboard/login', {
        waitUntil: 'networkidle',
        timeout: 30000,
      });

      console.log('✅ Página carregada:', page.url());

      // Screenshot inicial
      await page.screenshot({
        path: 'test-results/google-real-step1-login-page.png',
        fullPage: true,
      });

      console.log('');
      console.log('───────────────────────────────────────────────────────');
      console.log('  ETAPA 2: Localizando botão Google');
      console.log('───────────────────────────────────────────────────────');

      // Aguarda botão Google
      const googleBtn = page.locator('button:has-text("Google")').first();
      await googleBtn.waitFor({ state: 'visible', timeout: 10000 });
      console.log('✅ Botão Google encontrado');

      // Screenshot do botão
      await googleBtn.screenshot({
        path: 'test-results/google-real-step2-button.png',
      });

      console.log('');
      console.log('───────────────────────────────────────────────────────');
      console.log('  ETAPA 3: Clicando no botão Google');
      console.log('───────────────────────────────────────────────────────');

      await googleBtn.click();
      console.log('✅ Botão clicado');

      // Aguarda navegação
      await page
        .waitForLoadState('networkidle', { timeout: 10000 })
        .catch(() => {
          console.log('⚠️  NetworkIdle não alcançado, mas continuando...');
        });

      const urlAposClick = page.url();
      console.log('📍 URL após click:', urlAposClick);

      console.log('');
      console.log('───────────────────────────────────────────────────────');
      console.log('  ETAPA 4: Aguardando redirecionamento');
      console.log('───────────────────────────────────────────────────────');

      // Aguarda ir para Google ou Cognito
      await page.waitForFunction(
        () => {
          const url = window.location.href;
          return (
            url.includes('accounts.google.com') ||
            url.includes('amazoncognito.com') ||
            url.includes('oauth2/authorize')
          );
        },
        { timeout: 30000 }
      );

      const urlOAuth = page.url();
      console.log('✅ Redirecionado para OAuth');
      console.log('📍 URL:', urlOAuth);

      // Screenshot da página OAuth
      await page.screenshot({
        path: 'test-results/google-real-step4-oauth.png',
        fullPage: true,
      });

      console.log('');
      console.log('═══════════════════════════════════════════════════════');
      console.log('  👤 AÇÃO MANUAL NECESSÁRIA');
      console.log('═══════════════════════════════════════════════════════');
      console.log('');
      console.log('  📧 Email: raineroliveira94@hotmail.com');
      console.log('  🔑 Digite sua senha no navegador que abriu');
      console.log('  ⏱️  Aguardando... (até 5 minutos)');
      console.log('');

      // Aguarda callback
      await page.waitForFunction(
        () => {
          const url = window.location.href;
          return url.includes('/callback') || url.includes('/dashboard');
        },
        { timeout: 300000 } // 5 minutos
      );

      console.log('');
      console.log('───────────────────────────────────────────────────────');
      console.log('  ETAPA 5: Callback recebido');
      console.log('───────────────────────────────────────────────────────');

      const urlCallback = page.url();
      console.log('✅ Callback URL:', urlCallback);

      // Screenshot do callback
      await page.screenshot({
        path: 'test-results/google-real-step5-callback.png',
        fullPage: true,
      });

      console.log('');
      console.log('───────────────────────────────────────────────────────');
      console.log('  ETAPA 6: Aguardando processamento');
      console.log('───────────────────────────────────────────────────────');

      // Aguarda 5 segundos para processar
      await page.waitForTimeout(5000);

      // Se ainda no callback, aguarda navegação
      if (page.url().includes('/callback')) {
        console.log('⏳ Ainda no callback, aguardando navegação...');
        await page.waitForURL('**/dashboard', { timeout: 30000 });
      }

      const urlFinal = page.url();
      console.log('✅ URL final:', urlFinal);

      console.log('');
      console.log('───────────────────────────────────────────────────────');
      console.log('  ETAPA 7: Validando autenticação');
      console.log('───────────────────────────────────────────────────────');

      // Verifica tokens
      const auth = await page.evaluate(() => {
        return {
          accessToken: localStorage.getItem('accessToken'),
          refreshToken: localStorage.getItem('refreshToken'),
          idToken: localStorage.getItem('idToken'),
          user: localStorage.getItem('user'),
        };
      });

      console.log('');
      console.log('🔍 Tokens no localStorage:');
      console.log(
        '   Access Token:',
        auth.accessToken ? `✅ (${auth.accessToken.substring(0, 20)}...)` : '❌'
      );
      console.log(
        '   Refresh Token:',
        auth.refreshToken
          ? `✅ (${auth.refreshToken.substring(0, 20)}...)`
          : '❌'
      );
      console.log(
        '   ID Token:',
        auth.idToken ? `✅ (${auth.idToken.substring(0, 20)}...)` : '❌'
      );
      console.log('   User:', auth.user ? '✅' : '❌');

      if (auth.user) {
        const user = JSON.parse(auth.user);
        console.log('');
        console.log('👤 Dados do usuário:');
        console.log('   Email:', user.email || 'N/A');
        console.log('   Nome:', user.name || user.fullName || 'N/A');
        console.log('   ID:', user.id || user.sub || 'N/A');
      }

      // Screenshot final
      await page.screenshot({
        path: 'test-results/google-real-step7-final.png',
        fullPage: true,
      });

      console.log('');
      console.log('───────────────────────────────────────────────────────');
      console.log('  ETAPA 8: Relatório de rede');
      console.log('───────────────────────────────────────────────────────');

      console.log('');
      console.log('📡 Requisições ao backend:');
      networkLogs.forEach(log => {
        const icon = log.status >= 200 && log.status < 300 ? '✅' : '❌';
        console.log(
          `   ${icon} ${log.method} ${log.url.replace('http://localhost:4000', '')} - ${log.status}`
        );
      });

      if (errors.length > 0) {
        console.log('');
        console.log('❌ Erros encontrados:');
        errors.forEach(err => console.log(`   ${err}`));
      }

      console.log('');
      console.log('═══════════════════════════════════════════════════════');
      console.log('  ✅ TESTE CONCLUÍDO');
      console.log('═══════════════════════════════════════════════════════');
      console.log('');

      // Validações
      expect(urlFinal).toContain('/dashboard');
      if (auth.accessToken) {
        expect(auth.accessToken.length).toBeGreaterThan(0);
      }

      // Aguarda 3 segundos para visualizar
      await page.waitForTimeout(3000);
    } catch (error) {
      console.error('');
      console.error('═══════════════════════════════════════════════════════');
      console.error('  ❌ ERRO NO TESTE');
      console.error('═══════════════════════════════════════════════════════');
      console.error('');
      console.error(error);
      console.error('');

      // Screenshot do erro
      await page.screenshot({
        path: 'test-results/google-real-error.png',
        fullPage: true,
      });

      // Salva logs
      const fs = require('fs');
      fs.writeFileSync(
        'test-results/google-real-logs.txt',
        logs.join('\n'),
        'utf-8'
      );

      throw error;
    } finally {
      await context.close();
    }
  });
});
