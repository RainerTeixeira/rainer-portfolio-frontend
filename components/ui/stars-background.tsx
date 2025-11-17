/**
 * Stars Background Component
 *
 * Componente que renderiza um céu estrelado no fundo das páginas.
 * Cria uma atmosfera espacial com estrelas animadas.
 * Renderizado APENAS no modo dark
 */

'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function StarsBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<
    Array<{
      id: number;
      left: number;
      top: number;
      size: number;
      delay: number;
      opacity: number;
    }>
  >([]);

  // Previne erro de hidratação SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Gera estrelas aleatórias para o fundo
   */
  useEffect(() => {
    if (!mounted) return;

    const starsCount = 150; // Número de estrelas
    const newStars = Array.from({ length: starsCount }, (_, i) => {
      const randomLeft = Math.random() * 100;
      const randomTop = Math.random() * 100;
      const randomSize = Math.random() * 2 + 0.5; // Tamanho entre 0.5px e 2.5px
      const randomDelay = Math.random() * 3; // Delay para animação variada
      const randomOpacity = 0.6 + Math.random() * 0.4; // Opacidade entre 0.6 e 1.0

      return {
        id: i,
        left: randomLeft,
        top: randomTop,
        size: randomSize,
        delay: randomDelay,
        opacity: randomOpacity,
      };
    });
    setStars(newStars);
  }, [mounted]);

  // Não renderizar até montagem completa (evita hydration mismatch)
  if (!mounted) {
    return null;
  }

  // Não renderizar se não estiver no modo dark
  if (resolvedTheme !== 'dark') {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        {/* Stars Background - Universo Estrelado */}
        <div className="absolute inset-0">
          {stars.map(star => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
                animation: 'starTwinkle 3s ease-in-out infinite',
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* CSS para animações */}
      <style jsx>{`
        /* Animação de brilho das estrelas */
        @keyframes starTwinkle {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </>
  );
}
