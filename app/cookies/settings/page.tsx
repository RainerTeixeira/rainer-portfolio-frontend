/**
 * Cookie Settings Page
 *
 * Página completa para gerenciar configurações de cookies.
 * Similar ao que sites grandes como Google, Microsoft, etc. utilizam.
 *
 * @module app/cookies/settings/page
 * @fileoverview Página de configurações de cookies
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

'use client';

import { CookieSettings } from '@/components/cookies/cookie-settings';
import { BackToTop, PageHeader, ParticlesEffect } from '@rainersoft/ui';
import { cn } from '@rainersoft/ui';

export default function CookieSettingsPage() {
  return (
    <div className={cn('min-h-screen bg-background dark:bg-black')}>
      <ParticlesEffect variant="alt1" />

      <PageHeader title="Configurações de Cookies" description="Gerencie suas preferências de cookies e controle como seus dados são utilizados. Você pode alterar essas configurações a qualquer momento." children={undefined} />

      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        <CookieSettings />
      </div>

      <BackToTop />
    </div>
  );
}


