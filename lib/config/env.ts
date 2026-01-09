/**
 * Configuração de Ambiente com Presets
 * 
 * Sistema centralizado de gerenciamento de configurações de ambiente
 * que combina presets pré-definidos com variáveis de ambiente dinâmicas.
 * 
 * @fileoverview Sistema profissional de configuração de ambiente para Next.js
 * @author Rainer Teixeira
 * @version 4.1.0
 * @license MIT
 */

// ============================================================================
// TIPAGENS E INTERFACES
// ============================================================================

/**
 * Ambientes válidos da aplicação
 * @typedef {'development' | 'staging' | 'production'} AppEnvironment
 */
export type AppEnvironment = 'development' | 'staging' | 'production';

/**
 * Ambientes válidos do Node.js
 * @typedef {'development' | 'production' | 'test'} NodeEnvironment
 */
export type NodeEnvironment = 'development' | 'production' | 'test';

/**
 * Interface completa das configurações de ambiente
 * @interface EnvironmentConfig
 * @readonly
 */
export interface EnvironmentConfig {
  /** Ambiente atual da aplicação */
  readonly NEXT_PUBLIC_ENV: AppEnvironment;
  /** Nome da aplicação para exibição */
  readonly NEXT_PUBLIC_APP_NAME: string;
  /** URL base do frontend */
  readonly NEXT_PUBLIC_BASE_URL: string;
  /** URL base da API backend */
  readonly NEXT_PUBLIC_API_URL: string;
  /** Provider do banco de dados (PRISMA ou DYNAMODB) */
  readonly NEXT_PUBLIC_API_DB_PROVIDER?: string;
  /** URL de callback para OAuth */
  readonly NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN: string;
  /** Timeout das requisições HTTP em milissegundos */
  readonly NEXT_PUBLIC_API_TIMEOUT: number;
  /** Máximo de tentativas para requisições com falha */
  readonly NEXT_PUBLIC_API_MAX_RETRIES: number;
  /** Delay entre tentativas de requisição em milissegundos */
  readonly NEXT_PUBLIC_API_RETRY_DELAY: number;
  /** Força autenticação via Cognito mesmo em desenvolvimento */
  readonly NEXT_PUBLIC_FORCE_COGNITO_AUTH: boolean;
  /** Habilita logs e ferramentas de depuração */
  readonly NEXT_PUBLIC_DEBUG_MODE: boolean;
  /** Desabilita o Strict Mode do React */
  readonly NEXT_PUBLIC_DISABLE_STRICT_MODE: boolean;
  /** Google Analytics ID (opcional) */
  readonly NEXT_PUBLIC_GA_ID?: string;
  /** Habilita analytics no build (opcional) */
  readonly NEXT_PUBLIC_ENABLE_ANALYTICS?: boolean;
  /** Ambiente de execução do Node.js */
  readonly NODE_ENV: NodeEnvironment;
}

/**
 * Interface para configurações que podem ser sobrescritas por variáveis de ambiente
 * @interface EnvironmentPreset
 */
interface EnvironmentPreset extends Omit<EnvironmentConfig, 'NODE_ENV'> {}

// ============================================================================
// CONSTANTES E CONFIGURAÇÕES
// ============================================================================

/**
 * Nomes das variáveis de ambiente utilizadas pelo sistema
 * @constant {Object} ENV_KEYS
 */
