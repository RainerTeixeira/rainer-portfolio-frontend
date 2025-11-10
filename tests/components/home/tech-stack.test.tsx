/**
 * Testes para componente TechStackShowcase
 */

import { TechStackShowcase } from '@/components/home/tech-stack';
import { render } from '@testing-library/react';

describe('TechStackShowcase', () => {
  it('deve renderizar o componente', () => {
    const { container } = render(<TechStackShowcase />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar seção de tech stack', () => {
    const { container } = render(<TechStackShowcase />);
    const section = container.querySelector('section');
    expect(section).toBeTruthy();
  });
});
