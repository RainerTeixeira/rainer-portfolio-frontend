/**
 * Testes para componente StatsShowcase
 */

import { StatsShowcase } from '@/components/domain/home/stats-showcase';
import { render } from '@testing-library/react';

describe('StatsShowcase', () => {
  it('deve renderizar o componente', () => {
    const { container } = render(<StatsShowcase />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar seção de estatísticas', () => {
    const { container } = render(<StatsShowcase />);
    const section = container.querySelector('section');
    expect(section).toBeTruthy();
  });
});
