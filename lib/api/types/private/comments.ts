/**
 * @fileoverview Tipos para APIs Privadas de Comentários
 * 
 * Define os tipos TypeScript utilizados para comunicação com os endpoints
 * privados de comentários (CRUD completo e moderação).
 * 
 * @module lib/api/types/private/comments
 */

/**
 * Interface para criação de comentário
 */
export interface CreateCommentDto {
  /** ID do post onde o comentário será criado */
  postId: string;
  /** ID do comentário pai (se for resposta) */
  parentId?: string;
  /** Conteúdo do comentário */
  content: string;
}

/**
 * Interface para atualização de comentário
 */
export interface UpdateCommentDto {
  /** Conteúdo do comentário */
  content: string;
}

/**
 * Interface para representar um comentário
 */
export interface Comment {
  /** ID único do comentário */
  id: string;
  /** ID do post */
  postId: string;
  /** ID do comentário pai (se for resposta) */
  parentId?: string;
  /** ID do autor */
  authorId: string;
  /** Nome do autor */
  authorName: string;
  /** Apelido do autor */
  authorNickname: string;
  /** Avatar do autor */
  authorAvatar?: string | null;
  /** Conteúdo do comentário */
  content: string;
  /** Status do comentário */
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  /** Data de criação */
  createdAt: string;
  /** Data da última atualização */
  updatedAt: string;
  /** Número de respostas */
  repliesCount: number;
  /** Respostas do comentário */
  replies?: Comment[];
}

/**
 * Interface para resposta de criação/atualização de comentário
 */
export interface CommentMutationResponse {
  /** Mensagem de sucesso */
  message: string;
  /** Comentário criado/atualizado */
  data: Comment;
}

/**
 * Interface para resposta de deleção de comentário
 */
export interface DeleteCommentResponse {
  /** Mensagem de sucesso */
  message: string;
  /** ID do comentário deletado */
  deletedId: string;
  /** Status da operação */
  deleted: boolean;
}

/**
 * Interface para resposta de moderação
 */
export interface ModerationResponse {
  /** Mensagem de sucesso */
  message: string;
  /** Novo status do comentário */
  status: 'APPROVED' | 'REJECTED';
  /** Data da moderação */
  moderatedAt: string;
}

/**
 * Interface para parâmetros de listagem de comentários
 */
export interface GetCommentsParams {
  /** Número da página */
  page?: number;
  /** Limite de itens por página */
  limit?: number;
  /** Filtrar por post */
  postId?: string;
  /** Filtrar por autor */
  authorId?: string;
  /** Filtrar por status */
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  /** Incluir respostas */
  includeReplies?: boolean;
  /** Ordenar por campo */
  sortBy?: 'createdAt' | 'updatedAt';
  /** Direção da ordenação */
  sortOrder?: 'asc' | 'desc';
}

/**
 * Interface para resposta paginada de comentários
 */
export interface PaginatedCommentsResponse {
  /** Lista de comentários */
  data: Comment[];
  /** Metadados de paginação */
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Interface para estatísticas de comentários
 */
export interface CommentStats {
  /** Total de comentários */
  totalComments: number;
  /** Comentários pendentes */
  pendingComments: number;
  /** Comentários aprovados */
  approvedComments: number;
  /** Comentários rejeitados */
  rejectedComments: number;
  /** Comentários hoje */
  commentsToday: number;
}
