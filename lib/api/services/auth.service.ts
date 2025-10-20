// ============================================================================
// Serviço de Autenticação - Integração com API do Backend
// ============================================================================

/**
 * Serviço para gerenciar autenticação via AWS Cognito
 * 
 * @fileoverview Serviço de autenticação com métodos para login, registro e recuperação
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import { api } from '../client';
import type {
  ApiResponse,
  ConfirmEmailData,
  ForgotPasswordData,
  LoginData,
  RefreshTokenData,
  RegisterData,
  ResetPasswordData
} from '../types';

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

export interface UserProfile {
  readonly id: string;
  readonly cognitoSub: string;
  readonly email: string;
  readonly username: string;
  readonly name: string;
  readonly avatar?: string;
  readonly bio?: string;
  readonly website?: string;
  readonly socialLinks?: Record<string, string>;
  readonly role: 'ADMIN' | 'AUTHOR' | 'READER';
  readonly isActive: boolean;
  readonly isBanned: boolean;
  readonly emailVerified: boolean;
  readonly postsCount: number;
  readonly commentsCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface LoginResponse {
  readonly tokens: AuthTokens;
  readonly user: UserProfile;
}

export interface RegisterResponse {
  readonly userId: string;
  readonly cognitoSub: string;
  readonly email: string;
  readonly username: string;
  readonly message: string;
  readonly requiresEmailConfirmation: boolean;
}

// ============================================================================
// Classe do Serviço
// ============================================================================

export class AuthService {
  private readonly basePath = '/auth';

  /**
   * Registra um novo usuário
   */
  async register(data: RegisterData): Promise<RegisterResponse> {
    const response = await api.post<ApiResponse<RegisterResponse>>(`${this.basePath}/register`, data);
    if (response.success) {
      return response.data;
    }
    throw new Error(response.message);
  }

  /**
   * Confirma email do usuário
   */
  async confirmEmail(data: ConfirmEmailData): Promise<ApiResponse<void>> {
    return api.post<ApiResponse<void>>(`${this.basePath}/confirm-email`, data);
  }

  /**
   * Realiza login do usuário
   */
  async login(data: LoginData): Promise<LoginResponse> {
    // MODO FAKE (DEV):
    // Quando NEXT_PUBLIC_AUTH_MODE === 'fake', não chamamos o backend.
    // Em vez disso, aceitamos credenciais de desenvolvimento (admin/admin),
    // geramos um token JWT simplificado e retornamos um usuário ADMIN.
    // Isso permite testar o dashboard sem depender da API real.
    if (process.env.NEXT_PUBLIC_AUTH_MODE === 'fake') {
      const isDevAdmin = (data.email === 'admin' || data.email === 'admin@local') && data.password === 'admin'
      if (!isDevAdmin) {
        throw new Error('Credenciais inválidas (modo DEV)')
      }
      // Gera um "JWT" simples (não assinado) apenas para simular payload/expiração
      const now = Math.floor(Date.now() / 1000)
      const exp = now + 60 * 60 // 1h
      const payload = {
        sub: 'dev-admin-id',
        email: 'admin@local',
        name: 'Dev Admin',
        'cognito:username': 'admin',
        'custom:role': 'ADMIN',
        email_verified: true,
        iat: now,
        exp
      }
      const header = btoa(JSON.stringify({ alg: 'none', typ: 'JWT' }))
      const body = btoa(JSON.stringify(payload))
      const fakeJwt = `${header}.${body}.`
      const tokens: AuthTokens = {
        accessToken: fakeJwt,
        refreshToken: 'dev-refresh-token',
        idToken: fakeJwt,
        expiresIn: 3600,
        tokenType: 'Bearer'
      }
      this.setTokens(tokens)
      const user = this.getUserFromToken()!
      return { tokens, user }
    }

    const response = await api.post<ApiResponse<LoginResponse>>(`${this.basePath}/login`, data);
    if (response.success) {
      return response.data;
    }
    throw new Error(response.message);
  }

  /**
   * Renova token de acesso
   */
  async refreshToken(data: RefreshTokenData): Promise<AuthTokens> {
    const response = await api.post<ApiResponse<AuthTokens>>(`${this.basePath}/refresh`, data);
    if (response.success) {
      return response.data;
    }
    throw new Error(response.message);
  }

  /**
   * Solicita recuperação de senha
   */
  async forgotPassword(data: ForgotPasswordData): Promise<ApiResponse<void>> {
    return api.post<ApiResponse<void>>(`${this.basePath}/forgot-password`, data);
  }

  /**
   * Redefine senha do usuário
   */
  async resetPassword(data: ResetPasswordData): Promise<ApiResponse<void>> {
    return api.post<ApiResponse<void>>(`${this.basePath}/reset-password`, data);
  }

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return !!token && !this.isTokenExpired(token);
  }

  /**
   * Obtém o perfil do usuário autenticado
   */
  async getUserProfile(): Promise<UserProfile> {
    // Em modo FAKE, derivamos o usuário direto do token salvo no localStorage.
    // Em modo REAL, idealmente consultar um endpoint /auth/me no backend.
    if (process.env.NEXT_PUBLIC_AUTH_MODE === 'fake') {
      const user = this.getUserFromToken()
      if (!user) throw new Error('Não autenticado')
      return user
    }
    // Caso o backend exponha /auth/me, prefira essa rota.
    // Aqui fazemos fallback para os dados do token, se existir.
    const userFromToken = this.getUserFromToken()
    if (userFromToken) return userFromToken
    // Opcional: chamar `${this.basePath}/me` se estiver implementado.
    throw new Error('Não autenticado')
  }

  /**
   * Obtém token de acesso do localStorage
   */
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  /**
   * Obtém refresh token do localStorage
   */
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  /**
   * Salva tokens no localStorage
   */
  setTokens(tokens: AuthTokens): void {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    localStorage.setItem('idToken', tokens.idToken);
    localStorage.setItem('tokenExpiresAt', (Date.now() + tokens.expiresIn * 1000).toString());
  }

  /**
   * Remove tokens do localStorage
   */
  clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('tokenExpiresAt');
  }

  /**
   * Verifica se o token está expirado
   */
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1] || ''));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  }

  /**
   * Obtém informações do usuário do token
   */
  getUserFromToken(): UserProfile | null {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1] || ''));
      return {
        id: payload.sub,
        cognitoSub: payload.sub,
        email: payload.email,
        username: payload['cognito:username'],
        name: payload.name,
        role: (payload['custom:role'] as 'ADMIN' | 'AUTHOR' | 'READER') || 'READER',
        isActive: true,
        isBanned: false,
        emailVerified: payload.email_verified || false,
        postsCount: 0,
        commentsCount: 0,
        createdAt: new Date(payload.iat * 1000).toISOString(),
        updatedAt: new Date(payload.iat * 1000).toISOString()
      };
    } catch {
      return null;
    }
  }
}

// ============================================================================
// Instância Singleton
// ============================================================================

export const authService = new AuthService();