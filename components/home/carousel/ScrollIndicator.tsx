/**
 * Scroll Indicator Component
 * 
 * Indicador visual de scroll para indicar ao usuário que há mais conteúdo abaixo
 * Design cyberpunk com animações suaves
 * 
 * @fileoverview Cyberpunk scroll indicator
 * @author Rainer Teixeira
 * @version 1.0.0
 */

"use client"

import { memo } from 'react'

/**
 * Indicador de Scroll Cyberpunk
 * Componente memoizado para performance
 */
export const ScrollIndicator = memo(function ScrollIndicator() {
  return (
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
  )
})

