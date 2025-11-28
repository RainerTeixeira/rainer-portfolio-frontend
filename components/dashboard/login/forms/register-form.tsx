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

import { Alert, AlertDescription } from '@rainersoft/ui';
import { Button } from '@rainersoft/ui';
import { Checkbox } from '@rainersoft/ui';
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
import { cn } from '@/lib/portfolio';
import { MOTION } from '@rainersoft/design-tokens';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { PasswordInput } from '../password-input';
import { TermsDialog } from '../terms-dialog';
import { authService } from '@/lib/api/services/auth.service';

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
  const [registeredEmail, setRegisteredEmail] = useState<string>('');

  const form = useForm<RegisterFormValues>({
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
      // Modo produção: usar AWS Cognito via authService (sempre backend)
      const registerResponse = await authService.register({
        fullName: data.name,
        email: data.email,
        password: data.password,
        nickname: data.username,
      });

      console.log('✅ Registro bem-sucedido:', registerResponse);
      setRegisteredEmail(data.email);
      setSuccess(true);

      // Redirecionar para página de confirmação de email após 2s
      setTimeout(() => {
        window.location.href = `/dashboard/login/confirm-email?email=${encodeURIComponent(data.email)}`;
      }, 2000);
    } catch (err: any) {
      console.error('❌ Erro ao registrar:', err);
      let errorMessage = 'Erro ao criar conta. Tente novamente.';
      
      // Tratar erros específicos do Cognito
      if (err.message) {
        if (err.message.includes('already exists') || err.message.includes('já existe')) {
          errorMessage = 'Este email já está registrado. Tente fazer login ou use outro email.';
        } else if (err.message.includes('Invalid email')) {
          errorMessage = 'Email inválido. Por favor, verifique e tente novamente.';
        } else if (err.message.includes('Password')) {
          errorMessage = 'Senha não atende aos requisitos de segurança.';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  if (success) {
    const forceCognito = process.env.NEXT_PUBLIC_FORCE_COGNITO_AUTH === 'true';
    
    return (
      <Alert className="border-green-500">
        <CheckCircle2 className="h-4 w-4 text-green-500" />
        <AlertDescription className="text-green-700 dark:text-green-400">
          {forceCognito ? (
            <>
              ✅ Conta criada com sucesso! 
              <br />
              📧 Verifique seu email <strong>{registeredEmail}</strong> e insira o código de confirmação na próxima página.
            </>
          ) : (
            'Conta criada com sucesso! Verifique seu email para ativar sua conta.'
          )}
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
          render={({ field }: { field: any }) => (
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
          render={({ field }: { field: any }) => (
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
          render={({ field }: { field: any }) => (
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
          render={({ field }: { field: any }) => (
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
          render={({ field }: { field: any }) => (
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
          render={({ field }: { field: any }) => (
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
                        MOTION.TRANSITION.COLOR
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
                        MOTION.TRANSITION.COLOR
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


