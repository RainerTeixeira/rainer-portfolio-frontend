/**
 * Testes para serviços privados de dashboard (sem legado)
 */
import { privateDashboard } from '@/lib/api';

jest.mock('@/lib/api/clients/private-client', () => ({
  privateClient: {
    get: jest.fn(),
  },
}));

describe('privateDashboard', () => {
  it('deve ter método getDashboardStats', () => {
    expect(typeof privateDashboard.getDashboardStats).toBe('function');
  });

  it('deve ter método getDashboardAnalytics', () => {
    expect(typeof privateDashboard.getDashboardAnalytics).toBe('function');
  });
});
