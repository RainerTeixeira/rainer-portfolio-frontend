/**
 * Celestial Background Component
 *
 * Background sofisticado tipo espaço celestial para dark mode.
 * Combina múltiplas camadas de estrelas, nebulosas e gradientes sutis.
 *
 * Características:
 * - Visível apenas no dark mode
 * - Múltiplas camadas de estrelas com tamanhos variados
 * - Gradientes simulando nebulosas
 * - Efeitos de brilho sutis
 * - Performance otimizada (pointer-events-none, fixed)
 * - Não interfere com interações
 *
 * @fileoverview Background celestial para dark mode
 * @author Rainer Teixeira
 * @version 1.0.0
 */

'use client';

import { useEffect, useState } from 'react';

// ============================================================================
// Types
// ============================================================================

interface CelestialBackgroundProps {
  /** Variante do background (default, dense, sparse) */
  variant?: 'default' | 'dense' | 'sparse';
}

// ============================================================================
// Constants
// ============================================================================

/**
 * Configurações de estrelas por variante
 */
const STAR_CONFIGS = {
  default: {
    count: 150,
    sizes: [1, 1.5, 2],
    opacity: [0.35, 0.55, 0.75],
  },
  dense: {
    count: 250,
    sizes: [1, 1.5, 2, 2.5],
    opacity: [0.25, 0.45, 0.65, 0.85],
  },
  sparse: {
    count: 80,
    sizes: [1, 1.5],
    opacity: [0.45, 0.65],
  },
} as const;

/**
 * Gera posições aleatórias de estrelas
 */
function generateStars(count: number): Array<{
  top: string;
  left: string;
  size: number;
  opacity: number;
  delay: string;
}> {
  const stars: Array<{
    top: string;
    left: string;
    size: number;
    opacity: number;
    delay: string;
  }> = [];
  const sizes = STAR_CONFIGS.default.sizes;
  const opacities = STAR_CONFIGS.default.opacity;
  const delays = ['0s', '1s', '2s', '3s', '4s'];

  for (let i = 0; i < count; i++) {
    const sizeIndex = Math.floor(Math.random() * sizes.length);
    const opacityIndex = Math.floor(Math.random() * opacities.length);
    const delayIndex = Math.floor(Math.random() * delays.length);

    stars.push({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: sizes[sizeIndex] ?? 1,
      opacity: opacities[opacityIndex] ?? 0.5,
      delay: delays[delayIndex] ?? '0s',
    });
  }

  return stars;
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * Componente Celestial Background
 *
 * Renderiza background sofisticado tipo espaço celestial.
 * Múltiplas camadas de estrelas, nebulosas e gradientes.
 *
 * @param variant - Variante de densidade (default, dense, sparse)
 * @returns Container fixo com efeito celestial
 */
export function CelestialBackground({
  variant = 'default',
}: CelestialBackgroundProps = {}) {
  const config = STAR_CONFIGS[variant];
  const [stars, setStars] = useState<
    Array<{
      top: string;
      left: string;
      size: number;
      opacity: number;
      delay: string;
    }>
  >([]);
  const [isMounted, setIsMounted] = useState(false);

  // Gera estrelas apenas no cliente após montagem para evitar hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    setStars(generateStars(config.count));
  }, [config.count]);

  return (
    <div
      className="fixed inset-0 pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-1000"
      style={{
        zIndex: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
      }}
      aria-hidden="true"
    >
      {/* Camada de gradiente base - Nebulosa escura cyberpunk */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/35 to-black" />

      {/* Camada de nebulosas coloridas cyberpunk mais intensas */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Nebulosa cyan - canto superior esquerdo */}
        <div
          className="absolute top-0 left-0 w-[40%] h-[40%] bg-gradient-radial from-cyan-500/6 via-cyan-400/4 to-transparent blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 0% 0%, rgba(34, 211, 238, 0.06) 0%, rgba(34, 211, 238, 0.04) 30%, transparent 70%)',
          }}
        />

        {/* Nebulosa purple - centro direito */}
        <div
          className="absolute top-1/2 right-0 w-[35%] h-[35%] bg-gradient-radial from-purple-500/6 via-purple-400/4 to-transparent blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 100% 50%, rgba(168, 85, 247, 0.06) 0%, rgba(168, 85, 247, 0.04) 30%, transparent 70%)',
          }}
        />

        {/* Nebulosa pink - canto inferior esquerdo */}
        <div
          className="absolute bottom-0 left-1/4 w-[30%] h-[30%] bg-gradient-radial from-pink-500/6 via-pink-400/4 to-transparent blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 25% 100%, rgba(236, 72, 153, 0.06) 0%, rgba(236, 72, 153, 0.04) 30%, transparent 70%)',
          }}
        />
      </div>

      {/* Camada de estrelas grandes (brilhantes) - apenas no cliente */}
      {isMounted && (
        <>
          <div className="absolute inset-0">
            {stars.slice(0, Math.floor(config.count * 0.3)).map((star, idx) => (
              <div
                key={`star-large-${idx}`}
                className="absolute rounded-full bg-white animate-pulse"
                style={{
                  top: star.top,
                  left: star.left,
                  width: `${star.size * 2}px`,
                  height: `${star.size * 2}px`,
                  opacity: star.opacity,
                  animationDelay: star.delay,
                  boxShadow: `0 0 ${star.size * 3}px rgba(255, 255, 255, ${star.opacity})`,
                }}
              />
            ))}
          </div>

          {/* Camada de estrelas médias */}
          <div className="absolute inset-0">
            {stars
              .slice(
                Math.floor(config.count * 0.3),
                Math.floor(config.count * 0.7)
              )
              .map((star, idx) => (
                <div
                  key={`star-medium-${idx}`}
                  className="absolute rounded-full bg-white animate-pulse"
                  style={{
                    top: star.top,
                    left: star.left,
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                    opacity: star.opacity * 0.8,
                    animationDelay: star.delay,
                    boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity * 0.5})`,
                  }}
                />
              ))}
          </div>

          {/* Camada de estrelas pequenas (maioria) */}
          <div className="absolute inset-0">
            {stars.slice(Math.floor(config.count * 0.7)).map((star, idx) => (
              <div
                key={`star-small-${idx}`}
                className="absolute rounded-full bg-white"
                style={{
                  top: star.top,
                  left: star.left,
                  width: `${star.size * 0.5}px`,
                  height: `${star.size * 0.5}px`,
                  opacity: star.opacity * 0.6,
                  boxShadow: `0 0 ${star.size}px rgba(255, 255, 255, ${star.opacity * 0.3})`,
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Efeito de brilho sutil no centro */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20" />

      {/* Partículas grandes decorativas (planetas/asteroides distantes) */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-gradient-radial from-cyan-400/10 via-transparent to-transparent blur-2xl animate-pulse"
          style={{
            animationDuration: '8s',
            animationDelay: '0s',
          }}
        />
        <div
          className="absolute bottom-1/3 left-1/3 w-24 h-24 rounded-full bg-gradient-radial from-purple-400/10 via-transparent to-transparent blur-2xl animate-pulse"
          style={{
            animationDuration: '10s',
            animationDelay: '2s',
          }}
        />
        <div
          className="absolute top-2/3 right-1/5 w-20 h-20 rounded-full bg-gradient-radial from-pink-400/10 via-transparent to-transparent blur-2xl animate-pulse"
          style={{
            animationDuration: '12s',
            animationDelay: '4s',
          }}
        />
      </div>
    </div>
  );
}
