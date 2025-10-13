/**
 * Componente BackToTopButton (Botão Voltar ao Topo)
 * 
 * Botão flutuante fixo que permite ao usuário retornar ao topo da página
 * de forma rápida e acessível. Aparece apenas após scroll suficiente.
 * 
 * Características:
 * - Aparece após scroll de 300px verticalmente
 * - Posição fixa no canto inferior direito
 * - Scroll suave com respeito a prefers-reduced-motion
 * - Acessível via teclado e leitores de tela
 * - aria-label dinâmico baseado em preferências de movimento
 * 
 * @fileoverview Botão de retorno ao topo acessível
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'
import { ArrowUp } from 'lucide-react'

/**
 * Componente BackToTopButton
 * 
 * Renderiza botão circular flutuante para voltar ao topo.
 * Visibilidade controlada por posição de scroll da página.
 * 
 * Estado interno:
 * - isVisible: se deve mostrar o botão (scrollY > 300)
 * 
 * Efeitos:
 * - Listener de scroll para atualizar visibilidade
 * - Cleanup automático do listener ao desmontar
 * 
 * @returns {JSX.Element | null} Botão flutuante ou null se não visível
 * 
 * @example
 * // Em layout ou página
 * <BackToTopButton />
 */
export function BackToTopButton() {
  /**
   * Estado de visibilidade do botão
   * true se scrollY > 300px, false caso contrário
   */
  const [isVisible, setIsVisible] = useState(false)
  
  /**
   * Hook personalizado para scroll acessível
   * Fornece função scrollToTop e flag reducedMotion
   */
  const { scrollToTop, reducedMotion } = useSmoothScroll()

  /**
   * Efeito para monitorar scroll e controlar visibilidade
   * 
   * Adiciona listener de scroll que mostra botão após 300px.
   * Remove listener na limpeza para evitar memory leaks.
   */
  useEffect(() => {
    /**
     * Função que atualiza visibilidade baseado em scrollY
     */
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', toggleVisibility)
    
    /**
     * Cleanup: remove listener ao desmontar componente
     */
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  /**
   * Não renderiza nada se botão não deve estar visível
   * Evita renderização desnecessária no DOM
   */
  if (!isVisible) return null

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 rounded-full w-12 h-12 p-0 shadow-lg"
      /**
       * aria-label dinâmico baseado em preferências do usuário
       * - Se reducedMotion: indica scroll instantâneo
       * - Se não: indica scroll suave/animado
       */
      aria-label={
        reducedMotion 
          ? 'Ir para o topo da página' 
          : 'Rolar suavemente para o topo da página'
      }
      title="Voltar ao topo"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  )
}

