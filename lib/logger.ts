/**
 * Structured Logging System
 *
 * Sistema de logging profissional para toda a aplicação.
 * Logs estruturados, níveis de severidade e contexto.
 *
 * Características:
 * - Níveis: debug, info, warn, error
 * - Contexto adicional
 * - Timestamp automático
 * - Desabilitado em produção (debug/info)
 * - Colorização no console
 * - Preparado para integração com serviços externos
 *
 * @fileoverview Sistema de logging estruturado
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// ============================================================================
// Types
// ============================================================================

/**
 * Níveis de log disponíveis
 */
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * Contexto adicional do log
 */
interface LogContext {
  readonly [key: string]: unknown;
}

/**
 * Entrada estruturada de log
 */
interface LogEntry {
  readonly level: LogLevel;
  readonly message: string;
  readonly timestamp: string;
  readonly context?: LogContext;
}

// ============================================================================
// Constants
// ============================================================================

import {
  COLOR_AMBER,
  COLOR_BLUE,
  COLOR_NEUTRAL,
  COLOR_RED,
} from '@rainer/design-tokens';

/**
 * Cores para cada nível de log
 * Usa cores primitivas da biblioteca @rainer/design-tokens
 */
const LOG_COLORS = {
  debug: COLOR_NEUTRAL[500], // Gray
  info: COLOR_BLUE[500], // Blue
  warn: COLOR_AMBER[500], // Amber
  error: COLOR_RED[500], // Red
} as const;

/**
 * Emojis para cada nível
 */
const LOG_EMOJIS = {
  debug: '🔍',
  info: 'ℹ️',
  warn: '⚠️',
  error: '❌',
} as const;

/**
 * Verifica se está em desenvolvimento
 */
const IS_DEV = process.env.NODE_ENV === 'development';

/**
 * Verifica se está no browser
 */
const IS_BROWSER = typeof window !== 'undefined';

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Formata timestamp para log
 */
function getTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Formata entrada de log
 */
function formatLogEntry(entry: LogEntry): string {
  const { level, message, timestamp, context } = entry;
  const emoji = LOG_EMOJIS[level];

  let formatted = `${emoji} [${level.toUpperCase()}] ${timestamp} - ${message}`;

  if (context && Object.keys(context).length > 0) {
    formatted += `\nContexto: ${JSON.stringify(context, null, 2)}`;
  }

  return formatted;
}

/**
 * Envia log para console com estilo
 */
function logToConsole(entry: LogEntry): void {
  const formatted = formatLogEntry(entry);
  const color = LOG_COLORS[entry.level];

  if (IS_BROWSER) {
    // Browser console com cores
    console.log(`%c${formatted}`, `color: ${color}`);
  } else {
    // Server console sem cores
    console.log(formatted);
  }
}

/**
 * Envia log para serviço externo (preparado para futuro)
 */
function sendToExternalService(entry: LogEntry): void {
  // TODO: Integrar com serviço de logging
  // Exemplos: LogRocket, Sentry, DataDog, etc

  if (entry.level === 'error') {
    // Apenas erros em produção
    // Sentry.captureException(new Error(entry.message), {
    //   extra: entry.context,
    //   level: 'error',
    // })
  }
}

// ============================================================================
// Logger Class
// ============================================================================

/**
 * Logger principal
 *
 * Classe singleton para logging estruturado.
 */
class Logger {
  /**
   * Log de debug (apenas em desenvolvimento)
   */
  debug(message: string, context?: LogContext): void {
    if (!IS_DEV) return;

    const entry: LogEntry = {
      level: 'debug',
      message,
      timestamp: getTimestamp(),
      context,
    };

    logToConsole(entry);
  }

  /**
   * Log de informação
   */
  info(message: string, context?: LogContext): void {
    const entry: LogEntry = {
      level: 'info',
      message,
      timestamp: getTimestamp(),
      context,
    };

    logToConsole(entry);
  }

  /**
   * Log de warning
   */
  warn(message: string, context?: LogContext): void {
    const entry: LogEntry = {
      level: 'warn',
      message,
      timestamp: getTimestamp(),
      context,
    };

    logToConsole(entry);
    sendToExternalService(entry);
  }

  /**
   * Log de erro
   */
  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const entry: LogEntry = {
      level: 'error',
      message,
      timestamp: getTimestamp(),
      context: {
        ...context,
        error:
          error instanceof Error
            ? {
                fullName: (error as any).fullName || error.name,
                message: error.message,
                stack: error.stack,
              }
            : error,
      },
    };

    logToConsole(entry);
    sendToExternalService(entry);
  }

  /**
   * Cria logger com contexto padrão
   *
   * @param defaultContext - Contexto que será adicionado a todos os logs
   * @returns Logger com contexto
   *
   * @example
   * ```tsx
   * const logger = Logger.withContext({ component: 'BlogPage' })
   * logger.info('Posts carregados', { count: 10 })
   * // Output: [INFO] Posts carregados { component: 'BlogPage', count: 10 }
   * ```
   */
  withContext(defaultContext: LogContext): Logger {
    const contextualLogger = new Logger();

    // Sobrescreve métodos para incluir contexto padrão
    const originalDebug = contextualLogger.debug.bind(contextualLogger);
    const originalInfo = contextualLogger.info.bind(contextualLogger);
    const originalWarn = contextualLogger.warn.bind(contextualLogger);
    const originalError = contextualLogger.error.bind(contextualLogger);

    contextualLogger.debug = (msg, ctx?) =>
      originalDebug(msg, { ...defaultContext, ...ctx });
    contextualLogger.info = (msg, ctx?) =>
      originalInfo(msg, { ...defaultContext, ...ctx });
    contextualLogger.warn = (msg, ctx?) =>
      originalWarn(msg, { ...defaultContext, ...ctx });
    contextualLogger.error = (msg, err?, ctx?) =>
      originalError(msg, err, { ...defaultContext, ...ctx });

    return contextualLogger;
  }
}

// ============================================================================
// Export
// ============================================================================

/**
 * Instância singleton do logger
 *
 * Importe e use em qualquer lugar da aplicação.
 *
 * @example
 * ```tsx
 * import { logger } from '@/lib/logger'
 *
 * logger.info('Usuário logado', { userId: '123' })
 * logger.error('Falha ao salvar', error, { postId: '456' })
 * ```
 */
export const logger = new Logger();

/**
 * Export da classe para uso avançado
 */
export { Logger };
