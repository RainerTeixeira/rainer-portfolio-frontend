/**
 * @module ApiClient
 * @fileoverview Cliente HTTP profissional para consumo de APIs REST
 * @description 
 * Fornece uma interface robusta para fazer requisições HTTP com tratamento de erros,
 * retry automático, logging e métricas de performance.
 * @author Rainer Teixeira
 * @version 1.1.0
 */

import { env, isDevelopment } from '@/lib/config/env';
import { API_CONFIG, ERROR_MESSAGES, HTTP_STATUS } from './api-config';

// =============================================================================
// TIPOS E INTERFACES
// =============================================================================

/**
 * Tipo para valores de parâmetros de query string
 */
type QueryParamValue = string | number | boolean | null | undefined;

/**
 * Tipo para dados de erro da API
 */
type ApiErrorData = unknown;

/**
 * Interface para opções de requisição HTTP
 */
interface RequestOptions extends RequestInit {
  /** Parâmetros de query string */
  params?: Record<string, QueryParamValue>;
  /** Timeout em milissegundos */
  timeout?: number;
  /** Tentativas de retry */
  retries?: number;
  /** Delay entre retries em milissegundos */
  retryDelay?: number;
}

/**
 * Interface para métricas de performance das requisições
 */
interface RequestMetrics {
  startTime: number;
  endTime?: number;
  duration?: number;
  size?: number;
}

/**
 * Estrutura comum para dados de erro da API
 */
interface ErrorDataStructure {
  message?: string;
  error?: string | { message?: string };
  detail?: string;
  errorMessage?: string;
  error_description?: string;
  err?: { message?: string };
  stack?: string;
}

// =============================================================================
// CLASSE DE ERRO PERSONALIZADA
// =============================================================================

/**
 * Classe de erro personalizada para erros de API com informações detalhadas
 * @class
 * @extends Error
 */
export class ApiError extends Error {
  public readonly fullName = 'ApiError';

  constructor(
    public status: number,
    message: string,
    public data?: ApiErrorData,
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
   */
  toString(): string {
    return `ApiError: ${this.status} - ${this.message} | URL: ${this.method} ${this.url} | Endpoint: ${this.endpoint} | Data: ${JSON.stringify(this.data)}`;
  }

  /**
   * Verifica se o erro é um erro de servidor (5xx)
   */
  isServerError(): boolean {
    return this.status >= 500;
  }

  /**
   * Verifica se o erro é um erro de cliente (4xx)
   */
  isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }
}

