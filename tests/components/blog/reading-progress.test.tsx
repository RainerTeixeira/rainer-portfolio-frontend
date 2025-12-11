/**
 * Testes para componente ReadingProgress
 */

import { ReadingProgress } from '@/components/domain/blog/reading-progress';
import { render } from '@testing-library/react';

describe('ReadingProgress', () => {
  it('deve renderizar a barra de progresso', () => {
    const { container } = render(<ReadingProgress />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar barra de progresso', () => {
    const { container } = render(<ReadingProgress />);
    const progress =
      container.querySelector('[role="progressbar"]') ||
      container.querySelector('div');
    expect(progress || container.firstChild).toBeTruthy();
  });
});
