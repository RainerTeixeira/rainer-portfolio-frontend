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

import { usePWA } from '@/hooks/use-pwa'
import { RefreshCw } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from './button'
import { Card } from './card'

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
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { updateAvailable, updateServiceWorker } = usePWA()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'

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
      <Card className={`backdrop-blur-xl ${isDark ? 'bg-black/90 border-purple-400/50 shadow-purple-500/30' : 'bg-white/90 border-purple-500/50 shadow-purple-600/30'} border-2 shadow-2xl`}>
        <div className="p-4">
          {/**
           * Layout flex: conteúdo + botão
           */}
          <div className="flex items-start gap-3">
            {/**
             * Ícone de atualização
             * Círculo com gradiente e animação de spin
             */}
            <div className={`flex-shrink-0 p-2 rounded-full bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-cyan-500/20 ${isDark ? 'border-purple-400/30' : 'border-purple-500/30'} border`}>
              <RefreshCw className={`h-5 w-5 ${isDark ? 'text-purple-400' : 'text-purple-600'} animate-spin`} style={{ animationDuration: '3s' }} />
            </div>
            
            {/**
             * Conteúdo: Título + descrição + botão
             */}
            <div className="flex-1 space-y-2">
              {/** Título */}
              <h4 className={`text-sm font-bold ${isDark ? 'text-purple-200' : 'text-purple-800'} font-mono`}>
                Nova Versão Disponível
              </h4>
              
              {/** Descrição */}
              <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Atualize para obter as últimas melhorias e correções.
              </p>
              
              {/** Botão de atualizar */}
              <Button
                onClick={updateServiceWorker}
                size="sm"
                className={`w-full ${isDark ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'} text-white font-mono font-bold`}
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

