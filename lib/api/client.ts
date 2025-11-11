/**
 * Cliente HTTP profissional para consumo de APIs REST
 * @module ApiClient
 */

import { API_CONFIG, ERROR_MESSAGES, HTTP_STATUS } from './config';

/**
 * Classe de erro personalizada para erros de API com informações detalhadas
 * @class
 * @extends Error
 */
export class ApiError extends Error {
  /**
   * Cria uma instância de ApiError
   * @param {number} status - Status HTTP do erro
   * @param {string} message - Mensagem de erro
   * @param {any} [data] - Dados adicionais do erro
   * @param {string} [url] - URL da requisição que causou o erro
   * @param {string} [method] - Método HTTP da requisição
   * @param {string} [endpoint] - Endpoint da API
   */
  public readonly fullName = 'ApiError';

  constructor(
    public status: number,
    message: string,
    public data?: any,
    public url?: string,
    public method?: string,
    public endpoint?: string
  ) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
    this.name = 'ApiError';

    // Mantém o stack trace para debug
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  /**
   * Retorna uma representação em string do erro para logging
   * @returns {string}
   */
  toString(): string {
    return `ApiError: ${this.status} - ${this.message} | URL: ${this.method} ${this.url} | Endpoint: ${this.endpoint} | Data: ${JSON.stringify(this.data)}`;
  }

  /**
   * Verifica se o erro é um erro de servidor (5xx)
   * @returns {boolean}
   */
  isServerError(): boolean {
    return this.status >= 500;
  }

  /**
   * Verifica se o erro é um erro de cliente (4xx)
   * @returns {boolean}
   */
  isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }
}

/**
 * Interface para opções de requisição HTTP
 * @interface RequestOptions
 * @extends RequestInit
 */
interface RequestOptions extends RequestInit {
  /** Parâmetros de query string */
  params?: Record<string, any>;
  /** Timeout em milissegundos */
  timeout?: number;
  /** Tentativas de retry */
  retries?: number;
  /** Delay entre retries */
  retryDelay?: number;
}

/**
 * Interface para métricas de performance
 */
interface RequestMetrics {
  startTime: number;
  endTime?: number;
  duration?: number;
  size?: number;
}

/**
 * Cliente HTTP para consumir APIs REST
 * @class
 */
class ApiClient {
  /** URL base da API */
  private baseUrl: string;
  /** Headers padrão para todas as requisições */
  private defaultHeaders: HeadersInit;
  /** Callback para logging */
  private logger?: (message: string, data?: any) => void;
  /** Callback para monitoramento */
  private onRequest?: (
    metrics: RequestMetrics & {
      endpoint: string;
      method: string;
      status?: number;
    }
  ) => void;

  /**
   * Cria uma instância do ApiClient
   * @param {Object} options - Opções de configuração
   * @param {Function} options.logger - Função para logging
   * @param {Function} options.onRequest - Callback para monitoramento de requisições
   */
  constructor(options?: {
    logger?: (message: string, data?: any) => void;
    onRequest?: (
      metrics: RequestMetrics & {
        endpoint: string;
        method: string;
        status?: number;
      }
    ) => void;
  }) {
    // Validar URL da API
    if (!API_CONFIG.BASE_URL) {
      const errorMessage =
        'NEXT_PUBLIC_API_URL não está configurada. Verifique suas variáveis de ambiente.';
      console.error('[ApiClient]', errorMessage);
      if (process.env.NODE_ENV === 'development') {
        throw new Error(errorMessage);
      }
    }

    this.baseUrl = API_CONFIG.BASE_URL || '';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // Seleção de provider de banco (PRISMA | DYNAMODB)
      'X-Database-Provider': (
        process.env.NEXT_PUBLIC_API_DB_PROVIDER || 'PRISMA'
      ).toUpperCase(),
    };
    this.logger = options?.logger;
    this.onRequest = options?.onRequest;

