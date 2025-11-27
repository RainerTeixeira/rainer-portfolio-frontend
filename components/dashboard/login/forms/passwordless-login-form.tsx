/**
 * Passwordless Login Form Component
 *
 * Formulário de autenticação sem senha usando código de verificação por email.
 * Suporta fluxo de duas etapas: entrada de email e verificação de código.
 *
 * @module components/dashboard/login/forms/passwordless-login-form
 * @fileoverview Componente de login passwordless com código de verificação
 * @author Rainer Teixeira
 * @version 1.0.0
 */

'use client';

import { Alert, AlertDescription } from '@rainersoft/ui';
import { Button } from '@rainersoft/ui';
import { Input } from '@rainersoft/ui';
import { Label } from '@rainersoft/ui';
import { cn } from '@/lib/portfolio';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  Shield,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import type {
  PasswordlessInitResponse,
  PasswordlessVerifyResponse,
} from '@/lib/api/types';

interface PasswordlessLoginFormProps {
  onSuccess?: () => void;
  onBack?: () => void;
  initiatePasswordless: (email: string) => Promise<PasswordlessInitResponse>;
  verifyPasswordless: (code: string) => Promise<PasswordlessVerifyResponse>;
  resetPasswordless: () => void;
  passwordlessStep: 'email' | 'code' | null;
  passwordlessEmail: string;
  loading?: boolean;
}

/**
 * PasswordlessLoginForm Component
 *
 * Componente de formulário para autenticação passwordless com duas etapas:
 * 1. Entrada de email
 * 2. Verificação de código de 6 dígitos
 *
 * @component
 * @param {PasswordlessLoginFormProps} props - Propriedades do componente
 * @returns {JSX.Element} Formulário de login passwordless
 */
export function PasswordlessLoginForm({
  onSuccess,
  onBack,
  initiatePasswordless,
  verifyPasswordless,
  resetPasswordless,
  passwordlessStep,
  passwordlessEmail,
  loading = false,
}: PasswordlessLoginFormProps) {
  const router = useRouter();

  // Form states
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Sincronizar loading externo
  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  // Countdown para reenvio de código
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [countdown]);

  /**
   * Handler para envio de email
   */
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validação de email
    if (!email.trim()) {
      setError('Digite seu email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Digite um email válido');
      return;
    }

    setIsLoading(true);

    try {
      await initiatePasswordless(email);
      toast.success('Código enviado para seu email!');
      setCountdown(60); // 60 segundos para reenvio
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Erro ao enviar código. Tente novamente.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handler para verificação de código
   */
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validação de código
    if (!code.trim()) {
      setError('Digite o código de verificação');
      return;
    }

    // Validar que o código não está vazio (formato é determinado pelo Cognito)
    if (code.trim().length < 4) {
      setError('Código muito curto. Verifique o código recebido.');
      return;
    }

    setIsLoading(true);

    try {
      await verifyPasswordless(code);
      setSuccess(true);
      toast.success('Login realizado com sucesso!');

      // Delay para mostrar mensagem de sucesso
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else {
          router.push('/dashboard');
        }
      }, 1000);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Código inválido ou expirado. Tente novamente.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handler para voltar à etapa de email
   */
  const handleBackToEmail = () => {
    resetPasswordless();
    setCode('');
    setError('');
    setSuccess(false);
  };

  /**
   * Handler para reenviar código
   */
  const handleResendCode = async () => {
    if (countdown > 0) return;

    setError('');
    setIsLoading(true);

    try {
      await initiatePasswordless(passwordlessEmail || email);
      toast.success('Novo código enviado!');
      setCountdown(60);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao reenviar código';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Renderizar etapa de email
  if (!passwordlessStep || passwordlessStep === 'email') {
    return (
      <form onSubmit={handleSendCode} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            disabled={isLoading}
            className={cn(
              'h-11',
              'dark:bg-black/50 dark:border-cyan-400/30 dark:focus:border-cyan-400'
            )}
            autoComplete="email"
            autoFocus
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Alert className="bg-cyan-500/10 border-cyan-500/30">
          <Shield className="h-4 w-4 text-cyan-500" />
          <AlertDescription className="text-sm text-cyan-700 dark:text-cyan-400">
            Você receberá um código de verificação no seu email. O código expira
            em alguns minutos. Verifique sua caixa de entrada e pasta de spam.
          </AlertDescription>
        </Alert>

        <div className="flex gap-2">
          {onBack && (
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isLoading}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          )}
          <Button
            type="submit"
            disabled={isLoading}
            className={cn(
              'flex-1 h-11 text-base gap-2',
              'dark:bg-cyan-600 dark:hover:bg-cyan-700'
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                Enviar Código
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </div>
      </form>
    );
  }

  // Renderizar etapa de código
  return (
    <form onSubmit={handleVerifyCode} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="code" className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Código de Verificação
        </Label>
        <Input
          id="code"
          type="text"
          placeholder="Digite o código recebido"
          value={code}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCode(e.target.value)
          }
          disabled={isLoading}
          className={cn(
            'h-11 text-center text-lg tracking-wider font-mono',
            'dark:bg-black/50 dark:border-cyan-400/30 dark:focus:border-cyan-400'
          )}
          autoComplete="one-time-code"
          autoFocus
        />
        <p className="text-xs text-muted-foreground text-center">
          Código enviado para <strong>{passwordlessEmail || email}</strong>
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-500 bg-green-500/10">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-700 dark:text-green-400">
            Código verificado! Redirecionando...
          </AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        disabled={isLoading || code.trim().length < 4}
        className={cn(
          'w-full h-11 text-base gap-2',
          'dark:bg-cyan-600 dark:hover:bg-cyan-700'
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Verificando...
          </>
        ) : (
          <>
            Verificar Código
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </Button>

      <div className="flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={handleBackToEmail}
          disabled={isLoading}
          className="text-primary hover:underline disabled:opacity-50"
        >
          ← Alterar email
        </button>
        <button
          type="button"
          onClick={handleResendCode}
          disabled={isLoading || countdown > 0}
          className="text-primary hover:underline disabled:opacity-50"
        >
          {countdown > 0 ? `Reenviar em ${countdown}s` : 'Reenviar código'}
        </button>
      </div>
    </form>
  );
}


