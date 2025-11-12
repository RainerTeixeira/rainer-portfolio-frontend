/**
 * Scroll Utils
 *
 * Utilitários de scroll acessíveis que respeitam automaticamente
 * as preferências de acessibilidade do usuário.
 *
 * Todas as funções verificam a preferência prefers-reduced-motion e
 * ajustam o comportamento para garantir uma experiência confortável
 * para todos os usuários, incluindo aqueles com sensibilidade a movimentos.
 *
 * @fileoverview Utilitários para scroll acessível
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// ============================================================================
// Accessibility
// ============================================================================

/**
 * Verifica se o usuário prefere movimento reduzido
 *
 * Consulta a media query CSS 'prefers-reduced-motion' para determinar
 * se o usuário ativou a configuração de redução de movimento no
 * sistema operacional ou navegador.
 *
 * @returns `true` se o usuário prefere movimento reduzido, `false` caso contrário
 *
 * @example
 * ```ts
 * if (prefersReducedMotion()) {
 *   element.scrollIntoView({ behavior: 'auto' })
 * } else {
 *   element.scrollIntoView({ behavior: 'smooth' })
 * }
 * ```
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ============================================================================
// Scroll Functions
// ============================================================================

/**
 * Faz scroll suave para um elemento específico
 *
 * Rola a viewport até um elemento DOM, respeitando automaticamente
 * a preferência prefers-reduced-motion do usuário.
 *
 * @param target - Seletor CSS (ex: '#section') ou elemento DOM direto
 * @param options - Opções adicionais de scroll para sobrescrever padrões
 *
 * @example
 * ```ts
 * smoothScrollTo('#sobre')
 * smoothScrollTo(element, { block: 'center' })
 * ```
 */
export function smoothScrollTo(
  target: string | Element,
  options?: ScrollIntoViewOptions
): void {
  const element =
    typeof target === 'string' ? document.querySelector(target) : target;

  if (!element) {
    console.warn(`Elemento não encontrado: ${target}`);
    return;
  }

  const shouldAnimate = !prefersReducedMotion();

  element.scrollIntoView({
    behavior: shouldAnimate ? 'smooth' : 'auto',
    block: 'start',
    inline: 'nearest',
    ...options,
  });
}

/**
 * Faz scroll para o topo da página
 *
 * Rola a viewport para a posição inicial (topo) da página,
 * respeitando automaticamente prefers-reduced-motion.
 *
 * @example
 * ```ts
 * <button onClick={scrollToTop}>↑ Voltar ao topo</button>
 * ```
 */
export function scrollToTop(): void {
  const shouldAnimate = !prefersReducedMotion();

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: shouldAnimate ? 'smooth' : 'auto',
  });
}

/**
 * Faz scroll para uma posição numérica específica
 *
 * Rola a viewport para coordenadas exatas em pixels,
 * respeitando automaticamente prefers-reduced-motion.
 *
 * @param top - Posição vertical em pixels do topo
 * @param left - Posição horizontal em pixels da esquerda (padrão: 0)
 *
 * @example
 * ```ts
 * scrollToPosition(500)
 * scrollToPosition(800, 200)
 * ```
 */
export function scrollToPosition(top: number, left: number = 0): void {
  const shouldAnimate = !prefersReducedMotion();

  window.scrollTo({
    top,
    left,
    behavior: shouldAnimate ? 'smooth' : 'auto',
  });
}

/**
 * Monitora mudanças na preferência de movimento reduzido
 *
 * Cria um listener para a media query prefers-reduced-motion e executa
 * um callback sempre que o usuário alterar suas preferências de acessibilidade.
 *
 * @param callback - Função executada quando preferência muda
 * @returns Função de cleanup para remover o listener
 *
 * @example
 * ```ts
 * const cleanup = onReducedMotionChange((isReduced) => {
 *   setAnimationsEnabled(!isReduced)
 * })
 * cleanup()
 * ```
 */
export function onReducedMotionChange(
  callback: (matches: boolean) => void
): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const handler = (event: MediaQueryListEvent | MediaQueryList) => {
    callback(event.matches);
  };

  handler(mediaQuery);

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  } else {
    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
  }
}

/**
 * Desabilita scroll temporariamente
 *
 * Bloqueia a rolagem da página definindo overflow: hidden no body.
 * Útil para prevenir scroll enquanto modais, dialogs ou menus estão abertos.
 *
 * @example
 * ```ts
 * useEffect(() => {
 *   if (isOpen) {
 *     disableScroll()
 *     return () => enableScroll()
 *   }
 * }, [isOpen])
 * ```
 */
export function disableScroll(): void {
  document.body.style.overflow = 'hidden';
}

/**
 * Reabilita scroll
 *
 * Restaura a capacidade de rolagem da página removendo o bloqueio
 * de overflow do body.
 *
 * @example
 * ```ts
 * useEffect(() => {
 *   disableScroll()
 *   return () => enableScroll()
 * }, [])
 * ```
 */
export function enableScroll(): void {
  document.body.style.overflow = '';
}
