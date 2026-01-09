/**
 * Utilitários do Frontend (Portfolio-specific)
 * 
 * Este arquivo contém utilitários que são específicos do domínio
 * do portfolio e não devem ser migrados para @rainersoft/utils.
 * 
 * Utilitários genéricos devem ser importados de @rainersoft/utils.
 */

// ============================================================================
// IMPORTAÇÕES DAS BIBLIOTECAS @rainersoft
// ============================================================================

// Funções genéricas migradas para @rainersoft/utils
export { 
  validateEmail, 
  validatePassword, 
  validateUrl, 
  validatePhone, 
  validateUsername, 
  validateSlug,
  validateText,
  textToSlug,
  formatDate,
  formatRelativeDate,
  formatDateTime,  // ✅ Da biblioteca @rainersoft/utils
  formatCurrency,
  formatNumber,
  prefersReducedMotion,
  scrollToTop,
  scrollToElement,
  onReducedMotionChange,
  // Funções utilitárias
  extractInitials,
  generateUniqueId,
  truncateText,
  capitalize,
  cleanText,
  countWords,
  isEmpty,
  normalizeSpaces,
  formatNumber as formatLargeNumber,
  calculateChange,
  formatPercentage,
  generateMockChartData,
  groupDataByPeriod,
  // Status e tradução
  translateStatus,     // ✅ Da biblioteca @rainersoft/utils
  getStatusColor,
  getStatusVariant
} from '@rainersoft/utils';

// Utilitários de conteúdo (Tiptap e Markdown)
export { tiptapJSONToMarkdown, markdownToTiptapJSON } from './markdown-converter';

// Utilitários de compressão de posts
export * from './post-compressor';

// Utilitários de blog 
export * from './reading-time';
export * from './tiptap-editor';

// Utilitários de autenticação
export * from './token-storage';

// Componentes e utilitários de UI migrados para @rainersoft/ui
export {
  Avatar,
  isAcceptedFormat,
  isWebP,
  supportsWebP,
  getImageInfo,
  resizeImage,
  convertToWebP,
  prepareImageForUpload,
  generatePlaceholder
} from '@rainersoft/ui';

// ============================================================================
// IMPORTAÇÕES DE CONSTANTES
// ============================================================================

export { TRANSITION_DELAYS, ANIMATION_DELAYS } from './css-constants';

// ============================================================================
// NOVOS MÓDULOS CONSOLIDADOS
// ============================================================================

// Image optimization
export * from './image-processor';

// Design tokens (safe loading)
export * from './theme-manager';

// Content search
export * from './content-search';

// CSS helpers
export * from './css-constants';

// ============================================================================
// CONSTANTES CSS (Portfolio-specific)
// ============================================================================

/**
 * Classes CSS para sections responsivas
 *
 * Conjunto de classes Tailwind padronizadas para seções da aplicação.
 * Usa spacing tokens do design system para consistência.
 */
export const SECTION_CLASSES = {
  /** Container padrão: largura máxima 7xl, centralizado, padding usando tokens */
  container: 'w-full max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8',
 
  /** Espaçamento vertical usando tokens do design system */
  spacing: 'space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8',
} as const;

/**
 * Classes CSS para cards com hover effects
 *
 * Conjunto de classes padronizadas para componentes Card.
 * Usa tokens de transição e sombra do design system.
 */
export const CARD_CLASSES = {
  /** Classes base do card: transição suave */
  base: 'transition-all duration-200 ease-in-out',
 
  /** Efeito de hover: sombra usando tokens */
  hover: 'hover:shadow-lg',
 
  /** Combinação completa: base + hover */
  full: 'transition-all duration-200 ease-in-out hover:shadow-lg',
} as const;

// ============================================================================
// FUNÇÕES DE UTILIDADE CSS
// ============================================================================

/**
 * Merge inteligente de classes CSS (tailwind-merge)
 * 
 * Combina classes de forma inteligente, removendo conflitos do Tailwind.
 */
import { clsx } from 'clsx';
export const cn = clsx;

// ============================================================================
// DOMAIN-SPECIFIC HELPERS
// ============================================================================

export * from './domain-helpers';
