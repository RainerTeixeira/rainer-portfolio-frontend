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

export const dynamic = 'force-dynamic';

import { Alert, AlertDescription } from '@rainersoft/ui';
import { Button } from '@rainersoft/ui';
import { Label } from '@rainersoft/ui';
import { Input } from '@rainersoft/ui';
import { cn } from '@rainersoft/ui';
import { zodResolver } from '@hookform/resolvers/zod';
// Design tokens via CSS variables (imported in globals.css)
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { usePasswordInput } from '@/hooks/use-password-input';

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

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const passwordInput = usePasswordInput({
    value: form.watch('password'),
    onChange: (value: string) => form.setValue('password', value),
    disabled: isLoading,
    showStrengthIndicator: true,
  });

  const confirmPasswordInput = usePasswordInput({
    value: form.watch('confirmPassword'),
    onChange: (value: string) => form.setValue('confirmPassword', value),
    disabled: isLoading,
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
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
  };

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
      className="space-y-4"
    >
      {error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            {error}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="password">Nova Senha</Label>
        <div className="relative">
          <Input {...passwordInput.inputProps} />
          <button {...passwordInput.buttonProps}>
            {passwordInput.icon}
          </button>
        </div>
        {passwordInput.showStrengthIndicator && passwordInput.inputProps.value && (
          <div className="space-y-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'h-1 flex-1',
                    'rounded-full',
                    'transition-colors duration-200 ease-in-out',
                    i < passwordInput.passwordStrength.strength
                      ? passwordInput.passwordStrength.color
                      : 'bg-muted'
                  )}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Força: <span className="font-medium">{passwordInput.passwordStrength.label}</span>
            </p>
          </div>
        )}
        {form.formState.errors.password && (
          <p className="text-sm text-destructive">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
        <div className="relative">
          <Input {...confirmPasswordInput.inputProps} />
          <button {...confirmPasswordInput.buttonProps}>
            {confirmPasswordInput.icon}
          </button>
        </div>
        {form.formState.errors.confirmPassword && (
          <p className="text-sm text-destructive">
            {form.formState.errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-10"
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Redefinir Senha
      </Button>
    </form>
  );
}



