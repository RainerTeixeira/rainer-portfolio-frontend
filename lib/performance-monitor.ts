/**
 * Performance Monitoring System
 *
 * Sistema de monitoramento de performance da aplicação.
 * Rastreia Core Web Vitals e métricas customizadas.
 *
 * Características:
 * - Core Web Vitals (LCP, FID, CLS)
 * - Timing de página
 * - Métricas customizadas
 * - Alertas de performance
 * - Integração com Web Vitals API
 *
 * @fileoverview Performance monitoring system
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// ============================================================================
// Imports
// ============================================================================

import { analytics } from './analytics';
import { logger } from './logger';

// ============================================================================
// Types
// ============================================================================

/**
 * Métrica de performance
 */
interface PerformanceMetric {
  readonly fullName: string;
  readonly value: number;
  readonly rating: 'good' | 'needs-improvement' | 'poor';
  readonly timestamp: number;
}

/**
 * Core Web Vital - compatível com web-vitals v3+
 */
interface WebVitalMetric {
  readonly id: string;
  readonly name: 'CLS' | 'FCP' | 'FID' | 'INP' | 'LCP' | 'TTFB';
  readonly value: number;
  readonly rating: 'good' | 'needs-improvement' | 'poor';
  readonly delta: number;
  readonly entries: PerformanceEntry[];
}

// ============================================================================
// Constants
// ============================================================================

/**
 * Thresholds para Core Web Vitals
 */
const WEB_VITAL_THRESHOLDS: Record<string, { good: number; poor: number }> = {
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
  FID: { good: 100, poor: 300 }, // First Input Delay (deprecated, usar INP)
  INP: { good: 200, poor: 500 }, // Interaction to Next Paint
  CLS: { good: 0.1, poor: 0.25 }, // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
  TTFB: { good: 800, poor: 1800 }, // Time to First Byte
};

/**
 * Thresholds para métricas customizadas
 */
const CUSTOM_THRESHOLDS = {
  API_RESPONSE: { good: 500, poor: 2000 },
  COMPONENT_RENDER: { good: 100, poor: 500 },
  DATA_FETCH: { good: 1000, poor: 3000 },
} as const;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Determina rating baseado em thresholds
 */
