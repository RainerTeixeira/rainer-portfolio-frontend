// ============================================================================
// Tipos base para respostas da API
// ============================================================================

// ApiResponse está definido em client.ts para evitar duplicação
export type { ApiResponse } from './client';

// ============================================================================
// (Removido) Re-exportação direta de tipos do backend
// Mantemos apenas os tipos base locais para evitar dependência inexistente
// e ambiguidades de nomes.
// ============================================================================

// ============================================================================
// Tipos de compatibilidade (mantidos para não quebrar código existente)
// =========================================================================

// Opções de paginação
export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Filtros comuns
export interface CommonFilters extends PaginationOptions {
  search?: string;
  status?: string;
  featured?: boolean;
}

// Tipos de ordenação
export type SortOrder = 'asc' | 'desc';

// =========================================================================
// Tipos genéricos de resposta paginada (esperado por alguns services)
// =========================================================================

export interface PaginatedResponse<T = any> {
  data: T[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages?: number;
  };
}

// =========================================================================
// Re-export/aliases para compatibilizar services existentes
// =========================================================================

// Comments
export type { Comment, CreateCommentData, UpdateCommentData } from './types/comments';
export type { ListCommentsParams as CommentFilters } from './types/comments';

// Likes
export type { Like, CreateLikeData } from './types/likes';

// Bookmarks
export type { Bookmark, CreateBookmarkData, UpdateBookmarkData } from './types/bookmarks';

// Users
export type { CreateUserData, UpdateUserData } from './types/users';
export type { PublicUserProfile as User } from './types/users';
export type { ListUsersParams as UserFilters } from './types/users';