const ENV_KEYS = Object.freeze({
  APP_ENV: 'APP_ENV',
  NEXT_PUBLIC_APP_ENV: 'NEXT_PUBLIC_APP_ENV',
  NODE_ENV: 'NODE_ENV',
  APP_NAME: 'NEXT_PUBLIC_APP_NAME',
  BASE_URL: 'NEXT_PUBLIC_BASE_URL',
  API_URL: 'NEXT_PUBLIC_API_URL',
  OAUTH_REDIRECT: 'NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN',
  API_TIMEOUT: 'NEXT_PUBLIC_API_TIMEOUT',
  API_MAX_RETRIES: 'NEXT_PUBLIC_API_MAX_RETRIES',
  API_RETRY_DELAY: 'NEXT_PUBLIC_API_RETRY_DELAY',
  FORCE_COGNITO_AUTH: 'NEXT_PUBLIC_FORCE_COGNITO_AUTH',
  DEBUG_MODE: 'NEXT_PUBLIC_DEBUG_MODE',
  DISABLE_STRICT_MODE: 'NEXT_PUBLIC_DISABLE_STRICT_MODE',
  GA_ID: 'NEXT_PUBLIC_GA_ID',
  ENABLE_ANALYTICS: 'NEXT_PUBLIC_ENABLE_ANALYTICS',
} as const);

/**
 * Valores padrão compartilhados entre todos os ambientes
 * @constant {Object} DEFAULT_CONFIG
 */
const DEFAULT_CONFIG = Object.freeze({
  NEXT_PUBLIC_API_TIMEOUT: 30000, // 30 segundos
  NEXT_PUBLIC_API_MAX_RETRIES: 3,
  NEXT_PUBLIC_API_RETRY_DELAY: 1000, // 1 segundo
  NEXT_PUBLIC_DISABLE_STRICT_MODE: false,
} as const);

/**
 * Presets de configuração para cada ambiente
 * @constant {Record<AppEnvironment, EnvironmentPreset>} ENVIRONMENT_PRESETS
 */
const ENVIRONMENT_PRESETS: Record<AppEnvironment, EnvironmentPreset> = Object.freeze({
  development: {
    NEXT_PUBLIC_ENV: 'development',
    NEXT_PUBLIC_APP_NAME: 'Rainer Portfolio (Dev)',
    NEXT_PUBLIC_BASE_URL: 'http://localhost:3000',
    NEXT_PUBLIC_API_URL: 'http://localhost:4000/api/v1',
    NEXT_PUBLIC_API_DB_PROVIDER: 'DYNAMODB',
    NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN: 'http://localhost:3000/dashboard/login/callback',
    NEXT_PUBLIC_FORCE_COGNITO_AUTH: false,
    NEXT_PUBLIC_DEBUG_MODE: true,
    ...DEFAULT_CONFIG,
  },
  staging: {
    NEXT_PUBLIC_ENV: 'staging',
    NEXT_PUBLIC_APP_NAME: 'Rainer Portfolio (Staging)',
    NEXT_PUBLIC_BASE_URL: 'https://staging.rainersoft.com.br',
    NEXT_PUBLIC_API_URL: 'https://staging-api.rainersoft.com.br',
    NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN: 'https://staging.rainersoft.com.br/dashboard/login/callback',
    NEXT_PUBLIC_FORCE_COGNITO_AUTH: true,
    NEXT_PUBLIC_DEBUG_MODE: true,
    ...DEFAULT_CONFIG,
  },
  production: {
    NEXT_PUBLIC_ENV: 'production',
    NEXT_PUBLIC_APP_NAME: 'Rainer Portfolio',
    NEXT_PUBLIC_BASE_URL: 'https://rainersoft.com.br',
    NEXT_PUBLIC_API_URL: 'https://api.rainersoft.com.br',
    NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN: 'https://rainersoft.com.br/dashboard/login/callback',
    NEXT_PUBLIC_FORCE_COGNITO_AUTH: true,
    NEXT_PUBLIC_DEBUG_MODE: false,
    ...DEFAULT_CONFIG,
  },
});

// ============================================================================
// UTILITÁRIOS DE VALIDAÇÃO E CONVERSÃO
// ============================================================================

/**
 * Extrai uma variável de ambiente do processo
 * @param {string} key - Chave da variável de ambiente
 * @returns {string | undefined} Valor da variável ou undefined se não existir
 */
function getProcessEnv(key: string): string | undefined {
  return process.env[key];
}

