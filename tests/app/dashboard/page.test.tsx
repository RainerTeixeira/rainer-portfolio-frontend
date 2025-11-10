/**
 * Testes para página Dashboard
 */

import DashboardPage from '@/app/dashboard/page';
import { render, screen } from '@testing-library/react';

// Mock dos componentes
jest.mock('@/components/dashboard', () => ({
  DashboardStats: () => <div data-testid="dashboard-stats">Stats</div>,
  RecentPosts: () => <div data-testid="recent-posts">Posts</div>,
}));

jest.mock('@/components/ui', () => ({
  BackToTop: () => <div data-testid="back-to-top">Back to Top</div>,
}));

describe('Dashboard Page', () => {
  it('deve renderizar a página de dashboard', async () => {
    render(await DashboardPage());
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('deve exibir estatísticas do dashboard', async () => {
    render(await DashboardPage());
    expect(screen.getByTestId('dashboard-stats')).toBeInTheDocument();
  });
});
