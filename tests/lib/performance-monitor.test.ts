/**
 * Testes para lib/performance-monitor.ts
 */

import {
  measurePerformance,
  reportWebVitals,
  startPerformanceMonitoring,
} from '@/lib/monitoring/performance';

describe('performance-monitor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('measurePerformance', () => {
    it('deve medir performance de uma função', async () => {
      const fn = jest.fn(() => Promise.resolve('result'));
      const result = await measurePerformance('test', fn);

      expect(result).toBe('result');
      expect(fn).toHaveBeenCalled();
    });
  });

  describe('startPerformanceMonitoring', () => {
    it('deve iniciar monitoramento de performance', () => {
      expect(() => startPerformanceMonitoring()).not.toThrow();
    });
  });

  describe('reportWebVitals', () => {
    it('deve reportar web vitals', () => {
      const mockMetric = {
        name: 'CLS',
        value: 0.1,
        delta: 0.1,
        id: 'test-id',
      };

      expect(() => reportWebVitals(mockMetric)).not.toThrow();
    });
  });
});
