/**
 * Testes para página de Reset de Senha (com query params)
 */

// Mock do CSS primeiro
jest.mock('@/app/globals.css', () => ({}));

// Mock de variáveis de ambiente
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:4000';

// Mock do authService ANTES de qualquer import
const mockResetPassword = jest.fn().mockResolvedValue({ success: true });

jest.mock('@/lib/api/services/auth.service', () => ({
  authService: {
    get resetPassword() {
      return mockResetPassword;
    },
    checkNameAvailability: jest.fn().mockResolvedValue({ available: true }),
    checkNicknameAvailability: jest.fn().mockResolvedValue({ available: true }),
  },
}));

// Mock do useRouter
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => {
    const params = new URLSearchParams();
    params.set('email', 'test@example.com');
    params.set('code', '123456');
    return params;
  },
}));

import ResetPasswordPage from '@/app/dashboard/login/reset-password/page';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Reset Password Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockResetPassword.mockResolvedValue({ success: true });
  });

  it('deve renderizar a página de reset de senha', () => {
    render(<ResetPasswordPage />);
    const elements = screen.queryAllByText(/Redefinir Senha/i);
    expect(elements.length).toBeGreaterThan(0);
  });

  it('deve exibir email da query string', () => {
    render(<ResetPasswordPage />);
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  });

  it('deve exibir campo para código de verificação pré-preenchido', () => {
    render(<ResetPasswordPage />);
    const codeInput = screen.getByPlaceholderText(/Código de 6 dígitos/i);
    expect(codeInput).toHaveValue('123456');
  });

  it('deve exibir campos para nova senha e confirmação', () => {
    render(<ResetPasswordPage />);
    expect(screen.getByLabelText(/Nova Senha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirmar Senha/i)).toBeInTheDocument();
  });

  it('deve validar campos obrigatórios', async () => {
    const user = userEvent.setup();
    render(<ResetPasswordPage />);

    const submitButtons = screen.getAllByText(/Redefinir Senha/i);
    const submitButton =
      submitButtons.find(
        btn => btn.tagName === 'BUTTON' || btn.closest('button')
      ) || submitButtons[0];
    await user.click(submitButton);

    expect(mockResetPassword).not.toHaveBeenCalled();
  });

  it('deve validar que senha tem mínimo de 8 caracteres', async () => {
    const user = userEvent.setup();
    render(<ResetPasswordPage />);

    const newPasswordInput = screen.getByLabelText(/Nova Senha/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirmar Senha/i);
    const submitButtons = screen.getAllByText(/Redefinir Senha/i);
    const submitButton =
      submitButtons.find(
        btn => btn.tagName === 'BUTTON' || btn.closest('button')
      ) || submitButtons[0];

    await user.type(newPasswordInput, '123');
    await user.type(confirmPasswordInput, '123');
    await user.click(submitButton);

    expect(mockResetPassword).not.toHaveBeenCalled();
  });

  it('deve validar que senhas coincidem', async () => {
    const user = userEvent.setup();
    render(<ResetPasswordPage />);

    const newPasswordInput = screen.getByLabelText(/Nova Senha/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirmar Senha/i);
    const submitButtons = screen.getAllByText(/Redefinir Senha/i);
    const submitButton =
      submitButtons.find(
        btn => btn.tagName === 'BUTTON' || btn.closest('button')
      ) || submitButtons[0];

    await user.type(newPasswordInput, 'newpassword123');
    await user.type(confirmPasswordInput, 'differentpassword');
    await user.click(submitButton);

    expect(mockResetPassword).not.toHaveBeenCalled();
  });

  it('deve chamar resetPassword quando formulário é submetido corretamente', async () => {
    const user = userEvent.setup();
    render(<ResetPasswordPage />);

    const newPasswordInput = screen.getByLabelText(/Nova Senha/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirmar Senha/i);
    const submitButtons = screen.getAllByText(/Redefinir Senha/i);
    const submitButton =
      submitButtons.find(
        btn => btn.tagName === 'BUTTON' || btn.closest('button')
      ) || submitButtons[0];

    await user.type(newPasswordInput, 'newpassword123');
    await user.type(confirmPasswordInput, 'newpassword123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        code: '123456',
        newPassword: 'newpassword123',
      });
    });
  });

  it('deve redirecionar para login após reset bem-sucedido', async () => {
    const user = userEvent.setup();
    render(<ResetPasswordPage />);

    const newPasswordInput = screen.getByLabelText(/Nova Senha/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirmar Senha/i);
    const submitButtons = screen.getAllByText(/Redefinir Senha/i);
    const submitButton =
      submitButtons.find(
        btn => btn.tagName === 'BUTTON' || btn.closest('button')
      ) || submitButtons[0];

    await user.type(newPasswordInput, 'newpassword123');
    await user.type(confirmPasswordInput, 'newpassword123');
    await user.click(submitButton);

    await waitFor(
      () => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard/login');
      },
      { timeout: 3000 }
    );
  });

  it('deve exibir mensagem de sucesso após reset bem-sucedido', async () => {
    const user = userEvent.setup();
    render(<ResetPasswordPage />);

    const newPasswordInput = screen.getByLabelText(/Nova Senha/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirmar Senha/i);
    const submitButtons = screen.getAllByText(/Redefinir Senha/i);
    const submitButton =
      submitButtons.find(
        btn => btn.tagName === 'BUTTON' || btn.closest('button')
      ) || submitButtons[0];

    await user.type(newPasswordInput, 'newpassword123');
    await user.type(confirmPasswordInput, 'newpassword123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Senha redefinida!/i)).toBeInTheDocument();
    });
  });

  it('deve exibir erro quando código é inválido', async () => {
    const user = userEvent.setup();
    mockResetPassword.mockRejectedValue(
      new Error('Código de verificação inválido')
    );

    render(<ResetPasswordPage />);

    const newPasswordInput = screen.getByLabelText(/Nova Senha/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirmar Senha/i);
    const submitButtons = screen.getAllByText(/Redefinir Senha/i);
    const submitButton =
      submitButtons.find(
        btn => btn.tagName === 'BUTTON' || btn.closest('button')
      ) || submitButtons[0];

    await user.type(newPasswordInput, 'newpassword123');
    await user.type(confirmPasswordInput, 'newpassword123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Código de verificação inválido/i)
      ).toBeInTheDocument();
    });
  });

  it('deve exibir link para voltar ao login', () => {
    render(<ResetPasswordPage />);
    const backLinks = screen.queryAllByText(/Voltar para login/i);
    const backLinks2 = screen.queryAllByText(/Voltar/i);
    const totalBackLinks = backLinks.length + backLinks2.length;
    expect(totalBackLinks).toBeGreaterThan(0);
    const backLink =
      backLinks.find(link => link.closest('a')) ||
      backLinks2.find(link => link.closest('a'));
    if (backLink && backLink.closest('a')) {
      expect(backLink.closest('a')).toHaveAttribute('href', '/dashboard/login');
    }
  });
});
