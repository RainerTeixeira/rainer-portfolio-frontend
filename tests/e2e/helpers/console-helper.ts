import { Page } from '@playwright/test';

/**
 * Interface para logs capturados
 */
export interface CapturedLog {
  type: 'log' | 'error' | 'warning' | 'info' | 'debug';
  text: string;
  args: any[];
  location?: {
    url: string;
    lineNumber?: number;
    columnNumber?: number;
  };
  timestamp: number;
}

/**
 * Classe helper para monitorar e tratar logs do console
 */
export class ConsoleHelper {
  private logs: CapturedLog[] = [];
  private errors: CapturedLog[] = [];
  private warnings: CapturedLog[] = [];
  private page: Page;

  constructor(page: Page) {
    this.page = page;
    this.setupListeners();
  }

  /**
   * Configura todos os listeners para capturar logs e erros
   */
  private setupListeners(): void {
    // Capturar logs do console
    this.page.on('console', msg => {
      const log: CapturedLog = {
        type: msg.type() as any,
        text: msg.text(),
        args: msg.args(),
        location: msg.location(),
        timestamp: Date.now(),
      };

      this.logs.push(log);

      switch (msg.type()) {
        case 'error':
          this.errors.push(log);
          this.handleError(log);
          break;
        case 'warning':
          this.warnings.push(log);
          this.handleWarning(log);
          break;
        default:
          this.handleLog(log);
      }
    });

    // Capturar erros de página não tratados
    this.page.on('pageerror', error => {
      const log: CapturedLog = {
        type: 'error',
        text: error.message,
        args: [error.stack],
        timestamp: Date.now(),
      };
      this.errors.push(log);
      this.handleError(log);
    });

    // Capturar requisições que falharam
    this.page.on('requestfailed', request => {
      const failure = request.failure();
      const log: CapturedLog = {
        type: 'error',
        text: `Request failed: ${request.method()} ${request.url()}`,
        args: [failure?.errorText || 'Unknown error'],
        timestamp: Date.now(),
      };
      this.errors.push(log);
      this.handleError(log);
    });

    // Capturar respostas com erro HTTP
    this.page.on('response', response => {
      if (response.status() >= 400) {
        const log: CapturedLog = {
          type: 'error',
          text: `HTTP ${response.status()}: ${response.url()}`,
          args: [response.statusText()],
          timestamp: Date.now(),
        };
        this.errors.push(log);
        this.handleError(log);
      }
    });
  }

  /**
   * Trata erros capturados
   */
  private handleError(log: CapturedLog): void {
    console.error('\n❌ [CONSOLE ERROR]', {
      message: log.text,
      location: log.location,
      timestamp: new Date(log.timestamp).toISOString(),
    });
  }

  /**
   * Trata warnings capturados
   */
  private handleWarning(log: CapturedLog): void {
    console.warn('\n⚠️  [CONSOLE WARNING]', {
      message: log.text,
      location: log.location,
      timestamp: new Date(log.timestamp).toISOString(),
    });
  }

  /**
   * Trata logs normais
   */
  private handleLog(log: CapturedLog): void {
    console.log(`\n📝 [CONSOLE ${log.type.toUpperCase()}]`, log.text);
  }

  /**
   * Retorna todos os logs capturados
   */
  getAllLogs(): CapturedLog[] {
    return [...this.logs];
  }

  /**
   * Retorna apenas os erros
   */
  getErrors(): CapturedLog[] {
    return [...this.errors];
  }

  /**
   * Retorna apenas os warnings
   */
  getWarnings(): CapturedLog[] {
    return [...this.warnings];
  }

  /**
   * Verifica se há erros
   */
  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  /**
   * Verifica se há warnings
   */
  hasWarnings(): boolean {
    return this.warnings.length > 0;
  }

  /**
   * Retorna mensagens de erro
   */
  getErrorMessages(): string[] {
    return this.errors.map(e => e.text);
  }

  /**
   * Retorna mensagens de warning
   */
  getWarningMessages(): string[] {
    return this.warnings.map(w => w.text);
  }

  /**
   * Limpa todos os logs capturados
   */
  clear(): void {
    this.logs = [];
    this.errors = [];
    this.warnings = [];
  }

  /**
   * Gera um relatório dos logs
   */
  generateReport(): string {
    const report = [
      '\n=== CONSOLE LOGS REPORT ===',
      `Total logs: ${this.logs.length}`,
      `Errors: ${this.errors.length}`,
      `Warnings: ${this.warnings.length}`,
      '',
    ];

    if (this.errors.length > 0) {
      report.push('--- ERRORS ---');
      this.errors.forEach((error, index) => {
        report.push(`${index + 1}. ${error.text}`);
        if (error.location) {
          report.push(
            `   Location: ${error.location.url}:${error.location.lineNumber}`
          );
        }
      });
      report.push('');
    }

    if (this.warnings.length > 0) {
      report.push('--- WARNINGS ---');
      this.warnings.forEach((warning, index) => {
        report.push(`${index + 1}. ${warning.text}`);
        if (warning.location) {
          report.push(
            `   Location: ${warning.location.url}:${warning.location.lineNumber}`
          );
        }
      });
    }

    report.push('=======================\n');
    return report.join('\n');
  }

  /**
   * Valida se não há erros críticos (pode ser customizado)
   */
  validateNoCriticalErrors(): void {
    const criticalPatterns = [
      /uncaught exception/i,
      /unhandled promise rejection/i,
      /syntax error/i,
      /reference error/i,
      /type error/i,
    ];

    const criticalErrors = this.errors.filter(error =>
      criticalPatterns.some(pattern => pattern.test(error.text))
    );

    if (criticalErrors.length > 0) {
      throw new Error(
        `Critical errors found:\n${criticalErrors.map(e => e.text).join('\n')}`
      );
    }
  }
}

/**
 * Função helper para criar um ConsoleHelper
 */
export function createConsoleHelper(page: Page): ConsoleHelper {
  return new ConsoleHelper(page);
}
