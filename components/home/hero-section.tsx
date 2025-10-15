/**
 * Hero Section Profissional
 * 
 * Hero limpo e focado com as frases originais do carousel
 * 
 * @fileoverview Professional hero section
 * @author Rainer Teixeira
 */

"use client"

import { useState, useEffect } from "react"
import dynamic from 'next/dynamic'
import { HeroContent } from "./carousel/HeroContent"

const Carousel = dynamic(() => import('./carousel'), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-[100svh] flex items-center justify-center overflow-hidden bg-black">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-pink-400 border-b-transparent rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse' }}></div>
        </div>
        <p className="text-cyan-300 font-mono text-sm tracking-wider animate-pulse">
          INICIALIZANDO SISTEMA...
        </p>
      </div>
    </div>
  )
})

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 6) // 6 slides do carousel original
    }, 6000) // Sincronizado com o carousel

    return () => clearInterval(interval)
  }, [])

  return (
    <header 
      className="relative w-full h-[100svh] sm:h-[100vh] flex items-center justify-center overflow-hidden bg-black"
      style={{
        minHeight: 'max(100svh, 600px)',
        maxHeight: '100svh'
      }}
      aria-label="Seção principal de apresentação"
    >
      {/* Layer 1: Background - Carousel Cyberpunk (z-0) */}
      <div className="absolute inset-0 z-0">
        <Carousel />
      </div>
      
      {/* Layer 2: Gradient Overlay Sutil (z-5) */}
      <div className="absolute inset-0 z-5 pointer-events-none bg-gradient-to-b from-black/50 via-transparent to-black/60" />
      
      {/* Layer 3: Content Overlay (z-20) */}
      <HeroContent currentSlide={currentSlide} />
      
      {/* Layer 4: Scroll Indicator Area - Gradient Bottom (z-15) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-15 pointer-events-none bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
    </header>
  )
}

