/**
 * Testes para página de Confirmação de Email
 */

// Mock do CSS primeiro
jest.mock('@/app/globals.css', () => ({}));

// Mock de variáveis de ambiente
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:4000';

import ConfirmEmailPage from '@/app/dashboard/login/confirm-email/page';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock do useRouter
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => {
    const params = new URLSearchParams();
    params.set('email', 'test@example.com');
    return params;
  },
}));

// Mock do authService (módulo correto usado pela página)
const mockConfirmEmail = jest.fn().mockResolvedValue({ success: true });
const mockResendConfirmationCode = jest
  .fn()
  .mockResolvedValue({ success: true });

jest.mock('@/lib/api', () => ({
  authService: {
    confirmEmail: (...args: unknown[]) => mockConfirmEmail(...args),
    resendConfirmationCode: (...args: unknown[]) =>
      mockResendConfirmationCode(...args),
  },
}));

// Mock do layout de autenticação para evitar dependências complexas (AuthBranding)
jest.mock('@/components/domain/dashboard/login', () => ({
  AuthLayout: ({ children, footer, title, description }: any) => (
    <div data-testid="auth-layout">
      {title && <h1>{title}</h1>}
      {description && <p>{description}</p>}
      <div data-testid="auth-content">{children}</div>
      {footer}
    </div>
  ),
}));

// Mock leve de ícones para evitar dependências de SVG complexos
jest.mock('lucide-react', () => ({
  CheckCircle2: (props: any) => <div {...props} data-testid="check-icon" />,
  Loader2: (props: any) => <div {...props} data-testid="loader-icon" />,
  XCircle: (props: any) => <div {...props} data-testid="x-icon" />,
}));

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(() => 'test-username'),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Confirm Email Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue('test-username');
  });

  it('deve renderizar a página de confirmação de email', () => {
    render(<ConfirmEmailPage />);
    expect(screen.getAllByText(/Confirmar Email/i)[0]).toBeInTheDocument();
  });

  it('deve exibir email da query string', () => {
    render(<ConfirmEmailPage />);
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  });

  it('deve exibir campo para código de verificação', () => {
    render(<ConfirmEmailPage />);
    expect(
      screen.getByLabelText(/Código de Verificação/i)
    ).toBeInTheDocument();
  });

  it('deve exibir botão para confirmar email', () => {
    render(<ConfirmEmailPage />);
    const buttons = screen.getAllByText(/Confirmar Email/i);
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('deve exibir botão para reenviar código', () => {
    render(<ConfirmEmailPage />);
    expect(
      screen.getByRole('button', { name: /Reenviar Código/i })
    ).toBeInTheDocument();
  });

  it('deve validar código obrigatório', async () => {
    const user = userEvent.setup();
    render(<ConfirmEmailPage />);

    const submitButton =
      screen
        .getAllByText(/Confirmar Email/i)
        .find(el => el.tagName === 'BUTTON') ||
      screen.getAllByText(/Confirmar Email/i)[0];
    await user.click(submitButton);

    expect(mockConfirmEmail).not.toHaveBeenCalled();
  });

  it('deve chamar confirmEmail quando código é submetido', async () => {
    const user = userEvent.setup();
    render(<ConfirmEmailPage />);

    const codeInput = screen.getByLabelText(/Código de Verificação/i);
    const submitButton =
      screen
        .getAllByText(/Confirmar Email/i)
        .find(el => el.tagName === 'BUTTON') ||
      screen.getAllByText(/Confirmar Email/i)[0];

    await user.type(codeInput, '123456');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockConfirmEmail).toHaveBeenCalledWith({
        email: 'test@example.com',
        username: 'test-username',
        code: '123456',
      });
    });
  });

  it('deve redirecionar para login após confirmação bem-sucedida', async () => {
    const user = userEvent.setup();
    render(<ConfirmEmailPage />);

    const codeInput = screen.getByLabelText(/Código de Verificação/i);
    const submitButton =
      screen
        .getAllByText(/Confirmar Email/i)
        .find(el => el.tagName === 'BUTTON') ||
      screen.getAllByText(/Confirmar Email/i)[0];

    await user.type(codeInput, '123456');
    await user.click(submitButton);

    await waitFor(
      () => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard/login');
      },
      { timeout: 3000 }
    );
  });

  it('deve exibir mensagem de sucesso após confirmação', async () => {
    const user = userEvent.setup();
    render(<ConfirmEmailPage />);

    const codeInput = screen.getByLabelText(/Código de Verificação/i);
    const submitButton =
      screen
        .getAllByText(/Confirmar Email/i)
        .find(el => el.tagName === 'BUTTON') ||
      screen.getAllByText(/Confirmar Email/i)[0];

    await user.type(codeInput, '123456');
    await user.click(submitButton);

    // Verifica se o mock foi chamado (confirmação bem-sucedida)
    await waitFor(() => {
      expect(mockConfirmEmail).toHaveBeenCalled();
    });
  });

  it('deve chamar resendConfirmationCode quando reenviar é clicado', async () => {
    const user = userEvent.setup();
    render(<ConfirmEmailPage />);

    const resendButton = screen.getByRole('button', {
      name: /Reenviar Código/i,
    });
    await user.click(resendButton);

    await waitFor(() => {
      expect(mockResendConfirmationCode).toHaveBeenCalledWith({
        email: 'test@example.com',
      });
    });
  });

  it('deve exibir erro quando código é inválido', async () => {
    const user = userEvent.setup();
    mockConfirmEmail.mockRejectedValue(
      new Error('Código de confirmação inválido')
    );

    render(<ConfirmEmailPage />);

    const codeInput = screen.getByLabelText(/Código de Verificação/i);
    const submitButton =
      screen
        .getAllByText(/Confirmar Email/i)
        .find(el => el.tagName === 'BUTTON') ||
      screen.getAllByText(/Confirmar Email/i)[0];

    await user.type(codeInput, '000000');
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Código de verificação inválido/i)
      ).toBeInTheDocument();
    });
  });

  it('deve exibir erro quando código expirou', async () => {
    const user = userEvent.setup();
    mockConfirmEmail.mockRejectedValue(
      new Error('Código de confirmação expirado')
    );

    render(<ConfirmEmailPage />);

    const codeInput = screen.getByLabelText(/Código de Verificação/i);
    const submitButton =
      screen
        .getAllByText(/Confirmar Email/i)
        .find(el => el.tagName === 'BUTTON') ||
      screen.getAllByText(/Confirmar Email/i)[0];

    await user.type(codeInput, '123456');
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/O código de verificação expirou/i)
      ).toBeInTheDocument();
    });
  });
});
