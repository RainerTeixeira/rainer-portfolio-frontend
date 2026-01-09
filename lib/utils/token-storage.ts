/**
 * @fileoverview Token Storage Utils
 * 
 * Re-exports de funções de gerenciamento de tokens da biblioteca @rainersoft/utils
 * Migrado para a biblioteca para reutilização em outros projetos.
 * 
 * @module lib/utils/token-storage
 * @version 2.0.0
 */

/**
 * Re-export de todas as funções de token storage
 * Migradas para @rainersoft/utils
 */
export {
  getToken,
  setToken,
  getRefreshToken,
  setRefreshToken,
  removeToken,
  hasToken,
  getTokens,
  setTokens
} from '@rainersoft/utils';
