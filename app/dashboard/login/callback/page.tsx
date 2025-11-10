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

import { useAuthContext } from '@/components/providers/auth-context-provider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authContext = useAuthContext();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const [error, setError] = useState<string>('');

  // Prevenir chamadas duplicadas (React StrictMode executa useEffect 2x em dev)
  const hasProcessed = useRef(false);

  // Debug: Log do contexto para diagnóstico
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[OAuth Callback] authContext disponível:', {
        hasContext: !!authContext,
        contextKeys: authContext ? Object.keys(authContext) : [],
        hasLoginWithOAuthCode:
          typeof authContext?.loginWithOAuthCode === 'function',
        loginWithOAuthCodeType: typeof authContext?.loginWithOAuthCode,
      });
    }
  }, [authContext]);

  useEffect(() => {
    async function handleCallback() {
      // Prevenir execução duplicada
      if (hasProcessed.current) {
        console.log(
          '[OAuth Callback] Já processado, ignorando chamada duplicada'
        );
        return;
      }

      hasProcessed.current = true;
      console.log('[OAuth Callback] Processando callback pela primeira vez');

      try {
        // Verificar se authContext está disponível
        if (!authContext) {
          console.error('[OAuth Callback] authContext não está disponível');
          setError(
            'Erro de configuração: contexto de autenticação não disponível'
          );
          setStatus('error');
          toast.error(
            'Erro de configuração: contexto de autenticação não disponível'
          );
          return;
        }

        // Verificar se loginWithOAuthCode está disponível e é uma função
        const loginFn = authContext.loginWithOAuthCode;
        if (!loginFn || typeof loginFn !== 'function') {
          console.error(
            '[OAuth Callback] loginWithOAuthCode não está disponível ou não é uma função:',
            {
              hasLoginFn: !!loginFn,
              type: typeof loginFn,
              authContextKeys: Object.keys(authContext),
              authContext: authContext,
            }
          );
          setError('Erro de configuração: loginWithOAuthCode não disponível');
          setStatus('error');
          toast.error(
            'Erro de configuração: loginWithOAuthCode não disponível'
          );
          return;
        }

        const code = searchParams.get('code');
        const state = searchParams.get('state') || undefined;

        console.log('[OAuth Callback] Dados recebidos:', {
          code: code ? `${code.substring(0, 10)}...` : 'null',
          state: state ? 'presente' : 'ausente',
        });

        // Extrair provider do state (se presente)
        // IMPORTANTE: Sempre tentar detectar o provider para garantir que usamos o backend
        let provider: 'google' | 'github' | undefined;
        if (state) {
          try {
            const parsed = JSON.parse(
              Buffer.from(state, 'base64').toString('utf-8')
            ) as { p?: string };
            if (parsed?.p === 'google' || parsed?.p === 'github') {
              provider = parsed.p;
            }
          } catch (e) {
            console.warn('[OAuth Callback] Erro ao parsear state:', e);
            // Se não conseguir parsear, tenta detectar pela URL ou usa 'google' como padrão
            provider = 'google'; // Fallback seguro
          }
        } else {
          // Se não houver state, usar 'google' como padrão
          // Isso garante que sempre usamos o backend
          provider = 'google';
        }
        const errorParam = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

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

        // Trocar código por tokens
        console.log('[OAuth Callback] Chamando loginWithOAuthCode...', {
          provider: provider || 'undefined',
        });

        const success = await loginFn(code, provider, state);

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
  }, []); // Array vazio: executa apenas uma vez na montagem

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
