/**
 * Cookie Banner Component
 *
 * Banner de consentimento de cookies conforme LGPD/GDPR.
 * Permite ao usuário aceitar, rejeitar ou personalizar cookies.
 * Salva preferências no localStorage.
 *
 * @module components/ui/cookie-banner
 * @fileoverview Componente de banner de cookies LGPD compliant
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

'use client';

// ============================================================================
// React Hooks
// ============================================================================

import { useEffect, useRef, useState } from 'react';

// ============================================================================
// Next.js Imports
// ============================================================================

import Link from 'next/link';

// ============================================================================
// Icons
// ============================================================================

import { Check, Cookie, Settings, X, XCircle } from 'lucide-react';

// ============================================================================
// UI Components
// ============================================================================

import { Button } from '@rainersoft/ui';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rainersoft/ui';
import { Label } from '@rainersoft/ui';
import { Separator } from '@rainersoft/ui';
import { Switch } from '@rainersoft/ui';

// ============================================================================
// Design Tokens
// ============================================================================

import { cn } from '@/lib/utils';

// ============================================================================
// Cookie Manager
// ============================================================================

import {
  getCookieManager,
  type CookiePreferences,
} from '@/lib/cookies/cookie-manager';

// ============================================================================
// Types
// ============================================================================

// Types importados do cookie-manager

// ============================================================================
// Main Component
// ============================================================================

/**
 * CookieBanner Component
 *
 * Banner de consentimento de cookies que aparece quando o usuário visita
 * o site pela primeira vez. Permite aceitar, rejeitar ou personalizar
 * preferências de cookies.
 *
 * @component
 * @returns {JSX.Element | null} Banner de cookies ou null se já consentiu
 */
