/**
 * Reset Password Page Component (with Token)
 *
 * Página para redefinir senha usando token de verificação.
 * Recebe token via parâmetro de rota e renderiza ResetPasswordForm.
 *
 * @module app/dashboard/login/reset-password/[token]/page
 * @fileoverview Página de reset de senha com token
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Rota: /dashboard/login/reset-password/[token]
 * // Exemplo: /dashboard/login/reset-password/abc123xyz
 * ```
 */

'use client';

import { AuthLayout, ResetPasswordForm } from '../../../../../components/domain/dashboard/login';
import { BackToTop } from '@rainersoft/ui';
import { cn } from '@rainersoft/ui';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ResetPasswordPageProps {
  params: {
    token: string;
  };
}

export default function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  return (
    <>
      <AuthLayout
        title="Redefinir senha"
        description="Digite sua nova senha abaixo. Use o token recebido por email."
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
        <ResetPasswordForm token={params.token} />
      </AuthLayout>

      <BackToTop />
    </>
  );
}
