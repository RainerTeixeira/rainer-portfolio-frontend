/**
 * Testes para página de Termos de Uso
 */

import TermsOfUsePage from '@/app/termos/page';
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

describe('Terms of Use Page', () => {
  it('deve renderizar a página de termos de uso', () => {
    render(<TermsOfUsePage />);
    expect(screen.getByText('Termos de Uso')).toBeInTheDocument();
  });

  it('deve exibir seção de aceitação dos termos', () => {
    render(<TermsOfUsePage />);
    expect(screen.getByText(/Aceitação dos Termos/i)).toBeInTheDocument();
    expect(screen.getByText(/RainerSoft/i)).toBeInTheDocument();
  });

  it('deve exibir informações sobre uso dos serviços', () => {
    render(<TermsOfUsePage />);
    expect(screen.getByText(/Uso dos Serviços/i)).toBeInTheDocument();
  });

  it('deve exibir informações sobre responsabilidades', () => {
    render(<TermsOfUsePage />);
    expect(screen.getByText(/Responsabilidades/i)).toBeInTheDocument();
  });

  it('deve exibir informações sobre propriedade intelectual', () => {
    render(<TermsOfUsePage />);
    expect(
      screen.getByText(/Propriedade Intelectual/i)
    ).toBeInTheDocument();
  });

  it('deve exibir informações sobre limitação de responsabilidade', () => {
    render(<TermsOfUsePage />);
    expect(
      screen.getByText(/Limitação de Responsabilidade/i)
    ).toBeInTheDocument();
  });

  it('deve exibir informações sobre modificações', () => {
    render(<TermsOfUsePage />);
    expect(
      screen.getByText(/Modificações dos Termos/i)
    ).toBeInTheDocument();
  });

  it('deve exibir informações sobre rescisão', () => {
    render(<TermsOfUsePage />);
    expect(screen.getByText(/Rescisão/i)).toBeInTheDocument();
  });

  it('deve exibir link para política de privacidade', () => {
    render(<TermsOfUsePage />);
    const privacyLink = screen.getByText(/Política de Privacidade/i);
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink.closest('a')).toHaveAttribute('href', '/privacidade');
  });

  it('deve exibir informações de contato', () => {
    render(<TermsOfUsePage />);
    expect(screen.getByText(/Contato/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  });

  it('deve exibir data de última atualização', () => {
    render(<TermsOfUsePage />);
    expect(screen.getByText(/Última atualização:/i)).toBeInTheDocument();
  });
});

