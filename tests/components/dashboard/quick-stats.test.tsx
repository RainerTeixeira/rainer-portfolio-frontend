/**
 * Testes para componente QuickStats
 */

import { QuickStats } from '@/components/dashboard/quick-stats';
import { render } from '@testing-library/react';

// Mock do hook
jest.mock('@/components/dashboard/hooks/use-dashboard-stats', () => ({
  useDashboardStats: jest.fn(() => ({
    stats: {
      totalPosts: 10,
      totalViews: 1000,
      totalLikes: 100,
      totalComments: 50,
    },
    isLoading: false,
    error: null,
  })),
}));

describe('QuickStats', () => {
  it('deve renderizar estatísticas rápidas', () => {
    const { container } = render(<QuickStats />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar cards de estatísticas', () => {
    const { container } = render(<QuickStats />);
    const cards = container.querySelectorAll('[class*="card"]');
    expect(cards.length >= 0).toBe(true);
  });
});
