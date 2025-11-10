/**
 * High Contrast Hook
 *
 * Hook que gerencia modo de alto contraste com persistência em localStorage.
 * Adiciona/remove classe CSS no documento e carrega preferência salva.
 *
 * @module components/accessibility/hooks/use-high-contrast
 * @fileoverview Hook para gerenciamento de alto contraste
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { useEffect, useState } from 'react';

/**
 * useHighContrast Hook
 *
 * Gerencia modo de alto contraste com persistência em localStorage.
 * Adiciona classe 'high-contrast' no documento quando ativo.
 *
 * @returns {Object} Estado e controles
 * @returns {boolean} isHighContrast - Se está em modo alto contraste
 * @returns {Function} toggleHighContrast - Função para alternar modo
 *
 * @example
 * ```tsx
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
 * ```
 */
export function useHighContrast() {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    // Carregar preferência salva
    const saved = localStorage.getItem('high-contrast');
    if (saved === 'true') {
      setIsHighContrast(true);
      document.documentElement.classList.add('high-contrast');
    }
  }, []);

  function toggleHighContrast() {
    const newValue = !isHighContrast;
    setIsHighContrast(newValue);

    if (newValue) {
      document.documentElement.classList.add('high-contrast');
      localStorage.setItem('high-contrast', 'true');
    } else {
      document.documentElement.classList.remove('high-contrast');
      localStorage.setItem('high-contrast', 'false');
    }
  }

  return {
    isHighContrast,
    toggleHighContrast,
  };
}
