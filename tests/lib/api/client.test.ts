/**
 * @fileoverview Testes unitários para a classe ApiClient
 * @description Cobre funcionalidades principais, tratamento de erros, 
 * headers, autenticação e métricas
 */

import { ApiClient, ApiError } from './ApiClient';
import { API_CONFIG, ERROR_MESSAGES, HTTP_STATUS } from './config';

// Mock das dependências
jest.mock('./config', () => ({
  API_CONFIG: {
    BASE_URL: 'https://api.example.com',
    TIMEOUT: 5000,
  },
  ERROR_MESSAGES: {
    NETWORK_ERROR: 'Erro de rede',
    TIMEOUT_ERROR: 'Timeout na requisição',
  },
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
  },
}));

// Mock do fetch global
global.fetch = jest.fn();
global.URL = window.URL;

// Mock do AbortController
global.AbortController = jest.fn().mockImplementation(() => ({
  abort: jest.fn(),
  signal: 'test-signal',
}));

// Mock do setTimeout e clearTimeout
jest.useFakeTimers();

describe('ApiClient', () => {
  let apiClient: ApiClient;
  let mockLogger: jest.Mock;
  let mockOnRequest: jest.Mock;

  beforeEach(() => {
    mockLogger = jest.fn();
    mockOnRequest = jest.fn();
    apiClient = new ApiClient({
      logger: mockLogger,
      onRequest: mockOnRequest,
    });

    (fetch as jest.Mock).mockClear();
    (AbortController as jest.Mock).mockClear();
    mockLogger.mockClear();
    mockOnRequest.mockClear();
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // =========================================================================
  // TESTES DE CONFIGURAÇÃO E INICIALIZAÇÃO
  // =========================================================================

  describe('Inicialização', () => {
    test('deve criar instância com configurações padrão', () => {
      const client = new ApiClient();
      expect(client).toBeInstanceOf(ApiClient);
    });

    test('deve criar instância com logger e onRequest', () => {
      expect(apiClient).toBeInstanceOf(ApiClient);
    });

    test('deve lançar erro em desenvolvimento sem URL base', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      // Mock para simular falta de URL base
      jest.doMock('./config', () => ({
        API_CONFIG: { BASE_URL: '', TIMEOUT: 5000 },
        ERROR_MESSAGES: {},
        HTTP_STATUS: {},
      }));

      expect(() => new ApiClient()).toThrow();
      
      process.env.NODE_ENV = originalEnv;
    });

    test('deve logar URL base em desenvolvimento', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      new ApiClient();
      expect(consoleSpy).toHaveBeenCalledWith(
        '[ApiClient] URL base da API:',
        'https://api.example.com'
      );

      process.env.NODE_ENV = originalEnv;
      consoleSpy.mockRestore();
    });
  });

  // =========================================================================
  // TESTES DE MÉTODOS HTTP BÁSICOS
  // =========================================================================

  describe('Métodos HTTP', () => {
    const mockResponse = { data: 'test' };
    const endpoint = '/test';

    beforeEach(() => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: () => Promise.resolve(mockResponse),
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      });
    });

    test('GET deve fazer requisição corretamente', async () => {
      const result = await apiClient.get(endpoint);

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/test',
        expect.objectContaining({
          method: 'GET',
          headers: expect.any(Headers),
          signal: 'test-signal',
        })
      );
      expect(result).toEqual(mockResponse);
    });

    test('POST deve fazer requisição com body JSON', async () => {
      const body = { name: 'test' };
      const result = await apiClient.post(endpoint, body);

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/test',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(body),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    test('POST deve fazer requisição com FormData', async () => {
      const formData = new FormData();
      formData.append('file', new Blob(['test']));
      
      await apiClient.post(endpoint, formData);

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/test',
        expect.objectContaining({
          method: 'POST',
          body: formData,
        })
      );
    });

    test('PUT deve fazer requisição com body', async () => {
      const body = { id: 1, name: 'update' };
      const result = await apiClient.put(endpoint, body);

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/test',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(body),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    test('PATCH deve fazer requisição corretamente', async () => {
      const body = { name: 'partial-update' };
      const result = await apiClient.patch(endpoint, body);

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/test',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify(body),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    test('DELETE deve fazer requisição corretamente', async () => {
      const result = await apiClient.delete(endpoint);

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/test',
        expect.objectContaining({
          method: 'DELETE',
        })
      );
      expect(result).toEqual(mockResponse);
    });

    test('deve adicionar parâmetros de query na URL', async () => {
      const params = { page: 1, limit: 10, search: 'test' };
      
      await apiClient.get(endpoint, { params });

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/test?page=1&limit=10&search=test',
        expect.any(Object)
      );
    });

    test('deve usar timeout customizado', async () => {
      await apiClient.get(endpoint, { timeout: 10000 });

      expect(AbortController).toHaveBeenCalled();
    });
  });

  // =========================================================================
  // TESTES DE TRATAMENTO DE ERROS
  // =========================================================================

  describe('Tratamento de Erros', () => {
    const endpoint = '/test';

    test('deve lançar ApiError para respostas não-ok', async () => {
      const errorData = { message: 'Erro interno' };
      
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: () => Promise.resolve(errorData),
        text: () => Promise.resolve(JSON.stringify(errorData)),
      });

      await expect(apiClient.get(endpoint)).rejects.toThrow(ApiError);
      
      try {
        await apiClient.get(endpoint);
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).status).toBe(500);
        expect((error as ApiError).data).toEqual(errorData);
        expect((error as ApiError).isServerError()).toBe(true);
      }
    });

    test('deve lançar ApiError para timeout', async () => {
      (fetch as jest.Mock).mockImplementation(
        () => new Promise((_, reject) => {
          setTimeout(() => reject(new Error('AbortError')), 100);
        })
      );

      const promise = apiClient.get(endpoint, { timeout: 50 });
      jest.advanceTimersByTime(100);

      await expect(promise).rejects.toThrow(ApiError);
      
      try {
        await promise;
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).status).toBe(503);
        expect((error as ApiError).message).toBe(ERROR_MESSAGES.TIMEOUT_ERROR);
      }
    });

    test('deve lançar ApiError para erro de rede', async () => {
      const networkError = new TypeError('Failed to fetch');
      (fetch as jest.Mock).mockRejectedValue(networkError);

      await expect(apiClient.get(endpoint)).rejects.toThrow(ApiError);
      
      try {
        await apiClient.get(endpoint);
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).status).toBe(0);
        expect((error as ApiError).message).toBe(ERROR_MESSAGES.NETWORK_ERROR);
      }
    });

    test('deve processar erros com diferentes estruturas', async () => {
      const errorResponses = [
        { message: 'Mensagem de erro direta' },
        { error: 'Mensagem em campo error' },
        { error: { message: 'Mensagem em error.message' } },
        { detail: 'Detalhe do erro' },
        { errorMessage: 'Campo errorMessage' },
      ];

      for (const errorData of errorResponses) {
        (fetch as jest.Mock).mockResolvedValue({
          ok: false,
          status: 400,
          headers: new Headers({ 'content-type': 'application/json' }),
          json: () => Promise.resolve(errorData),
        });

        try {
          await apiClient.get(endpoint);
        } catch (error) {
          expect(error).toBeInstanceOf(ApiError);
          // Verifica que alguma mensagem foi extraída
          expect((error as ApiError).message).toBeTruthy();
        }
      }
    });

    test('deve lidar com respostas não-JSON', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        headers: new Headers({ 'content-type': 'text/plain' }),
        text: () => Promise.resolve('Erro interno do servidor'),
      });

      await expect(apiClient.get(endpoint)).rejects.toThrow(ApiError);
    });
  });

  // =========================================================================
  // TESTES DE HEADERS E AUTENTICAÇÃO
  // =========================================================================

  describe('Headers e Autenticação', () => {
    test('deve adicionar token de autenticação', () => {
      const token = 'test-token-123';
      apiClient.setAuthToken(token);

      // Verifica se o header Authorization foi adicionado
      const headers = apiClient.getHeaders();
      expect(headers).toHaveProperty('Authorization', `Bearer ${token}`);
    });

    test('deve remover token de autenticação', () => {
      apiClient.setAuthToken('test-token');
      apiClient.clearAuthToken();

      const headers = apiClient.getHeaders();
      expect(headers).not.toHaveProperty('Authorization');
    });

    test('deve adicionar header personalizado', () => {
      apiClient.setHeader('X-Custom-Header', 'custom-value');

      const headers = apiClient.getHeaders();
      expect(headers).toHaveProperty('X-Custom-Header', 'custom-value');
    });

    test('deve remover header personalizado', () => {
      apiClient.setHeader('X-Custom-Header', 'custom-value');
      apiClient.removeHeader('X-Custom-Header');

      const headers = apiClient.getHeaders();
      expect(headers).not.toHaveProperty('X-Custom-Header');
    });

    test('deve manter headers padrão ao modificar headers personalizados', () => {
      const originalHeaders = apiClient.getHeaders();
      
      apiClient.setHeader('X-Test', 'value');
      apiClient.removeHeader('X-Test');

      const finalHeaders = apiClient.getHeaders();
      expect(finalHeaders).toEqual(originalHeaders);
    });

    test('deve remover Content-Type para FormData', async () => {
      const formData = new FormData();
      formData.append('file', new Blob(['test']));

      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers(),
        json: () => Promise.resolve({}),
      });

      await apiClient.post('/upload', formData);

      const fetchCall = (fetch as jest.Mock).mock.calls[0][1];
      const headers = fetchCall.headers;

      // Verifica que Content-Type não foi definido para FormData
      expect(headers.get('Content-Type')).toBeNull();
    });
  });

  // =========================================================================
  // TESTES DE MÉTRICAS E LOGGING
  // =========================================================================

  describe('Métricas e Logging', () => {
    const endpoint = '/test';
    const mockResponse = { data: 'test' };

    beforeEach(() => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: () => Promise.resolve(mockResponse),
      });
    });

    test('deve chamar logger para requisições bem-sucedidas', async () => {
      await apiClient.get(endpoint);

      expect(mockLogger).toHaveBeenCalledWith(
        expect.stringContaining('Iniciando requisição'),
        expect.any(Object)
      );

      expect(mockLogger).toHaveBeenCalledWith(
        expect.stringContaining('Resposta recebida'),
        expect.objectContaining({
          status: 200,
          duration: expect.any(Number),
        })
      );
    });

    test('deve chamar onRequest com métricas', async () => {
      await apiClient.get(endpoint);

      expect(mockOnRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          endpoint: '/test',
          method: 'GET',
          status: 200,
          duration: expect.any(Number),
          startTime: expect.any(Number),
          endTime: expect.any(Number),
        })
      );
    });

    test('deve reportar métricas para requisições com erro', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: () => Promise.resolve({ error: 'Server error' }),
      });

      try {
        await apiClient.get(endpoint);
      } catch (error) {
        // Ignora o erro, queremos testar as métricas
      }

      expect(mockOnRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          endpoint: '/test',
          method: 'GET',
          status: 500,
          duration: expect.any(Number),
        })
      );
    });

    test('deve logar erros detalhadamente em desenvolvimento', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const consoleSpy = jest.spyOn(console, 'error');
      (fetch as jest.Mock).mockRejectedValue(new Error('Test error'));

      try {
        await apiClient.get(endpoint);
      } catch (error) {
        // Esperado
      }

      expect(consoleSpy).toHaveBeenCalled();
      
      process.env.NODE_ENV = originalEnv;
      consoleSpy.mockRestore();
    });
  });

  // =========================================================================
  // TESTES DE PROCESSAMENTO DE RESPOSTA
  // =========================================================================

  describe('Processamento de Resposta', () => {
    test('deve processar resposta JSON corretamente', async () => {
      const jsonData = { user: { id: 1, name: 'Test' } };
      
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: () => Promise.resolve(jsonData),
      });

      const result = await apiClient.get('/test');
      expect(result).toEqual(jsonData);
    });

    test('deve processar resposta de texto corretamente', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'text/plain' }),
        text: () => Promise.resolve('text response'),
      });

      const result = await apiClient.get('/test');
      expect(result).toBe('text response');
    });

    test('deve processar resposta 204 sem conteúdo', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        status: 204,
        headers: new Headers(),
      });

      const result = await apiClient.get('/test');
      expect(result).toEqual({});
    });

    test('deve lidar com erro de parse JSON', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: () => Promise.reject(new Error('JSON parse error')),
        text: () => Promise.resolve('invalid json'),
      });

      const result = await apiClient.get('/test');
      expect(result).toEqual({});
    });
  });

  // =========================================================================
  // TESTES DE ApiError
  // =========================================================================

  describe('ApiError', () => {
    test('deve criar instância com todas as propriedades', () => {
      const error = new ApiError(
        404,
        'Not found',
        { detail: 'Resource not found' },
        'https://api.example.com/test',
        'GET',
        '/test'
      );

      expect(error.status).toBe(404);
      expect(error.message).toBe('Not found');
      expect(error.data).toEqual({ detail: 'Resource not found' });
      expect(error.url).toBe('https://api.example.com/test');
      expect(error.method).toBe('GET');
      expect(error.endpoint).toBe('/test');
      expect(error.name).toBe('ApiError');
      expect(error.fullName).toBe('ApiError');
    });

    test('deve identificar erro de servidor', () => {
      const serverError = new ApiError(500, 'Server error');
      const clientError = new ApiError(400, 'Client error');

      expect(serverError.isServerError()).toBe(true);
      expect(clientError.isServerError()).toBe(false);
    });

    test('deve identificar erro de cliente', () => {
      const serverError = new ApiError(500, 'Server error');
      const clientError = new ApiError(400, 'Client error');

      expect(clientError.isClientError()).toBe(true);
      expect(serverError.isClientError()).toBe(false);
    });

    test('deve retornar string representativa', () => {
      const error = new ApiError(
        400,
        'Bad request',
        { field: 'name' },
        'https://api.example.com/users',
        'POST',
        '/users'
      );

      const errorString = error.toString();
      expect(errorString).toContain('ApiError: 400 - Bad request');
      expect(errorString).toContain('URL: POST https://api.example.com/users');
      expect(errorString).toContain('Endpoint: /users');
    });
  });

  // =========================================================================
  // TESTES DE CASOS ESPECIAIS
  // =========================================================================

  describe('Casos Especiais', () => {
    test('deve construir URL corretamente com endpoint sem barra', async () => {
      await apiClient.get('test');

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/test',
        expect.any(Object)
      );
    });

    test('deve construir URL corretamente com endpoint com barra', async () => {
      await apiClient.get('/test');

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/test',
        expect.any(Object)
      );
    });

    test('deve ignorar parâmetros nulos ou undefined', async () => {
      const params = {
        valid: 'value',
        nullValue: null,
        undefinedValue: undefined,
        empty: '',
      };

      await apiClient.get('/test', { params });

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/test?valid=value&empty=',
        expect.any(Object)
      );
    });

    test('deve suprimir erros de conexão em desenvolvimento', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const consoleErrorSpy = jest.spyOn(console, 'error');
      const connectionError = new TypeError('Failed to fetch');
      (fetch as jest.Mock).mockRejectedValue(connectionError);

      try {
        await apiClient.get('/test');
      } catch (error) {
        // Erro é esperado, mas console.error não deve ser chamado para erros de conexão
      }

      // Em desenvolvimento, erros de conexão são suprimidos
      expect(consoleErrorSpy).not.toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          error: 'Failed to fetch',
        })
      );

      process.env.NODE_ENV = originalEnv;
      consoleErrorSpy.mockRestore();
    });
  });
});

// Testes para a instância singleton exportada
describe('api (singleton)', () => {
  test('deve exportar instância singleton pré-configurada', async () => {
    const { api } = await import('./ApiClient');
    
    expect(api).toBeInstanceOf(ApiClient);
    expect(api.get).toBeInstanceOf(Function);
    expect(api.post).toBeInstanceOf(Function);
  });

  test('deve ter logger configurado para desenvolvimento', async () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const consoleSpy = jest.spyOn(console, 'log');
    
    // Importa o módulo para executar o código de inicialização
    await import('./ApiClient');

    expect(consoleSpy).toHaveBeenCalled();

    process.env.NODE_ENV = originalEnv;
    consoleSpy.mockRestore();
  });
});