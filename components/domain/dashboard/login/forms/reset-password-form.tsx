/**
 * Reset Password Form Component
 *
 * Formulário de reset de senha para redefinir senha com token de verificação.
 * Valida força da senha, confirmação de senha e redireciona após sucesso.
 *
 * @module components/domain/dashboard/login/forms/reset-password-form
 * @fileoverview Formulário de reset de senha com token
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <ResetPasswordForm token="reset-token-123" />
 * ```
 *
 * Características:
 * - Formulário com validação Zod
 * - Validação de força de senha
 * - Validação de confirmação de senha
 * - Indicador de força de senha
 * - Estados de loading, erro e sucesso
 * - Integração com react-hook-form
 * - Integração com AWS Cognito
 * - Redirecionamento após sucesso
 * - Acessibilidade completa
 */

'use client';

import { Alert, AlertDescription } from '@rainersoft/ui';
import { Button } from '@rainersoft/ui';
import { Label } from '@rainersoft/ui';
import { cn } from '@/lib/portfolio';
import { zodResolver } from '@hookform/resolvers/zod';
// Design tokens via CSS variables (imported in globals.css)
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { PasswordInput } from '../password-input';

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
      .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
      .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
      .regex(/[0-9]/, 'Senha deve conter pelo menos um número')
      .regex(
        /[^A-Za-z0-9]/,
        'Senha deve conter pelo menos um caractere especial'
      ),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: ResetPasswordFormValues) {
    setIsLoading(true);
    setError(null);

    try {
      // Fluxo legado baseado em token local foi descontinuado.
      // Orientar o usuário a utilizar o fluxo oficial de "Esqueci minha senha".
      throw new Error(
        'Este fluxo de redefinição de senha não está mais disponível. Use a opção "Esqueci minha senha" na tela de login para redefinir sua senha.'
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Erro ao redefinir senha. Tente novamente.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <Alert className="border-green-500">
        <CheckCircle2 className="h-4 w-4 text-green-500" />
        <AlertDescription className="text-green-700 dark:text-green-400">
          Senha redefinida com sucesso! Redirecionando para login...
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-5"
      >
        {error && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription className="text-sm wrap-break-word">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Nova senha */}
        <div className="space-y-2">
          <Label htmlFor="password">Nova Senha</Label>
          <PasswordInput
            value={form.watch('password')}
            onChange={(value) => form.setValue('password', value)}
            disabled={isLoading}
            showStrengthIndicator
          />
          {form.formState.errors.password && (
            <p className="text-sm text-destructive">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        {/* Confirmar nova senha */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
          <PasswordInput
            value={form.watch('confirmPassword')}
            onChange={(value) => form.setValue('confirmPassword', value)}
            disabled={isLoading}
          />
          {form.formState.errors.confirmPassword && (
            <p className="text-sm text-destructive">
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className={cn(
            'w-full h-9 sm:h-10',
            'transition-all duration-200 ease-in-out'
          )}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Redefinir Senha
        </Button>
      </form>
  );
}


