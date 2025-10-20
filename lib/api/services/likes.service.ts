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

export class LikesService {
  private readonly basePath = '/likes';

  /**
   * Curtir um post
   */
  async likePost(data: CreateLikeData): Promise<ApiResponse<Like>> {
    const response = await api.post<ApiResponse<Like>>(this.basePath, data);
    return response;
  }

  /**
   * Descurtir um post
   */
  async unlikePost(userId: string, postId: string): Promise<ApiResponse<void>> {
    return api.delete<ApiResponse<void>>(`${this.basePath}/${userId}/${postId}`);
  }

  /**
   * Lista likes de um post específico
   */
  async getLikesByPost(postId: string): Promise<ApiResponse<Like[]>> {
    const response = await api.get<ApiResponse<Like[]>>(`${this.basePath}/post/${postId}`);
    return response;
  }

  /**
   * Lista likes de um usuário específico
   */
  async getLikesByUser(userId: string): Promise<ApiResponse<Like[]>> {
    const response = await api.get<ApiResponse<Like[]>>(`${this.basePath}/user/${userId}`);
    return response;
  }

  /**
   * Conta o número de likes de um post
   */
  async getLikeCount(postId: string): Promise<ApiResponse<number>> {
    const response = await api.get<ApiResponse<number>>(`${this.basePath}/post/${postId}/count`);
    return response;
  }

  /**
   * Verifica se um usuário curtiu um post específico
   */
  async hasUserLikedPost(userId: string, postId: string): Promise<ApiResponse<boolean>> {
    const response = await api.get<ApiResponse<boolean>>(`${this.basePath}/${userId}/${postId}/check`);
    return response;
  }

  /**
   * Toggle like/unlike de um post
   */
  async toggleLike(userId: string, postId: string): Promise<{ liked: boolean; like?: Like }> {
    const hasLikedResponse = await this.hasUserLikedPost(userId, postId);
    if (hasLikedResponse.success && hasLikedResponse.data === true) {
      await this.unlikePost(userId, postId);
      return { liked: false };
    }
    const likeResponse = await this.likePost({ userId, postId });
    if (likeResponse.success) {
      return { liked: true, like: likeResponse.data };
    }
    throw new Error(likeResponse.message);
  }
}

// ============================================================================
// Instância Singleton
// ============================================================================

export const likesService = new LikesService();