// ============================================================================
// Serviço de Likes - Integração com API do Backend
// ============================================================================

/**
 * Serviço para gerenciar curtidas em posts
 *
 * @fileoverview Serviço de likes com métodos para curtir/descurtir e consultas
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import { api } from '../client';
import type { ApiResponse, CreateLikeData, Like } from '../types';

// ============================================================================
// Classe do Serviço
// ============================================================================

/**
 * Serviço responsável por operações de likes em posts.
 */
export class LikesService {
  private readonly basePath = '/likes';

  /**
   * Curtir um post
   */
  /**
   * Cria like para um post.
   */
  async likePost(data: CreateLikeData): Promise<Like> {
    const response = await api.post<ApiResponse<Like>>(this.basePath, data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(
      response.message ||
        `Erro ao curtir post${
          data.postId ? ` com ID: ${data.postId}` : ''
        }`
    );
  }

  /**
   * Descurtir um post
   */
  /**
   * Remove like (unlike) de um post.
   */
  async unlikePost(userId: string, postId: string): Promise<ApiResponse<void>> {
    const response = await api.delete<ApiResponse<void>>(
      `${this.basePath}/${userId}/${postId}`
    );

    if (!response.success) {
      throw new Error(
        response.message ||
          `Erro ao remover like do usuário ${userId} no post ${postId}`
      );
    }

    return response;
  }

  /**
   * Lista likes de um post específico
   */
  /**
   * Lista likes de um post.
   */
  async getLikesByPost(postId: string): Promise<ApiResponse<Like[]>> {
    const response = await api.get<ApiResponse<Like[]>>(
      `${this.basePath}/post/${postId}`
    );
    if (!response.success) {
      throw new Error(
        response.message || `Erro ao listar likes do post com ID: ${postId}`
      );
    }

    return response;
  }

  /**
   * Lista likes de um usuário específico
   */
  /**
   * Lista likes de um usuário.
   */
  async getLikesByUser(userId: string): Promise<ApiResponse<Like[]>> {
    const response = await api.get<ApiResponse<Like[]>>(
      `${this.basePath}/user/${userId}`
    );
    if (!response.success) {
      throw new Error(
        response.message ||
          `Erro ao listar likes do usuário com ID: ${userId}`
      );
    }

    return response;
  }

  /**
   * Conta o número de likes de um post
   */
  /**
   * Conta likes de um post.
   */
  async getLikeCount(postId: string): Promise<ApiResponse<number>> {
    const response = await api.get<ApiResponse<number>>(
      `${this.basePath}/post/${postId}/count`
    );
    if (!response.success) {
      throw new Error(
        response.message ||
          `Erro ao obter contagem de likes para o post com ID: ${postId}`
      );
    }

    return response;
  }

  /**
   * Verifica se um usuário curtiu um post específico
   */
  /**
   * Verifica se o usuário curtiu o post.
   */
  async hasUserLikedPost(
    userId: string,
    postId: string
  ): Promise<ApiResponse<boolean>> {
    const response = await api.get<ApiResponse<boolean>>(
      `${this.basePath}/${userId}/${postId}/check`
    );
    if (!response.success) {
      throw new Error(
        response.message ||
          `Erro ao verificar like do usuário ${userId} no post ${postId}`
      );
    }

    return response;
  }

  /**
   * Alias para getLikeCount (compatibilidade)
   */
  async getLikesCount(postId: string): Promise<number> {
    const response = await this.getLikeCount(postId);
    if (response.success && response.data !== undefined) {
      return response.data;
    }
    throw new Error(
      response.message ||
        `Erro ao obter contagem de likes para o post com ID: ${postId}`
    );
  }

  /**
   * Alias para hasUserLikedPost (compatibilidade)
   */
  async hasUserLiked(userId: string, postId: string): Promise<boolean> {
    const response = await this.hasUserLikedPost(userId, postId);
    if (response.success && response.data !== undefined) {
      return response.data;
    }
    throw new Error(
      response.message ||
        `Erro ao verificar like do usuário ${userId} no post ${postId}`
    );
  }

  /**
   * Toggle like/unlike de um post
   */
  /**
   * Alterna like/unlike para um par usuário/post.
   * @returns `{ liked: boolean, like?: Like }`
   */
  async toggleLike(
    userId: string,
    postId: string
  ): Promise<{ liked: boolean; like?: Like }> {
    const hasLikedResponse = await this.hasUserLikedPost(userId, postId);
    if (hasLikedResponse.success && hasLikedResponse.data === true) {
      await this.unlikePost(userId, postId);
      return { liked: false };
    }

    const like = await this.likePost({ userId, postId });
    return { liked: true, like };
  }
}

// ============================================================================
// Instância Singleton
// ============================================================================

export const likesService = new LikesService();
