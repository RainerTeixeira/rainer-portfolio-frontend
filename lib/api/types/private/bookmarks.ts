/**
 * @fileoverview Tipos para APIs Privadas de Bookmarks
 * 
 * Define os tipos TypeScript utilizados para comunicação com os endpoints
 * privados de bookmarks (favoritos em posts e comentários).
 * 
 * @module lib/api/types/private/bookmarks
 */

/**
 * Interface para criação de bookmark
 */
export interface CreateBookmarkDto {
  /** Tipo do recurso */
  type: 'post' | 'comment';
  /** ID do recurso */
  resourceId: string;
}

/**
 * Interface para representar um bookmark
 */
export interface Bookmark {
  /** ID único do bookmark */
  id: string;
  /** ID do usuário que favoritou */
  userId: string;
  /** Tipo do recurso */
  type: 'post' | 'comment';
  /** ID do recurso */
  resourceId: string;
  /** Data de criação */
  createdAt: string;
}

/**
 * Interface para resposta de criação/remoção de bookmark
 */
export interface BookmarkMutationResponse {
  /** Mensagem de sucesso */
  message: string;
  /** Bookmark criado/deletado */
  data: Bookmark;
  /** Status da operação */
  bookmarked: boolean;
}

/**
 * Interface para resposta de verificação de bookmark
 */
export interface BookmarkCheckResponse {
  /** Usuário favoritou o recurso */
  bookmarked: boolean;
  /** ID do bookmark se existir */
  bookmarkId?: string;
}

/**
 * Interface para parâmetros de listagem de bookmarks
 */
export interface GetBookmarksParams {
  /** Número da página */
  page?: number;
  /** Limite de itens por página */
  limit?: number;
  /** Filtrar por tipo */
  type?: 'post' | 'comment';
  /** Filtrar por recurso */
  resourceId?: string;
  /** Filtrar por usuário */
  userId?: string;
  /** Ordenar por campo */
  sortBy?: 'createdAt';
  /** Direção da ordenação */
  sortOrder?: 'asc' | 'desc';
}

/**
 * Interface para resposta paginada de bookmarks
 */
export interface PaginatedBookmarksResponse {
  /** Lista de bookmarks */
  data: Bookmark[];
  /** Metadados de paginação */
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Interface para estatísticas de bookmarks
 */
export interface BookmarkStats {
  /** Total de bookmarks */
  totalBookmarks: number;
  /** Bookmarks em posts */
  postBookmarks: number;
  /** Bookmarks em comentários */
  commentBookmarks: number;
  /** Bookmarks hoje */
  bookmarksToday: number;
  /** Posts mais favoritados */
  topBookmarkedPosts: {
    id: string;
    title: string;
    bookmarksCount: number;
  }[];
}
