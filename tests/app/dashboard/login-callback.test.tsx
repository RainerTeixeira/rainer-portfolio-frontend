/**
 * OAuth Callback Page Tests
 *
 * Testes para a página de callback OAuth.
 * Valida processamento de código, extração de provider e tratamento de erros.
 *
 * @module tests/app/dashboard/login-callback
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import { useAuth } from '@/hooks/useAuth';
import { render, screen, waitFor } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

// ============================================================================
// Mocks
// ============================================================================

// Mock Next.js Navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Mock useAuth hook
jest.mock('@/hooks/useAuth');

// Mock Sonner
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock UI Components
jest.mock('@/components/ui/alert', () => ({
  Alert: ({ children, ...props }: any) => (
    <div data-testid="alert" {...props}>
      {children}
    </div>
  ),
  AlertDescription: ({ children, ...props }: any) => (
    <div data-testid="alert-description" {...props}>
      {children}
    </div>
  ),
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

// Mock Lucide Icons
jest.mock('lucide-react', () => ({
  Loader2: () => <div data-testid="loader-icon">Loading...</div>,
  CheckCircle2: () => <div data-testid="check-icon">Success</div>,
  AlertCircle: () => <div data-testid="alert-icon">Error</div>,
}));

// ============================================================================
// Test Component
// ============================================================================

let OAuthCallbackPage: React.ComponentType;

describe('OAuthCallbackPage', () => {
  // Mock functions
  const mockPush = jest.fn();
  const mockLoginWithOAuthCode = jest.fn();

  // Helper para criar URLSearchParams mock
  const createSearchParams = (params: Record<string, string>) => {
    const searchParams = new URLSearchParams(params);
    return {
      get: (key: string) => searchParams.get(key),
      toString: () => searchParams.toString(),
    };
  };

  // Helper para codificar state em base64url
  const encodeState = (data: any): string => {
    const json = JSON.stringify(data);
    const base64 = Buffer.from(json).toString('base64');
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  };

  beforeAll(async () => {
    // Importar componente dinamicamente após mocks
    const module = await import('@/app/dashboard/login/callback/page');
    OAuthCallbackPage = module.default;
  });

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock router
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    // Mock useAuth
    (useAuth as jest.Mock).mockReturnValue({
      loginWithOAuthCode: mockLoginWithOAuthCode,
      isAuthenticated: false,
    });
  });

  // ==========================================================================
  // Estado de Loading
  // ==========================================================================

  describe('Estado de Loading', () => {
    it('deve mostrar loading ao processar callback', () => {
      mockLoginWithOAuthCode.mockImplementation(
        () => new Promise(() => {}) // Never resolves
      );

      (useSearchParams as jest.Mock).mockReturnValue(
        createSearchParams({
          code: 'test-code-123',
        })
      );

      render(<OAuthCallbackPage />);

      expect(screen.getByText('Processando login...')).toBeInTheDocument();
      expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
    });

    it('deve mostrar ícone de loading durante processamento', () => {
      mockLoginWithOAuthCode.mockImplementation(
        () => new Promise(() => {})
      );

      (useSearchParams as jest.Mock).mockReturnValue(
        createSearchParams({
          code: 'test-code-123',
        })
      );

      render(<OAuthCallbackPage />);

      expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
    });
  });

  // ==========================================================================
  // Processamento de Código
  // ==========================================================================

  describe('Processamento de Código', () => {
    it('deve processar código OAuth com sucesso', async () => {
      mockLoginWithOAuthCode.mockResolvedValue(true);

      (useSearchParams as jest.Mock).mockReturnValue(
        createSearchParams({
          code: 'test-code-123',
        })
      );

      render(<OAuthCallbackPage />);

      await waitFor(() => {
        expect(mockLoginWithOAuthCode).toHaveBeenCalledWith(
          'test-code-123',
          undefined,
          undefined
        );
      });
    });

    it('deve extrair provider do state quando presente', async () => {
      mockLoginWithOAuthCode.mockResolvedValue(true);

      const state = encodeState({ p: 'google' });
      (useSearchParams as jest.Mock).mockReturnValue(
        createSearchParams({
          code: 'test-code-123',
          state,
        })
      );

      render(<OAuthCallbackPage />);

      await waitFor(() => {
        expect(mockLoginWithOAuthCode).toHaveBeenCalledWith(
          'test-code-123',
          'google',
          state
        );
      });
    });

    it('deve processar callback do Google corretamente', async () => {
      mockLoginWithOAuthCode.mockResolvedValue(true);

      const state = encodeState({ p: 'google' });
      (useSearchParams as jest.Mock).mockReturnValue(
        createSearchParams({
          code: 'google-code-123',
          state,
        })
      );

      render(<OAuthCallbackPage />);

      await waitFor(() => {
        expect(mockLoginWithOAuthCode).toHaveBeenCalledWith(
          'google-code-123',
          'google',
          state
        );
      });
    });

    it('deve processar callback do GitHub corretamente', async () => {
      mockLoginWithOAuthCode.mockResolvedValue(true);

      const state = encodeState({ p: 'github' });
      (useSearchParams as jest.Mock).mockReturnValue(
        createSearchParams({
          code: 'github-code-456',
          state,
        })
      );

      render(<OAuthCallbackPage />);

      await waitFor(() => {
        expect(mockLoginWithOAuthCode).toHaveBeenCalledWith(
          'github-code-456',
          'github',
          state
        );
      });
    });

    it('deve processar callback sem state (provider detectado pelo backend)', async () => {
      mockLoginWithOAuthCode.mockResolvedValue(true);

      (useSearchParams as jest.Mock).mockReturnValue(
        createSearchParams({
          code: 'test-code-no-state',
        })
      );

      render(<OAuthCallbackPage />);

      await waitFor(() => {
        expect(mockLoginWithOAuthCode).toHaveBeenCalledWith(
          'test-code-no-state',
          undefined,
          undefined
        );
      });
    });
  });

  // ==========================================================================
  // Estado de Sucesso
  // ==========================================================================

  describe('Estado de Sucesso', () => {
    it('deve mostrar mensagem de sucesso após login', async () => {
      mockLoginWithOAuthCode.mockResolvedValue(true);

      (useSearchParams as jest.Mock).mockReturnValue(
        createSearchParams({
          code: 'test-code-123',
        })
      );

      render(<OAuthCallbackPage />);

      await waitFor(() => {
        expect(
          screen.getByText(/login realizado com sucesso/i)
        ).toBeInTheDocument();
      });
    });

    it('deve mostrar ícone de sucesso', async () => {
      mockLoginWithOAuthCode.mockResolvedValue(true);

      (useSearchParams as jest.Mock).mockReturnValue(
        createSearchParams({
          code: 'test-code-123',
        })
      );

      render(<OAuthCallbackPage />);

      await waitFor(() => {
        expect(screen.getByTestId('check-icon')).toBeInTheDocument();
      });
    });

    it('deve redirecionar para dashboard após sucesso', async () => {
      mockLoginWithOAuthCode.mockResolvedValue(true);

      (useSearchParams as jest.Mock).mockReturnValue(
        createSearchParams({
          code: 'test-code-123',
        })
      );

      render(<OAuthCallbackPage />);

      await waitFor(
        () => {
          expect(mockPush).toHaveBeenCalledWith('/dashboard');
        },
        { timeout: 2000 }
      );
    });
  });

  // ==========================================================================
  // Tratamento de Erros
  // ==========================================================================

  describe('Tratamento de Erros', () => {
    it('deve mostrar erro quando código não está presente', async () => {
      (useSearchParams as jest.Mock).mockReturnValue(
        createSearchParams({})
      );

      render(<OAuthCallbackPage />);

      // Componente não deve processar sem código
      await waitFor(() => {
        expect(mockLoginWithOAuthCode).not.toHaveBeenCalled();
      });
    });

    it('deve mostrar erro quando OAuth retorna erro', async () => {
      (useSearchParams as jest.Mock).mockReturnValue(
        createSearchParams({
          error: 'access_denied',
          error_description: 'User denied access',
        })
      );

      render(<OAuthCallbackPage />);

      await waitFor(() => {
        expect(screen.getByText(/user denied access/i)).toBeInTheDocument();
      });
    });

    it('deve mostrar erro quando loginWithOAuthCode falha', async () => {
      mockLoginWithOAuthCode.mockRejectedValue(
        new Error('Erro ao processar OAuth')
      );

      (useSearchParams as jest.Mock).mockReturnValue(
        createSearchParams({
          code: 'test-code-123',
        })
      );

      render(<OAuthCallbackPage />);

      await waitFor(() => {
        expect(
          screen.getByText(/erro ao processar oauth/i)
        ).toBeInTheDocument();
      });
    });

    it('deve mostrar erro quando loginWithOAuthCode retorna false', async () => {
      mockLoginWithOAuthCode.mockResolvedValue(false);

      (useSearchParams as jest.Mock).mockReturnValue(
        createSearchParams({
          code: 'test-code-123',
        })
      );

      render(<OAuthCallbackPage />);

      await waitFor(() => {
        expect(
          screen.getByText(/falha ao processar login/i)
        ).toBeInTheDocument();
      });
    });

    it('deve ter botão para voltar ao login em caso de erro', async () => {
      mockLoginWithOAuthCode.mockRejectedValue(
        new Error('Erro ao processar OAuth')
      );

      (useSearchParams as jest.Mock).mockReturnValue(
        createSearchParams({
          code: 'test-code-123',
        })
      );

      render(<OAuthCallbackPage />);

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: /voltar para login/i })
        ).toBeInTheDocument();
      });
    });

    it('deve mostrar ícone de erro em caso de falha', async () => {
      mockLoginWithOAuthCode.mockRejectedValue(
        new Error('Erro ao processar OAuth')
      );

      (useSearchParams as jest.Mock).mockReturnValue(
        createSearchParams({
          code: 'test-code-123',
        })
      );

      render(<OAuthCallbackPage />);

      await waitFor(() => {
        expect(screen.getByTestId('alert-icon')).toBeInTheDocument();
      });
    });
  });

  // ==========================================================================
  // Prevenção de Duplicação
  // ==========================================================================

  describe('Prevenção de Duplicação', () => {
    it('deve processar callback apenas uma vez', async () => {
      mockLoginWithOAuthCode.mockResolvedValue(true);

      (useSearchParams as jest.Mock).mockReturnValue(
        createSearchParams({
          code: 'test-code-123',
        })
      );

      render(<OAuthCallbackPage />);

      await waitFor(() => {
        expect(mockLoginWithOAuthCode).toHaveBeenCalledTimes(1);
      });
    });

    it('não deve processar se já autenticado', async () => {
      (useAuth as jest.Mock).mockReturnValue({
        loginWithOAuthCode: mockLoginWithOAuthCode,
        isAuthenticated: true,
      });

      (useSearchParams as jest.Mock).mockReturnValue(
        createSearchParams({
          code: 'test-code-123',
        })
      );

      render(<OAuthCallbackPage />);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
      });
    });
  });

  // ==========================================================================
  // Edge Cases
  // ==========================================================================

  describe('Edge Cases', () => {
    it('deve tratar state inválido (não base64url)', async () => {
      mockLoginWithOAuthCode.mockResolvedValue(true);

      (useSearchParams as jest.Mock).mockReturnValue(
        createSearchParams({
          code: 'test-code-123',
          state: 'invalid-state-not-base64url',
        })
      );

      render(<OAuthCallbackPage />);

      // Deve processar mesmo com state inválido (provider será detectado pelo backend)
      await waitFor(() => {
        expect(mockLoginWithOAuthCode).toHaveBeenCalledWith(
          'test-code-123',
          undefined,
          'invalid-state-not-base64url'
        );
      });
    });

    it('deve tratar state vazio', async () => {
      mockLoginWithOAuthCode.mockResolvedValue(true);

      (useSearchParams as jest.Mock).mockReturnValue(
        createSearchParams({
          code: 'test-code-123',
          state: '',
        })
      );

      render(<OAuthCallbackPage />);

      await waitFor(() => {
        expect(mockLoginWithOAuthCode).toHaveBeenCalled();
      });
    });

    it('deve tratar error_description com caracteres especiais', async () => {
      (useSearchParams as jest.Mock).mockReturnValue(
        createSearchParams({
          error: 'access_denied',
          error_description: 'User+denied+access+%28cancelled%29',
        })
      );

      render(<OAuthCallbackPage />);

      await waitFor(() => {
        expect(
          screen.getByText(/user denied access \(cancelled\)/i)
        ).toBeInTheDocument();
      });
    });
  });

  // ==========================================================================
  // Logging
  // ==========================================================================

  describe('Logging', () => {
    it('deve logar informações do callback', async () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      mockLoginWithOAuthCode.mockResolvedValue(true);

      (useSearchParams as jest.Mock).mockReturnValue(
        createSearchParams({
          code: 'test-code-123',
        })
      );

      render(<OAuthCallbackPage />);

      await waitFor(() => {
        expect(consoleLogSpy).toHaveBeenCalledWith(
          expect.stringContaining('[OAuth Callback]'),
          expect.anything()
        );
      });

      consoleLogSpy.mockRestore();
    });

    it('deve logar erro em caso de falha', async () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      mockLoginWithOAuthCode.mockRejectedValue(
        new Error('Erro ao processar OAuth')
      );

      (useSearchParams as jest.Mock).mockReturnValue(
        createSearchParams({
          code: 'test-code-123',
        })
      );

      render(<OAuthCallbackPage />);

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          expect.stringContaining('[OAuth Callback]'),
          expect.any(Error)
        );
      });

      consoleErrorSpy.mockRestore();
    });
  });
});

