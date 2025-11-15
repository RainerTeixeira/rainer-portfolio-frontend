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

'use client';

import {
  AuthLayout,
  RegisterForm,
  TermsDialog,
} from '@/components/dashboard/login';
import { BackToTop } from '@/components/ui';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <>
      <AuthLayout
        title="Criar conta"
        description="Preencha os dados abaixo para criar sua conta"
        showBranding={true}
        maxWidth="lg"
        footer={
          <>
            <p className="text-center text-sm text-muted-foreground mb-4">
              Já tem uma conta?{' '}
              <Link
                href="/dashboard/login"
                className={cn(
                  'text-primary hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-primary/20',
                  'transition-colors duration-200 ease-in-out'
                )}
              >
                Fazer login
              </Link>
            </p>
            <p className="text-center text-xs text-muted-foreground">
              Ao criar uma conta, você concorda com nossos{' '}
              <TermsDialog type="terms">
                <button
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
                  className={cn(
                    'text-primary hover:underline font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20',
                    TRANSITIONS.COLORS
                  )}
                >
                  Política de Privacidade
                </button>
              </TermsDialog>
            </p>
          </>
        }
      >
        <RegisterForm />
      </AuthLayout>

      <BackToTop />
    </>
  );
}
