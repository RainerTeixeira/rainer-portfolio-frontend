/**
 * Forgot Password Form Component
 *
 * Formulário de recuperação de senha para solicitar reset de senha. Valida
 * email, envia código de verificação e integra com sistema de autenticação.
 *
 * @module components/domain/dashboard/login/forms/forgot-password-form
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

import { Alert, AlertDescription } from '@rainersoft/ui';
import { Button } from '@rainersoft/ui';
import { Label } from '@rainersoft/ui';
import { Input } from '@rainersoft/ui';
import { cn } from '@rainersoft/ui';
import { publicAuth } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
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
  const [sentEmail, setSentEmail] = useState<string>('');

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await publicAuth.forgotPassword({
        email: data.email,
      });

      console.log('✅ Código de recuperação enviado:', response);
      setSentEmail(data.email);
      setSuccess(true);
    } catch (err: any) {
      console.error('❌ Erro ao enviar código:', err);
      let errorMessage = 'Erro ao enviar código de recuperação. Tente novamente.';
      
      if (err.message) {
        if (err.message.includes('User not found') || err.message.includes('UserNotFoundException')) {
          errorMessage = 'Email não encontrado. Verifique o email digitado.';
        } else if (err.message.includes('Invalid email')) {
          errorMessage = 'Email inválido. Por favor, verifique e tente novamente.';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Alert className="border-green-500">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-700 dark:text-green-400">
            ✅ Código de recuperação enviado para <strong>{sentEmail}</strong>.
            <br />
            📧 Verifique sua caixa de entrada e insira o código na próxima página.
          </AlertDescription>
        </Alert>
      </motion.div>
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
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          {...form.register('email')}
          disabled={isLoading}
          className="h-10"
        />
        {form.formState.errors.email && (
          <p className="text-sm text-destructive">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 pt-2">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-10"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Enviar Código de Recuperação
        </Button>
        
        <Link href="/dashboard/login">
          <Button
            type="button"
            variant="outline"
            className="w-full h-10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Login
          </Button>
        </Link>
      </div>
    </form>
  );
}
