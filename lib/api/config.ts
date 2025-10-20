// ============================================================================
// Configuração da API - Centraliza todas as configurações
// ============================================================================

/**
 * Configurações centralizadas para a API do backend
 * 
 * @fileoverview Configurações e constantes da API
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// ============================================================================
// URLs e Endpoints
// ============================================================================

export const API_CONFIG = {
  // URL base do backend
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  
  // Timeout padrão para requisições (em ms)
  TIMEOUT: 10000,
  
  // Número máximo de tentativas em caso de erro
  MAX_RETRIES: 3,
  
  // Delay entre tentativas (em ms)
  RETRY_DELAY: 1000,
} as const;

// ============================================================================
// Endpoints da API
// ============================================================================

export const API_ENDPOINTS = {
  // Autenticação
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password',
    PROFILE: '/auth/profile',
  },
  
  // Posts
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
    SUBCATEGORY: (subcategoryId: string) => `/posts/subcategory/${subcategoryId}`,
  },
  
  // Categorias
  CATEGORIES: {
    LIST: '/categories',
    CREATE: '/categories',
    GET_BY_ID: (id: string) => `/categories/${id}`,
    GET_BY_SLUG: (slug: string) => `/categories/slug/${slug}`,
    UPDATE: (id: string) => `/categories/${id}`,
    DELETE: (id: string) => `/categories/${id}`,
  },
  
  // Comentários
  COMMENTS: {
    LIST: '/comments',
    CREATE: '/comments',
    GET_BY_ID: (id: string) => `/comments/${id}`,
    UPDATE: (id: string) => `/comments/${id}`,
    DELETE: (id: string) => `/comments/${id}`,
    BY_POST: (postId: string) => `/comments/post/${postId}`,
    BY_USER: (userId: string) => `/comments/author/${userId}`,
  },
  
  // Likes
  LIKES: {
    CREATE: '/likes',
    DELETE: (userId: string, postId: string) => `/likes/${userId}/${postId}`,
    BY_POST: (postId: string) => `/likes/post/${postId}`,
    BY_USER: (userId: string) => `/likes/user/${userId}`,
    COUNT_BY_POST: (postId: string) => `/likes/post/${postId}/count`,
    CHECK_USER_POST: (userId: string, postId: string) => `/likes/${userId}/${postId}`,
  },
  
  // Bookmarks
  BOOKMARKS: {
    CREATE: '/bookmarks',
    GET_BY_ID: (id: string) => `/bookmarks/${id}`,
    BY_USER: (userId: string) => `/bookmarks/user/${userId}`,
    BY_COLLECTION: (name: string) => `/bookmarks/collection/${name}`,
    UPDATE: (id: string) => `/bookmarks/${id}`,
    DELETE: (id: string) => `/bookmarks/${id}`,
    DELETE_USER_POST: (userId: string, postId: string) => `/bookmarks/${userId}/${postId}`,
  },
  
  // Usuários
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    GET_BY_ID: (id: string) => `/users/${id}`,
    GET_BY_USERNAME: (username: string) => `/users/username/${username}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    BAN: (id: string) => `/users/${id}/ban`,
  },
  
  // Sistema
  SYSTEM: {
    HEALTH: '/health',
    HEALTH_DETAILED: '/health/detailed',
  },
} as const;

// ============================================================================
// Headers Padrão
// ============================================================================

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
} as const;

// ============================================================================
// Configurações de Cache
// ============================================================================

export const CACHE_CONFIG = {
  // Tempo de cache para dados estáticos (1 hora)
  STATIC_DATA: 3600,
  
  // Tempo de cache para dados dinâmicos (5 minutos)
  DYNAMIC_DATA: 300,
  
  // Tempo de cache para dados de usuário (1 minuto)
  USER_DATA: 60,
  
  // Sem cache
  NO_CACHE: 0,
} as const;

// ============================================================================
// Configurações de Paginação
// ============================================================================

export const PAGINATION_CONFIG = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1,
} as const;

// ============================================================================
// Status Codes
// ============================================================================

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
 */
export function validateApiConfig(): boolean {
  try {
    // Verificar se a URL base está definida
    if (!API_CONFIG.BASE_URL) {
      console.error('API_CONFIG.BASE_URL não está definida');
      return false;
    }
    
    // Verificar se a URL é válida
    new URL(API_CONFIG.BASE_URL);
    
    // Verificar se o timeout é válido
    if (API_CONFIG.TIMEOUT <= 0) {
      console.error('API_CONFIG.TIMEOUT deve ser maior que 0');
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
 */
export function buildApiUrl(endpoint: string): string {
  const baseUrl = API_CONFIG.BASE_URL.replace(/\/$/, ''); // Remove trailing slash
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
}

/**
 * Verifica se um status code indica sucesso
 */
export function isSuccessStatus(status: number): boolean {
  return status >= 200 && status < 300;
}

/**
 * Verifica se um status code indica erro do cliente
 */
export function isClientError(status: number): boolean {
  return status >= 400 && status < 500;
}

/**
 * Verifica se um status code indica erro do servidor
 */
export function isServerError(status: number): boolean {
  return status >= 500 && status < 600;
}

/**
 * Obtém mensagem de erro baseada no status code
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
    default:
      return ERROR_MESSAGES.UNKNOWN_ERROR;
  }
}
