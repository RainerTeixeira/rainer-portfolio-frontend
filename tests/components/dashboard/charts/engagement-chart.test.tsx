/**
 * Testes para componente EngagementChart
 */

import { EngagementChart } from '@/components/domain/dashboard/charts/engagement-chart';
import { render } from '@testing-library/react';

const mockData = [
  { date: '2025-12-16', likes: 50, comments: 20 },
  { date: '2023-01-02', likes: 75, comments: 30 },
];

describe('EngagementChart', () => {
  it('deve renderizar o gráfico de engajamento', () => {
    const { container } = render(<EngagementChart data={mockData} />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar com dados vazios', () => {
    const { container } = render(<EngagementChart data={[]} />);
    expect(container).toBeTruthy();
  });
});
