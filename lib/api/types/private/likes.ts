/**
 * @fileoverview Tipos para APIs Privadas de Likes
 * 
 * Define os tipos TypeScript utilizados para comunicação com os endpoints
 * privados de likes (curtidas em posts e comentários).
 * 
 * @module lib/api/types/private/likes
 */

/**
 * Interface para criação de like
 */
export interface CreateLikeDto {
  /** Tipo do recurso */
  type: 'post' | 'comment';
  /** ID do recurso */
  resourceId: string;
}

/**
 * Interface para representar um like
 */
export interface Like {
  /** ID único do like */
  id: string;
  /** ID do usuário que curtiu */
  userId: string;
  /** Tipo do recurso */
  type: 'post' | 'comment';
  /** ID do recurso */
  resourceId: string;
  /** Data de criação */
  createdAt: string;
}

/**
 * Interface para resposta de criação/remoção de like
 */
export interface LikeMutationResponse {
  /** Mensagem de sucesso */
  message: string;
  /** Like criado/deletado */
  data: Like;
  /** Status da operação */
  liked: boolean;
}

/**
 * Interface para resposta de verificação de like
 */
export interface LikeCheckResponse {
  /** Usuário curtiu o recurso */
  liked: boolean;
  /** ID do like se existir */
  likeId?: string;
}

/**
 * Interface para parâmetros de listagem de likes
 */
export interface GetLikesParams {
  /** Número da página */
  page?: number;
  /** Limite de itens por página */
  limit?: number;
  /** Filtrar por tipo */
  type?: 'post' | 'comment';
  /** Filtrar por recurso */
  resourceId?: string;
  /** Filtrar por usuário */
  userId?: string;
  /** Ordenar por campo */
  sortBy?: 'createdAt';
  /** Direção da ordenação */
  sortOrder?: 'asc' | 'desc';
}

/**
 * Interface para resposta paginada de likes
 */
export interface PaginatedLikesResponse {
  /** Lista de likes */
  data: Like[];
  /** Metadados de paginação */
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Interface para estatísticas de likes
 */
export interface LikeStats {
  /** Total de likes */
  totalLikes: number;
  /** Likes em posts */
  postLikes: number;
  /** Likes em comentários */
  commentLikes: number;
  /** Likes hoje */
  likesToday: number;
  /** Top posts mais curtidos */
  topPosts: {
    id: string;
    title: string;
    likesCount: number;
  }[];
}
