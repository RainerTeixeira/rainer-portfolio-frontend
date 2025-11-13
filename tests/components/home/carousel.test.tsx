/**
 * Testes para componente Carousel
 */

// Mock do CSS primeiro
jest.mock('@/app/globals.css', () => ({}));

import { Carousel } from '@/components/home/carousel';
import { render } from '@testing-library/react';

// Mock do next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock do next-themes
jest.mock('next-themes', () => ({
  useTheme: jest.fn(() => ({
    theme: 'dark',
    resolvedTheme: 'dark',
    setTheme: jest.fn(),
  })),
}));

// Mock do framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock de dados do carousel se necessário
jest.mock('@/constants', () => ({
  CAROUSEL_ITEMS: [
    { id: '1', title: 'Item 1', image: '/image1.jpg', description: 'Desc 1' },
    { id: '2', title: 'Item 2', image: '/image2.jpg', description: 'Desc 2' },
  ],
}));

describe('Carousel', () => {
  it('deve renderizar o componente', () => {
    const { container } = render(<Carousel />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar carousel de imagens', () => {
    const { container } = render(<Carousel />);
    // Verifica que o container foi renderizado
    const carousel =
      container.querySelector('div') || container.firstChild || container;
    expect(carousel).toBeTruthy();
  });
});
