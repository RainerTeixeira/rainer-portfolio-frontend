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
// AUTENTICAÇÃO
// ============================================================================

export { 
  useAuth, 
  useIsAuthenticated, 
  useCurrentUser, 
  useHasRole, 
  useIsAdmin 
} from './use-auth';

// ============================================================================
// Analytics & Monitoring
// ============================================================================

export { useAnalytics, withAnalytics } from './use-analytics';

// ============================================================================
// UI & UX
// ============================================================================

// Hooks migrados para @rainersoft/ui
export { useIsMobile, usePWA } from '@rainersoft/ui';
// useTheme continua do next-themes (não migrado para @rainersoft/ui)
// useSmoothScroll removido - funcionalidade migrada para @rainersoft/ui

// ============================================================================
// Forms
// ============================================================================

export { usePasswordStrength } from '@rainersoft/utils';
export { useCarouselKeyboard } from '@rainersoft/ui';
export { useTableOfContents } from '@rainersoft/ui';

// Avatar utils migrados para @rainersoft/utils
export { extractInitials } from '@rainersoft/utils';

