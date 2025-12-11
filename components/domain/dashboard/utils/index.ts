/**
 * Utils do Dashboard (Portfolio-specific)
 * 
 * Apenas utilitários específicos do domínio do dashboard.
 * Utils genéricos foram migrados para @rainersoft/utils.
 */

// Utils genéricos migrados - re-exportar da biblioteca
export {
  formatNumber,
  formatNumber as formatLargeNumber,
  calculateChange,
  formatPercentage,
  generateMockChartData,
  groupDataByPeriod,
  calculateMovingAverage,
  findMinMax
} from '@rainersoft/utils';

// Utils específicos do dashboard (se houver)
// export { dashboardSpecificUtil } from './dashboard-specific-util';
