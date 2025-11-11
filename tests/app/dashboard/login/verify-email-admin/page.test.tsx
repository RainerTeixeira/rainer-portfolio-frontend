/**
 * Testes para página de Verificação Administrativa de Email
 */

import VerifyEmailAdminPage from '@/app/dashboard/login/verify-email-admin/page';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

// Mock do useRouter
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock do authService
const mockVerifyEmailAdmin = jest.fn().mockResolvedValue({
  success: true,
  data: {
    username: 'testuser',
    email: 'test@example.com',
  },
});

jest.mock('@/lib/api', () => ({
  authService: {
    verifyEmailAdmin: mockVerifyEmailAdmin,
  },
}));

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

describe('Verify Email Admin Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockVerifyEmailAdmin.mockResolvedValue({
      success: true,
      data: {
        username: 'testuser',
        email: 'test@example.com',
      },
    });
  });

  it('deve renderizar a página de verificação administrativa', () => {
    render(<VerifyEmailAdminPage />);
    expect(screen.getByText('Verificação Administrativa')).toBeInTheDocument();
  });

  it('deve exibir descrição da página', () => {
    render(<VerifyEmailAdminPage />);
    expect(
      screen.getByText(
        /Verifique o e-mail e confirme o signup de um usuário administrativamente/i
      )
    ).toBeInTheDocument();
  });

  it('deve exibir campo para identificador do usuário', () => {
    render(<VerifyEmailAdminPage />);
    expect(
      screen.getByPlaceholderText(/email@example.com, username ou cognitoSub/i)
    ).toBeInTheDocument();
  });

  it('deve exibir botão para verificar email', () => {
    render(<VerifyEmailAdminPage />);
    expect(
      screen.getByText(/Verificar E-mail Administrativamente/i)
    ).toBeInTheDocument();
  });

  it('deve validar campo obrigatório', async () => {
    const user = userEvent.setup();
    render(<VerifyEmailAdminPage />);

    const submitButton = screen.getByText(/Verificar E-mail Administrativamente/i);
    await user.click(submitButton);

    expect(mockVerifyEmailAdmin).not.toHaveBeenCalled();
  });

  it('deve chamar verifyEmailAdmin quando formulário é submetido', async () => {
    const user = userEvent.setup();
    render(<VerifyEmailAdminPage />);

    const identifierInput = screen.getByPlaceholderText(
      /email@example.com, username ou cognitoSub/i
    );
    const submitButton = screen.getByText(/Verificar E-mail Administrativamente/i);

    await user.type(identifierInput, 'test@example.com');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockVerifyEmailAdmin).toHaveBeenCalledWith('test@example.com');
    });
  });

  it('deve exibir mensagem de sucesso após verificação', async () => {
    const user = userEvent.setup();
    render(<VerifyEmailAdminPage />);

    const identifierInput = screen.getByPlaceholderText(
      /email@example.com, username ou cognitoSub/i
    );
    const submitButton = screen.getByText(/Verificar E-mail Administrativamente/i);

    await user.type(identifierInput, 'test@example.com');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/E-mail verificado com sucesso!/i)).toBeInTheDocument();
      expect(screen.getByText(/testuser/i)).toBeInTheDocument();
      expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
    });
  });

  it('deve redirecionar para login após verificação bem-sucedida', async () => {
    const user = userEvent.setup();
    render(<VerifyEmailAdminPage />);

    const identifierInput = screen.getByPlaceholderText(
      /email@example.com, username ou cognitoSub/i
    );
    const submitButton = screen.getByText(/Verificar E-mail Administrativamente/i);

    await user.type(identifierInput, 'test@example.com');
    await user.click(submitButton);

    await waitFor(
      () => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard/login');
      },
      { timeout: 4000 }
    );
  });

  it('deve exibir erro quando verificação falha', async () => {
    const user = userEvent.setup();
    mockVerifyEmailAdmin.mockResolvedValue({
      success: false,
      message: 'Usuário não encontrado',
    });

    render(<VerifyEmailAdminPage />);

    const identifierInput = screen.getByPlaceholderText(
      /email@example.com, username ou cognitoSub/i
    );
    const submitButton = screen.getByText(/Verificar E-mail Administrativamente/i);

    await user.type(identifierInput, 'invalid@example.com');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Erro ao verificar e-mail/i)).toBeInTheDocument();
    });
  });

  it('deve exibir erro quando ocorre exceção', async () => {
    const user = userEvent.setup();
    mockVerifyEmailAdmin.mockRejectedValue(new Error('Network error'));

    render(<VerifyEmailAdminPage />);

    const identifierInput = screen.getByPlaceholderText(
      /email@example.com, username ou cognitoSub/i
    );
    const submitButton = screen.getByText(/Verificar E-mail Administrativamente/i);

    await user.type(identifierInput, 'test@example.com');
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Erro ao verificar e-mail administrativamente/i)
      ).toBeInTheDocument();
    });
  });

  it('deve exibir link para voltar ao login', () => {
    render(<VerifyEmailAdminPage />);
    const backLink = screen.getByText(/Voltar para login/i);
    expect(backLink).toBeInTheDocument();
    expect(backLink.closest('a')).toHaveAttribute('href', '/dashboard/login');
  });

  it('deve exibir instruções sobre identificadores aceitos', () => {
    render(<VerifyEmailAdminPage />);
    expect(
      screen.getByText(/Você pode usar o email, username ou cognitoSub/i)
    ).toBeInTheDocument();
  });
});

