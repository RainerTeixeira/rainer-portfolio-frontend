/**
 * Testes mínimos para analytics via privateDashboard (sem legado)
 */
import { privateDashboard } from '@/lib/api';

jest.mock('@/lib/api/clients/private-client', () => ({
  privateClient: {
    get: jest.fn(),
  },
}));

describe('analytics via privateDashboard', () => {
  it('deve ter método getDashboardAnalytics', () => {
    expect(typeof privateDashboard.getDashboardAnalytics).toBe('function');
  });
});
