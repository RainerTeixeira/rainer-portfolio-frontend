/**
 * Carousel Cyberpunk Avançado
 * 
 * Componente de hero section com tema cyberpunk/futurista.
 * Apresenta rotação automática de textos com efeitos visuais complexos:
 * - Chuva de matriz (estilo Matrix) com código binário
 * - Partículas animadas de energia
 * - Grades hexagonais
 * - Círculos tecnológicos concêntricos
 * - Glitch effects nos textos
 * - Transições suaves entre slides
 * 
 * Otimizações de performance:
 * - Memoização de componentes pesados
 * - useMemo para cálculos complexos
 * - useCallback para funções estáveis
 * - Controle de animações via requestAnimationFrame
 * - Redução de partículas em mobile
 * 
 * @fileoverview Carousel hero cyberpunk com efeitos visuais avançados
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

"use client"

import { useState, useEffect, useCallback, useRef, useMemo, memo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, Cpu, Zap, Shield, Cloud, Brain } from "lucide-react"
import { useTheme } from "next-themes"

/* ==========================================================
   CONSTANTES CYBERPUNK
   ========================================================== */

/**
 * Intervalo de auto-play do carousel em milissegundos
 * @constant {number}
 * @default 5000
 */
const AUTOPLAY_INTERVAL_MS = 5000

/**
 * Array de textos primários impactantes para o carousel
 * Padrão: verbo de ação + solução/resultado, estilo cyberpunk
 * 
 * @constant {string[]}
 * @readonly
 */
const PRIMARY_TEXTS = [
  "ELEVE-SE AO FUTURO DIGITAL",                // Chamamento geral
  "TRANSFORME IDEIAS EM CÓDIGO VIVO",          // Full-stack
  "DOMINE A NUVEM, EXPANDA LIMITES",           // Cloud
  "TURBINE SUA PERFORMANCE SEM BARREIRAS",      // Performance
  "CONSTRUA SEGURANÇA DE NÍVEL NEXT-GEN",      // Segurança
  "POTENCIALIZE SEUS DADOS EM SEGUNDOS",       // Banco de dados
  "ORQUESTRE TIMES HIPERÁGEIS",                // Gestão
  "INOVE COM MOBILE MULTIVERSO",               // Mobile
  "ATIVE EXPERIÊNCIAS UI/UX IMERSIVAS",        // Design
  "MOLDE SOFTWARES COM ARQUITETURA NEURAL",    // Arquitetura
  "ACELERE SEU DEVOPS AUTOMATIZADO",           // DevOps
  "REVELE INSIGHTS DE DADOS EM TEMPO REAL",    // Data
  "LIBERE A INTELIGÊNCIA ARTIFICIAL GENERATIVA",// AI/ML
  "INSPIRE-SE NA TECNOLOGIA QUE IMPACTA",      // Inspiração/Visão
  "MESTRE EM WEB: SOLUÇÕES ESCALÁVEIS",        // Web escalável
]

/**
 * Array de subtextos/descrições com padrão claro e complementar
 * Padrão: promessa de valor, claridade e ação direta
 * Deve ter mesmo comprimento que PRIMARY_TEXTS
 *
 * @constant {string[]}
 * @readonly
 */
const SUBTEXTS = [
  "Conecte-se ao extraordinário – para quem exige o próximo nível.",                          // Chamamento geral
  "Aplicações impecáveis, execução rápida, tecnologia de ponta.",                             // Full-stack
  "Infraestrutura distribuída, disponível e resiliente para você crescer.",                   // Cloud
  "Nada mais de lentidão – tenha eficiência máxima em cada clique.",                         // Performance
  "Sua proteção digital reforçada com criptografia e vigilância ativa.",                     // Segurança
  "Armazene, acesse e analise massivos volumes de dados em instantes.",                      // Banco de dados
  "Sinergia total – visão estratégica guiando equipes ao topo.",                             // Gestão
  "Aplicativos híbridos, experiência nativa e multiplataformas sem limites.",                // Mobile
  "Interfaces que fascinam e guiam usuários como nunca antes.",                              // Design
  "Organize, escale e evolua sistemas com inteligência artificial integrada.",               // Arquitetura
  "Entregas contínuas, automação total, velocidade e segurança unidas.",                     // DevOps
  "Monitore, entenda e transforme dados em decisões precisas.",                              // Data
  "Soluções cognitivas para criar, aprender e inovar além do humano.",                       // AI/ML
  "Tecnologia radical que inspira negócios, marcas e pessoas.",                              // Inspiração/Visão
  "Performance neural, robustez e escalabilidade para mercados globais.",                    // Web escalável
]

/**
 * Array de ícones tecnológicos para os slides
 * Componentes Lucide React
 * 
 * @constant {LucideIcon[]}
 * @readonly
 */
const TECH_ICONS = [Cpu, Zap, Shield, Cloud, Brain, Code]

/**
 * Caracteres usados na chuva de matriz
 * Apenas 0 e 1 (código binário) para estética de computação
 * 
 * @constant {string}
 */
const MATRIX_CHARS = "01"

/**
 * Padrões de código binário pré-definidos
 * Usados para gerar sequências interessantes na chuva de matriz
 * 
 * @constant {string[]}
 * @readonly
 */
const BINARY_PATTERNS = [
  "0101", "1010", "0110", "1001", "0011", "1100",
  "1111", "0000", "1000", "0111", "1101", "0010",
  "0100", "1110", "1011", "0110", "0001", "1010",
  "1001", "0011", "0101", "0111", "0100", "1000",
  "1100", "0011", "1001", "0110", "1010", "0101",
  "0000", "1111", "0010", "1101", "0111", "1000"
]

/* ==========================================================
   TIPOS
   ========================================================== */

/**
 * Interface de coluna da chuva de matriz
 * 
 * @interface MatrixColumn
 * @property {string} id - ID único da coluna
 * @property {number} leftPct - Posição horizontal em porcentagem (0-100)
 * @property {number} fontSize - Tamanho da fonte em pixels
 * @property {number} animationDuration - Duração da animação em segundos
 * @property {number} animationDelay - Delay inicial em segundos
 * @property {string[]} characters - Array de caracteres a exibir
 * @property {number} intensity - Intensidade/opacidade (0-1)
 * @property {'binary'} type - Tipo de coluna (sempre 'binary')
 * @property {number} speed - Velocidade de queda
 */
