/**
 * Utilitários Gerais da Aplicação
 *
 * Funções auxiliares reutilizáveis em toda a aplicação.
 * Inclui funções para merge de classes CSS, constantes de estilos
 * e helpers para componentes.
 *
 * @fileoverview Funções utilitárias globais
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// =============================================================================
// CONSTANTES DE CLASSES CSS REUTILIZÁVEIS
// =============================================================================

/**
 * Classes CSS para sections responsivas
 *
 * Conjunto de classes Tailwind padronizadas para seções da aplicação.
 * Garante consistência visual e facilita manutenção.
 *
 * @constant
 * @type {Object}
 * @readonly
 *
 * @property {string} container - Container principal com largura máxima e padding responsivo
 * @property {string} spacing - Espaçamento vertical responsivo entre elementos
 *
 * @example
 * import { SECTION_CLASSES } from '@/lib/utils'
 *
 * <section className={SECTION_CLASSES.container}>
 *   <div className={SECTION_CLASSES.spacing}>
 *     // conteúdo
 *   </div>
 * </section>
 */
export const SECTION_CLASSES = {
  /** Container padrão: largura máxima 7xl, centralizado, padding responsivo otimizado */
  container: 'w-full max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8',

  /** Espaçamento vertical entre elementos dentro de sections otimizado */
  spacing: 'space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8',
} as const;

/**
 * Classes CSS para cards com hover effects
 *
 * Conjunto de classes padronizadas para componentes Card.
 * Inclui estados de hover, transições e efeitos visuais.
 *
 * @constant
 * @type {Object}
 * @readonly
 *
 * @property {string} base - Classes base do card
 * @property {string} hover - Classes de hover effect
 * @property {string} full - Todas as classes combinadas (base + hover)
 *
 * @example
 * import { CARD_CLASSES } from '@/lib/utils'
 *
 * <Card className={CARD_CLASSES.full}>
 *   // conteúdo
 * </Card>
 */
export const CARD_CLASSES = {
  /** Classes base do card */
  base: 'transition-all duration-300',

  /** Efeito de hover: sombra aumentada */
  hover: 'hover:shadow-lg',

  /** Combinação completa: base + hover */
  full: 'hover:shadow-lg transition-all duration-300',
} as const;

/**
 * Delays de animação para partículas e efeitos
 *
 * Conjunto de valores padronizados para delays de animação
 * usados em partículas, transições e efeitos visuais.
 *
 * @constant
 * @type {Object}
 * @readonly
 *
 * @property {string} particle1 - Delay para primeira partícula
 * @property {string} particle2 - Delay para segunda partícula
 * @property {string} particle3 - Delay para terceira partícula
 *
 * @example
 * import { ANIMATION_DELAYS } from '@/lib/utils'
 *
 * <div style={{ animationDelay: ANIMATION_DELAYS.particle2 }}>
 *   // partícula animada
 * </div>
 */
export const ANIMATION_DELAYS = {
  /** Delay de 1s para primeira partícula */
  particle1: '1s',

  /** Delay de 2s para segunda partícula */
  particle2: '2s',

  /** Delay de 3s para terceira partícula */
  particle3: '3s',

  /** Delay de 1.5s (variação) */
  short: '1.5s',

  /** Delay de 2.5s (variação) */
  medium: '2.5s',

  /** Delay de 4s (variação) */
  long: '4s',
} as const;

/**
 * Combina e mescla classes CSS de forma inteligente
 *
 * Esta função é fundamental para trabalhar com Tailwind CSS e componentes
 * dinâmicos. Ela resolve conflitos entre classes Tailwind e permite
 * composição condicional de estilos.
 *
 * Funcionalidades:
 * - clsx: Concatena classes condicionalmente (aceita objetos, arrays, strings)
 * - twMerge: Resolve conflitos entre classes Tailwind (última ganha)
 *
 * @param {...ClassValue} inputs - Classes CSS para combinar (strings, objetos, arrays, etc)
 * @returns {string} String final com classes CSS mescladas e sem conflitos
 *
 * @example
 * // Uso básico
 * cn('px-4 py-2', 'bg-blue-500') // "px-4 py-2 bg-blue-500"
 *
 * @example
 * // Com condicionais
 * cn('btn', { 'btn-active': isActive, 'btn-disabled': isDisabled })
 *
 * @example
 * // Resolvendo conflitos Tailwind (último ganha)
 * cn('px-4 px-2') // "px-2" (twMerge remove duplicatas)
 *
 * @example
 * // Em componentes
 * function Button({ className, ...props }) {
 *   return <button className={cn('btn btn-primary', className)} {...props} />
 * }
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Resolve componente de ícone dinamicamente com fallback
 *
 * Função utilitária para resolver ícones Lucide React de forma segura.
 * Se o ícone solicitado não existir no mapa, retorna o ícone de fallback.
 *
 * Útil para renderização dinâmica baseada em dados de configuração
 * (ex: footer, services, etc).
 *
 * @template T - Tipo do componente de ícone
 * @param {Record<string, T>} iconMap - Mapa de nomes para componentes de ícone
 * @param {string} iconName - Nome do ícone a buscar
 * @param {T} fallback - Ícone de fallback se não encontrar
 * @returns {T} Componente de ícone resolvido ou fallback
 *
 * @example
 * import { Globe, Layers } from 'lucide-react'
 * import { getIcon } from '@/lib/utils'
 *
 * const ICONS = { Globe, Layers }
 * const IconComponent = getIcon(ICONS, 'Globe', Layers)
 *
 * @example
 * // Com ícone não existente (retorna fallback)
 * const IconComponent = getIcon(ICONS, 'NonExistent', Layers) // retorna Layers
 */
export function getIcon<T>(
  iconMap: Record<string, T>,
  iconName: string,
  fallback: T
): T {
  return iconMap[iconName] || fallback;
}
