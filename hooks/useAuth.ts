import { useState, useEffect, useCallback } from 'react';
import { UserProfile } from '@/lib/api/types/auth';
import { authService } from '@/lib/api/services/auth.service';

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Verifica se o usuário está autenticado ao carregar o hook
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        
        if (authService.isAuthenticated()) {
          // Se estiver autenticado, busca os dados mais recentes do usuário
          const userData = await authService.getUserProfile();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Erro ao verificar autenticação:', err);
        setError(err instanceof Error ? err : new Error('Erro ao verificar autenticação'));
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login
  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await authService.login({ email, password });
      setUser(response.user);
      setError(null);
      return response.user;
    } catch (err) {
      console.error('Erro no login:', err);
      setError(err instanceof Error ? err : new Error('Erro ao fazer login'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Registro
  const register = useCallback(async (userData: {
    name: string;
    email: string;
    username: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      setUser(response.user);
      setError(null);
      return response.user;
    } catch (err) {
      console.error('Erro no registro:', err);
      setError(err instanceof Error ? err : new Error('Erro ao registrar'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      setError(null);
    } catch (err) {
      console.error('Erro no logout:', err);
      setError(err instanceof Error ? err : new Error('Erro ao fazer logout'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Atualizar perfil
  const updateProfile = useCallback(async (profileData: {
    name?: string;
    username?: string;
    bio?: string;
    website?: string;
    avatar?: string;
  }) => {
    try {
      setLoading(true);
      const updatedUser = await authService.updateProfile(profileData);
      setUser(updatedUser);
      setError(null);
      return updatedUser;
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err);
      setError(err instanceof Error ? err : new Error('Erro ao atualizar perfil'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Esqueci a senha
  const forgotPassword = useCallback(async (email: string) => {
    try {
      setLoading(true);
      await authService.forgotPassword(email);
      setError(null);
    } catch (err) {
      console.error('Erro ao solicitar redefinição de senha:', err);
      setError(err instanceof Error ? err : new Error('Erro ao solicitar redefinição de senha'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Confirmar redefinição de senha
  const confirmPasswordReset = useCallback(async (data: {
    email: string;
    code: string;
    newPassword: string;
  }) => {
    try {
      setLoading(true);
      await authService.confirmPasswordReset(data);
      setError(null);
    } catch (err) {
      console.error('Erro ao confirmar redefinição de senha:', err);
      setError(err instanceof Error ? err : new Error('Erro ao confirmar redefinição de senha'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Alterar senha
  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    try {
      setLoading(true);
      await authService.changePassword({ currentPassword, newPassword });
      setError(null);
    } catch (err) {
      console.error('Erro ao alterar senha:', err);
      setError(err instanceof Error ? err : new Error('Erro ao alterar senha'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Verificar token
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      if (authService.isAuthenticated()) {
        const userData = await authService.getUserProfile();
        setUser(userData);
      } else {
        setUser(null);
      }
      setError(null);
    } catch (err) {
      console.error('Erro ao verificar autenticação:', err);
      setUser(null);
      setError(err instanceof Error ? err : new Error('Erro ao verificar autenticação'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    isAuthenticated: !!user,
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
  };
}

export default useAuth;