interface MatrixColumn {
  id: string
  leftPct: number
  fontSize: number
  animationDuration: number
  animationDelay: number
  characters: string[]
  intensity: number
  type: 'binary'
  speed: number
}

/**
 * Interface de partícula animada
 * 
 * @interface Particle
 * @property {string} id - ID único da partícula
 * @property {number} left - Posição horizontal em porcentagem (0-100)
 * @property {number} top - Posição vertical em porcentagem (0-100)
 * @property {number} size - Tamanho em pixels
 * @property {string} color - Cor em formato HSL
 * @property {number} duration - Duração da animação em segundos
 * @property {number} delay - Delay inicial em segundos
 * @property {"energy" | "data" | "quantum" | "neural"} type - Tipo de partícula
 */
interface Particle {
  id: string
  left: number
  top: number
  size: number
  color: string
  duration: number
  delay: number
  type: "energy" | "data" | "quantum" | "neural"
}

/**
 * Props do componente Carousel
 * 
 * @interface CarouselProps
 * @property {number} [autoPlayInterval] - Intervalo de auto-play em ms (padrão: 5000)
 * @property {boolean} [enableAutoPlay] - Se auto-play está habilitado (padrão: true)
 */
interface CarouselProps {
  autoPlayInterval?: number
  enableAutoPlay?: boolean
}

/* ==========================================================
   COMPONENTE PRINCIPAL - CYBERPUNK CARRUSEL AVANÇADO
   ========================================================== */