function getRating(
  value: number,
  thresholds: { good: number; poor: number }
): 'good' | 'needs-improvement' | 'poor' {
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Formata valor de métrica
 */
function formatMetricValue(value: number, unit: 'ms' | 'score' = 'ms'): string {
  if (unit === 'score') {
    return value.toFixed(3);
  }
  return `${Math.round(value)}ms`;
}

// ============================================================================
// Performance Monitor Class
// ============================================================================

/**
 * Monitor de performance
 *
 * Classe para rastreamento de métricas de performance.
 */
class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetric>;

  constructor() {
    this.metrics = new Map();
    this.initWebVitals();
  }

  // ============================================================================
  // Web Vitals
  // ============================================================================

  /**
   * Inicializa rastreamento de Core Web Vitals
   */
  private initWebVitals(): void {
    if (typeof window === 'undefined') return;

    // Usar Web Vitals library se disponível
    this.measureWebVitals();
  }

  /**
   * Mede Core Web Vitals
   */
  private async measureWebVitals(): Promise<void> {
    try {
      // Dynamic import para code splitting
      const { onCLS, onFCP, onINP, onLCP, onTTFB } = await import('web-vitals');

      // Callback para cada métrica
      const reportWebVital = (metric: WebVitalMetric) => {
        const rating = this.getRatingForWebVital(metric.name, metric.value);

        logger.info(`Core Web Vital: ${metric.name}`, {
          value: metric.value,
          rating,
          id: metric.id,
        });

        // Enviar para analytics
        analytics.track({
          category: 'performance',
          action: `web_vital_${metric.name.toLowerCase()}`,
          label: rating,
          value: Math.round(metric.value),
          properties: {
            id: metric.id,
            rating,
          },
        });
      };

      // Registrar listeners
      onCLS(reportWebVital);
      onFCP(reportWebVital);
      onINP(reportWebVital);
      onLCP(reportWebVital);
      onTTFB(reportWebVital);
    } catch (error) {
      logger.warn('Web Vitals não disponível', { error });
    }
  }

  /**
   * Determina rating para Core Web Vital
   */
  private getRatingForWebVital(
    name: string,
    value: number
  ): 'good' | 'needs-improvement' | 'poor' {
    const threshold = WEB_VITAL_THRESHOLDS[name];
    if (!threshold) return 'good';
    return getRating(value, threshold);
  }

  // ============================================================================
  // Custom Metrics
  // ============================================================================

  /**
   * Marca início de medição
   *
   * @param fullName - Nome da métrica
   *
   * @example
   * ```tsx
   * performanceMonitor.start('api_fetch_posts')
   * // ... código
   * performanceMonitor.end('api_fetch_posts')
   * ```
   */
  start(fullName: string): void {
    if (typeof window === 'undefined') return;

    try {
      performance.mark(`${fullName}_start`);
    } catch (error) {
      logger.debug('Erro ao marcar início de performance', { fullName, error });
    }
  }

  /**
   * Marca fim de medição e calcula duração
   *
   * @param fullName - Nome da métrica
   * @returns Duração em ms ou null
   */
  end(fullName: string): number | null {
    if (typeof window === 'undefined') return null;

    try {
      const startMark = `${fullName}_start`;
      const endMark = `${fullName}_end`;
      const measureName = `${fullName}_duration`;

      performance.mark(endMark);
      performance.measure(measureName, startMark, endMark);

      const measure = performance.getEntriesByName(measureName)[0];
      const duration = measure ? measure.duration : 0;

      // Determina rating baseado no tipo de métrica
      const rating = this.getRatingForCustomMetric(fullName, duration);

      // Armazena métrica
      const metric: PerformanceMetric = {
        fullName,
        value: duration,
        rating,
        timestamp: Date.now(),
      };

      this.metrics.set(fullName, metric);

      // Log
      logger.debug(`Performance: ${fullName}`, {
        duration: formatMetricValue(duration),
        rating,
      });

      // Limpar marks
      performance.clearMarks(startMark);
      performance.clearMarks(endMark);
      performance.clearMeasures(measureName);

      return duration;
    } catch (error) {
      logger.debug('Erro ao medir performance', { fullName, error });
      return null;
    }
  }

  /**
   * Determina rating para métrica customizada
   */
  private getRatingForCustomMetric(
    fullName: string,
    value: number
  ): 'good' | 'needs-improvement' | 'poor' {
    // Tentar identificar tipo de métrica pelo nome
    if (fullName.includes('api') || fullName.includes('fetch')) {
      return getRating(value, CUSTOM_THRESHOLDS.API_RESPONSE);
    }
    if (fullName.includes('render') || fullName.includes('component')) {
      return getRating(value, CUSTOM_THRESHOLDS.COMPONENT_RENDER);
    }
    return getRating(value, CUSTOM_THRESHOLDS.DATA_FETCH);
  }

  /**
   * Obtém métrica específica
   *
   * @param fullName - Nome da métrica
   * @returns Métrica ou undefined
   */
  getMetric(fullName: string): PerformanceMetric | undefined {
    return this.metrics.get(fullName);
  }

  /**
   * Obtém todas as métricas
   *
   * @returns Array de métricas
   */
  getAllMetrics(): PerformanceMetric[] {
    return Array.from(this.metrics.values());
  }

  /**
   * Limpa todas as métricas
   */
  clearMetrics(): void {
    this.metrics.clear();

    if (typeof window !== 'undefined') {
      performance.clearMarks();
      performance.clearMeasures();
    }
  }

  /**
   * Mede tempo de execução de função
   *
   * @param fullName - Nome da métrica
   * @param fn - Função a medir
   * @returns Resultado da função
   *
   * @example
   * ```tsx
   * const data = await performanceMonitor.measure('fetch_data', async () => {
   *   return await fetchData()
   * })
   * ```
   */
  async measure<T>(fullName: string, fn: () => T | Promise<T>): Promise<T> {
    this.start(fullName);

    try {
      const result = await fn();
      this.end(fullName);
      return result;
    } catch (error) {
      this.end(fullName);
      throw error;
    }
  }

  /**
   * Reporta métricas de navegação
   */
  reportNavigationTiming(): void {
    if (typeof window === 'undefined') return;

    try {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;

      if (!navigation) return;

      const metrics = {
        dns: navigation.domainLookupEnd - navigation.domainLookupStart,
        tcp: navigation.connectEnd - navigation.connectStart,
        ttfb: navigation.responseStart - navigation.requestStart,
        download: navigation.responseEnd - navigation.responseStart,
        domInteractive: navigation.domInteractive - navigation.fetchStart,
        domComplete: navigation.domComplete - navigation.fetchStart,
        loadComplete: navigation.loadEventEnd - navigation.fetchStart,
      };

      logger.info('Navigation Timing', metrics);
    } catch (error) {
      logger.debug('Erro ao obter navigation timing', { error });
    }
  }
}

// ============================================================================
// Export
// ============================================================================

/**
 * Instância singleton do performance monitor
 *
 * @example
 * ```tsx
 * import { performanceMonitor } from '@/lib/performance-monitor'
 *
 * // Medir operação
 * performanceMonitor.start('load_posts')
 * await loadPosts()
 * performanceMonitor.end('load_posts')
 *
 * // Ou usar helper
 * await performanceMonitor.measure('load_posts', async () => {
 *   return await loadPosts()
 * })
 * ```
 */
export const performanceMonitor = new PerformanceMonitor();

/**
 * Export da classe
 */
export { PerformanceMonitor };
