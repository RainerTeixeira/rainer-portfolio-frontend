/**
 * Loading Screen Component
 *
 * Tela de carregamento inicial da aplicação. Exibida durante a inicialização
 * dos sistemas (autenticação, tema, providers, etc.) antes de mostrar o conteúdo principal.
 *
 * @module components/ui/loading-screen
 * @fileoverview Tela de loading inicial com estilo cyberpunk
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // No layout principal
 * {isInitializing ? <LoadingScreen /> : <AppContent />}
 * ```
 *
 * Características:
 * - Estilo cyberpunk/futurista
 * - Animações suaves
 * - Mensagens de inicialização dinâmicas
 * - Progresso visual
 * - Acessibilidade completa
 */

'use client';

// ============================================================================
// React
// ============================================================================

import { useEffect, useState } from 'react';

// ============================================================================
// Loading Indicators
// ============================================================================

import { Atom } from 'react-loading-indicators';

// ============================================================================
// Utils
// ============================================================================

import { cn } from '@/lib/utils';
import { tokens, GRADIENT_COMPOSITES } from '@rainersoft/design-tokens';
import { useTheme } from 'next-themes';

// ============================================================================
// Providers
// ============================================================================

import { useMatrix } from '@/components/providers';

// ============================================================================
// Constants
// ============================================================================

// Mensagens de inicialização movidas para app-initialization-provider.tsx
// O loading-screen usa apenas o currentStep fornecido pelo provider

// ============================================================================
// Types
// ============================================================================

