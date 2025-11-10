/**
 * Auth Context Provider Component
 *
 * Provider global de autenticação para toda a aplicação. Wrapper do hook
 * useAuth() que gerencia estado de autenticação via Context API. Inclui
 * login, logout, registro, atualização de perfil e recuperação de senha.
 *
 * @module components/providers/auth-context-provider
 * @fileoverview Provider de contexto de autenticação com AWS Cognito
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // No layout principal
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 *
 * // Em componentes filhos
 * const { user, isAuthenticated, login, logout } = useAuthContext();
 * ```
 */

'use client';

import { useAuth } from '@/hooks/useAuth';
import type { UpdateProfileData, UserProfile } from '@/lib/api/types/users';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from 'react';

// ============================================================================
// Types
// ============================================================================

type AuthContextType = {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: Error | null;
  login: (email: string, password: string) => Promise<UserProfile | undefined>;
  register: (data: {
    fullName: string;
    email: string;
    username: string;
    password: string;
  }) => Promise<UserProfile | undefined>;
  logout: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<UserProfile | undefined>;
  forgotPassword: (email: string) => Promise<void>;
  confirmPasswordReset: (data: {
    email: string;
    code: string;
    newPassword: string;
  }) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
  checkAuth: () => Promise<void>;
  loginWithOAuthCode: (
    code: string,
    provider?: 'google' | 'github',
    state?: string
  ) => Promise<boolean>;
};

type AuthProviderProps = {
  children: ReactNode;
};

// ============================================================================
// Context
// ============================================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================================================
// Main Component
// ============================================================================

/**
 * Authentication Provider
 *
 * Provedor de contexto de autenticação global.
 * Utiliza o hook useAuth() para gerenciar estado e expõe via Context API.
 *
 * Funcionalidades:
 * - Login/logout de usuários
 * - Registro de novos usuários
 * - Atualização de perfil
 * - Recuperação e redefinição de senha
 * - Verificação automática de autenticação
 * - Estado de loading e erro
 *
 * @param children - Componentes filhos que terão acesso ao contexto
 * @returns Provider configurado
 *
 * @example
 * ```tsx
 * // No layout raiz
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * ```
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    forgotPassword,
    confirmPasswordReset,
    changePassword,
    checkAuth,
    loginWithOAuthCode,
  } = useAuth();

  // Verifica a autenticação ao carregar o provedor
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Memoriza o valor do contexto para evitar renderizações desnecessárias
  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated,
      loading,
      error,
      login,
      register,
      logout,
      updateProfile,
      forgotPassword,
      confirmPasswordReset,
      changePassword,
      checkAuth,
      loginWithOAuthCode,
    }),
    [
      user,
      isAuthenticated,
      loading,
      error,
      login,
      register,
      logout,
      updateProfile,
      forgotPassword,
      confirmPasswordReset,
      changePassword,
      checkAuth,
      loginWithOAuthCode,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// ============================================================================
// Custom Hook
// ============================================================================

/**
 * Custom hook para acesso ao contexto de autenticação
 *
 * Fornece acesso aos dados de autenticação e funções de login/logout.
 * Deve ser usado dentro de um AuthProvider.
 *
 * @returns Contexto de autenticação completo
 * @throws Error se usado fora do AuthProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { user, isAuthenticated, logout } = useAuthContext()
 *   return <div>{user?.fullName}</div>
 * }
 * ```
 */
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext deve ser usado dentro de um AuthProvider');
  }
  return context;
}

export default AuthContext;
