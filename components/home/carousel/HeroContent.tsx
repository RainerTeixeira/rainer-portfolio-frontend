/**
 * Hero Content Overlay - Ultra Futuristic Edition
 * 
 * Design holográfico premium com efeitos de última geração
 * Glassmorphism, scanlines, grid 3D e animações fluidas
 * 
 * @fileoverview Ultra futuristic hero content component
 * @author Rainer Teixeira
 * @version 2.0.0 - Futuristic Edition
 */

"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useTheme } from "next-themes"
import { PRIMARY_TEXTS, SUBTEXTS } from './constants'

interface HeroContentProps {
  currentSlide: number
}

export function HeroContent({ currentSlide }: HeroContentProps) {
  const [mounted, setMounted] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = mounted && resolvedTheme === 'dark'
  const controls = useAnimation()
  
  const primaryText = PRIMARY_TEXTS[currentSlide % PRIMARY_TEXTS.length]
  const subtext = SUBTEXTS[currentSlide % SUBTEXTS.length]

  // Previne erro de hidratação
  useEffect(() => {
    setMounted(true)
    setShowContent(true)
  }, [])

  // Animação de entrada
  useEffect(() => {
    controls.start({
      scale: [0.95, 1],
      opacity: [0, 1],
      transition: { duration: 0.8, ease: "easeOut" }
    })
  }, [currentSlide, controls])

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none p-3 xs:p-4 sm:p-5 md:p-7 lg:p-9 xl:p-11">
      {/* CONTEÚDO DIRETO SEM CARD */}
      <div 
        className={`relative z-10 w-full max-w-[95vw] xs:max-w-[93vw] sm:max-w-[88vw] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto transition-opacity duration-500 pointer-events-auto ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="text-center relative z-20 flex flex-col justify-center items-center min-h-[400px] px-6 xs:px-8 sm:px-10 md:px-12 lg:px-14 xl:px-18 space-y-6 xs:space-y-7 sm:space-y-9 md:space-y-11 lg:space-y-13 xl:space-y-15"
          style={{
            paddingTop: 'clamp(2.5rem, 8vh, 7rem)',
            paddingBottom: 'clamp(2.5rem, 8vh, 7rem)'
          }}
        >
          {/* TÍTULO PRINCIPAL */}
          <motion.h1
            key={currentSlide}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className={`font-black font-mono tracking-tight leading-none px-2 xs:px-3 sm:px-4 md:px-0 ${
              isDark 
                ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400" 
                : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
            }`}
            style={{
              fontSize: 'clamp(1.75rem, 7vw + 0.5rem, 5rem)',
              textShadow: isDark 
                ? '0 0 30px rgba(0,255,255,0.7), 0 0 50px rgba(255,0,255,0.5)'
                : '0 0 30px rgba(59,130,246,0.6), 0 0 50px rgba(139,92,246,0.4)',
              lineHeight: 1.05
            }}
          >
            {primaryText}
          </motion.h1>
          
          {/* SUBTÍTULO */}
          <motion.h2
            key={`sub-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className={`font-semibold font-mono px-3 xs:px-4 sm:px-6 ${
              isDark ? "text-green-400" : "text-green-600"
            }`}
            style={{
              fontSize: 'clamp(1rem, 3.5vw + 0.3rem, 2rem)',
              textShadow: isDark 
                ? '0 0 20px rgba(0,255,0,0.6)' 
                : '0 0 20px rgba(34,197,94,0.5)',
              lineHeight: 1.3
            }}
          >
            {subtext}
          </motion.h2>
        </div>
      </div>

    </div>
  )
}

