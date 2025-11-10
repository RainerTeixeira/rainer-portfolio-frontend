/**
 * Quick Stats Component
 *
 * Componente de estatísticas rápidas para o dashboard. Exibe cards com métricas
 * principais do blog (posts, visualizações, curtidas, comentários) com animações
 * suaves e indicadores de mudança percentual.
 *
 * @module components/dashboard/quick-stats
 * @fileoverview Cards de estatísticas rápidas do dashboard
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Com stats padrão
 * <QuickStats />
 *
 * // Com stats customizados
 * <QuickStats stats={customStats} />
 * ```
 *
 * Características:
 * - Cards de métricas com gradientes coloridos
 * - Indicadores de mudança (positivo/negativo)
 * - Animações staggered suaves
 * - Hover effects premium
 * - Layout responsivo (1 coluna mobile → 4 colunas desktop)
 * - Integração com blogStore para dados reais
 */

'use client';

// ============================================================================
// IMPORTS
// ============================================================================

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  Eye,
  FileText,
  Heart,
  MessageSquare,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import * as React from 'react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Configuração de uma estatística individual
 *
 * @interface Stat
 * @property {string} label - Label descritivo da estatística
 * @property {string | number} value - Valor da estatística
 * @property {number} [change] - Mudança percentual (positivo ou negativo)
 * @property {React.ReactNode} icon - Ícone da estatística
 * @property {string} color - Classes CSS de gradiente de cor
 */
interface Stat {
  label: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color: string;
}

/**
 * Props do componente QuickStats
 *
 * @interface QuickStatsProps
 * @property {Stat[]} [stats] - Array de estatísticas customizadas (opcional)
 */
interface QuickStatsProps {
  stats?: Stat[];
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Estatísticas padrão do dashboard
 *
 * Array com métricas principais do blog: total de posts, visualizações,
 * curtidas e comentários. Cada estatística possui ícone, cor e valor.
 *
 * @type {Stat[]}
 * @constant
 */
const DEFAULT_STATS: ReadonlyArray<Stat> = [
  {
    label: 'Total de Posts',
    value: 4,
    change: 12,
    icon: <FileText className="w-5 h-5" />,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    label: 'Visualizações',
    value: '2.4k',
    change: 8,
    icon: <Eye className="w-5 h-5" />,
    color: 'from-purple-500 to-pink-500',
  },
  {
    label: 'Curtidas',
    value: 156,
    change: -3,
    icon: <Heart className="w-5 h-5" />,
    color: 'from-orange-500 to-red-500',
  },
  {
    label: 'Comentários',
    value: 42,
    change: 15,
    icon: <MessageSquare className="w-5 h-5" />,
    color: 'from-green-500 to-emerald-500',
  },
] as const;

/**
 * Delay entre animações de entrada de cards (em segundos)
 * @type {number}
 * @constant
 */
const STAGGER_DELAY_SECONDS = 0.1;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * QuickStats Component
 *
 * Renderiza grid de cards com estatísticas rápidas do dashboard.
 * Cada card exibe métrica, ícone, valor e indicador de mudança com animações
 * suaves e hover effects premium.
 *
 * @component
 * @param {QuickStatsProps} props - Propriedades do componente
 * @returns {JSX.Element} Grid de cards de estatísticas
 *
 * @remarks
 * Este componente utiliza:
 * - Framer Motion para animações staggered
 * - Cards com gradientes coloridos
 * - Indicadores de tendência (TrendingUp/TrendingDown)
 * - Design system com Tailwind CSS
 * - Layout responsivo otimizado
 */
export function QuickStats({ stats }: QuickStatsProps) {
  // ========================================================================
  // COMPUTED VALUES
  // ========================================================================

  /**
   * Estatísticas a serem exibidas (customizadas ou padrão)
   * @type {Stat[]}
   */
  const displayStats = stats || DEFAULT_STATS;

  // ========================================================================
  // RENDER HELPERS
  // ========================================================================

  /**
   * Renderiza indicador de mudança (positivo ou negativo)
   *
   * @param {number} change - Mudança percentual
   * @returns {JSX.Element | null} Indicador renderizado ou null se não houver mudança
   */
  const renderChangeIndicator = (
    change: number | undefined
  ): React.JSX.Element | null => {
    if (change === undefined) return null;

    const isPositive = change > 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;

    return (
      <div
        className={cn(
          'flex items-center gap-1 text-xs font-semibold',
          isPositive
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-600 dark:text-red-400'
        )}
        aria-label={`Mudança de ${Math.abs(change)}% ${isPositive ? 'aumento' : 'redução'}`}
      >
        <Icon className="w-3 h-3" aria-hidden="true" />
        <span>{Math.abs(change)}%</span>
      </div>
    );
  };

  // ========================================================================
  // MAIN RENDER
  // ========================================================================

  return (
    <section aria-labelledby="quick-stats-heading" className="w-full">
      <h2 id="quick-stats-heading" className="sr-only">
        Estatísticas Rápidas do Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayStats.map((stat, index) => (
          <motion.article
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              delay: index * STAGGER_DELAY_SECONDS,
            }}
            role="article"
            aria-labelledby={`stat-${index}`}
          >
            <Card className="relative overflow-hidden border-2 hover:shadow-lg dark:hover:shadow-cyan-400/10 transition-all duration-300 hover:scale-105">
              {/* ================================================================
                  GRADIENT BACKGROUND
                  ================================================================ */}

              <div
                className={cn(
                  'absolute top-0 right-0 w-32 h-32 opacity-10',
                  'bg-linear-to-br rounded-full blur-2xl',
                  stat.color
                )}
                aria-hidden="true"
              />

              {/* ================================================================
                  CARD CONTENT
                  ================================================================ */}

              <CardContent className="p-6 relative">
                {/* Header com ícone e mudança */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={cn(
                      'p-3 rounded-lg bg-linear-to-br',
                      stat.color,
                      'text-white'
                    )}
                    aria-hidden="true"
                  >
                    {stat.icon}
                  </div>
                  {renderChangeIndicator(stat.change)}
                </div>

                {/* Valor e label */}
                <div>
                  <h3
                    id={`stat-${index}`}
                    className="text-2xl font-bold mb-1 dark:text-gray-100"
                  >
                    {stat.value}
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">
                    {stat.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
