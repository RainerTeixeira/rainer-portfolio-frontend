/**
 * Loading Screen e Estados de Carregamento
 *
 * Componentes unificados para estados de carregamento. Inclui tela de loading inicial,
 * loaders inline, skeletons e spinners. Mantém consistência visual em toda a aplicação.
 *
 * @module components/ui/loading-screen
 * @fileoverview Componentes de loading unificados e otimizados
 * @author Rainer Teixeira
 * @version 3.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Tela de loading inicial
 * <LoadingScreen progress={50} currentStep="Carregando..." />
 *
 * // Loading inline
 * <InlineLoader message="Carregando dados..." />
 *
 * // Grid de skeletons
 * <SkeletonGrid columns={3} count={6} />
 *
 * // Spinner básico
 * <LoadingSpinner size="lg" />
 * ```
 */

'use client';

// ============================================================================
// React
// ============================================================================

import { ReactNode, useEffect, useState } from 'react';

// ============================================================================
// Loading Indicators
// ============================================================================

import { Atom } from 'react-loading-indicators';

// ============================================================================
// Icons
// ============================================================================

import { Loader2 } from 'lucide-react';

// ============================================================================
// Utils
// ============================================================================

import { cn } from '@/lib/utils';
import { hexToRGB } from '@/lib/utils/color-utils';

// Cache de tokens carregados dinamicamente
let tokensCache: any = null;

// Carregar tokens de forma assíncrona
(async () => {
  try {
    const module = await import('@rainersoft/design-tokens');
    tokensCache = module.tokens || module.default || {};
  } catch (error) {
    console.warn('Design tokens não disponíveis no loading-screen:', error);
    tokensCache = {};
  }
})();

// ============================================================================
// Providers
// ============================================================================

import { useTheme } from 'next-themes';

// ============================================================================
// UI Components
// ============================================================================

import { Skeleton } from './skeleton';

// ============================================================================
// Constants
// ============================================================================

/**
 * Tamanhos de spinner disponíveis
 */
const SPINNER_SIZES = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
} as const;

/**
 * Função auxiliar para obter cor de token com fallback seguro
 *
 * @param theme - Tema ('dark' ou 'light')
 * @param color - Nome da cor primitiva
 * @param shade - Tom da cor
 * @param fallback - Cor hexadecimal de fallback
 * @returns Cor hexadecimal do token ou fallback
 */
function getTokenColor(
  theme: 'dark' | 'light',
  color: string,
  shade: number,
  fallback: string
): string {
  try {
    if (!tokensCache?.colors?.[theme]?.primitive) {
      return fallback;
    }
    const colorObj = (tokensCache.colors[theme].primitive as Record<string, Record<number, string>>)[color];
    if (!colorObj || typeof colorObj !== 'object') {
      return fallback;
    }
    const colorValue = colorObj[shade];
    return typeof colorValue === 'string' ? colorValue : fallback;
  } catch {
    return fallback;
  }
}

// ============================================================================
// Types
// ============================================================================

type SpinnerSize = keyof typeof SPINNER_SIZES;

interface LoadingSpinnerProps {
  readonly size?: SpinnerSize;
  readonly className?: string;
  readonly label?: string;
}

interface FullPageLoaderProps {
  readonly message?: string;
}

interface InlineLoaderProps {
  readonly message?: string;
  readonly size?: SpinnerSize;
}

interface SkeletonGridProps {
  readonly count?: number;
  readonly columns?: 1 | 2 | 3 | 4;
  readonly className?: string;
}

interface LoadingScreenProps {
  readonly progress?: number;
  readonly currentStep?: string;
}

interface EmptyStateProps {
  readonly icon?: React.ComponentType<{ className?: string }>;
  readonly title?: string;
  readonly description?: string;
  readonly action?: ReactNode;
}

// ============================================================================
// Components
// ============================================================================

/**
 * Loading Spinner básico
 *
 * Ícone de loading animado customizável.
 *
 * @param size - Tamanho do spinner
 * @param className - Classes CSS adicionais
 * @param label - Label de acessibilidade
 */
