/**
 * Fixtures globais para testes E2E
 *
 * Este arquivo exporta fixtures customizados que são automaticamente
 * disponibilizados em todos os testes E2E.
 *
 * Para usar, importe: import { test, expect } from './fixtures';
 */

import { test as base } from '@playwright/test';
import { ConsoleHelper, createConsoleHelper } from '../helpers/console-helper';

/**
 * Estende o test base com monitoramento automático de console
 */
export const test = base.extend<{
  consoleHelper: ConsoleHelper;
}>({
  // Fixture que cria automaticamente um ConsoleHelper para cada teste
  consoleHelper: async ({ page }, use) => {
    const helper = createConsoleHelper(page);

    // Usar o helper durante o teste
    await use(helper);

    // Após o teste, validar se há erros críticos
    // Isso pode ser desabilitado se você quiser apenas reportar
    try {
      helper.validateNoCriticalErrors();
    } catch (error) {
      // Log do relatório completo antes de falhar
      console.error(helper.generateReport());
      throw error;
    }
  },
});

// Re-exportar expect do Playwright
export { expect } from '@playwright/test';
