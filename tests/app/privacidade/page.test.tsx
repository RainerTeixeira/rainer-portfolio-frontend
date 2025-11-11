/**
 * Testes para página de Política de Privacidade
 */

import PrivacyPolicyPage from '@/app/privacidade/page';
import { render, screen } from '@testing-library/react';
import React from 'react';

// Mock dos componentes
jest.mock('@/components/ui', () => ({
  BackToTop: () => <div data-testid="back-to-top">Back to Top</div>,
  PageHeader: ({ children, title, description }: any) => (
    <div data-testid="page-header">
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </div>
  ),
  ParticlesEffect: () => <div data-testid="particles-effect">Particles</div>,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

jest.mock('@/constants', () => ({
  POLICIES_LAST_UPDATED: '2024-01-01',
  SITE_CONFIG: {
    fullName: 'RainerSoft',
    contact: {
      email: {
        address: 'test@example.com',
      },
      phone: {
        number: '+55 24 99999-9999',
      },
      location: {
        city: 'Volta Redonda',
        country: 'Brasil',
      },
    },
  },
}));

describe('Privacy Policy Page', () => {
  it('deve renderizar a página de política de privacidade', () => {
    render(<PrivacyPolicyPage />);
    expect(screen.getByText('Política de Privacidade')).toBeInTheDocument();
  });

  it('deve exibir informações sobre LGPD', () => {
    render(<PrivacyPolicyPage />);
    expect(
      screen.getByText(/Lei Geral de Proteção de Dados/i)
    ).toBeInTheDocument();
  });

  it('deve exibir seção de introdução', () => {
    render(<PrivacyPolicyPage />);
    expect(screen.getByText(/Introdução/i)).toBeInTheDocument();
    expect(screen.getByText(/RainerSoft/i)).toBeInTheDocument();
  });

  it('deve exibir informações sobre dados coletados', () => {
    render(<PrivacyPolicyPage />);
    expect(screen.getByText(/Dados Coletados/i)).toBeInTheDocument();
  });

  it('deve exibir informações sobre uso dos dados', () => {
    render(<PrivacyPolicyPage />);
    expect(screen.getByText(/Como Utilizamos Seus Dados/i)).toBeInTheDocument();
  });

  it('deve exibir informações sobre compartilhamento', () => {
    render(<PrivacyPolicyPage />);
    expect(screen.getByText(/Compartilhamento de Dados/i)).toBeInTheDocument();
  });

  it('deve exibir informações sobre segurança', () => {
    render(<PrivacyPolicyPage />);
    expect(screen.getByText(/Segurança dos Dados/i)).toBeInTheDocument();
  });

  it('deve exibir informações sobre direitos do usuário', () => {
    render(<PrivacyPolicyPage />);
    expect(screen.getByText(/Seus Direitos/i)).toBeInTheDocument();
  });

  it('deve exibir link para política de cookies', () => {
    render(<PrivacyPolicyPage />);
    const cookiesLink = screen.getByText(/Política de Cookies/i);
    expect(cookiesLink).toBeInTheDocument();
    expect(cookiesLink.closest('a')).toHaveAttribute('href', '/cookies');
  });

  it('deve exibir informações de contato', () => {
    render(<PrivacyPolicyPage />);
    expect(screen.getByText(/Contato/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  });

  it('deve exibir data de última atualização', () => {
    render(<PrivacyPolicyPage />);
    expect(screen.getByText(/Última atualização:/i)).toBeInTheDocument();
  });
});
