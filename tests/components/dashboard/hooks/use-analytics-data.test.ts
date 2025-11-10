/**
 * Testes para hook useAnalyticsData
 */

import { useAnalyticsData } from '@/components/dashboard/hooks/use-analytics-data';
import { renderHook } from '@testing-library/react';

// Mock do API
jest.mock('@/lib/api', () => ({
  api: {
    get: jest.fn(() => Promise.resolve({ success: true, data: {} })),
  },
}));

describe('useAnalyticsData', () => {
  it('deve retornar estado inicial', () => {
    const { result } = renderHook(() => useAnalyticsData());
    expect(result.current).toHaveProperty('data');
    expect(result.current).toHaveProperty('isLoading');
    expect(typeof result.current.isLoading).toBe('boolean');
  });
});
