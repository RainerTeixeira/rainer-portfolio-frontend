/**
 * Health Check Types
 *
 * Tipos relacionados ao monitoramento e health checks da API.
 *
 * @module lib/api/types/health
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// ============================================================================
// Health Status Types
// ============================================================================

/**
 * Status de saúde geral
 */
export type HealthStatus = 'ok' | 'error' | 'degraded' | 'maintenance';

/**
 * Status de conexão
 */
export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting' | 'error';

/**
 * Resposta básica de health check
 */
export interface HealthCheckResponse {
  /** Status geral da API */
  readonly status: HealthStatus;
  /** Timestamp da verificação */
  readonly timestamp: string;
  /** Tempo de atividade em segundos */
  readonly uptime: number;
  /** Versão da API */
  readonly version: string;
  /** Informações de memória */
  readonly memory: MemoryInfo;
  /** Ambiente (development, production, etc) */
  readonly environment?: string;
}

/**
 * Resposta detalhada de health check
 */
export interface DetailedHealthCheckResponse extends HealthCheckResponse {
  /** Informações do banco de dados */
  readonly database: DatabaseInfo;
  /** Informações de serviços externos */
  readonly services?: ServicesInfo;
  /** Informações do sistema */
  readonly system?: SystemInfo;
  /** Métricas de performance */
  readonly metrics?: PerformanceMetrics;
}

// ============================================================================
// Memory Types
// ============================================================================

/**
 * Informações de memória
 */
export interface MemoryInfo {
  /** Memória usada em bytes */
  readonly used: number;
  /** Memória total em bytes */
  readonly total: number;
  /** Porcentagem de uso */
  readonly percentage: number;
  /** Memória livre em bytes */
  readonly free?: number;
  /** Heap usado em bytes */
  readonly heapUsed?: number;
  /** Heap total em bytes */
  readonly heapTotal?: number;
}

// ============================================================================
// Database Types
// ============================================================================

/**
 * Informações do banco de dados
 */
export interface DatabaseInfo {
  /** Provider do banco (PRISMA, DYNAMODB) */
  readonly provider: string;
  /** Status da conexão */
  readonly status: ConnectionStatus;
  /** Descrição do status */
  readonly description: string;
  /** Endpoint do banco */
  readonly endpoint?: string;
  /** Tempo de resposta em ms */
  readonly responseTime?: number;
  /** Número de conexões ativas */
  readonly activeConnections?: number;
  /** Pool size */
  readonly poolSize?: number;
}

// ============================================================================
// Services Types
// ============================================================================

/**
 * Status de um serviço externo
 */
export interface ServiceStatus {
  /** Nome do serviço */
  readonly name: string;
  /** Status do serviço */
  readonly status: HealthStatus;
  /** URL do serviço */
  readonly url?: string;
  /** Tempo de resposta em ms */
  readonly responseTime?: number;
  /** Última verificação */
  readonly lastCheck?: string;
  /** Mensagem de erro (se houver) */
  readonly error?: string;
}

/**
 * Informações de serviços externos
 */
export interface ServicesInfo {
  /** AWS Cognito */
  readonly cognito?: ServiceStatus;
  /** Cloudinary */
  readonly cloudinary?: ServiceStatus;
  /** Redis (se usado) */
  readonly redis?: ServiceStatus;
  /** Outros serviços */
  readonly [key: string]: ServiceStatus | undefined;
}

// ============================================================================
// System Types
// ============================================================================

/**
 * Informações do sistema
 */
export interface SystemInfo {
  /** Plataforma (linux, darwin, win32) */
  readonly platform: string;
  /** Arquitetura (x64, arm64) */
  readonly arch: string;
  /** Versão do Node.js */
  readonly nodeVersion: string;
  /** CPUs disponíveis */
  readonly cpus: number;
  /** Memória total do sistema */
  readonly totalMemory: number;
  /** Memória livre do sistema */
  readonly freeMemory: number;
  /** Load average (se disponível) */
  readonly loadAverage?: number[];
}

// ============================================================================
// Metrics Types
// ============================================================================

/**
 * Métricas de performance
 */
export interface PerformanceMetrics {
  /** Requisições por minuto */
  readonly requestsPerMinute?: number;
  /** Tempo médio de resposta em ms */
  readonly avgResponseTime?: number;
  /** Taxa de erro (0-1) */
  readonly errorRate?: number;
  /** Tempo de atividade em porcentagem */
  readonly uptimePercentage?: number;
  /** Cache hit rate (0-1) */
  readonly cacheHitRate?: number;
}

// ============================================================================
// Monitoring Types
// ============================================================================

/**
 * Tipo de alerta
 */
export enum AlertLevel {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

/**
 * Alerta de monitoramento
 */
export interface HealthAlert {
  /** Nível do alerta */
  readonly level: AlertLevel;
  /** Componente afetado */
  readonly component: string;
  /** Mensagem do alerta */
  readonly message: string;
  /** Timestamp do alerta */
  readonly timestamp: string;
  /** Detalhes adicionais */
  readonly details?: Record<string, unknown>;
}

/**
 * Histórico de health checks
 */
export interface HealthHistory {
  /** Data/hora da verificação */
  readonly timestamp: string;
  /** Status da verificação */
  readonly status: HealthStatus;
  /** Tempo de resposta em ms */
  readonly responseTime: number;
  /** Alertas gerados */
  readonly alerts?: HealthAlert[];
}

// ============================================================================
// Check Types
// ============================================================================

/**
 * Configuração de health check
 */
export interface HealthCheckConfig {
  /** Intervalo entre checks em ms */
  readonly interval?: number;
  /** Timeout para checks em ms */
  readonly timeout?: number;
  /** Número de falhas antes de marcar como unhealthy */
  readonly failureThreshold?: number;
  /** Habilitar checks detalhados */
  readonly detailed?: boolean;
}

/**
 * Resultado de uma verificação individual
 */
export interface CheckResult {
  /** Nome da verificação */
  readonly name: string;
  /** Se passou na verificação */
  readonly passed: boolean;
  /** Mensagem */
  readonly message: string;
  /** Duração em ms */
  readonly duration: number;
  /** Erro (se houver) */
  readonly error?: string;
}

