/**
 * @file playwright.config.ts
 * @description Configuração do Playwright para testes E2E de design tokens e UI.
 * 
 * Valida aplicação correta de cores, tipografia, espaçamento e temas.
 * Configurado para rodar em múltiplos navegadores e dispositivos.
 * 
 * @module playwright.config
 * @version 2.0.0
 * @author Rainer Teixeira
 * @since 1.0.0
 * @see https://playwright.dev/docs/test-configuration
 */

import { defineConfig, devices } from '@playwright/test';

// Verifica se está rodando em CI/CD
const isCI = Boolean(
  typeof process !== 'undefined' && process.env?.['CI'],
);

export default defineConfig({
  // Diretório de testes (inclui todos os testes em ./tests, incluindo login.spec.ts)
  testDir: './tests',

  // Executar testes em paralelo
  fullyParallel: true,

  // Falhar build no CI se test.only for deixado no código
  forbidOnly: isCI,

  // Tentativas de retry (apenas no CI)
  retries: isCI ? 2 : 0,

  // Workers (desabilitar paralelismo no CI para estabilidade)
  workers: isCI ? 1 : undefined,

  // Reporters
  reporter: [
    ['html', { outputFolder: 'playwright-report/rainer-design-tokens' }],
    ['list'],
    ['json', { outputFile: 'test-results/rainer-design-tokens-results.json' }],
  ],

  // Configurações compartilhadas para todos os projetos
  use: {
    // Base URL para ações como `await page.goto('/')`
    baseURL: 'http://localhost:3000',

    // Coletar trace quando retentar teste falho
    trace: 'on-first-retry',

    // Screenshot apenas em falhas
    screenshot: 'only-on-failure',

    // Video apenas em falhas
    video: 'retain-on-failure',
  },

  // Projetos de teste (navegadores e dispositivos)
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // Servidor web local antes de iniciar os testes
  webServer: {
    command: 'pnpm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !isCI,
    // Aumentado para permitir builds mais pesados antes dos testes
    timeout: 300 * 1000,
  },
});

