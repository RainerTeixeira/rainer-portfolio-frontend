/**
 * Exportações de Hooks do Dashboard
 * 
 * Barrel file para centralizar exportações dos hooks
 * 
 * @fileoverview Dashboard hooks exports
 * @author Rainer Teixeira
 */

export { useAnalyticsData } from './use-analytics-data'
export { useDashboardStats } from './use-dashboard-stats'
export { usePasswordStrength } from './use-password-strength'
export type { PasswordStrength } from './use-password-strength'
export { useBlogContentUpload, useBlogCoverUpload, useImageCompression, useUpload } from './use-upload'
export type { UploadState } from './use-upload'

// Hooks de autosave
export { useAutosave, useLocalDraft } from './use-autosave'

// Hooks de posts (React Query)
export {
    postKeys, useBookmarkPost, useCreatePost, useDeletePost, useIncrementViews, useLikePost, usePost, usePosts, usePublishPost,
    useUnpublishPost, useUpdatePost
} from './use-posts'

