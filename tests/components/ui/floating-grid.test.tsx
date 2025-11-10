/**
 * Testes para componente FloatingGrid
 */

import { FloatingGrid } from '@/components/ui/floating-grid';
import { render } from '@testing-library/react';

describe('FloatingGrid', () => {
  it('deve renderizar o componente', () => {
    const { container } = render(<FloatingGrid />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar grid flutuante', () => {
    const { container } = render(<FloatingGrid />);
    const grid = container.querySelector('div');
    expect(grid).toBeTruthy();
  });
});
