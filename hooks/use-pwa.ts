/**
 * Hook de PWA (Progressive Web App)
 *
 * Custom hook que gerencia funcionalidades PWA:
 * - Registro do Service Worker
 * - Install prompt (A2HS - Add to Home Screen)
 * - Detecção de modo standalone
 * - Atualizações do service worker
 *
 * @fileoverview Hook React para gerenciamento de PWA
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Interface do evento beforeinstallprompt
 */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * Objeto retornado pelo hook usePWA
 *
 * @typedef {Object} PWAReturn
 * @property {boolean} isInstallable - Se o app pode ser instalado
 * @property {boolean} isInstalled - Se o app já está instalado
 * @property {boolean} isStandalone - Se está rodando como PWA
 * @property {boolean} updateAvailable - Se há atualização disponível
 * @property {() => Promise<void>} promptInstall - Função para mostrar prompt de instalação
 * @property {() => void} updateServiceWorker - Função para atualizar SW
 */

/**
 * Hook usePWA
 *
 * Gerencia todas as funcionalidades relacionadas a PWA.
 *
 * Características:
 * - Registra service worker automaticamente
 * - Captura evento de instalação (beforeinstallprompt)
 * - Detecta se app está rodando como standalone
 * - Notifica quando há atualizações disponíveis
 * - Permite controle programático do install prompt
 *
 * @returns {PWAReturn} Objeto com estados e funções de PWA
 *
 * @example
 * import { usePWA } from '@/hooks/use-pwa'
 *
 * function MyComponent() {
 *   const { isInstallable, promptInstall, isStandalone } = usePWA()
 *
 *   return (
 *     <div>
 *       {isStandalone && <p>Rodando como PWA!</p>}
 *       {isInstallable && (
 *         <button onClick={promptInstall}>Instalar App</button>
 *       )}
 *     </div>
 *   )
 * }
 */
export function usePWA() {
  /** Estado que armazena o evento de instalação */
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  /** Se o app pode ser instalado */
  const [isInstallable, setIsInstallable] = useState(false);

  /** Se o app já está instalado */
  const [isInstalled, setIsInstalled] = useState(false);

  /** Se está rodando como PWA (standalone) */
  const [isStandalone, setIsStandalone] = useState(false);

  /** Se há atualização do service worker disponível */
  const [updateAvailable, setUpdateAvailable] = useState(false);

  /** Registration do service worker */
  const [swRegistration, setSwRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

  /**
   * Effect: Registrar Service Worker
   *
   * Executa apenas uma vez no mount para registrar o SW
   */
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      console.log('[PWA] Service Worker não suportado neste navegador');
      return;
    }

    // Registra service worker
    navigator.serviceWorker
      .register('/sw.js')
      .then(registration => {
        console.log('[PWA] Service Worker registrado com sucesso');
        setSwRegistration(registration);

        // Verifica atualizações periodicamente (a cada hora)
        setInterval(
          () => {
            registration.update();
          },
          60 * 60 * 1000
        );

        // Detecta quando há atualização disponível
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (
                newWorker.state === 'installed' &&
                navigator.serviceWorker.controller
              ) {
                console.log('[PWA] Atualização disponível');
                setUpdateAvailable(true);
              }
            });
          }
        });
      })
      .catch(error => {
        console.error('[PWA] Erro ao registrar Service Worker:', error);
      });
  }, []);

  /**
   * Effect: Detectar modo standalone
   *
   * Verifica se o app está rodando como PWA instalado
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detecta modo standalone (PWA instalado)
    const isStandaloneiOS = (window.navigator as any).standalone === true;
    const isStandaloneAndroid = window.matchMedia(
      '(display-mode: standalone)'
    ).matches;
    const isStandaloneBrowser = window.matchMedia(
      '(display-mode: minimal-ui)'
    ).matches;

    const standalone =
      isStandaloneiOS || isStandaloneAndroid || isStandaloneBrowser;

    setIsStandalone(standalone);
    setIsInstalled(standalone);

    console.log('[PWA] Modo standalone:', standalone);
  }, []);

  /**
   * Effect: Capturar evento de instalação
   *
   * Escuta o evento beforeinstallprompt para mostrar prompt customizado
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    /**
     * Handler do evento beforeinstallprompt
     * Previne o prompt automático e salva o evento para uso posterior
     */
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('[PWA] beforeinstallprompt capturado');

      // Previne o mini-infobar do Chrome em mobile
      e.preventDefault();

      // Salva o evento para uso posterior
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    /**
     * Handler do evento appinstalled
     * Executado quando o usuário instala o app
     */
    const handleAppInstalled = () => {
      console.log('[PWA] App instalado com sucesso');
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    // Adiciona listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Cleanup
    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  /**
   * Função para mostrar prompt de instalação
   *
   * Exibe o prompt nativo do navegador para instalar o PWA.
   * Só funciona se o evento beforeinstallprompt foi capturado.
   *
   * @returns {Promise<void>}
   */
  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) {
      console.log('[PWA] Prompt de instalação não disponível');
      return;
    }

    // Mostra o prompt de instalação
    await deferredPrompt.prompt();

    // Aguarda escolha do usuário
    const { outcome } = await deferredPrompt.userChoice;

    console.log(
      `[PWA] Usuário ${outcome === 'accepted' ? 'aceitou' : 'recusou'} a instalação`
    );

    // Limpa o prompt após uso (só pode ser usado uma vez)
    setDeferredPrompt(null);
    setIsInstallable(false);
  }, [deferredPrompt]);

  /**
   * Função para atualizar service worker
   *
   * Ativa o service worker em espera e recarrega a página.
   */
  const updateServiceWorker = useCallback(() => {
    if (!swRegistration || !swRegistration.waiting) {
      console.log('[PWA] Nenhuma atualização em espera');
      return;
    }

    console.log('[PWA] Ativando atualização...');

    // Envia mensagem para o SW em espera pular para ativo
    swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });

    // Recarrega a página quando o novo SW estiver ativo
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  }, [swRegistration]);

  return {
    /** Se o app pode ser instalado */
    isInstallable,

    /** Se o app já está instalado */
    isInstalled,

    /** Se está rodando como PWA (standalone) */
    isStandalone,

    /** Se há atualização disponível do service worker */
    updateAvailable,

    /** Função para mostrar prompt de instalação */
    promptInstall,

    /** Função para atualizar service worker */
    updateServiceWorker,
  };
}