export function LoadingSpinner({
  size = 'md',
  className = '',
  label = 'Carregando...',
}: LoadingSpinnerProps) {
  return (
    <Loader2
      className={`${SPINNER_SIZES[size]} animate-spin text-primary ${className}`}
      aria-label={label}
      role="status"
    />
  );
}

/**
 * Full Page Loader
 *
 * Loading que ocupa tela inteira.
 * Usado em transições de página e carregamento inicial.
 *
 * @param message - Mensagem opcional de carregamento
 */
export function FullPageLoader({
  message = 'Carregando...',
}: FullPageLoaderProps) {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-background"
      role="status"
      aria-label={message}
    >
      <div className="text-center space-y-6">
        {/* Spinner duplo animado */}
        <div className="relative" aria-hidden="true">
          <div className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <div
            className="absolute inset-0 w-20 h-20 border-4 border-pink-400 border-b-transparent rounded-full animate-spin mx-auto"
            style={{ animationDirection: 'reverse' }}
          />
        </div>

        {/* Mensagem */}
        <p className="text-cyan-600 dark:text-cyan-300 font-mono text-sm tracking-wider animate-pulse">
          {message.toUpperCase()}
        </p>
      </div>
    </div>
  );
}

/**
 * Inline Loader
 *
 * Loading inline para seções ou componentes.
 * Não ocupa tela inteira.
 *
 * @param message - Mensagem de carregamento
 * @param size - Tamanho do spinner
 */
export function InlineLoader({
  message = 'Carregando...',
  size = 'md',
}: InlineLoaderProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-12 space-y-4"
      role="status"
      aria-label={message}
    >
      <LoadingSpinner size={size} />
      <p className="text-sm text-muted-foreground dark:text-gray-400">
        {message}
      </p>
    </div>
  );
}

/**
 * Skeleton Grid
 *
 * Grid de skeleton loaders para listas.
 * Usado em blog, dashboard, portfolio, etc.
 *
 * @param count - Número de skeletons
 * @param columns - Número de colunas
 * @param className - Classes CSS adicionais
 */
export function SkeletonGrid({
  count = 4,
  columns = 2,
  className = '',
}: SkeletonGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="space-y-4">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  );
}

/**
 * Empty State Component
 *
 * Estado vazio padronizado para listas sem conteúdo.
 *
 * @param icon - Ícone a exibir
 * @param title - Título do estado vazio
 * @param description - Descrição
 * @param action - Ação opcional (botão)
 */
export function EmptyState({
  icon: Icon = Loader2,
  title = 'Nenhum item encontrado',
  description = 'Não há itens para exibir no momento.',
  action,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-cyan-500/10 to-purple-500/10 dark:from-cyan-400/10 dark:to-purple-400/10 border border-cyan-400/30 mb-6">
        <Icon
          className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-600 dark:text-cyan-400"
          aria-hidden="true"
        />
      </div>

      <h3 className="text-xl sm:text-2xl font-bold mb-2 text-foreground dark:text-cyan-200">
        {title}
      </h3>

      <p className="text-sm sm:text-base text-muted-foreground dark:text-gray-400 mb-6 max-w-md mx-auto">
        {description}
      </p>

      {action && <div className="flex justify-center">{action}</div>}
    </div>
  );
}