    // Log da URL base em desenvolvimento
    if (process.env.NODE_ENV === 'development' && this.baseUrl) {
      console.log('[ApiClient] URL base da API:', this.baseUrl);
    }
  }

  /**
   * Loga mensagens se logger estiver configurado
   * @private
   */
  private log(message: string, data?: any): void {
    if (this.logger) {
      this.logger(message, data);
    }
  }

  /**
   * Constrói a URL completa com parâmetros de query
   * @private
   */
  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    const base = this.baseUrl.replace(/\/$/, '');
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const fullUrl = `${base}${path}`;

    if (!params || Object.keys(params).length === 0) {
      return fullUrl;
    }

    const url = new URL(fullUrl);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    return url.toString();
  }

  /**
   * Processa a resposta da API
   * @private
   */
  private async processResponse<T>(response: Response): Promise<T> {
    let data: any;
    const contentType = response.headers.get('content-type');

    try {
      // Processar a resposta normalmente
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else if (response.status !== HTTP_STATUS.NO_CONTENT) {
        data = await response.text();
      } else {
        data = {};
      }
    } catch (jsonError) {
      this.log('Erro ao parsear resposta JSON', {
        error: jsonError,
        status: response.status,
      });

      // Para erros 500, tentar ler como texto mesmo se falhar o JSON
      if (response.status >= 500) {
        try {
          // Tentar clonar e ler como texto
          const clonedResponse = response.clone();
          const text = await clonedResponse.text();
          data = text;

          // Tentar parsear como JSON
          try {
            data = JSON.parse(text);
          } catch {
            // Se não for JSON, manter como texto
            data = text;
          }
        } catch (e) {
          console.error('[ApiClient] Erro ao ler resposta do servidor:', e);
          data = {
            error: 'Não foi possível ler a resposta do servidor',
            originalError: String(e),
          };
        }
      } else {
        data = {};
      }
    }

    return data;
  }

  /**
   * Extrai mensagem de erro dos dados de resposta
   * @private
   */
  private getErrorMessage(data: any, status: number): string {
    if (typeof data === 'string') return data;

    // Tenta extrair mensagem de erro de estruturas comuns
    // Para erros 500, tenta várias estruturas possíveis
    let errorMessage =
      data?.message ||
      data?.error?.message ||
      data?.error ||
      data?.detail ||
      data?.errorMessage ||
      data?.error_description ||
      data?.err?.message ||
      data?.stack; // Último recurso: mostrar stack trace

    // Se não encontrou mensagem e há dados, tenta stringificar
    if (!errorMessage && data) {
      try {
        const dataString = JSON.stringify(data);
        // Se os dados são muito grandes, trunca
        if (dataString.length > 500) {
          errorMessage = `Erro do servidor (${status}): ${dataString.substring(0, 500)}...`;
        } else {
          errorMessage = `Erro do servidor (${status}): ${dataString}`;
        }
      } catch (e) {
        errorMessage = `Request failed with status ${status}`;
      }
    }

    // Fallback final
    if (!errorMessage) {
      errorMessage = `Request failed with status ${status}`;
    }

    return errorMessage;
  }

  /**
   * Executa uma requisição HTTP com retry automático
   * @private
   */
  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const {
      params,
      timeout = API_CONFIG.TIMEOUT,
      retries = 2, // Número padrão de tentativas
      retryDelay = 2000, // 2 segundos entre tentativas
      ...fetchOptions
    } = options;

    const requestId = Math.random().toString(36).substring(2, 9);

    const url = this.buildUrl(endpoint, params);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const metrics: RequestMetrics = {
      startTime: Date.now(),
    };

    try {
      this.log(
        `[${requestId}] Iniciando requisição: ${fetchOptions.method || 'GET'} ${endpoint}`,
        {
          url,
          params,
          headers: fetchOptions.headers,
          timeout,
          retries,
          retryDelay,
        }
      );

      if (process.env.NODE_ENV === 'development') {
        console.log(`[${requestId}] URL da requisição:`, url);
      }

      const fetchStartTime = Date.now();
      if (process.env.NODE_ENV === 'development') {
        console.log(`[${requestId}] Iniciando fetch...`);
      }

      // Preparar headers - remover Content-Type se body for FormData
      const isFormData = fetchOptions.body instanceof FormData;
      const headers = new Headers();

      // Adicionar headers padrão (exceto Content-Type se for FormData)
      Object.entries(this.defaultHeaders).forEach(([key, value]) => {
        if (!(isFormData && key.toLowerCase() === 'content-type')) {
          headers.set(key, value as string);
        }
      });

      // Adicionar headers customizados (exceto Content-Type se for FormData)
      if (fetchOptions.headers) {
        if (fetchOptions.headers instanceof Headers) {
          fetchOptions.headers.forEach((value, key) => {
            if (!(isFormData && key.toLowerCase() === 'content-type')) {
              headers.set(key, value);
            }
          });
        } else if (fetchOptions.headers instanceof Object) {
          Object.entries(fetchOptions.headers).forEach(([key, value]) => {
            if (!(isFormData && key.toLowerCase() === 'content-type')) {
              headers.set(key, value as string);
            }
          });
        }
      }

      const response = await fetch(url, {
        ...fetchOptions,
        headers,
        signal: controller.signal,
      }).catch(error => {
        if (process.env.NODE_ENV === 'development') {
          console.error(`[${requestId}] Erro no fetch:`, error);
        }
        throw error;
      });

      if (process.env.NODE_ENV === 'development') {
        console.log(
          `[${requestId}] Fetch concluído em ${Date.now() - fetchStartTime}ms`,
          {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
          }
        );
      }

      clearTimeout(timeoutId);
      metrics.endTime = Date.now();
      metrics.duration = metrics.endTime - metrics.startTime;

      // Processar resposta primeiro
      const data = await this.processResponse<T>(response);

      // Para erros 500, logar dados processados de forma consolidada
      if (response.status >= 500 && process.env.NODE_ENV === 'development') {
        console.error(
          `[${requestId}] [ApiClient] ERRO ${response.status} DETECTADO:`,
          {
            endpoint,
            url,
            method: fetchOptions.method || 'GET',
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
            responseData: data,
            responseDataStringified:
              typeof data === 'object'
                ? JSON.stringify(data, null, 2)
                : String(data),
          }
        );
      }

      // Log da resposta
      this.log(`Resposta recebida: ${response.status} ${endpoint}`, {
        status: response.status,
        duration: metrics.duration,
        data: response.ok ? data : undefined,
      });

      // Report metrics
      if (this.onRequest) {
        this.onRequest({
          ...metrics,
          endpoint,
          method: fetchOptions.method || 'GET',
          status: response.status,
        });
      }

      if (!response.ok) {
        const errorMessage = this.getErrorMessage(data, response.status);

        // Log detalhado de erros do servidor em desenvolvimento
        if (process.env.NODE_ENV === 'development' && response.status >= 500) {
          console.error('[ApiClient] Erro do servidor:', {
            status: response.status,
            statusText: response.statusText,
            endpoint,
            url,
            method: fetchOptions.method || 'GET',
            responseData: data,
            errorMessage,
          });
        }

        throw new ApiError(
          response.status,
          errorMessage,
          data,
          url,
          fetchOptions.method || 'GET',
          endpoint
        );
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      metrics.endTime = Date.now();
      metrics.duration = metrics.endTime - metrics.startTime;

      // Log do erro detalhado (apenas em desenvolvimento)
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido';
      const errorObj = error as any;

      if (process.env.NODE_ENV === 'development') {
        // Extrair informações detalhadas do erro
        const errorDetails: any = {
          endpoint,
          url,
          method: fetchOptions.method || 'GET',
          duration: metrics.duration,
          error: errorMessage,
        };

        // Se for ApiError, incluir status e dados da resposta
        if (errorObj.status) {
          errorDetails.status = errorObj.status;
          errorDetails.statusText = errorObj.statusText;
          errorDetails.responseData = errorObj.data;
        }

        // Incluir tipo e stack se disponível
        if (errorObj.constructor?.name) {
          errorDetails.errorType = errorObj.constructor.name;
        }
        if (errorObj.stack) {
          errorDetails.stack = errorObj.stack;
        }
        if (
          errorObj.name === 'AbortError' ||
          errorMessage.includes('aborted')
        ) {
          errorDetails.isAbortError = true;
        }

        console.error(`[${requestId}] Erro na requisição:`, errorDetails);
      }

      // Log do erro resumido
      this.log(`[${requestId}] Erro na requisição: ${endpoint}`, {
        error: errorMessage,
        duration: metrics.duration,
        url,
        method: fetchOptions.method,
      });

      // Report metrics com erro
      if (this.onRequest) {
        this.onRequest({
          ...metrics,
          endpoint,
          method: fetchOptions.method || 'GET',
          status: error instanceof ApiError ? error.status : 0,
        });
      }

      // Se for ApiError, apenas propague
      if (error instanceof ApiError) throw error;

      // Tratamento de timeout
      if (
        error instanceof Error &&
        (error.name === 'AbortError' ||
          (error as any).fullName === 'AbortError')
      ) {
        throw new ApiError(
          HTTP_STATUS.SERVICE_UNAVAILABLE,
          ERROR_MESSAGES.TIMEOUT_ERROR,
          { originalError: error.message },
          url,
          fetchOptions.method || 'GET',
          endpoint
        );
      }

      // Tratamento de erro de rede
      throw new ApiError(
        0,
        ERROR_MESSAGES.NETWORK_ERROR,
        { originalError: error instanceof Error ? error.message : error },
        url,
        fetchOptions.method || 'GET',
        endpoint
      );
    }
  }

  /**
   * Executa uma requisição GET
   */
  async get<T>(
    endpoint: string,
    options?: Omit<RequestOptions, 'body'>
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  /**
   * Executa uma requisição POST
   */
  async post<T>(
    endpoint: string,
    body?: any,
    options?: Omit<RequestOptions, 'body'>
  ): Promise<T> {
    // Se body for FormData, não fazer JSON.stringify
    const isFormData = body instanceof FormData;

    if (isFormData) {
      // Criar headers incluindo padrões (Authorization, etc.) mas sem Content-Type
      const headersWithoutContentType = new Headers();

      // Adicionar headers padrão (exceto Content-Type)
      Object.entries(this.defaultHeaders).forEach(([key, value]) => {
        if (key.toLowerCase() !== 'content-type') {
          headersWithoutContentType.set(key, value as string);
        }
      });

      // Adicionar headers customizados (exceto Content-Type)
      if (options?.headers) {
        if (options.headers instanceof Headers) {
          options.headers.forEach((value, key) => {
            if (key.toLowerCase() !== 'content-type') {
              headersWithoutContentType.set(key, value);
            }
          });
        } else {
          Object.entries(options.headers).forEach(([key, value]) => {
            if (key.toLowerCase() !== 'content-type') {
              headersWithoutContentType.set(key, value as string);
            }
          });
        }
      }

      return this.request<T>(endpoint, {
        ...options,
        method: 'POST',
        body: body, // FormData como está
        headers: headersWithoutContentType,
      });
    }

    // JSON normal
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * Executa uma requisição PUT
   */
  async put<T>(
    endpoint: string,
    body?: any,
    options?: Omit<RequestOptions, 'body'>
  ): Promise<T> {
    // Se body for FormData, não fazer JSON.stringify (deixar o navegador definir Content-Type com boundary)
    const isFormData = body instanceof FormData;

    // Se for FormData, passar headers sem Content-Type no options
    // O método request() já trata a remoção de Content-Type automaticamente
    if (isFormData) {
      // Criar headers incluindo padrões (Authorization, etc.) mas sem Content-Type
      const headersWithoutContentType = new Headers();

      // Adicionar headers padrão (exceto Content-Type)
      Object.entries(this.defaultHeaders).forEach(([key, value]) => {
        if (key.toLowerCase() !== 'content-type') {
          headersWithoutContentType.set(key, value as string);
        }
      });

      // Adicionar headers customizados (exceto Content-Type)
      if (options?.headers) {
        if (options.headers instanceof Headers) {
          options.headers.forEach((value, key) => {
            if (key.toLowerCase() !== 'content-type') {
              headersWithoutContentType.set(key, value);
            }
          });
        } else {
          Object.entries(options.headers).forEach(([key, value]) => {
            if (key.toLowerCase() !== 'content-type') {
              headersWithoutContentType.set(key, value as string);
            }
          });
        }
      }

      return this.request<T>(endpoint, {
        ...options,
        method: 'PUT',
        body: body, // FormData como está
        headers: headersWithoutContentType,
      });
    }

    // JSON normal
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * Executa uma requisição PATCH
   */
  async patch<T>(
    endpoint: string,
    body?: any,
    options?: Omit<RequestOptions, 'body'>
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * Executa uma requisição DELETE
   */
  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  /**
   * Define o token de autenticação
   */
  setAuthToken(token: string): void {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      Authorization: `Bearer ${token}`,
    };
  }

  /**
   * Remove o token de autenticação
   */
  clearAuthToken(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { Authorization: _Authorization, ...rest } = this
      .defaultHeaders as any;
    this.defaultHeaders = rest;
  }

  /**
   * Define um header personalizado
   */
  setHeader(key: string, value: string): void {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      [key]: value,
    };
  }

  /**
   * Remove um header personalizado
   */
  removeHeader(key: string): void {
    const headers = { ...this.defaultHeaders };
    delete (headers as any)[key];
    this.defaultHeaders = headers;
  }

  /**
   * Obtém os headers atuais (cópia)
   */
  getHeaders(): HeadersInit {
    return { ...this.defaultHeaders };
  }
}

/**
 * Instância singleton do cliente API
 */
export const api = new ApiClient({
  logger: (message, data) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Client] ${message}`, data);
    }
  },
  onRequest: metrics => {
    // Pode ser integrado com serviço de monitoramento (DataDog, New Relic, etc.)
    if (metrics.duration && metrics.duration > 5000) {
      console.warn(
        `[API Slow Request] ${metrics.method} ${metrics.endpoint} took ${metrics.duration}ms`
      );
    }
  },
});

export default api;
