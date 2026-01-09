/**
 * Home Page Component
 *
 * Página principal do portfólio. Landing page completa com múltiplas
 * seções organizadas verticalmente, cada uma com seu propósito específico.
 *
 * @module app/page
 * @fileoverview Landing page principal do portfólio
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Rota: /
 * // Renderizada automaticamente pelo Next.js App Router
 * ```
 *
 * @remarks
 * Seções da página (em ordem):
 * 1. Hero - Carousel cyberpunk full-screen
 * 2. Stats - Números e estatísticas
 * 3. Highlights - Destaques profissionais
 * 4. Portfolio - Projetos em destaque
 * 5. Tech Stack - Tecnologias dominadas
 * 6. About - Informações pessoais/profissionais
 * 7. Testimonials - Depoimentos de clientes
 * 8. Newsletter - Inscrição para updates
 * 9. CTA - Call to action final
 * 10. Contact - Formulário de contato
 */

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
  Testimonials,
} from '@/components/domain/home';
import { cn } from '@rainersoft/ui';
import { BackToTop } from '@rainersoft/ui';
import { SECTION_IDS } from '@/constants';

/**
 * HomePage Component
 *
 * Componente principal da página inicial que renderiza todas as seções
 * do portfólio em ordem vertical. Cada seção possui background gradient
 * sutil com transições fluidas entre seções para uma experiência contínua.
 *
 * @component
 * @returns {JSX.Element} Página inicial completa do portfólio
 *
 * @remarks
 * Layout responsivo com:
 * - Background gradients por seção com transições suaves
 * - Design fluido sem divisores visíveis entre seções
 * - Botão Back to Top flutuante
 * - Acessibilidade WCAG AA compliant
 */
export default function HomePage() {
  return (
    <main
      className="w-full min-h-screen bg-background overflow-hidden"
      aria-label="Página inicial do portfólio"
    >
      {/* Hero Section com background animado */}
      <div className="relative">
        <div
          className={cn('absolute inset-0', BACKGROUND.GRADIENT_OVERLAY)}
          aria-hidden="true"
        />
        <HeroSection />
      </div>

      {/* Transição suave após Hero */}
      <div className="relative h-0" aria-hidden="true" />

      {/* Conteúdo principal */}
      <div className={cn('relative z-10', BACKGROUND.FULL)}>
        <div className="w-full mx-auto">
          {/* 1. Stats Showcase */}
          <section
            id={SECTION_IDS.STATS}
            className="relative overflow-hidden transition-all duration-1000"
          >
            <div
              className={cn(
                'absolute inset-0',
                BACKGROUND.SECTION_CYAN,
                'transition-opacity duration-1000'
              )}
              aria-hidden="true"
            />
            <StatsShowcase />
          </section>

          {/* 2. Highlights */}
          <section
            id={SECTION_IDS.HIGHLIGHTS}
            aria-labelledby="highlights-heading"
            className="relative transition-all duration-1000"
          >
            <div
              className={cn(
                'absolute inset-0',
                BACKGROUND.SECTION_PURPLE_VIA,
                'transition-opacity duration-1000'
              )}
              aria-hidden="true"
            />
            <Highlights />
          </section>

          {/* 3. Portfolio Showcase */}
          <section
            id={SECTION_IDS.PORTFOLIO}
            className="relative transition-all duration-1000"
          >
            <div
              className={cn(
                'absolute inset-0',
                BACKGROUND.SECTION_PINK_VIA,
                'transition-opacity duration-1000'
              )}
              aria-hidden="true"
            />
            <PortfolioShowcase />
          </section>

          {/* 4. Tech Stack */}
          <section
            id={SECTION_IDS.TECH}
            className="relative transition-all duration-1000"
          >
            <div
              className={cn(
                'absolute inset-0',
                BACKGROUND.SECTION_CYAN_VIA,
                'transition-opacity duration-1000'
              )}
              aria-hidden="true"
            />
            <TechStackShowcase />
          </section>

          {/* 5. About Section */}
          <section
            id={SECTION_IDS.ABOUT}
            aria-labelledby="about-heading"
            className="relative transition-all duration-1000"
          >
            <div
              className={cn(
                'absolute inset-0',
                BACKGROUND.SECTION_PURPLE_VIA,
                'transition-opacity duration-1000'
              )}
              aria-hidden="true"
            />
            <AboutSection />
          </section>

          {/* 6. Testimonials */}
          <section
            id={SECTION_IDS.TESTIMONIALS}
            className="relative transition-all duration-1000"
          >
            <div
              className={cn(
                'absolute inset-0',
                BACKGROUND.SECTION_PINK_VIA,
                'transition-opacity duration-1000'
              )}
              aria-hidden="true"
            />
            <Testimonials />
          </section>

          {/* 7. Newsletter */}
          <section
            id={SECTION_IDS.NEWSLETTER}
            aria-labelledby="newsletter-heading"
            className="relative transition-all duration-1000"
          >
            <div
              className={cn(
                'absolute inset-0',
                BACKGROUND.SECTION_CYAN_VIA,
                'transition-opacity duration-1000'
              )}
              aria-hidden="true"
            />
            <NewsletterSection />
          </section>

          {/* 8. CTA Section */}
          <section
            id={SECTION_IDS.CTA}
            className="relative transition-all duration-1000"
          >
            <div
              className={cn(
                'absolute inset-0',
                BACKGROUND.SECTION_PURPLE_VIA,
                'transition-opacity duration-1000'
              )}
              aria-hidden="true"
            />
            <CTASection />
          </section>

          {/* 9. Contact Section */}
          <section className="relative pb-20 transition-all duration-1000">
            <div
              className={cn(
                'absolute inset-0',
                BACKGROUND.SECTION_PINK_VIA,
                'transition-opacity duration-1000'
              )}
              aria-hidden="true"
            />
            <ContactSection />
          </section>
        </div>
      </div>

      {/* Botão Back to Top */}
      <BackToTop />
    </main>
  );
}