/**
 * Valida se um valor é um ambiente de aplicação válido
 * @param {string} value - Valor a ser validado
 * @returns {value is AppEnvironment} True se for um ambiente válido
 */
function isValidAppEnvironment(value: string): value is AppEnvironment {
  return ['development', 'staging', 'production'].includes(value);
}

/**
 * Valida se um valor é um ambiente Node.js válido
 * @param {string} value - Valor a ser validado
 * @returns {value is NodeEnvironment} True se for um ambiente válido
 */
function isValidNodeEnvironment(value: string): value is NodeEnvironment {
  return ['development', 'production', 'test'].includes(value);
}

/**
 * Determina o ambiente da aplicação com fallback seguro
 * @returns {AppEnvironment} Ambiente validado da aplicação
 */
function determineAppEnvironment(): AppEnvironment {
  const envValue = getProcessEnv(ENV_KEYS.APP_ENV) || 
                   getProcessEnv(ENV_KEYS.NEXT_PUBLIC_APP_ENV) || 
                   'development';
  
  if (isValidAppEnvironment(envValue)) {
    return envValue;
  }
  
  console.warn(
    `⚠️  Ambiente de aplicação inválido: "${envValue}". ` +
    `Usando fallback para "development".`
  );
  return 'development';
}

/**
 * Determina o ambiente Node.js com fallback seguro
 * @returns {NodeEnvironment} Ambiente validado do Node.js
 */
function determineNodeEnvironment(): NodeEnvironment {
  const envValue = getProcessEnv(ENV_KEYS.NODE_ENV) || 'development';
  
  if (isValidNodeEnvironment(envValue)) {
    return envValue;
  }
  
  console.warn(
    `⚠️  Ambiente Node.js inválido: "${envValue}". ` +
    `Usando fallback para "development".`
  );
  return 'development';
}

/**
 * Converte uma string para booleano com tratamento seguro
 * @param {string | undefined} value - Valor a ser convertido
 * @param {boolean} defaultValue - Valor padrão caso a conversão falhe
 * @returns {boolean} Valor booleano resultante
 */
function safeParseBoolean(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined) return defaultValue;
  
  const normalizedValue = value.trim().toLowerCase();
  const truthyValues = ['true', '1', 'yes', 'on'];
  const falsyValues = ['false', '0', 'no', 'off'];
  
  if (truthyValues.includes(normalizedValue)) return true;
  if (falsyValues.includes(normalizedValue)) return false;
  
  console.warn(`⚠️  Valor booleano inválido: "${value}". Usando padrão: ${defaultValue}`);
  return defaultValue;
}

/**
 * Converte uma string para número com tratamento seguro
 * @param {string | undefined} value - Valor a ser convertido
 * @param {number} defaultValue - Valor padrão caso a conversão falhe
 * @param {number} minValue - Valor mínimo permitido (opcional)
 * @returns {number} Valor numérico resultante
 */
function safeParseNumber(
  value: string | undefined, 
  defaultValue: number, 
  minValue: number = 0
): number {
  if (value === undefined) return defaultValue;
  
  const parsed = Number(value);
  const isValid = !isNaN(parsed) && isFinite(parsed) && parsed >= minValue;
  
  if (isValid) return parsed;
  
  console.warn(`⚠️  Valor numérico inválido: "${value}". Usando padrão: ${defaultValue}`);
  return defaultValue;
}

// ============================================================================
// CONSTRUTOR DE CONFIGURAÇÃO
// ============================================================================

/**
 * Cria a configuração final mesclando presets com variáveis de ambiente
 * @param {AppEnvironment} appEnv - Ambiente da aplicação
 * @param {NodeEnvironment} nodeEnv - Ambiente do Node.js
 * @returns {EnvironmentConfig} Configuração completa e validada
 */
