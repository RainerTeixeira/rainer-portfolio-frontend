/**
 * @fileoverview Tipos para APIs Públicas de Usuários
 * 
 * Define os tipos TypeScript utilizados para comunicação com os endpoints
 * públicos de usuários (dados públicos de perfil).
 * 
 * @module lib/api/types/public/users
 */

/**
 * Enum para papéis de usuários
 */
export enum UserRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  AUTHOR = 'AUTHOR',
  USER = 'USER',
}

/**
 * Interface para representar um usuário do Cognito
 */
export interface CognitoUser {
  /** Sub do Cognito (identificador único) */
  sub: string;
  /** Email do usuário */
  email: string;
  /** Email verificado */
  email_verified: boolean;
  /** Nome completo (opcional) */
  name?: string;
  /** Apelido/nickname (opcional) */
  nickname?: string;
  /** Foto do perfil (opcional) */
  picture?: string;
}

/**
 * Interface para representar um usuário (MongoDB)
 */
export interface User {
  /** ID único do MongoDB */
  id?: string;
  /** Sub do Cognito */
  cognitoSub: string;
  /** Email (compatibilidade) */
  email?: string;
  /** Email verificado (compatibilidade) */
  emailVerified?: boolean;
  /** Nome completo */
  fullName: string;
  /** Apelido/nickname */
  nickname: string;
  /** URL da foto de avatar */
  avatar?: string;
  /** Biografia do usuário */
  bio?: string;
  /** Website pessoal */
  website?: string;
  /** Links para redes sociais */
  socialLinks?: Record<string, string>;
  /** Papel do usuário */
  role: UserRole;
  /** Status ativo */
  isActive: boolean;
  /** Status banido */
  isBanned: boolean;
  /** Número de posts */
  postsCount: number;
  /** Número de comentários */
  commentsCount: number;
  /** Data de criação */
  createdAt: string;
  /** Data de atualização */
  updatedAt: string;
}

/**
 * Interface para representar o perfil do usuário (merge Cognito + MongoDB)
 */
export interface UserProfile extends User {
  /** Email do Cognito */
  email: string;
  /** Email verificado do Cognito */
  emailVerified: boolean;
}

/**
 * Interface para dados de criação de usuário
 */
export interface CreateUserData {
  /** Email do usuário */
  email: string;
  /** Senha do usuário */
  password: string;
  /** Apelido/nickname */
  nickname: string;
  /** Nome completo */
  fullName: string;
  /** Aceita termos de uso */
  acceptTerms: boolean;
  /** Biografia (opcional) */
  bio?: string;
  /** Website (opcional) */
  website?: string;
}

/**
 * Interface para dados de atualização de perfil
 */
export interface UpdateProfileData {
  /** Novo nome completo */
  fullName?: string;
  /** Novo nickname */
  nickname?: string;
  /** Nova biografia */
  bio?: string;
  /** Novo avatar */
  avatar?: string;
  /** Novo website */
  website?: string;
  /** Novos links sociais */
  socialLinks?: Record<string, string>;
}

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
