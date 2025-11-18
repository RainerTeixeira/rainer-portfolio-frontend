/**
 * Site Sections
 *
 * Configuração de IDs e classes para seções do site.
 *
 * @module constants/site/sections
 * @author Rainer Teixeira
 * @version 2.0.0
 */

import { cn } from '@/lib/utils';
import { GRADIENT_DIRECTIONS } from '@rainersoft/design-tokens';

/**
 * IDs das seções para navegação e scroll
 */
export const SECTION_IDS = {
  STATS: 'stats',
  HIGHLIGHTS: 'destaques',
  PORTFOLIO: 'portfolio',
  TECH: 'tech',
  ABOUT: 'sobre',
  TESTIMONIALS: 'testimonials',
  NEWSLETTER: 'newsletter',
  CTA: 'cta',
  CONTACT: 'contato',
} as const;

/**
 * Classes CSS para divisores de seção (usando tokens via Tailwind)
 */
export const DIVIDER_CLASSES = {
  CYAN: cn(
    'relative my-16',
    'h-1',
    `${GRADIENT_DIRECTIONS.TO_RIGHT} from-transparent via-cyan-400/30 to-transparent`
  ),
  PURPLE: cn(
    'relative my-16',
    'h-1',
    `${GRADIENT_DIRECTIONS.TO_RIGHT} from-transparent via-purple-400/30 to-transparent`
  ),
  PINK: cn(
    'relative my-16',
    'h-1',
    `${GRADIENT_DIRECTIONS.TO_RIGHT} from-transparent via-pink-400/30 to-transparent`
  ),
} as const;
