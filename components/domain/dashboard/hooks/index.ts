/**
 * Dashboard Hooks Barrel Export
 *
 * Barrel file que centraliza exportações de todos os hooks do dashboard.
 * Facilita imports e mantém organização do código.
 *
 * @module components/domain/dashboard/hooks/index
 * @fileoverview Barrel export para hooks do dashboard
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Import direto do barrel
 * import { useDashboardStats, useAnalyticsData } from '@/components/domain/dashboard/hooks'
 *
 * // Equivale a:
 * import { useDashboardStats } from '@/components/domain/dashboard/hooks/use-dashboard-stats'
 * import { useAnalyticsData } from '@/components/domain/dashboard/hooks/use-analytics-data'
 */

/**
 * Hooks do Dashboard (Portfolio-specific)
 * 
 * Apenas hooks específicos do domínio do dashboard.
 * Hooks genéricos foram migrados para @rainersoft/utils.
 */

// Hooks genéricos migrados - re-exportar da biblioteca
export { usePasswordStrength } from '@rainersoft/utils';

// Hooks específicos do dashboard
export {
  useBlogContentUpload,
  useBlogCoverUpload,
  useImageCompression,
  useUpload,
} from './use-upload';
export type { UploadState } from './use-upload';

// Hooks de autosave
export { useAutosave, useLocalDraft } from './use-autosave';

// Hooks de posts (React Query)
export {
  postKeys,
  useBookmarkPost,
  useCreatePost,
  useDeletePost,
  useIncrementViews,
  useLikePost,
  usePost,
  usePosts,
  usePublishPost,
  useUnpublishPost,
  useUpdatePost,
} from './use-posts';

// Hooks de dashboard (específicos)
export function useDashboardStats() {
  // Hook específico para estatísticas do dashboard
  // Implementação futura ou usar React Query
  return {
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0,
    totalLikes: 0,
    isLoading: false,
    error: null
  };
}

export function useAnalyticsData() {
  // Hook específico para analytics do dashboard
  // Implementação futura ou usar React Query
  return {
    views: [],
    likes: [],
    comments: [],
    shares: [],
    isLoading: false,
    error: null
  };
}


