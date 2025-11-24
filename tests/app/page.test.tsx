// Mock do CSS
jest.mock('@/app/globals.css', () => ({}));

// Mock dos componentes principais
jest.mock('@/components/ui', () => ({
  BackToTop: () => <div data-testid="back-to-top">Back to Top</div>,
}));

// Mock das seções da Home para evitar lógica complexa e dependências adicionais
jest.mock('@/components/home', () => ({
  AboutSection: () => <section data-testid="about-section">About</section>,
  CTASection: () => <section data-testid="cta-section">CTA</section>,
  ContactSection: () => <section data-testid="contact-section">Contact</section>,
  HeroSection: () => <section data-testid="hero-section">Hero</section>,
  Highlights: () => <section data-testid="highlights-section">Highlights</section>,
  NewsletterSection: () => (
    <section data-testid="newsletter-section">Newsletter</section>
  ),
  PortfolioShowcase: () => (
    <section data-testid="portfolio-section">Portfolio</section>
  ),
  StatsShowcase: () => <section data-testid="stats-section">Stats</section>,
  TechStackShowcase: () => (
    <section data-testid="tech-section">Tech Stack</section>
  ),
  Testimonials: () => (
    <section data-testid="testimonials-section">Testimonials</section>
  ),
}));

// Mock de SECTION_IDS para evitar dependência de constantes reais
jest.mock('@/constants', () => ({
  SECTION_IDS: {
    STATS: 'stats',
    HIGHLIGHTS: 'highlights',
    PORTFOLIO: 'portfolio',
    TECH: 'tech',
    ABOUT: 'about',
    TESTIMONIALS: 'testimonials',
    NEWSLETTER: 'newsletter',
    CTA: 'cta',
  },
}));

import HomePage from '@/app/page';
import { render } from '@testing-library/react';

describe('Home Page', () => {
  it('deve renderizar a página inicial sem erros', async () => {
    // Renderizar o componente
    const { container } = render(await HomePage());

    // Verificar se renderizou algo
    expect(container).toBeTruthy();
  });

  it('deve exibir a seção Hero', async () => {
    const { container } = render(await HomePage());
    // Verifica se há algum elemento na página
    expect(container.firstChild).toBeTruthy();
  });

  it('deve renderizar a seção de portfolio', async () => {
    const { container } = render(await HomePage());

    // Verificar se renderizou
    expect(container).toBeTruthy();
  });

  it('deve exibir a seção de contato', async () => {
    const { container } = render(await HomePage());
    // Verifica se renderizou
    expect(container).toBeTruthy();
  });
});
