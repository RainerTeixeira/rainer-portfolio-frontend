/**
 * Back To Top Button Component
 *
 * Botão flutuante fixo para retornar ao topo da página. Aparece após scroll
 * (> 300px), respeita preferências de movimento do usuário e integra com
 * useSmoothScroll hook.
 *
 * @module components/ui/back-to-top
 * @fileoverview Botão de retorno ao topo acessível e responsivo
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Usado automaticamente no layout
 * <BackToTop />
 * ```
 *
 * Características:
 * - Visível apenas após scroll > 300px
 * - Posição fixa (bottom-right)
 * - Scroll suave ou instantâneo (prefers-reduced-motion)
 * - Totalmente acessível (keyboard + screen readers)
 * - ARIA label dinâmico
 * - Animações suaves
 * - Integração com useSmoothScroll hook
 */

'use client';

// ============================================================================
// React
// ============================================================================

import { useEffect, useState } from 'react';

// ============================================================================
// Icons
// ============================================================================

import { ArrowUp } from 'lucide-react';

// ============================================================================
// UI Components
// ============================================================================

import { Button } from '@rainersoft/ui';

// ============================================================================
// Hooks
// ============================================================================

import { useSmoothScroll } from '@/hooks/use-smooth-scroll';

// ============================================================================
// Constants
// ============================================================================

/**
 * Scroll mínimo (em pixels) para exibir o botão
 */
const SCROLL_THRESHOLD_PX = 300;

// ============================================================================
// Main Component
// ============================================================================

/**
 * Componente principal do Back To Top Button
 *
 * Botão flutuante que permite retorno rápido ao topo.
 * Visibilidade controlada por scroll position.
 *
 * @returns Botão flutuante ou null se não visível
 *
 * @example
 * ```tsx
 * // Em qualquer página
 * <BackToTopButton />
 * ```
 */
export function BackToTopButton() {
  // ============================================================================
  // State
  // ============================================================================

  const [isButtonVisible, setIsButtonVisible] = useState(false);

  // ============================================================================
  // Hooks
  // ============================================================================

  const { scrollToTop, reducedMotion } = useSmoothScroll();

  // ============================================================================
  // Effects
  // ============================================================================

  /**
   * Monitora scroll para controlar visibilidade do botão
   */
  useEffect(() => {
    const handleScrollEvent = () => {
      setIsButtonVisible(window.scrollY > SCROLL_THRESHOLD_PX);
    };

    window.addEventListener('scroll', handleScrollEvent, { passive: true });

    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  // ============================================================================
  // Render Guard
  // ============================================================================

  if (!isButtonVisible) {
    return null;
  }

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 rounded-full w-12 h-12 p-0 shadow-lg"
      aria-label={
        reducedMotion
          ? 'Ir para o topo da página'
          : 'Rolar suavemente para o topo da página'
      }
      title="Voltar ao topo"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </Button>
  );
}
