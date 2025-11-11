/**
 * Testes para página de Confirmação de Email
 */

import ConfirmEmailPage from '@/app/dashboard/login/confirm-email/page';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

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

// Mock do authService
const mockConfirmEmail = jest.fn().mockResolvedValue({ success: true });
const mockResendConfirmationCode = jest.fn().mockResolvedValue({ success: true });

jest.mock('@/lib/api/services/auth.service', () => ({
  authService: {
    confirmEmail: mockConfirmEmail,
    resendConfirmationCode: mockResendConfirmationCode,
  },
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
    expect(screen.getByText('Confirmar Email')).toBeInTheDocument();
  });

  it('deve exibir email da query string', () => {
    render(<ConfirmEmailPage />);
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  });

  it('deve exibir campo para código de verificação', () => {
    render(<ConfirmEmailPage />);
    expect(screen.getByPlaceholderText(/Código de 6 dígitos/i)).toBeInTheDocument();
  });

  it('deve exibir botão para confirmar email', () => {
    render(<ConfirmEmailPage />);
    expect(screen.getByText(/Confirmar Email/i)).toBeInTheDocument();
  });

  it('deve exibir botão para reenviar código', () => {
    render(<ConfirmEmailPage />);
    expect(screen.getByText(/Reenviar código/i)).toBeInTheDocument();
  });

  it('deve validar código obrigatório', async () => {
    const user = userEvent.setup();
    render(<ConfirmEmailPage />);

    const submitButton = screen.getByText(/Confirmar Email/i);
    await user.click(submitButton);

    expect(mockConfirmEmail).not.toHaveBeenCalled();
  });

  it('deve chamar confirmEmail quando código é submetido', async () => {
    const user = userEvent.setup();
    render(<ConfirmEmailPage />);

    const codeInput = screen.getByPlaceholderText(/Código de 6 dígitos/i);
    const submitButton = screen.getByText(/Confirmar Email/i);

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

    const codeInput = screen.getByPlaceholderText(/Código de 6 dígitos/i);
    const submitButton = screen.getByText(/Confirmar Email/i);

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

    const codeInput = screen.getByPlaceholderText(/Código de 6 dígitos/i);
    const submitButton = screen.getByText(/Confirmar Email/i);

    await user.type(codeInput, '123456');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Email confirmado/i)).toBeInTheDocument();
    });
  });

  it('deve chamar resendConfirmationCode quando reenviar é clicado', async () => {
    const user = userEvent.setup();
    render(<ConfirmEmailPage />);

    const resendButton = screen.getByText(/Reenviar código/i);
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

    const codeInput = screen.getByPlaceholderText(/Código de 6 dígitos/i);
    const submitButton = screen.getByText(/Confirmar Email/i);

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

    const codeInput = screen.getByPlaceholderText(/Código de 6 dígitos/i);
    const submitButton = screen.getByText(/Confirmar Email/i);

    await user.type(codeInput, '123456');
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/O código de verificação expirou/i)
      ).toBeInTheDocument();
    });
  });
});

