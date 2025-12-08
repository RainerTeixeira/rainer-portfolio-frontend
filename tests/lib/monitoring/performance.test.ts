/**
 * Testes para lib/monitoring/performance.ts
 */

import { performanceMonitor } from '@/lib/tracking/performance';

describe('lib/monitoring/performance', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    performanceMonitor.clearMetrics();
  });

  describe('performanceMonitor.measure', () => {
    it('deve medir performance de uma função', async () => {
      const fn = jest.fn(() => Promise.resolve('result'));
      const result = await performanceMonitor.measure('test', fn);

      expect(result).toBe('result');
      expect(fn).toHaveBeenCalled();
    });
  });

  describe('performanceMonitor.start/end', () => {
    it('deve iniciar e finalizar medição de performance', () => {
      expect(() => {
        performanceMonitor.start('test-metric');
        const duration = performanceMonitor.end('test-metric');
        expect(typeof duration).toBe('number');
      }).not.toThrow();
    });
  });

  describe('performanceMonitor.reportNavigationTiming', () => {
    it('deve reportar navigation timing', () => {
      expect(() => performanceMonitor.reportNavigationTiming()).not.toThrow();
    });
  });
});
