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
  HealthCheckResponse,
} from '../types';

// ============================================================================
// Classe do Serviço
// ============================================================================

/**
 * Serviço responsável por verificações de saúde e status da API.
 */
export class HealthService {
  private readonly basePath = '/health';

  /**
   * Verifica status básico da API
   */
  /**
   * Retorna status básico da API.
   */
  async getHealthStatus(): Promise<HealthCheckResponse> {
    const response = await api.get<ApiResponse<HealthCheckResponse>>(
      this.basePath
    );

    if ('data' in response) {
      return response.data;
    } else {
      throw new Error(
        `Erro ao obter status da API: ${'error' in response ? response.error : 'Resposta inesperada'}`
      );
    }
  }

  /**
   * Verifica status detalhado da API
   */
  /**
   * Retorna status detalhado (inclui database, memória etc.).
   */
  async getDetailedHealthStatus(): Promise<DetailedHealthCheckResponse> {
    const response = await api.get<ApiResponse<DetailedHealthCheckResponse>>(
      `${this.basePath}/detailed`
    );

    if ('data' in response) {
      return response.data;
    } else {
      throw new Error(
        `Erro ao obter status detalhado da API: ${'error' in response ? response.error : 'Resposta inesperada'}`
      );
    }
  }

  /**
   * Indica se a API está online.
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
  /**
   * Indica se o banco está conectado.
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
  /**
   * Obtém informações do banco de dados.
   */
  async getDatabaseInfo(): Promise<{
    provider: string;
    status: string;
    description: string;
    endpoint?: string;
  }> {
    const detailedHealth = await this.getDetailedHealthStatus();
    return detailedHealth.database;
  }

  /**
   * Obtém informações de memória do sistema
   */
  /**
   * Obtém informações de memória.
   */
  async getMemoryInfo(): Promise<{
    used: number;
    total: number;
    percentage: number;
  }> {
    const health = await this.getHealthStatus();
    return health.memory;
  }

  /**
   * Obtém tempo de atividade da API
   */
  /**
   * Obtém tempo de atividade da API (segundos).
   */
  async getUptime(): Promise<number> {
    const health = await this.getHealthStatus();
    return health.uptime;
  }

  /**
   * Verifica se a API está saudável (status ok + banco conectado)
   */
  /**
   * Indica se a API está saudável (online + DB conectado).
   */
  async isHealthy(): Promise<boolean> {
    try {
      const [isOnline, isDbConnected] = await Promise.all([
        this.isApiOnline(),
        this.isDatabaseConnected(),
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
