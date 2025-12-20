/**
 * @fileoverview Serviços Privados de Notificações
 * 
 * Contém funções para comunicação com endpoints privados de notificações.
 * Requer autenticação.
 * 
 * @module lib/api/private/notifications/notifications
 */

import { privateClient } from '../../clients/private-client';
import {
  Notification,
  CreateNotificationDto,
  NotificationMutationResponse,
  DeleteNotificationResponse,
  UnreadCountResponse,
  MarkAsReadResponse,
  GetNotificationsParams,
  PaginatedNotificationsResponse,
  NotificationStats,
} from '../../types/private/notifications';

/**
 * Cria uma nova notificação
 * 
 * @param data - Dados da notificação a ser criada
 * @returns Promise<NotificationMutationResponse> - Notificação criada
 * 
 * @example
 * ```typescript
 * const newNotif = await createNotification({
 *   userId: '123',
 *   title: 'Nova curtida',
 *   message: 'Seu post recebeu uma curtida',
 *   type: 'LIKE',
 *   resourceId: '456',
 *   resourceType: 'post'
 * });
 * ```
 */
export const createNotification = async (data: CreateNotificationDto): Promise<NotificationMutationResponse> => {
  const response = await privateClient.post('/notifications', data);
  return response.data;
};

/**
 * Lista notificações com filtros e paginação
 * 
 * @param params - Parâmetros de busca e filtros
 * @returns Promise<PaginatedNotificationsResponse> - Notificações paginadas
 * 
 * @example
 * ```typescript
 * const notifs = await getNotifications({
 *   userId: '123',
 *   read: false,
 *   page: 1,
 *   limit: 20
 * });
 * ```
 */
export const getNotifications = async (
  params?: GetNotificationsParams
): Promise<PaginatedNotificationsResponse> => {
  const response = await privateClient.get('/notifications', { params });
  return response.data;
};

/**
 * Busca uma notificação pelo ID
 * 
 * @param id - ID único da notificação
 * @returns Promise<Notification> - Notificação encontrada
 * 
 * @example
 * ```typescript
 * const notif = await getNotificationById('456');
 * console.log(notif.title);
 * ```
 */
export const getNotificationById = async (id: string): Promise<Notification> => {
  const response = await privateClient.get(`/notifications/${id}`);
  return response.data.data;
};

/**
 * Remove uma notificação permanentemente
 * 
 * @param id - ID da notificação a ser removida
 * @returns Promise<DeleteNotificationResponse> - Confirmação da remoção
 * 
 * @example
 * ```typescript
 * const result = await deleteNotification('456');
 * if (result.deleted) {
 *   console.log('Notificação removida');
 * }
 * ```
 */
export const deleteNotification = async (id: string): Promise<DeleteNotificationResponse> => {
  const response = await privateClient.delete(`/notifications/${id}`);
  return response.data;
};

/**
 * Conta notificações não lidas de um usuário
 * 
 * @param userId - ID do usuário
 * @returns Promise<UnreadCountResponse> - Número de não lidas
 * 
 * @example
 * ```typescript
 * const count = await getUnreadCount('123');
 * console.log(`Não lidas: ${count.count}`);
 * ```
 */
export const getUnreadCount = async (userId: string): Promise<UnreadCountResponse> => {
  const response = await privateClient.get(`/notifications/user/${userId}/unread-count`);
  return response.data;
};

/**
 * Marca uma notificação como lida
 * 
 * @param id - ID da notificação
 * @returns Promise<MarkAsReadResponse> - Confirmação da marcação
 * 
 * @example
 * ```typescript
 * const result = await markAsRead('456');
 * console.log('Lida em:', result.readAt);
 * ```
 */
export const markAsRead = async (id: string): Promise<MarkAsReadResponse> => {
  const response = await privateClient.patch(`/notifications/${id}/read`);
  return response.data;
};

/**
 * Marca todas as notificações de um usuário como lidas
 * 
 * @param userId - ID do usuário
 * @returns Promise<{ message: string; readCount: number }> - Resultado da operação
 * 
 * @example
 * ```typescript
 * const result = await markAllAsRead('123');
 * console.log(`${result.readCount} notificações marcadas`);
 * ```
 */
export const markAllAsRead = async (userId: string): Promise<{ message: string; readCount: number }> => {
  const response = await privateClient.patch(`/notifications/user/${userId}/read-all`);
  return response.data;
};

/**
 * Remove todas as notificações de um usuário
 * 
 * @param userId - ID do usuário
 * @returns Promise<{ message: string; deletedCount: number }> - Resultado da operação
 * 
 * @example
 * ```typescript
 * const result = await deleteAllNotifications('123');
 * console.log(`${result.deletedCount} notificações removidas`);
 * ```
 */
export const deleteAllNotifications = async (userId: string): Promise<{ message: string; deletedCount: number }> => {
  const response = await privateClient.delete(`/notifications/user/${userId}/all`);
  return response.data;
};

/**
 * Envia notificação de nova curtida
 * 
 * @param data - Dados da notificação
 * @returns Promise<NotificationMutationResponse> - Notificação enviada
 * 
 * @example
 * ```typescript
 * const notif = await sendLikeNotification({
 *   userId: '123',
 *   resourceId: '456',
 *   message: 'Seu post recebeu uma curtida'
 * });
 * ```
 */
export const sendLikeNotification = async (data: {
  userId: string;
  resourceId: string;
  message: string;
}): Promise<NotificationMutationResponse> => {
  const response = await privateClient.post('/notifications/like', data);
  return response.data;
};

/**
 * Envia notificação de novo comentário
 * 
 * @param data - Dados da notificação
 * @returns Promise<NotificationMutationResponse> - Notificação enviada
 * 
 * @example
 * ```typescript
 * const notif = await sendCommentNotification({
 *   userId: '123',
 *   resourceId: '456',
 *   message: 'Seu post recebeu um comentário'
 * });
 * ```
 */
export const sendCommentNotification = async (data: {
  userId: string;
  resourceId: string;
  message: string;
}): Promise<NotificationMutationResponse> => {
  const response = await privateClient.post('/notifications/comment', data);
  return response.data;
};

/**
 * Envia notificação de novo seguidor
 * 
 * @param data - Dados da notificação
 * @returns Promise<NotificationMutationResponse> - Notificação enviada
 * 
 * @example
 * ```typescript
 * const notif = await sendFollowerNotification({
 *   userId: '123',
 *   resourceId: '456',
 *   message: 'Você tem um novo seguidor'
 * });
 * ```
 */
export const sendFollowerNotification = async (data: {
  userId: string;
  resourceId: string;
  message: string;
}): Promise<NotificationMutationResponse> => {
  const response = await privateClient.post('/notifications/follower', data);
  return response.data;
};

/**
 * Obtém estatísticas das notificações
 * 
 * @returns Promise<NotificationStats> - Estatísticas completas
 * 
 * @example
 * ```typescript
 * const stats = await getNotificationStats();
 * console.log(`Total: ${stats.totalNotifications}`);
 * console.log(`Não lidas: ${stats.unreadNotifications}`);
 * ```
 */
export const getNotificationStats = async (): Promise<NotificationStats> => {
  const response = await privateClient.get('/notifications/stats');
  return response.data.data;
};
