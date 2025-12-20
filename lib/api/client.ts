/**
 * @fileoverview Cliente API - Camada de Compatibilidade
 * 
 * Arquivo de compatibilidade para manter os serviços antigos funcionando
 * enquanto a migração para a nova estrutura não é concluída.
 * 
 * @deprecated Use os novos clientes publicClient/privateClient
 */

import { publicClient } from './clients/public-client';
import { privateClient } from './clients/private-client';
import { getToken } from '@/lib/auth/token-utils';

// Exportar ApiError para compatibilidade
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public endpoint?: string,
    public url?: string,
    public method?: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Interface compatível com os serviços antigos
export const api = {
  get: async (url: string, config?: any) => {
    const isPrivate = url.startsWith('/private') || config?.requiresAuth;
    const client = isPrivate ? privateClient : publicClient;
    return client.get(url.replace('/private', ''), config?.params);
  },
  
  post: async (url: string, data?: any, config?: any) => {
    const isPrivate = url.startsWith('/private') || config?.requiresAuth;
    const client = isPrivate ? privateClient : publicClient;
    return client.post(url.replace('/private', ''), data);
  },
  
  put: async (url: string, data?: any, config?: any) => {
    const isPrivate = url.startsWith('/private') || config?.requiresAuth;
    const client = isPrivate ? privateClient : publicClient;
    return client.put(url.replace('/private', ''), data);
  },
  
  patch: async (url: string, data?: any, config?: any) => {
    const isPrivate = url.startsWith('/private') || config?.requiresAuth;
    const client = isPrivate ? privateClient : publicClient;
    const responseData = await client.patch(url.replace('/private', ''), data);
    // Wrap response in expected format for compatibility
    return { data: responseData, success: true, message: 'Success' };
  },
  
  delete: async (url: string, config?: any) => {
    const isPrivate = url.startsWith('/private') || config?.requiresAuth;
    const client = isPrivate ? privateClient : publicClient;
    const data = await client.delete(url.replace('/private', ''));
    // Wrap response in expected format for compatibility
    return { data, success: true, message: 'Success' };
  },
  
  // Método de compatibilidade para configurar token
  setAuthToken: (token: string) => {
    // Usar a função de token utils se existir
    try {
      const { setToken } = require('@/lib/auth/token-utils');
      setToken(token);
    } catch (error) {
      console.warn('setAuthToken: token-utils não disponível');
    }
  },
};

export default api;
