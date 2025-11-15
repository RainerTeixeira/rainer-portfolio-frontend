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
            ? cn('bg-black/90', 'border-purple-400/50', 'shadow-purple-500/30')
            : cn('bg-white/90', 'border-purple-500/50', 'shadow-purple-600/30')
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
                'shrink-0 p-2 rounded-full border bg-gradient-to-br',
                'from-purple-500/20 via-pink-500/15 to-cyan-500/20',
                isDark ? 'border-purple-400/30' : 'border-purple-500/30'
              )}
            >
              <RefreshCw
                className={cn(
                  'h-5 w-5 animate-spin',
                  '[animation-duration:3s]',
                  isDark ? 'text-purple-400' : 'text-purple-600'
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
                  isDark ? 'text-purple-200' : 'text-purple-800'
                )}
              >
                Nova Versão Disponível
              </h4>

              {/** Descrição */}
              <p
                className={cn(
                  'text-xs',
                  isDark ? 'text-gray-300' : 'text-gray-700'
                )}
              >
                Atualize para obter as últimas melhorias e correções.
              </p>

              {/** Botão de atualizar */}
              <Button
                onClick={updateServiceWorker}
                size="sm"
                className={cn(
                  'w-full text-white font-mono font-bold bg-gradient-to-r',
                  isDark
                    ? 'from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                    : 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
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
