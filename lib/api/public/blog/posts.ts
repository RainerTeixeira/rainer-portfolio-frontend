/**
 * @fileoverview Serviços Públicos de Posts
 * 
 * Contém funções para comunicação com endpoints públicos de posts.
 * Não requer autenticação.
 * 
 * @module lib/api/public/blog/posts
 */

import { publicClient } from '../../clients/public-client';
import {
  Post,
  PostListItem,
  PaginatedPostsResponse,
  SinglePostResponse,
  GetPostsParams,
  PostViewResponse,
} from '../../types/public/blog';

/**
 * Busca lista de posts com suporte a filtros e paginação
 * 
 * @param params - Parâmetros de consulta opcionais
 * @returns Promise<PaginatedPostsResponse> - Posts paginados
 * 
 * @example
 * ```typescript
 * // Buscar posts publicados na página 1
 * const posts = await getPublicPosts({
 *   page: 1,
 *   limit: 10,
 *   status: 'PUBLISHED'
 * });
 * ```
 */
export const getPublicPosts = async (
  params?: GetPostsParams
): Promise<PaginatedPostsResponse> => {
  const response = await publicClient.get('/posts', { params });
  return response.data;
};

/**
 * Busca um post específico pelo seu ID
 * 
 * @param id - ID único do post
 * @returns Promise<Post> - Post encontrado
 * 
 * @example
 * ```typescript
 * const post = await getPublicPostById('123');
 * console.log(post.title);
 * ```
 */
export const getPublicPostById = async (id: string): Promise<Post> => {
  const response = await publicClient.get(`/posts/${id}`);
  return response.data.data;
};

/**
 * Busca um post específico pelo seu slug (URL-friendly)
 * 
 * @param slug - Slug do post
 * @returns Promise<Post> - Post encontrado
 * 
 * @example
 * ```typescript
 * const post = await getPublicPostBySlug('meu-artigo-interessante');
 * console.log(post.title);
 * ```
 */
export const getPublicPostBySlug = async (slug: string): Promise<Post> => {
  const response = await publicClient.get(`/posts/slug/${slug}`);
  const data = (response as any)?.data ?? response;
  return (data as any)?.data ?? data;
};

/**
 * Incrementa o contador de visualizações de um post
 * 
 * @param id - ID do post a ser visualizado
 * @returns Promise<PostViewResponse> - Confirmação com novo número de views
 * 
 * @example
 * ```typescript
 * await incrementPostViews('123');
 * console.log('Visualização registrada');
 * ```
 */
export const incrementPostViews = async (
  id: string
): Promise<PostViewResponse> => {
  const response = await publicClient.post(`/posts/${id}/view`);
  return response.data;
};

/**
 * Busca posts relacionados a um post específico
 * 
 * @param postId - ID do post de referência
 * @param limit - Número máximo de posts relacionados (padrão: 3)
 * @returns Promise<PostListItem[]> - Lista de posts relacionados
 * 
 * @example
 * ```typescript
 * const relacionados = await getRelatedPosts('123', 3);
 * relacionados.forEach(post => console.log(post.title));
 * ```
 */
export const getRelatedPosts = async (
  postId: string,
  limit: number = 3
): Promise<PostListItem[]> => {
  const response = await publicClient.get(`/posts/${postId}/related`, {
    params: { limit }
  });
  return response.data.data;
};

/**
 * Busca posts populares (mais visualizados)
 * 
 * @param limit - Número máximo de posts (padrão: 5)
 * @param days - Período em dias (padrão: 30)
 * @returns Promise<PostListItem[]> - Lista de posts populares
 * 
 * @example
 * ```typescript
 * const populares = await getPopularPosts(5, 30);
 * populares.forEach(post => console.log(`${post.title} - ${post.views} views`));
 * ```
 */
export const getPopularPosts = async (
  limit: number = 5,
  days: number = 30
): Promise<PostListItem[]> => {
  const response = await publicClient.get('/posts/popular', {
    params: { limit, days }
  });
  return response.data.data;
};

/**
 * Busca posts por termo de busca
 * 
 * @param query - Termo a ser buscado
 * @param params - Parâmetros adicionais de paginação
 * @returns Promise<PaginatedPostsResponse> - Posts encontrados
 * 
 * @example
 * ```typescript
 * const resultados = await searchPosts('react hooks', {
 *   page: 1,
 *   limit: 10
 * });
 * console.log(`Encontrados ${resultados.meta.total} posts`);
 * ```
 */
export const searchPosts = async (
  query: string,
  params?: Omit<GetPostsParams, 'search'>
): Promise<PaginatedPostsResponse> => {
  const response = await publicClient.get('/posts/search', {
    params: { ...params, q: query }
  });
  return response.data;
};
