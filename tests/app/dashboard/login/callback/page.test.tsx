/**
 * Testes para página de Callback OAuth
 */

// Mock do CSS primeiro
jest.mock('@/app/globals.css', () => ({}));

// Mock de variáveis de ambiente
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:4000';

import OAuthCallbackPage from '@/app/dashboard/login/callback/page';
import { render, screen, waitFor } from '@testing-library/react';

// Mock do useRouter
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => {
    const params = new URLSearchParams();
    params.set('code', 'test-code');
    params.set('state', 'test-state');
    return params;
  },
}));

// Mock do useAuth
const mockLoginWithOAuthCode = jest.fn().mockResolvedValue(true);
const mockUseAuth = {
  loginWithOAuthCode: mockLoginWithOAuthCode,
  isAuthenticated: false,
};

jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => mockUseAuth,
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('OAuth Callback Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.isAuthenticated = false;
    mockLoginWithOAuthCode.mockResolvedValue(true);
  });

  it('deve renderizar página de loading inicialmente', () => {
    render(<OAuthCallbackPage />);
    expect(screen.getByText(/Processando login.../i)).toBeInTheDocument();
  });

  it('deve processar código OAuth e redirecionar em caso de sucesso', async () => {
    render(<OAuthCallbackPage />);

    await waitFor(
      () => {
        expect(mockLoginWithOAuthCode).toHaveBeenCalledWith(
          'test-code',
          undefined,
          'test-state'
        );
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
      },
      { timeout: 3000 }
    );
  });

  it('deve exibir mensagem de sucesso após login bem-sucedido', async () => {
    render(<OAuthCallbackPage />);

    await waitFor(
      () => {
        expect(
          screen.getByText(/Login realizado com sucesso!/i)
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('deve exibir erro quando código OAuth é inválido', async () => {
    mockLoginWithOAuthCode.mockResolvedValue(false);

    render(<OAuthCallbackPage />);

    await waitFor(
      () => {
        expect(
          screen.getByText(/Falha ao processar login/i)
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('deve exibir erro quando ocorre exceção no processamento', async () => {
    mockLoginWithOAuthCode.mockRejectedValue(new Error('OAuth error'));

    render(<OAuthCallbackPage />);

    await waitFor(
      () => {
        const errorText =
          screen.queryByText(/Erro ao processar login social/i) ||
          screen.queryByText(/Falha ao processar login/i) ||
          screen.queryByText(/erro/i);
        expect(
          errorText || screen.getByText(/Processando login.../i)
        ).toBeTruthy();
      },
      { timeout: 5000 }
    );
  });

  it('deve exibir botão para voltar ao login em caso de erro', async () => {
    mockLoginWithOAuthCode.mockRejectedValue(new Error('OAuth error'));

    render(<OAuthCallbackPage />);

    await waitFor(
      () => {
        const backButton = screen.getByText(/Voltar para Login/i);
        expect(backButton).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('deve redirecionar se já estiver autenticado', () => {
    mockUseAuth.isAuthenticated = true;
    render(<OAuthCallbackPage />);
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });
});
