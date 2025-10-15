/**
 * Holographic Background Component
 * 
 * Renderiza o fundo holográfico com gradientes e grade tática
 * 
 * @fileoverview Holographic background with gradients
 * @author Rainer Teixeira
 * @version 1.0.0
 */

"use client"

import { memo } from 'react'
import type { BackgroundProps } from './types'

/**
 * Componente de fundo holográfico
 * Memoizado para otimização de performance
 */
export const HolographicBackground = memo(function HolographicBackground({ isDarkTheme }: BackgroundProps) {
  return (
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
  )
})

