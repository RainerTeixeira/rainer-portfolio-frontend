/**
 * @fileoverview Serviços Privados de Posts
 * 
 * Contém funções para comunicação com endpoints privados de posts.
 * Requer autenticação.
 * 
 * @module lib/api/private/blog/posts
 */

import { privateClient } from '../../clients/private-client';
import {
  CreatePostDto,
  UpdatePostDto,
  PostMutationResponse,
  DeletePostResponse,
  PostStatusResponse,
  GetPostsAdminParams,
  SlugValidationResponse,
  BlogStats,
} from '../../types/private/blog';
import { PaginatedPostsResponse, Post } from '../../types/public/blog';

/**
 * Cria um novo post
 * 
 * @param data - Dados do post a ser criado
 * @returns Promise<PostMutationResponse> - Post criado
 * 
 * @example
 * ```typescript
 * const novoPost = await createPost({
 *   title: 'Meu Novo Artigo',
 *   excerpt: 'Resumo do artigo',
 *   content: 'Conteúdo completo...',
 *   categoryId: '123',
 *   tags: ['tecnologia', 'javascript'],
 *   status: 'DRAFT'
 * });
 * 
 * console.log('Post criado:', novoPost.data.title);
 * ```
 */
export const createPost = async (data: CreatePostDto): Promise<PostMutationResponse> => {
  const response = await privateClient.post('/posts', data);
  return response.data;
};

/**
 * Atualiza um post existente
 * 
 * @param id - ID do post a ser atualizado
 * @param data - Dados a serem atualizados
 * @returns Promise<PostMutationResponse> - Post atualizado
 * 
 * @example
 * ```typescript
 * const postAtualizado = await updatePost('123', {
 *   title: 'Título Atualizado',
 *   content: 'Novo conteúdo...'
 * });
 * 
 * console.log('Post atualizado:', postAtualizado.data.title);
 * ```
 */
export const updatePost = async (
  id: string,
  data: UpdatePostDto
): Promise<PostMutationResponse> => {
  const response = await privateClient.patch(`/posts/${id}`, data);
  return response.data;
};

/**
 * Remove um post permanentemente
 * 
 * @param id - ID do post a ser removido
 * @returns Promise<DeletePostResponse> - Confirmação da remoção
 * 
 * @example
 * ```typescript
 * const resultado = await deletePost('123');
 * 
 * if (resultado.deleted) {
 *   console.log('Post removido com sucesso');
 * }
 * ```
 */
export const deletePost = async (id: string): Promise<DeletePostResponse> => {
  const response = await privateClient.delete(`/posts/${id}`);
  return response.data;
};

/**
 * Publica um post (altera status para PUBLISHED)
 * 
 * @param id - ID do post a ser publicado
 * @returns Promise<PostStatusResponse> - Novo status do post
 * 
 * @example
 * ```typescript
 * const resultado = await publishPost('123');
 * 
 * if (resultado.status === 'PUBLISHED') {
 *   console.log('Post publicado com sucesso!');
 * }
 * ```
 */
export const publishPost = async (id: string): Promise<PostStatusResponse> => {
  const response = await privateClient.post(`/posts/${id}/publish`);
  return response.data;
};

/**
 * Arquiva um post (altera status para ARCHIVED)
 * 
 * @param id - ID do post a ser arquivado
 * @returns Promise<PostStatusResponse> - Novo status do post
 * 
 * @example
 * ```typescript
 * const resultado = await archivePost('123');
 * 
 * if (resultado.status === 'ARCHIVED') {
 *   console.log('Post arquivado com sucesso!');
 * }
 * ```
 */
export const archivePost = async (id: string): Promise<PostStatusResponse> => {
  const response = await privateClient.post(`/posts/${id}/archive`);
  return response.data;
};

/**
 * Busca posts com filtros administrativos
 * 
 * @param params - Parâmetros de busca e filtros
 * @returns Promise<PaginatedPostsResponse> - Posts paginados
 * 
 * @example
 * ```typescript
 * const posts = await getPostsAdmin({
 *   page: 1,
 *   limit: 20,
 *   status: 'DRAFT',
 *   sortBy: 'createdAt',
 *   sortOrder: 'desc'
 * });
 * 
 * console.log(`Encontrados ${posts.meta.total} posts`);
 * ```
 */
export const getPostsAdmin = async (
  params?: GetPostsAdminParams
): Promise<PaginatedPostsResponse> => {
  const response = await privateClient.get('/posts/admin', { params });
  return response.data;
};

/**
 * Valida se um slug está disponível para uso
 * 
 * @param slug - Slug a ser validado
 * @param postId - ID do post (para edição, opcional)
 * @returns Promise<SlugValidationResponse> - Resultado da validação
 * 
 * @example
 * ```typescript
 * const validacao = await validatePostSlug('meu-artigo');
 * 
 * if (validacao.available) {
 *   console.log('Slug disponível!');
 * } else {
 *   console.log('Slug em uso, sugerido:', validacao.suggestedSlug);
 * }
 * ```
 */
export const validatePostSlug = async (
  slug: string,
  postId?: string
): Promise<SlugValidationResponse> => {
  const response = await privateClient.post('/posts/validate-slug', {
    slug,
    postId
  });
  return response.data;
};

/**
 * Duplica um post existente
 * 
 * @param id - ID do post a ser duplicado
 * @param newTitle - Novo título para o post duplicado (opcional)
 * @returns Promise<PostMutationResponse> - Post duplicado
 * 
 * @example
 * ```typescript
 * const duplicado = await duplicatePost('123', 'Cópia do Artigo');
 * 
 * console.log('Post duplicado:', duplicado.data.title);
 * ```
 */
export const duplicatePost = async (
  id: string,
  newTitle?: string
): Promise<PostMutationResponse> => {
  const response = await privateClient.post(`/posts/${id}/duplicate`, {
    newTitle
  });
  return response.data;
};

/**
 * Obtém estatísticas do blog
 * 
 * @returns Promise<BlogStats> - Estatísticas completas do blog
 * 
 * @example
 * ```typescript
 * const stats = await getBlogStats();
 * 
 * console.log(`Total de posts: ${stats.totalPosts}`);
 * console.log(`Posts publicados: ${stats.publishedPosts}`);
 * console.log(`Total de views: ${stats.totalViews}`);
 * ```
 */
export const getBlogStats = async (): Promise<BlogStats> => {
  const response = await privateClient.get('/posts/stats');
  return response.data.data;
};
