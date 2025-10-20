/**
 * Hook para Detectar Preferência de Movimento Reduzido
 * 
 * Detecta se o usuário prefere movimento reduzido (acessibilidade)
 * 
 * @fileoverview Reduced motion hook
 * @author Rainer Teixeira
 */

"use client"

import { useState, useEffect } from "react"

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    
    setPrefersReducedMotion(mediaQuery.matches)

    function handleChange(event: MediaQueryListEvent) {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  return prefersReducedMotion
}


