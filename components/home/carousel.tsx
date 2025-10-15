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

import { useState, useEffect, useCallback, useRef, memo } from "react"
import { useTheme } from "next-themes"

/* ==========================================================
   CONSTANTES CYBERPUNK
   ========================================================== */

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

/* ==========================================================
   COMPONENTE AUXILIAR - RENDERIZADOR DE CARACTERES MATRIX
   ========================================================== */

/**
 * Componente interno para renderizar caracteres da matriz
 * Extração de código duplicado para melhor manutenibilidade
 */
interface MatrixCharacterSetProps {
  characters: string[]
  columnId: string
  fontSize: number
  intensity: number
  isDarkTheme: boolean
  setIndex: number
}

const MatrixCharacterSet = memo(function MatrixCharacterSet({ 
  characters, 
  columnId, 
  fontSize, 
  intensity, 
  isDarkTheme,
  setIndex 
}: MatrixCharacterSetProps) {
  const charColor = isDarkTheme ? 'text-green-400' : 'text-green-600'
  const glowColor = isDarkTheme ? '#00ff00' : '#10b981'
  
  return (
    <div className="flex flex-col gap-0 whitespace-pre text-center" style={{ opacity: intensity }}>
      {characters.map((character, index) => {
        // Variação hipnótica na opacidade baseada em caractere
        const baseOpacity = index === 0 ? 1 : Math.max(0.2, 1 - index * 0.08)
        const charVariation = character === '1' ? 1.15 : 0.9
        const finalOpacity = Math.min(1, baseOpacity * charVariation)
        
        return (
          <span
            key={`${columnId}-ch-${index}-${setIndex}`}
            className={`matrix-binary font-mono font-bold tracking-wider ${charColor} ${
              index === 0 ? 'glow-binary-head' : index < 2 ? 'glow-binary-trail' : 'glow-binary-fade'
            }`}
            style={{
              fontSize: `${fontSize}px`,
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
              animationName: index === 0 
                ? 'binary-pulse' 
                : character === '1' && index < 4
                ? 'binary-shimmer'
                : 'none',
              animationDuration: index === 0 ? '1.5s' : '2s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: `${index * 0.1}s`
            }}
          >
            {character}
          </span>
        )
      })}
    </div>
  )
})

/* ==========================================================
   COMPONENTE PRINCIPAL - CYBERPUNK CARRUSEL AVANÇADO
   ========================================================== */

