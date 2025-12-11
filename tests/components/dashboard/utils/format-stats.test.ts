/**
 * Testes para format-stats
 */

import {
  calculateChange,
  formatNumber,
  formatPercentage,
  generateMockChartData,
  groupDataByPeriod,
} from '@/components/domain/dashboard/utils/format-stats';

describe('format-stats', () => {
  describe('formatNumber', () => {
    it('deve formatar números grandes com M', () => {
      expect(formatNumber(1500000)).toContain('M');
    });

    it('deve formatar números médios com k', () => {
      expect(formatNumber(1500)).toContain('k');
    });

    it('deve retornar número como string para valores pequenos', () => {
      expect(formatNumber(100)).toBe('100');
    });
  });

  describe('calculateChange', () => {
    it('deve calcular mudança percentual', () => {
      expect(calculateChange(110, 100)).toBe(10);
      expect(calculateChange(90, 100)).toBe(-10);
    });

    it('deve retornar 100 quando previous é 0', () => {
      expect(calculateChange(100, 0)).toBe(100);
    });
  });

  describe('formatPercentage', () => {
    it('deve formatar percentual positivo com +', () => {
      expect(formatPercentage(10)).toContain('+');
    });

    it('deve formatar percentual negativo sem +', () => {
      expect(formatPercentage(-10)).not.toContain('+');
    });
  });

  describe('generateMockChartData', () => {
    it('deve gerar dados de gráfico', () => {
      const data = generateMockChartData(7);
      expect(data.length).toBe(7);
      expect(data[0]).toHaveProperty('date');
      expect(data[0]).toHaveProperty('views');
    });
  });

  describe('groupDataByPeriod', () => {
    it('deve agrupar dados por período', () => {
      const data = [{ date: '01/01', views: 100 }];
      const grouped = groupDataByPeriod(data);
      expect(grouped).toBeDefined();
    });
  });
});
