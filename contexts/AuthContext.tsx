import React, { createContext, useContext, ReactNode, useEffect, useMemo } from 'react';
import { UserProfile } from '@/lib/api/types/auth';
import { useAuth } from '@/hooks/useAuth';

type AuthContextType = {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: Error | null;
  login: (email: string, password: string) => Promise<UserProfile | undefined>;
  register: (data: {
    name: string;
    email: string;
    username: string;
    password: string;
  }) => Promise<UserProfile | undefined>;
  logout: () => Promise<void>;
  updateProfile: (data: {
    name?: string;
    username?: string;
    bio?: string;
    website?: string;
    avatar?: string;
  }) => Promise<UserProfile | undefined>;
  forgotPassword: (email: string) => Promise<void>;
  confirmPasswordReset: (data: {
    email: string;
    code: string;
    newPassword: string;
  }) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  checkAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

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
    ]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext deve ser usado dentro de um AuthProvider');
  }
  return context;
}

export default AuthContext;