export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [canShowBanner, setCanShowBanner] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Sempre true, não pode ser desabilitado
    performance: true,
    functionality: true,
    analytics: true,
  });

  const cookieManager = getCookieManager();

  // Verifica se já há consentimento salvo e se pode mostrar o banner
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!cookieManager.hasConsent()) {
      // Não mostra imediatamente - aguarda scroll ou saída do hero
      setCanShowBanner(true);

      // Carrega preferências padrão
      const savedPreferences = cookieManager.getPreferences();
      if (savedPreferences) {
        setPreferences(savedPreferences);
      }
    } else {
      // Carrega preferências salvas
      const savedPreferences = cookieManager.getPreferences();
      if (savedPreferences) {
        setPreferences(savedPreferences);
      }
    }
  }, [cookieManager]);

  // Refs para rastrear estado
  const hasShownBannerRef = useRef(false);
  const scrollThresholdRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mouseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detecta scroll e saída da área do hero
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !canShowBanner ||
      hasShownBannerRef.current
    )
      return;

    // Calcular altura do hero (100vh)
    const heroHeight = window.innerHeight;
    // Threshold: 30% da altura do hero
    scrollThresholdRef.current = heroHeight * 0.3;

    // Função para verificar se pode mostrar o banner
    const checkCanShow = () => {
      if (hasShownBannerRef.current) return;

      const scrollY = window.scrollY || window.pageYOffset;

      // Se scrollou além do threshold, mostra o banner
      if (scrollY > scrollThresholdRef.current) {
        hasShownBannerRef.current = true;
        setShowBanner(true);
      }
    };

    // Listener de scroll - detecta quando usuário rola a página
    const handleScroll = () => {
      checkCanShow();
    };

    // Listener de movimento do mouse - detecta quando mouse sai da área do hero
    const handleMouseMove = (e: MouseEvent) => {
      if (hasShownBannerRef.current) return;

      const scrollY = window.scrollY || window.pageYOffset;
      const mouseY = e.clientY + scrollY;

      // Se o mouse está abaixo da área do hero (com margem de 150px)
      if (mouseY > heroHeight + 150) {
        hasShownBannerRef.current = true;
        setShowBanner(true);
      }
    };

    // Verificar posição inicial (caso já tenha scrollado antes do componente montar)
    checkCanShow();

    // Adicionar listeners com throttling para performance
    const throttledScroll = () => {
      if (scrollTimeoutRef.current) return;
      scrollTimeoutRef.current = setTimeout(() => {
        handleScroll();
        scrollTimeoutRef.current = null;
      }, 100);
    };

    const throttledMouseMove = (e: MouseEvent) => {
      if (mouseTimeoutRef.current) return;
      mouseTimeoutRef.current = setTimeout(() => {
        handleMouseMove(e);
        mouseTimeoutRef.current = null;
      }, 200);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('mousemove', throttledMouseMove, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('mousemove', throttledMouseMove);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
        mouseTimeoutRef.current = null;
      }
    };
  }, [canShowBanner]);

  // Salva consentimento usando CookieManager
  const saveConsent = (prefs: CookiePreferences) => {
    cookieManager.saveConsent(prefs);
    setShowBanner(false);
    setShowCustomize(false);
  };

  // Aceita todos os cookies
  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      performance: true,
      functionality: true,
      analytics: true,
    });
  };

  // Rejeita cookies opcionais (mantém apenas essenciais)
  const handleRejectOptional = () => {
    saveConsent({
      essential: true,
      performance: false,
      functionality: false,
      analytics: false,
    });
  };

  // Salva preferências personalizadas
  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  // Toggle de preferência
  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return; // Essenciais não podem ser desabilitados
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!showBanner) return null;

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 p-4 sm:p-6',
        'animate-in slide-in-from-bottom-5 duration-300',
        'z-50'
      )}
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
    >
      <Card
        className={cn(
          'mx-auto max-w-4xl shadow-2xl',
          'dark:bg-black/95 dark:border-cyan-400/20',
          'bg-background/95 backdrop-blur-xl',
          'border-2'
        )}
      >
        {!showCustomize ? (
          // Vista inicial do banner
          <>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className={cn(
                      'p-3 rounded-lg',
                      'bg-primary/10 dark:bg-cyan-400/10',
                      'border border-primary/20 dark:border-cyan-400/20'
                    )}
                  >
                    <Cookie className="h-6 w-6 text-primary dark:text-cyan-400" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <CardTitle
                      id="cookie-banner-title"
                      className={cn(
                        'text-lg',
                        'font-bold',
                        'dark:text-cyan-200'
                      )}
                    >
                      Utilizamos Cookies
                    </CardTitle>
                    <CardDescription
                      id="cookie-banner-description"
                      className={cn('text-sm', 'text-muted-foreground')}
                    >
                      Utilizamos cookies para melhorar sua experiência de
                      navegação, analisar o tráfego do site e personalizar
                      conteúdo. Ao continuar navegando, você concorda com nossa
                      utilização de cookies.{' '}
                      <Link
                        href="/cookies"
                        className="text-primary hover:underline dark:text-cyan-400 font-semibold"
                      >
                        Saiba mais
                      </Link>
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => setShowBanner(false)}
                  aria-label="Fechar banner de cookies"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowCustomize(true)}
                  className="w-full sm:w-auto"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Personalizar
                </Button>
                <Button
                  variant="outline"
                  onClick={handleRejectOptional}
                  className="w-full sm:w-auto"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Rejeitar Opcionais
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  className={cn(
                    'w-full sm:w-auto',
                    'bg-primary hover:bg-primary/90',
                    'dark:bg-cyan-500 dark:hover:bg-cyan-600'
                  )}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Aceitar Todos
                </Button>
              </div>
            </CardContent>
          </>
        ) : (
          // Vista de personalização
          <>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className={cn(
                      'p-3 rounded-lg',
                      'bg-primary/10 dark:bg-cyan-400/10',
                      'border border-primary/20 dark:border-cyan-400/20'
                    )}
                  >
                    <Settings className="h-6 w-6 text-primary dark:text-cyan-400" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <CardTitle
                      className={cn(
                        'text-lg',
                        'font-bold',
                        'dark:text-cyan-200'
                      )}
                    >
                      Personalizar Cookies
                    </CardTitle>
                    <CardDescription className={cn('text-sm')}>
                      Escolha quais tipos de cookies você deseja permitir. Os
                      cookies essenciais são necessários para o funcionamento do
                      site.
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => setShowCustomize(false)}
                  aria-label="Voltar"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6 space-y-6">
              {/* Cookies Essenciais */}
              <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-muted/50">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="essential"
                      className={cn(
                        'text-base',
                        'font-semibold',
                        'cursor-not-allowed'
                      )}
                    >
                      Cookies Essenciais
                    </Label>
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded text-xs',
                        'bg-primary text-primary-foreground',
                        'font-semibold'
                      )}
                    >
                      Obrigatório
                    </span>
                  </div>
                  <p className={cn('text-sm', 'text-muted-foreground')}>
                    Necessários para o funcionamento básico do site. Não podem
                    ser desativados.
                  </p>
                </div>
                <Switch
                  id="essential"
                  checked={preferences.essential}
                  disabled
                  aria-label="Cookies essenciais (obrigatório)"
                />
              </div>

              {/* Cookies de Performance */}
              <div className="flex items-center justify-between gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="flex-1 space-y-1">
                  <Label
                    htmlFor="performance"
                    className={cn(
                      'text-base',
                      'font-semibold',
                      'cursor-pointer'
                    )}
                  >
                    Cookies de Performance
                  </Label>
                  <p className={cn('text-sm', 'text-muted-foreground')}>
                    Nos ajudam a entender como você utiliza o site para
                    melhorarmos a performance.
                  </p>
                </div>
                <Switch
                  id="performance"
                  checked={preferences.performance}
                  onCheckedChange={() => togglePreference('performance')}
                  aria-label="Cookies de performance"
                />
              </div>

              {/* Cookies de Funcionalidade */}
              <div className="flex items-center justify-between gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="flex-1 space-y-1">
                  <Label
                    htmlFor="functionality"
                    className={cn(
                      'text-base',
                      'font-semibold',
                      'cursor-pointer'
                    )}
                  >
                    Cookies de Funcionalidade
                  </Label>
                  <p className={cn('text-sm', 'text-muted-foreground')}>
                    Permitem que o site se lembre de suas preferências e ofereça
                    funcionalidades aprimoradas.
                  </p>
                </div>
                <Switch
                  id="functionality"
                  checked={preferences.functionality}
                  onCheckedChange={() => togglePreference('functionality')}
                  aria-label="Cookies de funcionalidade"
                />
              </div>

              {/* Cookies de Analytics */}
              <div className="flex items-center justify-between gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="flex-1 space-y-1">
                  <Label
                    htmlFor="analytics"
                    className={cn(
                      'text-base',
                      'font-semibold',
                      'cursor-pointer'
                    )}
                  >
                    Cookies de Analytics
                  </Label>
                  <p className={cn('text-sm', 'text-muted-foreground')}>
                    Coletam informações sobre como você utiliza o site para
                    análise e melhorias.
                  </p>
                </div>
                <Switch
                  id="analytics"
                  checked={preferences.analytics}
                  onCheckedChange={() => togglePreference('analytics')}
                  aria-label="Cookies de analytics"
                />
              </div>

              {/* Links de informação */}
              <div className="pt-2">
                <p className={cn('text-xs', 'text-muted-foreground')}>
                  Para mais informações, consulte nossa{' '}
                  <Link
                    href="/cookies"
                    className="text-primary hover:underline dark:text-cyan-400 font-semibold"
                  >
                    Política de Cookies
                  </Link>{' '}
                  e nossa{' '}
                  <Link
                    href="/privacidade"
                    className="text-primary hover:underline dark:text-cyan-400 font-semibold"
                  >
                    Política de Privacidade
                  </Link>
                  .
                </p>
              </div>

              {/* Botões de ação */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowCustomize(false)}
                  className="w-full sm:w-auto"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSavePreferences}
                  className={cn(
                    'w-full sm:w-auto',
                    'bg-primary hover:bg-primary/90',
                    'dark:bg-cyan-500 dark:hover:bg-cyan-600'
                  )}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Salvar Preferências
                </Button>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}

/**
 * Hook para verificar consentimento de cookies
 *
 * @returns {CookiePreferences | null} Preferências de cookies ou null se não consentiu
 */
export function useCookieConsent(): CookiePreferences | null {
  const cookieManager = getCookieManager();
  const [preferences, setPreferences] = useState<CookiePreferences | null>(
    cookieManager.getPreferences()
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Carrega preferências iniciais
    setPreferences(cookieManager.getPreferences());

    // Escuta eventos de atualização de consentimento
    const handleConsentUpdate = (event: CustomEvent<CookiePreferences>) => {
      setPreferences(event.detail);
    };

    window.addEventListener(
      'cookie-consent-updated',
      handleConsentUpdate as EventListener
    );

    return () => {
      window.removeEventListener(
        'cookie-consent-updated',
        handleConsentUpdate as EventListener
      );
    };
  }, [cookieManager]);

  return preferences;
}