/**
 * LoadingScreen Component
 *
 * Tela de carregamento inicial com estilo cyberpunk profissional.
 * Exibe animações suaves, mensagens dinâmicas e progresso visual.
 * Otimizado para performance e uso eficiente de tokens.
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
  const [mounted, setMounted] = useState(false);

  // ============================================================================
  // Hooks
  // ============================================================================

  const { theme, systemTheme } = useTheme();

  // ============================================================================
  // Theme Colors (com fallbacks seguros)
  // ============================================================================

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? (theme === 'system' ? systemTheme : theme) : 'light';
  const isDark = currentTheme === 'dark';

  // Cores otimizadas com fallbacks - usando tokens de forma inteligente
  const primaryColor = isDark
    ? getTokenColor('dark', 'cyan', 400, '#22d3ee')
    : getTokenColor('light', 'cyan', 600, '#0891b2');
  const secondaryColor = isDark
    ? getTokenColor('dark', 'purple', 400, '#a855f7')
    : getTokenColor('light', 'purple', 600, '#9333ea');
  const accentColor = isDark
    ? getTokenColor('dark', 'pink', 400, '#f472b6')
    : getTokenColor('light', 'pink', 600, '#db2777');

  // Converter para RGB para uso em estilos
  const primaryRGB = hexToRGB(primaryColor);
  const secondaryRGB = hexToRGB(secondaryColor);
  const accentRGB = hexToRGB(accentColor);

  // ============================================================================
  // Effects
  // ============================================================================

  /**
   * Gera estrelas aleatórias para o fundo
   */
  useEffect(() => {
    const starsCount = 100; // Reduzido para melhor performance
    const newStars = Array.from({ length: starsCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 3,
      opacity: 0.6 + Math.random() * 0.4,
    }));
    setStars(newStars);
  }, []);

  /**
   * Anima progresso suavemente
   */
  useEffect(() => {
    if (progress === undefined) {
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

  const currentMessage = currentStep || 'Inicializando sistemas...';
  const progressValue = progress !== undefined ? displayedProgress : undefined;

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex flex-col items-center justify-center',
        'bg-background backdrop-blur-sm',
        'transition-opacity duration-500'
      )}
      role="status"
      aria-label="Carregando aplicação"
      aria-live="polite"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Stars Background - Otimizado */}
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

        {/* Gradient Orbs - Otimizados */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse opacity-20"
          style={{
            background: `radial-gradient(circle, rgba(${primaryRGB}, 0.3), transparent)`,
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse opacity-20"
          style={{
            background: `radial-gradient(circle, rgba(${secondaryRGB}, 0.3), transparent)`,
            animationDelay: '1s',
          }}
        />

      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 px-4">
        {/* Logo/Icon Area - Atom Loading Indicator */}
        <div
          className="relative flex items-center justify-center"
          aria-hidden="true"
          suppressHydrationWarning
        >
          <Atom
            color={[primaryColor, secondaryColor, accentColor, primaryColor]}
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
              'tracking-wider animate-pulse'
            )}
            style={{ color: primaryColor }}
            aria-live="polite"
          >
            {currentMessage}
          </p>

          {/* Progress Bar (se progresso fornecido) */}
          {progressValue !== undefined && (
            <div className="w-64 sm:w-80 space-y-2">
              <div
                className="h-1 bg-muted rounded-full overflow-hidden border"
                style={{
                  borderColor: `${primaryColor}33`,
                }}
              >
                <div
                  className="h-full transition-all duration-300 ease-out"
                  style={{
                    width: `${progressValue}%`,
                    background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
                    boxShadow: `0 0 10px ${primaryColor}`,
                  }}
                  aria-valuenow={progressValue}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  role="progressbar"
                />
              </div>
              <p
                className="text-xs font-mono text-right"
                style={{ color: `${primaryColor}B3` }}
                aria-hidden="true"
              >
                {Math.round(progressValue)}%
              </p>
            </div>
          )}
        </div>

        {/* Binary Rain Effect (subtle) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none opacity-20"
          aria-hidden="true"
        >
          <div
            className="absolute top-0 left-1/4 font-mono text-xs animate-pulse"
            style={{ color: `${primaryColor}4D` }}
          >
            01001001
          </div>
          <div
            className="absolute top-1/4 left-3/4 font-mono text-xs animate-pulse"
            style={{
              color: `${secondaryColor}4D`,
              animationDelay: '0.5s',
            }}
          >
            11001100
          </div>
          <div
            className="absolute bottom-1/4 left-1/2 font-mono text-xs animate-pulse"
            style={{
              color: `${primaryColor}4D`,
              animationDelay: '1s',
            }}
          >
            10101010
          </div>
        </div>
      </div>

      {/* CSS para animações */}
      <style jsx>{`
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
    </div>
  );
}
