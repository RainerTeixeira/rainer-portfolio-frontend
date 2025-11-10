/**
 * Testes para componente Carousel
 */

import { Carousel } from '@/components/home/carousel';
import { render } from '@testing-library/react';

// Mock do next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe('Carousel', () => {
  it('deve renderizar o componente', () => {
    const { container } = render(<Carousel />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar carousel de imagens', () => {
    const { container } = render(<Carousel />);
    const carousel = container.querySelector('div') || container.firstChild;
    expect(carousel).toBeTruthy();
  });
});
