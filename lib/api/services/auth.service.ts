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
import { logApiError } from '../debug-utils';
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

export interface PasswordlessVerifyResponse extends LoginResponse {}

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
  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
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
      if (process.env.NODE_ENV === 'development') {
        console.error('Erro ao decodificar token:', error);
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
    return decodedToken.exp < currentTime;
  }

  /**
   * Extrai dados do Cognito do token JWT (método público para testes).
   * Retorna o payload decodificado do token ou null se não houver token.
   */
  public getCognitoUserFromToken(): any | null {
    const token = this.getAccessToken();
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
    const user: User = {
      id: cognitoSub, // Usamos o sub como ID único
      cognitoSub, // Mantemos uma referência ao sub do Cognito
      fullName: decodedToken['fullName'] || nickname || '',
      role:
        (decodedToken['cognito:groups']?.[0] as UserRole) ||
        UserRole.SUBSCRIBER,
      isActive: true,
      isBanned: false,
      postsCount: 0,
      commentsCount: 0,
      createdAt: new Date(
        (decodedToken.iat || Date.now() / 1000) * 1000
      ).toISOString(),
      updatedAt: new Date().toISOString(),
      avatar,
      bio,
      website,
      socialLinks,
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

      const errorMessage = response.message || 'Erro desconhecido ao registrar';
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
   * Troca o código OAuth por tokens de autenticação
   * @param code - Código de autorização retornado pelo Cognito Hosted UI
   * @returns Promise com tokens de autenticação
   */
  async exchangeOAuthCode(code: string): Promise<AuthTokens> {
    const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
    const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
    const redirectUri =
      process.env.NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN ||
      (typeof window !== 'undefined'
        ? `${window.location.origin}/dashboard/login/callback`
        : 'http://localhost:3000/dashboard/login/callback');

    if (!domain || !clientId) {
      throw new Error(
        'Variáveis de ambiente do Cognito não configuradas. Verifique NEXT_PUBLIC_COGNITO_DOMAIN e NEXT_PUBLIC_COGNITO_CLIENT_ID'
      );
    }

    try {
      // Trocar código por tokens via endpoint do Cognito
      const tokenUrl = `https://${domain}/oauth2/token`;
      const params = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        code: code,
        redirect_uri: redirectUri,
      });

      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro ao trocar código OAuth:', errorText);
        throw new Error(`Falha ao trocar código OAuth: ${response.statusText}`);
      }

      const tokenData = await response.json();

      const tokens: AuthTokens = {
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        idToken: tokenData.id_token,
        expiresIn: tokenData.expires_in || 3600,
        tokenType: tokenData.token_type || 'Bearer',
      };

      // Salvar tokens
      this.setTokens(tokens);

      return tokens;
    } catch (error) {
      logApiError(error, this.context, {
        operation: 'exchangeOAuthCode',
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
        ? `${window.location.origin}/auth/callback`
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
      throw new Error(
        response.message || 'Falha ao processar OAuth no backend'
      );
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
        throw new Error(response.message || 'Erro ao realizar login');
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
      // Tratamento específico para erros 401 (credenciais inválidas)
      if (error instanceof ApiError && error.status === 401) {
        // Cria um erro mais descritivo com sugestões
        const enhancedError = new ApiError(
          401,
          error.message || 'Email ou senha incorretos',
          error.data,
          error.url,
          error.method,
          error.endpoint
        );
        (enhancedError as any).suggestions = [
          'Verifique se o email está correto',
          'Verifique se a senha está correta',
          'Certifique-se de que a conta foi confirmada',
          'Se você esqueceu a senha, use a opção "Esqueci minha senha"',
          'Se o problema persistir, pode ser necessário usar o username ao invés do email',
        ];
        logApiError(enhancedError, this.context, {
          operation: 'login',
          email: data.email,
          suggestions: (enhancedError as any).suggestions,
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

      throw new Error(response.message);
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
          response.message || 'Falha ao atualizar o nickname no Cognito'
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
      throw new Error(response.message || 'Erro ao obter perfil do usuário');
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
        throw new Error('Nenhum token de acesso encontrado');
      }

      // Extrai o cognitoSub do token JWT
      const decodedToken = this.decodeToken(token);
      if (!decodedToken || !decodedToken.sub) {
        throw new Error('Token inválido: não contém sub (cognitoSub)');
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
        throw new Error(response.message || 'Erro ao obter perfil do usuário');
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
          response.message || 'Erro ao iniciar autenticação passwordless'
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
          response.message || 'Erro ao verificar código passwordless'
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

    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const redirectUri = `${window.location.origin}/auth/callback`;
    const oauthUrl = `${backendUrl}/auth/oauth/google?redirect_uri=${encodeURIComponent(redirectUri)}`;

    window.location.href = oauthUrl;
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

    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const redirectUri = `${window.location.origin}/auth/callback`;
    const oauthUrl = `${backendUrl}/auth/oauth/github?redirect_uri=${encodeURIComponent(redirectUri)}`;

    window.location.href = oauthUrl;
  }
}

// ============================================================================
// Instância Singleton
// ============================================================================

export const authService = new AuthService();
