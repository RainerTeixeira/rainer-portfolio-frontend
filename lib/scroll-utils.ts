/**
 * Utilitários de Scroll Acessíveis
 * 
 * Biblioteca de funções para gerenciamento de scroll que respeitam
 * automaticamente as preferências de acessibilidade do usuário.
 * 
 * Todas as funções verificam a preferência prefers-reduced-motion e
 * ajustam o comportamento para garantir uma experiência confortável
 * para todos os usuários, incluindo aqueles com sensibilidade a movimentos.
 * 
 * @fileoverview Funções utilitárias para scroll acessível
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

/**
 * Verifica se o usuário prefere movimento reduzido
 * 
 * Consulta a media query CSS 'prefers-reduced-motion' para determinar
 * se o usuário ativou a configuração de redução de movimento no
 * sistema operacional ou navegador.
 * 
 * Casos de uso:
 * - Desabilitar animações suaves
 * - Reduzir efeitos parallax
 * - Remover transições desnecessárias
 * 
 * @returns {boolean} true se o usuário prefere movimento reduzido, false caso contrário
 * 
 * @example
 * if (prefersReducedMotion()) {
 *   // Usar scroll instantâneo
 *   element.scrollIntoView({ behavior: 'auto' })
 * } else {
 *   // Usar scroll suave
 *   element.scrollIntoView({ behavior: 'smooth' })
 * }
 */
export function prefersReducedMotion(): boolean {
  /** SSR safety: retorna false no servidor onde window não existe */
  if (typeof window === 'undefined') return false
  
  /** Consulta a media query e retorna se o usuário prefere movimento reduzido */
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Faz scroll suave para um elemento específico
 * 
 * Rola a viewport até um elemento DOM, respeitando automaticamente
 * a preferência prefers-reduced-motion do usuário.
 * 
 * Comportamento:
 * - Se prefers-reduced-motion: scroll instantâneo (behavior: 'auto')
 * - Caso contrário: scroll suave (behavior: 'smooth')
 * - Posicionamento padrão: topo do elemento (block: 'start')
 * - Alinhamento horizontal: mais próximo (inline: 'nearest')
 * 
 * @param {string | Element} target - Seletor CSS (ex: '#section') ou elemento DOM direto
 * @param {ScrollIntoViewOptions} [options] - Opções adicionais de scroll para sobrescrever padrões
 * @returns {void}
 * 
 * @example
 * // Com seletor CSS
 * smoothScrollTo('#sobre')
 * 
 * @example
 * // Com elemento DOM
 * const el = document.getElementById('contato')
 * smoothScrollTo(el)
 * 
 * @example
 * // Com opções customizadas
 * smoothScrollTo('#skills', { block: 'center' })
 */
export function smoothScrollTo(
  target: string | Element,
  options?: ScrollIntoViewOptions
): void {
  /**
   * Resolve o elemento alvo
   * - Se string: busca no DOM via querySelector
   * - Se Element: usa diretamente
   */
  const element = typeof target === 'string' 
    ? document.querySelector(target) 
    : target

  /** Validação: se elemento não existe, loga aviso e retorna */
  if (!element) {
    console.warn(`Elemento não encontrado: ${target}`)
    return
  }

  /** Determina se deve animar baseado em preferências de acessibilidade */
  const shouldAnimate = !prefersReducedMotion()

  /**
   * Executa o scroll com configurações apropriadas
   * - behavior: 'smooth' ou 'auto' baseado em shouldAnimate
   * - block: 'start' alinha topo do elemento com topo da viewport
   * - inline: 'nearest' evita scroll horizontal desnecessário
   * - ...options: permite sobrescrever qualquer padrão
   */
  element.scrollIntoView({
    behavior: shouldAnimate ? 'smooth' : 'auto',
    block: 'start',
    inline: 'nearest',
    ...options
  })
}

/**
 * Faz scroll para o topo da página
 * 
 * Rola a viewport para a posição inicial (topo) da página,
 * respeitando automaticamente prefers-reduced-motion.
 * 
 * Útil para:
 * - Botões "Voltar ao topo"
 * - Reset de posição após navegação
 * - Início de novas seções
 * 
 * @returns {void}
 * 
 * @example
 * <button onClick={scrollToTop}>
 *   ↑ Voltar ao topo
 * </button>
 */
export function scrollToTop(): void {
  /** Determina se deve animar baseado em preferências de acessibilidade */
  const shouldAnimate = !prefersReducedMotion()

  /**
   * Rola a janela para posição (0, 0)
   * - top: 0 = topo da página
   * - left: 0 = extrema esquerda (reset horizontal também)
   * - behavior: suave ou instantâneo baseado em preferências
   */
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: shouldAnimate ? 'smooth' : 'auto'
  })
}

