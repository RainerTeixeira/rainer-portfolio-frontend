/**
 * @fileoverview Utilitários para Gerenciamento de Tokens
 * 
 * Funções para armazenar, recuperar e remover tokens de autenticação
 * do localStorage ou cookies.
 * 
 * @module lib/auth/token-utils
 */

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

/**
 * Obtém o token de acesso armazenado
 * 
 * @returns string | null - Token JWT ou null se não encontrado
 */
export const getToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Define o token de acesso
 * 
 * @param token - Token JWT a ser armazenado
 */
export const setToken = (token: string): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Obtém o refresh token armazenado
 * 
 * @returns string | null - Refresh token ou null se não encontrado
 */
export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Define o refresh token
 * 
 * @param refreshToken - Refresh token a ser armazenado
 */
export const setRefreshToken = (refreshToken: string): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

/**
 * Remove todos os tokens armazenados
 */
export const removeToken = (): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

/**
 * Verifica se há um token válido armazenado
 * 
 * @returns boolean - True se token existe
 */
export const hasToken = (): boolean => {
  return !!getToken();
};

/**
 * Obtém os tokens como objeto
 * 
 * @returns object - Com accessToken e refreshToken
 */
export const getTokens = (): {
  accessToken: string | null;
  refreshToken: string | null;
} => {
  return {
    accessToken: getToken(),
    refreshToken: getRefreshToken(),
  };
};

/**
 * Define ambos os tokens de uma vez
 * 
 * @param accessToken - Token de acesso
 * @param refreshToken - Token de refresh
 */
export const setTokens = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}): void => {
  setToken(accessToken);
  setRefreshToken(refreshToken);
};
