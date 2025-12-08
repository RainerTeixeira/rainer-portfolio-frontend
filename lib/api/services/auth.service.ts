// ============================================================================
// Serviço de Autenticação - Integração com API do Backend
// ============================================================================

/**
 * Serviço para gerenciar autenticação via AWS Cognito
 *
 * @fileoverview Serviço de autenticação com métodos para login, registro e recuperação
 * @author Rainer Teixeira
 * @version 2.0.0
 */

import { api, ApiError } from '../client';
import { logApiError } from '../utils/debug-utils';
import type {
  ApiResponse,
  ApiSuccessResponse,
  ConfirmEmailData,
  ForgotPasswordData,
  LoginData,
  RefreshTokenData,
  RegisterData,
  ResetPasswordData,
  User,
} from '../types';
import { UserRole } from '../types/users';

// ============================================================================
// Interfaces de Resposta
// ============================================================================

export interface AuthTokens {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly idToken: string;
  readonly expiresIn: number;
  readonly tokenType: string;
}

export interface LoginResponse {
  readonly tokens: AuthTokens;
  readonly user: User;
}

export interface RegisterResponse {
  readonly userId: string;
  readonly cognitoSub?: string;
  readonly email: string;
  readonly fullName?: string;
  readonly username?: string; // Username gerado pelo backend
  readonly nickname?: string;
  readonly message: string;
  readonly emailVerificationRequired?: boolean;
  readonly requiresEmailConfirmation?: boolean; // Mantido para compatibilidade
  readonly tokens?: AuthTokens;
}

export interface PasswordlessInitResponse {
  readonly success: boolean;
  readonly message: string;
  readonly session?: string;
}

export type PasswordlessVerifyResponse = LoginResponse;

// ============================================================================
// Types
// ============================================================================

/**
 * Tipo para payload JWT
 */
interface JwtPayload {
  sub?: string;
  email?: string;
  'cognito:username'?: string;
  exp?: number;
  [key: string]: unknown;
}

// ============================================================================
// Classe do Serviço
// ============================================================================

/**
 * Serviço responsável por gerenciar autenticação e autorização
 * @class AuthService
 */
export class AuthService {
  private readonly basePath = '/auth';
  private readonly context = 'AuthService';

