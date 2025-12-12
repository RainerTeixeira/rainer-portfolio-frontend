/**
 * Dashboard Settings Page Component
 *
 * Página de configurações do dashboard com tema dual (minimalista no light mode,
 * cyberpunk no dark mode). Layout responsivo com glassmorphism, partículas
 * animadas decorativas e integração com ProfileForm.
 *
 * @module app/dashboard/settings/page
 * @fileoverview Página de configurações do dashboard com design premium
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Rota: /dashboard/settings
 * // Requer autenticação (redireciona para login se não autenticado)
 * ```
 *
 * Características:
 * - Design dual: minimalista no light mode, cyberpunk no dark mode
 * - Glassmorphism e cards com hover effects premium
 * - Partículas animadas decorativas no dark mode
 * - Layout totalmente responsivo para qualquer dispositivo
 * - Animações suaves e transições premium
 * - Acessibilidade completa (ARIA labels, semântica HTML5)
 * - Proteção por autenticação
 */

'use client';

import { ProfileForm } from '../../../components/domain/dashboard/profile-form';
import { useAuthContext } from '../../../components/providers/auth-context-provider';
import { Button } from '@rainersoft/ui';
import { cn } from '@rainersoft/ui';
import { GRADIENT_DIRECTIONS } from '@rainersoft/design-tokens';
import { ArrowLeft, Loader2, Settings as SettingsIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { JSX, Suspense } from 'react';

/**
 * SettingsPageContent Component
 *
 * Conteúdo interno da página de configurações que gerencia estado e lógica.
 * Separado do componente principal para uso com Suspense boundary.
 *
 * Gerencia:
 * - Estado de autenticação e redirecionamento
 * - Formulário de perfil e configurações
 * - Layout responsivo com glassmorphism
 *
 * @component
 * @returns {JSX.Element} Conteúdo da página de configurações
 *
 * @remarks
 * Este componente é envolvido por Suspense no componente principal
 * para gerenciar loading states.
 */
function SettingsPageContent(): JSX.Element {
  const router = useRouter();
  const { isAuthenticated, loading: isAuthLoading } = useAuthContext();

  // Redireciona para login se não autenticado
  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-black relative overflow-hidden">
        {/* Background gradient */}
        <div
          className={cn(
            'absolute inset-0',
            GRADIENT_DIRECTIONS.TO_BR,
            'from-primary/5 via-transparent to-primary/5 dark:from-cyan-400/5 dark:via-transparent dark:to-purple-400/5 blur-3xl pointer-events-none'
          )}
          aria-hidden="true"
        />
        {/* Loading spinner */}
        <div className={cn('relative z-10')}>
          <Loader2
            className="w-8 h-8 animate-spin text-primary dark:text-cyan-400"
            aria-label="Carregando..."
          />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push('/dashboard/login');
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-black">
        <Loader2
          className="w-8 h-8 animate-spin text-primary dark:text-cyan-400"
          aria-label="Redirecionando..."
        />
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background gradient layer */}
      <div
        className={cn(
          'absolute inset-0',
          GRADIENT_DIRECTIONS.TO_RIGHT,
          'from-cyan-500/5 via-purple-500/5 to-pink-500/5 dark:from-cyan-400/5 dark:via-purple-400/5 dark:to-pink-400/5 blur-3xl pointer-events-none'
        )}
        aria-hidden="true"
      />

      {/* Partículas decorativas animadas (apenas dark mode) */}
      <div
        className={cn(
          'absolute inset-0 pointer-events-none',
          'opacity-0 dark:opacity-100',
          'transition-opacity duration-1000'
        )}
        aria-hidden="true"
      >
        <div
          className={cn(
            'absolute top-20 left-1/4 w-2 h-2 bg-cyan-400 animate-pulse opacity-60',
            'rounded-full',
            'shadow-lg shadow-cyan-400/50'
          )}
        />
        <div
          className={cn(
            'absolute top-40 right-1/3 w-1.5 h-1.5 bg-purple-400 animate-pulse opacity-40',
            'rounded-full',
            'shadow-lg shadow-purple-400/50'
          )}
          style={{ animationDelay: '1s' }}
        />
        <div
          className={cn(
            'absolute bottom-40 left-1/2 w-1.5 h-1.5 bg-pink-400 animate-pulse opacity-50',
            'rounded-full',
            'shadow-lg shadow-pink-400/50'
          )}
          style={{ animationDelay: '2s' }}
        />
        <div
          className={cn(
            'absolute top-1/2 right-1/4 w-1 h-1 bg-cyan-300 animate-pulse opacity-30',
            'rounded-full',
            'shadow-lg shadow-cyan-300/50'
          )}
          style={{ animationDelay: '0.5s' }}
        />
      </div>

      {/* Divisor premium no topo */}
      <div
        className={cn(
          'relative h-1',
          GRADIENT_DIRECTIONS.TO_RIGHT,
          'from-transparent via-primary/30 dark:via-cyan-400/30 to-transparent'
        )}
        aria-hidden="true"
      />

      {/* Container principal */}
      <div
        className={cn(
          'relative z-10',
          'w-full max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-6 xs:py-8 sm:py-10 md:py-12 lg:py-16'
        )}
      >
        {/* Header Section */}
        <header className="mb-6 xs:mb-8 sm:mb-10 md:mb-12">
          {/* Botão de voltar com card premium */}
          <div className="mb-6 xs:mb-8 flex items-center gap-3 xs:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/dashboard')}
              className={cn(
                'h-9 xs:h-10 w-9 xs:w-10',
                'bg-card/60 dark:bg-black/50',
                'backdrop-blur-xl',
                'border border-border/50 dark:border-cyan-400/20',
                'hover:bg-card/80 dark:hover:bg-black/70',
                'hover:border-primary/40 dark:hover:border-cyan-400/50',
                'hover:shadow-lg hover:shadow-primary/10 dark:hover:shadow-cyan-500/20',
                'transition-all duration-200 ease-in-out',
                'group',
                'dark:text-cyan-300 dark:hover:text-cyan-200'
              )}
              aria-label="Voltar para dashboard"
            >
              <ArrowLeft
                className={cn(
                  'h-4 w-4',
                  'xs:h-5 xs:w-5',
                  'group-hover:-translate-x-1',
                  'transition-transform duration-200 ease-in-out'
                )}
                aria-hidden="true"
              />
            </Button>

            {/* Título e descrição em card premium */}
            <div
              className={cn(
                'flex-1 bg-card/60 dark:bg-black/50',
                'backdrop-blur-xl',
                'border border-border/50 dark:border-cyan-400/20',
                'rounded-2xl',
                'p-4 xs:p-5 sm:p-6',
                'hover:bg-card/80 dark:hover:bg-black/70',
                'hover:shadow-xl hover:shadow-primary/10 dark:hover:shadow-cyan-500/20',
                'transition-all duration-500 ease-in-out',
                'relative overflow-hidden',
                'before:absolute before:inset-0',
                GRADIENT_DIRECTIONS.TO_BR,
                'before:from-primary/0 before:via-primary/0 before:to-primary/0',
                'hover:before:from-primary/5 hover:before:via-transparent hover:before:to-primary/5',
                'dark:hover:before:from-cyan-400/5 dark:hover:before:via-transparent dark:hover:before:to-purple-400/5',
                'before:pointer-events-none'
              )}
            >
              <div
                className={cn(
                  'relative',
                  'z-10',
                  'flex items-center gap-3 xs:gap-4 mb-2'
                )}
              >
                <div
                  className={cn(
                    'p-2 xs:p-2.5',
                    'rounded-xl',
                    'bg-primary/10 dark:bg-cyan-400/10',
                    'border border-primary/20 dark:border-cyan-400/20',
                    'text-primary dark:text-cyan-400'
                  )}
                >
                  <SettingsIcon
                    className={cn('h-4 w-4', 'xs:h-5 xs:w-5', 'sm:h-6 sm:w-6')}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h1
                    className={cn(
                      'text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold',
                      'text-foreground dark:text-cyan-200 dark:font-mono dark:tracking-wider',
                      'mb-1 xs:mb-2'
                    )}
                  >
                    Configurações
                  </h1>
                  <p
                    className={cn(
                      'text-xs xs:text-sm sm:text-base',
                      'text-muted-foreground dark:text-gray-300',
                      'leading-relaxed'
                    )}
                  >
                    Gerencie suas informações pessoais e preferências
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Profile Form Container */}
        <div className="w-full">
          <ProfileForm />
        </div>
      </div>
    </main>
  );
}

export default function SettingsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-background dark:bg-black relative overflow-hidden">
          {/* Background gradient */}
          <div
            className={cn(
              'absolute inset-0',
              GRADIENT_DIRECTIONS.TO_BR,
              'from-primary/5 via-transparent to-primary/5 dark:from-cyan-400/5 dark:via-transparent dark:to-purple-400/5 blur-3xl pointer-events-none'
            )}
            aria-hidden="true"
          />
          {/* Loading spinner */}
          <div className={cn('relative z-10')}>
            <Loader2
              className="h-8 w-8 animate-spin text-primary dark:text-cyan-400"
              aria-label="Carregando configurações..."
            />
          </div>
        </div>
      }
    >
      <SettingsPageContent />
    </Suspense>
  );
}


