/**
 * Dashboard Stats Hook
 *
 * Hook que busca e gerencia estatísticas principais do blog/portfólio,
 * incluindo métricas de posts, engajamento e comparações temporais.
 * Fornece dados de variação percentual para indicadores de tendência.
 *
 * @module components/dashboard/hooks/use-dashboard-stats
 * @fileoverview Hook para estatísticas principais do dashboard
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { dashboardService } from '@/lib/api/services/dashboard.service';
import { useEffect, useState } from 'react';

/**
 * Interface das estatísticas do dashboard
 *
 * @interface DashboardStats
 * @property {number} totalPosts - Total de posts publicados
 * @property {number} totalViews - Total de visualizações de todos os posts
 * @property {number} totalLikes - Total de curtidas recebidas
 * @property {number} totalComments - Total de comentários recebidos
 * @property {number} [postsChange] - Variação % de posts (comparado ao período anterior)
 * @property {number} [viewsChange] - Variação % de views (comparado ao período anterior)
 * @property {number} [likesChange] - Variação % de likes (comparado ao período anterior)
 * @property {number} [commentsChange] - Variação % de comentários (comparado ao período anterior)
 */
interface DashboardStats {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  postsChange?: number;
  viewsChange?: number;
  likesChange?: number;
  commentsChange?: number;
}

/**
 * Hook useDashboardStats
 *
 * Carrega e gerencia as estatísticas principais do dashboard.
 * Utiliza o dashboardService para obter dados formatados
 * com estados de loading e erro.
 *
 * Comportamento:
 * - Carrega automaticamente ao montar o componente
 * - Retorna null para stats durante o loading
 * - Fornece mensagem de erro se a requisição falhar
 * - Permite refresh manual dos dados
 *
 * @returns {Object} Objeto com estatísticas e controles
 * @returns {DashboardStats | null} stats - Dados das estatísticas (null durante loading)
 * @returns {boolean} isLoading - Indica se está carregando os dados
 * @returns {string | null} error - Mensagem de erro (null se não houver erro)
 * @returns {Function} refreshStats - Função para recarregar as estatísticas
 *
 * @example
 * // Uso básico em cards de estatísticas
 * import { useDashboardStats } from '@/components/dashboard/hooks'
 *
 * function StatsCards() {
 *   const { stats, isLoading, error } = useDashboardStats()
 *
 *   if (isLoading) return <LoadingSkeleton />
 *   if (error) return <ErrorMessage message={error} />
 *   if (!stats) return null
 *
 *   return (
 *     <div className="grid grid-cols-4 gap-4">
 *       <StatCard
 *         title="Posts"
 *         value={stats.totalPosts}
 *         change={stats.postsChange}
 *       />
 *       <StatCard
 *         title="Views"
 *         value={stats.totalViews}
 *         change={stats.viewsChange}
 *       />
 *       <StatCard
 *         title="Likes"
 *         value={stats.totalLikes}
 *         change={stats.likesChange}
 *       />
 *       <StatCard
 *         title="Comentários"
 *         value={stats.totalComments}
 *         change={stats.commentsChange}
 *       />
 *     </div>
 *   )
 * }
 *
 * @example
 * // Uso com refresh manual
 * function DashboardOverview() {
 *   const { stats, refreshStats, isLoading } = useDashboardStats()
 *
 *   return (
 *     <div>
 *       <button onClick={refreshStats} disabled={isLoading}>
 *         {isLoading ? 'Carregando...' : 'Atualizar Stats'}
 *       </button>
 *       {stats && (
 *         <div>
 *           <p>Total de Posts: {stats.totalPosts}</p>
 *           <p>Total de Views: {stats.totalViews.toLocaleString()}</p>
 *         </div>
 *       )}
 *     </div>
 *   )
 * }
 *
 * @example
 * // Uso com indicadores de tendência
 * function TrendIndicator() {
 *   const { stats } = useDashboardStats()
 *
 *   const getTrendIcon = (change?: number) => {
 *     if (!change) return '→'
 *     return change > 0 ? '↑' : '↓'
 *   }
 *
 *   return (
 *     <div>
 *       <p>
 *         Views: {stats?.totalViews}
 *         <span className={stats?.viewsChange && stats.viewsChange > 0 ? 'text-green-500' : 'text-red-500'}>
 *           {getTrendIcon(stats?.viewsChange)} {stats?.viewsChange}%
 *         </span>
 *       </p>
 *     </div>
 *   )
 * }
 *
 * @see {@link dashboardService.getStats} - Serviço de estatísticas
 */
export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    setIsLoading(true);
    setError(null);

    try {
      const data = await dashboardService.getStats();
      setStats(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao carregar estatísticas';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  function refreshStats() {
    loadStats();
  }

  return {
    stats,
    isLoading,
    error,
    refreshStats,
  };
}
