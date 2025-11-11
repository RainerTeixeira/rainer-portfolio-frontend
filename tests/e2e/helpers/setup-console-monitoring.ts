import { test as baseTest, Page } from '@playwright/test';
import { ConsoleHelper, createConsoleHelper } from './console-helper';

/**
 * Estende o test base do Playwright com monitoramento automático de console
 */
export const test = baseTest.extend<{
  consoleHelper: ConsoleHelper;
  pageWithConsole: Page;
}>({
  // Cria um helper de console para cada teste
  consoleHelper: async ({ page }, use) => {
    const helper = createConsoleHelper(page);
    await use(helper);
  },

  // Fornece a página com monitoramento automático
  pageWithConsole: async ({ page, consoleHelper }, use) => {
    // O helper já está configurado no fixture acima
    await use(page);

    // Após o teste, validar erros críticos
    consoleHelper.validateNoCriticalErrors();
  },
});

/**
 * Hook global para configurar monitoramento de console em todas as páginas
 */
export function setupConsoleMonitoring(page: Page): ConsoleHelper {
  return createConsoleHelper(page);
}

/**
 * Função para verificar e reportar erros após um teste
 */
export async function checkConsoleErrors(
  consoleHelper: ConsoleHelper,
  failOnErrors: boolean = true
): Promise<void> {
  if (consoleHelper.hasErrors()) {
    const report = consoleHelper.generateReport();
    console.log(report);

    if (failOnErrors) {
      const errorMessages = consoleHelper.getErrorMessages();
      throw new Error(
        `Console errors detected during test:\n${errorMessages.join('\n')}`
      );
    }
  }

  if (consoleHelper.hasWarnings()) {
    const report = consoleHelper.generateReport();
    console.warn(report);
  }
}
