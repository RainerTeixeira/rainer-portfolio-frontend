/**
 * Hook para Alto Contraste
 * 
 * Gerencia modo de alto contraste com persistência em localStorage.
 * 
 * Funcionalidades:
 * - Estado de alto contraste
 * - Persistência em localStorage
 * - Adiciona/remove classe CSS
 * - Carrega preferência salva
 * 
 * @fileoverview Hook para gerenciamento de alto contraste
 * @author Rainer Teixeira
 * @version 1.0.0
 */

"use client"

import { useEffect, useState } from "react"

/**
 * Hook useHighContrast
 * 
 * Gerencia modo de alto contraste com persistência.
 * 
 * @returns {Object} Estado e controles
 * @returns {boolean} isHighContrast - Se está em modo alto contraste
 * @returns {Function} toggleHighContrast - Função para alternar modo
 * 
 * @example
 * import { useHighContrast } from '@/components/accessibility/hooks'
 * 
 * function HighContrastToggle() {
 *   const { isHighContrast, toggleHighContrast } = useHighContrast()
 *   
 *   return (
 *     <button onClick={toggleHighContrast}>
 *       {isHighContrast ? 'Desativar' : 'Ativar'} Alto Contraste
 *     </button>
 *   )
 * }
 */
export function useHighContrast() {
  const [isHighContrast, setIsHighContrast] = useState(false)

  useEffect(() => {
    // Carregar preferência salva
    const saved = localStorage.getItem("high-contrast")
    if (saved === "true") {
      setIsHighContrast(true)
      document.documentElement.classList.add("high-contrast")
    }
  }, [])

  function toggleHighContrast() {
    const newValue = !isHighContrast
    setIsHighContrast(newValue)
    
    if (newValue) {
      document.documentElement.classList.add("high-contrast")
      localStorage.setItem("high-contrast", "true")
    } else {
      document.documentElement.classList.remove("high-contrast")
      localStorage.setItem("high-contrast", "false")
    }
  }

  return {
    isHighContrast,
    toggleHighContrast,
  }
}

