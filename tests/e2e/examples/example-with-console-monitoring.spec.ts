/**
 * Exemplo de teste E2E com monitoramento automático de console
 *
 * Este exemplo demonstra como usar o ConsoleHelper para:
 * - Capturar automaticamente todos os logs do console (F12)
 * - Detectar erros JavaScript
 * - Detectar warnings
 * - Falhar testes quando há erros críticos
 */

import { expect, test } from '../fixtures';
import {
  checkConsoleErrors,
  createConsoleHelper,
} from '../helpers/console-helper';

test.describe('Exemplo com Monitoramento de Console', () => {
  test('deve capturar e reportar erros do console automaticamente', async ({
    page,
  }) => {
    // Criar helper de console para esta página
    const consoleHelper = createConsoleHelper(page);

    // Navegar para a página
    await page.goto('/');

    // Aguardar carregamento
    await page.waitForLoadState('networkidle');

    // Verificar se há erros no console
    // O helper já capturou automaticamente todos os logs
    if (consoleHelper.hasErrors()) {
      console.log(consoleHelper.generateReport());

      // Falhar o teste se houver erros críticos
      const errors = consoleHelper.getErrorMessages();
      expect(errors.length).toBe(0);
    }

    // Verificar warnings (não falha o teste, apenas reporta)
    if (consoleHelper.hasWarnings()) {
      console.warn('Warnings encontrados:', consoleHelper.getWarningMessages());
    }
  });

  test('deve usar helper para validar console após ações', async ({ page }) => {
    const consoleHelper = createConsoleHelper(page);

    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Realizar alguma ação que pode gerar erros
    await page.click('button:has-text("Salvar")');

    // Verificar erros após a ação
    await checkConsoleErrors(consoleHelper, true); // true = falhar se houver erros
  });

  test('deve capturar erros de requisições HTTP', async ({ page }) => {
    const consoleHelper = createConsoleHelper(page);

    // Interceptar requisições que falham
    page.on('requestfailed', request => {
      console.error(`Request failed: ${request.url()}`);
    });

    await page.goto('/');

    // Verificar se há erros de rede
    const errors = consoleHelper.getErrors();
    const networkErrors = errors.filter(
      e => e.text.includes('Request failed') || e.text.includes('HTTP')
    );

    expect(networkErrors.length).toBe(0);
  });
});
