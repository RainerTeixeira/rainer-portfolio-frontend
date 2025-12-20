/**
 * @fileoverview Tipos para APIs Públicas de Health
 * 
 * Define os tipos TypeScript utilizados para comunicação com os endpoints
 * públicos de health check.
 * 
 * @module lib/api/types/public/health
 */

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
