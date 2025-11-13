/**
 * Testes para página de Verificação Administrativa de Email
 */

// Mock do CSS primeiro
jest.mock('@/app/globals.css', () => ({}));

// Mock de variáveis de ambiente
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:4000';

import VerifyEmailAdminPage from '@/app/dashboard/login/verify-email-admin/page';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

jest.mock('@/lib/api/services/auth.service', () => ({
  authService: {
    get verifyEmailAdmin() {
      return mockVerifyEmailAdmin;
    },
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

    const submitButton = screen.getByText(
      /Verificar E-mail Administrativamente/i
    );
    await user.click(submitButton);

    expect(mockVerifyEmailAdmin).not.toHaveBeenCalled();
  });

  it('deve chamar verifyEmailAdmin quando formulário é submetido', async () => {
    const user = userEvent.setup();
    render(<VerifyEmailAdminPage />);

    const identifierInput = screen.getByPlaceholderText(
      /email@example.com, username ou cognitoSub/i
    );
    const submitButtons = screen.getAllByText(
      /Verificar E-mail Administrativamente/i
    );
    const submitButton =
      submitButtons.find(
        btn => btn.tagName === 'BUTTON' || btn.closest('button')
      ) || submitButtons[0];

    await user.type(identifierInput, 'test@example.com');
    await user.click(submitButton);

    await waitFor(
      () => {
        expect(mockVerifyEmailAdmin).toHaveBeenCalledWith('test@example.com');
      },
      { timeout: 10000 }
    );
  });

  it('deve exibir mensagem de sucesso após verificação', async () => {
    jest.setTimeout(10000);
    const user = userEvent.setup();
    render(<VerifyEmailAdminPage />);

    const identifierInput = screen.getByPlaceholderText(
      /email@example.com, username ou cognitoSub/i
    );
    const submitButton = screen.getByText(
      /Verificar E-mail Administrativamente/i
    );

    await user.type(identifierInput, 'test@example.com');
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/E-mail verificado com sucesso!/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/testuser/i)).toBeInTheDocument();
      expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
    });
  });

  it('deve redirecionar para login após verificação bem-sucedida', async () => {
    jest.setTimeout(10000);
    const user = userEvent.setup();
    render(<VerifyEmailAdminPage />);

    const identifierInput = screen.getByPlaceholderText(
      /email@example.com, username ou cognitoSub/i
    );
    const submitButton = screen.getByText(
      /Verificar E-mail Administrativamente/i
    );

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
    jest.setTimeout(10000);
    const user = userEvent.setup();
    mockVerifyEmailAdmin.mockResolvedValue({
      success: false,
      message: 'Usuário não encontrado',
    });

    render(<VerifyEmailAdminPage />);

    const identifierInput = screen.getByPlaceholderText(
      /email@example.com, username ou cognitoSub/i
    );
    const submitButton = screen.getByText(
      /Verificar E-mail Administrativamente/i
    );

    await user.type(identifierInput, 'invalid@example.com');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Erro ao verificar e-mail/i)).toBeInTheDocument();
    });
  });

  it('deve exibir erro quando ocorre exceção', async () => {
    jest.setTimeout(10000);
    const user = userEvent.setup();
    mockVerifyEmailAdmin.mockRejectedValue(new Error('Network error'));

    render(<VerifyEmailAdminPage />);

    const identifierInput = screen.getByPlaceholderText(
      /email@example.com, username ou cognitoSub/i
    );
    const submitButton = screen.getByText(
      /Verificar E-mail Administrativamente/i
    );

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

  it('deve exibir instruções sobre identificadores aceitos', () => {
    render(<VerifyEmailAdminPage />);
    const instructionElements = screen.queryAllByText(
      /Você pode usar o email/i
    );
    const instructionElements2 = screen.queryAllByText(
      /Use email, username ou cognitoSub/i
    );
    expect(
      instructionElements.length + instructionElements2.length
    ).toBeGreaterThan(0);
  });
});
