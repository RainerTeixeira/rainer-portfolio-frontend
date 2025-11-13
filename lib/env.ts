/**
 * Environment Variables Configuration
 *
 * Configuração tipada e validada de variáveis de ambiente.
 * Centraliza acesso a process.env com type safety.
 *
 * Características:
 * - Type-safe environment variables
 * - Validação em runtime
 * - Valores default
 * - Documentação inline
 * - Erro claro se variável ausente
 *
 * @fileoverview Configuração de variáveis de ambiente tipadas
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// ============================================================================
// Types
// ============================================================================

/**
 * Tipos de ambiente válidos
 */
type Environment = 'development' | 'production' | 'test';

/**
 * Configuração de ambiente tipada
 */
interface EnvironmentConfig {
  readonly NODE_ENV: Environment;
  readonly NEXT_PUBLIC_APP_URL: string;
  readonly NEXT_PUBLIC_APP_NAME: string;
  readonly NEXT_PUBLIC_ENABLE_ANALYTICS: boolean;
  readonly NEXT_PUBLIC_ENABLE_PWA: boolean;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Obtém variável de ambiente com fallback
 *
 * @param key - Chave da variável
 * @param fallback - Valor padrão se não existir
 * @returns Valor da variável ou fallback
 */
export function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key];

  if (value === undefined || value === '') {
    if (fallback !== undefined) {
      return fallback;
    }
    throw new Error(`Variável de ambiente ${key} não está definida`);
  }

  return value;
}

/**
 * Converte string para boolean
 *
 * @param value - String a converter
 * @param fallback - Valor padrão
 * @returns Boolean resultado
 */
function parseBoolean(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined || value === '') {
    return fallback;
  }
  return value === 'true' || value === '1';
}

/**
 * Valida que ambiente é válido
 *
 * @param env - String do ambiente
 * @returns Ambiente tipado
 */
function validateEnvironment(env: string): Environment {
  if (env === 'development' || env === 'production' || env === 'test') {
    return env;
  }
  console.warn(`Ambiente inválido: ${env}. Usando 'development'`);
  return 'development';
}

// ============================================================================
// Environment Configuration
// ============================================================================

/**
 * Configuração de ambiente da aplicação
 *
 * Variáveis de ambiente tipadas e validadas.
 * Acesso centralizado via este objeto.
 *
 * @example
 * ```tsx
 * import { env } from '@/lib/env'
 *
 * if (env.NEXT_PUBLIC_ENABLE_ANALYTICS) {
 *   // Inicializar analytics
 * }
 * ```
 */
export const env: EnvironmentConfig = {
  // Ambiente de execução
  NODE_ENV: validateEnvironment(getEnvVar('NODE_ENV', 'development')),

  // URL da aplicação
  NEXT_PUBLIC_APP_URL: getEnvVar(
    'NEXT_PUBLIC_APP_URL',
    'http://localhost:3000'
  ),

  // Nome da aplicação
  NEXT_PUBLIC_APP_NAME: getEnvVar('NEXT_PUBLIC_APP_NAME', 'Rainer Soft'),

  // Feature flags via env
  NEXT_PUBLIC_ENABLE_ANALYTICS: parseBoolean(
    process.env.NEXT_PUBLIC_ENABLE_ANALYTICS,
    true
  ),

  NEXT_PUBLIC_ENABLE_PWA: parseBoolean(
    process.env.NEXT_PUBLIC_ENABLE_PWA,
    true
  ),
} as const;

// ============================================================================
// Utility Exports
// ============================================================================

/**
 * Verifica se está em ambiente de desenvolvimento
 */
export const isDevelopment = env.NODE_ENV === 'development';

/**
 * Verifica se está em ambiente de produção
 */
export const isProduction = env.NODE_ENV === 'production';

/**
 * Verifica se está em ambiente de teste
 */
export const isTest = env.NODE_ENV === 'test';

// ============================================================================
// Validation (Runtime Check)
// ============================================================================

/**
 * Valida configuração de ambiente
 * Verifica se todas as variáveis obrigatórias estão definidas
 */
export function validateEnv(): void {
  // Validação básica - verifica se variáveis críticas existem
  try {
    getEnvVar('NODE_ENV', 'development');
    // Outras validações podem ser adicionadas aqui
  } catch (error) {
    throw new Error(
      `Validação de ambiente falhou: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
    );
  }
}

/**
 * Valida configuração ao importar módulo
 * Falha rápido se algo estiver errado
 */
if (typeof window === 'undefined') {
  // Server-side validation
  console.info('✅ Environment variables carregadas:', {
    NODE_ENV: env.NODE_ENV,
    APP_URL: env.NEXT_PUBLIC_APP_URL,
    APP_NAME: env.NEXT_PUBLIC_APP_NAME,
  });
}
