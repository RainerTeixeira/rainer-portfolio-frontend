/**
 * Loading States Components
 *
 * Componentes padronizados para estados de carregamento. Mantém consistência
 * visual em toda a aplicação com tamanhos configuráveis e layout responsivo.
 *
 * @module components/ui/loading-states
 * @fileoverview Loading states padronizados e reutilizáveis
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Loading full-screen
 * <FullPageLoader />
 *
 * // Loading inline
 * <InlineLoader />
 *
 * // Grid de skeletons
 * <SkeletonGrid columns={3} rows={2} />
 *
 * // Spinner básico
 * <LoadingSpinner size="lg" />
 * ```
 *
 * Componentes inclusos:
 * - FullPageLoader: Loading full-screen
 * - InlineLoader: Loading inline
 * - SkeletonGrid: Grid de skeleton loaders
 * - LoadingSpinner: Spinner básico
 *
 * Características:
 * - Tamanhos configuráveis (sm, md, lg, xl)
 * - Layout responsivo
 * - Acessibilidade completa
 * - Performance otimizada
 */

'use client';

// ============================================================================
// React
// ============================================================================

import { ReactNode } from 'react';

// ============================================================================
// Icons
// ============================================================================

import { Loader2 } from 'lucide-react';

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
      className="min-h-screen w-full flex flex-col items-center justify-center bg-background dark:bg-linear-to-b dark:from-black dark:via-gray-900 dark:to-black"
      role="status"
      aria-label={message}
    >
      <div className="text-center space-y-6">
        {/* Spinner duplo animado */}
        <div className="relative" aria-hidden="true">
          <div className="w-20 h-20 border-4 border-cyan-400 dark:border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <div
            className="absolute inset-0 w-20 h-20 border-4 border-pink-400 dark:border-pink-400 border-b-transparent rounded-full animate-spin mx-auto"
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
}: {
  readonly icon?: React.ComponentType<{ className?: string }>;
  readonly title?: string;
  readonly description?: string;
  readonly action?: ReactNode;
}) {
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
