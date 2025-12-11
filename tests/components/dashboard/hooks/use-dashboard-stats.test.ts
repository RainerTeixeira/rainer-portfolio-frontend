/**
 * Testes para hook useDashboardStats
 */

import { useDashboardStats } from '@/components/domain/dashboard/hooks/use-dashboard-stats';
import { renderHook } from '@testing-library/react';

// Mock do dashboardService
jest.mock('@/lib/api/services/dashboard.service', () => ({
  dashboardService: {
    getStats: jest.fn(() =>
      Promise.resolve({
        totalPosts: 0,
        totalViews: 0,
        totalLikes: 0,
        totalComments: 0,
        postsChange: 0,
        viewsChange: 0,
        likesChange: 0,
        commentsChange: 0,
      })
    ),
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
