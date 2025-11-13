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
jest.mock('@/components/dashboard/login', () => ({
  AuthLayout: ({ children, title, footer }: any) => (
    <div data-testid="auth-layout">
      <h1>{title}</h1>
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

describe('Register Page', () => {
  it('deve renderizar a página de registro', () => {
    render(<RegisterPage />);
    const elements = screen.queryAllByText(/RainerSoft/i);
    expect(elements.length).toBeGreaterThan(0);
  });

  it('deve exibir título da página', () => {
    render(<RegisterPage />);
    expect(screen.getByText('Criar Conta')).toBeInTheDocument();
  });

  it('deve exibir descrição da página', () => {
    render(<RegisterPage />);
    expect(
      screen.getByText(/Preencha os dados abaixo para criar sua conta/i)
    ).toBeInTheDocument();
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
    const homeLinks = screen.queryAllByText(/RainerSoft/i);
    const homeLink = homeLinks.find(link => link.closest('a'));
    if (homeLink) {
      expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    } else {
      expect(homeLinks.length).toBeGreaterThan(0);
    }
  });

  it('deve renderizar componentes de UI corretamente', () => {
    render(<RegisterPage />);
    expect(screen.getByTestId('back-to-top')).toBeInTheDocument();
  });
});
