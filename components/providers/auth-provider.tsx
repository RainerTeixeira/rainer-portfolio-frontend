/**
 * Authentication Provider Component
 *
 * Provider global de autenticação para toda a aplicação. Gerencia estado de
 * login, persistência de sessão em localStorage, restauração automática de
 * sessão e suporte a roles (manager/user).
 *
 * @module components/providers/auth-provider
 * @fileoverview Provider de autenticação global da aplicação
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
 * const { user, isAuthenticated, login, logout } = useAuth();
 * ```
 *
 * Características:
 * - Autenticação mock local (admin/admin)
 * - Persistência em localStorage
 * - Restauração de sessão
 * - Hook useAuth() para componentes filhos
 * - Suporte a roles (manager/user)
 * - Estado de loading
 * - Proteção de rotas
 * - Gerenciamento de sessão
 */

'use client';

// ============================================================================
// React
// ============================================================================

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

// ============================================================================
// Constants
// ============================================================================

/**
 * Chave do localStorage para dados do usuário
 */
const STORAGE_KEY_USER = 'auth_user' as const;

// ============================================================================
// Types
// ============================================================================

/**
 * Dados do usuário autenticado
 */
interface User {
  readonly username: string;
  readonly name?: string;
  readonly email?: string;
  readonly bio?: string;
  readonly avatar?: string;
  readonly role: 'manager' | 'user';
}

/**
 * Tipo do contexto de autenticação
 */
interface AuthContextType {
  readonly user: User | null;
  readonly login: (username: string, password: string) => Promise<boolean>;
  readonly logout: () => void;
  readonly isAuthenticated: boolean;
  readonly isLoading: boolean;
}

/**
 * Props do AuthProvider
 */
interface AuthProviderProps {
  readonly children: ReactNode;
}

// ============================================================================
// Context
// ============================================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
 *   const { user, isAuthenticated, logout } = useAuth()
 *   return <div>{user?.username}</div>
 * }
 * ```
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * Authentication Provider
 *
 * Provedor de contexto de autenticação global.
 *
 * Funcionalidades:
 * - Login/logout de usuários
 * - Persistência de sessão em localStorage
 * - Restauração automática de sessão
 * - Estado de autenticação reativo
 *
 * Credenciais mock:
 * - Username: admin
 * - Password: admin
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
  // ============================================================================
  // State
  // ============================================================================

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // ============================================================================
  // Effects
  // ============================================================================

  /**
   * Restaura sessão do localStorage ao montar
   */
  useEffect(() => {
    const savedUserData = localStorage.getItem(STORAGE_KEY_USER);

    if (savedUserData) {
      try {
        const parsedUser = JSON.parse(savedUserData);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error('Erro ao restaurar sessão:', error);
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    }

    setIsLoadingAuth(false);
  }, []);

  // ============================================================================
  // Handler Functions
  // ============================================================================

  /**
   * Realiza login do usuário
   *
   * Valida credenciais via auth-local e salva sessão.
   * Suporta login com username ou email.
   *
   * @param username - Nome de usuário ou email
   * @param password - Senha do usuário
   * @returns Promise com sucesso/falha do login
   */
  const handleLogin = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { localAuth } = await import(
        '@/components/dashboard/lib/auth-local'
      );

      const authResult = await localAuth.login(username, password);

      if (authResult.success && authResult.user) {
        const authenticatedUser: User = {
          username: authResult.user.username,
          role: 'manager',
        };

        setCurrentUser(authenticatedUser);
        localStorage.setItem(
          STORAGE_KEY_USER,
          JSON.stringify(authenticatedUser)
        );
        return true;
      }

      return false;
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      return false;
    }
  };

  /**
   * Realiza logout do usuário
   *
   * Remove dados de sessão do estado e localStorage.
   */
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY_USER);
  };

  // ============================================================================
  // Context Value
  // ============================================================================

  const authContextValue: AuthContextType = {
    user: currentUser,
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: !!currentUser,
    isLoading: isLoadingAuth,
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
