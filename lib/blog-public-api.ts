/**
 * Blog Public API
 *
 * API pública para páginas do blog (somente leitura).
 * Não requer autenticação.
 *
 * @fileoverview API pública do blog - Wrapper para postsService
 * @author Rainer Teixeira
 * @version 2.0.0
 */

import { postsService } from './api/services';
import type { Post } from './api/types';

/**
 * API Pública do Blog
 * Apenas operações de leitura (GET)
 */
export const blogPublicApi = {
  /**
   * Lista posts publicados
   */
  async getPublishedPosts(): Promise<Post[]> {
    const response = await postsService.listPosts({
      status: 'PUBLISHED',
      limit: 100,
    });
    return response.posts || [];
  },

  /**
   * Busca post por slug
   */
  async getPostBySlug(slug: string): Promise<Post | null> {
    try {
      const post = await postsService.getPostBySlug(slug);
      return post;
    } catch (error) {
      console.error('Erro ao buscar post por slug:', error);
      return null;
    }
  },
};
