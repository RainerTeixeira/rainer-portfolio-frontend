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

// ============================================================================
// Home Components
// ============================================================================

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
} from '@/components/home';

// ============================================================================
// UI Components
// ============================================================================

import { BackToTop } from '@/components/ui';

// ============================================================================
// DESIGN TOKENS
// ============================================================================

import { cn } from '@/lib/utils';
import { BACKGROUND } from '@rainer/design-tokens';

// ============================================================================
// Constants
// ============================================================================

import { DIVIDER_CLASSES, SECTION_IDS } from '@/constants';

// ============================================================================
// Main Component
// ============================================================================

/**
 * HomePage Component
 *
 * Componente principal da página inicial que renderiza todas as seções
 * do portfólio em ordem vertical. Cada seção possui background gradient
 * sutil e divisores visuais para melhor organização visual.
 *
 * @component
 * @returns {JSX.Element} Página inicial completa do portfólio
 *
 * @remarks
 * Layout responsivo com:
 * - Background gradients por seção
 * - Divisores decorativos entre seções
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

      {/* Divisor decorativo premium */}
      <div
        className={cn(
          'relative h-24 overflow-hidden',
          BACKGROUND.PREMIUM_DIVIDER_CONTAINER
        )}
        aria-hidden="true"
      >
        <div
          className={cn(
            'absolute inset-0 blur-3xl',
            BACKGROUND.GRADIENT_OVERLAY
          )}
        />
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 h-px',
            BACKGROUND.PREMIUM_DIVIDER_LINE
          )}
        />
      </div>

      {/* Conteúdo principal */}
      <div className={cn('relative z-10', BACKGROUND.FULL)}>
        <div className="w-full mx-auto">
          {/* 1. Stats Showcase */}
          <section id={SECTION_IDS.STATS} className="relative overflow-hidden">
            <div
              className={cn('absolute inset-0', BACKGROUND.SECTION_CYAN)}
              aria-hidden="true"
            />
            <StatsShowcase />
          </section>

          <div className={DIVIDER_CLASSES.CYAN} aria-hidden="true" />

          {/* 2. Highlights */}
          <section
            id={SECTION_IDS.HIGHLIGHTS}
            aria-labelledby="highlights-heading"
            className="relative"
          >
            <div
              className={cn('absolute inset-0', BACKGROUND.SECTION_PURPLE_VIA)}
              aria-hidden="true"
            />
            <Highlights />
          </section>

          <div className={DIVIDER_CLASSES.PURPLE} aria-hidden="true" />

          {/* 3. Portfolio Showcase */}
          <section id={SECTION_IDS.PORTFOLIO} className="relative">
            <div
              className={cn('absolute inset-0', BACKGROUND.SECTION_PINK_VIA)}
              aria-hidden="true"
            />
            <PortfolioShowcase />
          </section>

          <div className={DIVIDER_CLASSES.PINK} aria-hidden="true" />

          {/* 4. Tech Stack */}
          <section id={SECTION_IDS.TECH} className="relative">
            <div
              className={cn('absolute inset-0', BACKGROUND.SECTION_CYAN_VIA)}
              aria-hidden="true"
            />
            <TechStackShowcase />
          </section>

          <div className={DIVIDER_CLASSES.CYAN} aria-hidden="true" />

          {/* 5. About Section */}
          <section
            id={SECTION_IDS.ABOUT}
            aria-labelledby="about-heading"
            className="relative"
          >
            <div
              className={cn('absolute inset-0', BACKGROUND.SECTION_PURPLE_VIA)}
              aria-hidden="true"
            />
            <AboutSection />
          </section>

          <div className={DIVIDER_CLASSES.PURPLE} aria-hidden="true" />

          {/* 6. Testimonials */}
          <section id={SECTION_IDS.TESTIMONIALS} className="relative">
            <div
              className={cn('absolute inset-0', BACKGROUND.SECTION_PINK_VIA)}
              aria-hidden="true"
            />
            <Testimonials />
          </section>

          <div className={DIVIDER_CLASSES.PINK} aria-hidden="true" />

          {/* 7. Newsletter */}
          <section
            id={SECTION_IDS.NEWSLETTER}
            aria-labelledby="newsletter-heading"
            className="relative"
          >
            <div
              className={cn('absolute inset-0', BACKGROUND.SECTION_CYAN_VIA)}
              aria-hidden="true"
            />
            <NewsletterSection />
          </section>

          <div className={DIVIDER_CLASSES.CYAN} aria-hidden="true" />

          {/* 8. CTA Section */}
          <section id={SECTION_IDS.CTA} className="relative">
            <div
              className={cn('absolute inset-0', BACKGROUND.SECTION_PURPLE_VIA)}
              aria-hidden="true"
            />
            <CTASection />
          </section>

          <div className={DIVIDER_CLASSES.PINK} aria-hidden="true" />

          {/* 9. Contact Section */}
          <section className="relative pb-20">
            <div
              className={cn('absolute inset-0', BACKGROUND.SECTION_PINK_VIA)}
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
