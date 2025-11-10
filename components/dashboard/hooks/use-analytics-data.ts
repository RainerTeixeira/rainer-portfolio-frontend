/**
 * Analytics Data Hook
 *
 * Hook que busca e gerencia dados de analytics do blog, incluindo
 * visualizações (views) e engajamento (likes e comentários). Permite
 * filtrar por período e fornece função de refresh.
 *
 * @module components/dashboard/hooks/use-analytics-data
 * @fileoverview Hook para dados de analytics do dashboard
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import {
  dashboardService,
  type AnalyticsPeriod,
} from '@/lib/api/services/dashboard.service';
import { useCallback, useEffect, useState } from 'react';

/**
 * Dados de visualizações por data
 *
 * @interface ViewsData
 * @property {string} date - Data no formato YYYY-MM-DD
 * @property {number} views - Total de visualizações na data
 * @property {number} [uniqueViews] - Visualizações únicas (opcional)
 */
interface ViewsData {
  date: string;
  views: number;
  uniqueViews?: number;
}

/**
 * Dados de engajamento por data
 *
 * @interface EngagementData
 * @property {string} date - Data no formato YYYY-MM-DD
 * @property {number} likes - Total de curtidas na data
 * @property {number} comments - Total de comentários na data
 */
interface EngagementData {
  date: string;
  likes: number;
  comments: number;
}

// Re-export do tipo do serviço
export type Period = AnalyticsPeriod;

/**
 * Hook useAnalyticsData
 *
 * Busca e gerencia dados de analytics do blog para exibição no dashboard.
 * Utiliza o dashboardService para obter dados de visualizações e engajamento.
 *
 * @param {AnalyticsPeriod} [period="30d"] - Período de análise (7d, 30d ou 90d)
 *
 * @returns {Object} Objeto com dados e funções de analytics
 * @returns {ViewsData[]} viewsData - Array com dados de visualizações por data
 * @returns {EngagementData[]} engagementData - Array com dados de engajamento por data
 * @returns {boolean} isLoading - Indica se está carregando dados
 * @returns {string | null} error - Mensagem de erro (null se não houver erro)
 * @returns {Function} refreshData - Função para recarregar os dados
 *
 * @example
 * // Uso básico com período padrão (30 dias)
 * import { useAnalyticsData } from '@/components/dashboard/hooks'
 *
 * function AnalyticsChart() {
 *   const { viewsData, engagementData, isLoading, error } = useAnalyticsData()
 *
 *   if (isLoading) return <Spinner />
 *   if (error) return <Error message={error} />
 *
 *   return (
 *     <LineChart data={viewsData} />
 *   )
 * }
 *
 * @example
 * // Uso com período personalizado e refresh
 * function CustomAnalytics() {
 *   const [period, setPeriod] = useState<AnalyticsPeriod>("7d")
 *   const { viewsData, engagementData, refreshData } = useAnalyticsData(period)
 *
 *   return (
 *     <div>
 *       <select onChange={(e) => setPeriod(e.target.value as AnalyticsPeriod)}>
 *         <option value="7d">7 dias</option>
 *         <option value="30d">30 dias</option>
 *         <option value="90d">90 dias</option>
 *       </select>
 *       <button onClick={refreshData}>Atualizar</button>
 *       <Chart data={viewsData} />
 *     </div>
 *   )
 * }
 *
 * @see {@link dashboardService.getAnalytics} - Serviço de analytics
 */
export function useAnalyticsData(period: AnalyticsPeriod = '30d') {
  const [viewsData, setViewsData] = useState<ViewsData[]>([]);
  const [engagementData, setEngagementData] = useState<EngagementData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await dashboardService.getAnalytics(period);
      setViewsData(data.views || []);
      setEngagementData(data.engagement || []);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Erro ao carregar dados de analytics';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [period]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function refreshData() {
    loadData();
  }

  return {
    viewsData,
    engagementData,
    isLoading,
    error,
    refreshData,
  };
}
