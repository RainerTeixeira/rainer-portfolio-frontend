/**
 * Verify Email Admin Page Component
 *
 * Página de verificação administrativa de email. Permite verificar
 * email e confirmar signup administrativamente, útil para resolver
 * problemas quando usuários não conseguem verificar email normalmente.
 *
 * @module app/dashboard/login/verify-email-admin/page
 * @fileoverview Página de verificação administrativa de email
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Rota: /dashboard/login/verify-email-admin
 * // Uso administrativo para verificar emails manualmente
 * ```
 */

'use client';

import { Alert, AlertDescription } from '@rainersoft/ui';
import { Button } from '@rainersoft/ui';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rainersoft/ui';
import { Input } from '@rainersoft/ui';
import { Label } from '@rainersoft/ui';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Mail,
  Shield,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

/**
 * VerifyEmailAdminPage Component
 *
 * Componente da página de verificação administrativa de email.
 * Permite verificar email e confirmar signup de usuários manualmente,
 * útil para resolver problemas quando usuários não conseguem verificar
 * email normalmente através do fluxo padrão.
 *
 * @component
 * @returns {JSX.Element} Página de verificação administrativa
 *
 * @remarks
 * Funcionalidades:
 * - Aceita email, username ou cognitoSub como identificador
 * - Verifica e confirma email administrativamente
 * - Exibe feedback de sucesso/erro
 * - Redireciona para login após sucesso
 */
export default function VerifyEmailAdminPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState<{
    username: string;
    email: string;
  } | null>(null);

  /**
   * Handler de submit do formulário de verificação administrativa.
   * Verifica email e confirma signup de usuário usando identificador (email, username ou cognitoSub).
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setResult(null);

    // Validação de identificador obrigatório
    if (!identifier.trim()) {
      setError(
        'Digite o identificador do usuário (email, username ou cognitoSub)'
      );
      return;
    }

    setIsLoading(true);

    try {
      const { authService } = await import('@/lib/api');

      const response = await authService.verifyEmailAdmin(identifier.trim());

      if (response.success && response.data) {
        setSuccess(true);
        setResult(response.data);
        toast.success('E-mail verificado e usuário confirmado com sucesso!');

        setTimeout(() => {
          router.push('/dashboard/login');
        }, 3000);
      } else {
        throw new Error(response.message || 'Erro ao verificar e-mail');
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Erro ao verificar e-mail administrativamente';
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
              <Shield className="w-6 h-6 text-cyan-500" />
              Verificação Administrativa
            </CardTitle>
            <CardDescription>
              Verifique o e-mail e confirme o signup de um usuário
              administrativamente.
              <br />
              <span className="text-xs text-muted-foreground mt-2 block">
                Use email, username ou cognitoSub (sub) como identificador
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Estado de sucesso após verificação */}
            {/* Exibe informações do usuário verificado */}
            {success && result ? (
              <div className="space-y-4">
                <Alert className="border-green-500 bg-green-500/10">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <AlertDescription className="text-green-700 dark:text-green-400">
                    <strong>E-mail verificado com sucesso!</strong>
                    <div className="mt-2 space-y-1 text-sm">
                      <p>
                        <strong>Username:</strong> {result.username}
                      </p>
                      <p>
                        <strong>Email:</strong> {result.email}
                      </p>
                    </div>
                    <p className="mt-2">Redirecionando para login...</p>
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              /* Formulário de verificação administrativa */
              /* Permite inserir identificador e verificar email manualmente */
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="identifier">Identificador do Usuário</Label>
                  <Input
                    id="identifier"
                    type="text"
                    placeholder="email@example.com, username ou cognitoSub"
                    value={identifier}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setIdentifier(e.target.value)
                    }
                    disabled={isLoading}
                    className="h-11"
                    autoFocus
                  />
                  <p className="text-xs text-muted-foreground">
                    Você pode usar o email, username (ex: adriana_galisteu) ou
                    cognitoSub (ex: f48854d8-...)
                  </p>
                </div>

                {/* Mensagem de erro */}
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Botão de submit */}
                <Button
                  type="submit"
                  disabled={isLoading || !identifier.trim()}
                  className="w-full h-11 text-base"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Verificando...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5 mr-2" />
                      Verificar E-mail Administrativamente
                    </>
                  )}
                </Button>
              </form>
            )}

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
