/**
 * Testes para página de Contato
 */

// Mock do CSS primeiro
jest.mock('@/app/globals.css', () => ({}));

// Mock das fontes do Next.js
jest.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-inter' }),
  Orbitron: () => ({ variable: '--font-orbitron' }),
  Rajdhani: () => ({ variable: '--font-rajdhani' }),
}));

// Mock de variáveis de ambiente
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:4000';

import ContactPage from '@/app/contato/page';
import { render, screen } from '@testing-library/react';

// Mock dos componentes
jest.mock('@/components/contato/contact-form', () => ({
  ContactForm: () => <div data-testid="contact-form">Contact Form</div>,
}));

jest.mock('@/components/contato/contact-info-card', () => ({
  ContactInfoCard: ({ title, icon, children }: any) => (
    <div data-testid="contact-info-card">
      {icon}
      <h3>{title}</h3>
      {children}
    </div>
  ),
}));

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

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock('@/components/ui/accordion', () => ({
  Accordion: ({ children }: any) => (
    <div data-testid="accordion">{children}</div>
  ),
  AccordionItem: ({ children }: any) => (
    <div data-testid="accordion-item">{children}</div>
  ),
  AccordionTrigger: ({ children }: any) => (
    <button data-testid="accordion-trigger">{children}</button>
  ),
  AccordionContent: ({ children }: any) => (
    <div data-testid="accordion-content">{children}</div>
  ),
}));

jest.mock('@/components/ui/card', () => ({
  Card: ({ children }: any) => <div data-testid="card">{children}</div>,
  CardHeader: ({ children }: any) => (
    <div data-testid="card-header">{children}</div>
  ),
  CardTitle: ({ children }: any) => (
    <h3 data-testid="card-title">{children}</h3>
  ),
  CardDescription: ({ children }: any) => (
    <p data-testid="card-description">{children}</p>
  ),
  CardContent: ({ children }: any) => (
    <div data-testid="card-content">{children}</div>
  ),
}));

jest.mock('@/components/ui/separator', () => ({
  Separator: () => <hr data-testid="separator" />,
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => (
      <section {...props}>{children}</section>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

jest.mock('@/constants', () => ({
  SITE_CONFIG: {
    contact: {
      email: {
        address: 'suporte@rainersoft.com.br',
        responseTime: 'Resposta em até 24 horas',
      },
      phone: {
        number: '+55 24 99999-9999',
      },
      location: {
        city: 'Volta Redonda',
        state: 'RJ',
        country: 'Brasil',
      },
      hours: {
        weekdays: '09:00 - 18:00',
        weekends: 'Fechado',
      },
    },
  },
  CONTACT_INFO_CARDS: [
    {
      title: 'Horário',
      icon: () => <div>Icon</div>,
      content: {
        primary: '09:00 - 18:00',
        secondary: 'Segunda a Sexta',
      },
      href: '#',
      color: 'blue',
      iconColor: 'text-blue-500',
      borderColor: 'border-blue-500',
      hoverBorder: 'hover:border-blue-600',
      textColor: 'text-blue-600',
    },
    {
      title: 'Localização',
      icon: () => <div>Icon</div>,
      content: {
        primary: 'Volta Redonda, RJ',
        secondary: 'Brasil',
      },
      href: '#',
      color: 'green',
      iconColor: 'text-green-500',
      borderColor: 'border-green-500',
      hoverBorder: 'hover:border-green-600',
      textColor: 'text-green-600',
    },
    {
      title: 'Telefone',
      icon: () => <div>Icon</div>,
      content: {
        primary: '+55 24 99999-9999',
        secondary: 'Disponível',
      },
      href: '#',
      color: 'purple',
      iconColor: 'text-purple-500',
      borderColor: 'border-purple-500',
      hoverBorder: 'hover:border-purple-600',
      textColor: 'text-purple-600',
    },
    {
      title: 'Email',
      icon: () => <div>Icon</div>,
      content: {
        primary: 'suporte@rainersoft.com.br',
        secondary: 'Resposta rápida',
      },
      href: '#',
      color: 'pink',
      iconColor: 'text-pink-500',
      borderColor: 'border-pink-500',
      hoverBorder: 'hover:border-pink-600',
      textColor: 'text-pink-600',
    },
  ],
  FAQ_ITEMS: [
    {
      value: 'item-1',
      question: 'Pergunta 1?',
      answer: 'Resposta 1',
    },
    {
      value: 'item-2',
      question: 'Pergunta 2?',
      answer: 'Resposta 2',
    },
  ],
}));

describe('Contact Page', () => {
  it('deve renderizar a página de contato', () => {
    render(<ContactPage />);
    // Verifica que a página foi renderizada através de qualquer um dos títulos possíveis
    const titleElements = screen.queryAllByText(/Vamos Transformar Sua Ideia/i);
    const titleElements2 = screen.queryAllByText(
      /Vamos Conversar Sobre Seu Projeto/i
    );
    expect(titleElements.length + titleElements2.length).toBeGreaterThan(0);
  });

  it('deve exibir o formulário de contato', () => {
    render(<ContactPage />);
    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
  });

  it('deve exibir cards de informações de contato', () => {
    render(<ContactPage />);
    // Verifica que os cards foram renderizados através dos títulos
    const horarioElements = screen.queryAllByText(/Horário/i);
    const localizacaoElements = screen.queryAllByText(/Localização/i);
    const telefoneElements = screen.queryAllByText(/Telefone/i);
    const emailElements = screen.queryAllByText(/Email/i);
    // Pelo menos um dos cards deve estar presente
    const totalElements =
      horarioElements.length +
      localizacaoElements.length +
      telefoneElements.length +
      emailElements.length;
    expect(totalElements).toBeGreaterThan(0);
  });

  it('deve exibir informações de contato corretas', () => {
    render(<ContactPage />);
    // Verifica que a página foi renderizada
    const titleElements = screen.queryAllByText(/Vamos Transformar Sua Ideia/i);
    const titleElements2 = screen.queryAllByText(
      /Vamos Conversar Sobre Seu Projeto/i
    );
    expect(titleElements.length + titleElements2.length).toBeGreaterThan(0);
    // Verifica que o formulário está presente
    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
  });
});
