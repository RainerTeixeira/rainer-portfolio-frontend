/**
 * @fileoverview Serviços Públicos de Autenticação
 * 
 * Contém funções para comunicação com endpoints públicos de autenticação.
 * Não requer autenticação prévia.
 * 
 * @module lib/api/public/auth/auth
 */

import { publicClient } from '../../clients/public-client';
import { getToken, hasToken, removeToken } from '@/lib/utils';
import {
  LoginCredentials,
  SignupData,
  ConfirmEmailData,
  ForgotPasswordData,
  ResetPasswordData,
  RefreshTokenData,
  OAuthCallbackData,
  AuthResponse,
  SignupResponse,
  ConfirmEmailResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
  OAuthUrlResponse,
} from '../../types/public/auth';

/**
 * Realiza login do usuário com email e senha
 * 
 * @param credentials - Credenciais de login (email e senha)
 * @returns Promise<AuthResponse> - Dados de autenticação e usuário
 * 
 * @example
 * ```typescript
 * const authData = await login({
 *   email: 'usuario@example.com',
 *   password: 'Senha123!'
 * });
 * 
 * // Salvar tokens
 * localStorage.setItem('accessToken', authData.accessToken);
 * localStorage.setItem('refreshToken', authData.refreshToken);
 * ```
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await publicClient.post('/auth/login', credentials);
  return response.data.data;
};

/**
 * Registra um novo usuário na plataforma
 * 
 * @param userData - Dados de registro do usuário
 * @returns Promise<SignupResponse> - Confirmação do registro
 * 
 * @example
 * ```typescript
 * const resultado = await register({
 *   email: 'novo@example.com',
 *   password: 'Senha123!',
 *   fullName: 'Novo Usuário',
 *   nickname: 'novo'
 * });
 * 
 * if (resultado.requiresConfirmation) {
 *   console.log('Verifique seu email para confirmar o cadastro');
 * }
 * ```
 */
export const register = async (userData: SignupData): Promise<SignupResponse> => {
  const response = await publicClient.post('/auth/register', userData);
  return response.data;
};

/**
 * Confirma o email do usuário com código recebido
 * 
 * @param data - Dados para confirmação (email e token)
 * @returns Promise<ConfirmEmailResponse> - Status da confirmação
 * 
 * @example
 * ```typescript
 * const resultado = await confirmEmail({
 *   email: 'usuario@example.com',
 *   token: '123456'
 * });
 * 
 * if (resultado.confirmed) {
 *   console.log('Email confirmado com sucesso!');
 * }
 * ```
 */
export const confirmEmail = async (data: ConfirmEmailData): Promise<ConfirmEmailResponse> => {
  const response = await publicClient.post('/auth/confirm-email', data);
  return response.data;
};

export const resendConfirmationCode = async (data: { email: string }): Promise<void> => {
  await publicClient.post('/auth/resend-confirmation-code', data);
};

/**
 * Inicia processo de recuperação de senha
 * 
 * @param data - Email do usuário
 * @returns Promise<ForgotPasswordResponse> - Confirmação de envio
 * 
 * @example
 * ```typescript
 * const resultado = await forgotPassword({
 *   email: 'usuario@example.com'
 * });
 * 
 * if (resultado.emailSent) {
 *   console.log('Email de recuperação enviado!');
 * }
 * ```
 */
export const forgotPassword = async (data: ForgotPasswordData): Promise<ForgotPasswordResponse> => {
  const response = await publicClient.post('/auth/forgot-password', data);
  return response.data;
};

/**
 * Redefine a senha do usuário com código de recuperação
 * 
 * @param data - Dados para redefinição (email, token e nova senha)
 * @returns Promise<ResetPasswordResponse> - Status da redefinição
 * 
 * @example
 * ```typescript
 * const resultado = await resetPassword({
 *   email: 'usuario@example.com',
 *   token: '123456',
 *   newPassword: 'NovaSenha123!'
 * });
 * 
 * if (resultado.reset) {
 *   console.log('Senha redefinida com sucesso!');
 * }
 * ```
 */
export const resetPassword = async (data: ResetPasswordData): Promise<ResetPasswordResponse> => {
  const response = await publicClient.post('/auth/reset-password', data);
  return response.data;
};

/**
 * Obtém URL para login com Google OAuth
 * 
 * @param redirectUri - URL de redirecionamento após login (opcional)
 * @returns Promise<OAuthUrlResponse> - URL de autenticação OAuth
 * 
 * @example
 * ```typescript
 * const { authUrl } = await getGoogleOAuthUrl();
 * 
 * // Redirecionar usuário para URL de autenticação
 * window.location.href = authUrl;
 * ```
 */
export const getGoogleOAuthUrl = async (redirectUri?: string): Promise<OAuthUrlResponse> => {
  // Envia redirect_uri como query param (objeto direto vira query string)
  const response = await publicClient.get('/auth/oauth/google', {
    redirect_uri: redirectUri,
  });

  // O cliente público já retorna JSON; a API pode envolver em { data }
  const data = (response as any)?.data ?? response;
  return (data as any)?.data ?? data;
};