// =============================================================================
// CLIENTE HTTP PRINCIPAL
// =============================================================================

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
  private logger?: (message: string, data?: unknown) => void;
  
  /** Callback para monitoramento de requisições */
  private onRequest?: (
    metrics: RequestMetrics & {
      endpoint: string;
      method: string;
      status?: number;
    }
  ) => void;

  /**
   * Cria uma instância do ApiClient
   * @param options - Opções de configuração
   * @param options.logger - Função para logging personalizado
   * @param options.onRequest - Callback para monitoramento de requisições
   */
  constructor(options?: {
    logger?: (message: string, data?: unknown) => void;
    onRequest?: (
      metrics: RequestMetrics & {
        endpoint: string;
        method: string;
        status?: number;
      }
    ) => void;
  }) {
    this.validateConfiguration();
    this.baseUrl = API_CONFIG.BASE_URL || '';
    this.defaultHeaders = this.initializeDefaultHeaders();
    this.logger = options?.logger;
    this.onRequest = options?.onRequest;

    this.logDevelopmentInfo();
  }

  // ===========================================================================
  // MÉTODOS PÚBLICOS
  // ===========================================================================

  /**
   * Executa uma requisição GET
   * @param endpoint - Endpoint da API
   * @param options - Opções da requisição
   * @returns Promise com os dados da resposta
   */
  async get<T>(
    endpoint: string,
    options?: Omit<RequestOptions, 'body'>
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  /**
   * Executa uma requisição POST
   * @param endpoint - Endpoint da API
   * @param body - Corpo da requisição
   * @param options - Opções da requisição
   * @returns Promise com os dados da resposta
   */
  async post<T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestOptions, 'body'>
  ): Promise<T> {
    return this.requestWithBody<T>('POST', endpoint, body, options);
  }

  /**
   * Executa uma requisição PUT
   * @param endpoint - Endpoint da API
   * @param body - Corpo da requisição
   * @param options - Opções da requisição
   * @returns Promise com os dados da resposta
   */
  async put<T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestOptions, 'body'>
  ): Promise<T> {
    return this.requestWithBody<T>('PUT', endpoint, body, options);
  }

  /**
   * Executa uma requisição PATCH
   * @param endpoint - Endpoint da API
   * @param body - Corpo da requisição
   * @param options - Opções da requisição
   * @returns Promise com os dados da resposta
   */
  async patch<T>(
    endpoint: string,
    body?: unknown,
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
   * @param endpoint - Endpoint da API
   * @param options - Opções da requisição
   * @returns Promise com os dados da resposta
   */
  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  /**
   * Define o token de autenticação
   * @param token - Token JWT
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
    const headers = { ...this.defaultHeaders } as Record<string, string>;
    delete headers.Authorization;
    this.defaultHeaders = headers;
  }

  /**
   * Define um header personalizado
   * @param key - Chave do header
   * @param value - Valor do header
   */
  setHeader(key: string, value: string): void {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      [key]: value,
    };
  }

  /**
   * Remove um header personalizado
   * @param key - Chave do header a ser removido
   */
  removeHeader(key: string): void {
    const headers = { ...this.defaultHeaders } as Record<string, string>;
    delete headers[key];
    this.defaultHeaders = headers;
  }

  /**
   * Obtém os headers atuais (cópia)
   * @returns Headers atuais
   */
  getHeaders(): HeadersInit {
    return { ...this.defaultHeaders };
  }

  // ===========================================================================
  // MÉTODOS PRIVADOS - CONFIGURAÇÃO E INICIALIZAÇÃO
  // ===========================================================================

  /**
   * Valida a configuração necessária do cliente
   * @private
   */
  private validateConfiguration(): void {
    // Durante o build estático no servidor, a variável pode não estar disponível
    // Permitir que o build continue, mas falhar no cliente se necessário
    if (typeof window !== 'undefined' && !API_CONFIG.BASE_URL) {
      const errorMessage =
        'NEXT_PUBLIC_API_URL não está configurada. Verifique suas variáveis de ambiente.';
      console.error('[ApiClient]', errorMessage);

      // Falhar apenas no cliente se a URL base da API não estiver configurada
      throw new Error(errorMessage);
    }
  }

  /**
   * Inicializa os headers padrão
   * @private
   */
  private initializeDefaultHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (env.NEXT_PUBLIC_API_DB_PROVIDER) {
      headers['X-Database-Provider'] = env.NEXT_PUBLIC_API_DB_PROVIDER.toUpperCase();
    }

    return headers;
  }

  /**
   * Loga informações de desenvolvimento
   * @private
   */
  private logDevelopmentInfo(): void {
    if (isDevelopment && this.baseUrl) {
      console.log('[ApiClient] URL base da API:', this.baseUrl);
    }
  }

  // ===========================================================================
  // MÉTODOS PRIVADOS - UTILITÁRIOS
  // ===========================================================================

  /**
   * Loga mensagens se logger estiver configurado
   * @private
   */
  private log(message: string, data?: unknown): void {
    if (this.logger) {
      this.logger(message, data);
    }
  }

  /**
   * Constrói a URL completa com parâmetros de query
   * @private
   */
  private buildUrl(
    endpoint: string,
    params?: Record<string, QueryParamValue>
  ): string {
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
   * Prepara headers para requisições, tratando FormData adequadamente
   * @private
   */
  private prepareHeaders(customHeaders?: HeadersInit, isFormData = false): Headers {
    const headers = new Headers();

    // Adicionar headers padrão (exceto Content-Type se for FormData)
    Object.entries(this.defaultHeaders).forEach(([key, value]) => {
      if (!(isFormData && key.toLowerCase() === 'content-type')) {
        headers.set(key, value as string);
      }
    });

    // Adicionar headers customizados (exceto Content-Type se for FormData)
    if (customHeaders) {
      if (customHeaders instanceof Headers) {
        customHeaders.forEach((value, key) => {
          if (!(isFormData && key.toLowerCase() === 'content-type')) {
            headers.set(key, value);
          }
        });
      } else if (customHeaders instanceof Object) {
        Object.entries(customHeaders).forEach(([key, value]) => {
          if (!(isFormData && key.toLowerCase() === 'content-type')) {
            headers.set(key, value as string);
          }
        });
      }
    }

    return headers;
  }

  // ===========================================================================
  // MÉTODOS PRIVADOS - PROCESSAMENTO DE RESPOSTA E ERROS
  // ===========================================================================

  /**
   * Processa a resposta da API
   * @private
   */
  private async processResponse<T>(response: Response): Promise<T> {
    let data: unknown;
    const contentType = response.headers.get('content-type');

    try {
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
      data = await this.handleParseError(response);
    }

    return data as T;
  }

  /**
   * Trata erros de parse de resposta
   * @private
   */
  private async handleParseError(response: Response): Promise<unknown> {
    // Para erros 500, tentar ler como texto
    if (response.status >= 500) {
      try {
        const clonedResponse = response.clone();
        const text = await clonedResponse.text();
        
        // Tentar parsear como JSON
        try {
          return JSON.parse(text);
        } catch {
          return text;
        }
      } catch {
        console.error('[ApiClient] Erro ao ler resposta do servidor');
        return { error: 'Não foi possível ler a resposta do servidor' };
      }
    }
    
    return {};
  }

  /**
   * Extrai mensagem de erro dos dados de resposta
   * @private
   */
  private getErrorMessage(data: unknown, status: number): string {
    if (typeof data === 'string') return data;

    if (typeof data !== 'object' || data === null) {
      return `Request failed with status ${status}`;
    }

    const errorData = data as ErrorDataStructure;

    // Tenta extrair mensagem de erro de estruturas comuns
    const errorMessage = this.extractErrorMessage(errorData, status);

    return errorMessage || `Request failed with status ${status}`;
  }

  /**
   * Extrai mensagem de erro de estruturas comuns de erro
   * @private
   */
  private extractErrorMessage(errorData: ErrorDataStructure, status: number): string | undefined {
    // Tentar várias estruturas possíveis de erro
    let message = errorData?.message;

    if (!message && errorData?.error) {
      if (typeof errorData.error === 'string') {
        message = errorData.error;
      } else if (typeof errorData.error === 'object') {
        message = errorData.error.message;
      }
    }

    if (!message) {
      message = errorData?.detail || 
                errorData?.errorMessage || 
                errorData?.error_description ||
                (errorData?.err && typeof errorData.err === 'object' ? errorData.err.message : undefined);
    }

    // Último recurso: usar stack trace ou stringify os dados
    if (!message && errorData?.stack) {
      message = errorData.stack;
    }

    if (!message && errorData) {
      message = this.stringifyErrorData(errorData, status);
    }

    return message;
  }

  /**
   * Converte dados de erro para string com truncamento
   * @private
   */
  private stringifyErrorData(data: unknown, status: number): string {
    try {
      const dataString = JSON.stringify(data);
      if (dataString.length > 500) {
        return `Erro do servidor (${status}): ${dataString.substring(0, 500)}...`;
      }
      return `Erro do servidor (${status}): ${dataString}`;
    } catch {
      return `Request failed with status ${status}`;
    }
  }

  // ===========================================================================
  // MÉTODOS PRIVADOS - LÓGICA PRINCIPAL DE REQUISIÇÃO
  // ===========================================================================

  /**
   * Executa uma requisição HTTP
   * @private
   */
  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const {
      params,
      timeout = API_CONFIG.TIMEOUT,
      retries = 2,
      retryDelay = 2000,
      ...fetchOptions
    } = options;

    const requestId = this.generateRequestId();
    const url = this.buildUrl(endpoint, params);
    const metrics: RequestMetrics = { startTime: Date.now() };

    try {
      this.logRequestStart(requestId, endpoint, url, options);
      const response = await this.executeFetch(requestId, url, fetchOptions, timeout);
      
      metrics.endTime = Date.now();
      metrics.duration = metrics.endTime - metrics.startTime;

      const data = await this.processResponse<T>(response);
      this.logRequestSuccess(requestId, endpoint, response, metrics);

      this.reportMetrics(metrics, endpoint, fetchOptions.method || 'GET', response.status);

      if (!response.ok) {
        throw this.createApiError(response, data, url, fetchOptions.method, endpoint);
      }

      return data;
    } catch (error) {
      metrics.endTime = Date.now();
      metrics.duration = metrics.endTime - metrics.startTime;

      const processedError = this.processRequestError(
        error, 
        requestId, 
        endpoint, 
        url, 
        fetchOptions.method, 
        metrics
      );

      this.reportMetrics(
        metrics, 
        endpoint, 
        fetchOptions.method || 'GET', 
        processedError instanceof ApiError ? processedError.status : 0
      );

      throw processedError;
    }
  }

  /**
   * Executa requisições com corpo (POST, PUT) tratando FormData adequadamente
   * @private
   */
  private async requestWithBody<T>(
    method: string,
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestOptions, 'body'>
  ): Promise<T> {
    const isFormData = body instanceof FormData;
    
    if (isFormData) {
      const headers = this.prepareHeaders(options?.headers, true);
      return this.request<T>(endpoint, {
        ...options,
        method,
        body,
        headers,
      });
    }

    return this.request<T>(endpoint, {
      ...options,
      method,
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  // ===========================================================================
  // MÉTODOS PRIVADOS - EXECUÇÃO E LOGGING
  // ===========================================================================

  /**
   * Gera ID único para a requisição
   * @private
   */
  private generateRequestId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  /**
   * Loga início da requisição
   * @private
   */
  private logRequestStart(
    requestId: string, 
    endpoint: string, 
    url: string, 
    options: RequestOptions
  ): void {
    this.log(
      `[${requestId}] Iniciando requisição: ${options.method || 'GET'} ${endpoint}`,
      { url, params: options.params, headers: options.headers }
    );

    if (process.env.NODE_ENV === 'development') {
      console.log(`[${requestId}] URL da requisição:`, url);
    }
  }

  /**
   * Loga sucesso da requisição
   * @private
   */
  private logRequestSuccess(
    requestId: string,
    endpoint: string,
    response: Response,
    metrics: RequestMetrics
  ): void {
    this.log(`Resposta recebida: ${response.status} ${endpoint}`, {
      status: response.status,
      duration: metrics.duration,
    });
  }

  /**
   * Executa o fetch com timeout e tratamento de console
   * @private
   */
  private async executeFetch(
    requestId: string,
    url: string,
    fetchOptions: RequestInit,
    timeout: number
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort('Request timeout'), timeout);

    const { restoreConsole, suppressConnectionErrors } = this.setupConsoleInterception();

    try {
      const isFormData = fetchOptions.body instanceof FormData;
      const headers = this.prepareHeaders(fetchOptions.headers, isFormData);

      const response = await fetch(url, {
        ...fetchOptions,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      restoreConsole();
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      restoreConsole();
      suppressConnectionErrors(error);
      throw error;
    }
  }

  /**
   * Configura interceptação do console para suprimir erros de conexão
   * @private
   */
  private setupConsoleInterception() {
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;

    if (process.env.NODE_ENV === 'development') {
      console.error = this.createConsoleInterceptor(originalConsoleError, 'error');
      console.warn = this.createConsoleInterceptor(originalConsoleWarn, 'warn');
    }

    const restoreConsole = () => {
      if (process.env.NODE_ENV === 'development') {
        console.error = originalConsoleError;
        console.warn = originalConsoleWarn;
      }
    };

    const suppressConnectionErrors = (error: unknown) => {
      if (this.isConnectionError(error) && process.env.NODE_ENV === 'development') {
        // Erros de conexão são suprimidos silenciosamente em desenvolvimento
        return;
      }
      
      if (process.env.NODE_ENV === 'development') {
        originalConsoleError(`Erro no fetch:`, error);
      }
    };

    return { restoreConsole, suppressConnectionErrors };
  }

  /**
   * Cria interceptor para console que suprime erros de conexão
   * @private
   */
  private createConsoleInterceptor(originalMethod: (...args: unknown[]) => void, type: 'error' | 'warn') {
    return (...args: unknown[]) => {
      const message = String(args[0] || '');
      const isConnectionError = this.isConnectionMessage(message);
      
      if (!isConnectionError) {
        originalMethod.apply(console, args);
      }
    };
  }

  /**
   * Verifica se a mensagem indica erro de conexão
   * @private
   */
  private isConnectionMessage(message: string): boolean {
    return message.includes('ERR_CONNECTION_REFUSED') ||
           message.includes('Failed to fetch') ||
           message.includes('net::ERR_CONNECTION_REFUSED');
  }

  /**
   * Verifica se o erro é de conexão
   * @private
   */
  private isConnectionError(error: unknown): boolean {
    return error instanceof TypeError && 
           (error.message.includes('Failed to fetch') || 
            error.message.includes('ERR_CONNECTION_REFUSED') ||
            error.message.includes('NetworkError'));
  }

  // ===========================================================================
  // MÉTODOS PRIVADOS - TRATAMENTO DE ERROS
  // ===========================================================================

  /**
   * Processa erros da requisição
   * @private
   */
  private processRequestError(
    error: unknown,
    requestId: string,
    endpoint: string,
    url: string,
    method?: string,
    metrics?: RequestMetrics
  ): Error {
    // Se já é ApiError, apenas propague
    if (error instanceof ApiError) {
      return error;
    }

    // Tratamento de timeout
    if (error instanceof Error && error.name === 'AbortError') {
      return new ApiError(
        HTTP_STATUS.SERVICE_UNAVAILABLE,
        ERROR_MESSAGES.TIMEOUT_ERROR,
        { originalError: error.message },
        url,
        method || 'GET',
        endpoint
      );
    }

    // Tratamento de erro de rede
    const isConnectionError = this.isConnectionError(error);
    
    if (!isConnectionError || process.env.NODE_ENV !== 'development') {
      this.logRequestError(requestId, endpoint, error, url, method, metrics);
    }

    return new ApiError(
      0,
      ERROR_MESSAGES.NETWORK_ERROR,
      { originalError: error instanceof Error ? error.message : error },
      url,
      method || 'GET',
      endpoint
    );
  }

  /**
   * Loga erro da requisição
   * @private
   */
  private logRequestError(
    requestId: string,
    endpoint: string,
    error: unknown,
    url: string,
    method?: string,
    metrics?: RequestMetrics
  ): void {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    
    if (process.env.NODE_ENV === 'development') {
      const errorDetails = this.buildErrorDetails(error, endpoint, url, method, metrics);
      console.error(`[${requestId}] Erro na requisição:`, errorDetails);
    }

    this.log(`[${requestId}] Erro na requisição: ${endpoint}`, {
      error: errorMessage,
      duration: metrics?.duration,
      url,
      method,
    });
  }

  /**
   * Constrói detalhes do erro para logging
   * @private
   */
  private buildErrorDetails(
    error: unknown,
    endpoint: string,
    url: string,
    method?: string,
    metrics?: RequestMetrics
  ) {
    const errorDetails: any = {
      endpoint,
      url,
      method: method || 'GET',
      duration: metrics?.duration,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      errorType: error?.constructor?.name || 'Unknown',
    };

    if (error instanceof ApiError) {
      errorDetails.status = error.status;
      errorDetails.responseData = error.data;
    }

    if (error instanceof Error) {
      if (error.stack) {
        errorDetails.stack = error.stack;
      }
      if (error.name === 'AbortError' || error.message.includes('aborted')) {
        errorDetails.isAbortError = true;
      }
    }

    // Add debug info for unknown errors
    if (!error) {
      errorDetails.debug = 'Error object is null or undefined';
    } else if (typeof error !== 'object') {
      errorDetails.debug = `Error is not an object: ${typeof error}`;
    }

    return errorDetails;
  }

  /**
   * Cria ApiError a partir da resposta
   * @private
   */
  private createApiError(
    response: Response,
    data: unknown,
    url: string,
    method?: string,
    endpoint?: string
  ): ApiError {
    const errorMessage = this.getErrorMessage(data, response.status);

    if (process.env.NODE_ENV === 'development' && response.status >= 500) {
      console.error('[ApiClient] Erro do servidor:', {
        status: response.status,
        endpoint,
        url,
        method: method || 'GET',
        responseData: data,
        errorMessage,
      });
    }

    return new ApiError(
      response.status,
      errorMessage,
      data,
      url,
      method || 'GET',
      endpoint
    );
  }

  /**
   * Reporta métricas da requisição
   * @private
   */
  private reportMetrics(
    metrics: RequestMetrics,
    endpoint: string,
    method: string,
    status?: number
  ): void {
    if (this.onRequest) {
      this.onRequest({
        ...metrics,
        endpoint,
        method,
        status,
      });
    }

    // Log de requisições lentas
    if (metrics.duration && metrics.duration > 5000) {
      console.warn(
        `[API Slow Request] ${method} ${endpoint} took ${metrics.duration}ms`
      );
    }
  }
}

// =============================================================================
// INSTÂNCIA SINGLETON E EXPORTAÇÕES
// =============================================================================

/**
 * Instância singleton do cliente API pré-configurada (lazy initialization)
 */
let apiInstance: ApiClient | null = null;

export const api = new Proxy({} as ApiClient, {
  get(target, prop) {
    if (!apiInstance) {
      apiInstance = new ApiClient({
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
        }
      });
    }
    return apiInstance[prop as keyof ApiClient];
  }
});

export default api;
export { ApiClient };