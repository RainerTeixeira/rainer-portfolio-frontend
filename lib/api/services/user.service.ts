/**
 * Serviços de Usuários - Gerenciamento Completo de Perfil e Administração
 * 
 * @fileoverview Serviços unificados para operações de perfil do usuário 
 * e administração de usuários do sistema.
 * @module services/users
 * @version 2.1.0
 * @author Rainer Teixeira
 * @since 1.0.0
 */

import { api } from '../client';
import type { 
  ApiResponse, 
  PaginatedResponse 
} from '../types';
import type {
  ChangeEmailData,
  CreateUserData,
  UpdateProfileData,
  UpdateUserData,
  User,
  UserFilters,
  VerifyEmailChangeData,
  UserRole,
} from '../types/users';
import { prepareAvatarForUpload } from '@/lib/utils';

// =============================================================================
// SERVIÇO BASE COMPARTILHADO
// =============================================================================

/**
 * Classe base com métodos compartilhados entre ProfileService e UsersService
 * @abstract
 * @class
 */
abstract class BaseUserService {
  protected readonly basePath = '/users';

  /**
   * Busca usuário por ID (compatível com MongoDB ObjectId ou cognitoSub)
   * @param id - ID do usuário (MongoDB ObjectId ou cognitoSub)
   * @returns Promise com os dados do usuário
   * @throws {Error} Quando o usuário não é encontrado ou a requisição falha
   * 
   * @example
   * ```typescript
   * // Busca por MongoDB ObjectId
   * const user = await service.getUserById('507f1f77bcf86cd799439011');
   * 
   * // Busca por cognitoSub
   * const user = await service.getUserById('us-east-1:12345678-1234-1234-1234-123456789012');
   * ```
   */
  async getUserById(id: string): Promise<User> {
    const response = await api.get<ApiResponse<User>>(`${this.basePath}/${id}`);
    
    if (response.success) {
      return response.data;
    }
    
    throw new Error(
      response.message || `Erro ao buscar usuário com ID: ${id}`
    );
  }

  /**
   * Busca usuário por nickname
   * @param nickname - Nickname único do usuário
   * @returns Promise com os dados do usuário
   * @throws {Error} Quando o usuário não é encontrado ou a requisição falha
   * 
   * @example
   * ```typescript
   * const user = await service.getUserByNickname('joaosilva');
   * ```
   */
  async getUserByNickname(nickname: string): Promise<User> {
    const response = await api.get<ApiResponse<User>>(
      `${this.basePath}/nickname/${nickname}`
    );
    
    if (response.success) {
      return response.data;
    }
    
    throw new Error(
      response.message || `Erro ao buscar usuário com nickname: ${nickname}`
    );
  }
}

// =============================================================================
// SERVIÇO DE PERFIL DO USUÁRIO
// =============================================================================

/**
 * Serviço responsável por operações do perfil do usuário logado
 * @class
 * @extends BaseUserService
 * @description Gerencia operações relacionadas ao próprio perfil do usuário,
 * incluindo atualização de dados, alteração de e-mail e consulta de informações.
 */
export class ProfileService extends BaseUserService {
  
  /**
   * Busca usuário por ID do Cognito (cognitoSub)
   * @param cognitoSub - ID único do usuário no Cognito
   * @returns Promise com os dados do usuário
   * @throws {Error} Quando o usuário não é encontrado ou a requisição falha
   * 
   * @example
   * ```typescript
   * const user = await profileService.getUserByCognitoSub('cognito-sub-123');
   * ```
   */
  async getUserByCognitoSub(cognitoSub: string): Promise<User> {
    const response = await api.get<ApiResponse<User>>(
      `${this.basePath}/cognito/${cognitoSub}`
    );

    if (response.success) {
      return response.data;
    }
    
    throw new Error(
      response.message || `Erro ao buscar usuário com cognitoSub: ${cognitoSub}`
    );
  }

  /**
   * Atualiza o perfil do usuário (exceto e-mail)
   * @param userId - ID único do usuário (cognitoSub)
   * @param data - Dados para atualização do perfil
   * @returns Promise com os dados atualizados do usuário
   * @throws {Error} Quando a requisição falha
   * 
   * @example
   * ```typescript
   * const updatedUser = await profileService.updateProfile('user123', {
   *   fullName: 'Novo Nome',
   *   bio: 'Nova biografia'
   * });
   * ```
   */
  async updateProfile(userId: string, data: UpdateProfileData): Promise<User> {
    // Garantir que e-mail não seja enviado (alteração via Cognito apenas)
    const { email, ...profileData } = data as any;

    const response = await api.put<ApiResponse<User>>(
      `${this.basePath}/${userId}`,
      profileData
    );

    if (response.success) {
      return response.data;
    }
    
    throw new Error(
      response.message || `Erro ao atualizar perfil do usuário: ${userId}`
    );
  }

