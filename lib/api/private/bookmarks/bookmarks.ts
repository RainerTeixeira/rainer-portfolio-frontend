/**
 * @fileoverview Serviços Privados de Bookmarks
 * 
 * Contém funções para comunicação com endpoints privados de bookmarks.
 * Requer autenticação.
 * 
 * @module lib/api/private/bookmarks/bookmarks
 */

import { privateClient } from '../../clients/private-client';
import {
  Bookmark,
  CreateBookmarkDto,
  BookmarkMutationResponse,
  BookmarkCheckResponse,
  GetBookmarksParams,
  PaginatedBookmarksResponse,
  BookmarkStats,
} from '../../types/private/bookmarks';

/**
 * Cria um novo bookmark (favoritar)
 * 
 * @param data - Dados do bookmark a ser criado
 * @returns Promise<BookmarkMutationResponse> - Bookmark criado
 * 
 * @example
 * ```typescript
 * const result = await createBookmark({
 *   type: 'post',
 *   resourceId: '123'
 * });
 * ```
 */
export const createBookmark = async (data: CreateBookmarkDto): Promise<BookmarkMutationResponse> => {
  const endpoint = data.type === 'post' ? '/bookmarks/post' : '/bookmarks/comment';
  const response = await privateClient.post(endpoint, { resourceId: data.resourceId });
  return response.data;
};

/**
 * Remove um bookmark (desfavoritar)
 * 
 * @param userId - ID do usuário
 * @param type - Tipo do recurso
 * @param resourceId - ID do recurso
 * @returns Promise<BookmarkMutationResponse> - Bookmark removido
 * 
 * @example
 * ```typescript
 * const result = await removeBookmark('user123', 'post', '123');
 * ```
 */
export const removeBookmark = async (
  userId: string,
  type: 'post' | 'comment',
  resourceId: string
): Promise<BookmarkMutationResponse> => {
  const endpoint = `/bookmarks/${type}/${userId}/${resourceId}`;
  const response = await privateClient.delete(endpoint);
  return response.data;
};

/**
 * Lista bookmarks com filtros e paginação
 * 
 * @param params - Parâmetros de busca e filtros
 * @returns Promise<PaginatedBookmarksResponse> - Bookmarks paginados
 * 
 * @example
 * ```typescript
 * const bookmarks = await getBookmarks({
 *   type: 'post',
 *   userId: 'user123',
 *   page: 1,
 *   limit: 20
 * });
 * ```
 */
export const getBookmarks = async (
  params?: GetBookmarksParams
): Promise<PaginatedBookmarksResponse> => {
  const response = await privateClient.get('/bookmarks', { params });
  return response.data;
};

/**
 * Busca um bookmark pelo ID
 * 
 * @param id - ID único do bookmark
 * @returns Promise<Bookmark> - Bookmark encontrado
 * 
 * @example
 * ```typescript
 * const bookmark = await getBookmarkById('456');
 * console.log(bookmark.type);
 * ```
 */
export const getBookmarkById = async (id: string): Promise<Bookmark> => {
  const response = await privateClient.get(`/bookmarks/${id}`);
  return response.data.data;
};

/**
 * Lista bookmarks de um post
 * 
 * @param postId - ID do post
 * @param params - Parâmetros de paginação
 * @returns Promise<PaginatedBookmarksResponse> - Bookmarks do post
 * 
 * @example
 * ```typescript
 * const bookmarks = await getPostBookmarks('123', { page: 1, limit: 10 });
 * ```
 */
export const getPostBookmarks = async (
  postId: string,
  params?: { page?: number; limit?: number }
): Promise<PaginatedBookmarksResponse> => {
  const response = await privateClient.get(`/bookmarks/post/${postId}`, { params });
  return response.data;
};

/**
 * Lista bookmarks de um comentário
 * 
 * @param commentId - ID do comentário
 * @param params - Parâmetros de paginação
 * @returns Promise<PaginatedBookmarksResponse> - Bookmarks do comentário
 * 
 * @example
 * ```typescript
 * const bookmarks = await getCommentBookmarks('456', { page: 1, limit: 10 });
 * ```
 */
export const getCommentBookmarks = async (
  commentId: string,
  params?: { page?: number; limit?: number }
): Promise<PaginatedBookmarksResponse> => {
  const response = await privateClient.get(`/bookmarks/comment/${commentId}`, { params });
  return response.data;
};

/**
 * Lista bookmarks de um usuário
 * 
 * @param userId - ID do usuário
 * @param params - Parâmetros de paginação
 * @returns Promise<PaginatedBookmarksResponse> - Bookmarks do usuário
 * 
 * @example
 * ```typescript
 * const bookmarks = await getUserBookmarks('user123', { page: 1, limit: 10 });
 * ```
 */
export const getUserBookmarks = async (
  userId: string,
  params?: { page?: number; limit?: number }
): Promise<PaginatedBookmarksResponse> => {
  const response = await privateClient.get(`/bookmarks/user/${userId}`, { params });
  return response.data;
};

/**
 * Verifica se usuário favoritou um post
 * 
 * @param userId - ID do usuário
 * @param postId - ID do post
 * @returns Promise<BookmarkCheckResponse> - Status do favorito
 * 
 * @example
 * ```typescript
 * const check = await checkPostBookmarked('user123', '123');
 * if (check.bookmarked) {
 *   console.log('Usuário já favoritou');
 * }
 * ```
 */
export const checkPostBookmarked = async (
  userId: string,
  postId: string
): Promise<BookmarkCheckResponse> => {
  const response = await privateClient.get(`/bookmarks/post/${userId}/${postId}/bookmarked`);
  return response.data;
};

/**
 * Verifica se usuário favoritou um comentário
 * 
 * @param userId - ID do usuário
 * @param commentId - ID do comentário
 * @returns Promise<BookmarkCheckResponse> - Status do favorito
 * 
 * @example
 * ```typescript
 * const check = await checkCommentBookmarked('user123', '456');
 * if (check.bookmarked) {
 *   console.log('Usuário já favoritou');
 * }
 * ```
 */
export const checkCommentBookmarked = async (
  userId: string,
  commentId: string
): Promise<BookmarkCheckResponse> => {
  const response = await privateClient.get(`/bookmarks/comment/${userId}/${commentId}/bookmarked`);
  return response.data;
};

/**
 * Obtém estatísticas dos bookmarks
 * 
 * @returns Promise<BookmarkStats> - Estatísticas completas
 * 
 * @example
 * ```typescript
 * const stats = await getBookmarkStats();
 * console.log(`Total: ${stats.totalBookmarks}`);
 * console.log(`Posts: ${stats.postBookmarks}`);
 * ```
 */
export const getBookmarkStats = async (): Promise<BookmarkStats> => {
  const response = await privateClient.get('/bookmarks/stats');
  return response.data.data;
};
