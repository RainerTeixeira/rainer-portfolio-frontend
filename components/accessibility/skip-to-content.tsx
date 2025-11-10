/**
 * Skip to Content Component
 *
 * Link de acessibilidade para pular para o conteúdo principal da página.
 * Essencial para navegação por teclado e screen readers. Conforme WCAG AA,
 * visível apenas ao focar.
 *
 * @module components/accessibility/skip-to-content
 * @fileoverview Link de acessibilidade para pular para conteúdo principal
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Usado no layout principal
 * <SkipToContent />
 * ```
 *
 * Características:
 * - Visível apenas ao focar (screen reader e teclado)
 * - Posicionamento fixo no topo
 * - Estilos de foco visíveis
 * - Navegação rápida para conteúdo principal
 * - Conformidade WCAG AA
 * - Acessibilidade completa
 */

'use client';

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      Pular para o conteúdo principal
    </a>
  );
}
