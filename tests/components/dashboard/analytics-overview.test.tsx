/**
 * Testes para componente AnalyticsOverview
 */

import { AnalyticsOverview } from '@/components/dashboard/analytics-overview';
import { render } from '@testing-library/react';

// Mock do hook
jest.mock('@/components/dashboard/hooks/use-analytics-data', () => ({
  useAnalyticsData: jest.fn(() => ({
    viewsData: [],
    engagementData: [],
    isLoading: false,
    error: null,
  })),
}));

describe('AnalyticsOverview', () => {
  it('deve renderizar overview de analytics', () => {
    const { container } = render(<AnalyticsOverview />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar seção de analytics', () => {
    const { container } = render(<AnalyticsOverview />);
    const section = container.querySelector('section') || container.firstChild;
    expect(section).toBeTruthy();
  });
});
