/**
 * Testes para componente StatsCards
 */

import { StatsCards } from '@/components/domain/dashboard/stats-cards';
import { render } from '@testing-library/react';

const mockStats = {
  totalPosts: 10,
  totalViews: 1000,
  totalLikes: 500,
  totalComments: 200,
};

describe('StatsCards', () => {
  it('deve renderizar cards de estatísticas', () => {
    const { container } = render(<StatsCards stats={mockStats} />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar múltiplos cards', () => {
    const { container } = render(<StatsCards stats={mockStats} />);
    const cards =
      container.querySelectorAll('[class*="card"]') ||
      container.querySelectorAll('div');
    expect(cards.length).toBeGreaterThan(0);
  });
});
