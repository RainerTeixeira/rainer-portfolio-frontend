import { authService } from '@/lib/api/services/auth.service';
import { userService } from '@/lib/api/services/user.service';
import type {
  UpdateProfileData,
  User,
  UserProfile,
} from '@/lib/api/types/users';
import { useCallback, useEffect, useState } from 'react';

/**
 * Converte User (MongoDB) para UserProfile (Cognito + MongoDB)
 * Extrai email, emailVerified e nickname do token JWT
 */
function convertUserToUserProfile(user: User): UserProfile {
  const token = authService.getAccessToken();
  let email = '';
  let emailVerified = false;
  let nickname = '';

  if (token) {
    try {
      const decodedToken = authService.getCognitoUserFromToken();
      if (decodedToken) {
        email = typeof decodedToken.email === 'string' ? decodedToken.email : '';
        emailVerified = typeof decodedToken.email_verified === 'boolean' ? decodedToken.email_verified : false;
        nickname =
          (typeof decodedToken.nickname === 'string' ? decodedToken.nickname : '') ||
          (typeof decodedToken['custom:nickname'] === 'string' ? decodedToken['custom:nickname'] : '') ||
          (typeof decodedToken['cognito:username'] === 'string' ? decodedToken['cognito:username'] : '') ||
          '';
      }
    } catch (e) {
      console.warn('Erro ao decodificar token para UserProfile:', e);
    }
  }

  return {
    ...user,
    email,
    emailVerified,
    nickname: nickname || '',
  };
}

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [passwordlessStep, setPasswordlessStep] = useState<
    'email' | 'code' | null
  >(null);
  const [passwordlessEmail, setPasswordlessEmail] = useState<string>('');
  const [passwordlessSession, setPasswordlessSession] = useState<string>('');

  // Verifica se o usuário está autenticado ao carregar o hook
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const forceCognito = process.env.NEXT_PUBLIC_FORCE_COGNITO_AUTH === 'true';
        const isDevelopment = process.env.NODE_ENV === 'development';
        const useLocalAuth = isDevelopment && !forceCognito;

        if (useLocalAuth) {
          // EM DESENVOLVIMENTO: Verificar localStorage via localAuth
          const { localAuth } = await import('@/components/dashboard/lib/auth-local');
          const currentUser = localAuth.getCurrentUser();
          
          if (currentUser) {
            const localUserProfile: UserProfile = {
              id: currentUser.id,
              cognitoSub: currentUser.id,
              fullName: currentUser.name || 'Admin',
              email: currentUser.email || 'admin@rainersoft.com',
              emailVerified: true,
              nickname: currentUser.username,
              role: 'ADMIN' as any,
              isActive: true,
              isBanned: false,
              postsCount: 0,
              commentsCount: 0,
              createdAt: currentUser.createdAt || new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            setUser(localUserProfile);
          } else {
            setUser(null);
          }
        } else {
          // EM PRODUÇÃO: Verificar via authService (Cognito)
          if (authService.isAuthenticated()) {
            const userData = await authService.getUserProfile();
            const userProfile = convertUserToUserProfile(userData);
            setUser(userProfile);
          } else {
            setUser(null);
          }
        }
      } catch (err) {
        console.error('Erro ao verificar autenticação:', err);
        setError(
          err instanceof Error
            ? err
            : new Error('Erro ao verificar autenticação')
        );
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
      
      // Verificar se deve usar Cognito (produção OU flag forçada em dev)
      const forceCognito = process.env.NEXT_PUBLIC_FORCE_COGNITO_AUTH === 'true';
      const isDevelopment = process.env.NODE_ENV === 'development';
      const useLocalAuth = isDevelopment && !forceCognito;
      
      if (useLocalAuth) {
        // Importar localAuth dinamicamente
        const { localAuth } = await import('@/components/dashboard/lib/auth-local');
        const result = await localAuth.login(email, password);
        
        if (result.success && result.user) {
          // Converter User local para UserProfile
          const localUserProfile: UserProfile = {
            id: result.user.id,
            cognitoSub: result.user.id,
            fullName: result.user.name || 'Admin',
            email: result.user.email || 'admin@rainersoft.com',
            emailVerified: true,
            nickname: result.user.username,
            role: 'ADMIN' as any,
            isActive: true,
            isBanned: false,
            postsCount: 0,
            commentsCount: 0,
            createdAt: result.user.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          setUser(localUserProfile);
          setError(null);
          return localUserProfile;
        } else {
          throw new Error(result.message || 'Credenciais inválidas');
        }
      } else {
        // Produção: usar backend real
        const response = await authService.login({ email, password });
        const userProfile = response.user as UserProfile;
        setUser(userProfile);
        setError(null);
        return userProfile;
      }
    } catch (err) {
      console.error('Erro no login:', err);
      setError(err instanceof Error ? err : new Error('Erro ao fazer login'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Registro
  const register = useCallback(
    async (userData: {
      fullName: string;
      email: string;
      username: string;
      password: string;
      nickname?: string;
    }) => {
      try {
        setLoading(true);
        // Converter username para nickname se necessário
        const registerData = {
          fullName: userData.fullName,
          email: userData.email,
          password: userData.password,
          nickname: userData.nickname || userData.username,
        };
        const response = await authService.register(registerData);

        // RegisterResponse não tem user, então precisamos buscar o perfil
        let newUser: UserProfile;
        if (response.userId) {
          const fetchedUserData = await authService.getUserProfile();
          // Converter User para UserProfile
          const baseProfile = convertUserToUserProfile(fetchedUserData);
          // Criar novo objeto com dados da resposta de registro
          newUser = {
            ...baseProfile,
            email: response.email,
            emailVerified: false,
            nickname:
              response.nickname ||
              baseProfile.nickname ||
              registerData.nickname,
          };
        } else {
          // Se não tiver userId, criar um perfil básico a partir da resposta
          newUser = {
            id: response.userId || '',
            cognitoSub: response.cognitoSub || response.userId || '',
            fullName: response.fullName || registerData.fullName,
            email: response.email,
            emailVerified: false,
            nickname: response.nickname || registerData.nickname,
            role: 'SUBSCRIBER' as any,
            isActive: true,
            isBanned: false,
            postsCount: 0,
            commentsCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
        }
        setUser(newUser);
        setError(null);
        return newUser;
      } catch (err) {
        console.error('Erro no registro:', err);
        setError(err instanceof Error ? err : new Error('Erro ao registrar'));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

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

  // Atualizar perfil (MongoDB apenas - email via Cognito)
  const updateProfile = useCallback(
    async (profileData: UpdateProfileData) => {
      if (!user) throw new Error('Usuário não autenticado');

      try {
        setLoading(true);

        // Atualiza apenas dados do MongoDB (sem email)
        const updatedMongoUser = await userService.updateProfile(
          user.id,
          profileData
        );

        // Mescla com dados do Cognito (email permanece inalterado)
        const updatedUser: UserProfile = {
          ...updatedMongoUser,
          email: user.email, // Email vem do Cognito, não muda
          emailVerified: user.emailVerified,
          nickname: user.nickname, // Nickname vem do Cognito, não muda
        };

        setUser(updatedUser);
        setError(null);
        return updatedUser;
      } catch (err) {
        console.error('Erro ao atualizar perfil:', err);
        setError(
          err instanceof Error ? err : new Error('Erro ao atualizar perfil')
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  // Esqueci a senha
  const forgotPassword = useCallback(async (email: string) => {
    try {
      setLoading(true);
      await authService.forgotPassword({ email });
      setError(null);
    } catch (err) {
      console.error('Erro ao solicitar redefinição de senha:', err);
      setError(
        err instanceof Error
          ? err
          : new Error('Erro ao solicitar redefinição de senha')
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Confirmar redefinição de senha
  const confirmPasswordReset = useCallback(
    async (data: { email: string; code: string; newPassword: string }) => {
      try {
        setLoading(true);
        await authService.resetPassword(data);
        setError(null);
      } catch (err) {
        console.error('Erro ao confirmar redefinição de senha:', err);
        setError(
          err instanceof Error
            ? err
            : new Error('Erro ao confirmar redefinição de senha')
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Alterar senha
  // Nota: O AuthService não tem método changePassword ainda
  // Este método está preparado para quando o backend implementar
  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      try {
        setLoading(true);
        // TODO: Implementar endpoint no backend para alteração de senha
        // Por enquanto, lança erro informativo
        throw new Error(
          'Alteração de senha ainda não está disponível. Use a opção "Esqueci minha senha" para redefinir.'
        );
      } catch (err) {
        console.error('Erro ao alterar senha:', err);
        setError(
          err instanceof Error ? err : new Error('Erro ao alterar senha')
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Verificar token
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      if (authService.isAuthenticated()) {
        const userData = await authService.getUserProfile();
        const userProfile = convertUserToUserProfile(userData);
        setUser(userProfile);
      } else {
        setUser(null);
      }
      setError(null);
    } catch (err) {
      console.error('Erro ao verificar autenticação:', err);
      setUser(null);
      setError(
        err instanceof Error ? err : new Error('Erro ao verificar autenticação')
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Login com OAuth Code (via backend)
  // SEMPRE usa o backend - nunca chama Cognito diretamente
  const loginWithOAuthCode = useCallback(
    async (code: string, provider?: 'google' | 'github', state?: string) => {
      try {
        setLoading(true);

        // Sempre usar backend - detectar provider se não fornecido
        let finalProvider: 'google' | 'github' = provider || 'google'; // padrão

        // Se não houver provider explícito, tentar extrair do state
        if (!provider && state) {
          try {
            // Decodificar base64url no browser
            const base64urlDecode = (str: string): string => {
              // Converter base64url para base64
              let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
              // Adicionar padding se necessário
              while (base64.length % 4) {
                base64 += '=';
              }
              // Decodificar base64
              const decoded = atob(base64);
              // Converter para string UTF-8
              return decodeURIComponent(
                decoded
                  .split('')
                  .map(
                    c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                  )
                  .join('')
              );
            };

            const parsed = JSON.parse(base64urlDecode(state)) as { p?: string };
            if (parsed?.p === 'google' || parsed?.p === 'github') {
              finalProvider = parsed.p;
            }
          } catch (e) {
            console.warn(
              '[useAuth] Não foi possível extrair provider do state, usando google como padrão',
              e
            );
          }
        }

        // SEMPRE usar backend - nunca chamar exchangeOAuthCode diretamente
        const tokens = await authService.exchangeOAuthCodeViaBackend(
          finalProvider,
          code,
          state
        );

        // Configurar token na API
        const { api } = await import('@/lib/api/client');
        api.setAuthToken(tokens.accessToken);

        // Buscar perfil do usuário
        let userData = await authService.getUserProfile();

        // getUserProfile retorna User, mas precisamos verificar se tem nickname
        // Se não tiver nickname, gerar um baseado no fullName no formato "Nome_Sobrenome"
        const userProfile = convertUserToUserProfile(userData);
        const hasNickname = userProfile.nickname;
        const hasFullName = userProfile.fullName;
        const cognitoSub = userProfile.cognitoSub || userProfile.id;

        // Só tenta criar nickname se backend não criou automaticamente
        // Backend já cria automaticamente no login OAuth, então isso é apenas fallback
        if (!hasNickname && hasFullName && cognitoSub) {
          console.log(
            '[useAuth] Backend não criou nickname automaticamente, criando no frontend...'
          );
          try {
            // Gerar nickname no formato: "Nome_Sobrenome" (ex: "Rainer_Teixeira")
            const generateNickname = (fullName: string): string => {
              // Remove espaços extras e divide por espaços
              const parts = fullName.trim().split(/\s+/).filter(Boolean);

              if (parts.length === 0) return 'Usuario';

              // Capitalizar primeira letra de cada palavra
              const capitalize = (str: string): string => {
                if (!str) return '';
                return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
              };

              if (parts.length === 1) {
                // Se só tem um nome, usa ele capitalizado
                const name = capitalize(
                  parts[0]?.replace(/[^a-zA-Z0-9]/g, '') || ''
                );
                return name || 'Usuario';
              }

              // Pega primeiro e último nome, capitaliza e remove caracteres especiais
              const firstName = capitalize(
                (parts[0] || '').replace(/[^a-zA-Z0-9]/g, '')
              );
              const lastName = capitalize(
                (parts[parts.length - 1] || '').replace(/[^a-zA-Z0-9]/g, '')
              );

              // Formato: "NomeSobrenome" (sem underscore, apenas letras e números)
              // Remove underscore e outros caracteres especiais
              const cleanFirst = firstName
                .replace(/[^a-zA-Z0-9]/g, '')
                .toLowerCase();
              const cleanLast = lastName
                .replace(/[^a-zA-Z0-9]/g, '')
                .toLowerCase();

              let nickname = cleanFirst;
              if (cleanLast && cleanLast !== cleanFirst) {
                nickname = `${cleanFirst}${cleanLast}`;
              }

              // Limita a 30 caracteres e garante mínimo de 3
              nickname = nickname.substring(0, 30);
              if (nickname.length < 3) {
                nickname = nickname.padEnd(3, '0');
              }

              return nickname || 'Usuario';
            };

            const generatedNickname = generateNickname(
              userProfile.fullName || ''
            );

            // Atualizar nickname no Cognito
            if (cognitoSub) {
              await authService.updateNickname(cognitoSub, generatedNickname);
            }

            // Buscar perfil novamente para pegar o nickname atualizado
            const updatedUserData = await authService.getUserProfile();
            userData = updatedUserData;
          } catch (nicknameError) {
            console.warn(
              'Erro ao atualizar nickname após login social:',
              nicknameError
            );
            // Não falha o login se não conseguir atualizar o nickname
          }
        }

        // Converter User para UserProfile antes de setar
        const finalUserProfile = convertUserToUserProfile(userData);

        // Evitar atualização desnecessária se o usuário já é o mesmo
        setUser(prevUser => {
          // Só atualiza se realmente mudou
          if (
            prevUser?.id === finalUserProfile.id &&
            prevUser?.nickname === finalUserProfile.nickname &&
            prevUser?.email === finalUserProfile.email
          ) {
            return prevUser; // Retorna o mesmo objeto para evitar re-render
          }
          return finalUserProfile;
        });

        setError(null);
        return true;
      } catch (err) {
        console.error('Erro ao fazer login com OAuth:', err);
        setError(
          err instanceof Error
            ? err
            : new Error('Erro ao fazer login com OAuth')
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Inicia autenticação passwordless
  const initiatePasswordless = useCallback(async (email: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.initiatePasswordless(email);

      setPasswordlessEmail(email);
      setPasswordlessStep('code');

      // Session não é mais necessária (usando fluxo nativo ForgotPassword)
      setPasswordlessSession('');

      return response;
    } catch (err) {
      console.error('Erro ao iniciar autenticação passwordless:', err);
      setError(
        err instanceof Error
          ? err
          : new Error('Erro ao iniciar autenticação passwordless')
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Verifica código passwordless
  const verifyPasswordless = useCallback(
    async (code: string) => {
      try {
        setLoading(true);
        setError(null);

        if (!passwordlessEmail) {
          throw new Error('Email não encontrado. Inicie o processo novamente.');
        }

        // Session não é mais necessária (usando fluxo nativo ForgotPassword)
        const response = await authService.verifyPasswordless(
          passwordlessEmail,
          code,
          undefined // Session não é mais usado
        );

        const userProfile = convertUserToUserProfile(response.user);
        setUser(userProfile);
        setPasswordlessStep(null);
        setPasswordlessEmail('');
        setPasswordlessSession(''); // Limpar session após uso

        return userProfile;
      } catch (err) {
        console.error('Erro ao verificar código passwordless:', err);
        setError(
          err instanceof Error
            ? err
            : new Error('Erro ao verificar código passwordless')
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [passwordlessEmail, passwordlessSession]
  );

  // Reseta o fluxo passwordless
  const resetPasswordless = useCallback(() => {
    setPasswordlessStep(null);
    setPasswordlessEmail('');
    setPasswordlessSession('');
    setError(null);
  }, []);

  // Login com Google OAuth
  const loginWithGoogle = useCallback(() => {
    authService.loginWithGoogle();
  }, []);

  // Login com GitHub OAuth
  const loginWithGitHub = useCallback(() => {
    authService.loginWithGitHub();
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
    loginWithOAuthCode,
    // Passwordless
    initiatePasswordless,
    verifyPasswordless,
    resetPasswordless,
    passwordlessStep,
    passwordlessEmail,
    // OAuth
    loginWithGoogle,
    loginWithGitHub,
  };
}

export default useAuth;

