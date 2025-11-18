/**
 * Utilitários Gerais da Aplicação
 *
 * Módulo centralizado com funções auxiliares reutilizáveis em toda a aplicação.
 * Inclui funções para merge de classes CSS, constantes de estilos padronizados
 * e helpers para componentes React.
 *
 * ## Funcionalidades Principais
 *
 * ### Classes CSS Reutilizáveis
 * - `SECTION_CLASSES` - Classes padronizadas para seções responsivas
 * - `CARD_CLASSES` - Classes padronizadas para componentes Card
 *
 * ### Funções Utilitárias
 * - `cn()` - Merge inteligente de classes CSS (clsx + tailwind-merge)
 * - `getIcon()` - Helper para obter ícones com fallback
 *
 * ## Uso
 *
 * ```typescript
 * import { cn, SECTION_CLASSES, CARD_CLASSES } from '@/lib/utils'
 *
 * // Merge de classes
 * const className = cn('base-class', condition && 'conditional-class')
 *
 * // Usar classes padronizadas
 * <section className={SECTION_CLASSES.container}>
 *   <Card className={CARD_CLASSES.full}>
 *     // conteúdo
 *   </Card>
 * </section>
 * ```
 *
 * @module lib/utils
 * @fileoverview Funções utilitárias globais e constantes de estilos
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

import { twMerge } from 'tailwind-merge';

// =============================================================================
// CONSTANTES DE CLASSES CSS REUTILIZÁVEIS
// Baseadas em design tokens para consistência
// =============================================================================

/**
 * Classes CSS para sections responsivas
 *
 * Conjunto de classes Tailwind padronizadas para seções da aplicação.
 * Usa spacing tokens do design system para consistência.
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
  /** Container padrão: largura máxima 7xl, centralizado, padding usando tokens (px-2 = 0.5rem, px-3 = 0.75rem, etc) */
  container: 'w-full max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8',

  /** Espaçamento vertical usando tokens do design system (space-y-3 = 0.75rem, space-y-4 = 1rem, etc) */
  spacing: 'space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8',
} as const;

/**
 * Classes CSS para cards com hover effects
 *
 * Conjunto de classes padronizadas para componentes Card.
 * Usa tokens de transição e sombra do design system.
 *
 * @constant
 * @type {Object}
 * @readonly
 *
 * @property {string} base - Classes base do card (transição usando tokens)
 * @property {string} hover - Classes de hover effect (sombra usando tokens)
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
  /** Classes base do card: transição suave (200ms = padrão do design system) */
  base: 'transition-all duration-200 ease-in-out',

  /** Efeito de hover: sombra usando tokens (shadow-lg do design system) */
  hover: 'hover:shadow-lg',

  /** Combinação completa: base + hover */
  full: 'transition-all duration-200 ease-in-out hover:shadow-lg',
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
 * - Aceita strings, arrays, objetos condicionais
 * - twMerge: Resolve conflitos entre classes Tailwind (última ganha)
 *
 * @param {...(string | undefined | null | false | Record<string, boolean> | string[])} inputs - Classes CSS para combinar
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
export function cn(
  ...inputs: (
    | string
    | undefined
    | null
    | false
    | Record<string, boolean>
    | string[]
  )[]
): string {
  // Processa condicionais manualmente (substitui clsx)
  const classes = inputs
    .filter(Boolean)
    .map(input => {
      if (typeof input === 'string') return input;
      if (Array.isArray(input)) return input.filter(Boolean).join(' ');
      if (typeof input === 'object' && input !== null) {
        return Object.entries(input)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(' ');
      }
      return '';
    })
    .filter(Boolean)
    .join(' ');

  return twMerge(classes);
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

// =============================================================================
// Design Tokens Exports (Re-export from design-tokens.ts)
// =============================================================================

export {
  COLOR_HEX,
  COLOR_RGB,
  hexToHSL,
  hexToRGB,
  hexToRGBA,
  hexColorsToHSL,
  getThemeColors,
} from './utils/design-tokens';