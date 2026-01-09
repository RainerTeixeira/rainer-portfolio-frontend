/**
 * @fileoverview Cliente HTTP para APIs Privadas
 * 
 * Cliente configurado para comunicação com endpoints privados da API.
 * Inclui automaticamente o token de autenticação JWT em todas as requisições.
 * Utilizado para rotas que requerem autenticação.
 * 
 * @module lib/api/clients/private-client
 */

import { getToken, removeToken } from '@/lib/utils';

/**
 * URL base da API obtida das variáveis de ambiente
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

/**
 * Interface para opções de requisição
 */
interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, any>;
}

/**
 * Cliente HTTP para requisições a endpoints privados/autenticados
 * 
 * Implementado usando fetch nativo do Next.js para evitar dependências externas.
 * Adiciona automaticamente o token JWT às requisições.
 */
class PrivateClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  /**
   * Constrói a URL completa com parâmetros de query
   */
  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(`${this.baseURL}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    
    return url.toString();
  }

  /**
   * Realiza uma requisição HTTP com autenticação
   */
  private async request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', headers = {}, body, params } = options;
    
    const url = this.buildUrl(endpoint, params);
    
    // Obter token de autenticação
    const token = getToken();
    
    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
    };

    if (body && method !== 'GET') {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, config);
      
      // Tratamento especial para erro 401
      if (response.status === 401) {
        console.warn('[API Privada] Token expirado ou inválido');
        removeToken();
        
        // Redirecionar para login (se estiver no navegador)
        if (typeof window !== 'undefined') {
          window.location.href = '/dashboard/login';
        }
        
        throw new Error('Não autorizado');
      }
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(errorData.message || `HTTP ${response.status}`);
        (error as any).status = response.status;
        (error as any).data = errorData;
        throw error;
      }

      // Verificar se a resposta tem conteúdo
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return {} as T;
    } catch (error) {
      console.error('[API Privada] Erro na requisição:', error);
      throw error;
    }
  }

  /**
   * GET request
   */
  async get<T = any>(endpoint: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  /**
   * POST request
   */
  async post<T = any>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body: data });
  }

  /**
   * PUT request
   */
  async put<T = any>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body: data });
  }

  /**
   * PATCH request
   */
  async patch<T = any>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'PATCH', body: data });
  }

  /**
   * DELETE request
   */
  async delete<T = any>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

/**
 * Instância do cliente privado
 */
export const privateClient = new PrivateClient(API_BASE_URL);

export default privateClient;
