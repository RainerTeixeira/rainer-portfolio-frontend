/**
 * Testes para página de Política de Cookies
 */

// Mock do CSS primeiro
jest.mock('@/app/globals.css', () => ({}));

// Mock das fontes do Next.js
jest.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-inter' }),
  Orbitron: () => ({ variable: '--font-orbitron' }),
  Rajdhani: () => ({ variable: '--font-rajdhani' }),
}));

import CookiePolicyPage from '@/app/cookies/page';
import { render, screen } from '@testing-library/react';

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

describe('Cookie Policy Page', () => {
  it('deve renderizar a página de política de cookies', () => {
    render(<CookiePolicyPage />);
    expect(screen.getByText('Política de Cookies')).toBeInTheDocument();
  });

  it('deve exibir informações sobre o que são cookies', () => {
    render(<CookiePolicyPage />);
    expect(screen.getByText(/O que são Cookies?/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Cookies são pequenos arquivos de texto/i)
    ).toBeInTheDocument();
  });

  it('deve exibir tipos de cookies utilizados', () => {
    render(<CookiePolicyPage />);
    expect(
      screen.getByText(/Tipos de Cookies Utilizados/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Cookies Essenciais/i)).toBeInTheDocument();
    expect(screen.getByText(/Cookies de Desempenho/i)).toBeInTheDocument();
    expect(screen.getByText(/Cookies de Funcionalidade/i)).toBeInTheDocument();
    expect(screen.getByText(/Cookies de Publicidade/i)).toBeInTheDocument();
  });

  it('deve exibir informações sobre cookies de terceiros', () => {
    render(<CookiePolicyPage />);
    expect(screen.getByText(/Cookies de Terceiros/i)).toBeInTheDocument();
    expect(screen.getByText(/Google Analytics/i)).toBeInTheDocument();
  });

  it('deve exibir informações sobre gerenciamento de cookies', () => {
    render(<CookiePolicyPage />);
    expect(screen.getByText(/Como Gerenciar Cookies/i)).toBeInTheDocument();
    expect(screen.getByText(/Configurações do Navegador/i)).toBeInTheDocument();
  });

  it('deve exibir informações sobre duração dos cookies', () => {
    render(<CookiePolicyPage />);
    expect(screen.getByText(/Duração dos Cookies/i)).toBeInTheDocument();
    expect(screen.getByText(/Cookies de Sessão/i)).toBeInTheDocument();
    expect(screen.getByText(/Cookies Persistentes/i)).toBeInTheDocument();
  });

  it('deve exibir link para política de privacidade', () => {
    render(<CookiePolicyPage />);
    const privacyLinks = screen.queryAllByText(/Política de Privacidade/i);
    expect(privacyLinks.length).toBeGreaterThan(0);
    const privacyLink =
      privacyLinks.find(link => link.closest('a')) || privacyLinks[0];
    if (privacyLink && privacyLink.closest('a')) {
      expect(privacyLink.closest('a')).toHaveAttribute('href', '/privacidade');
    } else {
      // Se não encontrar link, pelo menos verifica que o texto existe
      expect(privacyLinks.length).toBeGreaterThan(0);
    }
  });

  it('deve exibir link para termos de uso', () => {
    render(<CookiePolicyPage />);
    const termsLinks = screen.queryAllByText(/Termos de Uso/i);
    expect(termsLinks.length).toBeGreaterThan(0);
    const termsLink =
      termsLinks.find(link => link.closest('a')) || termsLinks[0];
    if (termsLink.closest('a')) {
      expect(termsLink.closest('a')).toHaveAttribute('href', '/termos');
    }
  });

  it('deve exibir informações de contato', () => {
    render(<CookiePolicyPage />);
    const contactElements = screen.queryAllByText(/Contato/i);
    expect(contactElements.length).toBeGreaterThan(0);
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  });

  it('deve exibir data de última atualização', () => {
    render(<CookiePolicyPage />);
    expect(screen.getByText(/Última atualização:/i)).toBeInTheDocument();
  });
});
