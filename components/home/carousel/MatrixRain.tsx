/**
 * Matrix Rain Component
 * 
 * Chuva de código binário estilo Matrix
 * Efeito cyberpunk com bits de processador caindo
 * 
 * @fileoverview Matrix-style binary rain effect
 * @author Rainer Teixeira
 * @version 1.0.0
 */

"use client"

import { memo } from 'react'
import type { MatrixRainProps } from './types'

/**
 * Componente Matrix Rain
 * Renderiza colunas de código binário caindo
 * Memoizado para otimização de performance
 */
export const MatrixRain = memo(function MatrixRain({ columns, isDarkTheme }: MatrixRainProps) {
  return (
    <div className="matrix-grid absolute inset-0 z-0 overflow-hidden">
      {columns.map(column => (
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
  )
})

