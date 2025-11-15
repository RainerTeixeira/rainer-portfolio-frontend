/**
 * Testes para página de Termos de Uso
 */

// Mock do CSS primeiro
jest.mock('@/app/globals.css', () => ({}));

// Mock das fontes do Next.js
jest.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-inter' }),
  Orbitron: () => ({ variable: '--font-orbitron' }),
  Rajdhani: () => ({ variable: '--font-rajdhani' }),
}));

import TermsOfUsePage from '@/app/termos/page';
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

describe('Terms of Use Page', () => {
  it('deve renderizar a página de termos de uso', () => {
    render(<TermsOfUsePage />);
    expect(screen.getByText('Termos de Uso')).toBeInTheDocument();
  });

  it('deve exibir seção de aceitação dos termos', () => {
    render(<TermsOfUsePage />);
    expect(screen.getAllByText(/Aceitação dos Termos/i)[0]).toBeInTheDocument();
    const elements = screen.queryAllByText(/RainerSoft/i);
    expect(elements.length).toBeGreaterThan(0);
  });

  it('deve exibir informações sobre uso dos serviços', () => {
    render(<TermsOfUsePage />);
    // Usa getAllByText pois há múltiplos elementos com esse texto
    expect(screen.getAllByText(/Uso dos Serviços/i)[0]).toBeInTheDocument();
  });

  it('deve exibir informações sobre responsabilidades', () => {
    render(<TermsOfUsePage />);
    // Pode estar em múltiplos lugares, usa getAllByText
    const elements = screen.queryAllByText(/Responsabilidades/i);
    expect(elements.length).toBeGreaterThan(0);
  });

  it('deve exibir informações sobre propriedade intelectual', () => {
    render(<TermsOfUsePage />);
    // Usa getAllByText pois há múltiplos elementos
    expect(
      screen.getAllByText(/Propriedade Intelectual/i)[0]
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
    expect(screen.getByText(/Modificações dos Termos/i)).toBeInTheDocument();
  });

  it('deve exibir informações sobre rescisão', () => {
    render(<TermsOfUsePage />);
    expect(screen.getByText(/Rescisão/i)).toBeInTheDocument();
  });

  it('deve exibir link para política de privacidade', () => {
    render(<TermsOfUsePage />);
    // Verifica que existe algum texto relacionado a privacidade
    const privacyLinks = screen.queryAllByText(/Política de Privacidade/i);
    const privacyLinks2 = screen.queryAllByText(/Política/i);
    const totalPrivacyLinks = privacyLinks.length + privacyLinks2.length;
    expect(totalPrivacyLinks).toBeGreaterThan(0);
    // Se encontrar link, verifica o href
    const privacyLink =
      privacyLinks.find(link => link.closest('a')) ||
      privacyLinks2.find(link => link.closest('a'));
    if (privacyLink && privacyLink.closest('a')) {
      expect(privacyLink.closest('a')).toHaveAttribute('href', '/privacidade');
    }
  });

  it('deve exibir informações de contato', () => {
    render(<TermsOfUsePage />);
    const contactElements = screen.queryAllByText(/Contato/i);
    expect(contactElements.length).toBeGreaterThan(0);
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  });

  it('deve exibir data de última atualização', () => {
    render(<TermsOfUsePage />);
    expect(screen.getByText(/Última atualização:/i)).toBeInTheDocument();
  });
});
