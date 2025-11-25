"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Cookie, Settings, X, XCircle } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Separator,
  Switch,
  cn,
} from "@rainersoft/ui";
import {
  getCookieManager,
  type CookiePreferences,
} from "@/lib/cookies/cookie-manager";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [canShowBanner, setCanShowBanner] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    performance: true,
    functionality: true,
    analytics: true,
  });

  const cookieManager = getCookieManager();
  const hasShownBannerRef = useRef(false);
  const scrollThresholdRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mouseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!cookieManager.hasConsent()) {
      setCanShowBanner(true);
      const saved = cookieManager.getPreferences();
      if (saved) setPreferences(saved);
    } else {
      const saved = cookieManager.getPreferences();
      if (saved) setPreferences(saved);
    }
  }, [cookieManager]);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !canShowBanner ||
      hasShownBannerRef.current
    )
      return;

    const heroHeight = window.innerHeight;
    scrollThresholdRef.current = heroHeight * 0.3;

    const checkCanShow = () => {
      if (hasShownBannerRef.current) return;
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > scrollThresholdRef.current) {
        hasShownBannerRef.current = true;
        setShowBanner(true);
      }
    };

    const handleScroll = () => {
      checkCanShow();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (hasShownBannerRef.current) return;
      const scrollY = window.scrollY || window.pageYOffset;
      const mouseY = e.clientY + scrollY;
      if (mouseY > heroHeight + 150) {
        hasShownBannerRef.current = true;
        setShowBanner(true);
      }
    };

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

    checkCanShow();

    window.addEventListener("scroll", throttledScroll, { passive: true });
    window.addEventListener("mousemove", throttledMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("mousemove", throttledMouseMove);
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

  const saveConsent = (prefs: CookiePreferences) => {
    cookieManager.saveConsent(prefs);
    setShowBanner(false);
    setShowCustomize(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      performance: true,
      functionality: true,
      analytics: true,
    });
  };

  const handleRejectOptional = () => {
    saveConsent({
      essential: true,
      performance: false,
      functionality: false,
      analytics: false,
    });
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "essential") return;
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!showBanner) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 p-4 sm:p-6",
        "animate-in slide-in-from-bottom-5 duration-300",
        "z-50",
      )}
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
    >
      <Card
        className={cn(
          "mx-auto max-w-4xl shadow-2xl",
          "dark:bg-black/95 dark:border-cyan-400/20",
          "bg-background/95 backdrop-blur-xl",
          "border-2",
        )}
      >
        {!showCustomize ? (
          <>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className={cn(
                      "p-3 rounded-lg",
                      "bg-primary/10 dark:bg-cyan-400/10",
                      "border border-primary/20 dark:border-cyan-400/20",
                    )}
                  >
                    <Cookie className="h-6 w-6 text-primary dark:text-cyan-400" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <CardTitle
                      id="cookie-banner-title"
                      className={cn(
                        "text-lg",
                        "font-bold",
                        "dark:text-cyan-200",
                      )}
                    >
                      Utilizamos Cookies
                    </CardTitle>
                    <CardDescription
                      id="cookie-banner-description"
                      className={cn("text-sm", "text-muted-foreground")}
                    >
                      Utilizamos cookies para melhorar sua experiência de
                      navegação, analisar o tráfego do site e personalizar
                      conteúdo.
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
                    "w-full sm:w-auto",
                    "bg-primary hover:bg-primary/90",
                    "dark:bg-cyan-500 dark:hover:bg-cyan-600",
                  )}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Aceitar Todos
                </Button>
              </div>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className={cn(
                      "p-3 rounded-lg",
                      "bg-primary/10 dark:bg-cyan-400/10",
                      "border border-primary/20 dark:border-cyan-400/20",
                    )}
                  >
                    <Settings className="h-6 w-6 text-primary dark:text-cyan-400" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <CardTitle className={cn("text-lg", "font-bold", "dark:text-cyan-200")}>
                      Gerenciar preferências de cookies
                    </CardTitle>
                    <CardDescription className={cn("text-sm", "text-muted-foreground")}>
                      Ative ou desative categorias opcionais de cookies conforme sua preferência.
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
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <Label className="font-medium">Essenciais</Label>
                    <p className="text-xs text-muted-foreground">
                      Necessários para o funcionamento básico do site. Sempre ativados.
                    </p>
                  </div>
                  <Switch checked={preferences.essential} disabled aria-readonly />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <Label className="font-medium">Performance</Label>
                    <p className="text-xs text-muted-foreground">
                      Ajudam a medir desempenho e estabilidade da aplicação.
                    </p>
                  </div>
                  <Switch
                    checked={preferences.performance}
                    onCheckedChange={() => togglePreference("performance")}
                  />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <Label className="font-medium">Funcionalidade</Label>
                    <p className="text-xs text-muted-foreground">
                      Guardam preferências como idioma, tema e outras escolhas.
                    </p>
                  </div>
                  <Switch
                    checked={preferences.functionality}
                    onCheckedChange={() => togglePreference("functionality")}
                  />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <Label className="font-medium">Analytics</Label>
                    <p className="text-xs text-muted-foreground">
                      Utilizados para entender como você utiliza o site.
                    </p>
                  </div>
                  <Switch
                    checked={preferences.analytics}
                    onCheckedChange={() => togglePreference("analytics")}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowCustomize(false)}
                  className="w-full sm:w-auto"
                >
                  Voltar
                </Button>
                <Button
                  onClick={() => saveConsent(preferences)}
                  className={cn(
                    "w-full sm:w-auto",
                    "bg-primary hover:bg-primary/90",
                    "dark:bg-cyan-500 dark:hover:bg-cyan-600",
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

export function useCookieConsent(): CookiePreferences | null {
  const cookieManager = getCookieManager();
  const [preferences, setPreferences] = useState<CookiePreferences | null>(
    cookieManager.getPreferences(),
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    setPreferences(cookieManager.getPreferences());

    const handleConsentUpdate = (event: CustomEvent<CookiePreferences>) => {
      setPreferences(event.detail);
    };

    window.addEventListener(
      "cookie-consent-updated",
      handleConsentUpdate as EventListener,
    );

    return () => {
      window.removeEventListener(
        "cookie-consent-updated",
        handleConsentUpdate as EventListener,
      );
    };
  }, [cookieManager]);

  return preferences;
}
