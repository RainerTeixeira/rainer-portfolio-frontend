/**
 * Testes para página de Reset de Senha (com token)
 */

import ResetPasswordPage from '@/app/dashboard/login/reset-password/[token]/page';
import { render, screen } from '@testing-library/react';
import React from 'react';

// Mock dos componentes
jest.mock('@/components/dashboard/login', () => ({
  ResetPasswordForm: ({ token }: any) => (
    <div data-testid="reset-password-form">
      Reset Password Form - Token: {token}
    </div>
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

describe('Reset Password Page (with token)', () => {
  it('deve renderizar a página de reset de senha com token', () => {
    const params = { token: 'test-token-123' };
    render(<ResetPasswordPage params={params} />);
    expect(screen.getByText(/RainerSoft - Dashboard/i)).toBeInTheDocument();
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
    const homeLink = screen.getByText(/RainerSoft - Dashboard/i);
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('deve renderizar componentes de UI corretamente', () => {
    const params = { token: 'test-token-123' };
    render(<ResetPasswordPage params={params} />);
    expect(screen.getByTestId('back-to-top')).toBeInTheDocument();
  });
});

