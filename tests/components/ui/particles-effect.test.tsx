/**
 * Testes para componente ParticlesEffect
 */

import { ParticlesEffect } from '@/components/ui';
import { render } from '@testing-library/react';

describe('ParticlesEffect', () => {
  it('deve renderizar o componente', () => {
    const { container } = render(<ParticlesEffect />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar canvas ou div de partículas', () => {
    const { container } = render(<ParticlesEffect />);
    const canvas =
      container.querySelector('canvas') || container.querySelector('div');
    expect(canvas || container.firstChild).toBeTruthy();
  });
});
