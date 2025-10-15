/**
 * Update Notification - Notificação de Atualização PWA
 * 
 * Componente que exibe toast quando há nova versão do app disponível.
 * Permite ao usuário atualizar o service worker e recarregar a página.
 * 
 * Características:
 * - Aparece apenas quando há atualização
 * - Design cyberpunk consistente
 * - Ação de atualizar com um clique
 * - Posicionamento fixo no topo
 * - Animação de entrada suave
 * 
 * @fileoverview Componente de notificação de atualização PWA
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

'use client'

import { RefreshCw } from 'lucide-react'
import { Button } from './button'
import { Card } from './card'
import { usePWA } from '@/hooks/use-pwa'

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
  const { updateAvailable, updateServiceWorker } = usePWA()

  // Não renderiza se não há atualização
  if (!updateAvailable) return null

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
      className="fixed top-20 right-4 z-50 max-w-sm"
      style={{
        animation: 'slideDown 0.5s ease-out'
      }}
    >
      {/**
       * Card da notificação
       * 
       * - backdrop-blur: efeito de desfoque
       * - border cyberpunk
       * - shadow com glow
       */}
      <Card className="backdrop-blur-xl bg-black/90 dark:bg-black/95 border-2 border-purple-400/50 shadow-2xl shadow-purple-500/30">
        <div className="p-4">
          {/**
           * Layout flex: conteúdo + botão
           */}
          <div className="flex items-start gap-3">
            {/**
             * Ícone de atualização
             * Círculo com gradiente e animação de spin
             */}
            <div className="flex-shrink-0 p-2 rounded-full bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-cyan-500/20 border border-purple-400/30">
              <RefreshCw className="h-5 w-5 text-purple-400 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            
            {/**
             * Conteúdo: Título + descrição + botão
             */}
            <div className="flex-1 space-y-2">
              {/** Título */}
              <h4 className="text-sm font-bold text-purple-200 font-mono">
                Nova Versão Disponível
              </h4>
              
              {/** Descrição */}
              <p className="text-xs text-gray-300">
                Atualize para obter as últimas melhorias e correções.
              </p>
              
              {/** Botão de atualizar */}
              <Button
                onClick={updateServiceWorker}
                size="sm"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-mono font-bold"
              >
                <RefreshCw className="h-3 w-3 mr-2" />
                Atualizar Agora
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

