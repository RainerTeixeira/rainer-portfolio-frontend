/**
 * Hero Section Component
 * 
 * Componente de seção hero com design holográfico futurista,
 * carousel animado e conteúdo dinâmico rotativo.
 * 
 * @fileoverview Hero section with animated carousel and dynamic content
 * @author Rainer Teixeira
 * @version 2.0.0
 */

"use client"

import { motion, useAnimation } from "framer-motion"
import { useTheme } from "next-themes"
import dynamic from 'next/dynamic'
import { useEffect, useState } from "react"
import { useCarouselKeyboard } from './hooks'

// ============================================================================
// Dynamic Imports
// ============================================================================

const Carousel = dynamic(() => import('./carousel'), {
  ssr: false,
  loading: () => <HeroLoadingState />
})

// ============================================================================
// Constants
// ============================================================================

/**
 * Textos principais exibidos no hero
 */
const HERO_TITLES = [
  "ELEVE-SE AO FUTURO DIGITAL",
  "TRANSFORME IDEIAS EM CÓDIGO VIVO",
  "DOMINE A NUVEM, EXPANDA LIMITES",
  "TURBINE SUA PERFORMANCE SEM BARREIRAS",
  "CONSTRUA SEGURANÇA DE NÍVEL NEXT-GEN",
  "POTENCIALIZE SEUS DADOS EM SEGUNDOS",
  "ORQUESTRE TIMES HIPERÁGEIS",
  "INOVE COM MOBILE MULTIVERSO",
  "ATIVE EXPERIÊNCIAS UI/UX IMERSIVAS",
  "MOLDE SOFTWARES COM ARQUITETURA NEURAL",
  "ACELERE SEU DEVOPS AUTOMATIZADO",
  "REVELE INSIGHTS DE DADOS EM TEMPO REAL",
  "LIBERE A INTELIGÊNCIA ARTIFICIAL GENERATIVA",
  "INSPIRE-SE NA TECNOLOGIA QUE IMPACTA",
  "MESTRE EM WEB: SOLUÇÕES ESCALÁVEIS",
] as const

/**
 * Subtítulos descritivos correspondentes aos títulos
 */
const HERO_SUBTITLES = [
  "Conecte-se ao extraordinário – para quem exige o próximo nível.",
  "Aplicações impecáveis, execução rápida, tecnologia de ponta.",
  "Infraestrutura distribuída, disponível e resiliente para você crescer.",
  "Nada mais de lentidão – tenha eficiência máxima em cada clique.",
  "Sua proteção digital reforçada com criptografia e vigilância ativa.",
  "Armazene, acesse e analise massivos volumes de dados em instantes.",
  "Sinergia total – visão estratégica guiando equipes ao topo.",
  "Aplicativos híbridos, experiência nativa e multiplataformas sem limites.",
  "Interfaces que fascinam e guiam usuários como nunca antes.",
  "Organize, escale e evolua sistemas com inteligência artificial integrada.",
  "Entregas contínuas, automação total, velocidade e segurança unidas.",
  "Monitore, entenda e transforme dados em decisões precisas.",
  "Soluções cognitivas para criar, aprender e inovar além do humano.",
  "Tecnologia radical que inspira negócios, marcas e pessoas.",
  "Performance neural, robustez e escalabilidade para mercados globais.",
] as const

/**
 * Duração de cada slide em milissegundos
 */
const SLIDE_DURATION_MS = 6000

// ============================================================================
// Types
// ============================================================================

interface HeroContentOverlayProps {
  readonly currentSlideIndex: number
  readonly isDarkTheme: boolean
}

// ============================================================================
// Components
// ============================================================================

/**
 * Estado de carregamento exibido enquanto o carousel é carregado
 */
