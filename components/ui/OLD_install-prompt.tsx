/**
 * Install Prompt Component
 *
 * Prompt de instalação PWA que exibe banner convidando o usuário a instalar o
 * aplicativo como PWA. Persiste preferências do usuário (não mostra novamente
 * se fechado) e não aparece em modo standalone.
 *
 * @module components/ui/install-prompt
 * @fileoverview Componente de prompt de instalação PWA
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // No layout ou página principal
 * <InstallPrompt />
 * ```
 *
 * Características:
 * - Aparece apenas se app é instalável
 * - Pode ser fechado pelo usuário
 * - Design premium consistente
 * - Animação de entrada suave
 * - Persiste escolha (localStorage)
 * - Não mostra em modo standalone
 * - Integração com hook usePWA
 * - Suporte a tema claro/escuro
 * - Acessibilidade completa
 */

'use client';

import { usePWA } from '@/hooks/use-pwa';
import { cn } from '@/lib/utils';
import { Download, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from './button';
import { Card } from './card';

/**
 * Componente InstallPrompt
 *
 * Banner fixo no rodapé que convida usuário a instalar o PWA.
 * Aparece apenas se:
 * - App é instalável
 * - Usuário não fechou antes
 * - Não está em modo standalone
 *
 * @returns {JSX.Element | null} Banner de instalação ou null
 *
 * @example
 * // No layout ou página principal
 * <InstallPrompt />
 */
export function InstallPrompt() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { isInstallable, isStandalone, promptInstall } = usePWA();
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Effect: Controlar visibilidade do prompt
   *
   * Mostra prompt apenas se:
   * - App é instalável
   * - Não está em standalone
   * - Usuário não fechou antes (localStorage)
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const dismissed = localStorage.getItem('pwa-install-dismissed');

    if (isInstallable && !isStandalone && !dismissed) {
      // Delay de 3s para não aparecer imediatamente
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [isInstallable, isStandalone]);

  /**
   * Handler: Fechar prompt
   *
   * Esconde o prompt e salva preferência no localStorage
   * para não mostrar novamente
   */
  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  /**
   * Handler: Instalar app
   *
   * Mostra o prompt nativo de instalação
   */
  const handleInstall = async () => {
    await promptInstall();
    setShowPrompt(false);
  };

  /**
   * Determina se o tema atual é dark mode
   * Só retorna true após montagem para evitar hydration mismatch
   */
  const isDark = mounted ? resolvedTheme === 'dark' : false;

  // Não renderiza se não deve mostrar
  if (!showPrompt) return null;

  return (
    /**
     * Container fixo no rodapé
     *
     * - fixed bottom-0: fixado na parte inferior
     * - left-0 right-0: largura total
     * - z-50: acima de outros elementos
     * - Animação de slide up
     */
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 pointer-events-none',
        'animate-in slide-in-from-bottom-5 fade-in duration-300'
      )}
    >
      {/**
       * Card do prompt
       *
       * - max-w-2xl mx-auto: largura máxima centralizada
       * - pointer-events-auto: permite interação
       * - backdrop-blur: efeito de desfoque
       * - border cyberpunk
       */}
      <Card
        className={cn(
          'max-w-2xl mx-auto pointer-events-auto backdrop-blur-xl border-2 shadow-2xl',
          isDark
            ? cn('bg-background/90', 'border-primary-base/50', 'shadow-glow-cyan')
            : cn('bg-background/90', 'border-primary-base/50', 'shadow-lg')
        )}
      >
        <div className="p-4 sm:p-6">
          {/**
           * Layout flex: conteúdo + botão fechar
           */}
          <div className="flex items-start gap-4">
            {/**
             * Ícone de download
             * Círculo com gradiente cyberpunk
             */}
            <div
              className={cn(
                'shrink-0 p-3 rounded-full border',
                'bg-primary-background',
                'border-primary-base/30'
              )}
            >
              <Download className={cn('h-6 w-6', 'text-primary-base')} />
            </div>

            {/**
             * Conteúdo: Título + descrição + botões
             */}
            <div className="flex-1 space-y-3">
              {/** Título */}
              <div className="flex items-start justify-between gap-2">
                <h3
                  className={cn(
                    'text-lg font-bold font-mono',
                    'text-foreground'
                  )}
                >
                  📱 Instalar no seu Dispositivo
                </h3>

                {/** Botão fechar */}
                <button
                  onClick={handleDismiss}
                  className={cn(
                    'transition-colors p-1 rounded',
                    'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                  aria-label="Fechar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/** Descrição */}
              <p
                className={cn(
                  'text-sm',
                  'text-muted-foreground'
                )}
              >
                Instale como app nativo para acesso rápido sem navegador e
                funcionalidade offline completa.
              </p>

              {/** Botões de ação */}
              <div className="flex gap-3">
                {/** Botão instalar */}
                <Button
                  onClick={handleInstall}
                  size="sm"
                  className={cn(
                    'font-mono font-bold',
                    'bg-primary text-primary-foreground hover:bg-primary-hover'
                  )}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Instalar Agora
                </Button>

                {/** Botão depois */}
                <Button
                  onClick={handleDismiss}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  Talvez Depois
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
