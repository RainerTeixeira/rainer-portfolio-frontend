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
  UserFilters,
} from '../types';

// ============================================================================
// Classe do Serviço
// ============================================================================

/**
 * Serviço responsável por operações de usuários (CRUD e ações administrativas).
 */
export class UsersService {
  private readonly basePath = '/users';

  /**
   * Lista usuários com paginação e filtros
   */
  /**
   * Lista usuários com filtros e paginação.
   */
  async listUsers(filters: UserFilters = {}): Promise<PaginatedResponse<User>> {
    const params = new URLSearchParams();

    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.role) params.append('role', filters.role);
    if (filters.search) params.append('search', filters.search);
    if (filters.isActive !== undefined)
      params.append('isActive', filters.isActive.toString());

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
  /**
   * Busca usuário por ID.
   */
  async getUserById(id: string): Promise<User> {
    const response = await api.get<ApiResponse<User>>(`${this.basePath}/${id}`);
    if (response.success) {
      return response.data;
    }
    throw new Error(response.message);
  }

  /**
   * Busca um usuário por nickname
   */
  /**
   * Busca usuário por nickname.
   */
  async getUserByNickname(nickname: string): Promise<User> {
    const response = await api.get<ApiResponse<User>>(
      `${this.basePath}/nickname/${nickname}`
    );
    if (response.success) {
      return response.data;
    }
    throw new Error(response.message);
  }

  /**
   * Alias para getUserByNickname (compatibilidade com testes).
   */
  async getUserByUsername(username: string): Promise<User> {
    return this.getUserByNickname(username);
  }

  /**
   * Cria um novo usuário
   */
  /**
   * Cria novo usuário.
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
  /**
   * Atualiza usuário existente.
   *
   * @param id - ID do usuário (cognitoSub)
   * @param data - Dados para atualizar
   * @param avatarFile - Arquivo de imagem opcional para avatar (será enviado para Cloudinary)
   */
  async updateUser(
    id: string,
    data: UpdateUserData,
    avatarFile?: File
  ): Promise<User> {
    // Se houver arquivo, usar FormData; caso contrário, JSON normal
    if (avatarFile) {
      const formData = new FormData();

      // Adicionar arquivo
      formData.append('avatar', avatarFile);

      // Adicionar outros campos como strings
      if (data.fullName) formData.append('fullName', data.fullName);
      if (data.bio) formData.append('bio', data.bio);
      if (data.website) formData.append('website', data.website);
      if (data.socialLinks) {
        formData.append('socialLinks', JSON.stringify(data.socialLinks));
      }
      if (data.role) formData.append('role', data.role);

      // Não definir Content-Type manualmente - o navegador define automaticamente com boundary
      const response = await api.put<ApiResponse<User>>(
        `${this.basePath}/${id}`,
        formData
      );

      if (response.success) {
        return response.data;
      }
      throw new Error(response.message);
    } else {
      // Sem arquivo, usar JSON normal
      const response = await api.put<ApiResponse<User>>(
        `${this.basePath}/${id}`,
        data
      );
      if (response.success) {
        return response.data;
      }
      throw new Error(response.message);
    }
  }

  /**
   * Deleta um usuário
   */
  /**
   * Deleta usuário por ID.
   */
  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return api.delete<ApiResponse<void>>(`${this.basePath}/${id}`);
  }

  /**
   * Bane um usuário
   */
  /**
   * Bane usuário com motivo opcional.
   */
  async banUser(id: string, reason?: string): Promise<User> {
    const response = await api.patch<ApiResponse<User>>(
      `${this.basePath}/${id}/ban`,
      { reason }
    );
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
