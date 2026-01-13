/**
 * Register Form Component
 *
 * Formulário de registro para cadastro de novos usuários. Inclui validação
 * completa de campos, verificação de disponibilidade de nickname em tempo real,
 * indicador de força de senha e integração com sistema de autenticação.
 *
 * @module components/domain/dashboard/login/forms/register-form
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

import { Alert, AlertDescription, Button, Checkbox, Label, Input } from '@rainersoft/ui';
import { cn } from '@rainersoft/ui';
import { MOTION } from '@rainersoft/design-tokens';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { env } from '@/lib/config/env';
import { publicAuth } from '@/lib/api';
import { TermsDialog } from '../terms-dialog';

/**
 * Schema de validação para o formulário de registro
 * @constant {z.ZodSchema}
 */
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

/**
 * Tipo para os valores do formulário de registro
 * @typedef {z.infer<typeof registerSchema>} RegisterFormValues
 */
type RegisterFormValues = z.infer<typeof registerSchema>;

/**
 * Propriedades do componente RegisterForm
 * @interface RegisterFormProps
 * @property {() => void} [onSuccess] - Callback executado após registro bem-sucedido
 * @property {(error: string) => void} [onError] - Callback executado em caso de erro
 */
interface RegisterFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

/**
 * Componente RegisterForm
 *
 * Renderiza formulário completo de registro com validação em tempo real,
 * verificação de disponibilidade de username e integração com AWS Cognito.
 *
 * @component
 * @param {RegisterFormProps} props - Propriedades do componente
 * @returns {JSX.Element} Formulário de registro
 *
 * @remarks
 * Funcionalidades:
 * - Validação de campos com Zod
 * - Toggle de visibilidade de senha
 * - Verificação de disponibilidade de nickname
 * - Indicador de força de senha
 * - Aceitação de termos e política
 * - Estados de loading, erro e sucesso
 * - Redirecionamento automático após confirmação
 */
