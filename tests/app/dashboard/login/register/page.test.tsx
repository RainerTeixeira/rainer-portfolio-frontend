/**
 * Testes para página de Registro
 */

// Mock do CSS primeiro
jest.mock('@/app/globals.css', () => ({}));

// Mock das fontes do Next.js
jest.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-inter' }),
  Orbitron: () => ({ variable: '--font-orbitron' }),
  Rajdhani: () => ({ variable: '--font-rajdhani' }),
}));

import RegisterPage from '@/app/dashboard/login/register/page';
import { render, screen } from '@testing-library/react';

// Mock dos componentes
jest.mock('@/components/domain/dashboard/login', () => ({
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
  RegisterForm: () => <div data-testid="register-form">Register Form</div>,
  TermsDialog: ({ children, type }: any) => (
    <div data-testid={`terms-dialog-${type}`}>{children}</div>
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

describe('Register Page', () => {
  it('deve renderizar a página de registro', () => {
    render(<RegisterPage />);
    // Garante que o layout de autenticação foi renderizado
    expect(screen.getByTestId('auth-layout')).toBeInTheDocument();
  });

  it('deve exibir título da página', () => {
    render(<RegisterPage />);
    expect(screen.getByText(/Criar conta/i)).toBeInTheDocument();
  });

  it('deve exibir descrição da página', () => {
    render(<RegisterPage />);
    const description = screen.getByTestId('auth-description');
    expect(description).toHaveTextContent(
      /Preencha os dados abaixo para criar sua conta/i
    );
  });

  it('deve exibir o componente RegisterForm', () => {
    render(<RegisterPage />);
    expect(screen.getByTestId('register-form')).toBeInTheDocument();
  });

  it('deve exibir links para termos de uso e política de privacidade', () => {
    render(<RegisterPage />);
    const termsLinks = screen.queryAllByText(/Termos de Uso/i);
    const privacyLinks = screen.queryAllByText(/Política de Privacidade/i);
    expect(termsLinks.length + privacyLinks.length).toBeGreaterThan(0);
  });

  it('deve exibir TermsDialog para termos de uso', () => {
    render(<RegisterPage />);
    expect(screen.getByTestId('terms-dialog-terms')).toBeInTheDocument();
  });

  it('deve exibir TermsDialog para política de privacidade', () => {
    render(<RegisterPage />);
    expect(screen.getByTestId('terms-dialog-privacy')).toBeInTheDocument();
  });

  it('deve exibir link para home', () => {
    render(<RegisterPage />);
    const loginLinks = screen.getAllByRole('link', {
      name: /Fazer login/i,
    });
    expect(loginLinks[0]).toHaveAttribute('href', '/dashboard/login');
  });

  it('deve renderizar componentes de UI corretamente', () => {
    render(<RegisterPage />);
    expect(screen.getByTestId('back-to-top')).toBeInTheDocument();
  });
});