function HeroLoadingState() {
  const { resolvedTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const isDarkTheme = isMounted && resolvedTheme === 'dark'

  return (
    <div 
      className={`relative w-full h-[100svh] flex items-center justify-center overflow-hidden ${isDarkTheme ? 'bg-black' : 'bg-white'}`}
      role="status"
      aria-label="Carregando conteúdo principal"
    >
      <div className="text-center space-y-6">
        {/* Spinner animado com duplo anel */}
        <div className="relative" aria-hidden="true">
          <div className={`w-20 h-20 border-4 ${isDarkTheme ? 'border-cyan-400' : 'border-blue-500'} border-t-transparent rounded-full animate-spin mx-auto`} />
          <div 
            className={`absolute inset-0 w-20 h-20 border-4 ${isDarkTheme ? 'border-pink-400' : 'border-purple-600'} border-b-transparent rounded-full animate-spin mx-auto`} 
            style={{ animationDirection: 'reverse' }}
          />
        </div>
        
        {/* Texto de carregamento */}
        <p className={`${isDarkTheme ? 'text-cyan-300' : 'text-blue-600'} font-mono text-sm tracking-wider animate-pulse`}>
          INICIALIZANDO SISTEMA...
        </p>
      </div>
    </div>
  )
}

/**
 * Overlay de conteúdo do hero com animações
 */
function HeroContentOverlay({ currentSlideIndex, isDarkTheme }: HeroContentOverlayProps) {
  const [isContentVisible, setIsContentVisible] = useState(false)
  const animationControls = useAnimation()
  
  const currentTitle = HERO_TITLES[currentSlideIndex % HERO_TITLES.length]
  const currentSubtitle = HERO_SUBTITLES[currentSlideIndex % HERO_SUBTITLES.length]

  // Previne erro de hidratação no SSR
  useEffect(() => {
    setIsContentVisible(true)
  }, [])

  // Animação de entrada do conteúdo
  useEffect(() => {
    animationControls.start({
      scale: [0.95, 1],
      opacity: [0, 1],
      transition: { duration: 0.8, ease: "easeOut" }
    })
  }, [currentSlideIndex, animationControls])

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none p-3 xs:p-4 sm:p-5 md:p-7 lg:p-9 xl:p-11"
      aria-live="polite"
      aria-atomic="true"
    >
      <div 
        className={`relative z-10 w-full max-w-[95vw] xs:max-w-[93vw] sm:max-w-[88vw] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto transition-opacity duration-500 pointer-events-auto ${
          isContentVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div 
          className="text-center relative z-20 flex flex-col justify-center items-center min-h-[400px] px-6 xs:px-8 sm:px-10 md:px-12 lg:px-14 xl:px-18 space-y-6 xs:space-y-7 sm:space-y-9 md:space-y-11 lg:space-y-13 xl:space-y-15"
          style={{
            paddingTop: 'clamp(2.5rem, 8vh, 7rem)',
            paddingBottom: 'clamp(2.5rem, 8vh, 7rem)'
          }}
        >
          {/* Título principal */}
          <motion.h1
            key={currentSlideIndex}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className={`font-black font-mono tracking-tight leading-none px-2 xs:px-3 sm:px-4 md:px-0 ${
              isDarkTheme 
                ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400" 
                : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
            }`}
            style={{
              fontSize: 'clamp(1.75rem, 7vw + 0.5rem, 5rem)',
              textShadow: isDarkTheme 
                ? '0 0 30px rgba(0,255,255,0.7), 0 0 50px rgba(255,0,255,0.5)'
                : '0 0 30px rgba(59,130,246,0.6), 0 0 50px rgba(139,92,246,0.4)',
              lineHeight: 1.05
            }}
          >
            {currentTitle}
          </motion.h1>
          
          {/* Subtítulo */}
          <motion.h2
            key={`subtitle-${currentSlideIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className={`font-semibold font-mono px-3 xs:px-4 sm:px-6 ${
              isDarkTheme ? "text-green-400" : "text-green-600"
            }`}
            style={{
              fontSize: 'clamp(1rem, 3.5vw + 0.3rem, 2rem)',
              textShadow: isDarkTheme 
                ? '0 0 20px rgba(0,255,0,0.6)' 
                : '0 0 20px rgba(34,197,94,0.5)',
              lineHeight: 1.3
            }}
          >
            {currentSubtitle}
          </motion.h2>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * Componente principal do Hero Section
 * 
 * Renderiza uma seção hero full-screen com:
 * - Carousel animado de fundo
 * - Conteúdo dinâmico rotativo
 * - Suporte a tema claro/escuro
 * - Gradientes de overlay
 */
export function HeroSection() {
  const { resolvedTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  // Previne erro de hidratação SSR
  useEffect(() => {
    setIsMounted(true)
  }, [])

  /* ==========================================================
     HOOK DE NAVEGAÇÃO POR TECLADO COM AUTOPLAY 🎹
     ========================================================== */
  const {
    currentSlide: currentSlideIndex,
    pauseAutoplay,
    resumeAutoplay,
  } = useCarouselKeyboard({
    slideCount: HERO_TITLES.length,
    autoplay: true,
    autoplayInterval: SLIDE_DURATION_MS,
    loop: true,
    pauseOnInteraction: false, // Não pausar ao navegar (manter fluidez)
    respectReducedMotion: true,
    onSlideChange: (index) => {
      console.log(`[Hero] Slide ${index + 1}/${HERO_TITLES.length}: ${HERO_TITLES[index]}`)
    }
  })

  const isDarkTheme = isMounted && resolvedTheme === 'dark'

  return (
    <header 
      className={`relative w-full h-[100svh] sm:h-[100vh] flex items-center justify-center overflow-hidden ${isDarkTheme ? 'bg-black' : 'bg-white'}`}
      style={{
        minHeight: 'max(100svh, 600px)',
        maxHeight: '100svh'
      }}
      aria-label="Seção principal de apresentação"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      {/* Layer 1: Carousel de fundo (z-0) */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Carousel />
      </div>
      
      {/* Layer 2: Gradiente de overlay (z-5) */}
      <div 
        className="absolute inset-0 z-5 pointer-events-none bg-gradient-to-b from-black/50 via-transparent to-black/60" 
        aria-hidden="true"
      />
      
      {/* Layer 3: Conteúdo principal (z-20) */}
      <HeroContentOverlay 
        currentSlideIndex={currentSlideIndex} 
        isDarkTheme={isDarkTheme} 
      />
      
      {/* Layer 4: Gradiente inferior (z-15) */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 z-15 pointer-events-none bg-gradient-to-t from-black/80 via-black/40 to-transparent" 
        aria-hidden="true"
      />
    </header>
  )
}