function buildEnvironmentConfig(
  appEnv: AppEnvironment,
  nodeEnv: NodeEnvironment
): EnvironmentConfig {
  const preset = ENVIRONMENT_PRESETS[appEnv];
  
  return Object.freeze({
    // Ambiente
    NODE_ENV: nodeEnv,
    NEXT_PUBLIC_ENV: getProcessEnv(ENV_KEYS.NEXT_PUBLIC_APP_ENV) as AppEnvironment || preset.NEXT_PUBLIC_ENV,
    
    // Informações da aplicação
    NEXT_PUBLIC_APP_NAME: getProcessEnv(ENV_KEYS.APP_NAME) || preset.NEXT_PUBLIC_APP_NAME,
    
    // URLs
    NEXT_PUBLIC_BASE_URL: getProcessEnv(ENV_KEYS.BASE_URL) || preset.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_API_URL: getProcessEnv(ENV_KEYS.API_URL) || preset.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN: getProcessEnv(ENV_KEYS.OAUTH_REDIRECT) || preset.NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN,
    
    // Configurações da API
    NEXT_PUBLIC_API_TIMEOUT: safeParseNumber(
      getProcessEnv(ENV_KEYS.API_TIMEOUT),
      preset.NEXT_PUBLIC_API_TIMEOUT,
      1000 // Mínimo de 1 segundo
    ),
    NEXT_PUBLIC_API_MAX_RETRIES: safeParseNumber(
      getProcessEnv(ENV_KEYS.API_MAX_RETRIES),
      preset.NEXT_PUBLIC_API_MAX_RETRIES,
      0 // Pode ser 0 (sem retry)
    ),
    NEXT_PUBLIC_API_RETRY_DELAY: safeParseNumber(
      getProcessEnv(ENV_KEYS.API_RETRY_DELAY),
      preset.NEXT_PUBLIC_API_RETRY_DELAY,
      0 // Pode ser 0 (sem delay)
    ),
    
    // Funcionalidades
    NEXT_PUBLIC_FORCE_COGNITO_AUTH: safeParseBoolean(
      getProcessEnv(ENV_KEYS.FORCE_COGNITO_AUTH),
      preset.NEXT_PUBLIC_FORCE_COGNITO_AUTH
    ),
    NEXT_PUBLIC_DEBUG_MODE: safeParseBoolean(
      getProcessEnv(ENV_KEYS.DEBUG_MODE),
      preset.NEXT_PUBLIC_DEBUG_MODE
    ),
    NEXT_PUBLIC_DISABLE_STRICT_MODE: safeParseBoolean(
      getProcessEnv(ENV_KEYS.DISABLE_STRICT_MODE),
      preset.NEXT_PUBLIC_DISABLE_STRICT_MODE
    ),

    NEXT_PUBLIC_GA_ID: getProcessEnv(ENV_KEYS.GA_ID) || undefined,
    NEXT_PUBLIC_ENABLE_ANALYTICS: safeParseBoolean(
      getProcessEnv(ENV_KEYS.ENABLE_ANALYTICS),
      false
    ),
  });
}

/**
 * Valida se todas as URLs na configuração são válidas
 * @param {EnvironmentConfig} config - Configuração a ser validada
 * @throws {Error} Se alguma URL for inválida
 */
function validateUrls(config: EnvironmentConfig): void {
  const urlRegex = /^https?:\/\/[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]+$/;
  
  const urlsToValidate = [
    { key: 'NEXT_PUBLIC_BASE_URL', value: config.NEXT_PUBLIC_BASE_URL },
    { key: 'NEXT_PUBLIC_API_URL', value: config.NEXT_PUBLIC_API_URL },
    { key: 'NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN', value: config.NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN },
  ];
  
  for (const { key, value } of urlsToValidate) {
    if (!urlRegex.test(value)) {
      throw new Error(`URL inválida na configuração ${key}: ${value}`);
    }
  }
}

// ============================================================================
// INICIALIZAÇÃO E EXPORTAÇÃO
// ============================================================================

