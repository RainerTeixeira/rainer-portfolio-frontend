/**
 * Testes para página de Recuperação de Senha
 */

// Mock do CSS primeiro
jest.mock('@/app/globals.css', () => ({}));

import ForgotPasswordPage from '@/app/dashboard/login/forgot-password/page';
import { render, screen } from '@testing-library/react';

// Mock dos componentes
jest.mock('@/components/dashboard/login', () => ({
  AuthLayout: ({ children, title, description, footer }: any) => (
    <div data-testid="auth-layout">
      <h1>{title}</h1>
      {description && (
        <p data-testid="auth-description">{description}</p>
      )}
      {children}
      {footer}
    </div>
  ),
  ForgotPasswordForm: () => (
    <div data-testid="forgot-password-form">Forgot Password Form</div>
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

jest.mock('@/components/dashboard/login/auth-branding', () => ({
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

describe('Forgot Password Page', () => {
  it('deve renderizar a página de recuperação de senha', () => {
    render(<ForgotPasswordPage />);
    // Garante que o layout de autenticação foi renderizado
    expect(screen.getByTestId('auth-layout')).toBeInTheDocument();
  });

  it('deve exibir o componente ForgotPasswordForm', () => {
    render(<ForgotPasswordPage />);
    expect(screen.getByTestId('forgot-password-form')).toBeInTheDocument();
  });

  it('deve exibir link para home', () => {
    render(<ForgotPasswordPage />);
    const loginLinks = screen.getAllByRole('link', {
      name: /Voltar para login/i,
    });
    expect(loginLinks[0]).toHaveAttribute('href', '/dashboard/login');
  });

  it('deve renderizar componentes de UI corretamente', () => {
    render(<ForgotPasswordPage />);
    // Verifica que pelo menos um componente foi renderizado
    const backToTop = screen.queryByTestId('back-to-top');
    const authLayout = screen.queryByTestId('auth-layout');
    expect(backToTop || authLayout).toBeTruthy();
  });
});
