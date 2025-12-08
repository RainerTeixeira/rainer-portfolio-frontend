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

import { fireEvent, render, screen, waitFor, render as rtlRender } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { AuthProvider } from '@/components/providers/auth-context-provider';

// Wrapper personalizado para incluir o AuthProvider
const renderWithAuth = (ui: React.ReactElement, options = {}) => {
  return rtlRender(ui, {
    wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>,
    ...options,
  });
};

// ============================================================================
// Mocks
// ============================================================================

// Mock Next.js Navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

// Mock useAuth hook (estado de autenticação + operações principais)
const mockCheckAuth = jest.fn().mockResolvedValue(undefined);
const mockLogin = jest.fn().mockResolvedValue({});
const mockLogout = jest.fn().mockResolvedValue(undefined);
const mockRegister = jest.fn().mockResolvedValue({});
const mockUpdateProfile = jest.fn().mockResolvedValue({});
const mockForgotPassword = jest.fn().mockResolvedValue(undefined);
const mockConfirmPasswordReset = jest.fn().mockResolvedValue(undefined);
const mockChangePassword = jest.fn().mockResolvedValue(undefined);
const mockLoginWithOAuthCode = jest.fn().mockResolvedValue(true);

// Callbacks de OAuth serão expostos via authService (ver mock abaixo)
const mockLoginWithGoogle = jest.fn();
const mockLoginWithGitHub = jest.fn();

const mockUseAuthValue = {
  user: null as any,
  isAuthenticated: false,
  loading: false,
  error: null as any,
  login: mockLogin,
  logout: mockLogout,
  register: mockRegister,
  updateProfile: mockUpdateProfile,
  forgotPassword: mockForgotPassword,
  confirmPasswordReset: mockConfirmPasswordReset,
  changePassword: mockChangePassword,
  checkAuth: mockCheckAuth,
  loginWithOAuthCode: mockLoginWithOAuthCode,
};

jest.mock('@/hooks/useAuth', () => ({
  __esModule: true,
  useAuth: () => mockUseAuthValue,
  default: () => mockUseAuthValue,
}));

// Mock do authService para que AuthProvider use estes callbacks de OAuth
jest.mock('@/lib/api/services/auth.service', () => ({
  authService: {
    loginWithGoogle: (...args: any[]) => mockLoginWithGoogle(...args),
    loginWithGitHub: (...args: any[]) => mockLoginWithGitHub(...args),
  },
}));

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}));

// Mock leve de '@/constants' para evitar dependência de módulos que usam
// diretamente design tokens (ex: constants/home/servicos)
jest.mock('@/constants', () => ({
  SITE_CONFIG: {
    github: 'https://github.com/test',
    linkedin: 'https://linkedin.com/in/test',
    url: 'https://example.com',
  },
}));

// Mock Sonner
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock Lucide Icons
jest.mock('lucide-react', () => ({
  Loader2: ({ className }: any) => <div className={className} data-testid="loader" />,
  ChevronRight: ({ className }: any) => <div className={className} data-testid="chevron-right" />,
  Eye: ({ className }: any) => <div className={className} data-testid="eye" />,
  EyeOff: ({ className }: any) => <div className={className} data-testid="eye-off" />,
}));

