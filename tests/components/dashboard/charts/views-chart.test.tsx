/**
 * Testes para componente ViewsChart
 */

import { ViewsChart } from '@/components/domain/dashboard/charts/views-chart';
import { render } from '@testing-library/react';

const mockData = [
  { date: '2023-01-01', views: 100, uniqueViews: 80 },
  { date: '2023-01-02', views: 150, uniqueViews: 120 },
];

describe('ViewsChart', () => {
  it('deve renderizar o gráfico de views', () => {
    const { container } = render(<ViewsChart data={mockData} />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar com dados vazios', () => {
    const { container } = render(<ViewsChart data={[]} />);
    expect(container).toBeTruthy();
  });
});
