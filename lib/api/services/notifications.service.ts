// ============================================================================
// Serviço de Notificações - Integração com API do Backend
// ============================================================================

/**
 * Serviço para gerenciar notificações do sistema
 *
 * @fileoverview Serviço de notificações com métodos para CRUD e operações específicas
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import { api } from '../client';
import type {
  ApiResponse,
  CreateNotificationData,
  Notification,
  NotificationFilters,
  PaginatedResponse,
  UpdateNotificationData,
} from '../types';
import { NotificationType } from '../types';

// ============================================================================
// Classe do Serviço
// ============================================================================

/**
 * Serviço responsável por CRUD e operações de notificações do usuário.
 */
export class NotificationsService {
  private readonly basePath = '/notifications';

  /**
   * Lista notificações com paginação e filtros
   */
  /**
   * Lista notificações de um usuário com filtros/paginação.
   */
  async listNotifications(
    filters: NotificationFilters
  ): Promise<PaginatedResponse<Notification>> {
    const params = new URLSearchParams();

    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.isRead !== undefined)
      params.append('isRead', filters.isRead.toString());
    if (filters.type) params.append('type', filters.type);

    const queryString = params.toString();
    const url = queryString
      ? `${this.basePath}/user/${filters.userId}?${queryString}`
      : `${this.basePath}/user/${filters.userId}`;

    const response =
      await api.get<ApiResponse<PaginatedResponse<Notification>>>(url);
    if (!response.success) {
      throw new Error(response.message || 'Erro ao listar notificações');
    }
    return response.data;
  }

  /**
   * Busca uma notificação por ID
   */
  /**
   * Busca notificação por ID.
   */
  async getNotificationById(id: string): Promise<Notification> {
    const response = await api.get<ApiResponse<Notification>>(
      `${this.basePath}/${id}`
    );
    if (!response.success) {
      throw new Error(response.message || 'Erro ao buscar notificação');
    }
    return response.data;
  }

  /**
   * Lista notificações de um usuário específico
   */
  /**
   * Lista notificações por usuário.
   */
  async getNotificationsByUser(userId: string): Promise<Notification[]> {
    const response = await api.get<ApiResponse<Notification[]>>(
      `${this.basePath}/user/${userId}`
    );
    if (!response.success) {
      throw new Error(response.message || 'Erro ao buscar notificações');
    }
    return response.data;
  }

  /**
   * Conta notificações não lidas de um usuário
   */
  /**
   * Conta notificações não lidas do usuário.
   */
  async getUnreadCount(userId: string): Promise<number> {
    const response = await api.get<ApiResponse<{ count: number }>>(
      `${this.basePath}/user/${userId}/unread/count`
    );
    if (!response.success) {
      throw new Error(
        response.message || 'Erro ao contar notificações não lidas'
      );
    }
    return response.data.count;
  }

  /**
   * Cria uma nova notificação
   */
  /**
   * Cria nova notificação.
   */
  async createNotification(
    data: CreateNotificationData
  ): Promise<Notification> {
    const response = await api.post<ApiResponse<Notification>>(
      this.basePath,
      data
    );
    if (!response.success) {
      throw new Error(response.message || 'Erro ao criar notificação');
    }
    return response.data;
  }

  /**
   * Atualiza uma notificação existente
   */
  /**
   * Atualiza notificação existente.
   */
  async updateNotification(
    id: string,
    data: UpdateNotificationData
  ): Promise<Notification> {
    const response = await api.put<ApiResponse<Notification>>(
      `${this.basePath}/${id}`,
      data
    );
    if (!response.success) {
      throw new Error(response.message || 'Erro ao atualizar notificação');
    }
    return response.data;
  }

  /**
   * Deleta uma notificação
   */
  /**
   * Deleta notificação por ID.
   */
  async deleteNotification(id: string): Promise<ApiResponse<void>> {
    return api.delete<ApiResponse<void>>(`${this.basePath}/${id}`);
  }

  /**
   * Marca uma notificação como lida
   */
  /**
   * Marca notificação como lida.
   */
  async markAsRead(id: string): Promise<Notification> {
    const response = await api.patch<ApiResponse<Notification>>(
      `${this.basePath}/${id}/read`
    );
    if (!response.success) {
      throw new Error(
        response.message || 'Erro ao marcar notificação como lida'
      );
    }
    return response.data;
  }

  /**
   * Marca todas as notificações de um usuário como lidas
   */
  /**
   * Marca todas notificações do usuário como lidas.
   */
  async markAllAsRead(userId: string): Promise<ApiResponse<void>> {
    return api.patch<ApiResponse<void>>(
      `${this.basePath}/user/${userId}/read-all`
    );
  }

  /**
   * Lista apenas notificações não lidas de um usuário
   */
  /**
   * Lista apenas notificações não lidas do usuário.
   */
  async getUnreadNotifications(userId: string): Promise<Notification[]> {
    const response = await this.listNotifications({ userId, isRead: false });
    return response.data;
  }

  /**
   * Lista notificações por tipo
   */
  /**
   * Lista notificações por tipo.
   */
  async getNotificationsByType(
    userId: string,
    type: string
  ): Promise<Notification[]> {
    const response = await this.listNotifications({
      userId,
      type: type as NotificationType,
    });
    return response.data;
  }

  /**
   * Cria notificação de novo comentário
   */
  /**
   * Cria notificação de novo comentário em post.
   */
  async notifyNewComment(
    postAuthorId: string,
    commentAuthorName: string,
    postTitle: string,
    postId: string
  ): Promise<Notification> {
    return this.createNotification({
      type: NotificationType.NEW_COMMENT,
      title: 'Novo comentário no seu post',
      message: `${commentAuthorName} comentou em "${postTitle}"`,
      link: `/posts/${postId}`,
      metadata: { postId, commentAuthorName, postTitle },
      userId: postAuthorId,
    });
  }

  /**
   * Cria notificação de novo like
   */
  /**
   * Cria notificação de novo like em post.
   */
  async notifyNewLike(
    postAuthorId: string,
    likeAuthorName: string,
    postTitle: string,
    postId: string
  ): Promise<Notification> {
    return this.createNotification({
      type: NotificationType.NEW_LIKE,
      title: 'Novo like no seu post',
      message: `${likeAuthorName} curtiu "${postTitle}"`,
      link: `/posts/${postId}`,
      metadata: { postId, likeAuthorName, postTitle },
      userId: postAuthorId,
    });
  }

  /**
   * Cria notificação de novo seguidor
   */
  /**
   * Cria notificação de novo seguidor.
   */
  async notifyNewFollower(
    userId: string,
    followerName: string
  ): Promise<Notification> {
    return this.createNotification({
      type: NotificationType.NEW_FOLLOWER,
      title: 'Novo seguidor',
      message: `${followerName} começou a seguir você`,
      link: `/users/${userId}`,
      metadata: { followerName },
      userId,
    });
  }

  /**
   * Cria notificação de post publicado
   */
  /**
   * Cria notificação de post publicado.
   */
  async notifyPostPublished(
    authorId: string,
    postTitle: string,
    postId: string
  ): Promise<Notification> {
    return this.createNotification({
      type: NotificationType.POST_PUBLISHED,
      title: 'Post publicado',
      message: `Seu post "${postTitle}" foi publicado com sucesso`,
      link: `/posts/${postId}`,
      metadata: { postId, postTitle },
      userId: authorId,
    });
  }
}

// ============================================================================
// Instância Singleton
// ============================================================================

export const notificationsService = new NotificationsService();
