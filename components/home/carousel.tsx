"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, Cpu, Zap, Shield, Cloud, Brain } from "lucide-react"
import { useTheme } from "next-themes"

/* ==========================================================
   CONSTANTES CYBERPUNK
   ========================================================== */

const AUTOPLAY_INTERVAL_MS = 5000

const PRIMARY_TEXTS = [
  "SISTEMA FULL-STACK ONLINE",
  "COMPUTAÇÃO EM NUVEM AVANÇADA", 
  "OTIMIZAÇÃO DE PERFORMANCE",
  "CONSULTORIA TÉCNICA ESPECIALIZADA",
  "BANCO DE DADOS QUÂNTICO",
  "DESENVOLVIMENTO MOBILE HÍBRIDO",
  "SEGURANÇA DIGITAL AVANÇADA",
  "GESTÃO DE EQUIPES ÁGEIS",
  "DESIGN UI/UX IMERSIVO",
  "INOVAÇÃO TECNOLÓGICA RADICAL",
  "SOLUÇÕES WEB ESCALÁVEIS",
  "ARQUITETURA DE SOFTWARE NEURAL", 
  "DEVOPS & CI/CD AUTOMATIZADO",
  "ANÁLISE DE DADOS PREDITIVA",
  "INTELIGÊNCIA ARTIFICIAL GENERATIVA",
]

const SUBTEXTS = [
  "CODIFICANDO ESTRATÉGIAS EM REALIDADE DIGITAL",
  "INFRAESTRUTURA DISTRIBUÍDA E AUTO-ESCALÁVEL",
  "APLICAÇÕES DE ALTA VELOCIDADE E CONFIABILIDADE",
  "MENTORIA ARQUITETURAL E VISÃO ESTRATÉGICA",
  "MODELAGEM DE DADOS E OTIMIZAÇÃO QUÂNTICA",
  "APPS NATIVOS E PLATAFORMAS MULTIDIMENSIONAIS",
  "PROTEÇÃO AVANÇADA DE ATIVOS DIGITAIS",
  "LIDERANÇA TÉCNICA E CULTURA DE INOVAÇÃO",
  "DESIGN QUE CONECTA HUMANOS E MÁQUINAS",
  "PROTÓTIPOS QUE EVOLUEM PARA ECOSSISTEMAS",
  "FRONT-END NEURAL E BACK-END DISTRIBUÍDO",
  "ESTRUTURAS MODULARES E SISTEMAS AUTÔNOMOS",
  "CI/CD, AUTOMAÇÃO E GOVERNANÇA INTELIGENTE",
  "EXTRAINDO INSIGHTS E VALOR DOS DADOS",
  "MODELOS GENERATIVOS E AUTOMAÇÃO COGNITIVA",
]

const TECH_ICONS = [Cpu, Zap, Shield, Cloud, Brain, Code]

// MATRIX OTIMIZADO: Bits de processador + símbolos tech
const MATRIX_CHARS = "01"
const TECH_SYMBOLS = "◢◣◤◥◈◉◊◌◍◎◐◑◒◓◔◕◖◗◘◙◚◛◜◝◞◟◠◡◢◣◤◥◈◉◊◌◍◎◐◑◒◓◔◕◖◗◘◙◚◛◜◝◞◟◠◡◢◣◤◥"
const BINARY_PATTERNS = [
  "0101", "1010", "0110", "1001", "0011", "1100",
  "1111", "0000", "1000", "0111", "1101", "0010",
  "0100", "1110", "1011", "0110", "0001", "1010",
  "1001", "0011", "0101", "0111", "0100", "1000"
]

/* ==========================================================
   TIPOS
   ========================================================== */

interface MatrixColumn {
  id: string
  leftPct: number
  fontSize: number
  animationDuration: number
  animationDelay: number
  characters: string[]
  intensity: number
  type: 'binary' | 'symbol' | 'mixed'
  speed: number
}

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

interface CarouselProps {
  autoPlayInterval?: number
  enableAutoPlay?: boolean
}

/* ==========================================================
   COMPONENTE PRINCIPAL - CYBERPUNK CARRUSEL AVANÇADO
   ========================================================== */

