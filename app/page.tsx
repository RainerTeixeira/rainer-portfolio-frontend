'use client';

import {
  AboutSection,
  CTASection,
  ContactSection,
  HeroSection,
  Highlights,
  NewsletterSection,
  PortfolioShowcase,
  StatsShowcase,
  TechStackShowcase,
  TechnicalHighlight,
} from '@/components/domain/home';

import { cn } from '@rainersoft/ui';
import { BackToTop } from '@rainersoft/ui';
import { SECTION_IDS } from '@/constants';

const BACKGROUND = {
  GRADIENT_OVERLAY: 'bg-gradient-to-b from-cyan-900/20 via-purple-900/10 to-transparent',
  FULL: 'bg-gradient-to-b from-background via-cyan-50/5 to-background',
  SECTION_CYAN: 'bg-gradient-to-br from-cyan-500/5 via-transparent to-cyan-500/5',
  SECTION_PURPLE_VIA: 'bg-gradient-to-br from-purple-500/5 via-transparent to-purple-500/5',
  SECTION_PINK_VIA: 'bg-gradient-to-br from-pink-500/5 via-transparent to-pink-500/5',
  SECTION_CYAN_VIA: 'bg-gradient-to-br from-cyan-500/5 via-transparent to-cyan-500/5',
} as const;

export default function HomePage() {
  return (
    <main className="w-full min-h-screen bg-background overflow-hidden">
      {/* Hero Section - Primeira impressão com carousel cyberpunk */}
      <div className="relative">
        <div className={cn('absolute inset-0', BACKGROUND.GRADIENT_OVERLAY)} aria-hidden="true" />
        <HeroSection />
      </div>

      <div className="relative h-0" aria-hidden="true" />

      <div className={cn('relative z-10', BACKGROUND.FULL)}>
        <div className="w-full mx-auto">
          {/* 1. Stats Showcase - Números e estatísticas profissionais */}
          <section id={SECTION_IDS.STATS} className="relative overflow-hidden transition-all duration-1000">
            <div className={cn('absolute inset-0', BACKGROUND.SECTION_CYAN, 'transition-opacity duration-1000')} aria-hidden="true" />
            <StatsShowcase />
          </section>

          {/* 2. Highlights - Destaques e conquistas profissionais */}
          <section id={SECTION_IDS.HIGHLIGHTS} className="relative transition-all duration-1000">
            <div className={cn('absolute inset-0', BACKGROUND.SECTION_PURPLE_VIA, 'transition-opacity duration-1000')} aria-hidden="true" />
            <Highlights />
          </section>

          {/* 3. Portfolio Showcase - Projetos em destaque */}
          <section id={SECTION_IDS.PORTFOLIO} className="relative transition-all duration-1000">
            <div className={cn('absolute inset-0', BACKGROUND.SECTION_PINK_VIA, 'transition-opacity duration-1000')} aria-hidden="true" />
            <PortfolioShowcase />
          </section>

          {/* 4. Tech Stack - Tecnologias e ferramentas dominadas */}
          <section id={SECTION_IDS.TECH} className="relative transition-all duration-1000">
            <div className={cn('absolute inset-0', BACKGROUND.SECTION_CYAN_VIA, 'transition-opacity duration-1000')} aria-hidden="true" />
            <TechStackShowcase />
          </section>

          {/* 5. About Section - Informações pessoais e profissionais */}
          <section id={SECTION_IDS.ABOUT} className="relative transition-all duration-1000">
            <div className={cn('absolute inset-0', BACKGROUND.SECTION_PURPLE_VIA, 'transition-opacity duration-1000')} aria-hidden="true" />
            <AboutSection />
          </section>

          {/* 6. Technical Highlight - Diferenciais técnicos */}
            <section id={SECTION_IDS.TESTIMONIALS} className="relative transition-all duration-1000">
              <div className={cn('absolute inset-0', BACKGROUND.SECTION_PINK_VIA, 'transition-opacity duration-1000')} aria-hidden="true" />
              {/* Componente TechnicalHighlight já utiliza design tokens avançados e estrutura premium */}
              <TechnicalHighlight />
            </section>

          {/* 7. Newsletter - Inscrição para atualizações */}
          <section id={SECTION_IDS.NEWSLETTER} className="relative transition-all duration-1000">
            <div className={cn('absolute inset-0', BACKGROUND.SECTION_CYAN_VIA, 'transition-opacity duration-1000')} aria-hidden="true" />
            <NewsletterSection />
          </section>

          {/* 8. CTA Section - Call to action principal para conversão */}
          <section id={SECTION_IDS.CTA} className="relative transition-all duration-1000">
            <div className={cn('absolute inset-0', BACKGROUND.SECTION_PURPLE_VIA, 'transition-opacity duration-1000')} aria-hidden="true" />
            <CTASection />
          </section>

          {/* 9. Contact Section - Formulário de contato direto */}
          <section className="relative pb-20 transition-all duration-1000">
            <div className={cn('absolute inset-0', BACKGROUND.SECTION_PINK_VIA, 'transition-opacity duration-1000')} aria-hidden="true" />
            <ContactSection />
          </section>
        </div>
      </div>

      {/* Botão Back to Top - Navegação auxiliar */}
      <BackToTop />
    </main>
  );
}