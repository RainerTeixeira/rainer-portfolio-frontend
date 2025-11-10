/**
 * Library Barrel Exports
 *
 * Exportações centralizadas de todas as bibliotecas e utilitários.
 * Facilita imports com um único ponto de entrada.
 *
 * @fileoverview Barrel exports para lib
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// ============================================================================
// Core Utils
// ============================================================================

export * from './utils';

// ============================================================================
// Environment
// ============================================================================

export * from './env';

// ============================================================================
// Logging
// ============================================================================

export { Logger, logger } from './logger';

// ============================================================================
// Analytics
// ============================================================================

export { ANALYTICS_EVENTS, Analytics, analytics } from './analytics';

// ============================================================================
// Performance
// ============================================================================

export { PerformanceMonitor, performanceMonitor } from './performance-monitor';

// ============================================================================
// Validation
// ============================================================================

export * from './validation-schemas';

// ============================================================================
// Blog Store (Moved to @/components/blog/lib/)
// ============================================================================

// Blog Store removido - usar postsService da API
export { blogPublicApi } from './blog-public-api';

// ============================================================================
// Auth (Moved to @/components/dashboard/lib/)
// ============================================================================

export * from '@/components/dashboard/lib/auth-local';

// ============================================================================
// Helpers
// ============================================================================

// Note: Export individual items to avoid fullName conflicts
// Use direct imports if needed: import { specific } from '@/lib/api-helpers'
