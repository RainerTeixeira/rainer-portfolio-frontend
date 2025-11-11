/**
 * Testes para página de Login
 */

import LoginPage from '@/app/dashboard/login/page';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

// Mock do useRouter
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => new URLSearchParams(),
}));

// Mock do useAuth
const mockUseAuth = {
  login: jest.fn(),
  isAuthenticated: false,
  loading: false,
  initiatePasswordless: jest.fn(),
  verifyPasswordless: jest.fn(),
  resetPasswordless: jest.fn(),
  passwordlessStep: null,
  passwordlessEmail: '',
  loginWithGoogle: jest.fn(),
  loginWithGitHub: jest.fn(),
};

jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => mockUseAuth,
}));

// Mock dos componentes
jest.mock('@/components/dashboard/login/forms/passwordless-login-form', () => ({
  PasswordlessLoginForm: ({ onSuccess }: any) => (
    <div data-testid="passwordless-login-form">
      <button onClick={onSuccess}>Passwordless Form</button>
    </div>
  ),
}));

jest.mock('@/components/ui', () => ({
  BackToTop: () => <div data-testid="back-to-top">Back to Top</div>,
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('@/constants', () => ({
  SITE_CONFIG: {
    fullName: 'RainerSoft',
  },
}));

describe('Login Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.isAuthenticated = false;
    mockUseAuth.loading = false;
  });

  it('deve renderizar a página de login', () => {
    render(<LoginPage />);
    expect(screen.getByText('Bem-vindo de Volta')).toBeInTheDocument();
  });

  it('deve exibir tabs para métodos de login', () => {
    render(<LoginPage />);
    expect(screen.getByText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByText(/Código/i)).toBeInTheDocument();
    expect(screen.getByText(/Social/i)).toBeInTheDocument();
  });

  it('deve exibir formulário de login tradicional', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/Usuário/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByText(/Entrar/i)).toBeInTheDocument();
  });

  it('deve exibir formulário passwordless quando tab código é selecionada', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const codeTab = screen.getByText(/Código/i);
    await user.click(codeTab);

    await waitFor(() => {
      expect(screen.getByTestId('passwordless-login-form')).toBeInTheDocument();
    });
  });

  it('deve exibir botões de OAuth quando tab social é selecionada', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const socialTab = screen.getByText(/Social/i);
    await user.click(socialTab);

    await waitFor(() => {
      expect(screen.getByText(/Continuar com Google/i)).toBeInTheDocument();
      expect(screen.getByText(/Continuar com GitHub/i)).toBeInTheDocument();
    });
  });

  it('deve redirecionar se já estiver autenticado', () => {
    mockUseAuth.isAuthenticated = true;
    render(<LoginPage />);
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });

  it('deve exibir loading quando autenticação está carregando', () => {
    mockUseAuth.loading = true;
    render(<LoginPage />);
    // O componente deve mostrar um spinner de loading
    expect(screen.queryByText('Bem-vindo de Volta')).not.toBeInTheDocument();
  });

  it('deve exibir link para registro', () => {
    render(<LoginPage />);
    const registerLink = screen.getByText(/Criar conta/i);
    expect(registerLink).toBeInTheDocument();
    expect(registerLink.closest('a')).toHaveAttribute(
      'href',
      '/dashboard/login/register'
    );
  });

  it('deve exibir link para recuperação de senha', () => {
    render(<LoginPage />);
    const forgotPasswordLink = screen.getByText(/Esqueceu a senha?/i);
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(forgotPasswordLink.closest('a')).toHaveAttribute(
      'href',
      '/dashboard/login/forgot-password'
    );
  });

  it('deve validar campos obrigatórios no login tradicional', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const submitButton = screen.getByText(/Entrar/i);
    await user.click(submitButton);

    // O formulário deve mostrar erro de validação
    expect(mockUseAuth.login).not.toHaveBeenCalled();
  });

  it('deve chamar login quando formulário é submetido com credenciais válidas', async () => {
    const user = userEvent.setup();
    mockUseAuth.login.mockResolvedValue(true);

    render(<LoginPage />);

    const usernameInput = screen.getByLabelText(/Usuário/i);
    const passwordInput = screen.getByLabelText(/Senha/i);
    const submitButton = screen.getByText(/Entrar/i);

    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, 'testpass');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockUseAuth.login).toHaveBeenCalledWith('testuser', 'testpass');
    });
  });

  it('deve chamar loginWithGoogle quando botão Google é clicado', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const socialTab = screen.getByText(/Social/i);
    await user.click(socialTab);

    await waitFor(() => {
      const googleButton = screen.getByText(/Continuar com Google/i);
      expect(googleButton).toBeInTheDocument();
    });

    const googleButton = screen.getByText(/Continuar com Google/i);
    await user.click(googleButton);

    expect(mockUseAuth.loginWithGoogle).toHaveBeenCalled();
  });

  it('deve chamar loginWithGitHub quando botão GitHub é clicado', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const socialTab = screen.getByText(/Social/i);
    await user.click(socialTab);

    await waitFor(() => {
      const githubButton = screen.getByText(/Continuar com GitHub/i);
      expect(githubButton).toBeInTheDocument();
    });

    const githubButton = screen.getByText(/Continuar com GitHub/i);
    await user.click(githubButton);

    expect(mockUseAuth.loginWithGitHub).toHaveBeenCalled();
  });
});
