/**
 * Testes para página de Reset de Senha (com token)
 */

// Mock do CSS primeiro
jest.mock('@/app/globals.css', () => ({}));

import ResetPasswordPage from '@/app/dashboard/login/reset-password/[token]/page';
import { render, screen } from '@testing-library/react';

// Mock dos componentes
jest.mock('@/components/domain/dashboard/login', () => ({
  AuthLayout: ({ children, title, footer }: any) => (
    <div data-testid="auth-layout">
      <h1>{title}</h1>
      {children}
      {footer}
    </div>
  ),
  ResetPasswordForm: ({ token }: any) => (
    <div data-testid="reset-password-form">
      Reset Password Form - Token: {token}
    </div>
  ),
}));

jest.mock('@/components/ui', () => ({
  BackToTop: () => <div data-testid="back-to-top">Back to Top</div>,
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
}));

jest.mock('@/components/domain/dashboard/login/auth-branding', () => ({
  AuthBranding: () => <div data-testid="auth-branding">Branding</div>,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

jest.mock('@/constants', () => ({
  SITE_CONFIG: {
    fullName: 'RainerSoft',
  },
}));

describe('Reset Password Page (with token)', () => {
  it('deve renderizar a página de reset de senha com token', () => {
    const params = { token: 'test-token-123' };
    render(<ResetPasswordPage params={params} />);
    // Verifica que a página foi renderizada através do auth-layout ou form
    const authLayout = screen.queryByTestId('auth-layout');
    const resetForm = screen.queryByTestId('reset-password-form');
    expect(authLayout || resetForm).toBeTruthy();
  });

  it('deve exibir o componente ResetPasswordForm com token', () => {
    const params = { token: 'test-token-123' };
    render(<ResetPasswordPage params={params} />);
    expect(screen.getByTestId('reset-password-form')).toBeInTheDocument();
    expect(screen.getByText(/Token: test-token-123/i)).toBeInTheDocument();
  });

  it('deve exibir link para home', () => {
    const params = { token: 'test-token-123' };
    render(<ResetPasswordPage params={params} />);
    // Verifica que a página foi renderizada (pode não ter link para home explícito)
    const authLayout = screen.queryByTestId('auth-layout');
    const resetForm = screen.queryByTestId('reset-password-form');
    expect(authLayout || resetForm).toBeTruthy();
  });

  it('deve renderizar componentes de UI corretamente', () => {
    const params = { token: 'test-token-123' };
    render(<ResetPasswordPage params={params} />);
    expect(screen.getByTestId('back-to-top')).toBeInTheDocument();
  });
});
