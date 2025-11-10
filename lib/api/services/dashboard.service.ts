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

// ============================================================================
// Types
// ============================================================================

/**
 * Estatísticas gerais do dashboard
 */
export interface DashboardStats {
  readonly totalPosts: number;
  readonly totalViews: number;
  readonly totalLikes: number;
  readonly totalComments: number;
  readonly postsChange: number;
  readonly viewsChange: number;
  readonly likesChange: number;
  readonly commentsChange: number;
}

/**
 * Dados de visualizações por data
 */
export interface ViewsData {
  readonly date: string;
  readonly views: number;
  readonly uniqueViews: number;
}

/**
 * Dados de engajamento por data
 */
export interface EngagementData {
  readonly date: string;
  readonly likes: number;
  readonly comments: number;
}

/**
 * Dados de analytics do dashboard
 */
export interface AnalyticsData {
  readonly views: ViewsData[];
  readonly engagement: EngagementData[];
}

/**
 * Período de análise
 */
export type AnalyticsPeriod = '7d' | '30d' | '90d';

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