// Determina ambientes
const APP_ENVIRONMENT = determineAppEnvironment();
const NODE_ENVIRONMENT = determineNodeEnvironment();

// Constrói configuração
const environmentConfig = buildEnvironmentConfig(APP_ENVIRONMENT, NODE_ENVIRONMENT);

// Valida URLs (apenas em produção para performance)
if (environmentConfig.NEXT_PUBLIC_ENV === 'production') {
  try {
    validateUrls(environmentConfig);
  } catch (error) {
    console.error('❌ Falha na validação de URLs:', error);
    // Em produção, falhar rápido se URLs estiverem inválidas
    if (environmentConfig.NODE_ENV === 'production') {
      throw error;
    }
  }
}

/**
 * Configuração completa do ambiente exportada para uso na aplicação
 * @constant {EnvironmentConfig} env
 */
export const env: Readonly<EnvironmentConfig> = environmentConfig;

// ============================================================================
// UTILITÁRIOS DE AMBIENTE
// ============================================================================

/** Verifica se está em ambiente de desenvolvimento */
export const isDevelopment = env.NEXT_PUBLIC_ENV === 'development';

/** Verifica se está em ambiente de staging */
export const isStaging = env.NEXT_PUBLIC_ENV === 'staging';

/** Verifica se está em ambiente de produção */
export const isProduction = env.NEXT_PUBLIC_ENV === 'production';

/** Verifica se está em ambiente de testes */
export const isTest = env.NODE_ENV === 'test';

/** Verifica se está em modo de depuração */
export const isDebugMode = env.NEXT_PUBLIC_DEBUG_MODE;

/** Verifica se o modo estrito está desabilitado */
export const isStrictModeDisabled = env.NEXT_PUBLIC_DISABLE_STRICT_MODE;

/**
 * Valida se o ambiente está configurado corretamente
 * @returns {void}
 * @throws {Error} Se houver problemas na configuração
 */
export function validateEnvironment(): void {
  const requiredEnvs = [
    ENV_KEYS.APP_ENV,
    ENV_KEYS.NODE_ENV,
  ];
  
  const missingEnvs = requiredEnvs.filter(key => !getProcessEnv(key));
  
  if (missingEnvs.length > 0) {
    throw new Error(
      `Variáveis de ambiente obrigatórias não definidas: ${missingEnvs.join(', ')}`
    );
  }
  
  console.log('✅ Ambiente validado com sucesso');
}

// ============================================================================
// LOGS DE INICIALIZAÇÃO (apenas no servidor)
// ============================================================================

if (typeof window === 'undefined') {
  const isInitialized = (globalThis as any).__ENVIRONMENT_INITIALIZED__;
  
  if (!isInitialized) {
    (globalThis as any).__ENVIRONMENT_INITIALIZED__ = true;
    
    console.log('🚀 Configuração de Ambiente Inicializada', {
      ambiente: env.NEXT_PUBLIC_ENV,
      nodeEnv: env.NODE_ENV,
      aplicacao: env.NEXT_PUBLIC_APP_NAME,
      baseUrl: env.NEXT_PUBLIC_BASE_URL,
      apiUrl: env.NEXT_PUBLIC_API_URL,
      debug: env.NEXT_PUBLIC_DEBUG_MODE ? '✅ ATIVADO' : '❌ DESATIVADO',
      modoEstrito: env.NEXT_PUBLIC_DISABLE_STRICT_MODE ? '❌ DESATIVADO' : '✅ ATIVADO',
      timestamp: new Date().toISOString(),
    });
    
    // Avisos em desenvolvimento
    if (isDevelopment) {
      console.log('🔧 Modo Desenvolvimento: Recarregamento rápido ativado');
    }
    
    if (isStaging) {
      console.log('🔄 Ambiente de Staging: Dados podem ser resetados periodicamente');
    }
    
    if (isProduction) {
      console.log('🏭 Modo Produção: Otimizações ativas');
    }
  }
}