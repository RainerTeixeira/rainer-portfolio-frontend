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
import { DIVIDER } from '@rainer/design-tokens';

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
 * Classes CSS para divisores de seção (usando tokens)
 */
export const DIVIDER_CLASSES = {
  CYAN: cn('relative my-16', DIVIDER.HEIGHT_THIN, DIVIDER.GRADIENT.CYAN),
  PURPLE: cn('relative my-16', DIVIDER.HEIGHT_THIN, DIVIDER.GRADIENT.PURPLE),
  PINK: cn('relative my-16', DIVIDER.HEIGHT_THIN, DIVIDER.GRADIENT.PINK),
} as const;
