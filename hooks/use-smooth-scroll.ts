/**
 * Hook de Scroll Suave Acessível
 * 
 * Custom hook que fornece funções de scroll suave respeitando as
 * preferências de acessibilidade do usuário (prefers-reduced-motion).
 * 
 * Fundamental para garantir que usuários com sensibilidade a movimentos
 * ou com preferências de acessibilidade ativadas tenham uma experiência
 * confortável sem animações indesejadas.
 * 
 * @fileoverview Hook React para scroll suave com suporte a acessibilidade
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

'use client'

import { useEffect, useState, useCallback } from 'react'
import { 
  prefersReducedMotion, 
  smoothScrollTo, 
  scrollToTop, 
  scrollToPosition,
  onReducedMotionChange 
} from '@/lib/scroll-utils'

/**
 * Objeto retornado pelo hook useSmoothScroll
 * 
 * @typedef {Object} SmoothScrollReturn
 * @property {(target: string | Element, options?: ScrollIntoViewOptions) => void} scrollTo - Rola suavemente até um elemento
 * @property {() => void} scrollToTop - Rola suavemente até o topo da página
 * @property {(top: number, left?: number) => void} scrollToPosition - Rola até posição específica
 * @property {boolean} reducedMotion - Se o usuário prefere movimento reduzido
 * @property {boolean} shouldAnimate - Se animações devem ser aplicadas (inverso de reducedMotion)
 */

/**
 * Hook useSmoothScroll
 * 
 * Gerencia scroll suave de forma acessível, respeitando automaticamente
 * a preferência prefers-reduced-motion do usuário.
 * 
 * O hook monitora ativamente mudanças na preferência do usuário e ajusta
 * o comportamento de scroll em tempo real.
 * 
 * Características:
 * - Detecção automática de prefers-reduced-motion
 * - Atualização reativa quando preferências mudam
 * - Funções memoizadas com useCallback para performance
 * - SSR safe (funciona em servidor e cliente)
 * 
 * @returns {SmoothScrollReturn} Objeto com funções de scroll e estados de acessibilidade
 * 
 * @example
 * import { useSmoothScroll } from '@/hooks/use-smooth-scroll'
 * 
 * function MyComponent() {
 *   const { scrollTo, scrollToTop, reducedMotion } = useSmoothScroll()
 *   
 *   return (
 *     <div>
 *       <button onClick={() => scrollTo('#section')}>Ir para seção</button>
 *       <button onClick={scrollToTop}>Voltar ao topo</button>
 *       {reducedMotion && <p>Animações desabilitadas</p>}
 *     </div>
 *   )
 * }
 */
export function useSmoothScroll() {
  /**
   * Estado que armazena se o usuário prefere movimento reduzido
   * Inicializado como false e atualizado no primeiro render
   */
  const [reducedMotion, setReducedMotion] = useState(false)

  /**
   * Effect para detectar e monitorar preferências de movimento
   * Executa apenas uma vez no mount do componente
   */
  useEffect(() => {
    // Detecta preferência inicial do usuário
    setReducedMotion(prefersReducedMotion())

    /**
     * Monitora mudanças na preferência prefers-reduced-motion
     * Permite atualização em tempo real se o usuário mudar as configurações
     */
    const cleanup = onReducedMotionChange((matches) => {
      setReducedMotion(matches)
    })

    /** Cleanup: remove listeners quando o componente desmonta */
    return cleanup
  }, []) // Array vazio: executa apenas no mount

  /**
   * Função memoizada para scroll até um elemento
   * 
   * @param {string | Element} target - Seletor CSS ou elemento DOM alvo
   * @param {ScrollIntoViewOptions} [options] - Opções adicionais de scroll
   */
  const scrollTo = useCallback((target: string | Element, options?: ScrollIntoViewOptions) => {
    smoothScrollTo(target, options)
  }, []) // Sem dependências: função estável

  /**
   * Função memoizada para scroll até o topo da página
   * Wrapper otimizado para scrollToTop da lib
   */
  const toTop = useCallback(() => {
    scrollToTop()
  }, []) // Sem dependências: função estável

  /**
   * Função memoizada para scroll até posição específica
   * 
   * @param {number} top - Posição vertical em pixels
   * @param {number} [left] - Posição horizontal em pixels (opcional)
   */
  const toPosition = useCallback((top: number, left?: number) => {
    scrollToPosition(top, left)
  }, []) // Sem dependências: função estável

  /**
   * Retorna objeto com funções de scroll e estados de acessibilidade
   * Todas as funções respeitam automaticamente prefers-reduced-motion
   */
  return {
    /** Função para scroll até elemento específico */
    scrollTo,
    
    /** Função para scroll até o topo */
    scrollToTop: toTop,
    
    /** Função para scroll até posição numérica */
    scrollToPosition: toPosition,
    
    /** Estado: se o usuário prefere movimento reduzido */
    reducedMotion,
    
    /** Booleano invertido: se animações devem ser aplicadas */
    shouldAnimate: !reducedMotion
  }
}

