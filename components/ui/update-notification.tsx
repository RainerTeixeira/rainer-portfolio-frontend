"use client";

import { RefreshCw } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button, Card, cn } from "@rainersoft/ui";
import { usePWA } from "@/hooks/use-pwa";

export function UpdateNotification() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { updateAvailable, updateServiceWorker } = usePWA();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;
  if (!updateAvailable) return null;

  return (
    <div
      className={cn(
        "fixed top-20 right-4 z-50 max-w-sm",
        "animate-in slide-in-from-top-5 fade-in duration-300",
      )}
    >
      <Card
        className={cn(
          "backdrop-blur-xl border-2 shadow-2xl",
          isDark
            ? cn("bg-background/90", "border-secondary-base/50", "shadow-glow-purple")
            : cn("bg-background/90", "border-secondary-base/50", "shadow-lg"),
        )}
      >
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "shrink-0 p-2 rounded-full border",
                "bg-secondary-background",
                "border-secondary-base/30",
              )}
            >
              <RefreshCw
                className={cn(
                  "h-5 w-5 animate-spin text-secondary-base",
                  "[animation-duration:3s]",
                )}
              />
            </div>
            <div className="flex-1 space-y-2">
              <h4 className={cn("text-sm font-bold font-mono", "text-foreground")}>
                Nova Versão Disponível
              </h4>
              <p className={cn("text-xs", "text-muted-foreground")}>
                Atualize para obter as últimas melhorias e correções.
              </p>
              <Button
                onClick={updateServiceWorker}
                size="sm"
                className={cn(
                  "w-full font-mono font-bold",
                  "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
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
