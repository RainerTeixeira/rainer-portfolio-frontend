/**
 * Testes para página de Recuperação de Senha
 */

import ForgotPasswordPage from '@/app/dashboard/login/forgot-password/page';
import { render, screen } from '@testing-library/react';
import React from 'react';

// Mock dos componentes
jest.mock('@/components/dashboard/login', () => ({
  ForgotPasswordForm: () => (
    <div data-testid="forgot-password-form">Forgot Password Form</div>
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

describe('Forgot Password Page', () => {
  it('deve renderizar a página de recuperação de senha', () => {
    render(<ForgotPasswordPage />);
    expect(screen.getByText(/RainerSoft - Dashboard/i)).toBeInTheDocument();
  });

  it('deve exibir o componente ForgotPasswordForm', () => {
    render(<ForgotPasswordPage />);
    expect(screen.getByTestId('forgot-password-form')).toBeInTheDocument();
  });

  it('deve exibir link para home', () => {
    render(<ForgotPasswordPage />);
    const homeLink = screen.getByText(/RainerSoft - Dashboard/i);
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('deve renderizar componentes de UI corretamente', () => {
    render(<ForgotPasswordPage />);
    expect(screen.getByTestId('back-to-top')).toBeInTheDocument();
  });
});