// Mock Design Tokens (pacote atualizado)
jest.mock('@rainersoft/design-tokens', () => ({
  ANIMATION_DURATION_MS: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  TRANSITIONS: {
    ALL_EASE_IN_OUT: 'transition-all duration-300 ease-in-out',
    COLORS: 'transition-colors duration-200',
    NORMAL: 'transition-all duration-300',
  },
  BORDER_RADIUS: {
    MD: 'rounded-md',
  },
  GRADIENTS: {
    PRIMARY: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    SECONDARY: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    ACCENT: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    BG_HERO: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    BG_SECTION: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  SHADOWS: {
    SMALL: '0 2px 4px rgba(0, 0, 0, 0.1)',
    MEDIUM: '0 4px 8px rgba(0, 0, 0, 0.15)',
    LARGE: '0 8px 16px rgba(0, 0, 0, 0.2)',
    XL: '0 12px 24px rgba(0, 0, 0, 0.25)',
  },
  GRADIENT_DIRECTIONS: {
    TO_BOTTOM: 'to bottom',
    TO_TOP: 'to top',
    TO_RIGHT: 'to right',
    TO_LEFT: 'to left',
    TO_BR: 'to bottom right',
    TO_BL: 'to bottom left',
    TO_TR: 'to top right',
    TO_TL: 'to top left',
  },
  BACKGROUND: {
    GRADIENT_OVERLAY: 'bg-gradient-to-r from-background/95 to-background/50',
    FULL: 'bg-background',
    SECTION_CYAN: 'bg-cyan-900/10',
    GRADIENT_RADIAL: 'bg-gradient-radial',
  },
  MOTION: {
    TRANSITION: {
      COLOR: 'transition-colors duration-200',
      TRANSFORM: 'transition-transform duration-200',
    },
  },
  lightThemeColors: {
    primary: '#667eea',
    secondary: '#764ba2',
    background: '#ffffff',
    foreground: '#000000',
  },
  darkThemeColors: {
    primary: '#667eea',
    secondary: '#764ba2',
    background: '#000000',
    foreground: '#ffffff',
  },
  COLOR_NEUTRAL: {
    500: '#6b7280',
  },
  COLOR_BLUE: {
    500: '#3b82f6',
  },
  COLOR_AMBER: {
    500: '#f59e0b',
  },
  COLOR_RED: {
    500: '#ef4444',
  },
  motionTokens: {
    delay: {
      short: 100,
      medium: 200,
      long: 300,
    },
    duration: {
      short: '150ms',
      medium: '300ms',
      long: '500ms',
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  tokens: {
    colors: {
      light: {
        primary: '#667eea',
        secondary: '#764ba2',
        background: '#ffffff',
        foreground: '#000000',
        // Cores adicionais que podem ser necessárias
        text: {
          primary: '#1a202c',
          secondary: '#4a5568',
        },
        button: {
          primary: '#667eea',
          hover: '#5a67d8',
        },
      },
      dark: {
        primary: '#667eea',
        secondary: '#764ba2',
        background: '#000000',
        foreground: '#ffffff',
        // Cores adicionais que podem ser necessárias
        text: {
          primary: '#f7fafc',
          secondary: '#cbd5e0',
        },
        button: {
          primary: '#667eea',
          hover: '#5a67d8',
        },
      },
    },
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

    // Resetar estado de autenticação para valor padrão
    mockUseAuthValue.isAuthenticated = false;
    mockUseAuthValue.loading = false;
    mockUseAuthValue.user = null;

    // Garantir que funções de OAuth estejam limpas a cada teste
    mockLoginWithGoogle.mockClear();
    mockLoginWithGitHub.mockClear();
  });

  // ==========================================================================
  // Renderização OAuth
  // ==========================================================================

  describe('Renderização OAuth', () => {
    it('deve renderizar botões OAuth na página de login', () => {
      renderWithAuth(<LoginPage />);

      expect(screen.getByTestId('oauth-buttons')).toBeInTheDocument();
      expect(screen.getByTestId('google-login-button')).toBeInTheDocument();
      expect(screen.getByTestId('github-login-button')).toBeInTheDocument();
    });

    it('deve renderizar separador "ou" entre formulário e OAuth', () => {
      renderWithAuth(<LoginPage />);

      expect(screen.getByText('ou')).toBeInTheDocument();
    });

    it('deve renderizar formulário de login e botões OAuth juntos', () => {
      renderWithAuth(<LoginPage />);

      expect(screen.getByTestId('login-form')).toBeInTheDocument();
      expect(screen.getByTestId('oauth-buttons')).toBeInTheDocument();
    });
  });

  // ==========================================================================
  // Login com Google
  // ==========================================================================

  describe('Login com Google', () => {
    it('deve chamar loginWithGoogle ao clicar no botão Google', () => {
      renderWithAuth(<LoginPage />);

      const googleButton = screen.getByTestId('google-login-button');
      fireEvent.click(googleButton);

      expect(mockLoginWithGoogle).toHaveBeenCalledTimes(1);
    });

    it('não deve chamar loginWithGitHub ao clicar no botão Google', () => {
      renderWithAuth(<LoginPage />);

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

      renderWithAuth(<LoginPage />);

      const googleButton = screen.getByTestId('google-login-button');
      fireEvent.click(googleButton);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Erro ao iniciar login com Google:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });

    it('deve permitir múltiplos cliques no botão Google', () => {
      renderWithAuth(<LoginPage />);

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
      renderWithAuth(<LoginPage />);

      const githubButton = screen.getByTestId('github-login-button');
      fireEvent.click(githubButton);

      expect(mockLoginWithGitHub).toHaveBeenCalledTimes(1);
    });

    it('não deve chamar loginWithGoogle ao clicar no botão GitHub', () => {
      renderWithAuth(<LoginPage />);

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

      renderWithAuth(<LoginPage />);

      const githubButton = screen.getByTestId('github-login-button');
      fireEvent.click(githubButton);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Erro ao iniciar login com GitHub:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });

    it('deve permitir múltiplos cliques no botão GitHub', () => {
      renderWithAuth(<LoginPage />);

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

      renderWithAuth(<LoginPage />);

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
      renderWithAuth(<LoginPage />);

      expect(screen.queryByText('Carregando...')).not.toBeInTheDocument();
    });

    it('deve mostrar loading inicial se authLoading=true', () => {
      mockUseAuthValue.loading = true;

      renderWithAuth(<LoginPage />);

      expect(screen.getByText('Carregando...')).toBeInTheDocument();
    });
  });

  // ==========================================================================
  // Redirecionamento
  // ==========================================================================

  describe('Redirecionamento', () => {
    it('deve redirecionar para /dashboard se já autenticado', async () => {
      mockUseAuthValue.isAuthenticated = true;
      mockUseAuthValue.loading = false;

      renderWithAuth(<LoginPage />);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
      });
    });

    it('não deve renderizar conteúdo se já autenticado', () => {
      mockUseAuthValue.isAuthenticated = true;
      mockUseAuthValue.loading = false;

      const { container } = renderWithAuth(<LoginPage />);

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
      renderWithAuth(<LoginPage />);

      const googleButton = screen.getByTestId('google-login-button');
      const githubButton = screen.getByTestId('github-login-button');

      fireEvent.click(googleButton);
      fireEvent.click(githubButton);

      expect(mockLoginWithGoogle).toHaveBeenCalledTimes(1);
      expect(mockLoginWithGitHub).toHaveBeenCalledTimes(1);
    });

    it('deve permitir usar OAuth após tentar login tradicional', async () => {
      mockLogin.mockRejectedValue(new Error('Credenciais inválidas'));

      renderWithAuth(<LoginPage />);

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
      renderWithAuth(<LoginPage />);

      expect(screen.getByText('Continuar com Google')).toBeInTheDocument();
      expect(screen.getByText('Continuar com GitHub')).toBeInTheDocument();
    });

    it('deve ter link para registro visível', () => {
      renderWithAuth(<LoginPage />);

      const registerLink = screen.getByText('Criar uma conta');
      expect(registerLink).toBeInTheDocument();
    });
  });
});
