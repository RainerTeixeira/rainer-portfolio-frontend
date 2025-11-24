/**
 * Forgot Password Form Component
 *
 * Formulário de recuperação de senha para solicitar reset de senha. Valida
 * email, envia código de verificação e integra com sistema de autenticação.
 *
 * @module components/dashboard/login/forms/forgot-password-form
 * @fileoverview Formulário de recuperação de senha
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <ForgotPasswordForm />
 * ```
 *
 * Características:
 * - Formulário com validação Zod
 * - Validação de email
 * - Estados de loading, erro e sucesso
 * - Integração com react-hook-form
 * - Integração com AWS Cognito
 * - Mensagens de feedback claras
 * - Acessibilidade completa
 */

'use client';

import { Alert, AlertDescription } from '@rainersoft/ui';
import { Button } from '@rainersoft/ui';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@rainersoft/ui';
import { Input } from '@rainersoft/ui';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
// Design tokens via CSS variables (imported in globals.css)
import { ArrowLeft, CheckCircle2, Loader2, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: ForgotPasswordFormValues) {
    setIsLoading(true);
    setError(null);

    try {
      const { localAuth } = await import(
        '@/components/dashboard/lib/auth-local'
      );

      const result = await localAuth.forgotPassword(data.email);

      if (!result.success) {
        throw new Error(result.message);
      }

      // Mostrar token no console para dev
      if (result.token) {
        console.log(
          '🔗 Use este link para resetar:',
          `/dashboard/login/reset-password/${result.token}`
        );
      }

      setSuccess(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Erro ao enviar email. Tente novamente.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <div className="space-y-4">
        <Alert className="border-green-500">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-700 dark:text-green-400">
            Email enviado com sucesso! Verifique sua caixa de entrada para
            redefinir sua senha.
          </AlertDescription>
        </Alert>

        <Link
          href="/dashboard/login"
          className={cn(
            'flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20',
            'transition-colors duration-200 ease-in-out'
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para login
        </Link>
      </div>
    );
  }

  return (
    <Form {...form}>
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

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  {...field}
                  disabled={isLoading}
                  className="h-9 sm:h-10"
                />
              </FormControl>
              <FormDescription>
                Enviaremos um link de recuperação para este email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-9 sm:h-10"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Enviar Link de Recuperação
        </Button>
      </form>
    </Form>
  );
}
