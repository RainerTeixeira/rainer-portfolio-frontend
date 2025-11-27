/**
 * Search Utils
 *
 * Utilitários de busca para posts, categorias e autores.
 * Integração com API real para busca de conteúdo.
 *
 * @fileoverview Utilitários de busca com integração à API
 * @author Rainer Teixeira
 * @version 2.0.0
 */

import { postsService } from '@/lib/api/services';
import type { Post } from '@/lib/api/types';
import { PostStatus } from '@/lib/api/types';

// ============================================================================
// Types
// ============================================================================

/**
 * Resultado de busca
 */
export interface SearchResult {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly type: 'post' | 'category' | 'author';
  readonly category?: string;
  readonly excerpt?: string;
}

// ============================================================================
// Search Functions
// ============================================================================

/**
 * Busca conteúdo (posts, categorias, autores) usando a API real
 *
 * @param query - Termo de busca
 * @returns Array de resultados da busca
 *
 * @example
 * ```ts
 * const results = await searchContent('Next.js')
 * ```
 */
export async function searchContent(query: string): Promise<SearchResult[]> {
  if (!query || query.length < 2) return [];

  try {
    // Buscar posts da API com filtro de busca
    const response = await postsService.listPosts({
      search: query,
      status: PostStatus.PUBLISHED,
      limit: 20,
    });

    if (!response.success || !response.posts) {
      return [];
    }

    // Converter posts da API para SearchResult
    const results: SearchResult[] = response.posts.map((post: Post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      type: 'post' as const,
      category: post.subcategory?.name,
      excerpt: post.excerpt,
    }));

    return results;
  } catch (error) {
    console.error('Erro ao buscar conteúdo:', error);
    return [];
  }
}

/**
 * Busca síncrona (compatibilidade) - retorna array vazio
 *
 * @deprecated Use searchContent() assíncrona
 * @param _query - Termo de busca (não utilizado)
 * @returns Array vazio
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function searchContentSync(_query: string): SearchResult[] {
  console.warn(
    'searchContentSync está depreciado. Use searchContent() assíncrona.'
  );
  return [];
}
