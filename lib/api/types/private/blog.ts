/**
 * @fileoverview Tipos para APIs Privadas de Blog
 * 
 * Define os tipos TypeScript utilizados para comunicação com os endpoints
 * privados de blog (CRUD de posts e categorias).
 * 
 * @module lib/api/types/private/blog
 */

import { Post, PostCategory } from '../public/blog';

/**
 * Interface para criação de post
 */
export interface CreatePostDto {
  /** Título do post */
  title: string;
  /** Resumo/excerpt do post */
  excerpt: string;
  /** Conteúdo completo do post */
  content: string;
  /** URL da imagem de capa (opcional) */
  coverImage?: string;
  /** ID da categoria */
  categoryId: string;
  /** Array de tags */
  tags: string[];
  /** Status inicial (padrão: DRAFT) */
  status?: 'DRAFT' | 'PUBLISHED';
  /** Data de publicação agendada (opcional) */
  publishedAt?: string;
}

/**
 * Interface para atualização de post
 */
export interface UpdatePostDto {
  /** Título do post (opcional) */
  title?: string;
  /** Resumo/excerpt do post (opcional) */
  excerpt?: string;
  /** Conteúdo completo do post (opcional) */
  content?: string;
  /** URL da imagem de capa (opcional) */
  coverImage?: string;
  /** ID da categoria (opcional) */
  categoryId?: string;
  /** Array de tags (opcional) */
  tags?: string[];
  /** Status do post (opcional) */
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  /** Data de publicação agendada (opcional) */
  publishedAt?: string;
}

/**
 * Interface para criação de categoria
 */
export interface CreateCategoryDto {
  /** Nome da categoria */
  name: string;
  /** Descrição da categoria (opcional) */
  description?: string;
  /** Cor hexadecimal (opcional) */
  color?: string;
  /** Ícone (opcional) */
  icon?: string;
  /** ID da categoria pai (opcional) */
  parentId?: string;
}

/**
 * Interface para atualização de categoria
 */
export interface UpdateCategoryDto {
  /** Nome da categoria (opcional) */
  name?: string;
  /** Descrição da categoria (opcional) */
  description?: string;
  /** Cor hexadecimal (opcional) */
  color?: string;
  /** Ícone (opcional) */
  icon?: string;
  /** ID da categoria pai (opcional) */
  parentId?: string;
}

/**
 * Interface para resposta de criação/atualização de post
 */
export interface PostMutationResponse {
  /** Mensagem de sucesso */
  message: string;
  /** Post criado/atualizado */
  data: Post;
}

/**
 * Interface para resposta de deleção de post
 */
export interface DeletePostResponse {
  /** Mensagem de sucesso */
  message: string;
  /** ID do post deletado */
  deletedId: string;
  /** Status da operação */
  deleted: boolean;
}

/**
 * Interface para resposta de publicação/arquivamento de post
 */
export interface PostStatusResponse {
  /** Mensagem de sucesso */
  message: string;
  /** Novo status do post */
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  /** Data da operação */
  timestamp: string;
}

/**
 * Interface para resposta de criação/atualização de categoria
 */
export interface CategoryMutationResponse {
  /** Mensagem de sucesso */
  message: string;
  /** Categoria criada/atualizada */
  data: PostCategory;
}

/**
 * Interface para resposta de deleção de categoria
 */
export interface DeleteCategoryResponse {
  /** Mensagem de sucesso */
  message: string;
  /** ID da categoria deletada */
  deletedId: string;
  /** Status da operação */
  deleted: boolean;
}

/**
 * Interface para estatísticas do blog
 */
export interface BlogStats {
  /** Total de posts */
  totalPosts: number;
  /** Posts publicados */
  publishedPosts: number;
  /** Posts em rascunho */
  draftPosts: number;
  /** Posts arquivados */
  archivedPosts: number;
  /** Total de categorias */
  totalCategories: number;
  /** Total de visualizações */
  totalViews: number;
  /** Total de likes */
  totalLikes: number;
  /** Total de comentários */
  totalComments: number;
  /** Posts mais visualizados */
  topPosts: {
    id: string;
    title: string;
    views: number;
  }[];
  /** Crescimento mensal */
  monthlyGrowth: {
    month: string;
    posts: number;
    views: number;
  }[];
}

/**
 * Interface para opções de listagem de posts (admin)
 */
export interface GetPostsAdminParams {
  /** Número da página */
  page?: number;
  /** Limite de itens por página */
  limit?: number;
  /** Filtrar por status */
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  /** Filtrar por ID do autor */
  authorId?: string;
  /** Filtrar por ID da categoria */
  categoryId?: string;
  /** Buscar por termo */
  search?: string;
  /** Ordenar por campo */
  sortBy?: 'createdAt' | 'updatedAt' | 'publishedAt' | 'views' | 'likesCount';
  /** Direção da ordenação */
  sortOrder?: 'asc' | 'desc';
  /** Data inicial */
  dateFrom?: string;
  /** Data final */
  dateTo?: string;
}

/**
 * Interface para validação de slug
 */
export interface SlugValidationResponse {
  /** Slug disponível */
  available: boolean;
  /** Slug sugerido se não disponível */
  suggestedSlug?: string;
  /** Mensagem de erro */
  error?: string;
}
