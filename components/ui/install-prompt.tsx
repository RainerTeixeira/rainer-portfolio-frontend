"use client";

import { Download, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button, Card, cn } from "@rainersoft/ui";
import { usePWA } from "@/hooks/use-pwa";

export function InstallPrompt() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { isInstallable, isStandalone, promptInstall } = usePWA();
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const dismissed = localStorage.getItem("pwa-install-dismissed");

    if (isInstallable && !isStandalone && !dismissed) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [isInstallable, isStandalone]);

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("pwa-install-dismissed", "true");
  };

  const handleInstall = async () => {
    await promptInstall();
    setShowPrompt(false);
  };

  const isDark = mounted ? resolvedTheme === "dark" : false;
  if (!showPrompt) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 pointer-events-none",
        "animate-in slide-in-from-bottom-5 fade-in duration-300",
      )}
    >
      <Card
        className={cn(
          "max-w-2xl mx-auto pointer-events-auto backdrop-blur-xl border-2 shadow-2xl",
          isDark
            ? cn("bg-background/90", "border-primary-base/50", "shadow-glow-cyan")
            : cn("bg-background/90", "border-primary-base/50", "shadow-lg"),
        )}
      >
        <div className="p-4 sm:p-6">
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "shrink-0 p-3 rounded-full border",
                "bg-primary-background",
                "border-primary-base/30",
              )}
            >
              <Download className={cn("h-6 w-6", "text-primary-base")} />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className={cn("text-lg font-bold font-mono", "text-foreground")}>
                  📱 Instalar no seu Dispositivo
                </h3>
                <button
                  onClick={handleDismiss}
                  className={cn(
                    "transition-colors p-1 rounded",
                    "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                  aria-label="Fechar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className={cn("text-sm", "text-muted-foreground")}>
                Instale como app nativo para acesso rápido sem navegador e
                funcionalidade offline completa.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={handleInstall}
                  size="sm"
                  className={cn(
                    "font-mono font-bold",
                    "bg-primary text-primary-foreground hover:bg-primary-hover",
                  )}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Instalar Agora
                </Button>
                <Button
                  onClick={handleDismiss}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "text-muted-foreground hover:text-foreground hover:bg-muted",
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
