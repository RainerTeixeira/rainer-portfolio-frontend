/**
 * @fileoverview Tipos para APIs Públicas de Usuários
 * 
 * Define os tipos TypeScript utilizados para comunicação com os endpoints
 * públicos de usuários (dados públicos de perfil).
 * 
 * @module lib/api/types/public/users
 */

/**
 * Interface para representar um usuário público
 */
export interface PublicUser {
  /** ID único do usuário */
  id: string;
  /** Email do usuário */
  email: string;
  /** Nome completo */
  fullName: string;
  /** Apelido/nickname */
  nickname: string;
  /** URL da foto de avatar (opcional) */
  avatar?: string | null;
  /** Biografia do usuário (opcional) */
  bio?: string | null;
  /** Data de criação */
  createdAt: string;
  /** Número de posts publicados */
  postsCount?: number;
  /** Número de seguidores */
  followersCount?: number;
  /** Número de usuários seguidos */
  followingCount?: number;
}

/**
 * Interface para resposta de lista de usuários
 */
export interface PublicUsersResponse {
  /** Lista de usuários */
  data: PublicUser[];
  /** Metadados de paginação */
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Interface para parâmetros de busca de usuários
 */
export interface GetUsersParams {
  /** Número da página */
  page?: number;
  /** Limite de itens por página */
  limit?: number;
  /** Buscar por termo */
  search?: string;
  /** Ordenar por campo */
  sortBy?: 'createdAt' | 'postsCount' | 'followersCount';
  /** Direção da ordenação */
  sortOrder?: 'asc' | 'desc';
}
