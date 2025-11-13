/**
 * Configurações centralizadas para a API do backend
 *
 * @fileoverview Configurações e constantes da API
 * @module ApiConfig
 * @author Rainer Teixeira
 * @version 1.0.1
 */

// ============================================================================
// URLs e Endpoints
// ============================================================================

/**
 * Configurações principais da API
 * @namespace API_CONFIG
 * @readonly
 * @property {string} BASE_URL - URL base do backend
 * @property {number} TIMEOUT - Timeout padrão para requisições (em ms)
 * @property {number} MAX_RETRIES - Número máximo de tentativas em caso de erro
 * @property {number} RETRY_DELAY - Delay entre tentativas (em ms)
 */
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL!,
  TIMEOUT: Number(process.env.NEXT_PUBLIC_API_TIMEOUT!),
  MAX_RETRIES: Number(process.env.NEXT_PUBLIC_API_MAX_RETRIES!),
  RETRY_DELAY: Number(process.env.NEXT_PUBLIC_API_RETRY_DELAY!),
} as const;

// ============================================================================
// Endpoints da API
// ============================================================================

/**
 * Endpoints da API organizados por módulo
 * @namespace API_ENDPOINTS
 * @readonly
 */
export const API_ENDPOINTS = {
  /** Endpoints de autenticação */
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password',
  },

  /** Endpoints de posts */
  POSTS: {
    LIST: '/posts',
    CREATE: '/posts',
    GET_BY_ID: (id: string) => `/posts/${id}`,
    GET_BY_SLUG: (slug: string) => `/posts/slug/${slug}`,
    UPDATE: (id: string) => `/posts/${id}`,
    DELETE: (id: string) => `/posts/${id}`,
    PUBLISH: (id: string) => `/posts/${id}/publish`,
    UNPUBLISH: (id: string) => `/posts/${id}/unpublish`,
    BY_AUTHOR: (authorId: string) => `/posts/author/${authorId}`,
    SUBCATEGORY: (subcategoryId: string) =>
      `/posts/subcategory/${subcategoryId}`,
  },

  /** Endpoints de categorias */
  CATEGORIES: {
    LIST: '/categories',
    CREATE: '/categories',
    GET_BY_ID: (id: string) => `/categories/${id}`,
    GET_BY_SLUG: (slug: string) => `/categories/slug/${slug}`,
    UPDATE: (id: string) => `/categories/${id}`,
    DELETE: (id: string) => `/categories/${id}`,
  },

  /** Endpoints de comentários */
  COMMENTS: {
    LIST: '/comments',
    CREATE: '/comments',
    GET_BY_ID: (id: string) => `/comments/${id}`,
    UPDATE: (id: string) => `/comments/${id}`,
    DELETE: (id: string) => `/comments/${id}`,
    BY_POST: (postId: string) => `/comments/post/${postId}`,
    BY_USER: (userId: string) => `/comments/author/${userId}`,
  },

  /** Endpoints de likes */
  LIKES: {
    CREATE: '/likes',
    DELETE: (userId: string, postId: string) => `/likes/${userId}/${postId}`,
    BY_POST: (postId: string) => `/likes/post/${postId}`,
    BY_USER: (userId: string) => `/likes/user/${userId}`,
    COUNT_BY_POST: (postId: string) => `/likes/post/${postId}/count`,
    CHECK_USER_POST: (userId: string, postId: string) =>
      `/likes/${userId}/${postId}`,
  },

  /** Endpoints de favoritos */
  BOOKMARKS: {
    CREATE: '/bookmarks',
    GET_BY_ID: (id: string) => `/bookmarks/${id}`,
    BY_USER: (userId: string) => `/bookmarks/user/${userId}`,
    BY_COLLECTION: (fullName: string) => `/bookmarks/collection/${fullName}`,
    UPDATE: (id: string) => `/bookmarks/${id}`,
    DELETE: (id: string) => `/bookmarks/${id}`,
    DELETE_USER_POST: (userId: string, postId: string) =>
      `/bookmarks/${userId}/${postId}`,
  },

  /** Endpoints de usuários */
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    GET_BY_ID: (id: string) => `/users/${id}`,
    GET_BY_USERNAME: (username: string) => `/users/username/${username}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    BAN: (id: string) => `/users/${id}/ban`,
  },

  /** Endpoints do sistema */
  SYSTEM: {
    HEALTH: '/health',
    HEALTH_DETAILED: '/health/detailed',
  },
} as const;

// ============================================================================
// Headers Padrão
// ============================================================================

/**
 * Headers padrão para requisições HTTP
 * @namespace DEFAULT_HEADERS
 * @readonly
 * @property {string} Content-Type - application/json
 * @property {string} Accept - application/json
 * @property {string} X-Requested-With - XMLHttpRequest
 */
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
} as const;

// ============================================================================
// Configurações de Cache
// ============================================================================

/**
 * Configurações de cache para diferentes tipos de dados
 * @namespace CACHE_CONFIG
 * @readonly
 * @property {number} STATIC_DATA - Tempo de cache para dados estáticos (1 hora)
 * @property {number} DYNAMIC_DATA - Tempo de cache para dados dinâmicos (5 minutos)
 * @property {number} USER_DATA - Tempo de cache para dados de usuário (1 minuto)
 * @property {number} NO_CACHE - Sem cache
 */
export const CACHE_CONFIG = {
  STATIC_DATA: 3600,
  DYNAMIC_DATA: 300,
  USER_DATA: 60,
  NO_CACHE: 0,
} as const;

// ============================================================================
// Configurações de Paginação
// ============================================================================

/**
 * Configurações padrão para paginação
 * @namespace PAGINATION_CONFIG
 * @readonly
 * @property {number} DEFAULT_PAGE - Página padrão
 * @property {number} DEFAULT_LIMIT - Limite padrão de itens por página
 * @property {number} MAX_LIMIT - Limite máximo de itens por página
 * @property {number} MIN_LIMIT - Limite mínimo de itens por página
 */
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1,
} as const;

// ============================================================================
// Status Codes HTTP
// ============================================================================

/**
 * Códigos de status HTTP comuns
 * @namespace HTTP_STATUS
 * @readonly
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

// ============================================================================
// Mensagens de Erro Padrão
// ============================================================================

/**
 * Mensagens de erro padrão para diferentes situações
 * @namespace ERROR_MESSAGES
 * @readonly
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erro de rede. Verifique sua conexão.',
  TIMEOUT_ERROR: 'Tempo limite excedido. Tente novamente.',
  UNAUTHORIZED: 'Usuário não autenticado.',
  FORBIDDEN: 'Acesso negado.',
  NOT_FOUND: 'Recurso não encontrado.',
  VALIDATION_ERROR: 'Dados inválidos.',
  SERVER_ERROR: 'Erro interno do servidor.',
  UNKNOWN_ERROR: 'Erro desconhecido.',
} as const;

// ============================================================================
// Configurações de Retry
// ============================================================================

/**
 * Configurações para retentativas de requisições
 * @namespace RETRY_CONFIG
 * @readonly
 */
export const RETRY_CONFIG = {
  MAX_ATTEMPTS: 3,
  INITIAL_DELAY: 1000,
  MAX_DELAY: 10000,
  BACKOFF_FACTOR: 2,
  RETRYABLE_STATUS_CODES: [
    HTTP_STATUS.TOO_MANY_REQUESTS,
    HTTP_STATUS.INTERNAL_SERVER_ERROR,
    HTTP_STATUS.BAD_GATEWAY,
    HTTP_STATUS.SERVICE_UNAVAILABLE,
  ],
} as const;

// ============================================================================
// Validação de Configuração
// ============================================================================

/**
 * Valida se as configurações da API estão corretas
 * @function validateApiConfig
 * @returns {boolean} True se a configuração é válida, false caso contrário
 * @example
 * if (!validateApiConfig()) {
 *   console.error('Configuração da API inválida');
 * }
 */
export function validateApiConfig(): boolean {
  try {
    if (!API_CONFIG.BASE_URL) {
      console.error('API_CONFIG.BASE_URL não está definida');
      return false;
    }

    new URL(API_CONFIG.BASE_URL);

    if (API_CONFIG.TIMEOUT <= 0) {
      console.error('API_CONFIG.TIMEOUT deve ser maior que 0');
      return false;
    }

    if (API_CONFIG.MAX_RETRIES < 0) {
      console.error('API_CONFIG.MAX_RETRIES não pode ser negativo');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro na validação da configuração da API:', error);
    return false;
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Constrói URL completa para um endpoint
 * @function buildApiUrl
 * @param {string} endpoint - Endpoint da API
 * @returns {string} URL completa
 * @example
 * const url = buildApiUrl('/posts'); // 'http://localhost:4000/posts'
 */
export function buildApiUrl(endpoint: string): string {
  const baseUrl = API_CONFIG.BASE_URL.replace(/\/$/, '');
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
}

/**
 * Verifica se um status code indica sucesso
 * @function isSuccessStatus
 * @param {number} status - Status code HTTP
 * @returns {boolean} True se o status indica sucesso
 */
export function isSuccessStatus(status: number): boolean {
  return status >= 200 && status < 300;
}

/**
 * Verifica se um status code indica erro do cliente
 * @function isClientError
 * @param {number} status - Status code HTTP
 * @returns {boolean} True se o status indica erro do cliente
 */
export function isClientError(status: number): boolean {
  return status >= 400 && status < 500;
}

/**
 * Verifica se um status code indica erro do servidor
 * @function isServerError
 * @param {number} status - Status code HTTP
 * @returns {boolean} True se o status indica erro do servidor
 */
export function isServerError(status: number): boolean {
  return status >= 500 && status < 600;
}

/**
 * Obtém mensagem de erro baseada no status code
 * @function getErrorMessage
 * @param {number} status - Status code HTTP
 * @returns {string} Mensagem de erro correspondente
 */
export function getErrorMessage(status: number): string {
  switch (status) {
    case HTTP_STATUS.UNAUTHORIZED:
      return ERROR_MESSAGES.UNAUTHORIZED;
    case HTTP_STATUS.FORBIDDEN:
      return ERROR_MESSAGES.FORBIDDEN;
    case HTTP_STATUS.NOT_FOUND:
      return ERROR_MESSAGES.NOT_FOUND;
    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      return ERROR_MESSAGES.SERVER_ERROR;
    case HTTP_STATUS.TOO_MANY_REQUESTS:
      return ERROR_MESSAGES.TIMEOUT_ERROR;
    default:
      return ERROR_MESSAGES.UNKNOWN_ERROR;
  }
}

/**
 * Verifica se um status code é elegível para retentativa
 * @function isRetryableError
 * @param {number} status - Status code HTTP
 * @returns {boolean} True se o erro é elegível para retentativa
 */
export function isRetryableError(status: number): boolean {
  return (RETRY_CONFIG.RETRYABLE_STATUS_CODES as readonly number[]).includes(
    status
  );
}

/**
 * Calcula o delay exponencial para retentativas
 * @function calculateRetryDelay
 * @param {number} attempt - Número da tentativa atual
 * @returns {number} Delay em milissegundos
 */
export function calculateRetryDelay(attempt: number): number {
  const delay =
    RETRY_CONFIG.INITIAL_DELAY *
    Math.pow(RETRY_CONFIG.BACKOFF_FACTOR, attempt - 1);
  return Math.min(delay, RETRY_CONFIG.MAX_DELAY);
}

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Tipo para endpoints que recebem parâmetros
 * @typedef {(param: string) => string} ParamEndpoint
 */

/**
 * Tipo para endpoints que recebem múltiplos parâmetros
 * @typedef {(param1: string, param2: string) => string} MultiParamEndpoint
 */

/**
 * Interface para configuração de paginação
 * @interface PaginationParams
 * @property {number} [page] - Página atual
 * @property {number} [limit] - Itens por página
 * @property {string} [sort] - Campo para ordenação
 * @property {'asc' | 'desc'} [order] - Direção da ordenação
 */

/**
 * Interface para resposta paginada
 * @interface PaginatedResponse
 * @template T
 * @property {T[]} data - Dados da página atual
 * @property {number} total - Total de itens
 * @property {number} page - Página atual
 * @property {number} limit - Itens por página
 * @property {number} totalPages - Total de páginas
 * @property {boolean} hasNext - Tem próxima página
 * @property {boolean} hasPrev - Tem página anterior
 */
