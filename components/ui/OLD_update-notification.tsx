/**
 * Update Notification Component
 *
 * Notificação de atualização PWA que exibe toast quando há nova versão do app
 * disponível. Permite ao usuário atualizar o service worker e recarregar a
 * página com um clique.
 *
 * @module components/ui/update-notification
 * @fileoverview Componente de notificação de atualização PWA
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // No layout principal
 * <UpdateNotification />
 * ```
 *
 * Características:
 * - Aparece apenas quando há atualização
 * - Design premium consistente
 * - Ação de atualizar com um clique
 * - Posicionamento fixo no topo
 * - Animação de entrada suave
 * - Integração com hook usePWA
 * - Suporte a tema claro/escuro
 * - Acessibilidade completa
 */

'use client';

import { usePWA } from '@/hooks/use-pwa';
import { cn } from '@/lib/utils';
import { RefreshCw } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from './button';
import { Card } from './card';

/**
 * Componente UpdateNotification
 *
 * Toast fixo no topo que notifica sobre atualizações disponíveis.
 *
 * @returns {JSX.Element | null} Notificação de atualização ou null
 *
 * @example
 * // No layout principal
 * <UpdateNotification />
 */
export function UpdateNotification() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { updateAvailable, updateServiceWorker } = usePWA();

  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Determina se o tema atual é dark mode
   * Só retorna true após montagem para evitar hydration mismatch
   */
  const isDark = mounted ? resolvedTheme === 'dark' : false;

  // Não renderiza se não há atualização
  if (!updateAvailable) return null;

  return (
    /**
     * Container fixo no topo
     *
     * - fixed top-20: abaixo da navbar
     * - right-4: margem da direita
     * - z-50: acima de outros elementos
     * - Animação de slide down
     */
    <div
      className={cn(
        'fixed top-20 right-4 z-50 max-w-sm',
        'animate-in slide-in-from-top-5 fade-in duration-300'
      )}
    >
      {/**
       * Card da notificação
       *
       * - backdrop-blur: efeito de desfoque
       * - border cyberpunk
       * - shadow com glow
       */}
      <Card
        className={cn(
          'backdrop-blur-xl border-2 shadow-2xl',
          isDark
            ? cn('bg-background/90', 'border-secondary-base/50', 'shadow-glow-purple')
            : cn('bg-background/90', 'border-secondary-base/50', 'shadow-lg')
        )}
      >
        <div className="p-4">
          {/**
           * Layout flex: conteúdo + botão
           */}
          <div className="flex items-start gap-3">
            {/**
             * Ícone de atualização
             * Círculo com gradiente e animação de spin
             */}
            <div
              className={cn(
                'shrink-0 p-2 rounded-full border',
                'bg-secondary-background',
                isDark ? 'border-secondary-base/30' : 'border-secondary-base/30'
              )}
            >
              <RefreshCw
                className={cn(
                  'h-5 w-5 animate-spin text-secondary-base',
                  '[animation-duration:3s]'
                )}
              />
            </div>

            {/**
             * Conteúdo: Título + descrição + botão
             */}
            <div className="flex-1 space-y-2">
              {/** Título */}
              <h4
                className={cn(
                  'text-sm font-bold font-mono',
                  'text-foreground'
                )}
              >
                Nova Versão Disponível
              </h4>

              {/** Descrição */}
              <p
                className={cn(
                  'text-xs',
                  'text-muted-foreground'
                )}
              >
                Atualize para obter as últimas melhorias e correções.
              </p>

              {/** Botão de atualizar */}
              <Button
                onClick={updateServiceWorker}
                size="sm"
                className={cn(
                  'w-full font-mono font-bold',
                  'bg-secondary text-secondary-foreground hover:bg-secondary-hover'
                )}
              >
                <RefreshCw className="h-3 w-3 mr-2" />
                Atualizar Agora
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
