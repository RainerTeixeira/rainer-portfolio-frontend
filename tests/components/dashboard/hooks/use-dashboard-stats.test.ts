/**
 * Testes para hook useDashboardStats
 */

import { useDashboardStats } from '@/components/dashboard/hooks/use-dashboard-stats';
import { renderHook } from '@testing-library/react';

// Mock do API
jest.mock('@/lib/api', () => ({
  postsService: {
    listPosts: jest.fn(() => Promise.resolve({ posts: [] })),
  },
}));

describe('useDashboardStats', () => {
  it('deve retornar estado inicial', () => {
    const { result } = renderHook(() => useDashboardStats());
    expect(result.current).toHaveProperty('stats');
    expect(result.current).toHaveProperty('isLoading');
    expect(typeof result.current.isLoading).toBe('boolean');
  });
});
