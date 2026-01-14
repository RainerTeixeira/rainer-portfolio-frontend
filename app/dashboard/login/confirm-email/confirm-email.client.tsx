/**
 * ConfirmEmailClient
 *
 * Componente cliente que contém toda a lógica interativa de confirmação de email.
 * Recebe o email inicial via props (do server component) para evitar uso de
 * searchParams no servidor e prevenir erros de prerender.
 */
'use client';

import { AuthLayout } from '@/components/domain/dashboard/login';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  BackToTop,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  cn,
} from '@rainersoft/ui';
import {
  CheckCircle2,
  Loader2,
  RefreshCw,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { isDevelopment } from '@/lib/config/env';
import { publicAuth } from '@/lib/api';

type VerificationStatus = 'idle' | 'verifying' | 'success' | 'error' | 'expired';

const CODE_CONFIG = {
  LENGTH: 6,
  RESEND_DELAY: 30, // segundos
  VALIDITY_HOURS: 24,
};

interface ConfirmEmailClientProps {
  initialEmail?: string;
}

export default function ConfirmEmailClient({ initialEmail = '' }: ConfirmEmailClientProps) {
  const router = useRouter();

  const [email] = useState(initialEmail);
  const username =
    typeof window !== 'undefined' ? localStorage.getItem('pendingNickname') || '' : '';

  const [code, setCode] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('idle');
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [lastResendTime, setLastResendTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const codeInputRef = useRef<HTMLInputElement | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    codeInputRef.current?.focus();
    inputRefs.current = inputRefs.current.slice(0, CODE_CONFIG.LENGTH);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendCooldown]);

  const canResend = () => {
    if (lastResendTime) {
      const timeSinceLastResend = Date.now() - lastResendTime;
      const cooldownMs = CODE_CONFIG.RESEND_DELAY * 1000;
      return timeSinceLastResend >= cooldownMs;
    }
    return true;
  };

  const formatEmailForDisplay = (value: string) => {
    if (!value) return '';
    const [user, domain] = value.split('@');
    if (!user || !domain) return value;
    const maskedUser =
      user.length > 2 ? user.substring(0, 2) + '*'.repeat(user.length - 2) : '*'.repeat(user.length);
    return `${maskedUser}@${domain}`;
  };

  const handleCodeChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const truncatedValue = numericValue.slice(0, CODE_CONFIG.LENGTH);
    setCode(truncatedValue);
    setError(null);
    if (truncatedValue.length < CODE_CONFIG.LENGTH) {
      const nextInput = inputRefs.current[truncatedValue.length];
      nextInput?.focus();
    }
    if (truncatedValue.length === CODE_CONFIG.LENGTH && attemptCount < 3) {
      handleAutoSubmit(truncatedValue);
    }
  };

  const handleAutoSubmit = async (fullCode: string) => {
    if (verificationStatus === 'verifying') return;
    const formEvent = { preventDefault: () => {} } as React.FormEvent;
    await handleSubmit(formEvent, fullCode);
  };

  async function handleSubmit(e: React.FormEvent, providedCode?: string) {
    e.preventDefault();
    const codeToVerify = providedCode || code;
    const currentAttempt = attemptCount + 1;

    if (isDevelopment) {
      console.log('[ConfirmEmail] handleSubmit - Iniciando submissão', {
        email,
        codeLength: codeToVerify.length,
        attempt: currentAttempt,
      });
    }

    if (!email) {
      setError('Email não encontrado. Por favor, refaça o registro.');
      return;
    }

    if (codeToVerify.length !== CODE_CONFIG.LENGTH) {
      setError(`O código deve ter ${CODE_CONFIG.LENGTH} dígitos.`);
      codeInputRef.current?.focus();
      return;
    }

    if (attemptCount >= 3) {
      setError('Muitas tentativas incorretas. Aguarde 5 minutos ou reenvie o código.');
      return;
    }

    setVerificationStatus('verifying');
    setError(null);
    setAttemptCount(currentAttempt);
    setIsLoading(true);

    try {
      if (isDevelopment) {
        console.log('[ConfirmEmail] Preparando dados para confirmação:', {
          email,
          username: username || 'não informado',
          codeLength: codeToVerify.length,
          attempt: currentAttempt,
        });
      }

      await publicAuth.confirmEmail({ email, token: codeToVerify });

      setVerificationStatus('success');
      setSuccessMessage('Email confirmado com sucesso! Redirecionando...');

      if (typeof window !== 'undefined') {
        localStorage.removeItem('pendingNickname');
      }

      setTimeout(() => {
        router.push('/dashboard/login?confirmed=true');
      }, 2000);
    } catch (err) {
      setVerificationStatus('error');
      if (isDevelopment) {
        console.error('[ConfirmEmail] Erro ao confirmar email:', err);
      }
      let errorMessage = 'Erro ao confirmar email. Por favor, tente novamente.';
      let shouldResetCode = false;
      let shouldFocus = true;

      if (err instanceof Error) {
        const errMessage = err.message.toLowerCase();
        if (
          errMessage.includes('codemismatch') ||
          errMessage.includes('código inválido') ||
          errMessage.includes('invalid code')
        ) {
          errorMessage = `Código incorreto. Tentativa ${currentAttempt} de 3.`;
          shouldResetCode = true;
          if (currentAttempt >= 3) {
            errorMessage += ' Aguarde 5 minutos antes de tentar novamente.';
            setResendCooldown(300);
          }
        } else if (
          errMessage.includes('expiredcode') ||
          errMessage.includes('expirado') ||
          errMessage.includes('expired')
        ) {
          errorMessage = '⏰ O código expirou. Códigos são válidos por 24 horas.';
          setVerificationStatus('expired');
        } else if (
          errMessage.includes('notauthorized') ||
          errMessage.includes('already confirmed') ||
          errMessage.includes('já confirmado')
        ) {
          errorMessage = 'Esta conta já foi confirmada. Você pode fazer login.';
          shouldFocus = false;
          setTimeout(() => {
            router.push('/dashboard/login');
          }, 3000);
        } else if (errMessage.includes('timeout') || errMessage.includes('network')) {
          errorMessage = 'Problema de conexão. Verifique sua internet e tente novamente.';
        } else if (errMessage.length > 0 && errMessage !== 'error') {
          errorMessage = err.message;
        }
      }

      setError(errorMessage);
      if (shouldResetCode) {
        setCode('');
      }
      if (shouldFocus) {
        codeInputRef.current?.focus();
      }
    } finally {
      if (verificationStatus !== 'success') {
        setIsLoading(false);
      }
    }
  }

  async function handleResend() {
    if (!email || !canResend() || isResending) return;
    setIsResending(true);
    setError(null);
    setResendSuccess(false);
    setCode('');
    setAttemptCount(0);
    setVerificationStatus('idle');

    try {
      await publicAuth.resendConfirmationCode({ email });
      setResendSuccess(true);
      setLastResendTime(Date.now());
      setResendCooldown(CODE_CONFIG.RESEND_DELAY);
      setTimeout(() => {
        codeInputRef.current?.focus();
        setResendSuccess(false);
      }, 3000);
    } catch (e) {
      let errorMessage = 'Erro ao reenviar código. Tente novamente.';
      if (e instanceof Error) {
        const err = e as any;
        const extractedMessage =
          err.data?.message ||
          err.data?.error?.message ||
          (err.message !== 'Erro de validação' ? err.message : '');
        if (extractedMessage && extractedMessage.length > 10) {
          const usefulKeywords = [
            'código de confirmação',
            'já foi enviado',
            'aguarde alguns minutos',
            'muitas tentativas',
            'não encontrado',
            'já foi confirmado',
            'spam',
            'suporte',
          ];
          if (usefulKeywords.some(keyword => extractedMessage.toLowerCase().includes(keyword))) {
            errorMessage = extractedMessage;
          }
        }
      }
      setError(errorMessage);
    } finally {
      setIsResending(false);
    }
  }

  return (
    <>
      <AuthLayout
        title="Confirmar email"
        description={`Digite o código enviado para ${formatEmailForDisplay(email)}`}
      >
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Verificação de Email
            </CardTitle>
            <CardDescription>
              Insira o código de {CODE_CONFIG.LENGTH} dígitos recebido por email
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {verificationStatus === 'expired' && (
                <Alert variant="destructive" className="animate-pulse">
                  <XCircle className="h-4 w-4" />
                  <AlertTitle>Código Expirado</AlertTitle>
                  <AlertDescription>
                    Este código expirou. Clique em "Reenviar Código" para receber um novo.
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert variant="destructive" className="animate-shake">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">{error}</AlertDescription>
                </Alert>
              )}

              {resendSuccess && (
                <Alert className="border-green-500 bg-green-50 dark:bg-green-950/20 animate-fade-in">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertDescription className="text-sm text-green-700 dark:text-green-400">
                    ✅ Novo código enviado! Verifique seu email.
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-full max-w-xs">
                    <Input
                      ref={codeInputRef}
                      id="verification-code"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="000000"
                      value={code}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleCodeChange(e.target.value)
                      }
                      maxLength={CODE_CONFIG.LENGTH}
                      disabled={verificationStatus === 'verifying'}
                      className={cn(
                        'h-16 text-center text-3xl tracking-[0.5em] font-mono',
                        'border-2 transition-all duration-200',
                        error ? 'border-destructive' : 'border-input',
                        verificationStatus === 'verifying' && 'opacity-50'
                      )}
                      aria-label="Código de verificação de 6 dígitos"
                    />
                    <div className="mt-2 flex justify-center gap-1">
                      {Array.from({ length: CODE_CONFIG.LENGTH }).map((_, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            'h-1 w-8 rounded-full transition-all duration-300',
                            idx < code.length ? 'bg-primary' : 'bg-muted'
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="text-center space-y-1">
                    <p className="text-xs text-muted-foreground">📧 Verifique sua caixa de entrada</p>
                    <p className="text-xs text-muted-foreground">
                      ⏰ Válido por {CODE_CONFIG.VALIDITY_HOURS} horas • Tentativa {attemptCount + 1}{' '}
                      de 3
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    className="w-full h-12 text-base font-medium"
                    disabled={
                      verificationStatus === 'verifying' ||
                      code.length !== CODE_CONFIG.LENGTH ||
                      attemptCount >= 3
                    }
                  >
                    {verificationStatus === 'verifying' ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verificando...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Confirmar Email
                      </>
                    )}
                  </Button>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="flex-1 h-11"
                      onClick={handleResend}
                      disabled={isResending || resendCooldown > 0 || !email}
                    >
                      {isResending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="mr-2 h-4 w-4" />
                      )}
                      {resendCooldown > 0
                        ? `Aguarde ${resendCooldown}s`
                        : isResending
                        ? 'Enviando...'
                        : 'Reenviar Código'}
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="lg"
                      className="flex-1 h-11"
                      onClick={() => router.push('/dashboard/login')}
                    >
                      Voltar
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </AuthLayout>
      <BackToTop />
    </>
  );
}

;



