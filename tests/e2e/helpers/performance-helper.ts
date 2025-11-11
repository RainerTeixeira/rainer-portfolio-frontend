/**
 * Helper para testes de performance
 *
 * Fornece funções utilitárias para coletar e analisar métricas de performance
 *
 * @see docs/09-TESTES/README.md
 */

import { Page } from '@playwright/test';

/**
 * Métricas de performance coletadas
 */
export interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  timeToInteractive: number;
  totalBlockingTime: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  timeToFirstByte: number;
  networkRequests: number;
  totalSize: number;
}

/**
 * Web Vitals coletados
 */
export interface WebVitals {
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  fcp: number | null; // First Contentful Paint
  ttfb: number | null; // Time to First Byte
}

/**
 * Coleta métricas de performance da página
 *
 * @param page - Instância do Playwright Page
 * @returns Métricas de performance coletadas
 */
export async function collectPerformanceMetrics(
  page: Page
): Promise<PerformanceMetrics> {
  // Aguardar carregamento completo
  await page
    .waitForLoadState('networkidle', { timeout: 30000 })
    .catch(() => {});

  // Coletar métricas via Performance API
  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    const resources = performance.getEntriesByType(
      'resource'
    ) as PerformanceResourceTiming[];

    // Calcular tamanho total
    const totalSize = resources.reduce(
      (sum, r) => sum + (r.transferSize || 0),
      0
    );

    return {
      loadTime: navigation.loadEventEnd - navigation.fetchStart,
      domContentLoaded:
        navigation.domContentLoadedEventEnd - navigation.fetchStart,
      firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
      firstContentfulPaint:
        paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
      networkRequests: resources.length,
      totalSize,
    };
  });

  // Coletar Web Vitals via PerformanceObserver
  const webVitals = await collectWebVitals(page);

  return {
    ...metrics,
    largestContentfulPaint: webVitals.lcp || 0,
    firstInputDelay: webVitals.fid || 0,
    cumulativeLayoutShift: webVitals.cls || 0,
    timeToFirstByte: webVitals.ttfb || 0,
    timeToInteractive: metrics.domContentLoaded + 1000, // Aproximação
    totalBlockingTime: 0, // Seria calculado via Long Tasks API
  };
}

/**
 * Coleta Web Vitals da página
 *
 * @param page - Instância do Playwright Page
 * @returns Web Vitals coletados
 */
export async function collectWebVitals(page: Page): Promise<WebVitals> {
  return await page.evaluate(() => {
    return new Promise<WebVitals>(resolve => {
      const vitals: WebVitals = {
        lcp: null,
        fid: null,
        cls: null,
        fcp: null,
        ttfb: null,
      };

      try {
        // LCP (Largest Contentful Paint)
        const lcpEntries: any[] = [];
        const lcpObserver = new PerformanceObserver(list => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            lcpEntries.push(entry);
          });
          if (entries.length > 0) {
            const lastEntry = entries[entries.length - 1];
            vitals.lcp = lastEntry.renderTime || lastEntry.loadTime;
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // FID (First Input Delay)
        const fidObserver = new PerformanceObserver(list => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (entry.processingStart && entry.startTime) {
              vitals.fid = entry.processingStart - entry.startTime;
            }
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // CLS (Cumulative Layout Shift)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver(list => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          vitals.cls = clsValue;
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // TTFB (Time to First Byte)
        const navigation = performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming;
        if (navigation) {
          vitals.ttfb = navigation.responseStart - navigation.requestStart;
        }

        // FCP já coletado via paint entries
        const paint = performance.getEntriesByType('paint');
        const fcp = paint.find(p => p.name === 'first-contentful-paint');
        if (fcp) {
          vitals.fcp = fcp.startTime;
        }
      } catch (e) {
        // Web Vitals podem não estar disponíveis em todos os navegadores
        console.warn('Web Vitals não disponíveis:', e);
      }

      // Aguardar um pouco para coletar métricas
      setTimeout(() => {
        // Limpar observers
        try {
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
        } catch (e) {
          // Ignorar erros ao desconectar
        }
        resolve(vitals);
      }, 2000);
    });
  });
}

/**
 * Valida métricas de Core Web Vitals
 *
 * @param metrics - Métricas de performance
 * @returns Objeto com validações
 */
export function validateCoreWebVitals(metrics: PerformanceMetrics): {
  lcp: { passed: boolean; value: number; threshold: number };
  fid: { passed: boolean; value: number; threshold: number };
  cls: { passed: boolean; value: number; threshold: number };
  fcp: { passed: boolean; value: number; threshold: number };
  ttfb: { passed: boolean; value: number; threshold: number };
} {
  return {
    lcp: {
      passed: metrics.largestContentfulPaint < 2500,
      value: metrics.largestContentfulPaint,
      threshold: 2500,
    },
    fid: {
      passed: metrics.firstInputDelay < 100,
      value: metrics.firstInputDelay,
      threshold: 100,
    },
    cls: {
      passed: metrics.cumulativeLayoutShift < 0.1,
      value: metrics.cumulativeLayoutShift,
      threshold: 0.1,
    },
    fcp: {
      passed: metrics.firstContentfulPaint < 1800,
      value: metrics.firstContentfulPaint,
      threshold: 1800,
    },
    ttfb: {
      passed: metrics.timeToFirstByte < 600,
      value: metrics.timeToFirstByte,
      threshold: 600,
    },
  };
}

/**
 * Gera relatório de performance
 *
 * @param metrics - Métricas de performance
 * @returns Relatório formatado
 */
export function generatePerformanceReport(metrics: PerformanceMetrics): string {
  const validation = validateCoreWebVitals(metrics);
  const report = [
    '=== Relatório de Performance ===',
    '',
    'Core Web Vitals:',
    `  LCP: ${metrics.largestContentfulPaint.toFixed(2)}ms (${validation.lcp.passed ? '✅' : '❌'} < ${validation.lcp.threshold}ms)`,
    `  FID: ${metrics.firstInputDelay.toFixed(2)}ms (${validation.fid.passed ? '✅' : '❌'} < ${validation.fid.threshold}ms)`,
    `  CLS: ${metrics.cumulativeLayoutShift.toFixed(4)} (${validation.cls.passed ? '✅' : '❌'} < ${validation.cls.threshold})`,
    `  FCP: ${metrics.firstContentfulPaint.toFixed(2)}ms (${validation.fcp.passed ? '✅' : '❌'} < ${validation.fcp.threshold}ms)`,
    `  TTFB: ${metrics.timeToFirstByte.toFixed(2)}ms (${validation.ttfb.passed ? '✅' : '❌'} < ${validation.ttfb.threshold}ms)`,
    '',
    'Métricas Gerais:',
    `  Load Time: ${metrics.loadTime.toFixed(2)}ms`,
    `  DOM Content Loaded: ${metrics.domContentLoaded.toFixed(2)}ms`,
    `  Time to Interactive: ${metrics.timeToInteractive.toFixed(2)}ms`,
    `  Network Requests: ${metrics.networkRequests}`,
    `  Total Size: ${(metrics.totalSize / 1024 / 1024).toFixed(2)}MB`,
    '',
  ];

  return report.join('\n');
}
