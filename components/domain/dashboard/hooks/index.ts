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
 */

// Import direto do barrel da API (nova estrutura)
import { 
  postsService,
  categoriesService,
  usersService,
  engagementService
} from '@/lib/api/private/dashboard/dashboard';

// Hooks genéricos migrados - re-exportar da biblioteca
export { usePasswordStrength } from '@/hooks';

// Hooks de upload (mantidos locais)
export {
  useBlogContentUpload,
  useBlogCoverUpload,
  useImageCompression,
  useUpload,
} from './use-upload';

// Hooks de autosave (mantidos locais)
export { useAutosave, useLocalDraft } from './use-autosave';

// Hooks de posts (React Query - atualizados para usar nova API)
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

// Hooks de dashboard (específicos - atualizados para usar nova API)
export {
  useDashboardStats,
} from './use-dashboard-stats';
