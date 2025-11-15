// ============================================================================
// Serviço de Dashboard - Integração com API do Backend
// ============================================================================

/**
 * Serviço para gerenciar dados do dashboard (analytics e estatísticas)
 *
 * @fileoverview Serviço de dashboard com métodos para analytics e stats
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import { api } from '../client';
import type { ApiResponse } from '../types';
import type {
  AnalyticsData,
  AnalyticsPeriod,
  DashboardStats,
} from '../types/dashboard';

// ============================================================================
// Classe do Serviço
// ============================================================================

/**
 * Serviço responsável por dados de analytics e estatísticas do dashboard.
 */
export class DashboardService {
  private readonly basePath = '/api/dashboard';

  /**
   * Obtém estatísticas gerais do dashboard
   */
  async getStats(): Promise<DashboardStats> {
    try {
      const response = await api.get<ApiResponse<DashboardStats>>(
        `${this.basePath}/stats`
      );
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error('Resposta inválida do servidor');
    } catch (error) {
      console.error(
        '[DashboardService] Erro ao buscar stats do backend:',
        error
      );
      throw error;
    }
  }

  /**
   * Obtém dados de analytics para um período específico
   */
  async getAnalytics(period: AnalyticsPeriod = '30d'): Promise<AnalyticsData> {
    try {
      const response = await api.get<ApiResponse<AnalyticsData>>(
        `${this.basePath}/analytics`,
        {
          params: { period },
        }
      );
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error('Resposta inválida do servidor');
    } catch (error) {
      console.error(
        '[DashboardService] Erro ao buscar analytics do backend:',
        error
      );
      throw error;
    }
  }
}

// ============================================================================
// Instância Singleton
// ============================================================================

export const dashboardService = new DashboardService();
