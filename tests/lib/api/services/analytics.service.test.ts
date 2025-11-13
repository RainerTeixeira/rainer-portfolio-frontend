/**
 * Testes para analyticsService
 *
 * Nota: analyticsService não existe como serviço separado.
 * Analytics são gerenciados pelo dashboardService.getAnalytics()
 * ou pelo módulo de monitoring/analytics.
 */

import { dashboardService } from '@/lib/api';
import { analytics } from '@/lib/monitoring/analytics';

// Mock do api client
jest.mock('@/lib/api/client', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('Analytics', () => {
  it('dashboardService deve ter método getAnalytics', () => {
    expect(typeof dashboardService.getAnalytics).toBe('function');
  });

  it('analytics do monitoring deve ter método track', () => {
    expect(typeof analytics.track).toBe('function');
  });
});