  /**
   * Solicita alteração de e-mail via Cognito
   * @param data - Dados para alteração de e-mail
   * @returns Promise vazia em caso de sucesso
   * @throws {Error} Quando a requisição falha
   * 
   * @example
   * ```typescript
   * await profileService.changeEmail({
   *   cognitoSub: 'user123',
   *   newEmail: 'novo@email.com'
   * });
   * ```
   */
  async changeEmail(data: ChangeEmailData): Promise<void> {
    const response = await api.post<ApiResponse<void>>(
      '/auth/change-email',
      data
    );

    if (!response.success) {
      throw new Error(
        response.message || 'Erro ao solicitar alteração de e-mail'
      );
    }
  }

  /**
   * Verifica o código de alteração de e-mail via Cognito
   * @param data - Dados para verificação do código
   * @returns Promise vazia em caso de sucesso
   * @throws {Error} Quando o código é inválido ou a requisição falha
   * 
   * @example
   * ```typescript
   * await profileService.verifyEmailChange({
   *   cognitoSub: 'user123',
   *   code: '123456'
   * });
   * ```
   */
  async verifyEmailChange(data: VerifyEmailChangeData): Promise<void> {
    const response = await api.post<ApiResponse<void>>(
      '/auth/verify-email-change',
      data
    );

    if (!response.success) {
      throw new Error(
        response.message || 'Erro ao verificar código de alteração de e-mail'
      );
    }
  }
}

// =============================================================================
// SERVIÇO DE ADMINISTRAÇÃO DE USUÁRIOS
// =============================================================================

/**
 * Serviço responsável por operações administrativas de usuários
 * @class
 * @extends BaseUserService
 * @description Gerencia operações de CRUD, listagem com filtros, 
 * banimento e outras ações administrativas sobre usuários do sistema.
 */
export class UsersService extends BaseUserService {

  /**
   * Lista usuários com paginação e filtros
   * @param filters - Filtros e parâmetros de paginação
   * @returns Promise com resposta paginada de usuários
   * @throws {Error} Quando a requisição falha
   * 
   * @example
   * ```typescript
   * const users = await usersService.listUsers({
   *   page: 1,
   *   limit: 10,
   *   role: UserRole.AUTHOR,
   *   search: 'joão'
   * });
   * ```
   */
  async listUsers(filters: UserFilters = {}): Promise<PaginatedResponse<User>> {
    const params = new URLSearchParams();

    // Adicionar filtros aos parâmetros de query
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.role) params.append('role', filters.role);
    if (filters.search) params.append('search', filters.search);
    if (filters.isActive !== undefined) {
      params.append('isActive', filters.isActive.toString());
    }
    if (filters.isBanned !== undefined) {
      params.append('isBanned', filters.isBanned.toString());
    }

    const queryString = params.toString();
    const url = queryString ? `${this.basePath}?${queryString}` : this.basePath;

    const response = await api.get<ApiResponse<PaginatedResponse<User>>>(url);

    if (response.success) {
      return response.data;
    }