/**
 * Faz scroll para uma posição numérica específica
 * 
 * Rola a viewport para coordenadas exatas em pixels,
 * respeitando automaticamente prefers-reduced-motion.
 * 
 * Útil para:
 * - Posicionamento preciso programático
 * - Scroll baseado em cálculos dinâmicos
 * - Navegação para posições computadas
 * 
 * @param {number} top - Posição vertical em pixels do topo
 * @param {number} [left=0] - Posição horizontal em pixels da esquerda (padrão: 0)
 * @returns {void}
 * 
 * @example
 * // Rolar para 500px do topo
 * scrollToPosition(500)
 * 
 * @example
 * // Rolar para posição específica (vertical e horizontal)
 * scrollToPosition(800, 200)
 */
export function scrollToPosition(top: number, left: number = 0): void {
  /** Determina se deve animar baseado em preferências de acessibilidade */
  const shouldAnimate = !prefersReducedMotion()

  /**
   * Rola a janela para posição numérica exata
   * - top: posição vertical em pixels
   * - left: posição horizontal em pixels
   * - behavior: suave ou instantâneo conforme preferências
   */
  window.scrollTo({
    top,
    left,
    behavior: shouldAnimate ? 'smooth' : 'auto'
  })
}

/**
 * Monitora mudanças na preferência de movimento reduzido
 * 
 * Cria um listener para a media query prefers-reduced-motion e executa
 * um callback sempre que o usuário alterar suas preferências de acessibilidade.
 * 
 * Permite que a aplicação reaja dinamicamente a mudanças nas configurações
 * do sistema operacional ou navegador sem necessidade de recarregar a página.
 * 
 * @param {(matches: boolean) => void} callback - Função executada quando preferência muda
 *                                                 Recebe true se movimento reduzido está ativo
 * @returns {() => void} Função de cleanup para remover o listener
 * 
 * @example
 * const cleanup = onReducedMotionChange((isReduced) => {
 *   console.log('Movimento reduzido:', isReduced)
 *   setAnimationsEnabled(!isReduced)
 * })
 * 
 * // Depois, limpar o listener
 * cleanup()
 */
export function onReducedMotionChange(
  callback: (matches: boolean) => void
): () => void {
  /**
   * SSR safety: retorna função vazia no servidor
   * onde window e matchMedia não existem
   */
  if (typeof window === 'undefined') {
    return () => {}
  }

  /** Cria media query para prefers-reduced-motion */
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  
  /**
   * Handler que processa eventos de mudança
   * Aceita tanto MediaQueryListEvent quanto MediaQueryList
   * para compatibilidade com diferentes navegadores
   */
  const handler = (event: MediaQueryListEvent | MediaQueryList) => {
    callback(event.matches)
  }

  /** 
   * Chama callback uma vez inicialmente com estado atual
   * Garante que o estado inicial seja sincronizado
   */
  handler(mediaQuery)

  /**
   * Adiciona listener para mudanças futuras
   * Usa addEventListener se disponível (navegadores modernos)
   * ou addListener como fallback (navegadores antigos)
   */
  if (mediaQuery.addEventListener) {
    /** Navegadores modernos: addEventListener */
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  } else {
    /** Fallback para navegadores antigos: addListener (deprecated) */
    mediaQuery.addListener(handler)
    return () => mediaQuery.removeListener(handler)
  }
}

/**
 * Desabilita scroll temporariamente
 * 
 * Bloqueia a rolagem da página definindo overflow: hidden no body.
 * Útil para prevenir scroll enquanto modais, dialogs ou menus
 * estão abertos.
 * 
 * Importante: sempre chamar enableScroll() quando o elemento for fechado
 * para restaurar a funcionalidade de scroll.
 * 
 * @returns {void}
 * 
 * @example
 * function Modal({ isOpen, onClose }) {
 *   useEffect(() => {
 *     if (isOpen) {
 *       disableScroll() // Bloqueia scroll quando modal abre
 *       return () => enableScroll() // Restaura ao fechar
 *     }
 *   }, [isOpen])
 * }
 */
export function disableScroll(): void {
  /** Define overflow hidden no body para prevenir rolagem */
  document.body.style.overflow = 'hidden'
}

/**
 * Reabilita scroll
 * 
 * Restaura a capacidade de rolagem da página removendo o bloqueio
 * de overflow do body.
 * 
 * Deve ser chamada sempre após disableScroll() para evitar que
 * a página fique permanentemente sem scroll.
 * 
 * @returns {void}
 * 
 * @example
 * // Em cleanup de useEffect
 * useEffect(() => {
 *   disableScroll()
 *   return () => enableScroll() // Sempre limpar
 * }, [])
 */
export function enableScroll(): void {
  /** Remove a propriedade overflow, restaurando comportamento padrão */
  document.body.style.overflow = ''
}

