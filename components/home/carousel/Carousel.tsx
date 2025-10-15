/**
 * Carousel Cyberpunk Avançado - Versão Modularizada
 * 
 * Componente de hero section com tema cyberpunk/futurista.
 * Background e efeitos visuais do carousel
 * 
 * @fileoverview Carousel background and effects system
 * @author Rainer Teixeira
 * @version 1.0.0
 */

"use client"

import { useState, useEffect, useCallback, useRef, memo } from "react"
import { useTheme } from "next-themes"
import { BINARY_PATTERNS, AUTOPLAY_INTERVAL_MS } from './constants'
import { HolographicBackground } from './HolographicBackground'
import { ParticlesSystem } from './ParticlesSystem'
import { MatrixRain } from './MatrixRain'
import { ScrollIndicator } from './ScrollIndicator'
import { HeroContent } from './HeroContent'
import type { Particle, MatrixColumn, CarouselProps } from './types'

/**
 * Componente Principal do Carousel Cyberpunk
 * Memoizado para melhor performance
 */
const Carousel = memo(function Carousel({ 
  autoPlayInterval = AUTOPLAY_INTERVAL_MS, 
  enableAutoPlay = true 
}: CarouselProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [matrixColumns, setMatrixColumns] = useState<MatrixColumn[]>([])
  const [particles, setParticles] = useState<Particle[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  const actualAutoPlayInterval = prefersReducedMotion ? 0 : autoPlayInterval
  const isAutoPlay = enableAutoPlay && !prefersReducedMotion

  /* ==========================================================
     EFEITO MATRIX DIGITAL RAIN HIPNÓTICO 💫
     ========================================================== */
  useEffect(() => {
    if (!mounted || prefersReducedMotion) return

    const matrixInterval = setInterval(() => {
      // Lógica de mutação dos padrões binários
    }, 150)

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
    const width = containerRef.current?.clientWidth || (typeof window !== 'undefined' ? window.innerWidth : 1920)
    
    const mobileBreakpoint = 640
    const tabletBreakpoint = 1024
    
    const isMobile = width < mobileBreakpoint
    const isTablet = width >= mobileBreakpoint && width < tabletBreakpoint

    // Sistema Matrix Rain
    const columnCount = isMobile ? 
      Math.min(15, Math.max(8, Math.floor(width / 35))) : 
      isTablet ? 
      Math.min(22, Math.max(12, Math.floor(width / 40))) :
      Math.min(30, Math.max(18, Math.floor(width / 45)))

    const livePatterns = BINARY_PATTERNS.filter(p => p.includes('1'))

    const newColumns: MatrixColumn[] = Array.from({ length: columnCount }).map((_, i) => {
      const randomId = Math.round(Math.random() * 10000)
      const charactersCount = isMobile ? 10 + Math.floor(Math.random() * 8) : 12 + Math.floor(Math.random() * 10)
      const intensity = 0.5 + Math.random() * 0.35
      
      const type = 'binary' as const
      
      const characters: string[] = Array.from({ length: charactersCount }).map((_, idx) => {
        if (idx === 0) return '1'
        const pattern = livePatterns[Math.floor(Math.random() * livePatterns.length)] || "0101"
        return pattern[idx % pattern.length] || "0"
      })
      
      return {
        id: `col-${i}-${randomId}`,
        leftPct: (i / columnCount) * 100,
        fontSize: isMobile ? 13 + Math.random() * 4 : isTablet ? 15 + Math.random() * 5 : 17 + Math.random() * 6,
        animationDuration: 4 + Math.random() * 3,
        animationDelay: (i / columnCount) * 2,
        characters,
        intensity,
        type,
        speed: 1.0
      }
    })

    setMatrixColumns(newColumns)

    // Sistema de Partículas
    const particleCount = isMobileNow ? 
      Math.min(6, Math.max(3, Math.floor(width / 150))) :
      isTabletNow ?
      Math.min(10, Math.max(5, Math.floor(width / 120))) :
      Math.min(15, Math.max(8, Math.floor(width / 100)))

    const particleTypes: Particle["type"][] = ["energy", "data", "quantum", "neural"]
    
    const newParticles: Particle[] = Array.from({ length: particleCount }).map((_, idx) => {
      const type = particleTypes[Math.floor(Math.random() * particleTypes.length)] || "energy"
      
      return {
        id: `p-${idx}-${Math.round(Math.random() * 10000)}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: isMobileNow ? 3 + Math.random() * 4 : 4 + Math.random() * 6,
        duration: 4 + Math.random() * 3,
        delay: (idx / particleCount) * 4,
        type,
        opacity: 0.6 + Math.random() * 0.3
      }
    })

    setParticles(newParticles)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    updateResponsiveDimensions()
    setIsReady(true)
    
    const initTimer = setTimeout(() => {
      updateResponsiveDimensions()
    }, 50)
    
    let rafId: number | null = null
    const handleResize = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => updateResponsiveDimensions())
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      if (rafId) cancelAnimationFrame(rafId)
      clearTimeout(initTimer)
    }
  }, [mounted, updateResponsiveDimensions])

  /* ==========================================================
     SISTEMA AUTOPLAY
     ========================================================== */
  useEffect(() => {
    if (!isReady || !isAutoPlay) return
    
    const intervalId = window.setInterval(() => {
      setCurrentTextIndex((prev: number) => (prev + 1) % 15)
    }, actualAutoPlayInterval)
    
    return () => window.clearInterval(intervalId)
  }, [isReady, isAutoPlay, actualAutoPlayInterval])

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
      className="absolute inset-0 w-full h-full"
      role="region"
      aria-label="Background visual cyberpunk"
    >
      {/* SISTEMA DE FUNDO HOLOGRÁFICO */}
      <HolographicBackground isDarkTheme={isDarkTheme} />

      {/* SISTEMA DE PARTÍCULAS QUÂNTICAS */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <ParticlesSystem particles={particles} isDarkTheme={isDarkTheme} />

        {/* MATRIX BINARY PROCESSOR */}
        <MatrixRain columns={matrixColumns} isDarkTheme={isDarkTheme} />
      </div>
              
      {/* INDICADOR DE SCROLL CYBERPUNK */}
      <ScrollIndicator />

      {/* CONTEÚDO HERO */}
      <HeroContent currentSlide={currentTextIndex} />

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

        /* MATRIX BINARY FALL */
        @keyframes matrixBinaryFall {
          0% {
            transform: translateY(-100vh) scaleY(1);
          }
          100% {
            transform: translateY(100vh) scaleY(1);
          }
        }

        /* PULSO BINÁRIO */
        @keyframes binary-pulse {
          0%, 100% {
            opacity: 1;
            text-shadow: 0 0 20px #00ff00, 0 0 35px #00ff00, 0 0 50px #00ff00;
            transform: scale(1.15);
          }
          50% {
            opacity: 0.85;
            text-shadow: 0 0 25px #00ff00, 0 0 40px #00ff00, 0 0 60px #00ff00;
            transform: scale(1.2);
          }
        }

        /* SHIMMER HIPNÓTICO */
        @keyframes binary-shimmer {
          0%, 100% {
            opacity: 1;
            filter: brightness(1.1);
          }
          25% {
            opacity: 0.9;
            filter: brightness(1.3);
          }
          50% {
            opacity: 1;
            filter: brightness(1.1);
          }
          75% {
            opacity: 0.95;
            filter: brightness(1.2);
          }
        }

        .glow-binary-head {
          animation: binary-pulse 1.5s ease-in-out infinite;
        }

        .glow-binary-trail {
          opacity: 0.85;
        }

        .glow-binary-fade {
          opacity: 0.6;
        }

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

