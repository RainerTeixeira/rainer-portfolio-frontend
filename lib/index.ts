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

export * from './utils'

// ============================================================================
// Environment
// ============================================================================

export * from './env'

// ============================================================================
// Logging
// ============================================================================

export { logger, Logger } from './logger'

// ============================================================================
// Analytics
// ============================================================================

export { analytics, Analytics, ANALYTICS_EVENTS } from './analytics'

// ============================================================================
// Performance
// ============================================================================

export { performanceMonitor, PerformanceMonitor } from './performance-monitor'

// ============================================================================
// Validation
// ============================================================================

export * from './validation-schemas'

// ============================================================================
// Blog Store (Moved to @/components/blog/lib/)
// ============================================================================

export { blogStore } from '@/components/blog/lib/blog-store'
export type { BlogPost } from '@/components/blog/lib/blog-store'

// ============================================================================
// Auth (Moved to @/components/dashboard/lib/)
// ============================================================================

export * from '@/components/dashboard/lib/auth-local'

// ============================================================================
// Helpers
// ============================================================================

// Note: Export individual items to avoid name conflicts
// Use direct imports if needed: import { specific } from '@/lib/api-helpers'

