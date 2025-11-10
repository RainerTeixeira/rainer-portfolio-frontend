/**
 * Testes para componente Testimonials
 */

import { Testimonials } from '@/components/home/testimonials';
import { render } from '@testing-library/react';

describe('Testimonials', () => {
  it('deve renderizar o componente', () => {
    const { container } = render(<Testimonials />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar seção de depoimentos', () => {
    const { container } = render(<Testimonials />);
    const section = container.querySelector('section');
    expect(section).toBeTruthy();
  });
});
