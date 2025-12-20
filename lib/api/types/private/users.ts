/**
 * @fileoverview Tipos para APIs Privadas de Usuários
 * 
 * Define os tipos TypeScript utilizados para comunicação com os endpoints
 * privados de usuários (CRUD completo e gerenciamento).
 * 
 * @module lib/api/types/private/users
 */

/**
 * Interface para criação de usuário
 */
export interface CreateUserDto {
  /** Email do usuário */
  email: string;
  /** Nome completo */
  fullName: string;
  /** Apelido/nickname (opcional) */
  nickname?: string;
  /** Senha (se criação manual) */
  password?: string;
  /** Papel do usuário (opcional, padrão: USER) */
  role?: 'ADMIN' | 'USER';
}

/**
 * Interface para atualização de usuário
 */
export interface UpdateUserDto {
  /** Email do usuário (opcional) */
  email?: string;
  /** Nome completo (opcional) */
  fullName?: string;
  /** Apelido/nickname (opcional) */
  nickname?: string;
  /** Biografia (opcional) */
  bio?: string;
  /** URL da foto de avatar (opcional) */
  avatar?: string;
  /** Status ativo (opcional) */
  isActive?: boolean;
  /** Papel do usuário (opcional) */
  role?: 'ADMIN' | 'USER';
}

/**
 * Interface para usuário completo (privado)
 */
export interface PrivateUser {
  /** ID único do usuário */
  id: string;
  /** Cognito Sub da AWS */
  cognitoSub: string;
  /** Email do usuário */
  email: string;
  /** Nome completo */
  fullName: string;
  /** Apelido/nickname */
  nickname: string;
  /** Biografia */
  bio?: string | null;
  /** URL da foto de avatar */
  avatar?: string | null;
  /** Papel do usuário */
  role: 'ADMIN' | 'USER';
  /** Status do usuário */
  isActive: boolean;
  /** Data de criação */
  createdAt: string;
  /** Data da última atualização */
  updatedAt: string;
  /** Último login */
  lastLoginAt?: string;
  /** Email verificado */
  emailVerified: boolean;
  /** Número de posts */
  postsCount: number;
  /** Número de seguidores */
  followersCount: number;
  /** Número de usuários seguidos */
  followingCount: number;
}

/**
 * Interface para resposta de criação/atualização de usuário
 */
export interface UserMutationResponse {
  /** Mensagem de sucesso */
  message: string;
  /** Usuário criado/atualizado */
  data: PrivateUser;
}

/**
 * Interface para resposta de deleção de usuário
 */
export interface DeleteUserResponse {
  /** Mensagem de sucesso */
  message: string;
  /** ID do usuário deletado */
  deletedId: string;
  /** Status da operação */
  deleted: boolean;
}

/**
 * Interface para parâmetros de listagem de usuários (admin)
 */
export interface GetUsersAdminParams {
  /** Número da página */
  page?: number;
  /** Limite de itens por página */
  limit?: number;
  /** Buscar por termo */
  search?: string;
  /** Filtrar por papel */
  role?: 'ADMIN' | 'USER';
  /** Filtrar por status */
  isActive?: boolean;
  /** Ordenar por campo */
  sortBy?: 'createdAt' | 'updatedAt' | 'lastLoginAt' | 'postsCount';
  /** Direção da ordenação */
  sortOrder?: 'asc' | 'desc';
  /** Data inicial */
  dateFrom?: string;
  /** Data final */
  dateTo?: string;
}

/**
 * Interface para estatísticas de usuários
 */
export interface UserStats {
  /** Total de usuários */
  totalUsers: number;
  /** Usuários ativos */
  activeUsers: number;
  /** Usuários admin */
  adminUsers: number;
  /** Novos usuários este mês */
  newUsersThisMonth: number;
  /** Usuários que logaram nos últimos 7 dias */
  activeLast7Days: number;
  /** Crescimento mensal */
  monthlyGrowth: {
    month: string;
    users: number;
  }[];
}
