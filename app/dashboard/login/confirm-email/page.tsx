/**
 * Confirm Email Page Component
 *
 * Página de confirmação de email após registro. Permite ao usuário
 * inserir código de verificação recebido por email para confirmar
 * a conta e ativar acesso ao dashboard.
 *
 * @module app/dashboard/login/confirm-email/page
 * @fileoverview Página de confirmação de email
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Rota: /dashboard/login/confirm-email?email=user@example.com
 * // Acessível após registro bem-sucedido
 * ```
 *
 * @remarks
 * Fluxo de confirmação:
 * - Lê `email` da querystring
 * - Usa `pendingNickname` do localStorage como fallback de username
 * - Envia `email`, `username` e `code` para a API de confirmação
 * - Feedback de sucesso e redirecionamento para login
 * - Suporte a reenvio de código
 */
'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { authService } from '@/lib/api/services/auth.service';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function ConfirmEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const codeInputRef = useRef<HTMLInputElement | null>(null);

  const email = searchParams.get('email') || '';
  const username =
    typeof window !== 'undefined'
      ? localStorage.getItem('pendingNickname') || ''
      : '';

  // Autofocus no campo de código
  useEffect(() => {
    codeInputRef.current?.focus();
  }, []);

  /**
   * Submete o código para confirmar e-mail.
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (process.env.NODE_ENV === 'development') {
      console.log('[ConfirmEmail] handleSubmit - Iniciando submissão', {
        email,
        code,
      });
    }

    setIsLoading(true);
    setError(null);

    // Validação básica
    if (!email || !code) {
      const errorMsg =
        !email && !code
          ? 'Email e código são obrigatórios'
          : !email
            ? 'Email é obrigatório'
            : 'Código é obrigatório';

      if (process.env.NODE_ENV === 'development') {
        console.error('[ConfirmEmail] Validação falhou:', errorMsg);
      }
      setError(errorMsg);
      setIsLoading(false);
      return;
    }

    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('[ConfirmEmail] Preparando dados para confirmação:', {
          email,
          username: username || 'não informado',
          codeLength: code.length,
        });
      }

      const response = await authService
        .confirmEmail({
          email,
          username: username || email,
          code,
        })
        .catch(err => {
          if (process.env.NODE_ENV === 'development') {
            console.error(
              '[ConfirmEmail] Erro na chamada para authService.confirmEmail:',
              err
            );
          }
          throw err;
        });

      if (process.env.NODE_ENV === 'development') {
        console.log(
          '[ConfirmEmail] Confirmação de email bem-sucedida',
          response
        );
      }

      setSuccess(true);

      // Limpa apenas o pendingNickname do localStorage após a confirmação bem-sucedida
      // Mantém o userId (cognitoSub) salvo durante o registro
      if (typeof window !== 'undefined') {
        localStorage.removeItem('pendingNickname');
        // Verifica se já temos o cognitoSub salvo e mantém
        const savedUserId = localStorage.getItem('userId');
        if (process.env.NODE_ENV === 'development' && savedUserId) {
          console.log(
            '[ConfirmEmail] CognitoSub mantido no localStorage:',
            savedUserId
          );
        }
      }

      // Redireciona para a página de login após 2 segundos
      setTimeout(() => {
        router.push('/dashboard/login');
      }, 2000);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[ConfirmEmail] Erro ao confirmar email:', err);
      }

      let errorMessage = 'Erro ao confirmar email. Por favor, tente novamente.';

      if (err instanceof Error) {
        if (
          err.message.includes('timeout') ||
          err.message.includes('Tempo limite')
        ) {
          errorMessage =
            'O servidor demorou muito para responder. Por favor, verifique sua conexão e tente novamente.';
        } else if (err.message.includes('Network Error')) {
          errorMessage =
            'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.';
        } else if (
          err.message.includes('CodeMismatchException') ||
          err.message.includes('código inválido') ||
          err.message.includes('Código de confirmação inválido')
        ) {
          errorMessage =
            'Código de verificação inválido. Verifique o código recebido por email e tente novamente.';
          setCode(''); // Limpa o código incorreto
        } else if (
          err.message.includes('ExpiredCodeException') ||
          err.message.includes('expirado') ||
          err.message.includes('Código de confirmação expirado')
        ) {
          errorMessage =
            'O código de verificação expirou (códigos são válidos por 24 horas). Clique em "Reenviar código" para receber um novo.';
          // foca no campo de código para nova tentativa
          codeInputRef.current?.focus();
        } else if (
          err.message.includes('NotAuthorizedException') ||
          err.message.includes('não autorizado')
        ) {
          errorMessage =
            'Não foi possível confirmar o email. O código pode estar incorreto ou o usuário já foi confirmado anteriormente.';
        } else if (err.message) {
          // Se houver uma mensagem de erro específica do servidor, use-a
          errorMessage = err.message;
        }
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResend() {
    if (!email) return;
    setIsResending(true);
    setError(null);
    setResendSuccess(false);
    setCode(''); // Limpa o código anterior

    try {
      await authService.resendConfirmationCode({ email });
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 5000); // Some após 5s
    } catch (e) {
      let errorMessage = 'Erro ao reenviar código. Tente novamente.';

      // Tenta extrair mensagem do ApiError ou Error padrão
      if (e instanceof Error) {
        interface ApiError extends Error {
          data?: { message?: string; error?: { message?: string } };
        }
        const apiError = e as ApiError;

        // Prioridade: data.message > data.error?.message > message
        // ApiError geralmente coloca a mensagem do backend em e.message
        let extractedMessage = '';

        if (apiError.data?.message) {
          extractedMessage = apiError.data.message;
        } else if (apiError.data?.error?.message) {
          extractedMessage = apiError.data.error.message;
        } else if (e.message && e.message !== 'Erro de validação') {
          // e.message geralmente contém a mensagem completa do backend no ApiError
          extractedMessage = e.message;
        }

        // Debug em desenvolvimento
        if (process.env.NODE_ENV === 'development') {
          console.log('[ConfirmEmail] Erro capturado:', {
            message: e.message,
            data: apiError.data,
            extractedMessage,
            messageLength: extractedMessage.length,
          });
        }

        // Se encontrou uma mensagem útil (não genérica), usa ela
        // Mensagens do backend geralmente têm mais de 40 caracteres ou contêm palavras-chave específicas
        if (
          extractedMessage &&
          extractedMessage !== 'Erro de validação' &&
          extractedMessage !== errorMessage &&
          (extractedMessage.length > 40 ||
            extractedMessage.includes('código de confirmação') ||
            extractedMessage.includes('já foi enviado') ||
            extractedMessage.includes('durante o cadastro') ||
            extractedMessage.includes('caixa de entrada') ||
            extractedMessage.includes('aguarde alguns minutos') ||
            extractedMessage.includes('Muitas tentativas') ||
            extractedMessage.includes('não encontrado') ||
            extractedMessage.includes('já foi confirmado') ||
            extractedMessage.includes('spam') ||
            extractedMessage.includes('suporte'))
        ) {
          errorMessage = extractedMessage;
        }
      }

      setError(errorMessage);
    } finally {
      setIsResending(false);
      codeInputRef.current?.focus();
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-green-600/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Email confirmado
            </CardTitle>
            <CardDescription>Redirecionando para o login...</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="border-green-500">
              <AlertDescription className="text-green-700 dark:text-green-400">
                Email confirmado com sucesso! Você será redirecionado em
                instantes.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Confirmar Email</CardTitle>
          <CardDescription>
            Digite o código enviado para{' '}
            <span className="font-medium">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {resendSuccess && (
              <Alert className="border-green-500">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-700 dark:text-green-400">
                  Código reenviado com sucesso! Verifique seu email.
                </AlertDescription>
              </Alert>
            )}

            <div>
              <Input
                type="text"
                placeholder="Código de 6 dígitos"
                value={code}
                onChange={e => setCode(e.target.value)}
                maxLength={6}
                disabled={isLoading}
                className="text-center text-2xl tracking-widest"
                ref={codeInputRef}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || code.length !== 6}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirmar Email
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleResend}
              disabled={isResending || isLoading}
            >
              {isResending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Reenviar código
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
