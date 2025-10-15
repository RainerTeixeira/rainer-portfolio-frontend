/**
 * Página Principal (Home) do Portfólio
 * 
 * Esta é a página raiz da aplicação, acessível na rota '/'.
 * Apresenta o portfólio profissional com seções organizadas:
 * - Hero Section com carousel cyberpunk em tela cheia
 * - Highlights com destaques profissionais
 * - Seção Sobre com informações pessoais e profissionais
 * - Seção de Contato para comunicação
 * 
 * @fileoverview Componente da página inicial do portfólio
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

'use client'

import { 
  Highlights, 
  AboutSection, 
  NewsletterSection, 
  ContactSection,
  StatsShowcase,
  Testimonials,
  CTASection,
  TechStackShowcase,
  PortfolioShowcase,
  HeroSection
} from "@/components/home"
import { BackToTop } from "@/components/ui"
import { Separator } from "@/components/ui/separator"

/**
 * Componente principal da página Home
 * 
 * Renderiza a estrutura completa da landing page com todas as seções
 * organizadas verticalmente. Utiliza semântica HTML adequada com
 * elementos <section> e atributos ARIA para acessibilidade.
 * 
 * Estrutura:
 * 1. Hero Section: Carousel em tela cheia com tema cyberpunk
 * 2. Highlights: Cards com destaques profissionais e projetos
 * 3. About: Informações detalhadas sobre experiência e habilidades
 * 4. Contact: Formulário e informações de contato
 * 
 * @returns {JSX.Element} Página inicial completa do portfólio
 * 
 * @example
 * // Esta página é renderizada automaticamente na rota '/' pelo Next.js
 * // Não precisa ser importada manualmente
 */
export default function Page() {
  return (
    <main className="w-full min-h-screen bg-background overflow-hidden" aria-label="Página inicial do portfólio">
      {/* Hero Section com efeito WOW */}
      <div className="relative">
        {/* Brilho de fundo animado */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 dark:from-cyan-400/10 dark:via-purple-400/10 dark:to-pink-400/10"></div>
        <HeroSection />
      </div>
      
      {/* Divisor decorativo premium */}
      <div className="relative h-24 bg-gradient-to-b from-background via-background/50 to-background dark:from-black dark:via-gray-900/50 dark:to-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 dark:from-cyan-400/5 dark:via-purple-400/5 dark:to-pink-400/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
      </div>
      
      {/* Conteúdo Principal com efeitos modernos */}
      <div className="relative z-10 bg-background dark:bg-gradient-to-b dark:from-black dark:via-gray-900 dark:to-black">
        <div className="w-full mx-auto">
          {/* Stats Showcase - Números Impressionantes */}
          <section id="stats" className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent dark:from-cyan-400/10 dark:to-transparent"></div>
            <StatsShowcase />
          </section>

          {/* Divisor com gradiente */}
          <div className="relative h-px bg-gradient-to-r from-transparent via-border dark:via-cyan-400/20 to-transparent my-16"></div>
          
          {/* Seção de Destaques */}
          <section id="destaques" aria-labelledby="highlights-heading" className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent dark:via-purple-400/5"></div>
            <Highlights />
          </section>

          {/* Divisor com gradiente */}
          <div className="relative h-px bg-gradient-to-r from-transparent via-border dark:via-purple-400/20 to-transparent my-16"></div>

          {/* Portfolio Showcase */}
          <section id="portfolio" className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/5 to-transparent dark:via-pink-400/5"></div>
            <PortfolioShowcase />
          </section>

          {/* Divisor com gradiente */}
          <div className="relative h-px bg-gradient-to-r from-transparent via-border dark:via-pink-400/20 to-transparent my-16"></div>

          {/* Tech Stack */}
          <section id="tech" className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent dark:via-cyan-400/5"></div>
            <TechStackShowcase />
          </section>

          {/* Divisor com gradiente */}
          <div className="relative h-px bg-gradient-to-r from-transparent via-border dark:via-cyan-400/20 to-transparent my-16"></div>
          
          {/* Seção Sobre com destaque */}
          <section id="sobre" aria-labelledby="about-heading" className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent dark:via-purple-400/5"></div>
            <AboutSection />
          </section>

          {/* Divisor com gradiente */}
          <div className="relative h-px bg-gradient-to-r from-transparent via-border dark:via-purple-400/20 to-transparent my-16"></div>

          {/* Testimonials */}
          <section id="testimonials" className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/5 to-transparent dark:via-pink-400/5"></div>
            <Testimonials />
          </section>

          {/* Divisor com gradiente */}
          <div className="relative h-px bg-gradient-to-r from-transparent via-border dark:via-pink-400/20 to-transparent my-16"></div>
          
          {/* Seção de Newsletter */}
          <section id="newsletter" aria-labelledby="newsletter-heading" className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent dark:via-cyan-400/5"></div>
            <NewsletterSection />
          </section>

          {/* Divisor com gradiente */}
          <div className="relative h-px bg-gradient-to-r from-transparent via-border dark:via-cyan-400/20 to-transparent my-16"></div>

          {/* CTA Section - Call to Action */}
          <section id="cta" className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent dark:via-purple-400/5"></div>
            <CTASection />
          </section>

          {/* Divisor final */}
          <div className="relative h-px bg-gradient-to-r from-transparent via-border dark:via-pink-400/20 to-transparent my-16"></div>
          
          {/* Seção de Contato */}
          <section id="contato" aria-labelledby="contact-heading" className="relative pb-20">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/5 to-transparent dark:via-pink-400/5"></div>
            <ContactSection />
          </section>
        </div>
      </div>
      
      {/* Back to Top Button */}
      <BackToTop />
    </main>
  )
}