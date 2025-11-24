/**
 * Testes para página de Reset de Senha (com query params)
 */

// Mock do CSS primeiro
jest.mock('@/app/globals.css', () => ({}));

// Mock de variáveis de ambiente
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:4000';

// Mock do authService ANTES de qualquer import
const mockResetPassword = jest.fn().mockResolvedValue({ success: true });

jest.mock('@/lib/api', () => ({
  authService: {
    resetPassword: (...args: unknown[]) => mockResetPassword(...args),
    checkNameAvailability: jest.fn().mockResolvedValue({ available: true }),
    checkNicknameAvailability: jest
      .fn()
      .mockResolvedValue({ available: true }),
  },
}));

// Mock do layout e componentes de login para evitar dependências de animação/tokens
jest.mock('@/components/dashboard/login', () => ({
  AuthLayout: ({ children, footer, title, description }: any) => (
    <div data-testid="auth-layout">
      {title && <h1>{title}</h1>}
      {description && <p>{description}</p>}
      <div data-testid="auth-content">{children}</div>
      {footer}
    </div>
  ),
  PasswordInput: ({ value, onChange, ...props }: any) => (
    <input
      data-testid="password-input"
      value={value}
      onChange={(e: any) => onChange(e.target.value)}
      {...props}
    />
  ),
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
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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

// Mock de ícones do lucide-react
jest.mock('lucide-react', () => ({
  AlertCircle: (props: any) => <div {...props} data-testid="alert-icon" />,
  ArrowLeft: (props: any) => <div {...props} data-testid="arrow-icon" />,
  CheckCircle2: (props: any) => <div {...props} data-testid="check-icon" />,
  Loader2: (props: any) => <div {...props} data-testid="loader-icon" />,
  Eye: (props: any) => <div {...props} data-testid="eye-icon" />,
  EyeOff: (props: any) => <div {...props} data-testid="eyeoff-icon" />,
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
    render(<ResetPasswordPage />);

    const submitButtons = screen.getAllByText(/Redefinir Senha/i);
    const submitButton =
      submitButtons.find(
        btn => btn.tagName === 'BUTTON' || btn.closest('button')
      ) || submitButtons[0];

    fireEvent.click(submitButton);

    expect(mockResetPassword).not.toHaveBeenCalled();
  });

  it('deve validar que senha tem mínimo de 8 caracteres', async () => {
    render(<ResetPasswordPage />);

    const newPasswordInput = screen.getByLabelText(/Nova Senha/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirmar Senha/i);
    const submitButtons = screen.getAllByText(/Redefinir Senha/i);
    const submitButton =
      submitButtons.find(
        btn => btn.tagName === 'BUTTON' || btn.closest('button')
      ) || submitButtons[0];

    fireEvent.change(newPasswordInput, { target: { value: '123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '123' } });
    fireEvent.click(submitButton);

    expect(mockResetPassword).not.toHaveBeenCalled();
  });

  it('deve validar que senhas coincidem', async () => {
    render(<ResetPasswordPage />);

    const newPasswordInput = screen.getByLabelText(/Nova Senha/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirmar Senha/i);
    const submitButtons = screen.getAllByText(/Redefinir Senha/i);
    const submitButton =
      submitButtons.find(
        btn => btn.tagName === 'BUTTON' || btn.closest('button')
      ) || submitButtons[0];

    fireEvent.change(newPasswordInput, {
      target: { value: 'newpassword123' },
    });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'differentpassword' },
    });
    fireEvent.click(submitButton);

    expect(mockResetPassword).not.toHaveBeenCalled();
  });

  it('deve chamar resetPassword quando formulário é submetido corretamente', async () => {
    render(<ResetPasswordPage />);

    const newPasswordInput = screen.getByLabelText(/Nova Senha/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirmar Senha/i);
    const submitButtons = screen.getAllByText(/Redefinir Senha/i);
    const submitButton =
      submitButtons.find(
        btn => btn.tagName === 'BUTTON' || btn.closest('button')
      ) || submitButtons[0];

    fireEvent.change(newPasswordInput, {
      target: { value: 'newpassword123' },
    });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'newpassword123' },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        code: '123456',
        newPassword: 'newpassword123',
      });
    });
  });

  it('deve redirecionar para login após reset bem-sucedido', async () => {
    render(<ResetPasswordPage />);

    const newPasswordInput = screen.getByLabelText(/Nova Senha/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirmar Senha/i);
    const submitButtons = screen.getAllByText(/Redefinir Senha/i);
    const submitButton =
      submitButtons.find(
        btn => btn.tagName === 'BUTTON' || btn.closest('button')
      ) || submitButtons[0];

    fireEvent.change(newPasswordInput, {
      target: { value: 'newpassword123' },
    });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'newpassword123' },
    });
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard/login');
      },
      { timeout: 3000 }
    );
  });

  it('deve exibir mensagem de sucesso após reset bem-sucedido', async () => {
    render(<ResetPasswordPage />);

    const newPasswordInput = screen.getByLabelText(/Nova Senha/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirmar Senha/i);
    const submitButtons = screen.getAllByText(/Redefinir Senha/i);
    const submitButton =
      submitButtons.find(
        btn => btn.tagName === 'BUTTON' || btn.closest('button')
      ) || submitButtons[0];

    fireEvent.change(newPasswordInput, {
      target: { value: 'newpassword123' },
    });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'newpassword123' },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Senha redefinida!/i)).toBeInTheDocument();
    });
  });

  it('deve exibir erro quando código é inválido', async () => {
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

    fireEvent.change(newPasswordInput, {
      target: { value: 'newpassword123' },
    });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'newpassword123' },
    });
    fireEvent.click(submitButton);

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
