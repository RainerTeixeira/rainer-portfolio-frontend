/**
 * Hooks Barrel Exports
 *
 * Exportações centralizadas de todos os hooks customizados.
 *
 * @fileoverview Barrel exports para hooks
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// ============================================================================
// Analytics & Monitoring
// ============================================================================

export { useAnalytics, withAnalytics } from './use-analytics';

// ============================================================================
// UI & UX
// ============================================================================

export { useIsMobile } from './use-mobile';
export { usePWA } from './use-pwa';
export { useSmoothScroll } from './use-smooth-scroll';

// ============================================================================
// Forms
// ============================================================================

// Removidos temporariamente - hooks não existem ainda
// export { usePasswordStrength } from './use-password-strength';
// export { useUpload } from './use-upload';
