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

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithOAuthCode, isAuthenticated } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const [error, setError] = useState<string>('');

  // Prevenir chamadas duplicadas (React StrictMode executa useEffect 2x em dev)
  const hasProcessed = useRef(false);

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

          // Redirecionar para dashboard após 1 segundo
          setTimeout(() => {
            router.push('/dashboard');
          }, 1000);
        } else {
          setError('Falha ao processar login');
          setStatus('error');
          toast.error('Falha ao processar login');
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

  // Se já estiver autenticado, redirecionar
  useEffect(() => {
    if (isAuthenticated && status === 'loading') {
      router.push('/dashboard');
    }
  }, [isAuthenticated, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-500 mx-auto" />
          <p className="text-muted-foreground">Processando login...</p>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-4 max-w-md w-full">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button
          onClick={() => router.push('/dashboard/login')}
          className="w-full"
        >
          Voltar para Login
        </Button>
      </div>
    </div>
  );
}
