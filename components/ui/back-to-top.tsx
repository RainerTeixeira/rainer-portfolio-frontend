"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@rainersoft/ui";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const SCROLL_THRESHOLD_PX = 300;

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollToTop, reducedMotion } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD_PX);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 rounded-full w-12 h-12 p-0 shadow-lg"
      aria-label={
        reducedMotion
          ? "Ir para o topo da página"
          : "Rolar suavemente para o topo da página"
      }
      title="Voltar ao topo"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </Button>
  );
}
