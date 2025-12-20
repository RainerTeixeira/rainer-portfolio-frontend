/**
 * @fileoverview Tipos para APIs Públicas de Autenticação
 * 
 * Define os tipos TypeScript utilizados para comunicação com os endpoints
 * públicos de autenticação (login, registro, etc.).
 * 
 * @module lib/api/types/public/auth
 */

/**
 * Interface para dados de login
 */
export interface LoginCredentials {
  /** Email do usuário */
  email: string;
  /** Senha do usuário */
  password: string;
}

/**
 * Interface para dados de registro
 */
export interface SignupData {
  /** Email do usuário */
  email: string;
  /** Senha do usuário */
  password: string;
  /** Nome completo do usuário */
  fullName: string;
  /** Apelido/nickname (opcional) */
  nickname?: string;
}

/**
 * Interface para confirmação de email
 */
export interface ConfirmEmailData {
  /** Email do usuário */
  email: string;
  /** Código de confirmação */
  token: string;
}

/**
 * Interface para recuperação de senha
 */
export interface ForgotPasswordData {
  /** Email do usuário */
  email: string;
}

/**
 * Interface para redefinição de senha
 */
export interface ResetPasswordData {
  /** Email do usuário */
  email: string;
  /** Código de recuperação */
  token: string;
  /** Nova senha */
  newPassword: string;
}

/**
 * Interface para refresh token
 */
export interface RefreshTokenData {
  /** Token de atualização */
  refreshToken: string;
}

/**
 * Interface para dados do usuário retornados após login
 */
export interface AuthUser {
  /** ID único do usuário */
  id: string;
  /** Email do usuário */
  email: string;
  /** Nome completo */
  fullName: string;
  /** Apelido/nickname */
  nickname: string;
  /** Papel do usuário */
  role: 'ADMIN' | 'USER';
  /** Status do usuário */
  isActive: boolean;
  /** Data de criação */
  createdAt: string;
  /** Último login */
  lastLoginAt?: string;
}

/**
 * Interface para resposta de autenticação
 */
export interface AuthResponse {
  /** Token de acesso JWT */
  accessToken: string;
  /** Token de atualização JWT */
  refreshToken: string;
  /** Token ID JWT */
  idToken?: string;
  /** Tempo de expiração em segundos */
  expiresIn: number;
  /** Tipo do token */
  tokenType: 'Bearer';
  /** Dados do usuário */
  user: AuthUser;
}

/**
 * Interface para resposta de registro
 */
export interface SignupResponse {
  /** Mensagem de sucesso */
  message: string;
  /** ID do usuário criado */
  userId: string;
  /** Indica se precisa confirmar email */
  requiresConfirmation: boolean;
}

/**
 * Interface para resposta de confirmação de email
 */
export interface ConfirmEmailResponse {
  /** Mensagem de sucesso */
  message: string;
  /** Status da confirmação */
  confirmed: boolean;
}

/**
 * Interface para resposta de recuperação de senha
 */
export interface ForgotPasswordResponse {
  /** Mensagem de sucesso */
  message: string;
  /** Indica se o email foi enviado */
  emailSent: boolean;
}

/**
 * Interface para resposta de redefinição de senha
 */
export interface ResetPasswordResponse {
  /** Mensagem de sucesso */
  message: string;
  /** Status da redefinição */
  reset: boolean;
}

/**
 * Interface para URL de OAuth
 */
export interface OAuthUrlResponse {
  /** URL de autenticação OAuth */
  authUrl: string;
  /** Estado CSRF */
  state?: string;
}

/**
 * Interface para callback OAuth
 */
export interface OAuthCallbackData {
  /** Código de autorização */
  code: string;
  /** Estado CSRF */
  state?: string;
}

/**
 * Interface para resposta de erro de autenticação
 */
export interface AuthError {
  /** Código do erro */
  code: string;
  /** Mensagem de erro */
  message: string;
  /** Detalhes adicionais */
  details?: any;
}
