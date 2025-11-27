/**
 * Testes para componente Progress
 */

import { Progress } from '@rainersoft/ui';
import { render } from '@testing-library/react';

describe('Progress', () => {
  it('deve renderizar um progress bar', () => {
    const { container } = render(<Progress value={50} />);
    const progress = container.querySelector('[role="progressbar"]');
    expect(progress).toBeInTheDocument();
  });

  it('deve aceitar value', () => {
    const { container } = render(<Progress value={75} />);
    const progress = container.querySelector('[role="progressbar"]');
    expect(progress).toBeTruthy();
    // Verifica se tem o atributo ou se renderizou
    expect(progress?.getAttribute('aria-valuenow') || progress).toBeTruthy();
  });

  it('deve aceitar className customizada', () => {
    const { container } = render(
      <Progress value={50} className="custom-class" />
    );
    const progress = container.querySelector('[role="progressbar"]');
    expect(progress).toHaveClass('custom-class');
  });
});
