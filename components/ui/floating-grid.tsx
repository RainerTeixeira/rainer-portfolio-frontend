/**
 * Floating Grid Component
 *
 * Grid futurista cyberpunk que flutua no espaço
 * Cria profundidade e atmosfera futurista
 */

'use client';

import { useEffect, useRef } from 'react';

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

  useEffect(() => {
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
    let animationFrame: number;

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Cor do grid baseada no tema
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const color = isDark
        ? `rgba(6, 182, 212, ${intensity * 1.2})`
        : `rgba(59, 130, 246, ${intensity * 0.6})`;

      ctx.strokeStyle = color;
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
      ctx.fillStyle = isDark
        ? `rgba(6, 182, 212, ${intensity * 0.6})`
        : `rgba(59, 130, 246, ${intensity * 0.4})`;
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
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [variant, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none {OPACITY.NONE} dark:opacity-100 {TRANSITIONS.OPACITY_VERY_SLOW}"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
