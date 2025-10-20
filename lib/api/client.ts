// ============================================================================
// Imports
// ============================================================================

import {
    API_CONFIG,
    DEFAULT_HEADERS,
    ERROR_MESSAGES,
    buildApiUrl,
    getErrorMessage,
    isSuccessStatus
} from './config';

// ============================================================================
// Tipos base para respostas da API
// ============================================================================

export interface ApiResponse<T = any> {
  readonly data: T;
  readonly message: string;
  readonly success: boolean;
}

export interface RequestOptions {
  readonly headers?: Record<string, string>;
  readonly params?: Record<string, string | number | boolean | undefined>;
  readonly body?: any;
  readonly cache?: RequestCache;
  readonly next?: {
    readonly revalidate?: number | false;
    readonly tags?: string[];
  };
  readonly timeout?: number;
}

// Configuração do cliente HTTP
class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.defaultHeaders = { ...DEFAULT_HEADERS };
  }

  private async request<T>(
    endpoint: string,
    method: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { headers, params, body, cache, next, timeout = API_CONFIG.TIMEOUT } = options;
    
    // Constrói a URL completa
    const url = buildApiUrl(endpoint);
    const urlObj = new URL(url);
    
    // Adiciona parâmetros de consulta
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          urlObj.searchParams.append(key, String(value));
        }
      });
    }

    // Configuração da requisição
    const config: RequestInit = {
      method,
      headers: {
        ...this.defaultHeaders,
        ...headers,
      },
      cache,
      next,
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    try {
      // Cria AbortController para timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const response = await fetch(urlObj.toString(), {
        ...config,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!isSuccessStatus(response.status)) {
        const errorData = await this.parseResponse(response);
        const errorMessage = errorData?.message || getErrorMessage(response.status);
        
        // Log do erro para debugging
        console.error(`API Error [${method} ${endpoint}]:`, {
          status: response.status,
          statusText: response.statusText,
          errorData,
          url: urlObj.toString()
        });
        
        throw new ApiError(
          response.status,
          errorMessage,
          errorData
        );
      }

      return this.parseResponse(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Tratamento específico para timeout
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError(0, ERROR_MESSAGES.TIMEOUT_ERROR, { originalError: error });
      }
      
      // Log de erros de rede
      console.error(`Network Error [${method} ${endpoint}]:`, error);
      throw new ApiError(0, ERROR_MESSAGES.NETWORK_ERROR, { originalError: error });
    }
  }

  private async parseResponse(response: Response): Promise<any> {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    return response.text();
  }

  // Métodos HTTP
  public get<T>(endpoint: string, options: Omit<RequestOptions, 'body'> = {}) {
    return this.request<T>(endpoint, 'GET', options);
  }

  public post<T>(
    endpoint: string,
    body?: any,
    options: Omit<RequestOptions, 'body'> = {}
  ) {
    return this.request<T>(endpoint, 'POST', { ...options, body });
  }

  public put<T>(
    endpoint: string,
    body?: any,
    options: Omit<RequestOptions, 'body'> = {}
  ) {
    return this.request<T>(endpoint, 'PUT', { ...options, body });
  }

  public patch<T>(
    endpoint: string,
    body?: any,
    options: Omit<RequestOptions, 'body'> = {}
  ) {
    return this.request<T>(endpoint, 'PATCH', { ...options, body });
  }

  public delete<T>(endpoint: string, options: RequestOptions = {}) {
    return this.request<T>(endpoint, 'DELETE', options);
  }
}

// Classe de erro personalizada
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Instância global do cliente
export const api = new ApiClient();

export default api;
