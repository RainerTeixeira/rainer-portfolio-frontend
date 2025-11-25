/**
 * Testes para componente CelestialBackground
 */

import { CelestialBackground } from '@/components/ui';
import { render } from '@testing-library/react';

describe('CelestialBackground', () => {
  it('deve renderizar o componente', () => {
    const { container } = render(<CelestialBackground />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar background celestial', () => {
    const { container } = render(<CelestialBackground />);
    const background = container.querySelector('div');
    expect(background).toBeTruthy();
  });
});
