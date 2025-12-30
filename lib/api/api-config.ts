/**
 * @fileoverview Configurações da API - Camada de Compatibilidade
 * 
 * Arquivo de compatibilidade para manter os serviços antigos funcionando.
 * Re-exporta as configurações necessárias.
 * 
 * @deprecated Use as novas configurações em config/endpoints.ts
 */

export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: process.env.NEXT_PUBLIC_API_TIMEOUT ? Number(process.env.NEXT_PUBLIC_API_TIMEOUT) : undefined,
  retries: process.env.NEXT_PUBLIC_API_MAX_RETRIES ? Number(process.env.NEXT_PUBLIC_API_MAX_RETRIES) : undefined,
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erro de conexão',
  TIMEOUT_ERROR: 'Tempo limite excedido',
  UNAUTHORIZED: 'Não autorizado',
  FORBIDDEN: 'Acesso negado',
  NOT_FOUND: 'Recurso não encontrado',
  SERVER_ERROR: 'Erro interno do servidor',
};