export default function Carousel({ 
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
  const containerRef = useRef<HTMLDivElement>(null)

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  const actualAutoPlayInterval = prefersReducedMotion ? 0 : autoPlayInterval

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
    
    const mobileBreakpoint = 768
    const tabletBreakpoint = 1024
    
    setIsMobile(width < mobileBreakpoint)
    setIsTablet(width >= mobileBreakpoint && width < tabletBreakpoint)

    // Sistema Matrix Rain OTIMIZADO - Performance e Beleza
    const columnCount = isMobile ? 
      Math.min(20, Math.max(12, Math.floor(width / 25))) : 
      isTablet ? 
      Math.min(30, Math.max(18, Math.floor(width / 30))) :
      Math.min(45, Math.max(25, Math.floor(width / 35)))

    const newColumns: MatrixColumn[] = Array.from({ length: columnCount }).map((_, i) => {
      const randomId = Math.round(Math.random() * 10000)
      const charactersCount = isMobile ? 8 + Math.floor(Math.random() * 6) : 10 + Math.floor(Math.random() * 8)
      const intensity = 0.6 + Math.random() * 0.3
      
      // Tipos de coluna para variar o efeito
      const columnTypes: Array<'binary' | 'symbol' | 'mixed'> = ['binary', 'symbol', 'mixed']
      const type: 'binary' | 'symbol' | 'mixed' = columnTypes[i % 3] || 'binary'
      
      // Gerar caracteres baseado no tipo
      let characters: string[]
      if (type === 'binary') {
        // Padrões binários realistas
        characters = Array.from({ length: charactersCount }).map((_, idx) => {
          if (idx === 0) return '1' // Sempre 1 no topo
          const pattern = BINARY_PATTERNS[Math.floor(Math.random() * BINARY_PATTERNS.length)] || "0101"
          return pattern[idx % pattern.length] || "0"
        })
      } else if (type === 'symbol') {
        // Símbolos tech
        characters = Array.from({ length: charactersCount }).map(() => 
          TECH_SYMBOLS[Math.floor(Math.random() * TECH_SYMBOLS.length)] || "◢"
        )
      } else {
        // Mix de binário e símbolos
        characters = Array.from({ length: charactersCount }).map((_, idx) => {
          if (idx === 0) return '1'
          return Math.random() > 0.3 ? 
            MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)] || "0" :
            TECH_SYMBOLS[Math.floor(Math.random() * TECH_SYMBOLS.length)] || "◢"
        })
      }
      
      return {
        id: `col-${i}-${randomId}`,
        leftPct: (i / columnCount) * 100,
        fontSize: isMobile ? 12 + Math.random() * 4 : isTablet ? 14 + Math.random() * 6 : 16 + Math.random() * 6,
        // Velocidade variada como bits de processador
        animationDuration: type === 'binary' ? 3 + Math.random() * 2 : 4 + Math.random() * 3,
        animationDelay: (i / columnCount) * 8,
        characters,
        intensity,
        type,
        speed: type === 'binary' ? 1.2 : type === 'symbol' ? 0.8 : 1.0
      }
    })

    setMatrixColumns(newColumns)

    // Sistema de Partículas OTIMIZADO - Menos é mais
    const particleCount = isMobile ? 
      Math.min(12, Math.max(6, Math.floor(width / 120))) :
      isTablet ?
      Math.min(20, Math.max(10, Math.floor(width / 100))) :
      Math.min(30, Math.max(15, Math.floor(width / 80)))

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
  }, [mounted, isMobile, isTablet, resolvedTheme])

  useEffect(() => {
    if (!mounted) return
    
    updateResponsiveDimensions()
    setIsReady(true)
    
    let rafId: number | null = null
    const handleResize = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => updateResponsiveDimensions())
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      if (rafId) cancelAnimationFrame(rafId)
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
  const primaryText = PRIMARY_TEXTS[currentTextIndex % PRIMARY_TEXTS.length]
  const subText = SUBTEXTS[currentTextIndex % SUBTEXTS.length]
  const RandomTechIcon = TECH_ICONS[currentTextIndex % TECH_ICONS.length] || Code

  if (!isReady) {
    return (
      <div className="flex items-center justify-center w-full h-full">
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
      className="relative w-full h-full flex items-center justify-center p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8"
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
              {/* Primeiro set - Bits de processador */}
              <div className="flex flex-col gap-0 whitespace-pre text-center" style={{ opacity: column.intensity }}>
                {column.characters.map((character, index) => {
                  // Cores baseadas no tipo de coluna
                  let charColor = ''
                  let glowColor = ''
                  
                  if (column.type === 'binary') {
                    charColor = isDarkTheme ? 'text-green-400' : 'text-green-600'
                    glowColor = isDarkTheme ? '#00ff00' : '#10b981'
                  } else if (column.type === 'symbol') {
                    charColor = isDarkTheme ? 'text-cyan-400' : 'text-blue-500'
                    glowColor = isDarkTheme ? '#00ffff' : '#3b82f6'
                  } else {
                    charColor = isDarkTheme ? 'text-purple-400' : 'text-purple-600'
                    glowColor = isDarkTheme ? '#a855f7' : '#9333ea'
                  }
                  
                  return (
                    <span
                      key={`${column.id}-ch-${index}-1`}
                      className={`matrix-binary font-mono font-bold tracking-wider ${charColor} ${
                        index === 0 ? 'glow-binary-head' : index < 2 ? 'glow-binary-trail' : 'glow-binary-fade'
                      }`}
                      style={{
                        fontSize: `${column.fontSize}px`,
                        opacity: index === 0 ? 1 : Math.max(0.2, 1 - index * 0.08),
                        textShadow: index === 0 
                          ? `0 0 15px ${glowColor}, 0 0 25px ${glowColor}`
                          : index < 2
                          ? `0 0 8px ${glowColor}, 0 0 15px ${glowColor}`
                          : `0 0 5px ${glowColor}`,
                        filter: index === 0 
                          ? 'brightness(1.4) contrast(1.2)' 
                          : index < 2
                          ? 'brightness(1.2)'
                          : 'brightness(1.1)',
                        transform: index === 0 ? 'scale(1.1)' : 'scale(1)',
                        fontWeight: index === 0 ? '900' : index < 2 ? '800' : '700',
                        // Efeito de pulso para bits ativos
                        animation: index === 0 ? 'binary-pulse 1.5s ease-in-out infinite' : 'none'
                      }}
                    >
                      {character}
                    </span>
                  )
                })}
              </div>
              
              {/* Segundo set - Continuidade */}
              <div className="flex flex-col gap-0 whitespace-pre text-center" style={{ opacity: column.intensity }}>
                {column.characters.map((character, index) => {
                  let charColor = ''
                  let glowColor = ''
                  
                  if (column.type === 'binary') {
                    charColor = isDarkTheme ? 'text-green-400' : 'text-green-600'
                    glowColor = isDarkTheme ? '#00ff00' : '#10b981'
                  } else if (column.type === 'symbol') {
                    charColor = isDarkTheme ? 'text-cyan-400' : 'text-blue-500'
                    glowColor = isDarkTheme ? '#00ffff' : '#3b82f6'
                  } else {
                    charColor = isDarkTheme ? 'text-purple-400' : 'text-purple-600'
                    glowColor = isDarkTheme ? '#a855f7' : '#9333ea'
                  }
                  
                  return (
                <span
                      key={`${column.id}-ch-${index}-2`}
                      className={`matrix-binary font-mono font-bold tracking-wider ${charColor} ${
                        index === 0 ? 'glow-binary-head' : index < 2 ? 'glow-binary-trail' : 'glow-binary-fade'
                  }`}
                  style={{
                        fontSize: `${column.fontSize}px`,
                        opacity: index === 0 ? 1 : Math.max(0.2, 1 - index * 0.08),
                    textShadow: index === 0 
                          ? `0 0 15px ${glowColor}, 0 0 25px ${glowColor}`
                          : index < 2
                          ? `0 0 8px ${glowColor}, 0 0 15px ${glowColor}`
                          : `0 0 5px ${glowColor}`,
                        filter: index === 0 
                          ? 'brightness(1.4) contrast(1.2)' 
                          : index < 2
                          ? 'brightness(1.2)'
                          : 'brightness(1.1)',
                        transform: index === 0 ? 'scale(1.1)' : 'scale(1)',
                        fontWeight: index === 0 ? '900' : index < 2 ? '800' : '700',
                        animation: index === 0 ? 'binary-pulse 1.5s ease-in-out infinite' : 'none'
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

        {/* EFEITOS DE SCANLINE OTIMIZADOS */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-0.5 opacity-35"
              style={{
                top: `${(i / 6) * 100}%`,
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

      {/* CARD CENTRAL PRINCIPAL - RESPONSIVO TOTAL */}
      <div className="relative z-10 w-full max-w-[95vw] xs:max-w-[90vw] sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto">
        <Card
          className={`relative overflow-hidden group transition-all duration-500 ease-out rounded-2xl sm:rounded-3xl lg:rounded-4xl backdrop-blur-2xl border border-2 ${
            glitchEffect ? 'glitch-effect' : ''
          } ${
            isDarkTheme 
              ? 'border-cyan-400/50 shadow-xl sm:shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/40' 
              : 'border-blue-500/50 shadow-xl sm:shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/40'
          }`}
          style={{
            background: isDarkTheme
              ? "linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(10,15,30,0.95) 50%, rgba(0,0,0,0.92) 100%)"
              : "linear-gradient(135deg, rgba(255,255,255,0.94) 0%, rgba(235,245,255,0.97) 50%, rgba(255,255,255,0.94) 100%)",
            transform: 'translateZ(0)',
            minHeight: 'auto'
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

          {/* EFEITO DE CORNER GLOW */}
          <div className={`absolute -top-1 -left-1 w-8 h-8 rounded-full blur-xl ${
            isDarkTheme ? 'bg-cyan-400/40' : 'bg-blue-500/40'
          }`} />
          <div className={`absolute -top-1 -right-1 w-8 h-8 rounded-full blur-xl ${
            isDarkTheme ? 'bg-purple-400/40' : 'bg-indigo-500/40'
          }`} />
          <div className={`absolute -bottom-1 -left-1 w-8 h-8 rounded-full blur-xl ${
            isDarkTheme ? 'bg-pink-400/40' : 'bg-purple-500/40'
          }`} />
          <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full blur-xl ${
            isDarkTheme ? 'bg-green-400/40' : 'bg-green-500/40'
          }`} />

          <CardContent className="text-center relative z-20 flex flex-col justify-center items-center px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 py-6 xs:py-8 sm:py-10 md:py-12 lg:py-16 xl:py-18 space-y-4 xs:space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
            {/* BADGE DO SISTEMA AVANÇADO */}
            <Badge
              className="mb-3 xs:mb-4 sm:mb-6 md:mb-8 backdrop-blur-2xl font-mono text-[10px] xs:text-xs sm:text-sm md:text-base relative z-20 border border-2 transition-all duration-300 hover:scale-105 hover:glow-intense"
              style={{
                background: isDarkTheme
                  ? "linear-gradient(90deg, rgba(0,255,255,0.25) 0%, rgba(255,0,255,0.25) 50%, rgba(0,255,255,0.25) 100%)"
                  : "linear-gradient(90deg, rgba(59,130,246,0.25) 0%, rgba(139,92,246,0.25) 50%, rgba(59,130,246,0.25) 100%)",
                borderColor: isDarkTheme ? 'rgba(0,255,255,0.7)' : 'rgba(59,130,246,0.7)',
                animation: 'pulse-glow 1.5s ease-in-out infinite'
              }}
            >
              <div className="relative flex items-center space-x-2 xs:space-x-2.5 sm:space-x-3 md:space-x-4 px-2 xs:px-3 sm:px-4 md:px-5 py-1.5 xs:py-1.5 sm:py-2 md:py-2.5">
                <div className="relative hidden xs:block">
                  <RandomTechIcon 
                    size={isMobile ? 14 : isTablet ? 18 : 22}
                    className={isDarkTheme ? "text-cyan-400" : "text-blue-600"}
                  />
                  <div className={`absolute inset-0 animate-ping ${
                    isDarkTheme ? "text-cyan-400" : "text-blue-600"
                  }`}>
                    <RandomTechIcon size={isMobile ? 14 : isTablet ? 18 : 22} />
                  </div>
                </div>
                <span className={`font-bold tracking-wider ${
                  isDarkTheme ? "text-cyan-300" : "text-blue-700"
                }`}>
                  SYSTEM_ACTIVE v3.0.1
                </span>
                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse ${
                  isDarkTheme ? "bg-cyan-400" : "bg-blue-600"
                }`} />
              </div>
            </Badge>

            {/* CONTEÚDO PRINCIPAL - TEXTO AJUSTADO PARA CABER */}
            <div className="flex flex-col space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 relative w-full">
              {/* TÍTULO PRINCIPAL - TAMANHO AJUSTADO E QUEBRA DE LINHA */}
              <h1 className={`font-black font-mono tracking-tight leading-tight text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl px-1 xs:px-2 ${
                isDarkTheme 
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400" 
                  : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              }`} style={{
                animation: 'cyberpunk-glow 2.5s ease-in-out infinite, gradientShift 5s ease-in-out infinite',
                // OTIMIZADO: Menos shadows, ainda impressionante
                textShadow: isDarkTheme 
                  ? '0 0 20px rgba(0,255,255,0.5), 0 0 40px rgba(255,0,255,0.3)'
                  : '0 0 20px rgba(59,130,246,0.4), 0 0 40px rgba(139,92,246,0.2)',
                lineHeight: 1.15,
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                hyphens: 'auto'
              }}>
                {primaryText}
              </h1>
              
              {/* SUBTÍTULO TÁTICO - TAMANHO AJUSTADO */}
              <h2 className={`font-semibold font-mono tracking-normal leading-relaxed text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl px-2 xs:px-3 sm:px-4 md:px-6 ${
                isDarkTheme ? "text-green-400" : "text-green-600"
              }`} style={{
                animation: 'pulse-subtle 3s ease-in-out infinite, cyberpunk-glow 2s ease-in-out infinite 0.5s',
                // OTIMIZADO: Efeito mantido com menos layers
                textShadow: isDarkTheme 
                  ? '0 0 15px rgba(0,255,0,0.4), 0 0 30px rgba(0,255,0,0.2)' 
                  : '0 0 15px rgba(34,197,94,0.3), 0 0 30px rgba(34,197,94,0.15)',
                lineHeight: 1.4,
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                hyphens: 'auto'
              }}>
                {subText}
              </h2>
            </div>

            {/* INTERFACE DE CONTROLE TÁTICO - RESPONSIVO */}
            <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 xs:gap-3.5 sm:gap-4 md:gap-6 lg:gap-8 pt-4 xs:pt-6 sm:pt-8 md:pt-10 lg:pt-12 w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
              <Button
                size={isMobile ? "default" : "lg"}
                className="font-mono relative overflow-hidden transition-all duration-300 hover:scale-105 group/btn flex-1 min-h-11 xs:min-h-12 sm:min-h-14 md:min-h-16 text-xs xs:text-sm sm:text-base md:text-lg"
                style={{
                  background: "linear-gradient(135deg, #ec4899 0%, #06b6d4 50%, #8b5cf6 100%)",
                  border: 'none',
                  animation: 'electric-pulse 2s ease-in-out infinite'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform group-hover/btn:translate-x-full transition-transform duration-1000" />
                <span className="font-bold text-white tracking-wider flex items-center justify-center relative z-10">
                  <div className="bg-white rounded-full mr-2 sm:mr-3 animate-ping w-2 h-2 sm:w-3 sm:h-3" />
                  <span className="hidden xs:inline">[EXECUTE] </span>PROJETOS
                </span>
              </Button>

              <Button
                variant="outline"
                size={isMobile ? "default" : "lg"}
                className={`backdrop-blur-2xl font-mono relative overflow-hidden transition-all duration-300 hover:scale-105 border border-2 flex-1 min-h-11 xs:min-h-12 sm:min-h-14 md:min-h-16 text-xs xs:text-sm sm:text-base md:text-lg ${
                  isDarkTheme 
                    ? 'border-cyan-400/70 bg-black/50 hover:bg-cyan-400/15 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25' 
                    : 'border-blue-500/70 bg-white/70 hover:bg-blue-500/10 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/25'
                }`}
                style={{
                  animation: 'electric-pulse 2.5s ease-in-out infinite 0.5s'
                }}
              >
                <span className={`font-bold tracking-wider flex items-center justify-center ${
                  isDarkTheme ? "text-cyan-300" : "text-blue-700"
                }`}>
                  <div className={`rounded-full mr-2 sm:mr-3 animate-ping w-2 h-2 sm:w-3 sm:h-3 ${
                    isDarkTheme ? "bg-cyan-400" : "bg-blue-600"
                  }`} />
                  <span className="hidden xs:inline">[CONNECT] </span>CONTATO
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ESTILOS CYBERPUNK AVANÇADOS */}
      <style jsx>{`
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

        /* Garantir que o texto quebre corretamente em todos os dispositivos */
        @media (max-width: 360px) {
          .text-lg {
            font-size: 1rem;
            line-height: 1.2;
          }
          .text-xs {
            font-size: 0.7rem;
            line-height: 1.3;
          }
        }

        @media (min-width: 361px) and (max-width: 640px) {
          .text-xl {
            font-size: 1.125rem;
            line-height: 1.2;
          }
          .text-sm {
            font-size: 0.8rem;
            line-height: 1.3;
          }
        }

        @media (max-width: 768px) and (orientation: landscape) {
          h1, h2 {
            font-size: clamp(0.875rem, 4vw, 1.5rem) !important;
          }
        }

        /* Garantir responsividade em tablets */
        @media (min-width: 768px) and (max-width: 1024px) {
          .text-3xl {
            font-size: 1.75rem;
          }
          .text-lg {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  )
}