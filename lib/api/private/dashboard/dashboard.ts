/**
 * @fileoverview Serviços Privados de Dashboard
 * 
 * Contém funções para comunicação com endpoints privados de dashboard.
 * Requer autenticação.
 * 
 * @module lib/api/private/dashboard/dashboard
 */

import { privateClient } from '../../clients/private-client';
import {
  DashboardStats,
  DashboardAnalytics,
  DashboardResponse,
  GetAnalyticsParams,
} from '../../types/private/dashboard';

/**
 * Obtém estatísticas gerais do dashboard
 * 
 * @returns Promise<DashboardStats> - Estatísticas principais
 * 
 * @example
 * ```typescript
 * const stats = await getDashboardStats();
 * console.log(`Posts: ${stats.totalPosts}`);
 * console.log(`Usuários: ${stats.totalUsers}`);
 * ```
 */
export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await privateClient.get('/api/dashboard/stats');
  return response.data.data;
};

/**
 * Obtém analytics detalhados do dashboard
 * 
 * @param params - Parâmetros opcionais de filtro
 * @returns Promise<DashboardAnalytics> - Analytics completos
 * 
 * @example
 * ```typescript
 * const analytics = await getDashboardAnalytics({
 *   period: 30,
 *   includeDetails: true
 * });
 * ```
 */
export const getDashboardAnalytics = async (
  params?: GetAnalyticsParams
): Promise<DashboardAnalytics> => {
  const response = await privateClient.get('/api/dashboard/analytics', { params });
  return response.data.data;
};
