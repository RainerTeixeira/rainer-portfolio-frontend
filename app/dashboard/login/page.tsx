/**
 * Login Page Component
 *
 * Página de autenticação do dashboard com design split-screen.
 * Suporta login tradicional e login social (Google/GitHub) via AWS Cognito.
 *
 * @module app/dashboard/login/page
 * @fileoverview Página de login do dashboard com autenticação completa
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Rota: /dashboard/login
 * // Redireciona para /dashboard se já autenticado
 * ```
 *
 * @remarks
 * Características:
 * - Design split-screen (branding + formulário)
 * - Login tradicional com email/usuário e senha
 * - Login social via OAuth (Google/GitHub) na página principal
 * - Integração com AWS Cognito
 * - Validação de formulário
 * - Estados de loading e erro
 * - Remember me functionality
 */

'use client';

import {
  AuthLayout,
  LoginForm,
  OAuthButtons,
} from '@/components/dashboard/login';
import { BackToTop } from '@rainersoft/ui';
import { SITE_CONFIG } from '@/constants';
import { useAuthContext } from '@/components/providers/auth-context-provider';
import { ApiError } from '@/lib/api/client';
import { cn } from '@/lib/portfolio';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

/**
 * LoginPage Component
 *
 * Componente principal da página de login que renderiza formulário
 * de autenticação com design split-screen e suporte a múltiplos
 * métodos de login.
 *
 * @component
 * @returns {JSX.Element} Página de login completa
 *
 * @remarks
 * Funcionalidades:
 * - Validação de credenciais
 * - Toggle de visibilidade de senha
 * - Remember me checkbox
 * - Links para recuperação de senha e registro
 * - Redirecionamento automático se autenticado
 */
