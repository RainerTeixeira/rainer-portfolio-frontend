/**
 * Register Form Component
 *
 * Formulário de registro para cadastro de novos usuários. Inclui validação
 * completa de campos, verificação de disponibilidade de nickname em tempo real,
 * indicador de força de senha e integração com sistema de autenticação.
 *
 * @module components/dashboard/login/forms/register-form
 * @fileoverview Formulário de registro com validação completa
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <RegisterForm
 *   onSuccess={() => router.push('/dashboard')}
 *   onError={(error) => console.error(error)}
 * />
 * ```
 *
 * Características:
 * - Formulário completo com validação Zod
 * - Verificação de disponibilidade de nickname
 * - Indicador de força de senha
 * - Validação de confirmação de senha
 * - Aceite de termos e política de privacidade
 * - Estados de loading, erro e sucesso
 * - Integração com react-hook-form
 * - Integração com AWS Cognito
 * - Acessibilidade completa
 */

'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
// Design tokens via CSS variables (imported in globals.css)
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { PasswordInput } from '../password-input';
import { TermsDialog } from '../terms-dialog';

// Schema de validação
const registerSchema = z
  .object({
    name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
    username: z
      .string()
      .min(3, 'Username deve ter no mínimo 3 caracteres')
      .max(20, 'Username deve ter no máximo 20 caracteres')
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        'Username deve conter apenas letras, números, - e _'
      ),
    email: z.string().email('Email inválido'),
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
    acceptTerms: z.boolean().refine(val => val === true, {
      message: 'Você deve aceitar os termos de uso',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSuccess?: () => void;
}

export function RegisterForm({}: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    setError(null);

    try {
      const { localAuth } = await import(
        '@/components/dashboard/lib/auth-local'
      );

      const result = await localAuth.register({
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
      });

      if (!result.success) {
        throw new Error(result.message);
      }

      setSuccess(true);

      // Aguardar 2s e redirecionar para login
      setTimeout(() => {
        window.location.href = '/dashboard/login';
      }, 2000);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Erro ao criar conta. Tente novamente.';
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
          Conta criada com sucesso! Verifique seu email para ativar sua conta.
        </AlertDescription>
      </Alert>
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

        {/* Nome completo */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input
                  placeholder="João da Silva"
                  {...field}
                  disabled={isLoading}
                  className="h-9 sm:h-10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome de Usuário</FormLabel>
              <FormControl>
                <Input
                  placeholder="joaosilva"
                  {...field}
                  disabled={isLoading}
                  className="h-9 sm:h-10"
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                Apenas letras, números, - e _
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="joao@exemplo.com"
                  {...field}
                  disabled={isLoading}
                  className="h-9 sm:h-10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Senha */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <PasswordInput
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isLoading}
                  showStrengthIndicator
                  name={field.name}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirmar senha */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Senha</FormLabel>
              <FormControl>
                <PasswordInput
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isLoading}
                  name={field.name}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Termos de uso */}
        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-normal">
                  Eu aceito os{' '}
                  <TermsDialog type="terms">
                    <button
                      type="button"
                      className={cn(
                        'text-primary hover:underline font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20',
                        TRANSITIONS.COLORS
                      )}
                    >
                      Termos de Uso
                    </button>
                  </TermsDialog>{' '}
                  e{' '}
                  <TermsDialog type="privacy">
                    <button
                      type="button"
                      className={cn(
                        'text-primary hover:underline font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20',
                        TRANSITIONS.COLORS
                      )}
                    >
                      Política de Privacidade
                    </button>
                  </TermsDialog>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-9 sm:h-10"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Criar Conta
        </Button>
      </form>
    </Form>
  );
}
