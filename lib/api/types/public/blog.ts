/**
 * @fileoverview Tipos para APIs Públicas de Blog
 * 
 * Define os tipos TypeScript utilizados para comunicação com os endpoints
 * públicos de blog (posts e categorias).
 * 
 * @module lib/api/types/public/blog
 */

import type { PaginationMeta } from '../common';

/**
 * Enum para status de posts
 */
export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
  SCHEDULED = 'SCHEDULED',
  TRASH = 'TRASH',
}

/**
 * Interface para representar um autor de post
 */
export interface PostAuthor {
  /** ID único do autor */
  id: string;
  /** Nome completo do autor */
  fullName: string;
  /** Apelido/nickname do autor */
  nickname: string;
  /** URL da foto de avatar (opcional) */
  avatar?: string | null;
  /** Email do autor (opcional) */
  email?: string;
}

/**
 * Interface para representar uma categoria de post
 */
export interface PostCategory {
  /** ID único da categoria */
  id: string;
  /** Nome da categoria */
  name: string;
  /** Slug URL-friendly da categoria */
  slug: string;
  /** Descrição da categoria (opcional) */
  description?: string;
  /** Cor hexadecimal da categoria (opcional) */
  color?: string;
  /** Ícone da categoria (opcional) */
  icon?: string;
  /** ID da categoria pai (para subcategorias) */
  parentId?: string;
  /** Número de posts na categoria */
  postsCount?: number;
}

// Alias para compatibilidade
export type Category = PostCategory;

/**
 * Interface para representar uma tag de post
 */
export interface PostTag {
  /** Nome da tag */
  name: string;
  /** Slug da tag */
  slug: string;
}

/**
 * Interface para representar um post completo
 */
export interface Post {
  /** ID único do post */
  id: string;
  /** Título do post */
  title: string;
  /** Slug URL-friendly do post */
  slug: string;
  /** Resumo/excerpt do post */
  excerpt: string;
  /** Conteúdo completo do post (HTML ou Markdown) */
  content: string;
  /** URL da imagem de capa (opcional) */
  coverImage?: string | null;
  /** Status do post */
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  /** Data de criação do post */
  createdAt: string;
  /** Data da última atualização */
  updatedAt: string;
  /** Data de publicação (se publicado) */
  publishedAt: string;
  /** Autor do post */
  author: PostAuthor;
  /** Categoria do post */
  category: PostCategory;
  /** Tags do post */
  tags: PostTag[];
  /** Número de visualizações */
  views: number;
  /** Número de likes */
  likesCount: number;
  /** Número de comentários */
  commentsCount: number;
  /** Tempo estimado de leitura (minutos) */
  readTime?: number;
}

/**
 * Interface para representar um post simplificado (para listagens)
 */
export interface PostListItem {
  /** ID único do post */
  id: string;
  /** Título do post */
  title: string;
  /** Slug do post */
  slug: string;
  /** Resumo do post */
  excerpt: string;
  /** URL da imagem de capa */
  coverImage?: string | null;
  /** Data de publicação */
  publishedAt: string;
  /** Data de criação */
  createdAt?: string;
  /** Data da última atualização */
  updatedAt?: string;
  /** Conteúdo completo do post (para compatibilidade com dashboard) */
  content?: string;
  /** Status do post (para compatibilidade com dashboard) */
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  /** Se o post é em destaque */
  featured?: boolean;
  /** Autor simplificado */
  author: {
    id: string;
    fullName: string;
    nickname: string;
    avatar?: string | null;
  };
  /** Categoria simplificada */
  category: {
    id: string;
    name: string;
    slug: string;
    color?: string;
  };
  /** Tags */
  tags: PostTag[];
  /** Número de visualizações */
  views?: number;
  /** Número de likes */
  likesCount?: number;
  /** Número de comentários */
  commentsCount?: number;
  /** Tempo estimado de leitura */
  readTime?: number;
}

/**
 * Interface para resposta paginada de posts
 */
export interface PaginatedPostsResponse {
  /** Lista de posts */
  data: PostListItem[];
  /** Metadados de paginação */
  meta: PaginationMeta;
}

/**
 * Interface para resposta de post único
 */
export interface SinglePostResponse {
  /** Post completo */
  data: Post;
}

/**
 * Interface para parâmetros de consulta de posts
 */
export interface GetPostsParams {
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
  /** Filtrar por slug da categoria */
  categorySlug?: string;
  /** Buscar por termo */
  search?: string;
  /** Ordenar por campo */
  sortBy?: 'createdAt' | 'updatedAt' | 'publishedAt' | 'views' | 'likesCount';
  /** Direção da ordenação */
  sortOrder?: 'asc' | 'desc';
}

/**
 * Interface para resposta de visualização de post
 */
export interface PostViewResponse {
  /** Mensagem de sucesso */
  message: string;
  /** Novo número de visualizações */
  views: number;
}
