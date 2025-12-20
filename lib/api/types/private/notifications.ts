/**
 * @fileoverview Tipos para APIs Privadas de Notificações
 * 
 * Define os tipos TypeScript utilizados para comunicação com os endpoints
 * privados de notificações (sistema de notificações em tempo real).
 * 
 * @module lib/api/types/private/notifications
 */

/**
 * Interface para criação de notificação
 */
export interface CreateNotificationDto {
  /** ID do usuário destinatário */
  userId: string;
  /** Título da notificação */
  title: string;
  /** Mensagem da notificação */
  message: string;
  /** Tipo da notificação */
  type: 'LIKE' | 'COMMENT' | 'FOLLOWER' | 'MENTION' | 'SYSTEM';
  /** URL relacionada (opcional) */
  url?: string;
  /** ID do recurso relacionado (opcional) */
  resourceId?: string;
  /** Tipo do recurso (opcional) */
  resourceType?: 'post' | 'comment' | 'user';
}

/**
 * Interface para representar uma notificação
 */
export interface Notification {
  /** ID único da notificação */
  id: string;
  /** ID do usuário destinatário */
  userId: string;
  /** Título da notificação */
  title: string;
  /** Mensagem da notificação */
  message: string;
  /** Tipo da notificação */
  type: 'LIKE' | 'COMMENT' | 'FOLLOWER' | 'MENTION' | 'SYSTEM';
  /** URL relacionada */
  url?: string;
  /** ID do recurso relacionado */
  resourceId?: string;
  /** Tipo do recurso */
  resourceType?: 'post' | 'comment' | 'user';
  /** Status de leitura */
  read: boolean;
  /** Data de criação */
  createdAt: string;
  /** Data de leitura */
  readAt?: string;
}

/**
 * Interface para resposta de criação de notificação
 */
export interface NotificationMutationResponse {
  /** Mensagem de sucesso */
  message: string;
  /** Notificação criada */
  data: Notification;
}

/**
 * Interface para resposta de deleção de notificação
 */
export interface DeleteNotificationResponse {
  /** Mensagem de sucesso */
  message: string;
  /** ID da notificação deletada */
  deletedId: string;
  /** Status da operação */
  deleted: boolean;
}

/**
 * Interface para resposta de contagem de não lidas
 */
export interface UnreadCountResponse {
  /** Número de notificações não lidas */
  count: number;
}

/**
 * Interface para resposta de marcação como lida
 */
export interface MarkAsReadResponse {
  /** Mensagem de sucesso */
  message: string;
  /** Status da operação */
  read: boolean;
  /** Data da leitura */
  readAt: string;
}

/**
 * Interface para parâmetros de listagem de notificações
 */
export interface GetNotificationsParams {
  /** Número da página */
  page?: number;
  /** Limite de itens por página */
  limit?: number;
  /** Filtrar por tipo */
  type?: 'LIKE' | 'COMMENT' | 'FOLLOWER' | 'MENTION' | 'SYSTEM';
  /** Filtrar por status de leitura */
  read?: boolean;
  /** Ordenar por campo */
  sortBy?: 'createdAt' | 'readAt';
  /** Direção da ordenação */
  sortOrder?: 'asc' | 'desc';
}

/**
 * Interface para resposta paginada de notificações
 */
export interface PaginatedNotificationsResponse {
  /** Lista de notificações */
  data: Notification[];
  /** Metadados de paginação */
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Interface para estatísticas de notificações
 */
export interface NotificationStats {
  /** Total de notificações */
  totalNotifications: number;
  /** Notificações não lidas */
  unreadNotifications: number;
  /** Notificações hoje */
  notificationsToday: number;
  /** Notificações por tipo */
  notificationsByType: {
    type: string;
    count: number;
  }[];
}
