import { test as base } from '@playwright/test';

/**
 * Tipos de logs do console
 */
export interface ConsoleLog {
  type: 'log' | 'error' | 'warning' | 'info' | 'debug';
  text: string;
  location?: {
    url: string;
    lineNumber?: number;
    columnNumber?: number;
  };
  timestamp: number;
}

/**
 * Fixture customizado para monitorar console logs e erros
 */
export const test = base.extend<{
  consoleMonitor: {
    logs: ConsoleLog[];
    errors: ConsoleLog[];
    warnings: ConsoleLog[];
    clear: () => void;
    hasErrors: () => boolean;
    hasWarnings: () => boolean;
    getErrorMessages: () => string[];
    getWarningMessages: () => string[];
  };
}>({
  consoleMonitor: async ({ page }, use) => {
    const logs: ConsoleLog[] = [];
    const errors: ConsoleLog[] = [];
    const warnings: ConsoleLog[] = [];

    // Listener para capturar todos os tipos de logs do console
    const handleConsole = (msg: any) => {
      const logEntry: ConsoleLog = {
        type: msg.type(),
        text: msg.text(),
        location: msg.location(),
        timestamp: Date.now(),
      };

      logs.push(logEntry);

      if (msg.type() === 'error') {
        errors.push(logEntry);
        // Log no console do Node.js para visibilidade
        console.error(`[CONSOLE ERROR] ${logEntry.text}`, logEntry.location);
      } else if (msg.type() === 'warning') {
        warnings.push(logEntry);
        console.warn(`[CONSOLE WARNING] ${logEntry.text}`, logEntry.location);
      } else {
        console.log(
          `[CONSOLE ${logEntry.type.toUpperCase()}] ${logEntry.text}`
        );
      }
    };

    // Listener para erros de página não capturados
    const handlePageError = (error: Error) => {
      const errorEntry: ConsoleLog = {
        type: 'error',
        text: error.message,
        timestamp: Date.now(),
      };
      errors.push(errorEntry);
      console.error(`[PAGE ERROR] ${error.message}`, error.stack);
    };

    // Listener para requisições que falharam
    const handleRequestFailed = (request: any) => {
      const errorEntry: ConsoleLog = {
        type: 'error',
        text: `Request failed: ${request.method()} ${request.url()} - ${request.failure()?.errorText || 'Unknown error'}`,
        timestamp: Date.now(),
      };
      errors.push(errorEntry);
      console.error(`[REQUEST FAILED] ${request.method()} ${request.url()}`);
    };

    // Listener para respostas com status de erro
    const handleResponse = (response: any) => {
      if (response.status() >= 400) {
        const errorEntry: ConsoleLog = {
          type: 'error',
          text: `HTTP ${response.status()}: ${response.url()}`,
          timestamp: Date.now(),
        };
        errors.push(errorEntry);
        console.error(`[HTTP ERROR] ${response.status()} ${response.url()}`);
      }
    };

    // Registrar todos os listeners
    page.on('console', handleConsole);
    page.on('pageerror', handlePageError);
    page.on('requestfailed', handleRequestFailed);
    page.on('response', handleResponse);

    // Fornecer API para o teste
    await use({
      logs,
      errors,
      warnings,
      clear: () => {
        logs.length = 0;
        errors.length = 0;
        warnings.length = 0;
      },
      hasErrors: () => errors.length > 0,
      hasWarnings: () => warnings.length > 0,
      getErrorMessages: () => errors.map(e => e.text),
      getWarningMessages: () => warnings.map(w => w.text),
    });

    // Limpar listeners após o teste
    page.off('console', handleConsole);
    page.off('pageerror', handlePageError);
    page.off('requestfailed', handleRequestFailed);
    page.off('response', handleResponse);
  },
});

export { expect } from '@playwright/test';
