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

const AUTOPLAY_INTERVAL_MS = 6000

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

const MATRIX_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*<>?/\\|=+"

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

    const glitchInterval = setInterval(() => {
      setGlitchEffect(true)
      setTimeout(() => setGlitchEffect(false), 80 + Math.random() * 40)
    }, 2500 + Math.random() * 3000)

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

    // Sistema Matrix Rain Avançado com Densidade Dinâmica
    const columnCount = isMobile ? 
      Math.min(25, Math.max(12, Math.floor(width / 20))) : 
      isTablet ? 
      Math.min(40, Math.max(20, Math.floor(width / 25))) :
      Math.min(60, Math.max(25, Math.floor(width / 30)))

    const newColumns: MatrixColumn[] = Array.from({ length: columnCount }).map((_, i) => {
      const randomId = Math.round(Math.random() * 10000)
      const charactersCount = 15 + Math.floor(Math.random() * 25)
      const intensity = 0.4 + Math.random() * 0.6
      
      return {
        id: `col-${i}-${randomId}`,
        leftPct: (i / columnCount) * 100,
        fontSize: isMobile ? 10 + Math.random() * 10 : isTablet ? 12 + Math.random() * 12 : 14 + Math.random() * 14,
        animationDuration: 6 + Math.random() * 15,
        animationDelay: Math.random() * 20,
        characters: Array.from({ length: charactersCount }).map(() => 
          MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)] || "0"
        ),
        intensity
      }
    })

    setMatrixColumns(newColumns)

    // Sistema de Partículas Quânticas Avançado
    const particleCount = isMobile ? 
      Math.min(20, Math.max(10, Math.floor(width / 100))) :
      isTablet ?
      Math.min(35, Math.max(15, Math.floor(width / 80))) :
      Math.min(50, Math.max(20, Math.floor(width / 60)))

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
        size: isMobile ? 1 + Math.random() * 6 : 2 + Math.random() * 10,
        color,
        duration: 3 + Math.random() * 8,
        delay: Math.random() * 8,
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
      className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 lg:p-8"
      role="region"
      aria-label="Advanced Cyberpunk Presentation System"
    >
      {/* SISTEMA DE FUNDO HOLOGRÁFICO AVANÇADO */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* CAMADAS DE GRADIENTE DINÂMICO MULTICAMADA */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/25 via-black/70 to-purple-900/35" />
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-900/20 via-transparent to-green-900/25 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-bl from-blue-900/15 via-transparent to-yellow-900/20 mix-blend-color" />
        
        {/* GRADE TÁTICA HOLOGRÁFICA DINÂMICA */}
        <div className="absolute inset-0 opacity-40">
          <div className="grid grid-cols-20 grid-rows-12 h-full w-full">
            {Array.from({ length: 240 }).map((_, i) => (
              <div 
                key={i} 
                className={`border ${isDarkTheme ? 'border-cyan-500/15' : 'border-blue-500/20'}`} 
              />
            ))}
          </div>
        </div>

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
              filter: `blur(${isMobile ? '0.5px' : '1px'})`,
              opacity: 0.9
            }}
          />
        ))}

        {/* MATRIX RAIN TÁTICO AVANÇADO */}
        <div className="matrix-grid absolute inset-0 z-0">
          {matrixColumns.map(column => (
            <div
              key={column.id}
              className="matrix-column absolute top-0 pointer-events-none flex flex-col gap-0 whitespace-pre text-center"
              style={{
                left: `${column.leftPct}%`,
                fontSize: `${column.fontSize}px`,
                animation: `matrixRain ${column.animationDuration}s linear infinite`,
                animationDelay: `${column.animationDelay}s`,
                opacity: column.intensity
              }}
            >
              {column.characters.map((character, index) => (
                <span
                  key={`${column.id}-ch-${index}`}
                  className={`matrix-character font-mono font-bold ${
                    index === 0 
                      ? `head ${isDarkTheme ? 'text-cyan-400' : 'text-blue-600'} glow-intense` 
                      : `trail ${isDarkTheme ? 'text-green-500/80' : 'text-blue-500/70'}`
                  }`}
                  style={{
                    opacity: index === 0 ? 1 : Math.max(0.15, 0.95 - index * 0.06),
                    textShadow: index === 0 
                      ? `0 0 15px ${isDarkTheme ? '#00ffff' : '#3b82f6'}, 0 0 30px ${isDarkTheme ? '#00ffff' : '#3b82f6'}` 
                      : `0 0 5px ${isDarkTheme ? '#00ff00' : '#10b981'}`,
                    filter: index === 0 ? 'drop-shadow(0 0 10px currentColor)' : 'none'
                  }}
                >
                  {character}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* EFEITOS DE SCANLINE HOLOGRÁFICOS */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-0.5 opacity-30"
              style={{
                top: `${(i / 8) * 100}%`,
                background: `linear-gradient(90deg, transparent, ${
                  isDarkTheme ? 'rgba(0,255,255,0.6)' : 'rgba(59,130,246,0.6)'
                }, transparent)`,
                animation: `hologramScan ${8 + i * 2}s linear ${i * 0.5}s infinite`,
                filter: 'blur(0.5px)'
              }}
            />
          ))}
        </div>
      </div>

      {/* CARD CENTRAL PRINCIPAL - MAIOR E COM TEXTO AJUSTADO */}
      <div className="relative z-10 w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto">
        <Card
          className={`relative overflow-hidden group transition-all duration-500 ease-out rounded-3xl lg:rounded-4xl backdrop-blur-2xl border-2 ${
            glitchEffect ? 'glitch-effect' : ''
          } ${
            isDarkTheme 
              ? 'border-cyan-400/50 shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/40' 
              : 'border-blue-500/50 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/40'
          }`}
          style={{
            background: isDarkTheme
              ? "linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(10,15,30,0.95) 50%, rgba(0,0,0,0.92) 100%)"
              : "linear-gradient(135deg, rgba(255,255,255,0.94) 0%, rgba(235,245,255,0.97) 50%, rgba(255,255,255,0.94) 100%)",
            transform: 'translateZ(0)',
            minHeight: isMobile ? '480px' : isTablet ? '520px' : '580px'
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

          <CardContent className="text-center relative z-20 flex flex-col justify-center items-center px-6 sm:px-10 lg:px-14 py-10 sm:py-14 lg:py-18 space-y-8 sm:space-y-10 lg:space-y-12">
            {/* BADGE DO SISTEMA AVANÇADO */}
            <Badge
              className="mb-6 sm:mb-8 backdrop-blur-2xl font-mono text-sm sm:text-base relative z-20 border-2 transition-all duration-300 hover:scale-105 hover:glow-intense"
              style={{
                background: isDarkTheme
                  ? "linear-gradient(90deg, rgba(0,255,255,0.2) 0%, rgba(255,0,255,0.2) 50%, rgba(0,255,255,0.2) 100%)"
                  : "linear-gradient(90deg, rgba(59,130,246,0.2) 0%, rgba(139,92,246,0.2) 50%, rgba(59,130,246,0.2) 100%)",
                borderColor: isDarkTheme ? 'rgba(0,255,255,0.6)' : 'rgba(59,130,246,0.6)',
                animation: 'pulse-glow 3s ease-in-out infinite'
              }}
            >
              <div className="relative flex items-center space-x-3 sm:space-x-4 px-4 sm:px-5 py-2 sm:py-2.5">
                <div className="relative">
                  <RandomTechIcon 
                    size={isMobile ? 18 : 22}
                    className={isDarkTheme ? "text-cyan-400" : "text-blue-600"}
                  />
                  <div className={`absolute inset-0 animate-ping ${
                    isDarkTheme ? "text-cyan-400" : "text-blue-600"
                  }`}>
                    <RandomTechIcon size={isMobile ? 18 : 22} />
                  </div>
                </div>
                <span className={`font-bold tracking-wider ${
                  isDarkTheme ? "text-cyan-300" : "text-blue-700"
                }`}>
                  SYSTEM_ACTIVE v3.0.1
                </span>
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  isDarkTheme ? "bg-cyan-400" : "bg-blue-600"
                }`} />
              </div>
            </Badge>

            {/* CONTEÚDO PRINCIPAL - TEXTO AJUSTADO PARA CABER */}
            <div className="flex flex-col space-y-8 sm:space-y-10 lg:space-y-12 relative w-full max-w-3xl sm:max-w-4xl lg:max-w-5xl">
              {/* TÍTULO PRINCIPAL - TAMANHO AJUSTADO E QUEBRA DE LINHA */}
              <h1 className={`font-black font-mono tracking-tight leading-tight text-2xl sm:text-4xl lg:text-5xl xl:text-6xl ${
                isDarkTheme 
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400" 
                  : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              }`} style={{
                animation: 'cyberpunk-glow 4s ease-in-out infinite, gradientShift 8s ease-in-out infinite',
                textShadow: isDarkTheme 
                  ? '0 0 30px rgba(0,255,255,0.6), 0 0 60px rgba(255,0,255,0.4), 0 0 90px rgba(255,0,255,0.2)'
                  : '0 0 30px rgba(59,130,246,0.5), 0 0 60px rgba(139,92,246,0.3), 0 0 90px rgba(139,92,246,0.1)',
                lineHeight: 1.1,
                wordWrap: 'break-word',
                overflowWrap: 'break-word'
              }}>
                {primaryText}
              </h1>
              
              {/* SUBTÍTULO TÁTICO - TAMANHO AJUSTADO */}
              <h2 className={`font-semibold font-mono tracking-normal leading-relaxed text-base sm:text-xl lg:text-2xl px-4 sm:px-6 ${
                isDarkTheme ? "text-green-400" : "text-green-600"
              }`} style={{
                animation: 'pulse-subtle 5s ease-in-out infinite, cyberpunk-glow 3s ease-in-out infinite 1s',
                textShadow: isDarkTheme 
                  ? '0 0 20px rgba(0,255,0,0.5), 0 0 40px rgba(0,255,0,0.3)' 
                  : '0 0 20px rgba(34,197,94,0.4), 0 0 40px rgba(34,197,94,0.2)',
                lineHeight: 1.4,
                wordWrap: 'break-word',
                overflowWrap: 'break-word'
              }}>
                {subText}
              </h2>
            </div>

            {/* INTERFACE DE CONTROLE TÁTICO - MAIS ESPAÇO */}
            <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4 sm:gap-6 lg:gap-8 pt-8 sm:pt-10 lg:pt-12 w-full max-w-md sm:max-w-lg lg:max-w-xl">
              <Button
                size={isMobile ? "default" : "lg"}
                className="font-mono relative overflow-hidden transition-all duration-300 hover:scale-105 group/btn flex-1 min-h-14 sm:min-h-16 text-base sm:text-lg"
                style={{
                  background: "linear-gradient(135deg, #ec4899 0%, #06b6d4 50%, #8b5cf6 100%)",
                  border: 'none',
                  animation: 'electric-pulse 2s ease-in-out infinite'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform group-hover/btn:translate-x-full transition-transform duration-1000" />
                <span className="font-bold text-white tracking-wider flex items-center justify-center relative z-10">
                  <div className="bg-white rounded-full mr-3 animate-ping w-3 h-3" />
                  [EXECUTE] PROJETOS
                </span>
              </Button>

              <Button
                variant="outline"
                size={isMobile ? "default" : "lg"}
                className={`backdrop-blur-2xl font-mono relative overflow-hidden transition-all duration-300 hover:scale-105 border-2 flex-1 min-h-14 sm:min-h-16 text-base sm:text-lg ${
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
                  <div className={`rounded-full mr-3 animate-ping w-3 h-3 ${
                    isDarkTheme ? "bg-cyan-400" : "bg-blue-600"
                  }`} />
                  [CONNECT] CONTATO
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ESTILOS CYBERPUNK AVANÇADOS */}
      <style jsx>{`
        @keyframes matrixRain {
          0% { transform: translate3d(0, -100vh, 0) scaleY(0.95); opacity: 0; }
          10% { opacity: 0.9; }
          80% { opacity: 0.7; }
          100% { transform: translate3d(0, 100vh, 0) scaleY(1); opacity: 0; }
        }

        @keyframes quantumFloat {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.7; }
          25% { transform: translateY(-20px) translateX(8px) scale(1.15); opacity: 1; }
          50% { transform: translateY(-35px) translateX(-8px) scale(1.08); opacity: 0.8; }
          75% { transform: translateY(-20px) translateX(8px) scale(1.15); opacity: 1; }
        }

        @keyframes cyberpunk-glow {
          0%, 100% { filter: brightness(1) contrast(1) saturate(1); }
          50% { filter: brightness(1.3) contrast(1.2) saturate(1.5); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 25px currentColor; }
          50% { box-shadow: 0 0 50px currentColor, 0 0 75px currentColor; }
        }

        @keyframes electric-pulse {
          0%, 100% { 
            box-shadow: 0 0 20px #ec4899, 0 0 40px #06b6d4;
            filter: brightness(1) saturate(1);
          }
          50% { 
            box-shadow: 0 0 30px #ec4899, 0 0 60px #06b6d4, 0 0 80px #8b5cf6;
            filter: brightness(1.2) saturate(1.3);
          }
        }

        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.02); }
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes scanMove {
          0% { background-position: 0 0; }
          100% { background-position: 0 100vh; }
        }

        @keyframes hologramScan {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }

        .glow-intense {
          filter: drop-shadow(0 0 15px currentColor);
        }

        .glitch-effect {
          animation: glitch 0.3s linear;
        }

        @keyframes glitch {
          0% { transform: translate(0) skew(0deg); filter: hue-rotate(0deg); }
          20% { transform: translate(-4px, 2px) skew(2deg); filter: hue-rotate(90deg); }
          40% { transform: translate(4px, -2px) skew(-2deg); filter: hue-rotate(180deg); }
          60% { transform: translate(-2px, 1px) skew(1deg); filter: hue-rotate(270deg); }
          80% { transform: translate(2px, -1px) skew(-1deg); filter: hue-rotate(360deg); }
          100% { transform: translate(0) skew(0deg); filter: hue-rotate(0deg); }
        }

        /* Garantir que o texto quebre corretamente em mobile */
        @media (max-width: 640px) {
          .text-2xl {
            font-size: 1.5rem;
            line-height: 1.2;
          }
          .text-base {
            font-size: 0.875rem;
            line-height: 1.4;
          }
        }

        @media (max-width: 768px) and (orientation: landscape) {
          .text-2xl {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  )
}