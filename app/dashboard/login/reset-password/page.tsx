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

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
} from 'lucide-react';
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!verificationCode.trim()) {
      setError('Digite o código de verificação');
      return;
    }

    if (!newPassword.trim()) {
      setError('Digite a nova senha');
      return;
    }

    if (newPassword.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setIsLoading(true);

    try {
      const { authService } = await import('@/lib/api');

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
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Lock className="w-6 h-6 text-cyan-500" />
              Redefinir Senha
            </CardTitle>
            <CardDescription>
              Digite o código de 6 dígitos recebido no email{' '}
              <strong>{email}</strong> e defina sua nova senha. O código é
              válido por 24 horas.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Código de Verificação</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="Digite o código de 6 dígitos"
                  value={verificationCode}
                  onChange={e => setVerificationCode(e.target.value)}
                  disabled={isLoading}
                  className="h-11"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Nova Senha</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mínimo 8 caracteres"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    disabled={isLoading}
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Digite a senha novamente"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
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
                    Senha redefinida! Redirecionando para login...
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 text-base"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Redefinindo...
                  </>
                ) : (
                  'Redefinir Senha'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/dashboard/login"
                className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para login
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