export default function LoginPage() {
  const router = useRouter();
  const {
    login,
    isAuthenticated,
    loading: authLoading,
    loginWithGoogle,
    loginWithGitHub,
  } = useAuthContext();

  /**
   * Estados da interface de login.
   * isLoading: Flag de carregamento durante autenticação.
   * error: Mensagem de erro a ser exibida.
   * success: Flag de sucesso no login.
   */
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  /**
   * Redireciona para dashboard se já estiver autenticado.
   * Evita exibir página de login quando usuário já está logado.
   */
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, authLoading, router]);

  /**
   * Handler de submit do formulário de login.
   * Autentica usuário com email/username e senha.
   *
   * @param username - Email ou nome de usuário
   * @param password - Senha do usuário
   */
  const handleLoginSubmit = async (username: string, password: string) => {
    setError('');
    setSuccess(false);
    setIsLoading(true);

    try {
      const loginSuccess = await login(username, password);

      if (loginSuccess) {
        setSuccess(true);
        toast.success('Login realizado com sucesso!');

        // Delay para mostrar mensagem de sucesso
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        setError('Usuário ou senha incorretos');
        toast.error('Credenciais inválidas');
      }
    } catch (err) {
      let errorMessage = 'Erro ao fazer login. Tente novamente.';

      // Interface para ApiError com suggestions (adicionado dinamicamente)
      interface ApiErrorWithSuggestions extends ApiError {
        suggestions?: string[];
      }

      // Tratamento específico para ApiError
      if (err instanceof ApiError) {
        errorMessage = err.message;
        const apiError = err as ApiErrorWithSuggestions;

        // Se for ApiError com sugestões, incluir na mensagem
        if (apiError.suggestions && Array.isArray(apiError.suggestions)) {
          errorMessage = `${err.message}\n\nSugestões:\n${apiError.suggestions
            .slice(0, 2)
            .map((s: string) => `• ${s}`)
            .join('\n')}`;
        }

        // Para erros 500, adicionar informação detalhada
        if (apiError.status === 500) {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'não configurada';

          let serverMessage = err.message;
          if (apiError.data) {
            try {
              const responseData = apiError.data as Record<string, unknown>;
              serverMessage =
                (responseData?.message as string) ||
                (responseData?.error as { message?: string })?.message ||
                (responseData?.error as string) ||
                (responseData?.detail as string) ||
                (responseData?.errorMessage as string) ||
                err.message;
            } catch {
              serverMessage = err.message;
            }
          }

          errorMessage = `Erro interno do servidor (500)\n\n${serverMessage}\n\nURL da API: ${apiUrl}\n\nVerifique se o backend está rodando e acessível.`;

          if (apiError.suggestions && Array.isArray(apiError.suggestions)) {
            errorMessage += `\n\nSugestões:\n${apiError.suggestions
              .slice(0, 3)
              .map((s: string) => `• ${s}`)
              .join('\n')}`;
          }
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      console.error('Erro no login:', err);

      // Log detalhado em desenvolvimento
      if (process.env.NODE_ENV === 'development' && err instanceof ApiError) {
        interface ApiErrorWithSuggestions extends ApiError {
          suggestions?: string[];
        }

        const apiError = err as ApiErrorWithSuggestions;
        console.error('Detalhes do erro:', {
          error: err,
          status: apiError.status,
          apiUrl: process.env.NEXT_PUBLIC_API_URL,
          endpoint: '/auth/login',
          responseData: apiError.data,
          url: apiError.url,
        });

        if (apiError.data) {
          console.error('Resposta completa do servidor:', apiError.data);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handler de login social com Google OAuth.
   * Inicia fluxo de autenticação via Google.
   */
  const handleGoogleLogin = () => {
    try {
      loginWithGoogle();
    } catch (err) {
      console.error('Erro ao iniciar login com Google:', err);
      toast.error('Erro ao iniciar login com Google');
    }
  };

  /**
   * Handler de login social com GitHub OAuth.
   * Inicia fluxo de autenticação via GitHub.
   */
  const handleGitHubLogin = () => {
    try {
      loginWithGitHub();
    } catch (err) {
      console.error('Erro ao iniciar login com GitHub:', err);
      toast.error('Erro ao iniciar login com GitHub');
    }
  };

  /**
   * Estado de carregamento inicial.
   * Exibe spinner enquanto verifica estado de autenticação.
   */
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Loader2 className="w-8 h-8 text-primary" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-muted-foreground"
          >
            Carregando...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  /**
   * Se já estiver autenticado, não renderiza nada.
   * O redirecionamento é feito no useEffect acima.
   */
  if (isAuthenticated) {
    return null;
  }

  return (
    <>
      <AuthLayout
        title="Entre na sua conta"
        description="Faça login para acessar o dashboard"
        showBranding={true}
        footer={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-sm"
          >
            <span className="text-muted-foreground">
              Novo no {SITE_CONFIG.fullName}?{' '}
            </span>
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/dashboard/login/register"
                className={cn(
                  'text-primary hover:text-primary/80 font-normal',
                  'focus:outline-none focus:ring-2 focus:ring-primary/20',
                  'relative inline-block group/link',
                  'transition-colors duration-200 ease-in-out'
                )}
              >
                <span className="relative z-10">Criar uma conta</span>
                <span
                  className={cn(
                    'absolute bottom-0 left-0 w-0 h-0.5 bg-primary',
                    'group-hover/link:w-full',
                    'transition-all duration-200 ease-in-out'
                  )}
                />
              </Link>
            </motion.span>
          </motion.div>
        }
      >
        {/* Formulário de login tradicional */}
        {/* Campos de email/usuário e senha com validação */}
        <LoginForm
          onSubmit={handleLoginSubmit}
          isLoading={isLoading}
          error={error}
          success={success}
        />

        {/* Separador visual entre login tradicional e OAuth */}
        {/* Divisor animado com texto "ou" no centro */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{
            delay: 0.25,
            duration: 0.2,
            ease: 'easeOut',
          }}
          className="relative my-4 sm:my-5 md:my-6"
        >
          <div className="absolute inset-0 flex items-center">
            <div className="h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />
          </div>
          <div className="relative flex justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className={cn(
                'bg-card/80 backdrop-blur-sm px-3 py-1 text-xs',
                'text-muted-foreground font-medium',
                'border border-border/50 rounded-full',
                'shadow-sm'
              )}
            >
              ou
            </motion.span>
          </div>
        </motion.div>

        {/* Botões de login social (OAuth) */}
        {/* Autenticação via Google e GitHub */}
        <OAuthButtons
          onGoogleLogin={handleGoogleLogin}
          onGitHubLogin={handleGitHubLogin}
          disabled={isLoading}
        />
      </AuthLayout>

      {/* Botão de voltar ao topo */}
      <BackToTop />
    </>
  );
}


