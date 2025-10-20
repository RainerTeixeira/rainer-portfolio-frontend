/**
 * Install Prompt - Prompt de Instalação do PWA
 * 
 * Componente que exibe banner/toast convidando o usuário
 * a instalar o aplicativo como PWA.
 * 
 * Características:
 * - Aparece apenas se app é instalável
 * - Pode ser fechado pelo usuário
 * - Design cyberpunk consistente
 * - Animação de entrada suave
 * - Persiste escolha (não mostra novamente se fechado)
 * 
 * @fileoverview Componente de prompt de instalação PWA
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { X, Download } from 'lucide-react'
import { Button } from './button'
import { Card } from './card'
import { usePWA } from '@/hooks/use-pwa'

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
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { isInstallable, isStandalone, promptInstall } = usePWA()
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  /**
   * Effect: Controlar visibilidade do prompt
   * 
   * Mostra prompt apenas se:
   * - App é instalável
   * - Não está em standalone
   * - Usuário não fechou antes (localStorage)
   */
  useEffect(() => {
    if (typeof window === 'undefined') return

    const dismissed = localStorage.getItem('pwa-install-dismissed')
    
    if (isInstallable && !isStandalone && !dismissed) {
      // Delay de 3s para não aparecer imediatamente
      const timer = setTimeout(() => {
        setShowPrompt(true)
      }, 3000)
      
      return () => clearTimeout(timer)
    }
    
    return undefined
  }, [isInstallable, isStandalone])

  /**
   * Handler: Fechar prompt
   * 
   * Esconde o prompt e salva preferência no localStorage
   * para não mostrar novamente
   */
  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('pwa-install-dismissed', 'true')
  }

  /**
   * Handler: Instalar app
   * 
   * Mostra o prompt nativo de instalação
   */
  const handleInstall = async () => {
    await promptInstall()
    setShowPrompt(false)
  }

  const isDark = mounted && resolvedTheme === 'dark'

  // Não renderiza se não deve mostrar
  if (!showPrompt) return null

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
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 pointer-events-none"
      style={{
        animation: 'slideUp 0.5s ease-out'
      }}
    >
      {/**
       * Card do prompt
       * 
       * - max-w-2xl mx-auto: largura máxima centralizada
       * - pointer-events-auto: permite interação
       * - backdrop-blur: efeito de desfoque
       * - border cyberpunk
       */}
      <Card className={`max-w-2xl mx-auto pointer-events-auto backdrop-blur-xl ${isDark ? 'bg-black/90 border-cyan-400/50 shadow-cyan-500/30' : 'bg-white/90 border-blue-500/50 shadow-blue-500/30'} border-2 shadow-2xl`}>
        <div className="p-4 sm:p-6">
          {/**
           * Layout flex: conteúdo + botão fechar
           */}
          <div className="flex items-start gap-4">
            {/**
             * Ícone de download
             * Círculo com gradiente cyberpunk
             */}
            <div className="flex-shrink-0 p-3 rounded-full bg-gradient-to-br from-cyan-500/20 via-purple-500/15 to-pink-500/20 border border-cyan-400/30">
              <Download className="h-6 w-6 text-cyan-400" />
            </div>
            
            {/**
             * Conteúdo: Título + descrição + botões
             */}
            <div className="flex-1 space-y-3">
              {/** Título */}
              <div className="flex items-start justify-between gap-2">
                <h3 className={`text-lg font-bold ${isDark ? 'text-cyan-200' : 'text-blue-700'} font-mono`}>
                  📱 Instalar no seu Dispositivo
                </h3>
                
                {/** Botão fechar */}
                <button
                  onClick={handleDismiss}
                  className={`${isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'} transition-colors p-1 rounded`}
                  aria-label="Fechar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/** Descrição */}
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Instale como app nativo para acesso rápido sem navegador e funcionalidade offline completa.
              </p>
              
              {/** Botões de ação */}
              <div className="flex gap-3">
                {/** Botão instalar */}
                <Button
                  onClick={handleInstall}
                  size="sm"
                  className={`${isDark ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600' : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'} text-white font-mono font-bold`}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Instalar Agora
                </Button>
                
                {/** Botão depois */}
                <Button
                  onClick={handleDismiss}
                  variant="ghost"
                  size="sm"
                  className={`${isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'}`}
                >
                  Talvez Depois
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