/**
 * Processa callback do OAuth Google
 * 
 * @param data - Dados do callback (código e estado)
 * @returns Promise<AuthResponse> - Dados de autenticação
 * 
 * @example
 * ```typescript
 * // Na página de callback
 * const urlParams = new URLSearchParams(window.location.search);
 * const code = urlParams.get('code');
 * const state = urlParams.get('state');
 * 
 * if (code) {
 *   const authData = await handleOAuthCallback({ code, state });
 *   // Salvar tokens e redirecionar
 * }
 * ```
 */
export const handleOAuthCallback = async (data: OAuthCallbackData): Promise<AuthResponse> => {
  const response = await publicClient.get('/auth/oauth/callback', { params: data });
  return response.data.data;
};

/**
 * Renova os tokens de acesso usando refresh token
 * 
 * @param data - Refresh token
 * @returns Promise<AuthResponse> - Novos tokens de autenticação
 * 
 * @example
 * ```typescript
 * const refreshToken = localStorage.getItem('refreshToken');
 * if (refreshToken) {
 *   const authData = await refreshTokenAuth({ refreshToken });
 *   
 *   // Atualizar tokens
 *   localStorage.setItem('accessToken', authData.accessToken);
 *   localStorage.setItem('refreshToken', authData.refreshToken);
 * }
 * ```
 */
// Métodos de compatibilidade para o useAuth hook
export const getIdToken = (): string | null => {
  return getToken();
};

export const getAccessToken = (): string | null => {
  return getToken();
};

export const isAuthenticated = (): boolean => {
  return hasToken();
};

export const getUserProfile = async (): Promise<import('../../types/public/users').User> => {
  // TODO: Implementar busca de perfil do usuário
  // Por enquanto, retorna um perfil básico
  throw new Error('getUserProfile não implementado');
};

export const logout = async (): Promise<void> => {
  removeToken();
};

export const updateNickname = async (cognitoSub: string, nickname: string): Promise<void> => {
  // TODO: Implementar atualização de nickname
  console.log('updateNickname não implementado', { cognitoSub, nickname });
};

export const checkNickname = async (nickname: string, excludeCognitoSub?: string): Promise<boolean> => {
  // TODO: Implementar verificação de disponibilidade de nickname
  console.log('checkNickname não implementado', { nickname, excludeCognitoSub });
  // Por enquanto, assume que está disponível
  return true;
};

export const initiatePasswordless = async (email: string): Promise<any> => {
  // TODO: Implementar passwordless initiation
  console.log('initiatePasswordless não implementado', { email });
  return { success: true };
};

export const verifyEmailAdmin = async (identifier: string): Promise<{ success: boolean; message?: string; data?: any }> => {
  // TODO: Implementar verificação de email admin
  console.log('verifyEmailAdmin não implementado', { identifier });
  throw new Error('verifyEmailAdmin não implementado');
};

export const verifyPasswordless = async (
  email: string,
  code: string,
  session?: string
): Promise<{ user: import('../../types/public/users').User }> => {
  // TODO: Implementar passwordless verification
  console.log('verifyPasswordless não implementado', { email, code, session });
  throw new Error('verifyPasswordless não implementado');
};

export const exchangeOAuthCodeViaBackend = async (
  provider: 'google' | 'github',
  code: string,
  state?: string
): Promise<{ accessToken: string; refreshToken: string; idToken?: string; user?: import('../../types/public/users').User }> => {
  const response = await publicClient.get('/auth/oauth/callback', {
    params: { provider, code, state },
  });
  return response.data?.data ?? response.data;
};

export const loginWithGoogle = async (redirectUri?: string): Promise<void> => {
  if (typeof window === 'undefined') {
    throw new Error('loginWithGoogle só pode ser chamado no cliente');
  }

  const finalRedirect =
    redirectUri || `${window.location.origin}/auth/callback`;

  const response = await getGoogleOAuthUrl(finalRedirect);
  const data = (response as any)?.data ?? response;
  const authUrl = (data as any)?.authUrl ?? (data as any)?.data?.authUrl;

  if (!authUrl || typeof authUrl !== 'string') {
    throw new Error('URL de autenticação do Google não recebida da API');
  }

  window.location.href = authUrl;
};

export const loginWithEmail = async (
  email: string,
  password: string
): Promise<{ user: import('../../types/public/users').User }> => {
  // TODO: Implementar login with email
  console.log('loginWithEmail não implementado', { email, password });
  throw new Error('loginWithEmail não implementado');
};

export const getCognitoUserFromToken = (): any => {
  // TODO: Implementar parsing do token JWT
  const token = getToken();
  if (!token) return null;
  
  try {
    // Decodificar token JWT (implementação básica)
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const base64Url = parts[1];
    if (!base64Url) return null;
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.warn('Erro ao decodificar token:', error);
    return null;
  }
};

export const refreshTokenAuth = async (data: RefreshTokenData): Promise<AuthResponse> => {
  const response = await publicClient.post('/auth/refresh', data);
  return response.data.data;
};
