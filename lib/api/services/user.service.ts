/**
 * Serviço de Usuários - Gerenciamento de Perfil
 *
 * @fileoverview Serviço para atualizar perfil do usuário (MongoDB)
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import { api } from '../client';
import type { ApiResponse } from '../types';
import type {
  ChangeEmailData,
  MongoUser,
  UpdateProfileData,
  VerifyEmailChangeData,
} from '../types/users';

/**
 * Serviço responsável por operações de perfil do usuário (MongoDB) e
 * coordenação de mudança de e-mail via endpoints de Auth.
 */
export class UserService {
  private readonly basePath = '/users';

  /**
   * Atualiza perfil do usuário no MongoDB
   * IMPORTANTE: Email NÃO pode ser atualizado aqui (apenas via Cognito)
   */
  /**
   * Atualiza perfil do usuário (exceto e-mail).
   */
  async updateProfile(
    userId: string,
    data: UpdateProfileData
  ): Promise<MongoUser> {
    // Garantir que email não seja enviado
    const { ...profileData } = data;

    const response = await api.patch<ApiResponse<MongoUser>>(
      `${this.basePath}/${userId}`,
      profileData
    );

    if (response.success) {
      return response.data;
    }
    throw new Error(response.message);
  }

  /**
   * Busca usuário por cognitoSub
   */
  /**
   * Busca usuário por Cognito Sub.
   */
  async getUserByCognitoSub(cognitoSub: string): Promise<MongoUser> {
    const response = await api.get<ApiResponse<MongoUser>>(
      `${this.basePath}/cognito/${cognitoSub}`
    );

    if (response.success) {
      return response.data;
    }
    throw new Error(response.message);
  }

  /**
   * Busca usuário por ID
   */
  /**
   * Busca usuário por ID.
   */
  async getUserById(userId: string): Promise<MongoUser> {
    const response = await api.get<ApiResponse<MongoUser>>(
      `${this.basePath}/${userId}`
    );

    if (response.success) {
      return response.data;
    }
    throw new Error(response.message);
  }

  /**
   * Solicita alteração de email (via Cognito)
   * Envia código de verificação para o novo email
   */
  /**
   * Solicita alteração de e-mail via Cognito (envia código para o novo e-mail).
   */
  async changeEmail(data: ChangeEmailData): Promise<void> {
    const response = await api.post<ApiResponse<void>>(
      '/auth/change-email',
      data
    );

    if (!response.success) {
      throw new Error(response.message);
    }
  }

  /**
   * Verifica código de alteração de email (via Cognito)
   */
  /**
   * Verifica o código de alteração de e-mail via Cognito.
   */
  async verifyEmailChange(data: VerifyEmailChangeData): Promise<void> {
    const response = await api.post<ApiResponse<void>>(
      '/auth/verify-email-change',
      data
    );

    if (!response.success) {
      throw new Error(response.message);
    }
  }
}

export const userService = new UserService();
