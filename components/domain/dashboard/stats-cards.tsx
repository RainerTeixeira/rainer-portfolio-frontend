/**
 * Stats Cards Component
 *
 * Cards de estatísticas do dashboard que exibem métricas principais (posts,
 * visualizações, curtidas, comentários) em cards animados com indicadores
 * de mudança percentual.
 *
 * @module components/domain/dashboard/stats-cards
 * @fileoverview Cards de estatísticas do dashboard
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <StatsCards
 *   stats={{
 *     totalPosts: 10,
 *     totalViews: 5000,
 *     totalLikes: 200,
 *     totalComments: 50,
 *     postsChange: 12,
 *     viewsChange: 8
 *   }}
 *   isLoading={false}
 * />
 * ```
 *
 * Características:
 * - Cards de métricas com ícones
 * - Indicadores de mudança (positivo/negativo)
 * - Animações staggered suaves
 * - Estados de loading
 * - Gradientes coloridos
 * - Layout responsivo em grid
 * - Acessibilidade completa
 */

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@rainersoft/ui';
import { cn } from '@/lib/portfolio';
import { motion } from 'framer-motion';
import {
  Eye,
  FileText,
  Heart,
  MessageCircle,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

interface Stat {
  label: string;
  value: number;
  change?: number; // Percentual de mudança
  icon: React.ReactNode;
  color: string;
}

interface StatsCardsProps {
  stats: {
    totalPosts: number;
    totalViews: number;
    totalLikes: number;
    totalComments: number;
    postsChange?: number;
    viewsChange?: number;
    likesChange?: number;
    commentsChange?: number;
  };
  isLoading?: boolean;
}

export function StatsCards({ stats, isLoading }: StatsCardsProps) {
  const cards: Stat[] = [
    {
      label: 'Total de Posts',
      value: stats.totalPosts,
      change: stats.postsChange,
      icon: <FileText className="h-4 w-4" />,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      label: 'Total de Visualizações',
      value: stats.totalViews,
      change: stats.viewsChange,
      icon: <Eye className="h-4 w-4" />,
      color: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Total de Curtidas',
      value: stats.totalLikes,
      change: stats.likesChange,
      icon: <Heart className="h-4 w-4" />,
      color: 'from-pink-500 to-red-500',
    },
    {
      label: 'Total de Comentários',
      value: stats.totalComments,
      change: stats.commentsChange,
      icon: <MessageCircle className="h-4 w-4" />,
      color: 'from-green-500 to-emerald-500',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-8 w-8 bg-muted rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br text-white',
                  stat.color
                )}
              >
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold">
                  {stat.value.toLocaleString()}
                </div>

                {stat.change !== undefined && (
                  <div
                    className={cn(
                      'flex items-center gap-1 text-xs font-medium',
                      stat.change > 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    )}
                  >
                    {stat.change > 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {Math.abs(stat.change)}%
                  </div>
                )}
              </div>

              {stat.change !== undefined && (
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change > 0 ? '+' : ''}
                  {stat.change}% em relação ao mês anterior
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}


