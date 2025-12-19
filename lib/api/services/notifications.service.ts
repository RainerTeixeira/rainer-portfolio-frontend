/**
 * Serviço de Notificações - Integração com API do Backend
 * 
 * @fileoverview Serviço para gerenciar notificações do usuário
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

/**
 * Serviço responsável pelo CRUD de notificações e operações relacionadas.
 */
export class NotificationsService {
  private readonly basePath = '/notifications';

  /**
   * Lista notificações com paginação e filtros
   */
  async listNotifications(filters: NotificationFilters = {}): Promise<PaginatedResponse<Notification>> {
    const params = new URLSearchParams();

    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.userId) params.append('userId', filters.userId);
    if (filters.isRead !== undefined) params.append('isRead', filters.isRead.toString());
    if (filters.type) params.append('type', filters.type);

    const queryString = params.toString();
    const url = queryString ? `${this.basePath}?${queryString}` : this.basePath;

    const response = await api.get<ApiResponse<PaginatedResponse<Notification>>>(url);
    
    if (response.success) {
      return (response as any).data;
    }
    
    throw new Error(response.message || 'Erro ao listar notificações');
  }

  /**
   * Busca notificação por ID
   */
  async getNotificationById(id: string): Promise<Notification> {
    const response = await api.get<ApiResponse<Notification>>(`${this.basePath}/${id}`);
    
    if (response.success) {
      return (response as any).data;
    }
    
    throw new Error(response.message || `Erro ao buscar notificação com ID: ${id}`);
  }

  /**
   * Lista notificações por usuário
   */
  async getNotificationsByUser(userId: string, filters: Omit<NotificationFilters, 'userId'> = {}): Promise<PaginatedResponse<Notification>> {
    return this.listNotifications({ ...filters, userId });
  }

  /**
   * Conta notificações não lidas do usuário
   */
  async getUnreadCount(userId: string): Promise<number> {
    const response = await api.get<ApiResponse<{ count: number }>>(`${this.basePath}/user/${userId}/count`);
    
    if (response.success) {
      return (response as any).data.count;
    }
    
    throw new Error(response.message || 'Erro ao contar notificações não lidas');
  }

  /**
   * Cria uma nova notificação
   */
  async createNotification(data: CreateNotificationData): Promise<Notification> {
    const response = await api.post<ApiResponse<Notification>>(this.basePath, data);
    
    if (response.success) {
      return (response as any).data;
    }
    
    throw new Error(response.message || 'Erro ao criar notificação');
  }

  /**
   * Atualiza uma notificação
   */
  async updateNotification(id: string, data: UpdateNotificationData): Promise<Notification> {
    const response = await api.put<ApiResponse<Notification>>(`${this.basePath}/${id}`, data);
    
    if (response.success) {
      return (response as any).data;
    }
    
    throw new Error(response.message || `Erro ao atualizar notificação: ${id}`);
  }

  /**
   * Deleta uma notificação
   */
  async deleteNotification(id: string): Promise<void> {
    const response = await api.delete<ApiResponse<void>>(`${this.basePath}/${id}`);
    
    if (!response.success) {
      throw new Error(response.message || `Erro ao deletar notificação: ${id}`);
    }
  }

  /**
   * Marca notificação como lida
   */
  async markAsRead(id: string): Promise<Notification> {
    const response = await api.patch<ApiResponse<Notification>>(`${this.basePath}/${id}/read`);
    
    if (response.success) {
      return (response as any).data;
    }
    
    throw new Error(response.message || `Erro ao marcar notificação como lida: ${id}`);
  }

  /**
   * Marca todas as notificações do usuário como lidas
   */
  async markAllAsRead(userId: string): Promise<void> {
    const response = await api.patch<ApiResponse<void>>(`${this.basePath}/user/${userId}/read-all`);
    
    if (!response.success) {
      throw new Error(response.message || 'Erro ao marcar todas as notificações como lidas');
    }
  }
}

/**
 * Instância singleton do serviço de notificações
 */
export const notificationsService = new NotificationsService();