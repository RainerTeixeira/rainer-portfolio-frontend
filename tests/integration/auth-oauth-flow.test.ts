/**
 * OAuth Flow Integration Tests
 *
 * Testes de integração para o fluxo completo de autenticação OAuth.
 * Valida a integração entre frontend e backend para Google OAuth.
 *
 * @module tests/integration/auth-oauth-flow
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import { authService } from '@/lib/api/services/auth.service';
import { api } from '@/lib/api/client';

// ============================================================================
// Mocks
// ============================================================================

// Mock global fetch
global.fetch = jest.fn();

// Usar a window.location padrão do jsdom e apenas inspecionar/alterar href
const originalLocation = window.location;
const mockLocation = window.location;

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Helper para criar token JWT mock
 */
function createMockToken(payload: any): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64');
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64');
  const signature = 'mock-signature';

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Helper para criar resposta de sucesso do backend
 */
function createSuccessResponse(data: any) {
  return {
    success: true,
    data,
    message: 'Success',
  };
}

/**
 * Helper para criar resposta de erro do backend
 */
function createErrorResponse(message: string, status: number = 400) {
  return {
    success: false,
    message,
    status,
  };
}

// ============================================================================
// Tests
// ============================================================================

describe('OAuth Flow Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    window.location.href = originalLocation.href;
    (window as any).__testLocationHref = 'http://localhost/';
    process.env.NEXT_PUBLIC_API_URL = 'http://localhost:4000';
    process.env.NEXT_PUBLIC_COGNITO_DOMAIN = 'test-domain.auth.us-east-1.amazoncognito.com';
    process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID = 'test-client-id';
    process.env.NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN =
      'http://localhost:3000/dashboard/login/callback';
  });

  // ========================================================================== 
  // Inicialização OAuth
  // ==========================================================================

  describe('Inicialização OAuth', () => {
    it('deve iniciar login com Google e redirecionar para backend', () => {
      authService.loginWithGoogle();

      const testHref =
        (window as any).__testLocationHref || window.location.href;

      expect(testHref).toContain('/auth/oauth/google');
      expect(testHref).toContain('redirect_uri=');
      expect(testHref).toContain(
        encodeURIComponent('/dashboard/login/callback')
      );
    });

    it('deve usar URL do backend correto', () => {
      process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com';

      authService.loginWithGoogle();

      const testHref =
        (window as any).__testLocationHref || window.location.href;

      expect(testHref).toContain('https://api.example.com');
    });

    it('deve usar callback URL correto', () => {
      authService.loginWithGoogle();

      const expectedCallback = encodeURIComponent(
        process.env.NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN ||
          `${window.location.origin}/dashboard/login/callback`
      );

      const testHref =
        (window as any).__testLocationHref || window.location.href;

      expect(testHref).toContain(expectedCallback);
    });
  });

  // ==========================================================================
  // Troca de Código por Tokens (Via Backend)
  // ==========================================================================

  describe('Troca de Código por Tokens (Via Backend)', () => {
    it('deve trocar código OAuth por tokens via backend (Google)', async () => {
      const mockTokens = {
        accessToken: createMockToken({ sub: 'user-123', email: 'test@example.com' }),
        refreshToken: 'mock-refresh-token',
        idToken: 'mock-id-token',
        expiresIn: 3600,
        tokenType: 'Bearer',
      };

      const mockUser = {
        id: 'user-123',
        cognitoSub: 'user-123',
        fullName: 'Test User',
        email: 'test@example.com',
        role: 'SUBSCRIBER',
        isActive: true,
        isBanned: false,
        postsCount: 0,
        commentsCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const postSpy = jest.spyOn(api, 'post').mockResolvedValueOnce(
        createSuccessResponse({
          tokens: mockTokens,
          user: mockUser,
        }) as any
      );

      const tokens = await authService.exchangeOAuthCodeViaBackend(
        'google',
        'test-code-123'
      );

      expect(postSpy).toHaveBeenCalledWith(
        expect.stringContaining('/auth/oauth/google/callback'),
        expect.objectContaining({
          code: 'test-code-123',
        }),
        expect.any(Object)
      );

      expect(tokens.accessToken).toBe(mockTokens.accessToken);
      expect(tokens.refreshToken).toBe(mockTokens.refreshToken);
    });

    // Testes específicos de troca de código para GitHub foram removidos.

    it('deve incluir state e redirectUri na requisição', async () => {
      const mockTokens = {
        accessToken: createMockToken({ sub: 'user-123' }),
        refreshToken: 'mock-refresh-token',
        idToken: 'mock-id-token',
        expiresIn: 3600,
        tokenType: 'Bearer',
      };

      const mockUser = {
        id: 'user-123',
        cognitoSub: 'user-123',
        fullName: 'Test User',
        role: 'SUBSCRIBER',
        isActive: true,
        isBanned: false,
        postsCount: 0,
        commentsCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const postSpy = jest.spyOn(api, 'post').mockResolvedValueOnce(
        createSuccessResponse({
          tokens: mockTokens,
          user: mockUser,
        }) as any
      );

      await authService.exchangeOAuthCodeViaBackend(
        'google',
        'test-code-123',
        'mock-state-abc'
      );

      expect(postSpy).toHaveBeenCalledWith(
        expect.stringContaining('/auth/oauth/google/callback'),
        expect.objectContaining({
          code: 'test-code-123',
          state: 'mock-state-abc',
        }),
        expect.any(Object)
      );
    });

    it('deve salvar tokens no localStorage após troca', async () => {
      const mockTokens = {
        accessToken: createMockToken({ sub: 'user-123' }),
        refreshToken: 'mock-refresh-token',
        idToken: 'mock-id-token',
        expiresIn: 3600,
        tokenType: 'Bearer',
      };

      const mockUser = {
        id: 'user-123',
        cognitoSub: 'user-123',
        fullName: 'Test User',
        role: 'SUBSCRIBER',
        isActive: true,
        isBanned: false,
        postsCount: 0,
        commentsCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      jest.spyOn(api, 'post').mockResolvedValueOnce(
        createSuccessResponse({
          tokens: mockTokens,
          user: mockUser,
        }) as any
      );

      await authService.exchangeOAuthCodeViaBackend('google', 'test-code-123');

      expect(localStorageMock.getItem('accessToken')).toBe(mockTokens.accessToken);
      expect(localStorageMock.getItem('refreshToken')).toBe(mockTokens.refreshToken);
      expect(localStorageMock.getItem('idToken')).toBe(mockTokens.idToken);
    });
  });

  // ==========================================================================
  // Tratamento de Erros
  // ==========================================================================

  describe('Tratamento de Erros', () => {
    it('deve lançar erro quando backend retorna falha', async () => {
      jest.spyOn(api, 'post').mockResolvedValueOnce(
        createErrorResponse('Código OAuth inválido', 400) as any
      );

      await expect(
        authService.exchangeOAuthCodeViaBackend('google', 'invalid-code')
      ).rejects.toThrow('Código OAuth inválido');
    });

    it('deve lançar erro quando requisição falha', async () => {
      jest
        .spyOn(api, 'post')
        .mockRejectedValueOnce(new Error('Network error'));

      await expect(
        authService.exchangeOAuthCodeViaBackend('google', 'test-code-123')
      ).rejects.toThrow('Network error');
    });

    it('deve lançar erro quando resposta não é JSON válido', async () => {
      jest
        .spyOn(api, 'post')
        .mockResolvedValueOnce({} as any);

      await expect(
        authService.exchangeOAuthCodeViaBackend('google', 'test-code-123')
      ).rejects.toThrow();
    });

    it('não deve salvar tokens quando troca falha', async () => {
      jest
        .spyOn(api, 'post')
        .mockResolvedValueOnce(
          createErrorResponse('Código OAuth inválido', 400) as any
        );

      try {
        await authService.exchangeOAuthCodeViaBackend('google', 'invalid-code');
      } catch (error) {
        // Expected error
      }

      expect(localStorageMock.getItem('accessToken')).toBeNull();
      expect(localStorageMock.getItem('refreshToken')).toBeNull();
    });
  });

  // ==========================================================================
  // Fluxo Completo
  // ==========================================================================

  describe('Fluxo Completo', () => {
    it('deve completar fluxo OAuth com sucesso (Google)', async () => {
      const mockTokens = {
        accessToken: createMockToken({
          sub: 'user-123',
          email: 'test@example.com',
          nickname: 'testuser',
          exp: Math.floor(Date.now() / 1000) + 3600,
        }),
        refreshToken: 'mock-refresh-token',
        idToken: 'mock-id-token',
        expiresIn: 3600,
        tokenType: 'Bearer',
      };

      const mockUser = {
        id: 'user-123',
        cognitoSub: 'user-123',
        fullName: 'Test User',
        email: 'test@example.com',
        role: 'SUBSCRIBER',
        isActive: true,
        isBanned: false,
        postsCount: 0,
        commentsCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Passo 1: Iniciar OAuth
      authService.loginWithGoogle();
      const testHrefGoogle =
        (window as any).__testLocationHref || window.location.href;

      expect(testHrefGoogle).toContain('/auth/oauth/google');

      // Passo 2: Simular callback com código
      jest.spyOn(api, 'post').mockResolvedValueOnce(
        createSuccessResponse({
          tokens: mockTokens,
          user: mockUser,
        }) as any
      );

      const tokens = await authService.exchangeOAuthCodeViaBackend(
        'google',
        'callback-code-123'
      );

      // Passo 3: Verificar tokens salvos
      expect(tokens.accessToken).toBeTruthy();
      expect(localStorageMock.getItem('accessToken')).toBe(
        mockTokens.accessToken
      );

      // Passo 4: Verificar autenticação
      expect(authService.isAuthenticated()).toBe(true);
    });

    // Fluxo completo GitHub foi removido, pois o login social atual usa apenas Google.
  });

  // ==========================================================================
  // Persistência de Sessão
  // ==========================================================================

  describe('Persistência de Sessão', () => {
    it('deve manter sessão após reload com tokens válidos', async () => {
      const mockTokens = {
        accessToken: createMockToken({
          sub: 'user-123',
          exp: Math.floor(Date.now() / 1000) + 3600, // Expira em 1 hora
        }),
        refreshToken: 'mock-refresh-token',
        idToken: 'mock-id-token',
        expiresIn: 3600,
        tokenType: 'Bearer',
      };

      authService.setTokens(mockTokens);

      // Simular reload (tokens persistem no localStorage)
      expect(authService.isAuthenticated()).toBe(true);
      expect(authService.getAccessToken()).toBe(mockTokens.accessToken);
    });

    it('deve considerar não autenticado com token expirado', () => {
      const expiredToken = createMockToken({
        sub: 'user-123',
        exp: Math.floor(Date.now() / 1000) - 3600, // Expirou há 1 hora
      });

      authService.setTokens({
        accessToken: expiredToken,
        refreshToken: 'mock-refresh-token',
        idToken: 'mock-id-token',
        expiresIn: 3600,
        tokenType: 'Bearer',
      });

      expect(authService.isAuthenticated()).toBe(false);
    });
  });

  // ==========================================================================
  // Logout
  // ==========================================================================

  describe('Logout', () => {
    it('deve limpar tokens ao fazer logout', () => {
      const mockTokens = {
        accessToken: createMockToken({
          sub: 'user-123',
          exp: Math.floor(Date.now() / 1000) + 3600,
        }),
        refreshToken: 'mock-refresh-token',
        idToken: 'mock-id-token',
        expiresIn: 3600,
        tokenType: 'Bearer',
      };

      authService.setTokens(mockTokens);
      expect(authService.isAuthenticated()).toBe(true);

      authService.logout();

      expect(authService.isAuthenticated()).toBe(false);
      expect(localStorageMock.getItem('accessToken')).toBeNull();
      expect(localStorageMock.getItem('refreshToken')).toBeNull();
    });
  });
});

