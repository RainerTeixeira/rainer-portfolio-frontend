/**
 * Home Page Component
 * 
 * Página principal do portfólio profissional.
 * Landing page completa com múltiplas seções organizadas verticalmente.
 * 
 * Seções (em ordem):
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
 * 
 * @fileoverview Landing page principal do portfólio
 * @author Rainer Teixeira
 * @version 1.0.0
 */

'use client'

// ============================================================================
// Home Components
// ============================================================================

import { 
  HeroSection,
  StatsShowcase,
  Highlights, 
  PortfolioShowcase,
  TechStackShowcase,
  AboutSection, 
  Testimonials,
  NewsletterSection, 
  CTASection,
  ContactSection,
} from "@/components/home"

// ============================================================================
// UI Components
// ============================================================================

import { BackToTop } from "@/components/ui"

// ============================================================================
// Constants
// ============================================================================

/**
 * IDs das seções para navegação e scroll
 */
const SECTION_IDS = {
  STATS: 'stats',
  HIGHLIGHTS: 'destaques',
  PORTFOLIO: 'portfolio',
  TECH: 'tech',
  ABOUT: 'sobre',
  TESTIMONIALS: 'testimonials',
  NEWSLETTER: 'newsletter',
  CTA: 'cta',
  CONTACT: 'contato',
} as const

/**
 * Classes CSS para divisores de seção
 */
const DIVIDER_CLASSES = {
  CYAN: 'relative h-px bg-gradient-to-r from-transparent via-border dark:via-cyan-400/20 to-transparent my-16',
  PURPLE: 'relative h-px bg-gradient-to-r from-transparent via-border dark:via-purple-400/20 to-transparent my-16',
  PINK: 'relative h-px bg-gradient-to-r from-transparent via-border dark:via-pink-400/20 to-transparent my-16',
} as const

// ============================================================================
// Main Component
// ============================================================================

/**
 * Componente principal da Home Page
 * 
 * Landing page profissional com 10 seções organizadas verticalmente.
 * Cada seção tem background gradient sutil e divisores visuais.
 * 
 * @returns Página inicial completa do portfólio
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
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 dark:from-cyan-400/10 dark:via-purple-400/10 dark:to-pink-400/10" 
          aria-hidden="true"
        />
        <HeroSection />
      </div>
      
      {/* Divisor decorativo premium */}
      <div 
        className="relative h-24 bg-gradient-to-b from-background via-background/50 to-background dark:from-black dark:via-gray-900/50 dark:to-black overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 dark:from-cyan-400/5 dark:via-purple-400/5 dark:to-pink-400/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      </div>
      
      {/* Conteúdo principal */}
      <div className="relative z-10 bg-background dark:bg-gradient-to-b dark:from-black dark:via-gray-900 dark:to-black">
        <div className="w-full mx-auto">
          
          {/* 1. Stats Showcase */}
          <section id={SECTION_IDS.STATS} className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent dark:from-cyan-400/10 dark:to-transparent" aria-hidden="true" />
            <StatsShowcase />
          </section>

          <div className={DIVIDER_CLASSES.CYAN} aria-hidden="true" />
          
          {/* 2. Highlights */}
          <section id={SECTION_IDS.HIGHLIGHTS} aria-labelledby="highlights-heading" className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent dark:via-purple-400/5" aria-hidden="true" />
            <Highlights />
          </section>

          <div className={DIVIDER_CLASSES.PURPLE} aria-hidden="true" />

          {/* 3. Portfolio Showcase */}
          <section id={SECTION_IDS.PORTFOLIO} className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/5 to-transparent dark:via-pink-400/5" aria-hidden="true" />
            <PortfolioShowcase />
          </section>

          <div className={DIVIDER_CLASSES.PINK} aria-hidden="true" />

          {/* 4. Tech Stack */}
          <section id={SECTION_IDS.TECH} className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent dark:via-cyan-400/5" aria-hidden="true" />
            <TechStackShowcase />
          </section>

          <div className={DIVIDER_CLASSES.CYAN} aria-hidden="true" />
          
          {/* 5. About Section */}
          <section id={SECTION_IDS.ABOUT} aria-labelledby="about-heading" className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent dark:via-purple-400/5" aria-hidden="true" />
            <AboutSection />
          </section>

          <div className={DIVIDER_CLASSES.PURPLE} aria-hidden="true" />

          {/* 6. Testimonials */}
          <section id={SECTION_IDS.TESTIMONIALS} className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/5 to-transparent dark:via-pink-400/5" aria-hidden="true" />
            <Testimonials />
          </section>

          <div className={DIVIDER_CLASSES.PINK} aria-hidden="true" />
          
          {/* 7. Newsletter */}
          <section id={SECTION_IDS.NEWSLETTER} aria-labelledby="newsletter-heading" className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent dark:via-cyan-400/5" aria-hidden="true" />
            <NewsletterSection />
          </section>

          <div className={DIVIDER_CLASSES.CYAN} aria-hidden="true" />

          {/* 8. CTA Section */}
          <section id={SECTION_IDS.CTA} className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent dark:via-purple-400/5" aria-hidden="true" />
            <CTASection />
          </section>

          <div className={DIVIDER_CLASSES.PINK} aria-hidden="true" />
          
          {/* 9. Contact Section */}
          <section id={SECTION_IDS.CONTACT} aria-labelledby="contact-heading" className="relative pb-20">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/5 to-transparent dark:via-pink-400/5" aria-hidden="true" />
            <ContactSection />
          </section>
        </div>
      </div>
      
      {/* Botão Back to Top */}
      <BackToTop />
    </main>
  )
}