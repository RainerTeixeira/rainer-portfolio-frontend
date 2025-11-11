/**
 * Testes para página de Registro
 */

import RegisterPage from '@/app/dashboard/login/register/page';
import { render, screen } from '@testing-library/react';
import React from 'react';

// Mock dos componentes
jest.mock('@/components/dashboard/login', () => ({
  RegisterForm: () => <div data-testid="register-form">Register Form</div>,
  TermsDialog: ({ children, type }: any) => (
    <div data-testid={`terms-dialog-${type}`}>{children}</div>
  ),
}));

jest.mock('@/components/ui', () => ({
  BackToTop: () => <div data-testid="back-to-top">Back to Top</div>,
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
    expect(screen.getByText(/RainerSoft - Dashboard/i)).toBeInTheDocument();
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
    expect(screen.getByText(/Termos de Uso/i)).toBeInTheDocument();
    expect(screen.getByText(/Política de Privacidade/i)).toBeInTheDocument();
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
    const homeLink = screen.getByText(/RainerSoft - Dashboard/i);
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('deve renderizar componentes de UI corretamente', () => {
    render(<RegisterPage />);
    expect(screen.getByTestId('back-to-top')).toBeInTheDocument();
  });
});
