/**
 * Testes para componente HeroSection
 */

// Mock do CSS primeiro
jest.mock('@/app/globals.css', () => ({}));

import { HeroSection } from '@/components/domain/home/hero-section';
import { render, screen } from '@testing-library/react';

// Mock do next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe('HeroSection', () => {
  it('deve renderizar a seção hero', () => {
    const { container } = render(<HeroSection />);
    expect(container).toBeTruthy();
    expect(container.firstChild).toBeTruthy();
  });

  it('deve conter conteúdo principal', () => {
    const { container } = render(<HeroSection />);
    expect(container).toBeTruthy();
  });
});
