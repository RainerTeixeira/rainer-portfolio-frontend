/**
 * @fileoverview Serviços Privados de Comentários
 * 
 * Contém funções para comunicação com endpoints privados de comentários.
 * Requer autenticação.
 * 
 * @module lib/api/private/comments/comments
 */

import { privateClient } from '../../clients/private-client';
import {
  Comment,
  CreateCommentDto,
  UpdateCommentDto,
  CommentMutationResponse,
  DeleteCommentResponse,
  ModerationResponse,
  GetCommentsParams,
  PaginatedCommentsResponse,
  CommentStats,
} from '../../types/private/comments';

/**
 * Cria um novo comentário
 * 
 * @param data - Dados do comentário a ser criado
 * @returns Promise<CommentMutationResponse> - Comentário criado
 * 
 * @example
 * ```typescript
 * const newComment = await createComment({
 *   postId: '123',
 *   content: 'Ótimo post!'
 * });
 * ```
 */
export const createComment = async (data: CreateCommentDto): Promise<CommentMutationResponse> => {
  const response = await privateClient.post('/comments', data);
  return response.data;
};

/**
 * Lista comentários com filtros e paginação
 * 
 * @param params - Parâmetros de busca e filtros
 * @returns Promise<PaginatedCommentsResponse> - Comentários paginados
 * 
 * @example
 * ```typescript
 * const comments = await getComments({
 *   postId: '123',
 *   status: 'APPROVED',
 *   page: 1,
 *   limit: 20
 * });
 * ```
 */
export const getComments = async (
  params?: GetCommentsParams
): Promise<PaginatedCommentsResponse> => {
  const response = await privateClient.get('/comments', params);
  return response.data;
};

/**
 * Busca um comentário pelo ID
 * 
 * @param id - ID único do comentário
 * @returns Promise<Comment> - Comentário encontrado
 * 
 * @example
 * ```typescript
 * const comment = await getCommentById('456');
 * console.log(comment.content);
 * ```
 */
export const getCommentById = async (id: string): Promise<Comment> => {
  const response = await privateClient.get(`/comments/${id}`);
  return response.data.data;
};

/**
 * Atualiza um comentário existente
 * 
 * @param id - ID do comentário a ser atualizado
 * @param data - Novo conteúdo do comentário
 * @returns Promise<CommentMutationResponse> - Comentário atualizado
 * 
 * @example
 * ```typescript
 * const updated = await updateComment('456', {
 *   content: 'Conteúdo atualizado'
 * });
 * ```
 */
export const updateComment = async (
  id: string,
  data: UpdateCommentDto
): Promise<CommentMutationResponse> => {
  const response = await privateClient.patch(`/comments/${id}`, data);
  return response.data;
};

/**
 * Remove um comentário permanentemente
 * 
 * @param id - ID do comentário a ser removido
 * @returns Promise<DeleteCommentResponse> - Confirmação da remoção
 * 
 * @example
 * ```typescript
 * const result = await deleteComment('456');
 * if (result.deleted) {
 *   console.log('Comentário removido');
 * }
 * ```
 */
export const deleteComment = async (id: string): Promise<DeleteCommentResponse> => {
  const response = await privateClient.delete(`/comments/${id}`);
  return response.data;
};

/**
 * Aprova um comentário
 * 
 * @param id - ID do comentário a ser aprovado
 * @returns Promise<ModerationResponse> - Confirmação da aprovação
 * 
 * @example
 * ```typescript
 * const result = await approveComment('456');
 * console.log('Comentário aprovado');
 * ```
 */
export const approveComment = async (id: string): Promise<ModerationResponse> => {
  const response = await privateClient.post(`/comments/${id}/approve`);
  return response.data;
};

/**
 * Rejeita um comentário
 * 
 * @param id - ID do comentário a ser rejeitado
 * @returns Promise<ModerationResponse> - Confirmação da rejeição
 * 
 * @example
 * ```typescript
 * const result = await rejectComment('456');
 * console.log('Comentário rejeitado');
 * ```
 */
export const rejectComment = async (id: string): Promise<ModerationResponse> => {
  const response = await privateClient.post(`/comments/${id}/reject`);
  return response.data;
};

/**
 * Obtém estatísticas dos comentários
 * 
 * @returns Promise<CommentStats> - Estatísticas completas
 * 
 * @example
 * ```typescript
 * const stats = await getCommentStats();
 * console.log(`Total: ${stats.totalComments}`);
 * console.log(`Pendentes: ${stats.pendingComments}`);
 * ```
 */
export const getCommentStats = async (): Promise<CommentStats> => {
  const response = await privateClient.get('/comments/stats');
  return response.data.data;
};
