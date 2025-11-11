import type { PlaywrightTestConfig } from '@playwright/test';
import { defineConfig, devices } from '@playwright/test';

/**
 * Configuração profissional do Playwright para testes E2E
 *
 * Recursos avançados:
 * - Captura automática de logs do console (F12)
 * - Tratamento de erros JavaScript
 * - Monitoramento de requisições de rede
 * - Traces e vídeos para debugging
 * - Timeouts configuráveis
 *
 * Monitoramento de Console:
 * - Todos os logs do console são capturados automaticamente
 * - Erros JavaScript são detectados e reportados
 * - Requisições HTTP que falham são monitoradas
 * - Use os fixtures em tests/e2e/fixtures/index.ts para monitoramento automático
 * - Veja tests/e2e/README_CONSOLE_MONITORING.md para mais detalhes
 *
 * @see https://playwright.dev/docs/test-configuration
 * @see tests/e2e/README_CONSOLE_MONITORING.md
 */
const config: PlaywrightTestConfig = {
  testDir: './tests/e2e',

  /* Executar testes em paralelo */
  fullyParallel: true,

  /* Falhar o build no CI se você deixar test.only no código */
  forbidOnly: !!process.env.CI,

  /* Tentar novamente no CI apenas */
  retries: process.env.CI ? 2 : 0,

  /* Limitar workers no CI */
  workers: process.env.CI ? 1 : undefined,

  /* Timeout global para cada teste */
  timeout: 30 * 1000,

  /* Timeout para expectativas */
  expect: {
    timeout: 10 * 1000,
  },

  /* Reporters */
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  /* Configurações compartilhadas para todos os projetos */
  use: {
    /* URL base a usar em ações como `await page.goto('/')`. */
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',

    /* Coletar trace sempre para debugging avançado */
    trace: 'on',

    /* Screenshot apenas quando falhar */
    screenshot: 'only-on-failure',

    /* Gravar vídeo quando falhar */
    video: 'retain-on-failure',

    /* Configurações de contexto do navegador */
    viewport: { width: 1920, height: 1080 },

    /* Ignorar HTTPS errors (útil para desenvolvimento) */
    ignoreHTTPSErrors: true,

    /* Configurações de ação */
    actionTimeout: 15 * 1000,
    navigationTimeout: 30 * 1000,
  },

  /* Configurar projeto para usar Chrome */
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        // Usar Chrome instalado no sistema
        channel: 'chrome',
        // Headless false para ver o navegador
        headless: false,
        // Configurações avançadas do Chrome
        launchOptions: {
          args: [
            '--disable-blink-features=AutomationControlled',
            '--disable-dev-shm-usage',
            '--no-sandbox',
            '--disable-setuid-sandbox',
          ],
        },
      },
    },
  ],

  /* Global setup e teardown */
  globalSetup: undefined, // Pode ser configurado se necessário
  globalTeardown: undefined, // Pode ser configurado se necessário
};

export default defineConfig(config);
