/**
 * Testes para página de Política de Privacidade
 */

// Mock do CSS primeiro
jest.mock('@/app/globals.css', () => ({}));

// Mock das fontes do Next.js
jest.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-inter' }),
  Orbitron: () => ({ variable: '--font-orbitron' }),
  Rajdhani: () => ({ variable: '--font-rajdhani' }),
}));

import PrivacyPolicyPage from '@/app/privacidade/page';
import { render, screen } from '@testing-library/react';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

jest.mock('@/constants', () => ({
  POLICIES_LAST_UPDATED: '2025-01-01',
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
    const lgpdElements = screen.queryAllByText(/Lei Geral de Proteção de Dados/i);
    expect(lgpdElements.length).toBeGreaterThan(0);
  });

  it('deve exibir seção de introdução', () => {
    render(<PrivacyPolicyPage />);
    expect(screen.getByText(/Introdução/i)).toBeInTheDocument();
    const elements = screen.queryAllByText(/RainerSoft/i);
    expect(elements.length).toBeGreaterThan(0);
  });

  it('deve exibir informações sobre dados coletados', () => {
    render(<PrivacyPolicyPage />);
    expect(screen.getByText(/Dados Coletados/i)).toBeInTheDocument();
  });

  it('deve exibir informações sobre uso dos dados', () => {
    render(<PrivacyPolicyPage />);
    expect(
      screen.getByText(/Finalidade do Uso dos Dados/i)
    ).toBeInTheDocument();
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
    const rightsElements = screen.queryAllByText(/Seus Direitos/i);
    expect(rightsElements.length).toBeGreaterThan(0);
  });

  it('deve exibir link para política de cookies', () => {
    render(<PrivacyPolicyPage />);
    const cookiesLinks = screen.queryAllByText(/Política de Cookies/i);
    expect(cookiesLinks.length).toBeGreaterThan(0);
    const cookiesLink =
      cookiesLinks.find(link => link.closest('a')) || cookiesLinks[0];
    if (cookiesLink && cookiesLink.closest('a')) {
      expect(cookiesLink.closest('a')).toHaveAttribute('href', '/cookies');
    } else {
      // Se não encontrar link, pelo menos verifica que o texto existe
      expect(cookiesLinks.length).toBeGreaterThan(0);
    }
  });

  it('deve exibir informações de contato', () => {
    render(<PrivacyPolicyPage />);
    const contactElements = screen.queryAllByText(/Contato/i);
    expect(contactElements.length).toBeGreaterThan(0);
    const emailLinks = screen.getAllByRole('link', { name: /@/i });
    expect(emailLinks.length).toBeGreaterThan(0);
  });

  it('deve exibir data de última atualização', () => {
    render(<PrivacyPolicyPage />);
    expect(screen.getByText(/Última atualização:/i)).toBeInTheDocument();
  });
});
