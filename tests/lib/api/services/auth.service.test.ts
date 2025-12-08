/**
 * Testes para authService
 *
 * Testa todos os métodos de autenticação incluindo:
 * - Login tradicional (email/senha)
 * - Login passwordless (código por email)
 * - Login OAuth (Google)
 */

import { authService } from '@/lib/api';
import { api } from '@/lib/api/client';

// Mock do api client preservando ApiError e demais exports
jest.mock('@/lib/api/client', () => {
  const actual = jest.requireActual('@/lib/api/client');

  return {
    ...actual,
    api: {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      setAuthToken: jest.fn(),
    },
  };
});

// Mock de window.location para OAuth redirects
// jsdom não permite redefinir location, então usamos uma variável global
// para rastrear mudanças em href que será atualizada pelo código de produção
let mockLocationHref = 'http://localhost/';

// Define variável global que será atualizada pelo auth.service.ts em modo teste
(window as any).__testLocationHref = mockLocationHref;

// Mock do localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
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

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    // Reset location mock
    mockLocationHref = 'http://localhost/';
    (window as any).__testLocationHref = 'http://localhost/';
  });

  describe('Login tradicional', () => {
    it('deve realizar login com sucesso, chamar /auth/login e salvar tokens', async () => {
      const mockResponse = {
        success: true,
        data: {
          tokens: {
            accessToken: 'access-token-123',
            refreshToken: 'refresh-token-123',
            idToken: 'id-token-123',
            expiresIn: 3600,
            tokenType: 'Bearer',
          },
          user: {
            id: 'user-123',
            cognitoSub: 'cognito-sub-123',
            fullName: 'Test User',
            role: 'SUBSCRIBER',
            isActive: true,
            isBanned: false,
            postsCount: 0,
            commentsCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        },
      };

      (api.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(api.post).toHaveBeenCalledWith(
        '/auth/login',
        { email: 'test@example.com', password: 'password123' },
      );

      expect(result.user.id).toBe('user-123');
      expect(localStorageMock.getItem('accessToken')).toBe('access-token-123');
      expect(localStorageMock.getItem('userId')).toBe('cognito-sub-123');
    });

    it('deve lançar erro de login quando credenciais são inválidas', async () => {
      const mockErrorResponse = {
        success: false,
        message: 'Email ou senha incorretos',
      };

      (api.post as jest.Mock).mockResolvedValue(mockErrorResponse);

      await expect(
        authService.login({
          email: 'wrong@example.com',
          password: 'wrong-password',
        }),
      ).rejects.toThrow('Email ou senha incorretos');

      expect(api.post).toHaveBeenCalledWith(
        '/auth/login',
        { email: 'wrong@example.com', password: 'wrong-password' },
      );
    });
  });

  describe('Métodos Básicos', () => {
    it('deve ter método login', () => {
      expect(typeof authService.login).toBe('function');
    });

    it('deve ter método register', () => {
      expect(typeof authService.register).toBe('function');
    });

    it('deve ter método logout', () => {
      expect(typeof authService.logout).toBe('function');
    });
  });

  describe('Autenticação Passwordless', () => {
    describe('initiatePasswordless', () => {
      it('deve enviar código de verificação com sucesso', async () => {
        const mockResponse = {
          success: true,
          data: {
            success: true,
            message: 'Código enviado com sucesso',
            session: 'test-session-id',
          },
        };

        (api.post as jest.Mock).mockResolvedValue(mockResponse);

        const result =
          await authService.initiatePasswordless('test@example.com');

        expect(api.post).toHaveBeenCalledWith(
          '/auth/passwordless/init',
          { email: 'test@example.com' },
          { timeout: 30000 }
        );
        expect(result.success).toBe(true);
        expect(result.message).toBe('Código enviado com sucesso');
        expect(result.session).toBe('test-session-id');
      });

      it('deve lançar erro quando falha ao enviar código', async () => {
        const mockError = {
          success: false,
          message: 'Erro ao enviar código',
        };

        (api.post as jest.Mock).mockResolvedValue(mockError);

        await expect(
          authService.initiatePasswordless('test@example.com')
        ).rejects.toThrow('Erro ao enviar código');
      });

      it('deve lançar erro quando API retorna erro', async () => {
        (api.post as jest.Mock).mockRejectedValue(new Error('Network error'));

        await expect(
          authService.initiatePasswordless('test@example.com')
        ).rejects.toThrow('Network error');
      });
    });

    describe('verifyPasswordless', () => {
      it('deve verificar código e autenticar com sucesso', async () => {
        const mockResponse = {
          success: true,
          data: {
            user: {
              id: 'user-123',
              email: 'test@example.com',
              cognitoSub: 'cognito-sub-123',
              fullName: 'Test User',
            },
            tokens: {
              accessToken: 'access-token-123',
              refreshToken: 'refresh-token-123',
              idToken: 'id-token-123',
            },
          },
        };

        (api.post as jest.Mock).mockResolvedValue(mockResponse);

        const result = await authService.verifyPasswordless(
          'test@example.com',
          '123456'
        );

        expect(api.post).toHaveBeenCalledWith(
          '/auth/passwordless/verify',
          { email: 'test@example.com', code: '123456', session: undefined },
          { timeout: 30000 }
        );
        // Cast para any apenas no teste para evitar erro de tipo quando o modelo User
        // ainda não expõe explicitamente a propriedade email nas definições de tipos.
        expect((result.user as any).email).toBe('test@example.com');
        expect(result.tokens.accessToken).toBe('access-token-123');
        expect(localStorageMock.getItem('accessToken')).toBe(
          'access-token-123'
        );
        expect(localStorageMock.getItem('userId')).toBe('cognito-sub-123');
      });

      it('deve verificar código com session ID', async () => {
        const mockResponse = {
          success: true,
          data: {
            user: {
              id: 'user-123',
              email: 'test@example.com',
              cognitoSub: 'cognito-sub-123',
            },
            tokens: {
              accessToken: 'access-token-123',
              refreshToken: 'refresh-token-123',
              idToken: 'id-token-123',
            },
          },
        };

        (api.post as jest.Mock).mockResolvedValue(mockResponse);

        await authService.verifyPasswordless(
          'test@example.com',
          '123456',
          'session-id-123'
        );

        expect(api.post).toHaveBeenCalledWith(
          '/auth/passwordless/verify',
          {
            email: 'test@example.com',
            code: '123456',
            session: 'session-id-123',
          },
          { timeout: 30000 }
        );
      });

      it('deve lançar erro quando código é inválido', async () => {
        const mockError = {
          success: false,
          message: 'Código inválido ou expirado',
        };

        (api.post as jest.Mock).mockResolvedValue(mockError);

        await expect(
          authService.verifyPasswordless('test@example.com', '000000')
        ).rejects.toThrow('Código inválido ou expirado');
      });

      it('deve lançar erro quando excede tentativas', async () => {
        const mockError = {
          success: false,
          message: 'Número máximo de tentativas excedido',
        };

        (api.post as jest.Mock).mockResolvedValue(mockError);

        await expect(
          authService.verifyPasswordless('test@example.com', '123456')
        ).rejects.toThrow('Número máximo de tentativas excedido');
      });
    });
  });

  describe('Autenticação OAuth', () => {
    describe('loginWithGoogle', () => {
      beforeEach(() => {
        // Garantir redirect configurado para evitar erro de configuração
        process.env.NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN =
          'http://localhost:3000/dashboard/login/callback';

        // Reset location mock
        mockLocationHref = 'http://localhost/';
        (window as any).__testLocationHref = 'http://localhost/';
      });

      it('deve redirecionar para Google OAuth', () => {
        authService.loginWithGoogle();

        // Verifica se tentou redirecionar (jsdom não permite navegação real)
        // Verifica a variável global que rastreia mudanças
        const trackedHref =
          (window as any).__testLocationHref || mockLocationHref;
        expect(trackedHref).toContain('/auth/oauth/google');
      });

      it('deve usar URL do backend do ambiente', () => {
        const originalEnv = process.env.NEXT_PUBLIC_API_URL;
        process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com';

        authService.loginWithGoogle();

        // Verifica se tentou redirecionar com URL do ambiente
        const trackedHref =
          (window as any).__testLocationHref || mockLocationHref;
        expect(trackedHref).toContain('api.example.com');
        expect(trackedHref).toContain('/auth/oauth/google');

        process.env.NEXT_PUBLIC_API_URL = originalEnv;
        mockLocationHref = 'http://localhost/';
        (window as any).__testLocationHref = 'http://localhost/';
      });
    });

    // Testes relacionados a loginWithGitHub foram removidos, pois o fluxo GitHub está desativado.
  });
});
