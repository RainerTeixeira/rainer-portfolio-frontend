/**
 * Frontend Auth Hook - Extended Authentication Management
 * 
 * Hook React personalizado para gerenciar estado de autenticação no frontend.
 * Extende funcionalidade do @rainersoft/utils com métodos específicos do frontend.
 * 
 * @module hooks/use-auth
 * @author Rainer Teixeira
 * @version 1.0.0
 */

'use client';

import { useCallback } from 'react';
import { useAuth as useBaseAuth } from '@rainersoft/utils';
import type { 
  UserProfile, 
  UpdateProfileData,
  UserRole
} from '@/lib/api/types/public/users';
import { publicAuth } from '@/lib/api';

// Import the base auth UserRole enum
type BaseUserRole = 'admin' | 'moderator' | 'user' | 'guest';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const mapUserRole = (role: UserRole): BaseUserRole => {
  switch (role) {
    case 'ADMIN':
      return 'admin';
    case 'USER':
    case 'EDITOR':
    case 'AUTHOR':
    default:
      return 'user';
  }
};

const mapBaseUserRole = (role: BaseUserRole | string): UserRole => {
  switch (role) {
    case 'admin':
    case 'moderator':
      return 'ADMIN' as UserRole;
    case 'user':
    case 'guest':
    default:
      return 'USER' as UserRole;
  }
};

