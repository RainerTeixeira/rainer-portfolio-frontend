/**
 * @fileoverview Serviços Públicos de Autenticação
 * 
 * Contém funções para comunicação com endpoints públicos de autenticação.
 * Não requer autenticação prévia.
 * 
 * @module lib/api/public/auth/auth
 */

import { publicClient } from '../../clients/public-client';
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
  const response = await publicClient.get('/auth/oauth/google', {
    params: { redirect_uri: redirectUri }
  });
  return response.data.data;
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
export const refreshTokenAuth = async (data: RefreshTokenData): Promise<AuthResponse> => {
  const response = await publicClient.post('/auth/refresh', data);
  return response.data.data;
};
