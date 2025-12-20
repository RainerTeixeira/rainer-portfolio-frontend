/**
 * @fileoverview Configuração Central de Endpoints da API
 * 
 * Define todas as URLs da API de forma centralizada para facilitar
 * manutenção e evitar duplicação de código.
 * 
 * @module lib/api/config/endpoints
 */

/**
 * Objeto contendo todos os endpoints da API organizados por domínio
 */
export const API_ENDPOINTS = {
  // Endpoints Públicos (sem autenticação)
  PUBLIC: {
    // Autenticação
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      CONFIRM_EMAIL: '/auth/confirm-email',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
      REFRESH_TOKEN: '/auth/refresh',
      OAUTH_GOOGLE: '/auth/oauth/google',
      OAUTH_CALLBACK: '/auth/oauth/callback',
    },
    
    // Blog - Posts
    POSTS: {
      LIST: '/posts',
      BY_ID: (id: string) => `/posts/${id}`,
      BY_SLUG: (slug: string) => `/posts/slug/${slug}`,
      INCREMENT_VIEW: (id: string) => `/posts/${id}/view`,
      RELATED: (id: string) => `/posts/${id}/related`,
      POPULAR: '/posts/popular',
      SEARCH: '/posts/search',
    },
    
    // Blog - Categorias
    CATEGORIES: {
      LIST: '/categories',
      BY_ID: (id: string) => `/categories/${id}`,
      BY_SLUG: (slug: string) => `/categories/slug/${slug}`,
      MAIN: '/categories/main',
      SUBCATEGORIES: (parentId: string) => `/categories/${parentId}/subcategories`,
      POPULAR: '/categories/popular',
    },
    
    // Health Checks
    HEALTH: {
      BASIC: '/health',
      DETAILED: '/health/detailed',
    },
  },
  
  // Endpoints Privados (com autenticação)
  PRIVATE: {
    // Blog - Posts
    POSTS: {
      CREATE: '/posts',
      UPDATE: (id: string) => `/posts/${id}`,
      DELETE: (id: string) => `/posts/${id}`,
      PUBLISH: (id: string) => `/posts/${id}/publish`,
      ARCHIVE: (id: string) => `/posts/${id}/archive`,
      ADMIN_LIST: '/posts/admin',
      VALIDATE_SLUG: '/posts/validate-slug',
      DUPLICATE: (id: string) => `/posts/${id}/duplicate`,
      STATS: '/posts/stats',
    },
    
    // Blog - Categorias
    CATEGORIES: {
      CREATE: '/categories',
      UPDATE: (id: string) => `/categories/${id}`,
      DELETE: (id: string) => `/categories/${id}`,
      ADMIN_LIST: '/categories/admin',
      REORDER: '/categories/reorder',
      VALIDATE_NAME: '/categories/validate-name',
      MERGE: '/categories/merge',
    },
    
    // Dashboard
    DASHBOARD: {
      STATS: '/private/dashboard/stats',
      OVERVIEW: '/private/dashboard/overview',
    },
    
    // Usuários
    USERS: {
      PROFILE: '/private/users/profile',
      UPDATE_PROFILE: '/private/users/profile',
      CHANGE_PASSWORD: '/private/users/change-password',
      PREFERENCES: '/private/users/preferences',
    },
    
    // Interações
    INTERACTIONS: {
      LIKES: '/private/likes',
      COMMENTS: '/private/comments',
      BOOKMARKS: '/private/bookmarks',
    },
  },
} as const;

/**
 * Tipos para os paths de endpoints
 */
export type EndpointPath = string | ((param: string) => string);

/**
 * Constrói um endpoint dinâmico com parâmetros
 * 
 * @param endpoint - Função que gera o endpoint
 * @param params - Parâmetros para o endpoint
 * @returns string - Endpoint completo
 * 
 * @example
 * ```typescript
 * const endpoint = buildEndpoint(API_ENDPOINTS.PUBLIC.POSTS.BY_ID, '123');
 * // Resultado: '/posts/123'
 * ```
 */
export const buildEndpoint = (
  endpoint: (param: string) => string,
  param: string
): string => {
  return endpoint(param);
};

/**
 * Constrói um endpoint com query parameters
 * 
 * @param baseEndpoint - Endpoint base
 * @param params - Objeto com parâmetros de query
 * @returns string - Endpoint com query string
 * 
 * @example
 * ```typescript
 * const endpoint = buildQueryEndpoint('/posts', {
 *   page: 1,
 *   limit: 10,
 *   status: 'PUBLISHED'
 * });
 * // Resultado: '/posts?page=1&limit=10&status=PUBLISHED'
 * ```
 */
export const buildQueryEndpoint = (
  baseEndpoint: string,
  params: Record<string, any>
): string => {
  const query = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });
  
  const queryString = query.toString();
  return queryString ? `${baseEndpoint}?${queryString}` : baseEndpoint;
};
