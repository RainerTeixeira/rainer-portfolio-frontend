/**
 * Testes para componente PortfolioShowcase
 */

import { PortfolioShowcase } from '@/components/home/portfolio-showcase';
import { render } from '@testing-library/react';

describe('PortfolioShowcase', () => {
  it('deve renderizar o componente', () => {
    const { container } = render(<PortfolioShowcase />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar seção de portfolio', () => {
    const { container } = render(<PortfolioShowcase />);
    const section = container.querySelector('section');
    expect(section).toBeTruthy();
  });
});
