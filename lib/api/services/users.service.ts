// ============================================================================
// Serviço de Usuários - Integração com API do Backend
// ============================================================================

/**
 * Serviço para gerenciar usuários do sistema
 * 
 * @fileoverview Serviço de usuários com métodos para CRUD e operações específicas
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import { api } from '../client';
import type {
  ApiResponse,
  CreateUserData,
  PaginatedResponse,
  UpdateUserData,
  User,
  UserFilters
} from '../types';

// ============================================================================
// Classe do Serviço
// ============================================================================

export class UsersService {
  private readonly basePath = '/users';

  /**
   * Lista usuários com paginação e filtros
   */
  async listUsers(filters: UserFilters = {}): Promise<PaginatedResponse<User>> {
    const params = new URLSearchParams();
    
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.role) params.append('role', filters.role);
    if (filters.search) params.append('search', filters.search);
    if (filters.isActive !== undefined) params.append('isActive', filters.isActive.toString());

    const queryString = params.toString();
    const url = queryString ? `${this.basePath}?${queryString}` : this.basePath;
    
    const response = await api.get<ApiResponse<PaginatedResponse<User>>>(url);
    if (response.success) {
      return response.data;
    }
    throw new Error(response.message);
  }

  /**
   * Busca um usuário por ID
   */
  async getUserById(id: string): Promise<User> {
    const response = await api.get<ApiResponse<User>>(`${this.basePath}/${id}`);
    if (response.success) {
      return response.data;
    }
    throw new Error(response.message);
  }

  /**
   * Busca um usuário por username
   */
  async getUserByUsername(username: string): Promise<User> {
    const response = await api.get<ApiResponse<User>>(`${this.basePath}/username/${username}`);
    if (response.success) {
      return response.data;
    }
    throw new Error(response.message);
  }

  /**
   * Cria um novo usuário
   */
  async createUser(data: CreateUserData & { password: string }): Promise<User> {
    const response = await api.post<ApiResponse<User>>(this.basePath, data);
    if (response.success) {
      return response.data;
    }
    throw new Error(response.message);
  }

  /**
   * Atualiza um usuário existente
   */
  async updateUser(id: string, data: UpdateUserData): Promise<User> {
    const response = await api.put<ApiResponse<User>>(`${this.basePath}/${id}`, data);
    if (response.success) {
      return response.data;
    }
    throw new Error(response.message);
  }

  /**
   * Deleta um usuário
   */
  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return api.delete<ApiResponse<void>>(`${this.basePath}/${id}`);
  }

  /**
   * Bane um usuário
   */
  async banUser(id: string, reason?: string): Promise<User> {
    const response = await api.patch<ApiResponse<User>>(`${this.basePath}/${id}/ban`, { reason });
    if (response.success) {
      return response.data;
    }
    throw new Error(response.message);
  }
}

// ============================================================================
// Instância Singleton
// ============================================================================

export const usersService = new UsersService();