interface LoadingScreenProps {
  readonly progress?: number;
  readonly currentStep?: string;
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * LoadingScreen Component
 *
 * Tela de carregamento inicial com estilo cyberpunk.
 * Exibe animações e mensagens durante a inicialização.
 *
 * @param progress - Progresso de 0 a 100 (opcional)
 * @param currentStep - Etapa atual de inicialização (opcional)
 */
export function LoadingScreen({ progress, currentStep }: LoadingScreenProps) {
  // ============================================================================
  // State
  // ============================================================================

  const [displayedProgress, setDisplayedProgress] = useState(0);
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

  // ============================================================================
  // Hooks
  // ============================================================================

  const { theme, systemTheme } = useTheme();
  const { matrixColumns, isInitialized: matrixInitialized } = useMatrix();
  const [mounted, setMounted] = useState(false);

  // ============================================================================
  // Theme Colors
  // ============================================================================

  // Previne erro de hidratação: só determina tema após montagem no cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Usa light theme como padrão até que o tema seja determinado no cliente
  // Isso garante consistência entre servidor e cliente na primeira renderização
  const currentTheme = mounted ? (theme === 'system' ? systemTheme : theme) : 'light';
  const isDark = currentTheme === 'dark';
  
  // Usa EXCLUSIVAMENTE tokens da biblioteca @rainersoft/design-tokens
  const colors = isDark ? tokens.colors.dark : tokens.colors.light;

  // ============================================================================
  // Effects
  // ============================================================================

  /**
   * Gera estrelas aleatórias para o fundo
   */
  useEffect(() => {
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
  }, []);

  /**
   * Anima progresso suavemente
   */
  useEffect(() => {
    if (progress === undefined) {
      // Se não há progresso, manter em 0
      setDisplayedProgress(0);
      return;
    }

    const targetProgress = Math.min(100, Math.max(0, progress));
    const step = (targetProgress - displayedProgress) / 10;

    const interval = setInterval(() => {
      setDisplayedProgress(prev => {
        const next = prev + step;
        if (Math.abs(next - targetProgress) < 0.5) {
          return targetProgress;
        }
        return next;
      });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [progress, displayedProgress]);

  // ============================================================================
  // Computed Values
  // ============================================================================

  // Usa apenas o currentStep fornecido pelo provider (sem redundância)
  const currentMessage = currentStep || 'Inicializando sistemas...';
  const progressValue = progress !== undefined ? displayedProgress : undefined;

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div
      className={cn(
        'fixed inset-0 z-9999 flex flex-col items-center justify-center',
        'bg-background',
        'backdrop-blur-sm',
        'transition-opacity duration-500'
      )}
      role="status"
      aria-label="Carregando aplicação"
      aria-live="polite"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
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

        {/* Gradient Orbs */}
        <div
          className={cn(
            'absolute top-1/4 left-1/4 w-96 h-96',
            'bg-primary/20 rounded-full blur-3xl',
            'animate-pulse'
          )}
        />
        <div
          className={cn(
            'absolute bottom-1/4 right-1/4 w-96 h-96',
            'bg-secondary/20 rounded-full blur-3xl',
            'animate-pulse'
          )}
          style={{ animationDelay: '1s' }}
        />

        {/* Matrix Rain - Renderizado durante loading */}
        {matrixInitialized && matrixColumns.length > 0 && (
          <div className="matrix-grid absolute inset-0 z-0 overflow-hidden">
            {matrixColumns.map(column => {
              // Usa cor accent dos tokens diretamente
              const glowColorHex = colors.accent.base;
              // Converte hex para rgb manualmente
              const hex = glowColorHex.replace('#', '');
              const r = parseInt(hex.substring(0, 2), 16);
              const g = parseInt(hex.substring(2, 4), 16);
              const b = parseInt(hex.substring(4, 6), 16);
              const glowColor = `rgb(${r}, ${g}, ${b})`;

              return (
                <div
                  key={column.id}
                  className="matrix-column-wrapper absolute pointer-events-none"
                  style={{
                    left: `${column.leftPct}%`,
                    top: 0,
                    height: '200vh',
                    animationName: 'matrixBinaryFall',
                    animationDuration: `${column.animationDuration}s`,
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                    animationDelay: `${column.animationDelay}s`,
                    transform: `scaleY(${column.speed})`,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  {/* Primeiro set */}
                  <div
                    className="flex flex-col gap-0 whitespace-pre text-center"
                    style={{ opacity: column.intensity }}
                  >
                    {column.characters.map((character, index) => {
                      const baseOpacity =
                        index === 0 ? 1 : Math.max(0.2, 1 - index * 0.08);
                      const charVariation = character === '1' ? 1.15 : 0.9;
                      const finalOpacity = Math.min(
                        1,
                        baseOpacity * charVariation
                      );

                      return (
                        <span
                          key={`${column.id}-ch-${index}-1`}
                          className="font-mono font-bold tracking-wider text-accent"
                          style={{
                            fontSize: `${column.fontSize}px`,
                            opacity: finalOpacity,
                            textShadow:
                              index === 0
                                ? `0 0 20px ${glowColor}, 0 0 35px ${glowColor}, 0 0 50px ${glowColor}`
                                : index < 2
                                  ? `0 0 12px ${glowColor}, 0 0 20px ${glowColor}`
                                  : `0 0 8px ${glowColor}`,
                            filter:
                              index === 0
                                ? 'brightness(1.6) contrast(1.3) saturate(1.4)'
                                : index < 2
                                  ? 'brightness(1.3) saturate(1.2)'
                                  : 'brightness(1.1)',
                            transform: index === 0 ? 'scale(1.15)' : 'scale(1)',
                            fontWeight:
                              index === 0 ? '900' : index < 2 ? '800' : '700',
                          }}
                        >
                          {character}
                        </span>
                      );
                    })}
                  </div>

                  {/* Segundo set - Continuidade */}
                  <div
                    className="flex flex-col gap-0 whitespace-pre text-center"
                    style={{ opacity: column.intensity }}
                  >
                    {column.characters.map((character, index) => {
                      const baseOpacity =
                        index === 0 ? 1 : Math.max(0.2, 1 - index * 0.08);
                      const charVariation = character === '1' ? 1.15 : 0.9;
                      const finalOpacity = Math.min(
                        1,
                        baseOpacity * charVariation
                      );

                      return (
                        <span
                          key={`${column.id}-ch-${index}-2`}
                          className="font-mono font-bold tracking-wider text-accent"
                          style={{
                            fontSize: `${column.fontSize}px`,
                            opacity: finalOpacity,
                            textShadow:
                              index === 0
                                ? `0 0 20px ${glowColor}, 0 0 35px ${glowColor}, 0 0 50px ${glowColor}`
                                : index < 2
                                  ? `0 0 12px ${glowColor}, 0 0 20px ${glowColor}`
                                  : `0 0 8px ${glowColor}`,
                            filter:
                              index === 0
                                ? 'brightness(1.6) contrast(1.3) saturate(1.4)'
                                : index < 2
                                  ? 'brightness(1.3) saturate(1.2)'
                                  : 'brightness(1.1)',
                            transform: index === 0 ? 'scale(1.15)' : 'scale(1)',
                            fontWeight:
                              index === 0 ? '900' : index < 2 ? '800' : '700',
                          }}
                        >
                          {character}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 px-4">
        {/* Logo/Icon Area - Atom Loading Indicator */}
        <div
          className="relative flex items-center justify-center"
          aria-hidden="true"
          suppressHydrationWarning
        >
          {/* Atom Component - Identidade Visual */}
          {/* Cores mudam após detecção do tema no cliente (prevenido via mounted state) */}
          <Atom
            color={[
              colors.primary.base,
              colors.secondary.base,
              colors.accent.base,
              colors.primary.base,
            ]}
            // Cores vêm EXCLUSIVAMENTE dos design tokens
            size="large"
            text=""
            textColor=""
            speedPlus={1}
          />
        </div>

        {/* Message */}
        <div className="text-center space-y-4">
          <p
            className={cn(
              'text-lg sm:text-xl font-mono font-semibold',
              'text-primary tracking-wider',
              'animate-pulse'
            )}
            aria-live="polite"
          >
            {currentMessage}
          </p>

          {/* Progress Bar (se progresso fornecido) */}
          {progressValue !== undefined && (
            <div className="w-64 sm:w-80 space-y-2">
              <div
                className={cn(
                  'h-1 bg-muted rounded-full overflow-hidden',
                  'border border-primary/20'
                )}
              >
                <div
                  className={cn(
                    GRADIENT_COMPOSITES.HORIZONTAL_PRIMARY,
                    'h-full transition-all duration-300 ease-out',
                    'shadow-[0_0_10px_hsl(var(--primary))]'
                  )}
                  style={{ width: `${progressValue}%` }}
                  aria-valuenow={progressValue}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  role="progressbar"
                />
              </div>
              <p
                className="text-xs text-primary/70 font-mono text-right"
                aria-hidden="true"
              >
                {Math.round(progressValue)}%
              </p>
            </div>
          )}
        </div>

        {/* Binary Rain Effect (subtle) */}
        <div
          className={cn(
            'absolute inset-0 overflow-hidden pointer-events-none',
            'opacity-20'
          )}
          aria-hidden="true"
        >
          <div className="absolute top-0 left-1/4 text-primary/30 font-mono text-xs animate-pulse">
            01001001
          </div>
          <div
            className="absolute top-1/4 left-3/4 text-secondary/30 font-mono text-xs animate-pulse"
            style={{ animationDelay: '0.5s' }}
          >
            11001100
          </div>
          <div
            className="absolute bottom-1/4 left-1/2 text-primary/30 font-mono text-xs animate-pulse"
            style={{ animationDelay: '1s' }}
          >
            10101010
          </div>
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

        /* Animação da matrix rain */
        @keyframes matrixBinaryFall {
          from {
            transform: translate3d(0, -100vh, 0) translateZ(0);
            opacity: 0;
          }
          2% {
            opacity: 1;
          }
          98% {
            opacity: 1;
          }
          to {
            transform: translate3d(0, 0, 0) translateZ(0);
            opacity: 0;
          }
        }

        .matrix-column-wrapper {
          backface-visibility: hidden;
          transform: translateZ(0);
        }

        .matrix-grid {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </div>
  );
}
