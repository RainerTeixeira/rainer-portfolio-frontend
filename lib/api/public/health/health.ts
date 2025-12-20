/**
 * @fileoverview Serviços Públicos de Health
 * 
 * Contém funções para comunicação com endpoints públicos de health check.
 * Não requer autenticação.
 * 
 * @module lib/api/public/health/health
 */

import { publicClient } from '../../clients/public-client';

/**
 * Interface para resposta de health check básico
 */
export interface HealthResponse {
  /** Status da API */
  status: 'healthy' | 'unhealthy';
  /** Timestamp da verificação */
  timestamp: string;
  /** Versão da API */
  version?: string;
}

/**
 * Interface para resposta de health check detalhado
 */
export interface DetailedHealthResponse extends HealthResponse {
  /** Uptime em segundos */
  uptime: number;
  /** Informações do banco de dados */
  database: {
    status: 'connected' | 'disconnected';
    provider: string;
  };
  /** Informações de memória */
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
}

/**
 * Realiza health check básico da API
 * 
 * @returns Promise<HealthResponse> - Status básico da API
 * 
 * @example
 * ```typescript
 * const health = await getBasicHealth();
 * if (health.status === 'healthy') {
 *   console.log('API está funcionando!');
 * }
 * ```
 */
export const getBasicHealth = async (): Promise<HealthResponse> => {
  const response = await publicClient.get('/health');
  return response.data;
};

/**
 * Realiza health check detalhado da API
 * 
 * @returns Promise<DetailedHealthResponse> - Status detalhado da API
 * 
 * @example
 * ```typescript
 * const health = await getDetailedHealth();
 * console.log(`Uptime: ${health.uptime} segundos`);
 * console.log(`Memória: ${health.memory.percentage}% utilizada`);
 * ```
 */
export const getDetailedHealth = async (): Promise<DetailedHealthResponse> => {
  const response = await publicClient.get('/health/detailed');
  return response.data;
};