export interface AuthResult {
  success: boolean;
  user?: UserProfile;
  token?: string;
  refreshToken?: string;
  error?: string;
}

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  username: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ConfirmPasswordResetData {
  email: string;
  code: string;
  newPassword: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface OAuthCallbackData {
  code: string;
  provider?: 'google' | 'github';
  state?: string;
}

// ============================================================================
// MAIN HOOK
// ============================================================================

/**
 * Hook de autenticação estendido para o frontend
 * 
 * Extende o useAuth do @rainersoft/utils com métodos específicos
 * para recuperação de senha, OAuth e compatibilidade de tipos.
 * 
 * @returns Objeto com estado e métodos de autenticação
 */
export function useAuth() {
  const baseAuth = useBaseAuth({
    apiEndpoint: '/api/auth',
  });

  const forgotPassword = useCallback(async (email: string): Promise<void> => {
    try {
      await publicAuth.forgotPassword({ email });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send reset password email';
      baseAuth.resetError();
      throw new Error(errorMessage);
    }
  }, [baseAuth]);

  const confirmPasswordReset = useCallback(async (
    data: ConfirmPasswordResetData
  ): Promise<void> => {
    try {
      await publicAuth.resetPassword({
        email: data.email,
        token: data.code,
        newPassword: data.newPassword,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to reset password';
      throw new Error(errorMessage);
    }
  }, []);

  const changePassword = useCallback(async (
    currentPassword: string,
    newPassword: string
  ): Promise<void> => {
    try {
      // This would need to be implemented in the API
      // For now, we'll use the updateProfile method as a placeholder
      console.warn('changePassword method not fully implemented - using updateProfile as placeholder');
      throw new Error('Change password method not implemented yet');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to change password';
      throw new Error(errorMessage);
    }
  }, []);

  const checkAuth = useCallback(async (): Promise<void> => {
    try {
      // Check if we have a valid token and user session
      const token = localStorage.getItem('auth_token');
      if (token && !baseAuth.user) {
        // Try to refresh user data with existing token
        const result = await baseAuth.refreshToken();
        if (!result.success) {
          // Token is invalid, clear session
          await baseAuth.logout();
        }
      }
    } catch (error) {
      console.warn('Auth check failed:', error);
      await baseAuth.logout();
    }
  }, [baseAuth]);

  const loginWithOAuthCode = useCallback(async (
    code: string,
    provider: 'google' | 'github' = 'google',
    state?: string
  ): Promise<boolean> => {
    try {
      const result = await publicAuth.handleOAuthCallback({ code, state });
      // AuthResponse doesn't have success property, but if we get a response, it's successful
      return !!(result.accessToken && result.user);
    } catch (error) {
      console.error('OAuth callback failed:', error);
      return false;
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<UserProfile | null> => {
    try {
      const result = await baseAuth.login({ email, password });
      if (result.success && result.user) {
        // Convert base auth user to frontend UserProfile format
        const userProfile: UserProfile = {
          id: result.user.id,
          cognitoSub: result.user.id, // Using id as cognitoSub for compatibility
          email: result.user.email || '',
          emailVerified: result.user.emailVerified || false,
          fullName: result.user.nickname, // Using nickname as fullName for compatibility
          nickname: result.user.nickname,
          role: mapBaseUserRole(result.user.role || 'user'),
          isActive: true,
          isBanned: false,
          postsCount: 0,
          commentsCount: 0,
          createdAt: result.user.createdAt || new Date().toISOString(),
          updatedAt: result.user.updatedAt || new Date().toISOString(),
        };
        return userProfile;
      }
      return null;
    } catch (error) {
      console.error('Login failed:', error);
      return null;
    }
  }, [baseAuth]);

  const register = useCallback(async (data: RegisterData): Promise<UserProfile | null> => {
    try {
      const result = await baseAuth.register({
        nickname: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.password, // Using same password for confirmation
      });
      if (result.success && result.user) {
        // Convert base auth user to frontend UserProfile format
        const userProfile: UserProfile = {
          id: result.user.id,
          cognitoSub: result.user.id,
          email: result.user.email || '',
          emailVerified: result.user.emailVerified || false,
          fullName: data.fullName,
          nickname: data.username,
          role: 'USER' as UserRole,
          isActive: true,
          isBanned: false,
          postsCount: 0,
          commentsCount: 0,
          createdAt: result.user.createdAt || new Date().toISOString(),
          updatedAt: result.user.updatedAt || new Date().toISOString(),
        };
        return userProfile;
      }
      return null;
    } catch (error) {
      console.error('Registration failed:', error);
      return null;
    }
  }, [baseAuth]);

  const updateProfile = useCallback(async (data: UpdateProfileData): Promise<UserProfile | null> => {
    try {
      const result = await baseAuth.updateProfile(data);
      if (result.success && result.user) {
        // Convert base auth user to frontend UserProfile format
        const userProfile: UserProfile = {
          id: result.user.id,
          cognitoSub: result.user.id,
          email: result.user.email || '',
          emailVerified: result.user.emailVerified || false,
          fullName: data.fullName || result.user.nickname,
          nickname: data.nickname || result.user.nickname,
          role: mapBaseUserRole(result.user.role || 'user'),
          isActive: true,
          isBanned: false,
          postsCount: 0,
          commentsCount: 0,
          createdAt: result.user.createdAt || new Date().toISOString(),
          updatedAt: result.user.updatedAt || new Date().toISOString(),
          ...data,
        };
        return userProfile;
      }
      return null;
    } catch (error) {
      console.error('Profile update failed:', error);
      return null;
    }
  }, [baseAuth]);

  return {
    user: baseAuth.user as UserProfile | null,
    isAuthenticated: baseAuth.isAuthenticated,
    loading: baseAuth.loading,
    error: baseAuth.error,
    login,
    register,
    logout: baseAuth.logout,
    updateProfile,
    forgotPassword,
    confirmPasswordReset,
    changePassword,
    checkAuth,
    loginWithOAuthCode,
    resetError: baseAuth.resetError,
  };
}

// ============================================================================
// UTILITY HOOKS
// ============================================================================

export function useIsAuthenticated(): boolean {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
}

export function useCurrentUser(): UserProfile | null {
  const { user } = useAuth();
  return user;
}

export function useHasRole(role: 'ADMIN' | 'USER' | 'EDITOR' | 'AUTHOR'): boolean {
  const { user } = useAuth();
  return user?.role === role;
}

export function useIsAdmin(): boolean {
  return useHasRole('ADMIN');
}
