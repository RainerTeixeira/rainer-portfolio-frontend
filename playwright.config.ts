import { defineConfig, devices } from '@playwright/test';

/**
 * Configuração do Playwright para testes E2E
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/e2e',
  /* Executar testes em paralelo */
  fullyParallel: true,
  /* Falhar o build no CI se você deixar test.only no código */
  forbidOnly: !!process.env.CI,
  /* Tentar novamente no CI apenas */
  retries: process.env.CI ? 2 : 0,
  /* Limitar workers no CI */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter a usar */
  reporter: 'html',
  /* Configurações compartilhadas para todos os projetos */
  use: {
    /* URL base a usar em ações como `await page.goto('/')`. */
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',

    /* Coletar trace quando repetir o teste falhado. Veja https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Screenshot apenas quando falhar */
    screenshot: 'only-on-failure',
  },

  /* Configurar projetos para navegadores principais */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Usar Chrome instalado no sistema
        channel: 'chrome',
      },
    },

    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        // Usar Chrome instalado no sistema
        channel: 'chrome',
        // Headless false para ver o navegador
        headless: false,
      },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* Executar servidor de desenvolvimento antes de iniciar os testes */
  webServer: {
    command:
      process.env.NODE_ENV === 'production'
        ? 'npm run build && npm run start'
        : 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true, // Sempre reutiliza servidor existente
    timeout: 120 * 1000,
    env:
      process.env.NODE_ENV === 'production'
        ? { NODE_ENV: 'production' }
        : undefined,
  },
});
