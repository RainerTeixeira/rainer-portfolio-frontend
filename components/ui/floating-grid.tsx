/**
 * Floating Grid Component
 *
 * Grid futurista cyberpunk que flutua no espaço
 * Cria profundidade e atmosfera futurista
 * Renderizado APENAS no modo dark
 */

'use client';

import { COLOR_HEX, hexToRGBA } from '@/lib/utils/design-tokens';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';

interface FloatingGridProps {
  /** Variante do grid (default, dense, sparse) */
  variant?: 'default' | 'dense' | 'sparse';
  /** Intensidade do efeito (0-1) */
  intensity?: number;
}

export function FloatingGrid({
  variant = 'default',
  intensity = 0.3,
}: FloatingGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Previne erro de hidratação SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Renderizar apenas após montagem e no modo dark
    if (!mounted || resolvedTheme !== 'dark') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const gridConfig = {
      default: { spacing: 100, lineWidth: 0.5 },
      dense: { spacing: 60, lineWidth: 0.3 },
      sparse: { spacing: 150, lineWidth: 0.5 },
    };

    const config = gridConfig[variant];

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Cores do grid para modo dark usando cores da biblioteca
      const strokeColor = hexToRGBA(COLOR_HEX.cyan[400], intensity * 1.2);
      const fillColor = hexToRGBA(COLOR_HEX.cyan[400], intensity * 0.6);

      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = config.lineWidth;

      // Linhas verticais
      for (let x = 0; x < canvas.width; x += config.spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Linhas horizontais
      for (let y = 0; y < canvas.height; y += config.spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Pontos de interseção brilhantes
      ctx.fillStyle = fillColor;
      for (let x = 0; x < canvas.width; x += config.spacing) {
        for (let y = 0; y < canvas.height; y += config.spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    drawGrid();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [variant, intensity, resolvedTheme, mounted]);

  // Não renderizar até montagem completa (evita hydration mismatch)
  if (!mounted) {
    return null;
  }

  // Não renderizar se não estiver no modo dark
  if (resolvedTheme !== 'dark') {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-100 transition-opacity duration-1000"
      style={{ zIndex: 0 }}
      aria-hidden="true"
      suppressHydrationWarning
    />
  );
}