    throw new Error(
      response.message || 'Erro ao listar usuários'
    );
  }

  /**
   * Cria um novo usuário no sistema
   * @param data - Dados para criação do usuário
   * @returns Promise com os dados do usuário criado
   * @throws {Error} Quando a criação falha
   * 
   * @example
   * ```typescript
   * const newUser = await usersService.createUser({
   *   email: 'novo@email.com',
   *   nickname: 'novousuario',
   *   fullName: 'Novo Usuário',
   *   password: 'senhaSegura123',
   *   role: UserRole.AUTHOR
   * });
   * ```
   */
  async createUser(data: CreateUserData & { password: string }): Promise<User> {
    const response = await api.post<ApiResponse<User>>(this.basePath, data);
    
    if (response.success) {
      return response.data;
    }
    
    throw new Error(
      response.message || 'Erro ao criar usuário'
    );
  }

  /**
   * Atualiza um usuário existente
   * @param id - ID do usuário (cognitoSub)
   * @param data - Dados para atualização
   * @param avatarFile - Arquivo de imagem opcional para avatar
   * @returns Promise com os dados atualizados do usuário
   * @throws {Error} Quando a atualização falha
   * 
   * @example
   * ```typescript
   * // Atualização sem avatar
   * const user = await usersService.updateUser('user123', {
   *   fullName: 'Nome Atualizado',
   *   bio: 'Nova biografia'
   * });
   * 
   * // Atualização com avatar
   * const userWithAvatar = await usersService.updateUser(
   *   'user123', 
   *   { fullName: 'Nome' }, 
   *   avatarFile
   * );
   * ```
   */
  async updateUser(
    id: string,
    data: UpdateUserData,
    avatarFile?: File
  ): Promise<User> {
    // Se houver arquivo de avatar, usar FormData
    if (avatarFile) {
      const formData = new FormData();

      // Converter avatar para WebP no cliente antes do upload
      // Aceita qualquer formato de imagem e sempre converte para WebP otimizado
      console.log(`🔄 Convertendo avatar para WebP: ${avatarFile.name} (${avatarFile.type})`);
      const webpAvatar = await prepareAvatarForUpload(avatarFile);
      console.log(
        `✅ Avatar convertido: ${webpAvatar.name} (${webpAvatar.type}) - ` +
        `${Math.round(avatarFile.size / 1024)}KB → ${Math.round(webpAvatar.size / 1024)}KB`
      );

      // Adicionar arquivo de avatar convertido
      formData.append('avatar', webpAvatar);

      // Adicionar outros campos como strings
      if (data.fullName) formData.append('fullName', data.fullName);
      if (data.nickname) formData.append('nickname', data.nickname);
      if (data.bio) formData.append('bio', data.bio);
      if (data.website) formData.append('website', data.website);
      if (data.socialLinks) {
        formData.append('socialLinks', JSON.stringify(data.socialLinks));
      }
      if (data.role) formData.append('role', data.role);
      if (data.isActive !== undefined) {
        formData.append('isActive', data.isActive.toString());
      }
      if (data.isBanned !== undefined) {
        formData.append('isBanned', data.isBanned.toString());
      }
      if (data.banReason) formData.append('banReason', data.banReason);

      const response = await api.put<ApiResponse<User>>(
        `${this.basePath}/${id}`,
        formData
      );

      if (response.success) {
        return response.data;
      }

      throw new Error(
        response.message || `Erro ao atualizar usuário: ${id}`
      );
    } else {
      // Sem arquivo, usar JSON normal
      const response = await api.put<ApiResponse<User>>(
        `${this.basePath}/${id}`,
        data
      );
      
      if (response.success) {
        return response.data;
      }

      throw new Error(
        response.message || `Erro ao atualizar usuário: ${id}`
      );
    }
  }

  /**
   * Deleta um usuário do sistema
   * @param id - ID do usuário (cognitoSub)
   * @returns Promise com a resposta da API
   * @throws {Error} Quando a deleção falha
   * 
   * @example
   * ```typescript
   * await usersService.deleteUser('user123');
   * ```
   */
  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return api.delete<ApiResponse<void>>(`${this.basePath}/${id}`);
  }

  /**
   * Bane um usuário do sistema
   * @param id - ID do usuário (cognitoSub)
   * @param reason - Motivo opcional do banimento
   * @returns Promise com os dados do usuário banido
   * @throws {Error} Quando o banimento falha
   * 
   * @example
   * ```typescript
   * const bannedUser = await usersService.banUser('user123', 'Comportamento inadequado');
   * ```
   */
  async banUser(id: string, reason?: string): Promise<User> {
    const response = await api.patch<ApiResponse<User>>(
      `${this.basePath}/${id}/ban`,
      { reason }
    );
    
    if (response.success) {
      return response.data;
    }
    
    throw new Error(
      response.message || `Erro ao banir usuário: ${id}`
    );
  }

  /**
   * Ativa um usuário previamente desativado
   * @param id - ID do usuário (cognitoSub)
   * @returns Promise com os dados do usuário ativado
   * @throws {Error} Quando a ativação falha
   * 
   * @example
   * ```typescript
   * const activatedUser = await usersService.activateUser('user123');
   * ```
   */
  async activateUser(id: string): Promise<User> {
    const response = await api.patch<ApiResponse<User>>(
      `${this.basePath}/${id}/activate`
    );
    
    if (response.success) {
      return response.data;
    }
    
    throw new Error(
      response.message || `Erro ao ativar usuário: ${id}`
    );
  }

  /**
   * Desativa um usuário (sem banir)
   * @param id - ID do usuário (cognitoSub)
   * @returns Promise com os dados do usuário desativado
   * @throws {Error} Quando a desativação falha
   * 
   * @example
   * ```typescript
   * const deactivatedUser = await usersService.deactivateUser('user123');
   * ```
   */
  async deactivateUser(id: string): Promise<User> {
    const response = await api.patch<ApiResponse<User>>(
      `${this.basePath}/${id}/deactivate`
    );
    
    if (response.success) {
      return response.data;
    }
    
    throw new Error(
      response.message || `Erro ao desativar usuário: ${id}`
    );
  }
}

// =============================================================================
// INSTÂNCIAS SINGLETON PARA EXPORTAÇÃO
// =============================================================================

/**
 * Instância singleton do serviço de perfil do usuário
 * @type {ProfileService}
 */
export const profileService = new ProfileService();

/**
 * Instância singleton do serviço de administração de usuários
 * @type {UsersService}
 */
export const usersService = new UsersService();

/**
 * Objeto unificado exportando ambos os serviços
 */
export default {
  profile: profileService,
  users: usersService,
};