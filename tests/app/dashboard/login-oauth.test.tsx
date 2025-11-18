/**
 * Login Page OAuth Tests
 *
 * Testes para funcionalidades OAuth da página de login.
 * Valida integração com Google e GitHub OAuth.
 *
 * @module tests/app/dashboard/login-oauth
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import { useAuth } from '@/hooks/useAuth';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import React from 'react';

// ============================================================================
// Mocks
// ============================================================================

// Mock Next.js Navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

// Mock useAuth hook
jest.mock('@/hooks/useAuth');

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
  },
}));

// Mock Sonner
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock Design Tokens
jest.mock('@rainer/rainer-design-tokens', () => ({
  ANIMATION_DURATION_MS: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  TRANSITIONS: {
    ALL_EASE_IN_OUT: 'transition-all duration-300 ease-in-out',
    COLORS: 'transition-colors duration-200',
  },
  BORDER_RADIUS: {
    MD: 'rounded-md',
  },
}));

// Mock UI Components
jest.mock('@/components/ui', () => ({
  BackToTop: () => <div data-testid="back-to-top">Back to Top</div>,
}));

// Mock Dashboard Login Components
jest.mock('@/components/dashboard/login', () => ({
  AuthLayout: ({ children, footer, ...props }: any) => (
    <div data-testid="auth-layout" {...props}>
      {children}
      {footer && <div data-testid="auth-footer">{footer}</div>}
    </div>
  ),
  LoginForm: ({ onSubmit, isLoading, error }: any) => (
    <form
      data-testid="login-form"
      onSubmit={e => {
        e.preventDefault();
        onSubmit('test@example.com', 'password123');
      }}
    >
      <input type="email" name="email" />
      <input type="password" name="password" />
      <button type="submit" disabled={isLoading}>
        Login
      </button>
      {error && <div data-testid="error-message">{error}</div>}
    </form>
  ),
  OAuthButtons: ({ onGoogleLogin, onGitHubLogin, disabled }: any) => (
    <div data-testid="oauth-buttons">
      <button
        onClick={onGoogleLogin}
        disabled={disabled}
        data-testid="google-login-button"
      >
        Continuar com Google
      </button>
      <button
        onClick={onGitHubLogin}
        disabled={disabled}
        data-testid="github-login-button"
      >
        Continuar com GitHub
      </button>
    </div>
  ),
}));

// ============================================================================
// Test Component
// ============================================================================

// Importar componente após mocks
let LoginPage: React.ComponentType;

describe('LoginPage OAuth', () => {
  // Mock functions
  const mockPush = jest.fn();
  const mockLogin = jest.fn();
  const mockLoginWithGoogle = jest.fn();
  const mockLoginWithGitHub = jest.fn();

  beforeAll(async () => {
    // Importar componente dinamicamente após mocks
    const module = await import('@/app/dashboard/login/page');
    LoginPage = module.default;
  });

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock router
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    // Mock useAuth com valores padrão
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      isAuthenticated: false,
      loading: false,
      loginWithGoogle: mockLoginWithGoogle,
      loginWithGitHub: mockLoginWithGitHub,
    });
  });

  // ==========================================================================
  // Renderização OAuth
  // ==========================================================================

  describe('Renderização OAuth', () => {
    it('deve renderizar botões OAuth na página de login', () => {
      render(<LoginPage />);

      expect(screen.getByTestId('oauth-buttons')).toBeInTheDocument();
      expect(screen.getByTestId('google-login-button')).toBeInTheDocument();
      expect(screen.getByTestId('github-login-button')).toBeInTheDocument();
    });

    it('deve renderizar separador "ou" entre formulário e OAuth', () => {
      render(<LoginPage />);

      expect(screen.getByText('ou')).toBeInTheDocument();
    });

    it('deve renderizar formulário de login e botões OAuth juntos', () => {
      render(<LoginPage />);

      expect(screen.getByTestId('login-form')).toBeInTheDocument();
      expect(screen.getByTestId('oauth-buttons')).toBeInTheDocument();
    });
  });

  // ==========================================================================
  // Login com Google
  // ==========================================================================

  describe('Login com Google', () => {
    it('deve chamar loginWithGoogle ao clicar no botão Google', () => {
      render(<LoginPage />);

      const googleButton = screen.getByTestId('google-login-button');
      fireEvent.click(googleButton);

      expect(mockLoginWithGoogle).toHaveBeenCalledTimes(1);
    });

    it('não deve chamar loginWithGitHub ao clicar no botão Google', () => {
      render(<LoginPage />);

      const googleButton = screen.getByTestId('google-login-button');
      fireEvent.click(googleButton);

      expect(mockLoginWithGitHub).not.toHaveBeenCalled();
    });

    it('deve tratar erro ao iniciar login com Google', () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      mockLoginWithGoogle.mockImplementation(() => {
        throw new Error('Erro ao iniciar login com Google');
      });

      render(<LoginPage />);

      const googleButton = screen.getByTestId('google-login-button');
      fireEvent.click(googleButton);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Erro ao iniciar login com Google:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });

    it('deve permitir múltiplos cliques no botão Google', () => {
      render(<LoginPage />);

      const googleButton = screen.getByTestId('google-login-button');
      fireEvent.click(googleButton);
      fireEvent.click(googleButton);

      expect(mockLoginWithGoogle).toHaveBeenCalledTimes(2);
    });
  });

  // ==========================================================================
  // Login com GitHub
  // ==========================================================================

  describe('Login com GitHub', () => {
    it('deve chamar loginWithGitHub ao clicar no botão GitHub', () => {
      render(<LoginPage />);

      const githubButton = screen.getByTestId('github-login-button');
      fireEvent.click(githubButton);

      expect(mockLoginWithGitHub).toHaveBeenCalledTimes(1);
    });

    it('não deve chamar loginWithGoogle ao clicar no botão GitHub', () => {
      render(<LoginPage />);

      const githubButton = screen.getByTestId('github-login-button');
      fireEvent.click(githubButton);

      expect(mockLoginWithGoogle).not.toHaveBeenCalled();
    });

    it('deve tratar erro ao iniciar login com GitHub', () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      mockLoginWithGitHub.mockImplementation(() => {
        throw new Error('Erro ao iniciar login com GitHub');
      });

      render(<LoginPage />);

      const githubButton = screen.getByTestId('github-login-button');
      fireEvent.click(githubButton);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Erro ao iniciar login com GitHub:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });

    it('deve permitir múltiplos cliques no botão GitHub', () => {
      render(<LoginPage />);

      const githubButton = screen.getByTestId('github-login-button');
      fireEvent.click(githubButton);
      fireEvent.click(githubButton);

      expect(mockLoginWithGitHub).toHaveBeenCalledTimes(2);
    });
  });

  // ==========================================================================
  // Estados de Loading
  // ==========================================================================

  describe('Estados de Loading', () => {
    it('deve desabilitar botões OAuth durante login tradicional', async () => {
      mockLogin.mockImplementation(
        () =>
          new Promise(resolve => {
            setTimeout(
              () => resolve({ id: '1', email: 'test@example.com' }),
              100
            );
          })
      );

      render(<LoginPage />);

      const loginForm = screen.getByTestId('login-form');
      fireEvent.submit(loginForm);

      // Aguardar estado de loading
      await waitFor(() => {
        const googleButton = screen.getByTestId('google-login-button');
        const githubButton = screen.getByTestId('github-login-button');
        expect(googleButton).toBeDisabled();
        expect(githubButton).toBeDisabled();
      });
    });

    it('não deve mostrar loading inicial se authLoading=false', () => {
      render(<LoginPage />);

      expect(screen.queryByText('Carregando...')).not.toBeInTheDocument();
    });

    it('deve mostrar loading inicial se authLoading=true', () => {
      (useAuth as jest.Mock).mockReturnValue({
        login: mockLogin,
        isAuthenticated: false,
        loading: true,
        loginWithGoogle: mockLoginWithGoogle,
        loginWithGitHub: mockLoginWithGitHub,
      });

      render(<LoginPage />);

      expect(screen.getByText('Carregando...')).toBeInTheDocument();
    });
  });

  // ==========================================================================
  // Redirecionamento
  // ==========================================================================

  describe('Redirecionamento', () => {
    it('deve redirecionar para /dashboard se já autenticado', async () => {
      (useAuth as jest.Mock).mockReturnValue({
        login: mockLogin,
        isAuthenticated: true,
        loading: false,
        loginWithGoogle: mockLoginWithGoogle,
        loginWithGitHub: mockLoginWithGitHub,
      });

      render(<LoginPage />);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
      });
    });

    it('não deve renderizar conteúdo se já autenticado', () => {
      (useAuth as jest.Mock).mockReturnValue({
        login: mockLogin,
        isAuthenticated: true,
        loading: false,
        loginWithGoogle: mockLoginWithGoogle,
        loginWithGitHub: mockLoginWithGitHub,
      });

      const { container } = render(<LoginPage />);

      // Não deve renderizar formulário ou botões OAuth
      expect(screen.queryByTestId('login-form')).not.toBeInTheDocument();
      expect(screen.queryByTestId('oauth-buttons')).not.toBeInTheDocument();
    });
  });

  // ==========================================================================
  // Alternância entre Métodos
  // ==========================================================================

  describe('Alternância entre Métodos', () => {
    it('deve permitir alternar entre Google e GitHub', () => {
      render(<LoginPage />);

      const googleButton = screen.getByTestId('google-login-button');
      const githubButton = screen.getByTestId('github-login-button');

      fireEvent.click(googleButton);
      fireEvent.click(githubButton);

      expect(mockLoginWithGoogle).toHaveBeenCalledTimes(1);
      expect(mockLoginWithGitHub).toHaveBeenCalledTimes(1);
    });

    it('deve permitir usar OAuth após tentar login tradicional', async () => {
      mockLogin.mockRejectedValue(new Error('Credenciais inválidas'));

      render(<LoginPage />);

      // Tentar login tradicional
      const loginForm = screen.getByTestId('login-form');
      fireEvent.submit(loginForm);

      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toBeInTheDocument();
      });

      // Usar OAuth após erro
      const googleButton = screen.getByTestId('google-login-button');
      fireEvent.click(googleButton);

      expect(mockLoginWithGoogle).toHaveBeenCalledTimes(1);
    });
  });

  // ==========================================================================
  // Acessibilidade
  // ==========================================================================

  describe('Acessibilidade', () => {
    it('deve ter textos descritivos nos botões OAuth', () => {
      render(<LoginPage />);

      expect(screen.getByText('Continuar com Google')).toBeInTheDocument();
      expect(screen.getByText('Continuar com GitHub')).toBeInTheDocument();
    });

    it('deve ter link para registro visível', () => {
      render(<LoginPage />);

      const registerLink = screen.getByText('Criar uma conta');
      expect(registerLink).toBeInTheDocument();
    });
  });
});
