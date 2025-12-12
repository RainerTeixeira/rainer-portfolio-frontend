/**
 * Reset Password Page Component (with Query Params)
 *
 * Página para redefinir senha usando código de verificação e email
 * recebidos via query parameters. Permite ao usuário definir nova
 * senha após solicitar recuperação.
 *
 * @module app/dashboard/login/reset-password/page
 * @fileoverview Página de reset de senha com query params
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Rota: /dashboard/login/reset-password?email=user@example.com&code=123456
 * // Acessível após solicitar recuperação de senha
 * ```
 */

'use client';

import { AuthLayout } from '../../../../components/domain/dashboard/login';
import { PasswordInput } from '../../../../components/domain/dashboard/login/password-input';
import { BackToTop } from '@rainersoft/ui';
import { Alert, AlertDescription } from '@rainersoft/ui';
import { Button } from '@rainersoft/ui';
import { Input } from '@rainersoft/ui';
import { Label } from '@rainersoft/ui';
import { cn } from '@rainersoft/ui';
import { AlertCircle, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const code = searchParams.get('code') || '';

  const [verificationCode, setVerificationCode] = useState(code);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  /**
   * Handler de submit do formulário de reset de senha.
   * Valida campos e redefine senha usando código de verificação.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validação de campos obrigatórios
    if (!verificationCode.trim()) {
      setError('Digite o código de verificação');
      return;
    }

    if (!newPassword.trim()) {
      setError('Digite a nova senha');
      return;
    }

    // Validação de requisitos de senha
    if (newPassword.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres');
      return;
    }

    // Validação de confirmação de senha
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setIsLoading(true);

    try {
      const { authService } = await import('../../../../lib/api');

      await authService.resetPassword({
        email,
        code: verificationCode,
        newPassword,
      });

      setSuccess(true);
      toast.success('Senha redefinida com sucesso!');

      setTimeout(() => {
        router.push('/dashboard/login');
      }, 2000);
    } catch (err) {
      let errorMessage = 'Erro ao redefinir senha. Tente novamente.';

      if (err instanceof Error) {
        if (
          err.message.includes('Código de verificação inválido') ||
          err.message.includes('CodeMismatchException')
        ) {
          errorMessage =
            'Código de verificação inválido. Verifique o código recebido por email e tente novamente.';
        } else if (
          err.message.includes('expirado') ||
          err.message.includes('ExpiredCodeException')
        ) {
          errorMessage =
            'Código de verificação expirado. Solicite um novo código de recuperação.';
        } else if (
          err.message.includes('InvalidPasswordException') ||
          err.message.includes('requisitos de segurança')
        ) {
          errorMessage =
            'A nova senha não atende aos requisitos de segurança. Ela deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.';
        } else if (err.message) {
          errorMessage = err.message;
        }
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthLayout
        title="Redefinir senha"
        description={
          email
            ? `Digite o código de 6 dígitos recebido no email ${email} e defina sua nova senha. O código é válido por 24 horas.`
            : 'Digite o código de 6 dígitos recebido por email e defina sua nova senha. O código é válido por 24 horas.'
        }
        showBranding={true}
        maxWidth="md"
        footer={
          <div className="text-center">
            <Link
              href="/dashboard/login"
              className={cn(
                'inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20',
                'transition-colors duration-200 ease-in-out'
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para login
            </Link>
          </div>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Campo de código de verificação */}
          {/* Código de 6 dígitos recebido por email */}
          <div className="space-y-2">
            <Label htmlFor="code">Código de Verificação</Label>
            <Input
              id="code"
              type="text"
              placeholder="Digite o código de 6 dígitos"
              value={verificationCode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setVerificationCode(e.target.value)
              }
              disabled={isLoading}
              className={cn(
                'h-9 sm:h-10 text-center text-lg tracking-widest font-mono',
                'rounded-md',
                'transition-all duration-200 ease-in-out'
              )}
              maxLength={6}
              autoFocus
            />
          </div>

          {/* Campo de nova senha */}
          {/* Senha deve ter no mínimo 8 caracteres com indicador de força */}
          <div className="space-y-2">
            <Label htmlFor="newPassword">Nova Senha</Label>
            <PasswordInput
              value={newPassword}
              onChange={setNewPassword}
              placeholder="Mínimo 8 caracteres"
              disabled={isLoading}
              showStrengthIndicator
              name="newPassword"
              id="newPassword"
            />
          </div>

          {/* Campo de confirmação de senha */}
          {/* Deve coincidir com a nova senha */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <PasswordInput
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Digite a senha novamente"
              disabled={isLoading}
              name="confirmPassword"
              id="confirmPassword"
            />
          </div>

          {/* Mensagens de feedback */}
          {/* Exibe erros de validação ou confirmação */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm wrap-break-word">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Mensagem de sucesso após redefinição */}
          {success && (
            <Alert className="border-green-500 bg-green-50 dark:bg-green-950/20">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-sm text-green-700 dark:text-green-400">
                Senha redefinida! Redirecionando para login...
              </AlertDescription>
            </Alert>
          )}

          {/* Botão de submit */}
          {/* Redefine senha após validação bem-sucedida */}
          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={isLoading}
            className="w-full h-9 sm:h-10"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Redefinindo...
              </>
            ) : (
              'Redefinir Senha'
            )}
          </Button>
        </form>
      </AuthLayout>

      <BackToTop />
    </>
  );
}


