/**
 * Particles System Component
 * 
 * Sistema de partículas quânticas animadas
 * Otimizado para performance com GPU acceleration
 * 
 * @fileoverview Quantum particles animation system
 * @author Rainer Teixeira
 * @version 1.0.0
 */

"use client"

import { memo, useMemo } from 'react'
import type { ParticlesSystemProps } from './types'

/**
 * Paletas de cores para partículas no modo escuro
 */
const DARK_PALETTE = {
  energy: ["rgba(0,255,170,0.9)", "rgba(0,230,255,0.85)", "rgba(180,90,255,0.9)"],
  data: ["rgba(255,50,150,0.8)", "rgba(255,180,0,0.8)", "rgba(0,200,255,0.8)"],
  quantum: ["rgba(200,255,0,0.7)", "rgba(255,0,200,0.7)", "rgba(0,255,255,0.7)"],
  neural: ["rgba(255,100,255,0.8)", "rgba(100,255,255,0.8)", "rgba(255,255,100,0.8)"]
}

/**
 * Paletas de cores para partículas no modo claro
 */
const LIGHT_PALETTE = {
  energy: ["rgba(0,100,255,0.8)", "rgba(100,0,255,0.8)", "rgba(0,200,200,0.8)"],
  data: ["rgba(255,0,100,0.8)", "rgba(255,100,0,0.8)", "rgba(0,100,255,0.8)"],
  quantum: ["rgba(100,255,0,0.7)", "rgba(255,0,150,0.7)", "rgba(0,150,255,0.7)"],
  neural: ["rgba(200,0,255,0.8)", "rgba(0,200,255,0.8)", "rgba(255,150,0,0.8)"]
}

/**
 * Sistema de partículas quânticas
 * Memoizado para otimização de performance
 */
export const ParticlesSystem = memo(function ParticlesSystem({ particles, isDarkTheme }: ParticlesSystemProps) {
  const palette = isDarkTheme ? DARK_PALETTE : LIGHT_PALETTE

  // Memoizar cores das partículas
  const particlesWithColors = useMemo(() => 
    particles.map(particle => {
      const colorArray = palette[particle.type]
      const randomIndex = Math.floor(Math.random() * colorArray.length)
      const color = colorArray[randomIndex] ?? colorArray[0] ?? "rgba(0,255,170,0.9)"
      
      return { ...particle, color }
    }), 
    [particles, palette]
  )

  return (
    <>
      {particlesWithColors.map(particle => (
        <div
          key={particle.id}
          className="particle absolute rounded-full pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
            animation: `quantumFloat ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            filter: 'blur(0.5px)',
            opacity: particle.opacity
          }}
        />
      ))}
    </>
  )
})

