/**
 * @fileoverview Serviços Privados de Usuários
 * 
 * Contém funções para comunicação com endpoints privados de usuários.
 * Requer autenticação.
 * 
 * @module lib/api/private/users/users
 */

import { privateClient } from '../../clients/private-client';
import {
  PrivateUser,
  CreateUserDto,
  UpdateUserDto,
  UserMutationResponse,
  DeleteUserResponse,
  GetUsersAdminParams,
  UserStats,
} from '../../types/private/users';

/**
 * Cria um novo usuário
 * 
 * @param data - Dados do usuário a ser criado
 * @returns Promise<UserMutationResponse> - Usuário criado
 * 
 * @example
 * ```typescript
 * const newUser = await createUser({
 *   email: 'user@example.com',
 *   fullName: 'John Doe',
 *   nickname: 'john',
 *   role: 'USER'
 * });
 * ```
 */
export const createUser = async (data: CreateUserDto): Promise<UserMutationResponse> => {
  const response = await privateClient.post('/users', data);
  return response.data;
};

/**
 * Lista usuários com filtros administrativos
 * 
 * @param params - Parâmetros de busca e filtros
 * @returns Promise<{ data: PrivateUser[], meta: any }> - Usuários paginados
 * 
 * @example
 * ```typescript
 * const users = await getUsersAdmin({
 *   page: 1,
 *   limit: 20,
 *   role: 'USER',
 *   isActive: true
 * });
 * ```
 */
export const getUsersAdmin = async (
  params?: GetUsersAdminParams
): Promise<{ data: PrivateUser[]; meta: any }> => {
  const response = await privateClient.get('/users', { params });
  return response.data;
};

/**
 * Busca um usuário pelo ID
 * 
 * @param id - ID único do usuário
 * @returns Promise<PrivateUser> - Usuário encontrado
 * 
 * @example
 * ```typescript
 * const user = await getUserById('123');
 * console.log(user.email);
 * ```
 */
export const getUserById = async (id: string): Promise<PrivateUser> => {
  const response = await privateClient.get(`/users/${id}`);
  return response.data.data;
};

/**
 * Busca um usuário pelo Cognito Sub
 * 
 * @param cognitoSub - Cognito Sub do usuário
 * @returns Promise<PrivateUser> - Usuário encontrado
 * 
 * @example
 * ```typescript
 * const user = await getUserByCognitoSub('abc-123-def');
 * console.log(user.fullName);
 * ```
 */
export const getUserByCognitoSub = async (
  cognitoSub: string
): Promise<PrivateUser> => {
  const response = await privateClient.get(`/users/cognito/${cognitoSub}`);
  return response.data.data;
};

/**
 * Atualiza um usuário existente
 * 
 * @param id - ID do usuário a ser atualizado
 * @param data - Dados a serem atualizados
 * @returns Promise<UserMutationResponse> - Usuário atualizado
 * 
 * @example
 * ```typescript
 * const updated = await updateUser('123', {
 *   fullName: 'John Smith',
 *   bio: 'Updated bio'
 * });
 * ```
 */
export const updateUser = async (
  id: string,
  data: UpdateUserDto
): Promise<UserMutationResponse> => {
  const response = await privateClient.put(`/users/${id}`, data);
  return response.data;
};

/**
 * Remove um usuário permanentemente
 * 
 * @param id - ID do usuário a ser removido
 * @returns Promise<DeleteUserResponse> - Confirmação da remoção
 * 
 * @example
 * ```typescript
 * const result = await deleteUser('123');
 * if (result.deleted) {
 *   console.log('Usuário removido');
 * }
 * ```
 */
export const deleteUser = async (id: string): Promise<DeleteUserResponse> => {
  const response = await privateClient.delete(`/users/${id}`);
  return response.data;
};

/**
 * Obtém estatísticas dos usuários
 * 
 * @returns Promise<UserStats> - Estatísticas completas
 * 
 * @example
 * ```typescript
 * const stats = await getUserStats();
 * console.log(`Total: ${stats.totalUsers}`);
 * console.log(`Ativos: ${stats.activeUsers}`);
 * ```
 */
export const getUserStats = async (): Promise<UserStats> => {
  const response = await privateClient.get('/users/stats');
  return response.data.data;
};
