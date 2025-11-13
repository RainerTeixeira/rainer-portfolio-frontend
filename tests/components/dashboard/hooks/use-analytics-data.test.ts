/**
 * Testes para hook useAnalyticsData
 */

import { useAnalyticsData } from '@/components/dashboard/hooks/use-analytics-data';
import { renderHook, waitFor } from '@testing-library/react';

// Mock do dashboardService
jest.mock('@/lib/api/services/dashboard.service', () => ({
  dashboardService: {
    getAnalytics: jest.fn(() =>
      Promise.resolve({
        views: [],
        engagement: [],
      })
    ),
  },
}));

describe('useAnalyticsData', () => {
  it('deve retornar estado inicial', async () => {
    const { result } = renderHook(() => useAnalyticsData());
    expect(result.current).toHaveProperty('viewsData');
    expect(result.current).toHaveProperty('engagementData');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('error');
    expect(typeof result.current.isLoading).toBe('boolean');

    // Aguarda o hook finalizar o carregamento
    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );
  });
});
