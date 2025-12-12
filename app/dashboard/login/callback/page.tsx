/**
 * OAuth Callback Page Component
 *
 * Página de callback do OAuth que processa a resposta do Cognito
 * Hosted UI após login social (Google/GitHub). Troca o código de
 * autorização por tokens e autentica o usuário.
 *
 * @module app/dashboard/login/callback/page
 * @fileoverview Página de callback OAuth do Cognito
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Rota: /dashboard/login/callback?code=xxx&state=yyy
 * // Acessível automaticamente após login social
 * ```
 *
 * @remarks
 * Funcionalidades:
 * - Processa código de autorização do OAuth
 * - Extrai provider (Google/GitHub) do state
 * - Troca código por tokens via backend
 * - Autentica usuário e redireciona para dashboard
 * - Tratamento de erros OAuth
 */

'use client';

import { Alert, AlertDescription, InlineLoader } from '@rainersoft/ui';
import { Button } from '@rainersoft/ui';
import { useAuthContext } from '../../../../components/providers/auth-context-provider';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithOAuthCode, isAuthenticated, error: authError } = useAuthContext();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const [error, setError] = useState<string>('');

  /**
   * Flag para prevenir chamadas duplicadas.
   * React StrictMode executa useEffect 2x em desenvolvimento.
   */
  const hasProcessed = useRef(false);

  /**
   * Processa callback OAuth ao montar componente.
   * Extrai código de autorização da URL, troca por tokens e autentica usuário.
   */
  useEffect(() => {
    // Prevenir execução duplicada
    if (hasProcessed.current) {
      console.log(
        '[OAuth Callback] Já processado, ignorando chamada duplicada'
      );
      return;
    }

    const code = searchParams.get('code');
    const errorParam = searchParams.get('error');

    // Só processar se tiver código ou erro na URL
    if (!code && !errorParam) {
      console.log('[OAuth Callback] Sem código ou erro na URL, aguardando...');
      return;
    }

    async function handleCallback() {
      hasProcessed.current = true;
      console.log('[OAuth Callback] Processando callback pela primeira vez');

      try {
        const state = searchParams.get('state') || undefined;
        const errorDescription = searchParams.get('error_description');

        console.log('[OAuth Callback] Dados recebidos:', {
          code: code ? `${code.substring(0, 10)}...` : 'null',
          state: state ? 'presente' : 'ausente',
          error: errorParam || 'nenhum',
        });

        // Se houver erro na resposta do OAuth
        if (errorParam) {
          const errorMsg = errorDescription
            ? decodeURIComponent(errorDescription.replace(/\+/g, ' '))
            : `Erro no login: ${errorParam}`;
          setError(errorMsg);
          setStatus('error');
          toast.error(errorMsg);
          return;
        }

        // Se não houver código de autorização
        if (!code) {
          setError('Código de autorização não recebido');
          setStatus('error');
          toast.error('Erro: Código de autorização não recebido');
          return;
        }

        // Extrair provider do state (se presente)
        let provider: 'google' | 'github' | undefined;
        if (state) {
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

            const decoded = JSON.parse(base64urlDecode(state)) as {
              p?: string;
            };
            if (decoded?.p === 'google' || decoded?.p === 'github') {
              provider = decoded.p;
            }
          } catch (e) {
            console.warn('[OAuth Callback] Erro ao parsear state:', e);
            // Tentar detectar provider pela URL ou usar padrão
            // Se não conseguir detectar, o backend tentará detectar
            provider = undefined;
          }
        }

        // Trocar código por tokens via backend
        console.log('[OAuth Callback] Chamando loginWithOAuthCode...', {
          provider: provider || 'undefined (será detectado pelo backend)',
        });

        const success = await loginWithOAuthCode(code, provider, state);

        console.log(
          '[OAuth Callback] Resultado:',
          success ? 'sucesso' : 'falha'
        );

        if (success) {
          setStatus('success');
          toast.success('Login realizado com sucesso!');
          
          console.log('[OAuth Callback] Login bem-sucedido, redirecionando...');
          console.log('[OAuth Callback] isAuthenticated:', isAuthenticated);

          // Redirecionar para dashboard após 1 segundo com flag de OAuth
          setTimeout(() => {
            console.log('[OAuth Callback] Redirecionando para /dashboard?from=oauth');
            router.push('/dashboard?from=oauth');
          }, 1000);
        } else {
          // Tentar usar mensagem mais descritiva do hook de autenticação, se disponível
          const authErrorMessage =
            authError instanceof Error
              ? authError.message
              : typeof authError === 'string'
                ? authError
                : null;

          const fallbackMessage = 'Falha ao processar login';
          const finalMessage = authErrorMessage || fallbackMessage;

          setError(finalMessage);
          setStatus('error');
          toast.error(finalMessage);
        }
      } catch (err) {
        console.error('[OAuth Callback] Erro no callback OAuth:', err);
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao processar login social';
        setError(errorMessage);
        setStatus('error');
        toast.error(errorMessage);

        // Reset flag em caso de erro para permitir retry manual
        hasProcessed.current = false;
      }
    }

    handleCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, loginWithOAuthCode, router]); // Dependências necessárias, mas protegido por hasProcessed

  /**
   * Redireciona para dashboard se já estiver autenticado.
   * Evita processamento desnecessário quando usuário já está logado.
   */
  useEffect(() => {
    if (isAuthenticated && status === 'loading') {
      router.push('/dashboard');
    }
  }, [isAuthenticated, status, router]);

  /**
   * Redireciona automaticamente para a tela de login quando o erro indicar
   * que o código OAuth é inválido ou expirou. Mantém a mensagem visível por
   * alguns segundos antes do redirect.
   */
  useEffect(() => {
    if (status !== 'error' || !error) return;

    const normalized = error.toLowerCase();
    const isExpiredOAuthError =
      normalized.includes('login social expirou') ||
      normalized.includes('código de autorização inválido') ||
      (normalized.includes('authorization code') &&
        (normalized.includes('invalid') || normalized.includes('expired')));

    if (!isExpiredOAuthError) return;

    const timeoutId = setTimeout(() => {
      router.push('/dashboard/login');
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, [status, error, router]);

  /**
   * Estado de carregamento.
   * Exibe spinner enquanto processa callback OAuth.
   */
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <InlineLoader message="Processando login..." size="md" />
        </div>
      </div>
    );
  }

  /**
   * Estado de sucesso.
   * Exibe mensagem de sucesso e redireciona para dashboard.
   */
  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 max-w-md">
          <Alert className="border-green-500 bg-green-500/10">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-700 dark:text-green-400">
              Login realizado com sucesso! Redirecionando...
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const normalizedError = (error || '').toLowerCase();
  const isExpiredOAuthErrorUI =
    normalizedError.includes('login social expirou') ||
    normalizedError.includes('código de autorização inválido') ||
    (normalizedError.includes('authorization code') &&
      (normalizedError.includes('invalid') || normalizedError.includes('expired')));

  const displayMessage = isExpiredOAuthErrorUI
    ? 'Sua sessão de login social expirou. Redirecionando para a tela de login...'
    : error;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-4 max-w-md w-full">
        <Alert variant={isExpiredOAuthErrorUI ? 'default' : 'destructive'}>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{displayMessage}</AlertDescription>
        </Alert>
        <Button variant="default" size="lg" onClick={() => router.push('/dashboard/login')} className="w-full"
        >
          Voltar para Login
        </Button>
      </div>
    </div>
  );
}
