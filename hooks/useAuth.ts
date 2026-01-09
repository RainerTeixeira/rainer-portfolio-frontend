import { publicAuth } from '@/lib/api';
import { publicUsers } from '@/lib/api';
import { ApiError } from '@/lib/api/utils/error-handler';
import type {
  UpdateProfileData,
  User,
  UserProfile,
} from '@/lib/api/types/public/users';
import { UserRole } from '@/lib/api/types/public/users';
import type { CreateUserData } from '@/lib/api/types/public/users';
import { useCallback, useEffect, useState } from 'react';

/**
 * Converte User (MongoDB) para UserProfile (Cognito + MongoDB)
 * Extrai email, emailVerified e nickname do token JWT
 */
function convertUserToUserProfile(user: User): UserProfile {
  // Preferir o idToken (mais rico em claims de usuário) e cair para accessToken se necessário
  const token = publicAuth.getIdToken() || publicAuth.getAccessToken();
  let email = '';
  let emailVerified = false;
  let nicknameFromToken = '';

  if (token) {
    try {
      const decodedToken = publicAuth.getCognitoUserFromToken();
      if (decodedToken) {
        email = typeof decodedToken.email === 'string' ? decodedToken.email : '';
        emailVerified = typeof decodedToken.email_verified === 'boolean' ? decodedToken.email_verified : false;
        nicknameFromToken =
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
    // Priorizar sempre nickname vindo do backend (Mongo/Prisma). Token é apenas fallback.
    nickname: user.nickname || nicknameFromToken || '',
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

        // Verificar sempre via authService (Cognito/backend)
        if (publicAuth.isAuthenticated()) {
          const userData = await publicAuth.getUserProfile();
          const userProfile = convertUserToUserProfile(userData);
          setUser(userProfile);
        } else {
          setUser(null);
        }
      } catch (err) {
        // Tratamento especial para backend offline / erro de rede no carregamento inicial
        if (
          err instanceof ApiError &&
          err.status === 0 &&
          typeof err.message === 'string'
        ) {
          if (process.env.NODE_ENV === 'development') {
            console.info(
              '[useAuth] Backend indisponível no carregamento inicial. Usuário será tratado como deslogado.',
              {
                message: err.message,
              }
            );
          }

          setUser(null);
          setError(null);
          return;
        }

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

      // MODO DESENVOLVIMENTO: Mock de autenticação local
      if (process.env.NODE_ENV === 'development' && email === 'admin' && password === 'admin') {
        const mockUser: UserProfile = {
          id: 'dev-user-1',
          cognitoSub: 'dev-user-1',
          email: 'admin@rainersoft.com.br',
          emailVerified: true,
          nickname: 'admin',
          fullName: 'Administrador Dev',
          role: UserRole.ADMIN,
          isActive: true,
          isBanned: false,
          postsCount: 0,
          commentsCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        setUser(mockUser);
        setError(null);
        return mockUser;
      }

      // Produção: Usar backend real via authService
      const response = await publicAuth.login({ email, password });
      const authData = (response as any)?.data ?? response;
      const userProfile = (authData as any)?.user as UserProfile | undefined;

      if (!userProfile) {
        throw new Error('Falha ao obter usuário após login');
      }

      setUser(userProfile);
      setError(null);
      return userProfile;
    } catch (err) {
      // Normalização de erros para mensagens amigáveis na UI
      if (err instanceof ApiError) {
        // 401 -> credenciais inválidas
        if (err.status === 401) {
          const friendlyMessage =
            err.message && err.message !== 'Unauthorized'
              ? err.message
              : 'Email ou senha incorretos. Verifique os dados e tente novamente.';

          setError(new Error(friendlyMessage));

          // Erro de uso esperado, log apenas informativo
          if (process.env.NODE_ENV === 'development') {
            console.info('[useAuth] Login falhou com 401 (credenciais inválidas)', {
              message: err.message,
            });
          }

          return null;
        }

        // 503/0/timeout/DB off -> serviço indisponível
        const message = (err.message || '').toLowerCase();
        const isTimeoutStatus = err.status === 0 || err.status === 503;
        const isTimeoutMessage =
          message.includes('tempo limite excedido') ||
          message.includes('timeout') ||
          message.includes('server selection timeout') ||
          message.includes('nenhuma conexão pôde ser feita') ||
          message.includes('econnrefused');

        if (isTimeoutStatus || isTimeoutMessage) {
          const friendlyMessage =
            'Não foi possível se conectar ao serviço de autenticação neste momento. Tente novamente em alguns instantes.';

          setError(new Error(friendlyMessage));

          // Caso esperado de infra (backend/DB off) -> usar warn em dev
          if (process.env.NODE_ENV === 'development') {
            console.warn('[useAuth] Serviço de autenticação indisponível durante login', {
              status: err.status,
              endpoint: err.endpoint,
              url: err.url,
              method: err.method,
              message: err.message,
            });
          }

          return null;
        }
      }

      // Demais erros -> erro inesperado ao fazer login
      const fallbackError =
        err instanceof Error
          ? err
          : new Error('Erro inesperado ao fazer login. Tente novamente.');

      console.error('Erro inesperado no login:', err);
      setError(fallbackError);

      // Não relança o erro para evitar issues extras em interceptores globais
      return null;
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
        const response = await publicAuth.register(registerData);

        // RegisterResponse não tem user, então precisamos buscar o perfil
        let newUser: UserProfile;
        if (response.userId) {
          try {
            const fetchedUserData = await publicAuth.getUserProfile();
            // Converter User para UserProfile
            const baseProfile = convertUserToUserProfile(fetchedUserData);
            // Criar novo objeto com dados da resposta de registro
            newUser = {
              ...baseProfile,
              email: registerData.email,
              emailVerified: false,
              nickname: registerData.nickname || baseProfile.nickname,
            };
          } catch (profileError) {
            // Se não conseguir buscar o perfil, criar um perfil básico
            newUser = {
              id: response.userId,
              cognitoSub: response.userId,
              fullName: registerData.fullName,
              email: registerData.email,
              emailVerified: false,
              nickname: registerData.nickname || '',
              role: 'USER' as any,
              isActive: true,
              isBanned: false,
              postsCount: 0,
              commentsCount: 0,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
          }
        } else {
          // Se não tiver userId, criar um perfil básico
          newUser = {
            id: '',
            cognitoSub: '',
            fullName: registerData.fullName,
            email: registerData.email,
            emailVerified: false,
            nickname: registerData.nickname || '',
            role: 'USER' as any,
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
      await publicAuth.logout();
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

        // Determina o identificador correto esperado pelo backend (cognitoSub)
        const userId = user.cognitoSub;
        if (!userId) {
          throw new Error(
            'Não foi possível identificar o usuário para atualizar o perfil.'
          );
        }

        // Atualiza apenas dados do MongoDB (sem email)
        const updatedMongoUser = await publicUsers.updateProfile(
          userId,
          profileData
        );

        // Mescla com dados do Cognito (email permanece inalterado)
        // Nickname vem do Mongo/Prisma (backend), token Cognito é apenas fallback
        const updatedUser: UserProfile = {
          ...user, // Mantém todas as propriedades do usuário atual
          ...updatedMongoUser, // Sobrescreve com dados atualizados do MongoDB
          email: user.email, // Email vem do Cognito, não muda
          emailVerified: user.emailVerified,
          nickname: updatedMongoUser.nickname || user.nickname,
          avatar: updatedMongoUser.avatar || undefined,
          bio: updatedMongoUser.bio || undefined,
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
      await publicAuth.forgotPassword({ email });
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
        await publicAuth.resetPassword({ 
          email: data.email, 
          token: data.code, 
          newPassword: data.newPassword 
        });
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
      if (publicAuth.isAuthenticated()) {
        const userData = await publicAuth.getUserProfile();
        const userProfile = convertUserToUserProfile(userData);
        setUser(userProfile);
      } else {
        setUser(null);
      }
      setError(null);
    } catch (err) {
      // Tratamento especial para backend offline / erro de rede
      if (
        err instanceof ApiError &&
        err.status === 0 &&
        typeof err.message === 'string'
      ) {
        if (process.env.NODE_ENV === 'development') {
          console.info(
            '[useAuth] Backend indisponível ao verificar autenticação. Usuário será tratado como deslogado.',
            {
              message: err.message,
              endpoint: err.endpoint,
              url: err.url,
            }
          );
        }

        // Quando o backend está offline, apenas trata como não autenticado
        setUser(null);
        // Não expõe erro de rede para a UI nesse caso, para evitar UX ruim
        setError(null);
        return;
      }

      console.error('Erro ao verificar autenticação:', err);
      setUser(null);
      setError(
        err instanceof Error ? err : new Error('Erro ao verificar autenticação')
      );
      // Mantém o comportamento atual para erros que não são de rede/backend offline
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
        const tokens = await publicAuth.exchangeOAuthCodeViaBackend(
          finalProvider,
          code,
          state
        );

        // Configurar token na API
        const { setToken } = await import('@/lib/utils');
        setToken(tokens.accessToken);

        // Buscar perfil do usuário
        let userData = await publicAuth.getUserProfile();

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
              await publicAuth.updateNickname(cognitoSub, generatedNickname);
            }

            // Buscar perfil novamente para pegar o nickname atualizado
            const updatedUserData = await publicAuth.getUserProfile();
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
        let finalError: Error;

        if (err instanceof Error) {
          const msg = err.message || '';
          const lowerMsg = msg.toLowerCase();

          // Erro típico de código OAuth inválido/expirado
          const isOAuthCodeInvalidOrExpired =
            msg.includes('Código de autorização inválido') ||
            msg.includes('código de autorização inválido') ||
            (msg.toLowerCase().includes('authorization code') &&
              (msg.toLowerCase().includes('invalid') ||
                msg.toLowerCase().includes('expired')));

          // Erros típicos de backend/banco de dados indisponível
          const isTimeoutOrServiceUnavailable =
            (err instanceof ApiError && (err.status === 0 || err.status === 503)) ||
            msg.includes('Tempo limite excedido') ||
            lowerMsg.includes('timeout');

          const isDbUnavailable =
            isTimeoutOrServiceUnavailable ||
            msg.includes('Server selection timeout') ||
            msg.includes('Nenhuma conexão pôde ser feita') ||
            msg.includes('ECONNREFUSED') ||
            msg.includes('Failed to fetch') ||
            msg.includes('AbortError');

          if (isOAuthCodeInvalidOrExpired) {
            // Caso esperado em produção: apenas log informativo para debug
            console.info(
              '[useAuth] Código OAuth inválido ou expirado. Será exibida mensagem amigável e o usuário será redirecionado para o login.'
            );

            finalError = new Error(
              'Seu login social expirou ou foi finalizado. Volte para a tela de login e clique novamente no botão de login com Google ou GitHub para tentar outra vez.'
            );
          } else if (isDbUnavailable) {
            // Situação esperada em dev quando backend/banco está offline
            console.warn(
              '[useAuth] Backend, serviço de autenticação ou banco de dados indisponível durante login OAuth. Exibindo mensagem amigável ao usuário.'
            );

            finalError = new Error(
              'Não foi possível completar o login neste momento porque o serviço de autenticação está temporariamente indisponível (por exemplo, banco de dados offline ou manutenção). Tente novamente em alguns instantes.'
            );
          } else {
            // Apenas para erros inesperados mantemos log detalhado com o objeto de erro
            console.error('Erro inesperado ao fazer login com OAuth:', err);
            finalError = err;
          }
        } else {
          console.error('Erro desconhecido ao fazer login com OAuth:', err);
          finalError = new Error('Erro ao fazer login com OAuth');
        }

        setError(finalError);
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

      const response = await publicAuth.initiatePasswordless(email);

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
        const response = await publicAuth.verifyPasswordless(
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
  const loginWithGoogle = useCallback(async () => {
    try {
      // MODO DESENVOLVIMENTO: Mock de login Google
      if (process.env.NODE_ENV === 'development') {
        const mockUser: UserProfile = {
          id: 'dev-google-user-1',
          cognitoSub: 'dev-google-user-1',
          email: 'google.user@rainersoft.com.br',
          emailVerified: true,
          nickname: 'google_user',
          fullName: 'Google User Dev',
          avatar: 'https://lh3.googleusercontent.com/a/default-user',
          role: UserRole.USER,
          isActive: true,
          isBanned: false,
          postsCount: 0,
          commentsCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        setUser(mockUser);
        setError(null);
        return mockUser;
      }

      // Produção: Usar backend real
      return await publicAuth.loginWithGoogle();
    } catch (err) {
      console.error('Erro ao iniciar login com Google:', err);
      throw err;
    }
  }, []);

  // Login com Email
  const loginWithEmail = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await publicAuth.loginWithEmail(email, password);

      const userProfile = convertUserToUserProfile(response.user);
      setUser(userProfile);

      return userProfile;
    } catch (err) {
      console.error('Erro ao fazer login com email:', err);
      setError(
        err instanceof Error
          ? err
          : new Error('Erro ao fazer login com email')
      );
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
    loginWithOAuthCode,
    // Passwordless
    initiatePasswordless,
    verifyPasswordless,
    resetPasswordless,
    passwordlessStep,
    passwordlessEmail,
    // OAuth / credenciais
    loginWithGoogle,
    loginWithEmail,
  };
}

export default useAuth;