export function RegisterForm({ onSuccess, onError }: RegisterFormProps) {
  /**
   * Estados do componente
   * @type {Object}
   * @property {boolean} isLoading - Flag de carregamento durante registro
   * @property {string | null} error - Mensagem de erro a ser exibida
   * @property {boolean} success - Flag de sucesso no registro
   * @property {string} registeredEmail - Email registrado para exibição de sucesso
   */
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState<string>('');

  /**
   * Configuração do formulário com react-hook-form
   * @type {Object}
   */
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

  /**
   * Handler de submit do formulário de registro
   *
   * @param {RegisterFormValues} data - Dados do formulário validados
   * @returns {Promise<void>}
   */
  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      // Registro via AWS Cognito
      const registerResponse = await publicAuth.register({
        fullName: data.name,
        email: data.email,
        password: data.password,
        nickname: data.username,
      });

      console.log('✅ Registro bem-sucedido:', registerResponse);
      setRegisteredEmail(data.email);
      setSuccess(true);
      onSuccess?.();

      // Redirecionar para página de confirmação de email
      setTimeout(() => {
        window.location.href = `/dashboard/login/confirm-email?email=${encodeURIComponent(data.email)}`;
      }, 2000);
    } catch (err: any) {
      console.error('❌ Erro ao registrar:', err);
      let errorMessage = 'Erro ao criar conta. Tente novamente.';
      
      // Tratamento de erros específicos do Cognito
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
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  // Estado de sucesso - exibe mensagem de confirmação
  if (success) {
    const forceCognito = env.NEXT_PUBLIC_FORCE_COGNITO_AUTH;
    
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
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 sm:space-y-5"
      noValidate
    >
      {/* Mensagem de erro */}
      {error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription className="text-sm wrap-break-word">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Nome completo */}
      <div className="space-y-2">
        <Label htmlFor="name">Nome Completo</Label>
        <Input
          id="name"
          placeholder="João da Silva"
          {...form.register('name')}
          disabled={isLoading}
          className="h-9 sm:h-10"
          aria-required="true"
          aria-invalid={!!form.formState.errors.name}
          aria-describedby={form.formState.errors.name ? 'name-error' : undefined}
        />
        {form.formState.errors.name && (
          <p id="name-error" className="text-sm text-destructive">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      {/* Username */}
      <div className="space-y-2">
        <Label htmlFor="username">Nome de Usuário</Label>
        <Input
          id="username"
          placeholder="joaosilva"
          {...form.register('username')}
          disabled={isLoading}
          className="h-9 sm:h-10"
          aria-required="true"
          aria-invalid={!!form.formState.errors.username}
          aria-describedby={form.formState.errors.username ? 'username-error' : undefined}
        />
        {form.formState.errors.username && (
          <p id="username-error" className="text-sm text-destructive">
            {form.formState.errors.username.message}
          </p>
        )}
        <p className="text-xs sm:text-sm text-muted-foreground">
          Apenas letras, números, - e _
        </p>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="joao@exemplo.com"
          {...form.register('email')}
          disabled={isLoading}
          className="h-9 sm:h-10"
          aria-required="true"
          aria-invalid={!!form.formState.errors.email}
          aria-describedby={form.formState.errors.email ? 'email-error' : undefined}
        />
        {form.formState.errors.email && (
          <p id="email-error" className="text-sm text-destructive">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      {/* Senha */}
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <div className="relative">
          <Input
            type="password"
            id="password"
            {...form.register('password')}
            disabled={isLoading}
            className="pr-10"
            aria-required="true"
            aria-invalid={!!form.formState.errors.password}
            aria-describedby={form.formState.errors.password ? 'password-error' : undefined}
          />
          <button
            type="button"
            className={cn(
              'absolute right-2 top-1/2',
              'text-gray-400 hover:text-gray-600',
              'transition-colors duration-200',
              MOTION.TRANSITION.COLOR
            )}
            onClick={() => {
              const input = document.getElementById('password') as HTMLInputElement;
              if (input) {
                input.type = input.type === 'password' ? 'text' : 'password';
              }
            }}
            aria-label="Mostrar/ocultar senha"
          >
            👁
          </button>
        </div>
        {form.formState.errors.password && (
          <p id="password-error" className="text-sm text-destructive">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      {/* Confirmar senha */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar Senha</Label>
        <div className="relative">
          <Input
            type="password"
            id="confirmPassword"
            {...form.register('confirmPassword')}
            disabled={isLoading}
            className="pr-10"
            aria-required="true"
            aria-invalid={!!form.formState.errors.confirmPassword}
            aria-describedby={form.formState.errors.confirmPassword ? 'confirmPassword-error' : undefined}
          />
          <button
            type="button"
            className={cn(
              'absolute right-2 top-1/2',
              'text-gray-400 hover:text-gray-600',
              'transition-colors duration-200',
              MOTION.TRANSITION.COLOR
            )}
            onClick={() => {
              const input = document.getElementById('confirmPassword') as HTMLInputElement;
              if (input) {
                input.type = input.type === 'password' ? 'text' : 'password';
              }
            }}
            aria-label="Mostrar/ocultar senha"
          >
            👁
          </button>
        </div>
        {form.formState.errors.confirmPassword && (
          <p id="confirmPassword-error" className="text-sm text-destructive">
            {form.formState.errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Termos de uso */}
      <div className="flex flex-row items-start space-x-3 space-y-0">
        <Checkbox
          checked={form.watch('acceptTerms')}
          onCheckedChange={(checked: boolean) => form.setValue('acceptTerms', checked)}
          disabled={isLoading}
          id="acceptTerms"
          aria-required="true"
          aria-invalid={!!form.formState.errors.acceptTerms}
        />
        <div className="space-y-1 leading-none">
          <label 
            htmlFor="acceptTerms"
            className="text-sm font-normal cursor-pointer"
          >
            Eu aceito os{' '}
            <TermsDialog type="terms">
              <button
                type="button"
                className={cn(
                  'text-primary hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-primary/20',
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
                  'text-primary hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-primary/20',
                  MOTION.TRANSITION.COLOR
                )}
              >
                Política de Privacidade
              </button>
            </TermsDialog>
          </label>
          {form.formState.errors.acceptTerms && (
            <p className="text-sm text-destructive">
              {form.formState.errors.acceptTerms.message}
            </p>
          )}
        </div>
      </div>

      {/* Botão de submit */}
      <Button
        type="submit"
        className="w-full h-9 sm:h-10"
        disabled={isLoading}
        aria-busy={isLoading}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
        Criar Conta
      </Button>
    </form>
  );
}