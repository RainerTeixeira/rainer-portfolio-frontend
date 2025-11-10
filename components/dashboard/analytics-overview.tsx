/**
 * Analytics Overview Component
 *
 * Visão geral de analytics com cards de métricas do blog. Exibe visualizações,
 * visitantes, curtidas e comentários com indicadores de tendência (aumento ou
 * diminuição percentual).
 *
 * @module components/dashboard/analytics-overview
 * @fileoverview Visão geral de analytics com métricas do blog
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <AnalyticsOverview className="mt-4" />
 * ```
 *
 * Características:
 * - Cards de métricas principais
 * - Indicadores de tendência (up/down)
 * - Ícones coloridos por métrica
 * - Layout responsivo em grid
 * - Integração com dados da API
 * - Animações suaves
 * - Acessibilidade completa
 */

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboardService } from '@/lib/api/services';
import { cn } from '@/lib/utils';
import { Eye, Heart, MessageSquare, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AnalyticsOverviewProps {
  className?: string;
}

interface Metric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export function AnalyticsOverview({ className }: AnalyticsOverviewProps) {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setIsLoading(true);
        const stats = await dashboardService.getStats();

        const newMetrics: Metric[] = [
          {
            title: 'Posts Totais',
            value: stats.totalPosts.toString(),
            change: `${stats.postsChange >= 0 ? '+' : ''}${stats.postsChange.toFixed(1)}%`,
            trend: stats.postsChange >= 0 ? 'up' : 'down',
            icon: TrendingUp,
            color: 'text-blue-500',
          },
          {
            title: 'Visualizações Totais',
            value: stats.totalViews.toLocaleString('pt-BR'),
            change: `${stats.viewsChange >= 0 ? '+' : ''}${stats.viewsChange.toFixed(1)}%`,
            trend: stats.viewsChange >= 0 ? 'up' : 'down',
            icon: Eye,
            color: 'text-cyan-500',
          },
          {
            title: 'Curtidas',
            value: stats.totalLikes.toLocaleString('pt-BR'),
            change: `${stats.likesChange >= 0 ? '+' : ''}${stats.likesChange.toFixed(1)}%`,
            trend: stats.likesChange >= 0 ? 'up' : 'down',
            icon: Heart,
            color: 'text-pink-500',
          },
          {
            title: 'Comentários',
            value: stats.totalComments.toLocaleString('pt-BR'),
            change: `${stats.commentsChange >= 0 ? '+' : ''}${stats.commentsChange.toFixed(1)}%`,
            trend: stats.commentsChange >= 0 ? 'up' : 'down',
            icon: MessageSquare,
            color: 'text-orange-500',
          },
        ];

        setMetrics(newMetrics);
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
        // Em caso de erro, mostrar array vazio
        setMetrics([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
          className
        )}
      >
        {[1, 2, 3, 4].map(i => (
          <Card
            key={i}
            className="dark:bg-black/30 dark:border-cyan-400/20 animate-pulse"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="h-4 bg-muted rounded w-24" />
              <div className="h-4 w-4 bg-muted rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-16 mb-2" />
              <div className="h-3 bg-muted rounded w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (metrics.length === 0) {
    return (
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
          className
        )}
      >
        <Card className="dark:bg-black/30 dark:border-cyan-400/20">
          <CardContent className="p-6 text-center text-muted-foreground">
            Nenhum dado disponível
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
        className
      )}
    >
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card
            key={index}
            className="dark:bg-black/30 dark:border-cyan-400/20 hover:shadow-lg transition-shadow"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <Icon className={cn('h-4 w-4', metric.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-gray-100">
                {metric.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                <span
                  className={cn(
                    'font-medium',
                    metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  )}
                >
                  {metric.change}
                </span>{' '}
                vs período anterior
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
