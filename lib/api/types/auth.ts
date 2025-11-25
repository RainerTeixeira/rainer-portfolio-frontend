/**
 * Tipos da camada de Autenticação do frontend.
 *
 * Observação: Estes tipos refletem o contrato esperado pela API
 * e são reutilizados em serviços e formulários.
 */

/**
 * Dados para registro de usuário.
 */
export interface RegisterData {
  readonly email: string;
  readonly password: string;
  readonly fullName: string;
  readonly nickname: string;
  // Campo mantido para compatibilidade com versões antigas, mas não deve ser mais usado
  // Use 'nickname' em vez disso
  readonly username?: string;
  readonly phoneNumber?: string;
  readonly avatar?: string;
}

/**
 * Credenciais de login.
 */
export interface LoginData {
  readonly email: string;
  readonly password: string;
}

/**
 * Dados para confirmação de e-mail.
 */
export interface ConfirmEmailData {
  readonly email: string;
  readonly username: string;
  readonly code: string;
}

/**
 * Payload para renovação de token.
 */
export interface RefreshTokenData {
  readonly refreshToken: string;
}

/**
 * Dados para solicitar recuperação de senha.
 */
export interface ForgotPasswordData {
  readonly email: string;
}

/**
 * Dados para redefinição de senha.
 */
export interface ResetPasswordData {
  readonly email: string;
  readonly code: string;
  readonly newPassword: string;
}

/**
 * Resposta de inicialização de login sem senha.
 */
export interface PasswordlessInitResponse {
  readonly success: boolean;
  readonly message?: string;
}

/**
 * Resposta de verificação de login sem senha.
 */
export interface PasswordlessVerifyResponse {
  readonly success: boolean;
  readonly token?: string;
  readonly refreshToken?: string;
  readonly message?: string;
}