// Componente memoizado para melhor performance
const Carousel = memo(function Carousel() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [matrixColumns, setMatrixColumns] = useState<MatrixColumn[]>([])
  const [particles, setParticles] = useState<Particle[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [livePatterns, setLivePatterns] = useState<string[]>(BINARY_PATTERNS)
  const containerRef = useRef<HTMLDivElement>(null)

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

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
      const type = 'binary' as const
      
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
     TEMA E RENDERIZAÇÃO DO SISTEMA CYBERPUNK
     ========================================================== */
  const isDarkTheme = mounted && resolvedTheme === 'dark'

  if (!isReady) {
    return (
      <div className={`absolute inset-0 w-full h-full flex items-center justify-center ${isDarkTheme ? 'bg-black' : 'bg-white'}`}>
        <div className="text-center space-y-6">
          <div className="relative">
            <div className={`w-20 h-20 border-4 ${isDarkTheme ? 'border-cyan-400' : 'border-blue-500'} border-t-transparent rounded-full animate-spin mx-auto`}></div>
            <div className={`absolute inset-0 w-20 h-20 border-4 ${isDarkTheme ? 'border-pink-400' : 'border-purple-600'} border-b-transparent rounded-full animate-spin mx-auto`} style={{ animationDirection: 'reverse' }}></div>
          </div>
          <p className={`font-mono ${isDarkTheme ? 'text-cyan-400' : 'text-blue-600'} text-lg animate-pulse tracking-wider`}>SYSTEM BOOT-UP...</p>
        </div>
      </div>
    )
  }

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
        <div className={`absolute inset-0 ${isDarkTheme ? 'bg-gradient-to-br from-cyan-900/25 via-black/70 to-purple-900/35' : 'bg-gradient-to-br from-blue-100/40 via-white/70 to-purple-100/45'}`} />
        <div className={`absolute inset-0 ${isDarkTheme ? 'bg-gradient-to-tr from-pink-900/20 via-transparent to-green-900/25' : 'bg-gradient-to-tr from-pink-100/30 via-transparent to-green-100/35'} mix-blend-overlay`} />
        <div className={`absolute inset-0 ${isDarkTheme ? 'bg-gradient-to-bl from-blue-900/15 via-transparent to-yellow-900/20' : 'bg-gradient-to-bl from-blue-50/25 via-transparent to-yellow-50/30'} mix-blend-color`} />
        
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
                animationName: 'matrixBinaryFall',
                animationDuration: `${column.animationDuration}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationDelay: `${column.animationDelay}s`,
                transform: `scaleY(${column.speed})`,
              }}
            >
              {/* Primeiro set - Bits de processador com efeito Matrix Rain hipnótico */}
              <MatrixCharacterSet 
                characters={column.characters}
                columnId={column.id}
                fontSize={column.fontSize}
                intensity={column.intensity}
                isDarkTheme={isDarkTheme}
                setIndex={1}
              />
              
              {/* Segundo set - Continuidade com efeito Matrix Rain hipnótico */}
              <MatrixCharacterSet 
                characters={column.characters}
                columnId={column.id}
                fontSize={column.fontSize}
                intensity={column.intensity}
                isDarkTheme={isDarkTheme}
                setIndex={2}
              />
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
                animationName: 'hologramScan',
                animationDuration: `${4 + i * 1}s`,
                animationTimingFunction: 'linear',
                animationDelay: `${i * 0.3}s`,
                animationIterationCount: 'infinite',
                filter: 'blur(0.5px)'
              }}
            />
          ))}
        </div>
      </div>

      {/* EFEITOS DE BORDA DA TELA */}
      <div className={`absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-transparent ${isDarkTheme ? 'via-cyan-400' : 'via-blue-500'} to-transparent opacity-60 z-40`}></div>
      <div className={`absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-transparent ${isDarkTheme ? 'via-purple-400' : 'via-purple-600'} to-transparent opacity-60 z-40`}></div>

      {/* INDICADOR DE SCROLL CYBERPUNK - UNIVERSAL */}
      <div className="absolute bottom-2 xs:bottom-3 sm:bottom-5 md:bottom-7 lg:bottom-10 left-1/2 transform -translate-x-1/2 z-[5] flex flex-col items-center gap-1.5 sm:gap-2 md:gap-2.5">
        {/* Mouse Icon Cyberpunk */}
        <div className="relative group cursor-pointer">
          {/* Corpo do mouse */}
          <div 
            className={`border-2 sm:border-[2.5px] ${isDarkTheme ? 'border-cyan-400 hover:border-pink-400 hover:shadow-pink-400/50' : 'border-blue-500 hover:border-purple-600 hover:shadow-purple-600/50'} rounded-full sm:rounded-2xl flex justify-center relative overflow-hidden transition-all duration-300 hover:shadow-lg`}
            style={{
              width: 'clamp(1.75rem, 4vw, 2.25rem)',
              height: 'clamp(2.5rem, 6vw, 3.5rem)'
            }}
          >
            {/* Rodinha do mouse animada */}
            <div 
              className={`${isDarkTheme ? 'bg-cyan-400 group-hover:bg-pink-400' : 'bg-blue-500 group-hover:bg-purple-600'} rounded-full transition-colors duration-300`}
              style={{
                width: 'clamp(0.25rem, 1vw, 0.375rem)',
                height: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                marginTop: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                animationName: 'scroll-wheel',
                animationDuration: '2s',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite'
              }}
            />
            
            {/* Efeito de brilho interno */}
            <div className={`absolute inset-0 bg-gradient-to-b ${isDarkTheme ? 'from-cyan-400/20' : 'from-blue-500/20'} via-transparent to-transparent`} />
          </div>
          
          {/* Anel de pulso externo */}
          <div className={`absolute inset-0 rounded-full sm:rounded-2xl border-2 ${isDarkTheme ? 'border-cyan-400/40' : 'border-blue-500/40'} animate-ping`} />
          
          {/* Anel de pulso secundário */}
          <div 
            className={`absolute inset-0 rounded-full sm:rounded-2xl border ${isDarkTheme ? 'border-purple-400/60' : 'border-purple-600/60'}`}
            style={{
              animationName: 'ping',
              animationDuration: '2s',
              animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
              animationDelay: '0.5s',
              animationIterationCount: 'infinite'
            }}
          />
          
          {/* Glow effect de fundo */}
          <div className={`absolute inset-0 rounded-full sm:rounded-2xl blur-lg ${isDarkTheme ? 'bg-cyan-400/30 group-hover:bg-pink-400/40' : 'bg-blue-500/30 group-hover:bg-purple-600/40'} transition-colors duration-300 -z-10`} />
        </div>
        
        {/* Setas para baixo */}
        <div className="flex flex-col gap-0.5 sm:gap-1" style={{ animationName: 'bounce-arrows', animationDuration: '2s', animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite' }}>
          <div 
            className={`w-0 h-0 border-l-transparent border-r-transparent ${isDarkTheme ? 'border-t-cyan-400' : 'border-t-blue-500'} opacity-80`}
            style={{
              borderLeftWidth: 'clamp(0.3rem, 1vw, 0.4rem)',
              borderRightWidth: 'clamp(0.3rem, 1vw, 0.4rem)',
              borderTopWidth: 'clamp(0.4rem, 1.5vw, 0.6rem)'
            }}
          />
          <div 
            className={`w-0 h-0 border-l-transparent border-r-transparent ${isDarkTheme ? 'border-t-cyan-400' : 'border-t-blue-500'} opacity-60`}
            style={{
              borderLeftWidth: 'clamp(0.3rem, 1vw, 0.4rem)',
              borderRightWidth: 'clamp(0.3rem, 1vw, 0.4rem)',
              borderTopWidth: 'clamp(0.4rem, 1.5vw, 0.6rem)'
            }}
          />
          <div 
            className={`w-0 h-0 border-l-transparent border-r-transparent ${isDarkTheme ? 'border-t-cyan-400' : 'border-t-blue-500'} opacity-40`}
            style={{
              borderLeftWidth: 'clamp(0.3rem, 1vw, 0.4rem)',
              borderRightWidth: 'clamp(0.3rem, 1vw, 0.4rem)',
              borderTopWidth: 'clamp(0.4rem, 1.5vw, 0.6rem)'
            }}
          />
        </div>
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

        @keyframes hologramScan {
          0% { transform: translateY(-100%); opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
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
      `}</style>
    </div>
  )
})

export default Carousel
