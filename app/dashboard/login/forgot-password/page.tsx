/**
 * Forgot Password Page Component
 *
 * Página para solicitar recuperação de senha. Permite ao usuário
 * solicitar código de verificação por email para redefinir senha.
 *
 * @module app/dashboard/login/forgot-password/page
 * @fileoverview Página de recuperação de senha
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Rota: /dashboard/login/forgot-password
 * // Acessível via link na página de login
 * ```
 */

'use client';

import { AuthLayout, ForgotPasswordForm } from '@/components/domain/dashboard/login';
import { BackToTop } from '@rainersoft/ui';
import { cn } from '@/lib/portfolio';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <>
      <AuthLayout
        title="Recuperar senha"
        description="Digite seu email e enviaremos instruções para redefinir sua senha"
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
        <ForgotPasswordForm />
      </AuthLayout>

      <BackToTop />
    </>
  );
}


