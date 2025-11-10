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

import { ResetPasswordForm } from '@/components/dashboard/login';
import { BackToTop } from '@/components/ui';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { SITE_CONFIG } from '@/constants';
import { cn } from '@/lib/utils';
import { BACKGROUND, GRADIENTS } from '@rainer/design-tokens';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Redefinir Senha | Dashboard',
  description: 'Crie uma nova senha para sua conta',
};

interface ResetPasswordPageProps {
  params: {
    token: string;
  };
}

export default function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  return (
    <div
      className={cn(
        'min-h-screen flex items-center justify-center p-4',
        BACKGROUND.SOFT_GRADIENT
      )}
    >
      <div className="w-full max-w-md space-y-6">
        {/* Logo/Brand */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1
              className={cn(
                'text-3xl font-bold bg-clip-text text-transparent',
                GRADIENTS.TEXT_CYAN_PURPLE_PINK
              )}
            >
              {SITE_CONFIG.fullName} - Dashboard
            </h1>
          </Link>
        </div>

        {/* Form Card */}
        <Card className="border-2">
          <CardHeader className="pb-4">
            {/* Conteúdo do header está no form */}
          </CardHeader>
          <CardContent>
            <ResetPasswordForm token={params.token} />
          </CardContent>
        </Card>
      </div>

      {/* Back to Top */}
      <BackToTop />
    </div>
  );
}
