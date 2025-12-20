/**
 * @fileoverview Serviços Públicos de Usuários
 * 
 * Contém funções para comunicação com endpoints públicos de usuários.
 * Não requer autenticação.
 * 
 * @module lib/api/public/users/users
 */

import { publicClient } from '../../clients/public-client';
import { PublicUser, PublicUsersResponse, GetUsersParams } from '../../types/public/users';

/**
 * Busca lista de usuários públicos
 * 
 * @param params - Parâmetros de busca e paginação
 * @returns Promise<PublicUsersResponse> - Usuários paginados
 * 
 * @example
 * ```typescript
 * const users = await getPublicUsers({
 *   page: 1,
 *   limit: 10,
 *   search: 'john'
 * });
 * ```
 */
export const getPublicUsers = async (
  params?: GetUsersParams
): Promise<PublicUsersResponse> => {
  const response = await publicClient.get('/users', { params });
  return response.data;
};

/**
 * Busca um usuário público pelo ID
 * 
 * @param id - ID único do usuário
 * @returns Promise<PublicUser> - Usuário encontrado
 * 
 * @example
 * ```typescript
 * const user = await getPublicUserById('123');
 * console.log(user.fullName);
 * ```
 */
export const getPublicUserById = async (id: string): Promise<PublicUser> => {
  const response = await publicClient.get(`/users/${id}`);
  return response.data.data;
};

/**
 * Busca um usuário público pelo Cognito Sub
 * 
 * @param cognitoSub - Cognito Sub do usuário
 * @returns Promise<PublicUser> - Usuário encontrado
 * 
 * @example
 * ```typescript
 * const user = await getPublicUserByCognitoSub('abc-123-def');
 * console.log(user.nickname);
 * ```
 */
export const getPublicUserByCognitoSub = async (
  cognitoSub: string
): Promise<PublicUser> => {
  const response = await publicClient.get(`/users/cognito/${cognitoSub}`);
  return response.data.data;
};
