/**
 * @fileoverview Serviços Privados de Likes
 * 
 * Contém funções para comunicação com endpoints privados de likes.
 * Requer autenticação.
 * 
 * @module lib/api/private/likes/likes
 */

import { privateClient } from '../../clients/private-client';
import {
  Like,
  CreateLikeDto,
  LikeMutationResponse,
  LikeCheckResponse,
  GetLikesParams,
  PaginatedLikesResponse,
  LikeStats,
} from '../../types/private/likes';

/**
 * Cria um novo like (curtir)
 * 
 * @param data - Dados do like a ser criado
 * @returns Promise<LikeMutationResponse> - Like criado
 * 
 * @example
 * ```typescript
 * const result = await createLike({
 *   type: 'post',
 *   resourceId: '123'
 * });
 * ```
 */
export const createLike = async (data: CreateLikeDto): Promise<LikeMutationResponse> => {
  const endpoint = data.type === 'post' ? '/likes/post' : '/likes/comment';
  const response = await privateClient.post(endpoint, { resourceId: data.resourceId });
  return response.data;
};

/**
 * Remove um like (descurtir)
 * 
 * @param userId - ID do usuário
 * @param type - Tipo do recurso
 * @param resourceId - ID do recurso
 * @returns Promise<LikeMutationResponse> - Like removido
 * 
 * @example
 * ```typescript
 * const result = await removeLike('user123', 'post', '123');
 * ```
 */
export const removeLike = async (
  userId: string,
  type: 'post' | 'comment',
  resourceId: string
): Promise<LikeMutationResponse> => {
  const endpoint = `/likes/${type}/${userId}/${resourceId}`;
  const response = await privateClient.delete(endpoint);
  return response.data;
};

/**
 * Lista likes com filtros e paginação
 * 
 * @param params - Parâmetros de busca e filtros
 * @returns Promise<PaginatedLikesResponse> - Likes paginados
 * 
 * @example
 * ```typescript
 * const likes = await getLikes({
 *   type: 'post',
 *   resourceId: '123',
 *   page: 1,
 *   limit: 20
 * });
 * ```
 */
export const getLikes = async (
  params?: GetLikesParams
): Promise<PaginatedLikesResponse> => {
  const response = await privateClient.get('/likes', { params });
  return response.data;
};

/**
 * Busca um like pelo ID
 * 
 * @param id - ID único do like
 * @returns Promise<Like> - Like encontrado
 * 
 * @example
 * ```typescript
 * const like = await getLikeById('456');
 * console.log(like.type);
 * ```
 */
export const getLikeById = async (id: string): Promise<Like> => {
  const response = await privateClient.get(`/likes/${id}`);
  return response.data.data;
};

/**
 * Lista likes de um post
 * 
 * @param postId - ID do post
 * @param params - Parâmetros de paginação
 * @returns Promise<PaginatedLikesResponse> - Likes do post
 * 
 * @example
 * ```typescript
 * const likes = await getPostLikes('123', { page: 1, limit: 10 });
 * ```
 */
export const getPostLikes = async (
  postId: string,
  params?: { page?: number; limit?: number }
): Promise<PaginatedLikesResponse> => {
  const response = await privateClient.get(`/likes/post/${postId}`, { params });
  return response.data;
};

/**
 * Lista likes de um comentário
 * 
 * @param commentId - ID do comentário
 * @param params - Parâmetros de paginação
 * @returns Promise<PaginatedLikesResponse> - Likes do comentário
 * 
 * @example
 * ```typescript
 * const likes = await getCommentLikes('456', { page: 1, limit: 10 });
 * ```
 */
export const getCommentLikes = async (
  commentId: string,
  params?: { page?: number; limit?: number }
): Promise<PaginatedLikesResponse> => {
  const response = await privateClient.get(`/likes/comment/${commentId}`, { params });
  return response.data;
};

/**
 * Lista likes de um usuário
 * 
 * @param userId - ID do usuário
 * @param params - Parâmetros de paginação
 * @returns Promise<PaginatedLikesResponse> - Likes do usuário
 * 
 * @example
 * ```typescript
 * const likes = await getUserLikes('user123', { page: 1, limit: 10 });
 * ```
 */
export const getUserLikes = async (
  userId: string,
  params?: { page?: number; limit?: number }
): Promise<PaginatedLikesResponse> => {
  const response = await privateClient.get(`/likes/user/${userId}`, { params });
  return response.data;
};

/**
 * Verifica se usuário curtiu um post
 * 
 * @param userId - ID do usuário
 * @param postId - ID do post
 * @returns Promise<LikeCheckResponse> - Status da curtida
 * 
 * @example
 * ```typescript
 * const check = await checkPostLiked('user123', '123');
 * if (check.liked) {
 *   console.log('Usuário já curtiu');
 * }
 * ```
 */
export const checkPostLiked = async (
  userId: string,
  postId: string
): Promise<LikeCheckResponse> => {
  const response = await privateClient.get(`/likes/post/${userId}/${postId}/liked`);
  return response.data;
};

/**
 * Verifica se usuário curtiu um comentário
 * 
 * @param userId - ID do usuário
 * @param commentId - ID do comentário
 * @returns Promise<LikeCheckResponse> - Status da curtida
 * 
 * @example
 * ```typescript
 * const check = await checkCommentLiked('user123', '456');
 * if (check.liked) {
 *   console.log('Usuário já curtiu');
 * }
 * ```
 */
export const checkCommentLiked = async (
  userId: string,
  commentId: string
): Promise<LikeCheckResponse> => {
  const response = await privateClient.get(`/likes/comment/${userId}/${commentId}/liked`);
  return response.data;
};

/**
 * Obtém estatísticas dos likes
 * 
 * @returns Promise<LikeStats> - Estatísticas completas
 * 
 * @example
 * ```typescript
 * const stats = await getLikeStats();
 * console.log(`Total: ${stats.totalLikes}`);
 * console.log(`Posts: ${stats.postLikes}`);
 * ```
 */
export const getLikeStats = async (): Promise<LikeStats> => {
  const response = await privateClient.get('/likes/stats');
  return response.data.data;
};
