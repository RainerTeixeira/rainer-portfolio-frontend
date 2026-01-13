/**
 * Login Page Component
 *
 * Página de autenticação do dashboard com design split-screen.
 * Suporta login tradicional e login social (Google) via AWS Cognito.
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
 * - Login social via OAuth (Google) na página principal
 * - Integração com AWS Cognito
 * - Validação de formulário
 * - Estados de loading e erro
 * - Remember me functionality
 */

'use client';

import {
  AuthLayout,
  LoginForm,
} from '@/components/domain/dashboard/login';
import { BackToTop, Button } from '@rainersoft/ui';
import { SITE_CONFIG } from '@/constants';
import { useAuthContext } from '@/components/providers/auth-context-provider';
import { ApiError } from '@/lib/api/utils/error-handler';
import { env, isDevelopment } from '@/lib/config/env';
import { cn } from '@rainersoft/ui';
import { MOTION, SHADOWS, motionTokens } from '@rainersoft/design-tokens';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

/**
 * Converte um easing em string `cubic-bezier(...)` para array numérico aceito pelo Motion
 * @param {string | undefined} easing - String de easing no formato cubic-bezier
 * @returns {[number, number, number, number] | undefined} Array de 4 números ou undefined
 */
function parseCubicBezier(
  easing: string | undefined
): [number, number, number, number] | undefined {
  if (!easing) return undefined;
  const match = easing.match(/cubic-bezier\(([^)]+)\)/);
  if (!match) return undefined;
  const parts = match[1]!
    .split(',')
    .map(value => Number.parseFloat(value.trim()));
  if (parts.length !== 4 || parts.some(Number.isNaN)) return undefined;
  return parts as [number, number, number, number];
}

/**
 * Configurações de animação para botão OAuth
 * @constant {Object}
 * @property {number} duration - Duração das animações em segundos
 * @property {number} shimmerDuration - Duração do efeito shimmer em segundos
 * @property {string | [number, number, number, number]} easeInOut - Configuração de easing
 */
const ANIMATION_CONFIG = {
  duration: Number(motionTokens.duration.normal.replace('ms', '')) / 1000,
  shimmerDuration: Number(motionTokens.duration.slower.replace('ms', '')) / 1000 * 3,
  easeInOut: parseCubicBezier(motionTokens.easing.easeInOut) ?? 'easeInOut',
} as const;

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
  } = useAuthContext();

  /**
   * Estados da interface de login.
   * @type {Object}
   * @property {boolean} isLoading - Flag de carregamento durante autenticação
   * @property {string} error - Mensagem de erro a ser exibida
   * @property {boolean} success - Flag de sucesso no login
   */
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  /**
   * Redireciona para dashboard se já estiver autenticado.
   * Evita exibir página de login quando usuário já está logado.
   * @effect
   * @dependencies isAuthenticated, authLoading, router
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
   * @param {string} username - Email ou nome de usuário
   * @param {string} password - Senha do usuário
   * @returns {Promise<void>}
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
        data?: any;
        url?: string;
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
          const apiUrl = env.NEXT_PUBLIC_API_URL || 'não configurada';

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
      if (isDevelopment && err instanceof ApiError) {
        const apiError = err as ApiErrorWithSuggestions;
        console.error('Detalhes do erro:', {
          error: err,
          status: apiError.status,
          apiUrl: env.NEXT_PUBLIC_API_URL,
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
   * Estado de carregamento inicial.
   * Exibe spinner enquanto verifica estado de autenticação.
   * @returns {JSX.Element} Componente de loading
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
   * @returns {null}
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

        {/* Botão de login social (OAuth) */}
        {/* Autenticação via Google */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: ANIMATION_CONFIG.duration,
            ease: ANIMATION_CONFIG.easeInOut,
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className={cn(
              'w-full h-9 sm:h-10 relative overflow-hidden group',
              'text-sm font-normal',
              'border-border hover:border-primary/50 hover:bg-accent/50',
              'bg-background/50 backdrop-blur-sm',
              'shadow-sm hover:shadow-md',
              'rounded-md',
              MOTION.TRANSITION.DEFAULT,
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ 
                duration: ANIMATION_CONFIG.shimmerDuration, 
                ease: ANIMATION_CONFIG.easeInOut 
              }}
            />
            <motion.div
              className="relative z-10 flex items-center justify-center"
              whileHover={{ x: 2 }}
              transition={{ duration: ANIMATION_CONFIG.duration }}
            >
              <motion.svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ 
                  duration: ANIMATION_CONFIG.duration * 2.5,
                }}
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </motion.svg>
              <span>Continuar com Google</span>
            </motion.div>
          </Button>
        </motion.div>
      </AuthLayout>

      {/* Botão de voltar ao topo */}
      <BackToTop />
    </>
  );
}