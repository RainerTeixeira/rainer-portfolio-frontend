/**
 * Search Utilities
 *
 * Utilitários de busca para posts, categorias e autores.
 * Integração com API real para busca de conteúdo.
 *
 * @fileoverview Utilitários de busca com integração à API
 * @author Rainer Teixeira
 * @version 2.0.0
 */

import { postsService } from './api/services';
import type { Post } from './api/types';
import { PostStatus } from './api/types';

export interface SearchResult {
  id: string;
  title: string;
  slug: string;
  type: 'post' | 'category' | 'author';
  category?: string;
  excerpt?: string;
}

/**
 * Busca conteúdo (posts, categorias, autores) usando a API real
 *
 * @param query - Termo de busca
 * @returns Array de resultados da busca
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
 * Use searchContent() assíncrona para buscar dados reais
 *
 * @deprecated Use searchContent() assíncrona
 */
export function searchContentSync(query: string): SearchResult[] {
  console.warn(
    'searchContentSync está depreciado. Use searchContent() assíncrona.'
  );
  return [];
}
