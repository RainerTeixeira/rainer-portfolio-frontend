// ============================================================================
// Serviço de Health Check - Integração com API do Backend
// ============================================================================

/**
 * Serviço para verificar status da API e sistema
 * 
 * @fileoverview Serviço de health check com métodos para monitoramento
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import { api } from '../client';
import type {
    ApiResponse,
    DetailedHealthCheckResponse,
    HealthCheckResponse
} from '../types';

// ============================================================================
// Classe do Serviço
// ============================================================================

export class HealthService {
  private readonly basePath = '/health';

  /**
   * Verifica status básico da API
   */
  async getHealthStatus(): Promise<HealthCheckResponse> {
    const response = await api.get<ApiResponse<HealthCheckResponse>>(this.basePath);
    return response.data;
  }

  /**
   * Verifica status detalhado da API
   */
  async getDetailedHealthStatus(): Promise<DetailedHealthCheckResponse> {
    const response = await api.get<ApiResponse<DetailedHealthCheckResponse>>(`${this.basePath}/detailed`);
    return response.data;
  }

  /**
   * Verifica se a API está online
   */
  async isApiOnline(): Promise<boolean> {
    try {
      const health = await this.getHealthStatus();
      return health.status === 'ok';
    } catch {
      return false;
    }
  }

  /**
   * Verifica se o banco de dados está conectado
   */
  async isDatabaseConnected(): Promise<boolean> {
    try {
      const detailedHealth = await this.getDetailedHealthStatus();
      return detailedHealth.database.status === 'connected';
    } catch {
      return false;
    }
  }

  /**
   * Obtém informações do banco de dados
   */
  async getDatabaseInfo(): Promise<{ provider: string; status: string; description: string; endpoint?: string }> {
    const detailedHealth = await this.getDetailedHealthStatus();
    return detailedHealth.database;
  }

  /**
   * Obtém informações de memória do sistema
   */
  async getMemoryInfo(): Promise<{ used: number; total: number; percentage: number }> {
    const health = await this.getHealthStatus();
    return health.memory;
  }

  /**
   * Obtém tempo de atividade da API
   */
  async getUptime(): Promise<number> {
    const health = await this.getHealthStatus();
    return health.uptime;
  }

  /**
   * Verifica se a API está saudável (status ok + banco conectado)
   */
  async isHealthy(): Promise<boolean> {
    try {
      const [isOnline, isDbConnected] = await Promise.all([
        this.isApiOnline(),
        this.isDatabaseConnected()
      ]);
      return isOnline && isDbConnected;
    } catch {
      return false;
    }
  }
}

// ============================================================================
// Instância Singleton
// ============================================================================

export const healthService = new HealthService();
