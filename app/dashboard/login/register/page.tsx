/**
 * Register Page Component
 *
 * Página de registro para cadastro de novos usuários no dashboard.
 * Integrada com RegisterForm e TermsDialog para aceite de termos.
 *
 * @module app/dashboard/login/register/page
 * @fileoverview Página de registro do dashboard
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Rota: /dashboard/login/register
 * // Acessível via link na página de login
 * ```
 */

import { RegisterForm, TermsDialog } from '@/components/dashboard/login';
import { BackToTop } from '@/components/ui';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SITE_CONFIG } from '@/constants';
import { cn } from '@/lib/utils';
import { BACKGROUND, GRADIENTS } from '@rainer/design-tokens';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Criar Conta | Dashboard',
  description: 'Crie sua conta para acessar o dashboard',
};

export default function RegisterPage() {
  return (
    <div
      className={cn(
        'min-h-screen flex items-center justify-center p-4',
        BACKGROUND.SOFT_GRADIENT
      )}
    >
      <div className="w-full max-w-lg space-y-6">
        {/* Logo/Brand */}
        <div className="text-center space-y-2">
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
          <p className="text-muted-foreground">
            Crie sua conta para acessar o dashboard
          </p>
        </div>

        {/* Form Card */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Criar Conta</CardTitle>
            <CardDescription>
              Preencha os dados abaixo para criar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground">
          Ao criar uma conta, você concorda com nossos{' '}
          <TermsDialog type="terms">
            <button className="text-cyan-500 hover:underline font-medium cursor-pointer">
              Termos de Uso
            </button>
          </TermsDialog>{' '}
          e{' '}
          <TermsDialog type="privacy">
            <button className="text-cyan-500 hover:underline font-medium cursor-pointer">
              Política de Privacidade
            </button>
          </TermsDialog>
        </p>
      </div>

      {/* Back to Top */}
      <BackToTop />
    </div>
  );
}
