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

import Carousel from '@/components/home/carousel'
import { Highlights } from "@/components/home/highlights"
import { AboutSection } from "@/components/home/about-section"
import { ContactSection } from "@/components/home/contact-section"

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
    <main className="w-full min-h-screen bg-background" aria-label="Página inicial do portfólio">
      {/* Hero Section - Carousel Principal */}
      {/**
       * Seção Hero em tela cheia
       * - Usa 100svh (small viewport height) para dispositivos móveis
       * - Fallback para 100vh em desktops
       * - Altura mínima de 500px para evitar seções muito pequenas
       * - Fundo preto para o carousel cyberpunk
       * - role="banner" para acessibilidade (indica área principal)
       */}
      <section 
        className="relative w-full h-[100svh] sm:h-[100vh] flex items-center justify-center overflow-hidden bg-black"
        style={{
          minHeight: 'max(100svh, 500px)', // Garante altura mínima utilizável
          maxHeight: '100svh'               // Limita altura máxima à viewport
        }}
        role="banner"
        aria-label="Seção principal de apresentação cyberpunk"
      >
        {/* Componente Carousel com animações e efeitos visuais */}
        <Carousel />
      </section>
      
      {/* Conteúdo Principal */}
      {/**
       * Container do conteúdo principal
       * - z-10 para ficar acima de backgrounds
       * - Gradiente escuro aplicado apenas no dark mode
       * - Espaçamento responsivo (mobile-first)
       */}
      <div className="relative z-10 bg-background dark:bg-gradient-to-b dark:from-black dark:via-gray-900 dark:to-black">
        {/**
         * Wrapper com padding e espaçamento responsivo
         * - px: padding horizontal responsivo (3px -> 8px conforme tela cresce)
         * - py: padding vertical responsivo (12 -> 24 conforme tela cresce)
         * - space-y: espaçamento vertical entre seções filho
         */}
        <div className="w-full mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 space-y-12 xs:space-y-14 sm:space-y-16 md:space-y-20 lg:space-y-24">
          {/* Seção de Destaques */}
          {/**
           * Área de highlights/destaques
           * id="destaques": Permite navegação direta via URL (/#destaques)
           * aria-labelledby conecta com o heading interno do componente
           */}
          <section id="destaques" aria-labelledby="highlights-heading">
            <Highlights />
          </section>
          
          {/* Seção Sobre */}
          {/**
           * Seção de informações pessoais e profissionais
           * id="sobre": Permite navegação direta via URL (/#sobre)
           * Apresenta biografia, habilidades e experiência
           */}
          <section id="sobre" aria-labelledby="about-heading">
            <AboutSection />
          </section>
          
          {/* Seção de Contato */}
          {/**
           * Seção de contato e comunicação
           * id="contato": Permite navegação direta via URL (/#contato)
           * Inclui formulário e links de redes sociais
           */}
          <section id="contato" aria-labelledby="contact-heading">
            <ContactSection />
          </section>
        </div>
      </div>
    </main>
  )
}