// Componente memoizado para melhor performance
const Carousel = memo(function Carousel({ 
  autoPlayInterval = AUTOPLAY_INTERVAL_MS, 
  enableAutoPlay = true 
}: CarouselProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isAutoPlay, setIsAutoPlay] = useState(enableAutoPlay)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [matrixColumns, setMatrixColumns] = useState<MatrixColumn[]>([])
  const [particles, setParticles] = useState<Particle[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [glitchEffect, setGlitchEffect] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [livePatterns, setLivePatterns] = useState<string[]>(BINARY_PATTERNS)
  const containerRef = useRef<HTMLDivElement>(null)

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  const actualAutoPlayInterval = prefersReducedMotion ? 0 : autoPlayInterval

  /* ==========================================================
     EFEITO MATRIX DIGITAL RAIN HIPNÓTICO 💫
     ========================================================== */
  useEffect(() => {
    if (!mounted || prefersReducedMotion) return

    // MATRIX RAIN: Padrões binários vivos que mudam constantemente
    const matrixInterval = setInterval(() => {
      setLivePatterns(prev => prev.map(pattern => {
        const randomAction = Math.random()
        
        // 40% chance: inverter o padrão (0101 -> 1010)
        if (randomAction < 0.4) {
          return pattern.split('').reverse().join('')
        }
        // 30% chance: mutar bits aleatórios
        else if (randomAction < 0.7) {
          return pattern.split('').map(bit => 
            Math.random() > 0.7 ? (bit === '0' ? '1' : '0') : bit
          ).join('')
        }
        // 30% chance: manter o padrão (continuidade)
        else {
          return pattern
        }
      }))
    }, 150) // Mudanças rápidas e hipnóticas

    return () => clearInterval(matrixInterval)
  }, [mounted, prefersReducedMotion])

  /* ==========================================================
     EFEITOS DE GLITCH ALEATÓRIOS AVANÇADOS
     ========================================================== */
  useEffect(() => {
    if (!mounted || prefersReducedMotion) return

    // RITMO CYBERPUNK: Glitch mais frequente e rápido
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true)
      setTimeout(() => setGlitchEffect(false), 50 + Math.random() * 30)
    }, 1500 + Math.random() * 2000)

    return () => clearInterval(glitchInterval)
  }, [mounted, prefersReducedMotion])

  /* ==========================================================
     INICIALIZAÇÃO DO SISTEMA
     ========================================================== */
  useEffect(() => {
    setMounted(true)
  }, [])

  /* ==========================================================
     SISTEMA DE DIMENSÕES RESPONSIVAS AVANÇADO
     ========================================================== */
  const updateResponsiveDimensions = useCallback(() => {
    if (!containerRef.current) return

    const width = containerRef.current.clientWidth
    
    const mobileBreakpoint = 640
    const tabletBreakpoint = 1024
    
    setIsMobile(width < mobileBreakpoint)
    setIsTablet(width >= mobileBreakpoint && width < tabletBreakpoint)

    // Sistema Matrix Rain OTIMIZADO - REDUZIDO para melhor performance
    const columnCount = isMobile ? 
      Math.min(12, Math.max(6, Math.floor(width / 40))) : 
      isTablet ? 
      Math.min(18, Math.max(10, Math.floor(width / 45))) :
      Math.min(25, Math.max(15, Math.floor(width / 50)))

    const newColumns: MatrixColumn[] = Array.from({ length: columnCount }).map((_, i) => {
      const randomId = Math.round(Math.random() * 10000)
      const charactersCount = isMobile ? 8 + Math.floor(Math.random() * 6) : 10 + Math.floor(Math.random() * 8)
      const intensity = 0.6 + Math.random() * 0.3
      
      // Apenas tipo binário - Simulação de processador
      const type: 'binary' = 'binary'
      
      // Gerar padrões binários realistas de processador usando padrões VIVOS
      const characters: string[] = Array.from({ length: charactersCount }).map((_, idx) => {
        if (idx === 0) return '1' // Sempre 1 no topo (bit ativo)
        const pattern = livePatterns[Math.floor(Math.random() * livePatterns.length)] || "0101"
        return pattern[idx % pattern.length] || "0"
      })
      
      return {
        id: `col-${i}-${randomId}`,
        leftPct: (i / columnCount) * 100,
        fontSize: isMobile ? 12 + Math.random() * 4 : isTablet ? 14 + Math.random() * 6 : 16 + Math.random() * 6,
        // Velocidade variada como bits de processador
        animationDuration: 3 + Math.random() * 2,
        animationDelay: (i / columnCount) * 8,
        characters,
        intensity,
        type,
        speed: 1.2
      }
    })

    setMatrixColumns(newColumns)

    // Sistema de Partículas OTIMIZADO - REDUZIDO drasticamente para performance
    const particleCount = isMobile ? 
      Math.min(6, Math.max(3, Math.floor(width / 150))) :
      isTablet ?
      Math.min(10, Math.max(5, Math.floor(width / 120))) :
      Math.min(15, Math.max(8, Math.floor(width / 100)))

    const particleTypes: Particle["type"][] = ["energy", "data", "quantum", "neural"]
    
    const darkPalette = {
      energy: ["rgba(0,255,170,0.9)", "rgba(0,230,255,0.85)", "rgba(180,90,255,0.9)"],
      data: ["rgba(255,50,150,0.8)", "rgba(255,180,0,0.8)", "rgba(0,200,255,0.8)"],
      quantum: ["rgba(200,255,0,0.7)", "rgba(255,0,200,0.7)", "rgba(0,255,255,0.7)"],
      neural: ["rgba(255,100,255,0.8)", "rgba(100,255,255,0.8)", "rgba(255,255,100,0.8)"]
    }
    
    const lightPalette = {
      energy: ["rgba(0,100,255,0.8)", "rgba(100,0,255,0.8)", "rgba(0,200,200,0.8)"],
      data: ["rgba(255,0,100,0.8)", "rgba(255,100,0,0.8)", "rgba(0,100,255,0.8)"],
      quantum: ["rgba(100,255,0,0.7)", "rgba(255,0,150,0.7)", "rgba(0,150,255,0.7)"],
      neural: ["rgba(200,0,255,0.8)", "rgba(0,200,255,0.8)", "rgba(255,150,0,0.8)"]
    }
    
    const palette = mounted && resolvedTheme !== 'dark' ? lightPalette : darkPalette
    
    const newParticles: Particle[] = Array.from({ length: particleCount }).map((_, idx) => {
      const type = particleTypes[Math.floor(Math.random() * particleTypes.length)] || "energy"
      const colorArray = palette[type]
      const randomIndex = Math.floor(Math.random() * colorArray.length)
      const color: string = colorArray[randomIndex] ?? colorArray[0] ?? "rgba(0,255,170,0.9)"
      
      return {
        id: `p-${idx}-${Math.round(Math.random() * 10000)}`,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: isMobile ? 3 + Math.random() * 4 : 4 + Math.random() * 6,
        color,
        // OTIMIZADO: Duração estável para GPU acceleration
        duration: 4 + Math.random() * 3,
        delay: (idx / particleCount) * 4,
        type
      }
    })

    setParticles(newParticles)
  }, [mounted, isMobile, isTablet, resolvedTheme, livePatterns])

  useEffect(() => {
    if (!mounted) return
    
    updateResponsiveDimensions()
    setIsReady(true)
    
    // Mostrar conteúdo suavemente após inicialização
    const showTimer = setTimeout(() => {
      setShowContent(true)
    }, 100)
    
    let rafId: number | null = null
    const handleResize = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => updateResponsiveDimensions())
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      if (rafId) cancelAnimationFrame(rafId)
      clearTimeout(showTimer)
    }
  }, [mounted, updateResponsiveDimensions])

  /* ==========================================================
     SISTEMA DE NAVEGAÇÃO TÁTICA
     ========================================================== */
  const navigateToNextText = useCallback(() => {
    setCurrentTextIndex(prev => (prev + 1) % PRIMARY_TEXTS.length)
  }, [])

  const navigateToPreviousText = useCallback(() => {
    setCurrentTextIndex(prev => (prev - 1 + PRIMARY_TEXTS.length) % PRIMARY_TEXTS.length)
  }, [])

  const toggleAutoplay = useCallback(() => {
    setIsAutoPlay(prev => !prev)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleKeyboardNavigation = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          navigateToPreviousText()
          break
        case "ArrowRight":
          navigateToNextText()
          break
        case " ":
        case "Space":
          e.preventDefault()
          toggleAutoplay()
          break
      }
    }

    window.addEventListener("keydown", handleKeyboardNavigation)
    return () => window.removeEventListener("keydown", handleKeyboardNavigation)
  }, [mounted, navigateToNextText, navigateToPreviousText, toggleAutoplay])

  /* ==========================================================
     SISTEMA AUTOPLAY TÁTICO
     ========================================================== */
  useEffect(() => {
    if (prefersReducedMotion || !isReady || !isAutoPlay) return
    
    const intervalId = window.setInterval(() => {
      setCurrentTextIndex(prev => (prev + 1) % PRIMARY_TEXTS.length)
    }, actualAutoPlayInterval)
    
    return () => window.clearInterval(intervalId)
  }, [prefersReducedMotion, isReady, isAutoPlay, actualAutoPlayInterval])

  /* ==========================================================
     RENDERIZAÇÃO DO SISTEMA CYBERPUNK
     ========================================================== */
  // Memoizar textos e ícones para evitar recálculos
  const primaryText = useMemo(() => PRIMARY_TEXTS[currentTextIndex % PRIMARY_TEXTS.length], [currentTextIndex])
  const subText = useMemo(() => SUBTEXTS[currentTextIndex % SUBTEXTS.length], [currentTextIndex])
  const RandomTechIcon = useMemo(() => TECH_ICONS[currentTextIndex % TECH_ICONS.length] || Code, [currentTextIndex])

  if (!isReady) {
    return (
      <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-pink-400 border-b-transparent rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse' }}></div>
          </div>
          <p className="font-mono text-cyan-400 text-lg animate-pulse tracking-wider">SYSTEM BOOT-UP...</p>
        </div>
      </div>
    )
  }

  const isDarkTheme = mounted && resolvedTheme === 'dark'

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full flex items-center justify-center p-3 xs:p-4 sm:p-5 md:p-7 lg:p-9 xl:p-11"
      style={{
        paddingTop: 'clamp(1rem, 3vh, 3rem)',
        paddingBottom: 'clamp(1rem, 3vh, 3rem)'
      }}
      role="region"
      aria-label="Advanced Cyberpunk Presentation System"
    >
      {/* SISTEMA DE FUNDO HOLOGRÁFICO AVANÇADO */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* CAMADAS DE GRADIENTE DINÂMICO MULTICAMADA */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/25 via-black/70 to-purple-900/35" />
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-900/20 via-transparent to-green-900/25 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-bl from-blue-900/15 via-transparent to-yellow-900/20 mix-blend-color" />
        
        {/* GRADE TÁTICA OTIMIZADA - CSS Puro */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(${isDarkTheme ? 'rgba(6, 182, 212, 0.12)' : 'rgba(59, 130, 246, 0.15)'} 1px, transparent 1px),
              linear-gradient(90deg, ${isDarkTheme ? 'rgba(6, 182, 212, 0.12)' : 'rgba(59, 130, 246, 0.15)'} 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* SISTEMA DE PARTÍCULAS QUÂNTICAS AVANÇADO */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle absolute rounded-full pointer-events-none"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
              animation: `quantumFloat ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
              // OTIMIZADO: Blur reduzido = Melhor performance
              filter: 'blur(0.5px)',
              opacity: 0.85
            }}
          />
        ))}

        {/* MATRIX BINARY PROCESSOR - OTIMIZADO COMO BITS */}
        <div className="matrix-grid absolute inset-0 z-0 overflow-hidden">
          {matrixColumns.map(column => (
            <div
              key={column.id}
              className="matrix-column-wrapper absolute pointer-events-none"
              style={{
                left: `${column.leftPct}%`,
                top: 0,
                height: '200vh',
                animation: `matrixBinaryFall ${column.animationDuration}s linear infinite`,
                animationDelay: `${column.animationDelay}s`,
                transform: `scaleY(${column.speed})`,
              }}
            >
              {/* Primeiro set - Bits de processador com efeito Matrix Rain hipnótico */}
              <div className="flex flex-col gap-0 whitespace-pre text-center" style={{ opacity: column.intensity }}>
                {column.characters.map((character, index) => {
                  // Cores estilo Matrix - Verde neon vibrante para bits de processador
                  const charColor = isDarkTheme ? 'text-green-400' : 'text-green-600'
                  const glowColor = isDarkTheme ? '#00ff00' : '#10b981'
                  
                  // Variação hipnótica na opacidade baseada em caractere
                  const baseOpacity = index === 0 ? 1 : Math.max(0.2, 1 - index * 0.08)
                  const charVariation = character === '1' ? 1.15 : 0.9
                  const finalOpacity = Math.min(1, baseOpacity * charVariation)
                  
                  return (
                    <span
                      key={`${column.id}-ch-${index}-1`}
                      className={`matrix-binary font-mono font-bold tracking-wider ${charColor} ${
                        index === 0 ? 'glow-binary-head' : index < 2 ? 'glow-binary-trail' : 'glow-binary-fade'
                      }`}
                      style={{
                        fontSize: `${column.fontSize}px`,
                        opacity: finalOpacity,
                        textShadow: index === 0 
                          ? `0 0 20px ${glowColor}, 0 0 35px ${glowColor}, 0 0 50px ${glowColor}`
                          : index < 2
                          ? `0 0 12px ${glowColor}, 0 0 20px ${glowColor}`
                          : `0 0 8px ${glowColor}`,
                        filter: index === 0 
                          ? 'brightness(1.6) contrast(1.3) saturate(1.4)' 
                          : index < 2
                          ? 'brightness(1.3) saturate(1.2)'
                          : 'brightness(1.1)',
                        transform: index === 0 ? 'scale(1.15)' : 'scale(1)',
                        fontWeight: index === 0 ? '900' : index < 2 ? '800' : '700',
                        // Efeito de pulso hipnótico para bits ativos
                        animation: index === 0 
                          ? 'binary-pulse 1.5s ease-in-out infinite' 
                          : character === '1' && index < 4
                          ? 'binary-shimmer 2s ease-in-out infinite'
                          : 'none',
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      {character}
                    </span>
                  )
                })}
              </div>
              
              {/* Segundo set - Continuidade com efeito Matrix Rain hipnótico */}
              <div className="flex flex-col gap-0 whitespace-pre text-center" style={{ opacity: column.intensity }}>
                {column.characters.map((character, index) => {
                  // Cores estilo Matrix - Verde neon vibrante para bits de processador
                  const charColor = isDarkTheme ? 'text-green-400' : 'text-green-600'
                  const glowColor = isDarkTheme ? '#00ff00' : '#10b981'
                  
                  // Variação hipnótica na opacidade baseada em caractere
                  const baseOpacity = index === 0 ? 1 : Math.max(0.2, 1 - index * 0.08)
                  const charVariation = character === '1' ? 1.15 : 0.9
                  const finalOpacity = Math.min(1, baseOpacity * charVariation)
                  
                  return (
                    <span
                      key={`${column.id}-ch-${index}-2`}
                      className={`matrix-binary font-mono font-bold tracking-wider ${charColor} ${
                        index === 0 ? 'glow-binary-head' : index < 2 ? 'glow-binary-trail' : 'glow-binary-fade'
                      }`}
                      style={{
                        fontSize: `${column.fontSize}px`,
                        opacity: finalOpacity,
                        textShadow: index === 0 
                          ? `0 0 20px ${glowColor}, 0 0 35px ${glowColor}, 0 0 50px ${glowColor}`
                          : index < 2
                          ? `0 0 12px ${glowColor}, 0 0 20px ${glowColor}`
                          : `0 0 8px ${glowColor}`,
                        filter: index === 0 
                          ? 'brightness(1.6) contrast(1.3) saturate(1.4)' 
                          : index < 2
                          ? 'brightness(1.3) saturate(1.2)'
                          : 'brightness(1.1)',
                        transform: index === 0 ? 'scale(1.15)' : 'scale(1)',
                        fontWeight: index === 0 ? '900' : index < 2 ? '800' : '700',
                        // Efeito de pulso hipnótico para bits ativos
                        animation: index === 0 
                          ? 'binary-pulse 1.5s ease-in-out infinite' 
                          : character === '1' && index < 4
                          ? 'binary-shimmer 2s ease-in-out infinite'
                          : 'none',
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      {character}
                    </span>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* EFEITOS DE SCANLINE OTIMIZADOS - REDUZIDO */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-0.5 opacity-35"
              style={{
                top: `${(i / 3) * 100}%`,
                background: `linear-gradient(90deg, transparent, ${
                  isDarkTheme ? 'rgba(0,255,255,0.6)' : 'rgba(59,130,246,0.6)'
                }, transparent)`,
                animation: `hologramScan ${4 + i * 1}s linear ${i * 0.3}s infinite`,
                filter: 'blur(0.5px)'
              }}
            />
          ))}
        </div>
      </div>

      {/* EFEITOS DE BORDA DA TELA */}
      <div className="absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 z-40"></div>
      <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-60 z-40"></div>

      {/* INDICADOR DE SCROLL CYBERPUNK - UNIVERSAL */}
      <div className="absolute bottom-2 xs:bottom-3 sm:bottom-5 md:bottom-7 lg:bottom-10 left-1/2 transform -translate-x-1/2 z-[5] flex flex-col items-center gap-1.5 sm:gap-2 md:gap-2.5">
        {/* Mouse Icon Cyberpunk */}
        <div className="relative group cursor-pointer">
          {/* Corpo do mouse */}
          <div 
            className="border-2 sm:border-[2.5px] border-cyan-400 rounded-full sm:rounded-2xl flex justify-center relative overflow-hidden transition-all duration-300 hover:border-pink-400 hover:shadow-lg hover:shadow-pink-400/50"
            style={{
              width: 'clamp(1.75rem, 4vw, 2.25rem)',
              height: 'clamp(2.5rem, 6vw, 3.5rem)'
            }}
          >
            {/* Rodinha do mouse animada */}
            <div 
              className="bg-cyan-400 rounded-full group-hover:bg-pink-400 transition-colors duration-300"
              style={{
                width: 'clamp(0.25rem, 1vw, 0.375rem)',
                height: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                marginTop: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                animation: 'scroll-wheel 2s ease-in-out infinite'
              }}
            />
            
            {/* Efeito de brilho interno */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/20 via-transparent to-transparent" />
          </div>
          
          {/* Anel de pulso externo */}
          <div className="absolute inset-0 rounded-full sm:rounded-2xl border-2 border-cyan-400/40 animate-ping" />
          
          {/* Anel de pulso secundário */}
          <div 
            className="absolute inset-0 rounded-full sm:rounded-2xl border border-purple-400/60"
            style={{
              animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) 0.5s infinite'
            }}
          />
          
          {/* Glow effect de fundo */}
          <div className="absolute inset-0 rounded-full sm:rounded-2xl blur-lg bg-cyan-400/30 group-hover:bg-pink-400/40 transition-colors duration-300 -z-10" />
        </div>
        
        {/* Setas para baixo */}
        <div className="flex flex-col gap-0.5 sm:gap-1" style={{ animation: 'bounce-arrows 2s ease-in-out infinite' }}>
          <div 
            className="w-0 h-0 border-l-transparent border-r-transparent border-t-cyan-400 opacity-80"
            style={{
              borderLeftWidth: 'clamp(0.3rem, 1vw, 0.4rem)',
              borderRightWidth: 'clamp(0.3rem, 1vw, 0.4rem)',
              borderTopWidth: 'clamp(0.4rem, 1.5vw, 0.6rem)'
            }}
          />
          <div 
            className="w-0 h-0 border-l-transparent border-r-transparent border-t-cyan-400 opacity-60"
            style={{
              borderLeftWidth: 'clamp(0.3rem, 1vw, 0.4rem)',
              borderRightWidth: 'clamp(0.3rem, 1vw, 0.4rem)',
              borderTopWidth: 'clamp(0.4rem, 1.5vw, 0.6rem)'
            }}
          />
          <div 
            className="w-0 h-0 border-l-transparent border-r-transparent border-t-cyan-400 opacity-40"
            style={{
              borderLeftWidth: 'clamp(0.3rem, 1vw, 0.4rem)',
              borderRightWidth: 'clamp(0.3rem, 1vw, 0.4rem)',
              borderTopWidth: 'clamp(0.4rem, 1.5vw, 0.6rem)'
            }}
          />
        </div>
      </div>

      {/* CARD CENTRAL PRINCIPAL - RESPONSIVO COM EXPANSÃO MOBILE */}
      <div 
        className={`relative z-10 w-full max-w-[95vw] xs:max-w-[93vw] sm:max-w-[88vw] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto transition-opacity duration-500 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Card
          className={`relative overflow-hidden group transition-all duration-700 ease-out rounded-2xl xs:rounded-2xl sm:rounded-3xl lg:rounded-4xl backdrop-blur-3xl border-2 ${
            glitchEffect ? 'glitch-effect' : ''
          } ${
            isDarkTheme 
              ? 'border-cyan-400/70 shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/60 mobile-card-expand' 
              : 'border-blue-500/70 shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/60 mobile-card-expand'
          }`}
          style={{
            background: isDarkTheme
              ? "linear-gradient(135deg, rgba(0,0,0,0.96) 0%, rgba(10,15,30,0.98) 50%, rgba(0,0,0,0.96) 100%)"
              : "linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(235,245,255,0.99) 50%, rgba(255,255,255,0.97) 100%)",
            transform: 'translateZ(0)',
            willChange: 'transform, opacity',
            minHeight: 'clamp(400px, 70vh, 900px)'
          }}
        >
          {/* EFEITO DE BORDA NEON ANIMADA */}
          <div className={`absolute inset-0 rounded-3xl lg:rounded-4xl pointer-events-none ${
            isDarkTheme 
              ? 'bg-gradient-to-r from-cyan-500/15 via-purple-500/10 to-pink-500/15' 
              : 'bg-gradient-to-r from-blue-500/15 via-indigo-500/10 to-purple-500/15'
          }`} 
          style={{
            animation: 'gradientShift 6s ease-in-out infinite'
          }}
          />

          {/* EFEITO DE SCAN LINES DINÂMICO */}
          <div className="absolute inset-0 pointer-events-none opacity-25 bg-repeat-y bg-scroll"
            style={{
              backgroundImage: `linear-gradient(to bottom, transparent 50%, ${
                isDarkTheme ? 'rgba(0,255,255,0.15)' : 'rgba(59,130,246,0.15)'
              } 50%)`,
              backgroundSize: '100% 3px',
              animation: 'scanMove 20s linear infinite'
            }}
          />

          {/* EFEITO DE CORNER GLOW - MAIS INTENSO */}
          <div className={`absolute -top-2 -left-2 w-12 h-12 rounded-full blur-2xl ${
            isDarkTheme ? 'bg-cyan-400/50' : 'bg-blue-500/50'
          }`} style={{ animation: 'pulse-glow 2s ease-in-out infinite' }} />
          <div className={`absolute -top-2 -right-2 w-12 h-12 rounded-full blur-2xl ${
            isDarkTheme ? 'bg-purple-400/50' : 'bg-indigo-500/50'
          }`} style={{ animation: 'pulse-glow 2s ease-in-out infinite 0.5s' }} />
          <div className={`absolute -bottom-2 -left-2 w-12 h-12 rounded-full blur-2xl ${
            isDarkTheme ? 'bg-pink-400/50' : 'bg-purple-500/50'
          }`} style={{ animation: 'pulse-glow 2s ease-in-out infinite 1s' }} />
          <div className={`absolute -bottom-2 -right-2 w-12 h-12 rounded-full blur-2xl ${
            isDarkTheme ? 'bg-green-400/50' : 'bg-green-500/50'
          }`} style={{ animation: 'pulse-glow 2s ease-in-out infinite 1.5s' }} />

          <CardContent className="text-center relative z-20 flex flex-col justify-center items-center min-h-[400px] px-6 xs:px-8 sm:px-10 md:px-12 lg:px-14 xl:px-18 space-y-6 xs:space-y-7 sm:space-y-9 md:space-y-11 lg:space-y-13 xl:space-y-15"
            style={{
              paddingTop: 'clamp(2.5rem, 8vh, 7rem)',
              paddingBottom: 'clamp(2.5rem, 8vh, 7rem)'
            }}
          >
            {/* BADGE DO SISTEMA AVANÇADO */}
            <Badge
              className="mb-4 xs:mb-5 sm:mb-6 md:mb-7 backdrop-blur-3xl font-mono relative z-20 border-2 transition-all duration-300 hover:scale-110 hover:glow-intense shadow-lg"
              style={{
                background: isDarkTheme
                  ? "linear-gradient(90deg, rgba(0,255,255,0.3) 0%, rgba(255,0,255,0.3) 50%, rgba(0,255,255,0.3) 100%)"
                  : "linear-gradient(90deg, rgba(59,130,246,0.3) 0%, rgba(139,92,246,0.3) 50%, rgba(59,130,246,0.3) 100%)",
                borderColor: isDarkTheme ? 'rgba(0,255,255,0.8)' : 'rgba(59,130,246,0.8)',
                animation: 'pulse-glow 1.5s ease-in-out infinite',
                fontSize: 'clamp(0.875rem, 2vw + 0.25rem, 1.25rem)',
                boxShadow: isDarkTheme
                  ? '0 4px 16px rgba(0,255,255,0.2)'
                  : '0 4px 16px rgba(59,130,246,0.2)'
              }}
            >
              <div className="relative flex items-center gap-3 xs:gap-3.5 sm:gap-4 md:gap-4.5 px-4 xs:px-5 sm:px-6 md:px-7 lg:px-8 py-2.5 xs:py-3 sm:py-3.5 md:py-4">
                <div className="relative hidden xs:block">
                  <RandomTechIcon 
                    size={isMobile ? 18 : isTablet ? 20 : 24}
                    className={isDarkTheme ? "text-cyan-400" : "text-blue-600"}
                  />
                  <div className={`absolute inset-0 animate-ping ${
                    isDarkTheme ? "text-cyan-400" : "text-blue-600"
                  }`}>
                    <RandomTechIcon size={isMobile ? 18 : isTablet ? 20 : 24} />
                  </div>
                </div>
                <span className={`font-bold tracking-wider ${
                  isDarkTheme ? "text-cyan-300" : "text-blue-700"
                }`}>
                  <span className="hidden sm:inline">SYSTEM_ACTIVE </span>v3.0.1
                </span>
                <div className={`rounded-full animate-pulse ${
                  isDarkTheme ? "bg-cyan-400" : "bg-blue-600"
                }`} style={{
                  width: 'clamp(0.55rem, 1.4vw, 0.75rem)',
                  height: 'clamp(0.55rem, 1.4vw, 0.75rem)'
                }} />
              </div>
            </Badge>

            {/* CONTEÚDO PRINCIPAL - TEXTO AJUSTADO PARA CABER */}
            <div className="flex flex-col space-y-5 xs:space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-9 xl:space-y-10 relative w-full max-w-full">
              {/* TÍTULO PRINCIPAL - FLUIDO COM CLAMP */}
              <h1 className={`font-black font-mono tracking-tight leading-none px-2 xs:px-3 sm:px-4 md:px-0 ${
                isDarkTheme 
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400" 
                  : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              }`} style={{
                fontSize: 'clamp(1.75rem, 7vw + 0.5rem, 5rem)',
                animation: 'cyberpunk-glow 2.5s ease-in-out infinite, gradientShift 5s ease-in-out infinite',
                textShadow: isDarkTheme 
                  ? '0 0 30px rgba(0,255,255,0.7), 0 0 50px rgba(255,0,255,0.5), 0 0 70px rgba(0,255,255,0.3)'
                  : '0 0 30px rgba(59,130,246,0.6), 0 0 50px rgba(139,92,246,0.4), 0 0 70px rgba(59,130,246,0.2)',
                lineHeight: 1.05,
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                hyphens: 'auto',
                letterSpacing: '-0.03em'
              }}>
                {primaryText}
              </h1>
              
              {/* SUBTÍTULO TÁTICO - FLUIDO COM CLAMP */}
              <h2 className={`font-semibold font-mono tracking-normal leading-snug px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 ${
                isDarkTheme ? "text-green-400" : "text-green-600"
              }`} style={{
                fontSize: 'clamp(1rem, 3.5vw + 0.3rem, 2rem)',
                animation: 'pulse-subtle 3s ease-in-out infinite, cyberpunk-glow 2s ease-in-out infinite 0.5s',
                textShadow: isDarkTheme 
                  ? '0 0 20px rgba(0,255,0,0.6), 0 0 40px rgba(0,255,0,0.3)' 
                  : '0 0 20px rgba(34,197,94,0.5), 0 0 40px rgba(34,197,94,0.25)',
                lineHeight: 1.3,
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                hyphens: 'auto',
                letterSpacing: '-0.02em'
              }}>
                {subText}
              </h2>
            </div>

            {/* INTERFACE DE CONTROLE TÁTICO - RESPONSIVO */}
            <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4 sm:gap-5 md:gap-6 lg:gap-7 pt-7 xs:pt-8 sm:pt-9 md:pt-10 lg:pt-12 xl:pt-14 w-full max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl px-2 xs:px-3 sm:px-0">
              <Button
                size={isMobile ? "default" : "lg"}
                className="font-mono relative overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-95 group/btn flex-1 font-bold shadow-lg hover:shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, #ec4899 0%, #06b6d4 50%, #8b5cf6 100%)",
                  border: 'none',
                  animation: 'electric-pulse 2s ease-in-out infinite',
                  minHeight: 'clamp(3.25rem, 12vw, 5rem)',
                  padding: 'clamp(1rem, 3vw, 1.75rem) clamp(2rem, 6vw, 3.5rem)',
                  fontSize: 'clamp(1rem, 2.5vw + 0.25rem, 1.5rem)',
                  boxShadow: isDarkTheme 
                    ? '0 8px 32px rgba(6, 182, 212, 0.3), 0 0 0 1px rgba(6, 182, 212, 0.1)'
                    : '0 8px 32px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform group-hover/btn:translate-x-full transition-transform duration-1000" />
                <span className="font-bold text-white tracking-wider flex items-center justify-center relative z-10 gap-2.5 sm:gap-3">
                  <div 
                    className="bg-white rounded-full animate-ping"
                    style={{
                      width: 'clamp(0.55rem, 1.8vw, 0.875rem)',
                      height: 'clamp(0.55rem, 1.8vw, 0.875rem)'
                    }}
                  />
                  <span className="hidden xs:inline">[EXECUTE] </span>PROJETOS
                </span>
              </Button>

              <Button
                variant="outline"
                size={isMobile ? "default" : "lg"}
                className={`backdrop-blur-3xl font-mono relative overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-95 border-2 flex-1 font-bold shadow-lg hover:shadow-2xl ${
                  isDarkTheme 
                    ? 'border-cyan-400/80 bg-black/60 hover:bg-cyan-400/20 hover:border-cyan-400 hover:shadow-cyan-500/40' 
                    : 'border-blue-500/80 bg-white/80 hover:bg-blue-500/15 hover:border-blue-500 hover:shadow-blue-500/40'
                }`}
                style={{
                  animation: 'electric-pulse 2.5s ease-in-out infinite 0.5s',
                  minHeight: 'clamp(3.25rem, 12vw, 5rem)',
                  padding: 'clamp(1rem, 3vw, 1.75rem) clamp(2rem, 6vw, 3.5rem)',
                  fontSize: 'clamp(1rem, 2.5vw + 0.25rem, 1.5rem)'
                }}
              >
                <span className={`font-bold tracking-wider flex items-center justify-center gap-2.5 sm:gap-3 ${
                  isDarkTheme ? "text-cyan-300" : "text-blue-700"
                }`}>
                  <div 
                    className={`rounded-full animate-ping ${
                      isDarkTheme ? "bg-cyan-400" : "bg-blue-600"
                    }`}
                    style={{
                      width: 'clamp(0.55rem, 1.8vw, 0.875rem)',
                      height: 'clamp(0.55rem, 1.8vw, 0.875rem)'
                    }}
                  />
                  <span className="hidden xs:inline">[CONNECT] </span>CONTATO
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ESTILOS CYBERPUNK AVANÇADOS */}
      <style jsx>{`
        /* ANIMAÇÕES DO SCROLL INDICATOR */
        @keyframes scroll-wheel {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(8px);
            opacity: 0.3;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes bounce-arrows {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(8px);
            opacity: 0.7;
          }
        }

        /* MATRIX BINARY FALL - Movimento como bits de processador */
        @keyframes matrixBinaryFall {
          from { 
            transform: translate3d(0, -100vh, 0) translateZ(0); 
            opacity: 0;
          }
          2% {
            opacity: 1;
          }
          98% {
            opacity: 1;
          }
          to { 
            transform: translate3d(0, 0, 0) translateZ(0); 
            opacity: 0;
          }
        }

        /* PULSO BINÁRIO - Bits ativos pulsando */
        @keyframes binary-pulse {
          0%, 100% { 
            opacity: 1;
            transform: scale(1.1);
          }
          50% { 
            opacity: 0.8;
            transform: scale(1.15);
          }
        }

        /* SHIMMER HIPNÓTICO - Efeito de brilho para bits '1' */
        @keyframes binary-shimmer {
          0%, 100% { 
            opacity: 0.85;
            filter: brightness(1.1);
          }
          50% { 
            opacity: 1;
            filter: brightness(1.4) saturate(1.3);
          }
        }

        /* CLASSES PARA BITS */
        .glow-binary-head {
          animation: binary-pulse 1.5s ease-in-out infinite;
        }

        .glow-binary-trail {
          animation: binary-pulse 2s ease-in-out infinite 0.3s;
        }

        .glow-binary-fade {
          animation: none;
        }

        /* OTIMIZADO: Transform + Opacity = GPU Accelerated */
        @keyframes quantumFloat {
          0%, 100% { 
            transform: translate3d(0, 0, 0) scale(1); 
            opacity: 0.75; 
          }
          50% { 
            transform: translate3d(15px, -30px, 0) scale(1.15); 
            opacity: 0.95; 
          }
        }

        /* OTIMIZADO: Filter simplificado */
        @keyframes cyberpunk-glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.3); }
        }

        /* OTIMIZADO: Menos shadows */
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }

        /* OTIMIZADO: Box-shadow simplificado */
        @keyframes electric-pulse {
          0%, 100% { 
            opacity: 0.95;
          }
          50% { 
            opacity: 1;
          }
        }

        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.03); }
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes scanMove {
          0% { background-position: 0 0; }
          100% { background-position: 0 150vh; }
        }

        @keyframes hologramScan {
          0% { transform: translateY(-100%); opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }

        .glow-intense {
          filter: drop-shadow(0 0 15px currentColor);
        }

        /* OTIMIZADO: Animação mais leve */
        .glow-cyberpunk {
          animation: cyberpunk-pulse 1.5s ease-in-out infinite;
        }

        @keyframes cyberpunk-pulse {
          0%, 100% { 
            opacity: 0.95;
            transform: scale(1.08);
          }
          50% { 
            opacity: 1;
            transform: scale(1.12);
          }
        }

        /* OTIMIZADO: Animação simplificada */
        .trail-bright {
          animation: trail-glow 2s ease-in-out infinite;
        }

        @keyframes trail-glow {
          0%, 100% { 
            opacity: 0.9;
          }
          50% { 
            opacity: 1;
          }
        }

        /* OTIMIZADO: Contenção de GPU sem excessos */
        .matrix-column-wrapper {
          backface-visibility: hidden;
          transform: translateZ(0);
        }
        
        .matrix-grid {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* OTIMIZADO: Hover simplificado */
        .matrix-character {
          transition: opacity 0.15s ease-out;
        }

        @media (hover: hover) {
          .matrix-character:hover {
            opacity: 1 !important;
          }
        }

        .glitch-effect {
          animation: glitch 0.3s linear;
        }

        /* OTIMIZADO: Glitch mais leve sem hue-rotate */
        @keyframes glitch {
          0% { transform: translate3d(0, 0, 0); }
          20% { transform: translate3d(-3px, 2px, 0); }
          40% { transform: translate3d(3px, -2px, 0); }
          60% { transform: translate3d(-2px, 1px, 0); }
          80% { transform: translate3d(2px, -1px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        /* RESPONSIVIDADE OTIMIZADA PARA TODOS OS DISPOSITIVOS */
        
        /* Garantir centralização perfeita */
        .mobile-card-expand {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* Ajustes para muito pequenas telas - SOBE O CARD */
        @media (max-width: 320px) {
          .mobile-card-expand {
            min-height: 85vh !important;
            max-height: 92vh !important;
            transform: translateY(-5vh) translateZ(0);
          }
        }

        /* Mobile pequeno (321px - 375px) - SOBE O CARD */
        @media (min-width: 321px) and (max-width: 375px) {
          .mobile-card-expand {
            min-height: 80vh !important;
            max-height: 90vh !important;
            transform: translateY(-4vh) translateZ(0);
          }
        }

        /* Mobile médio (376px - 640px) - SOBE O CARD */
        @media (min-width: 376px) and (max-width: 640px) {
          .mobile-card-expand {
            min-height: 78vh !important;
            max-height: 88vh !important;
            transform: translateY(-3vh) translateZ(0);
          }
        }

        /* Tablets portrait pequeno (641px - 768px) - SOBE LEVEMENTE */
        @media (min-width: 641px) and (max-width: 768px) {
          .mobile-card-expand {
            min-height: 72vh !important;
            max-height: 85vh !important;
            transform: translateY(-2vh) translateZ(0);
          }
        }

        /* Tablets portrait médio (769px - 900px) - SOBE LEVEMENTE */
        @media (min-width: 769px) and (max-width: 900px) {
          .mobile-card-expand {
            min-height: 68vh !important;
            max-height: 82vh !important;
            transform: translateY(-1.5vh) translateZ(0);
          }
        }

        /* Tablets landscape (901px - 1024px) - SOBE LEVEMENTE */
        @media (min-width: 901px) and (max-width: 1024px) {
          .mobile-card-expand {
            min-height: 65vh !important;
            max-height: 78vh !important;
            transform: translateY(-1vh) translateZ(0);
          }
        }

        /* Desktop pequeno (1025px - 1280px) */
        @media (min-width: 1025px) and (max-width: 1280px) {
          .mobile-card-expand {
            min-height: 60vh !important;
            max-height: none;
          }
        }

        /* Desktop médio (1281px - 1920px) */
        @media (min-width: 1281px) and (max-width: 1920px) {
          .mobile-card-expand {
            min-height: auto;
            max-height: none;
          }
        }

        /* Desktop grande (1921px+) */
        @media (min-width: 1921px) {
          .mobile-card-expand {
            min-height: auto;
            max-height: 80vh;
          }
        }

        /* Landscape mobile - Altura específica - SOBE MAIS */
        @media (max-width: 900px) and (orientation: landscape) and (max-height: 500px) {
          .mobile-card-expand {
            min-height: 88vh !important;
            max-height: 95vh !important;
            transform: translateY(-3vh) translateZ(0) !important;
          }
        }

        @media (max-width: 900px) and (orientation: landscape) and (min-height: 501px) {
          .mobile-card-expand {
            min-height: 82vh !important;
            max-height: 90vh !important;
            transform: translateY(-2vh) translateZ(0) !important;
          }
        }

        /* Landscape tablet - Otimizar para telas largas */
        @media (min-width: 901px) and (max-width: 1366px) and (orientation: landscape) {
          .mobile-card-expand {
            min-height: 78vh !important;
            max-height: 88vh !important;
            transform: translateY(-1vh) translateZ(0);
          }
        }

        /* Efeito de expansão do card - Sempre centralizado */
        .mobile-card-expand {
          animation: card-entrance 0.6s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
          transform-origin: center center;
        }

        @keyframes card-entrance {
          0% {
            transform: scale(0.96) translateZ(0);
            opacity: 0;
          }
          100% {
            transform: scale(1) translateZ(0);
            opacity: 1;
          }
        }

        /* Efeito de touch no mobile para feedback - PRESERVA translateY */
        @media (max-width: 320px) {
          .mobile-card-expand:active {
            transform: translateY(-5vh) scale(0.985) translateZ(0);
            transition: transform 0.12s ease-out;
          }
        }

        @media (min-width: 321px) and (max-width: 375px) {
          .mobile-card-expand:active {
            transform: translateY(-4vh) scale(0.985) translateZ(0);
            transition: transform 0.12s ease-out;
          }
        }

        @media (min-width: 376px) and (max-width: 640px) {
          .mobile-card-expand:active {
            transform: translateY(-3vh) scale(0.985) translateZ(0);
            transition: transform 0.12s ease-out;
          }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          .mobile-card-expand:active {
            transform: translateY(-2vh) scale(0.985) translateZ(0);
            transition: transform 0.12s ease-out;
          }
        }

        @media (min-width: 769px) and (max-width: 900px) {
          .mobile-card-expand:active {
            transform: translateY(-1.5vh) scale(0.985) translateZ(0);
            transition: transform 0.12s ease-out;
          }
        }

        @media (min-width: 901px) and (max-width: 1024px) {
          .mobile-card-expand:active {
            transform: translateY(-1vh) scale(0.985) translateZ(0);
            transition: transform 0.12s ease-out;
          }
        }

        /* Landscape mobile - ACTIVE state */
        @media (max-width: 900px) and (orientation: landscape) and (max-height: 500px) {
          .mobile-card-expand:active {
            transform: translateY(-3vh) scale(0.985) translateZ(0) !important;
            transition: transform 0.12s ease-out;
          }
        }

        @media (max-width: 900px) and (orientation: landscape) and (min-height: 501px) {
          .mobile-card-expand:active {
            transform: translateY(-2vh) scale(0.985) translateZ(0) !important;
            transition: transform 0.12s ease-out;
          }
        }

        /* Landscape tablet - ACTIVE state */
        @media (min-width: 901px) and (max-width: 1366px) and (orientation: landscape) {
          .mobile-card-expand:active {
            transform: translateY(-1vh) scale(0.985) translateZ(0);
            transition: transform 0.12s ease-out;
          }
        }

        /* Hover em desktop */
        @media (min-width: 1025px) and (hover: hover) {
          .mobile-card-expand:hover {
            transform: scale(1.01) translateZ(0);
            transition: transform 0.3s ease-out;
          }
        }
      `}</style>
    </div>
  )
})

export default Carousel