  // Token management
  /**
   * Recupera o accessToken do storage (browser).
   */
  public getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
  }

  /**
   * Recupera o idToken do storage (browser).
   * Usado para extrair claims completas do Cognito (email, nickname, etc.).
   */
  public getIdToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('idToken');
  }

  private getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refreshToken');
  }

  /**
   * Persiste os tokens recebidos no storage do navegador.
   */
  public setTokens(tokens: AuthTokens): void {
    if (typeof window === 'undefined') return;

    localStorage.setItem('accessToken', tokens.accessToken);
    if (tokens.refreshToken) {
      localStorage.setItem('refreshToken', tokens.refreshToken);
    }
    if (tokens.idToken) {
      localStorage.setItem('idToken', tokens.idToken);
    }
    if (tokens.expiresIn) {
      localStorage.setItem(
        'tokenExpiresAt',
        (Date.now() + tokens.expiresIn * 1000).toString()
      );
    }
  }

  /**
   * Remove todos os tokens e metadados do storage (logout local).
   */
  public clearTokens(): void {
    if (typeof window === 'undefined') return;

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('tokenExpiresAt');
    localStorage.removeItem('userId');
  }

  /**
   * Decodifica um JWT sem validação de assinatura (uso client-side).
   */
  private decodeToken(token: string): JwtPayload | null {
    try {
      const parts = token.split('.');
      if (parts.length < 2) return null;
      const base64Url = parts[1];
      if (!base64Url) return null;

      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload) as JwtPayload;
    } catch {
      if (process.env.NODE_ENV === 'development') {
        console.error('Erro ao decodificar token');
      }
      return null;
    }
  }

  /**
   * Indica se o token está expirado pelo campo `exp`.
   */
  private isTokenExpired(token: string | null): boolean {
    if (!token) return true;

    const decodedToken = this.decodeToken(token);
    if (!decodedToken) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    const exp = decodedToken.exp;
    if (!exp) return true;
    return exp < currentTime;
  }

  /**
   * Extrai dados do Cognito do token JWT (método público para testes).
   * Retorna o payload decodificado do token ou null se não houver token.
   */
  public getCognitoUserFromToken(): JwtPayload | null {
    // Preferir o idToken (que contém claims completas como email/nickname)
    const token = this.getIdToken() || this.getAccessToken();
    if (!token) return null;
    return this.decodeToken(token);
  }

  /**
   * Extrai um perfil mínimo do usuário a partir do token.
   */
  private getUserFromToken(token: string): User | null {
    if (!token) return null;

    const decodedToken = this.decodeToken(token);
    if (!decodedToken) return null;

    // O sub é o identificador único no Cognito
    const cognitoSub = decodedToken.sub || '';

    // Extrair nickname do token (ao invés de usar identities)
    // O nickname vem do Cognito como atributo customizado
    const nickname =
      decodedToken['nickname'] ||
      decodedToken['custom:nickname'] ||
      decodedToken['cognito:username'] ||
      undefined;

    // Processar campos opcionais
    const avatar = decodedToken['avatar']
      ? String(decodedToken['avatar'])
      : undefined;
    const bio = decodedToken['bio'] ? String(decodedToken['bio']) : undefined;
    const website = decodedToken['website']
      ? String(decodedToken['website'])
      : undefined;

    let socialLinks: Record<string, string> | undefined;
    if (decodedToken['socialLinks']) {
      try {
        socialLinks =
          typeof decodedToken['socialLinks'] === 'string'
            ? JSON.parse(decodedToken['socialLinks'])
            : decodedToken['socialLinks'];
      } catch (e) {
        console.warn('Failed to parse socialLinks', e);
      }
    }

    // Criar um perfil básico a partir do token com todos os campos necessários
    // Nota: User não tem nickname, apenas UserProfile tem
    if (!cognitoSub) {
      throw new Error(
        'Cognito sub não encontrado no token (serviço de autenticação)'
      );
    }

    const cognitoGroups = decodedToken['cognito:groups'];
    const groupsArray = Array.isArray(cognitoGroups) ? cognitoGroups : [];
    const userRole = (groupsArray[0] as UserRole) || UserRole.SUBSCRIBER;

    const fullNameValue =
      (decodedToken['fullName'] as string | undefined) ||
      (decodedToken.fullName as string | undefined) ||
      nickname ||
      '';
    const fullName: string =
      typeof fullNameValue === 'string' ? fullNameValue : '';

    const iat = decodedToken.iat;
    const createdAtTimestamp =
      typeof iat === 'number' ? iat * 1000 : Date.now();

    const user: User = {
      id: cognitoSub, // Usamos o sub como ID único
      cognitoSub, // Mantemos uma referência ao sub do Cognito
      fullName,
      role: userRole,
      isActive: true,
      isBanned: false,
      postsCount: 0,
      commentsCount: 0,
      createdAt: new Date(createdAtTimestamp).toISOString(),
      updatedAt: new Date().toISOString(),
      avatar: avatar || undefined,
      bio: bio || undefined,
      website: website || undefined,
      socialLinks: socialLinks || undefined,
    };

    return user;
  }

  /**
   * Registra um novo usuário no sistema
   * O identificador único será o cognitoSub gerado pelo Cognito
   */
  async register(data: RegisterData): Promise<RegisterResponse> {
    console.log(`[${this.context}] register - Iniciando registro`, {
      email: data.email,
      fullName: data.fullName,
      // O nickname é opcional e apenas para exibição
      nickname: data.nickname || data.fullName?.split(' ')[0] || 'Usuário',
    });

    try {
      const response = await api.post<ApiResponse<RegisterResponse>>(
        `${this.basePath}/register`,
        data,
        {
          timeout: 60000,
          retries: 2,
          retryDelay: 1000,
        }
      );

      if (response.success) {
        const registerResponse = (
          response as ApiSuccessResponse<RegisterResponse>
        ).data;

        // O userId retornado é o cognitoSub do Cognito
        // Este cognitoSub já foi usado para criar o usuário no Prisma durante o registro
        console.log(`[${this.context}] register - Registro bem-sucedido`, {
          userId: registerResponse.userId, // cognitoSub
          email: registerResponse.email,
          username: registerResponse.username,
        });

        // Salva o cognitoSub no localStorage para uso posterior
        // Este será o mesmo usado no Prisma como chave primária
        if (registerResponse.userId && typeof window !== 'undefined') {
          localStorage.setItem('userId', registerResponse.userId);
          console.log(
            `[${this.context}] register - CognitoSub salvo no localStorage: ${registerResponse.userId}`
          );
        }

        // Save tokens if available in the response
        if (registerResponse.tokens) {
          this.setTokens(registerResponse.tokens);
        }

        return registerResponse;
      }

      const errorMessage =
        response.message ||
        'Erro ao registrar usuário (serviço de autenticação)';
      logApiError(new Error(errorMessage), this.context, {
        operation: 'register',
        email: data.email,
        nickname: data.nickname,
      });

      throw new Error(errorMessage);
    } catch (error) {
      logApiError(error, this.context, {
        operation: 'register',
        email: data.email,
        nickname: data.nickname,
      });
      throw error;
    }
  }

  /**
   * Troca o código OAuth via backend (POST /auth/oauth/:provider/callback)
   */
  async exchangeOAuthCodeViaBackend(
    provider: 'google' | 'github',
    code: string,
    state?: string
  ): Promise<AuthTokens> {
    const endpoint = `/auth/oauth/${provider}/callback`;
    const redirectUri =
      process.env.NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN ||
      (typeof window !== 'undefined'
        ? `${window.location.origin}/dashboard/login/callback`
        : undefined);

    console.log(
      `[${this.context}] exchangeOAuthCodeViaBackend - Trocando código por tokens`,
      {
        provider,
        endpoint,
        redirectUri,
        hasState: !!state,
      }
    );

    const response = await api.post<ApiResponse<LoginResponse>>(
      endpoint,
      { code, state, redirectUri },
      { timeout: 30000 }
    );

    if (!response.success) {
      const errorMessage =
        response.message ||
        `Erro ao trocar código OAuth via backend (provider=${provider})`;
      logApiError(new Error(errorMessage), this.context, {
        operation: 'exchangeOAuthCodeViaBackend',
        provider,
        endpoint,
      });
      throw new Error(errorMessage);
    }

    const data = (response as ApiSuccessResponse<LoginResponse>).data;
    // Salvar tokens do backend
    this.setTokens(data.tokens);
    return data.tokens;
  }

  /**
   * Confirma o email do usuário
   * @param {ConfirmEmailData} data - Dados de confirmação de email
   * @returns {Promise<ApiResponse<void>>} Resposta da confirmação
   */
  async confirmEmail(data: ConfirmEmailData): Promise<ApiResponse<void>> {
    console.log(
      `[${this.context}] confirmEmail - Iniciando confirmação de email`,
      {
        email: data.email,
        username: data.username,
      }
    );

    try {
      const response = await api.post<ApiResponse<void>>(
        `${this.basePath}/confirm-email`,
        data,
        {
          timeout: 30000, // 30 segundos para confirmação de email
          retries: 1, // Apenas 1 tentativa para evitar duplicação
        }
      );

      console.log(
        `[${this.context}] confirmEmail - Email confirmado com sucesso`,
        {
          email: data.email,
        }
      );

      return response;
    } catch (error) {
      logApiError(error, this.context, {
        operation: 'confirmEmail',
        email: data.email,
        username: data.username,
      });
      throw error;
    }
  }

  /**
   * Reenvia o código de confirmação
   */
  async resendConfirmationCode(data: {
    email: string;
  }): Promise<ApiResponse<void>> {
    console.log(
      `[${this.context}] resendConfirmationCode - Reenviando código`,
      {
        email: data.email,
      }
    );

    try {
      const response = await api.post<ApiResponse<void>>(
        `${this.basePath}/resend-confirmation-code`,
        data,
        { timeout: 30000 }
      );

      console.log(
        `[${this.context}] resendConfirmationCode - Código reenviado com sucesso`
      );
      return response;
    } catch (error) {
      logApiError(error, this.context, {
        operation: 'resendConfirmationCode',
        email: data.email,
      });
      throw error;
    }
  }

  /**
   * Realiza login do usuário
   */
  async login(data: LoginData): Promise<LoginResponse> {
    console.log(`[${this.context}] login - Iniciando login`, {
      email: data.email,
    });

    try {
      const response = await api.post<ApiResponse<LoginResponse>>(
        `${this.basePath}/login`,
        data
      );

      if (!response.success) {
        throw new Error(
          response.message ||
          'Erro ao realizar login (serviço de autenticação)'
        );
      }

      const loginResponse = (response as ApiSuccessResponse<LoginResponse>)
        .data;

      // Salvar tokens
      this.setTokens(loginResponse.tokens);

      if (loginResponse.user.cognitoSub) {
        localStorage.setItem('userId', loginResponse.user.cognitoSub);
      }

      console.log(`[${this.context}] login - Login bem-sucedido`, {
        userId: loginResponse.user.cognitoSub,
      });

      return loginResponse;
    } catch (error) {
      // Tratamento específico para erros de timeout / serviço indisponível / backend ou DB offline
      if (error instanceof ApiError) {
        const message = (error.message || '').toLowerCase();

        const isTimeoutStatus = error.status === 0 || error.status === 503;
        const isTimeoutMessage =
          message.includes('tempo limite excedido') ||
          message.includes('timeout') ||
          message.includes('server selection timeout') ||
          message.includes('nenhuma conexão pôde ser feita') ||
          message.includes('econnrefused');

        if (isTimeoutStatus || isTimeoutMessage) {
          const friendlyMessage =
            'O serviço de autenticação está temporariamente indisponível. Tente novamente em alguns instantes.';

          const enhancedError = new ApiError(
            error.status || 503,
            friendlyMessage,
            error.data,
            error.url,
            error.method,
            error.endpoint
          );

          // Em desenvolvimento, logar como warning (não como erro crítico) para evitar ruído excessivo
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.warn(
              `[${this.context}] login - Serviço indisponível (timeout/DB off)`,
              {
                status: error.status,
                url: error.url,
                endpoint: error.endpoint,
                method: error.method,
                originalMessage: error.message,
              }
            );
          }

          return Promise.reject(enhancedError);
        }
      }

      // Tratamento específico para erros 401 (credenciais inválidas)
      if (error instanceof ApiError && error.status === 401) {
        // Interface para ApiError com suggestions (adicionado dinamicamente)
        interface ApiErrorWithSuggestions extends ApiError {
          suggestions?: string[];
        }

        // Cria um erro mais descritivo com sugestões
        const enhancedError = new ApiError(
          401,
          error.message || 'Email ou senha incorretos',
          error.data,
          error.url,
          error.method,
          error.endpoint
        ) as ApiErrorWithSuggestions;

        enhancedError.suggestions = [
          'Verifique se o email está correto',
          'Verifique se a senha está correta',
          'Certifique-se de que a conta foi confirmada',
          'Se você esqueceu a senha, use a opção "Esqueci minha senha"',
          'Se o problema persistir, pode ser necessário usar o username ao invés do email',
        ];

        logApiError(enhancedError, this.context, {
          operation: 'login',
          email: data.email,
          suggestions: enhancedError.suggestions,
        });
        throw enhancedError;
      }

      // Tratamento específico para erros 500 (erro interno do servidor)
      if (error instanceof ApiError && error.status === 500) {
        // Interface para ApiError com suggestions (adicionado dinamicamente)
        interface ApiErrorWithSuggestions extends ApiError {
          suggestions?: string[];
        }

        // Extrair informações adicionais da resposta do servidor
        const errorData = error.data as Record<string, unknown> | undefined;
        const serverMessage =
          (errorData?.message as string) ||
          (errorData?.error as string) ||
          error.message;

        // Caso específico: fluxo USER_PASSWORD_AUTH não habilitado no Cognito
        const isUserPasswordFlowDisabled =
          typeof serverMessage === 'string' &&
          serverMessage.includes(
            'USER_PASSWORD_AUTH flow not enabled for this client'
          );

        // Construir mensagem amigável para o usuário final
        let errorMessage = 'Erro interno do servidor ao realizar login';

        if (isUserPasswordFlowDisabled) {
          errorMessage =
            'Login com email e senha está temporariamente indisponível por uma configuração interna do serviço de autenticação. ' +
            'Você pode tentar novamente mais tarde ou utilizar outra forma de login (como Google ou GitHub), se disponível.';
        } else if (serverMessage && serverMessage !== 'Internal Server Error') {
          // Para outros erros 500, reaproveita a mensagem do backend quando for mais específica
          errorMessage = serverMessage;
        } else {
          errorMessage =
            'Erro interno do servidor (500). O backend retornou um erro ao tentar realizar o login.';
        }

        const enhancedError = new ApiError(
          500,
          errorMessage,
          error.data,
          error.url,
          error.method,
          error.endpoint
        ) as ApiErrorWithSuggestions;

        // Suggestions mais úteis para o usuário final, com caso específico do Cognito
        enhancedError.suggestions = isUserPasswordFlowDisabled
          ? [
              'Este é um problema temporário de configuração do serviço de autenticação (Cognito).',
              'Tente novamente em alguns minutos.',
              'Se disponível, use uma forma alternativa de login (por exemplo, Google ou GitHub).',
              'Se o problema persistir, entre em contato com o suporte técnico.',
            ]
          : [
              'O servidor está enfrentando problemas temporários.',
              'Verifique se o backend está rodando corretamente em http://localhost:4000.',
              'Verifique os logs do servidor backend para mais detalhes.',
              'Tente novamente em alguns instantes.',
              'Se o problema persistir, entre em contato com o suporte técnico.',
            ];

        logApiError(enhancedError, this.context, {
          operation: 'login',
          email: data.email,
          status: 500,
          url: error.url,
          endpoint: error.endpoint,
          method: error.method,
          responseData: error.data,
          serverMessage,
          suggestions: enhancedError.suggestions,
        });
        throw enhancedError;
      }

      logApiError(error, this.context, {
        operation: 'login',
        email: data.email,
      });
      throw error;
    }
  }

  /**
   * Realiza login com email e senha usando o fluxo padrão de login
   * Mantido como helper para compatibilidade com hooks que esperam loginWithEmail
   */
  async loginWithEmail(email: string, password: string): Promise<LoginResponse> {
    console.log(`[${this.context}] loginWithEmail - Iniciando login com email`, {
      email,
    });

    return this.login({ email, password });
  }

  /**
   * Renova token de acesso
   */
  async refreshToken(data: RefreshTokenData): Promise<AuthTokens> {
    console.log(`[${this.context}] refreshToken - Renovando token`);

    try {
      const response = await api.post<ApiResponse<AuthTokens>>(
        `${this.basePath}/refresh`,
        data,
        { timeout: 30000 }
      );

      if (response.success) {
        const tokens = (response as ApiSuccessResponse<AuthTokens>).data;
        this.setTokens(tokens);
        console.log(
          `[${this.context}] refreshToken - Token renovado com sucesso`
        );
        return tokens;
      }

      const errorMessage =
        response.message ||
        'Erro ao renovar token de autenticação (refreshToken, serviço de autenticação)';
      logApiError(new Error(errorMessage), this.context, {
        operation: 'refreshToken',
      });
      throw new Error(errorMessage);
    } catch (error) {
      logApiError(error, this.context, {
        operation: 'refreshToken',
      });
      throw error;
    }
  }

  /**
   * Redefine senha do usuário
   */
  async resetPassword(data: ResetPasswordData): Promise<ApiResponse<void>> {
    console.log(`[${this.context}] resetPassword - Redefinindo senha`);

    try {
      const response = await api.post<ApiResponse<void>>(
        `${this.basePath}/reset-password`,
        data,
        { timeout: 30000 }
      );

      console.log(
        `[${this.context}] resetPassword - Senha redefinida com sucesso`
      );
      return response;
    } catch (error) {
      logApiError(error, this.context, {
        operation: 'resetPassword',
      });
      throw error;
    }
  }

  /**
   * Verifica disponibilidade de nickname (apenas para exibição)
   * O identificador único continua sendo o cognitoSub
   */
  async checkNickname(
    nickname: string,
    excludeCognitoSub?: string
  ): Promise<boolean> {
    console.log(
      `[${this.context}] checkNickname - Verificando disponibilidade`,
      {
        nickname,
      }
    );

    try {
      const response = await api.post<ApiResponse<{ available: boolean }>>(
        `${this.basePath}/check-nickname`,
        { nickname, excludeCognitoSub },
        { timeout: 15000 }
      );

      if (response.success) {
        const isAvailable = (
          response as ApiSuccessResponse<{ available: boolean }>
        ).data.available;
        console.log(
          `[${this.context}] checkNickname - Disponibilidade verificada`,
          {
            nickname,
            available: isAvailable,
          }
        );
        return isAvailable;
      }

      if (process.env.NODE_ENV === 'development') {
        console.error(
          `[${this.context}] checkNickname - Erro ao verificar disponibilidade`,
          response
        );
      }
      return false;
    } catch (error) {
      logApiError(error, this.context, {
        operation: 'checkNickname',
        nickname,
      });
      return false;
    }
  }

  /**
   * Verifica disponibilidade de nome completo (MongoDB)
   */
  async checkName(fullName: string): Promise<boolean> {
    try {
      const response = await api.post<ApiResponse<{ available: boolean }>>(
        `${this.basePath}/check-fullName`,
        { fullName },
        { timeout: 15000 }
      );

      if (response.success) {
        const isAvailable = (
          response as ApiSuccessResponse<{ available: boolean }>
        ).data.available;
        return isAvailable;
      }

      return false;
    } catch (error) {
      logApiError(error, this.context, {
        operation: 'checkName',
        fullName,
      });
      return false;
    }
  }

  /**
   * Atualiza o nickname do usuário no Cognito
   * @param cognitoSub - ID único do usuário no Cognito (sub)
   * @param newNickname - Novo nickname a ser definido (apenas letras e números, 3-30 caracteres)
   * @returns Resposta da API
   */
  async updateNickname(
    cognitoSub: string,
    newNickname: string
  ): Promise<ApiResponse<void>> {
    console.log(
      `[${this.context}] updateNickname - Atualizando nickname no Cognito`,
      {
        cognitoSub,
        newNickname,
      }
    );

    try {
      // Usa o endpoint correto do backend: /auth/change-nickname
      const response = await api.post<ApiResponse<void>>(
        `${this.basePath}/change-nickname`,
        {
          cognitoSub,
          newNickname,
        },
        {
          timeout: 30000,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.success) {
        throw new Error(
          response.message ||
          'Falha ao atualizar o nickname no Cognito (serviço de autenticação)'
        );
      }

      console.log(
        `[${this.context}] updateNickname - Nickname atualizado com sucesso no Cognito`
      );

      // Atualiza o token de acesso para refletir as mudanças
      try {
        await this.refreshToken({
          refreshToken: this.getRefreshToken() || '',
        });
      } catch (refreshError) {
        console.warn(
          `[${this.context}] updateNickname - Erro ao atualizar token:`,
          refreshError
        );
        // Não interrompemos o fluxo principal se a atualização do token falhar
      }

      return response;
    } catch (error) {
      logApiError(error, this.context, {
        operation: 'updateNickname',
        cognitoSub,
        newNickname,
      });
      throw error;
    }
  }

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    const isAuthenticated = !!token && !this.isTokenExpired(token);

    console.log(
      `[${this.context}] isAuthenticated - Verificação de autenticação`,
      {
        hasToken: !!token,
        isAuthenticated,
      }
    );

    return isAuthenticated;
  }

  /**
        },
      },
    );

    if (!response.success) {
      throw new Error(
        response.message ||
        'Erro ao obter perfil do usuário (serviço de autenticação)'
      );
    }
  }

  /**
   * Obtém o perfil completo do usuário autenticado
   * Extrai o cognitoSub do token JWT e busca o usuário no endpoint correto
   * @returns {Promise<User>} Perfil completo do usuário
   * @throws {Error} Se não houver token de acesso ou se ocorrer um erro na requisição
   */
  async getUserProfile(): Promise<User> {
    console.log(`[${this.context}] getUserProfile - Obtendo perfil do usuário`);

    try {
      const token = this.getAccessToken();
      if (!token) {
        throw new Error(
          'Nenhum token de acesso encontrado (serviço de autenticação)'
        );
      }

      // Extrai o cognitoSub do token JWT
      const decodedToken = this.decodeToken(token);
      if (!decodedToken || !decodedToken.sub) {
        throw new Error(
          'Token inválido: não contém sub (cognitoSub, serviço de autenticação)'
        );
      }

      const cognitoSub = decodedToken.sub;

      // Busca o usuário usando o endpoint correto: /users/cognito/{cognitoSub}
      // NÃO USAR /auth/profile - esse endpoint não existe no backend
      const response = await api.get<ApiResponse<User>>(
        `/users/cognito/${cognitoSub}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.success) {
        throw new Error(
          response.message ||
          'Erro ao obter perfil do usuário (serviço de autenticação)'
        );
      }

      return (response as ApiSuccessResponse<User>).data;
    } catch (error) {
      logApiError(error, this.context, {
        operation: 'getUserProfile',
      });
      throw error;
    }
  }

  /**
   * Remove tokens do localStorage (logout)
   */
  public logout(): void {
    console.log(`[${this.context}] logout - Realizando logout`);
    this.clearTokens();
  }

  /**
   * Solicita recuperação de senha
   */
  async forgotPassword(data: ForgotPasswordData): Promise<ApiResponse<void>> {
    console.log(
      `[${this.context}] forgotPassword - Solicitando recuperação de senha`,
      {
        email: data.email,
      }
    );

    try {
      const response = await api.post<ApiResponse<void>>(
        `${this.basePath}/forgot-password`,
        data,
        { timeout: 30000 }
      );

      console.log(
        `[${this.context}] forgotPassword - Solicitação enviada com sucesso`
      );
      return response;
    } catch (error) {
      logApiError(error, this.context, {
        operation: 'forgotPassword',
        email: data.email,
      });
      throw error;
    }
  }

  /**
   * Verifica o e-mail do usuário administrativamente no Cognito.
   * Útil quando o usuário não consegue verificar o e-mail normalmente.
   *
   * @param identifier - ID do usuário no Cognito (sub), username ou email
   * @returns Resposta da API com informações de sucesso
   */
  async verifyEmailAdmin(
    identifier: string
  ): Promise<ApiResponse<{ username: string; email: string }>> {
    console.log(
      `[${this.context}] verifyEmailAdmin - Verificando e-mail administrativamente`,
      {
        identifier,
      }
    );

    try {
      const response = await api.post<
        ApiResponse<{ username: string; email: string }>
      >(
        `${this.basePath}/verify-email-admin`,
        { identifier },
        { timeout: 30000 }
      );

      console.log(
        `[${this.context}] verifyEmailAdmin - E-mail verificado com sucesso`,
        {
          identifier,
        }
      );
      return response;
    } catch (error) {
      logApiError(error, this.context, {
        operation: 'verifyEmailAdmin',
        identifier,
      });
      throw error;
    }
  }

  /**
   * Inicia o fluxo de autenticação passwordless
   * Envia um código de 6 dígitos para o email do usuário
   *
   * @param email - Email do usuário
   * @returns Resposta com mensagem de sucesso
   */
  async initiatePasswordless(email: string): Promise<PasswordlessInitResponse> {
    console.log(
      `[${this.context}] initiatePasswordless - Iniciando autenticação passwordless`,
      { email }
    );

    try {
      const response = await api.post<ApiResponse<PasswordlessInitResponse>>(
        `${this.basePath}/passwordless/init`,
        { email },
        { timeout: 30000 }
      );

      if (!response.success) {
        throw new Error(
          response.message ||
          'Erro ao iniciar autenticação passwordless (serviço de autenticação)'
        );
      }

      const initResponse = (
        response as ApiSuccessResponse<PasswordlessInitResponse>
      ).data;

      console.log(
        `[${this.context}] initiatePasswordless - Código enviado com sucesso`
      );

      return initResponse;
    } catch (error) {
      logApiError(error, this.context, {
        operation: 'initiatePasswordless',
        email,
      });
      throw error;
    }
  }

  /**
   * Verifica o código passwordless e autentica o usuário
   * Usa fluxo nativo ForgotPassword do Cognito (sem Lambda triggers)
   *
   * @param email - Email do usuário
   * @param code - Código de verificação recebido por email
   * @param session - Session ID (obsoleto, não é mais usado)
   * @returns Resposta com tokens e dados do usuário
   */
  async verifyPasswordless(
    email: string,
    code: string,
    session?: string
  ): Promise<LoginResponse> {
    console.log(
      `[${this.context}] verifyPasswordless - Verificando código passwordless`,
      { email }
    );

    try {
      const response = await api.post<ApiResponse<LoginResponse>>(
        `${this.basePath}/passwordless/verify`,
        { email, code, session },
        { timeout: 30000 }
      );

      if (!response.success) {
        throw new Error(
          response.message ||
          'Erro ao verificar código passwordless (serviço de autenticação)'
        );
      }

      const loginResponse = (response as ApiSuccessResponse<LoginResponse>)
        .data;

      // Salvar tokens
      this.setTokens(loginResponse.tokens);

      if (loginResponse.user.cognitoSub) {
        localStorage.setItem('userId', loginResponse.user.cognitoSub);
      }

      console.log(
        `[${this.context}] verifyPasswordless - Autenticação bem-sucedida`,
        {
          userId: loginResponse.user.cognitoSub,
        }
      );

      return loginResponse;
    } catch (error) {
      logApiError(error, this.context, {
        operation: 'verifyPasswordless',
        email,
      });
      throw error;
    }
  }

  /**
   * Inicia login com Google OAuth
   * Redireciona para o backend que redireciona para o Cognito Hosted UI
   */
  loginWithGoogle(): void {
    console.log(
      `[${this.context}] loginWithGoogle - Redirecionando para Google OAuth`
    );

    if (typeof window === 'undefined') {
      console.warn('[AuthService] loginWithGoogle chamado no servidor');
      return;
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    const redirectUri = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN;

    if (!backendUrl) {
      throw new Error(
        '[AuthService] NEXT_PUBLIC_API_URL não configurada. Defina a URL base da API no .env.local.'
      );
    }

    if (!redirectUri) {
      throw new Error(
        '[AuthService] NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN não configurada. Defina a URL de callback OAuth no .env.local.'
      );
    }
    const oauthUrl = `${backendUrl}/auth/oauth/google?redirect_uri=${encodeURIComponent(redirectUri)}`;

    // Em ambiente de teste, atualiza variável global para rastreamento
    if (typeof window !== 'undefined' && window.location) {
      try {
        window.location.href = oauthUrl;
        // Para testes, também atualiza variável global se existir
        if (
          process.env.NODE_ENV === 'test' &&
          (window as any).__testLocationHref !== undefined
        ) {
          (window as any).__testLocationHref = oauthUrl;
        }
      } catch (error) {
        // jsdom não permite navegação real, apenas loga em testes
        if (process.env.NODE_ENV === 'test') {
          // Atualiza variável global para rastreamento em testes
          if ((window as any).__testLocationHref !== undefined) {
            (window as any).__testLocationHref = oauthUrl;
          }
        } else {
          throw error;
        }
      }
    }
  }

  /**
   * Inicia login com GitHub OAuth
   * Redireciona para o backend que redireciona para o Cognito Hosted UI
   */
  loginWithGitHub(): void {
    console.log(
      `[${this.context}] loginWithGitHub - Redirecionando para GitHub OAuth`
    );

    if (typeof window === 'undefined') {
      console.warn('[AuthService] loginWithGitHub chamado no servidor');
      return;
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    const redirectUri = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN;

    if (!backendUrl) {
      throw new Error(
        '[AuthService] NEXT_PUBLIC_API_URL não configurada. Defina a URL base da API no .env.local.'
      );
    }

    if (!redirectUri) {
      throw new Error(
        '[AuthService] NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN não configurada. Defina a URL de callback OAuth no .env.local.'
      );
    }
    const oauthUrl = `${backendUrl}/auth/oauth/github?redirect_uri=${encodeURIComponent(redirectUri)}`;

    // Em ambiente de teste, atualiza variável global para rastreamento
    if (typeof window !== 'undefined' && window.location) {
      try {
        window.location.href = oauthUrl;
        // Para testes, também atualiza variável global se existir
        if (
          process.env.NODE_ENV === 'test' &&
          (window as any).__testLocationHref !== undefined
        ) {
          (window as any).__testLocationHref = oauthUrl;
        }
      } catch (error) {
        // jsdom não permite navegação real, apenas loga em testes
        if (process.env.NODE_ENV === 'test') {
          // Atualiza variável global para rastreamento em testes
          if ((window as any).__testLocationHref !== undefined) {
            (window as any).__testLocationHref = oauthUrl;
          }
        } else {
          throw error;
        }
      }
    }
  }
}

// ============================================================================
// Instância Singleton
// ============================================================================

export const authService = new AuthService();
