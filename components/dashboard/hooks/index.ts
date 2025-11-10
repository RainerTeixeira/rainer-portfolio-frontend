/**
 * Dashboard Hooks Barrel Export
 *
 * Barrel file que centraliza exportações de todos os hooks do dashboard.
 * Facilita imports e mantém organização do código.
 *
 * @module components/dashboard/hooks/index
 * @fileoverview Barrel export para hooks do dashboard
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Import direto do barrel
 * import { useDashboardStats, useAnalyticsData } from '@/components/dashboard/hooks'
 *
 * // Equivale a:
 * import { useDashboardStats } from '@/components/dashboard/hooks/use-dashboard-stats'
 * import { useAnalyticsData } from '@/components/dashboard/hooks/use-analytics-data'
 * ```
 */

export { useAnalyticsData } from './use-analytics-data';
export { useDashboardStats } from './use-dashboard-stats';
export { usePasswordStrength } from './use-password-strength';
export type { PasswordStrength } from './use-password-strength';
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
