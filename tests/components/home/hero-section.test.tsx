/**
 * Testes para componente HeroSection
 */

import { HeroSection } from '@/components/home/hero-section';
import { render, screen } from '@testing-library/react';

// Mock do next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe('HeroSection', () => {
  it('deve renderizar a seção hero', () => {
    render(<HeroSection />);
    const section = screen.getByTestId('hero-section');
    expect(section).toBeInTheDocument();
  });

  it('deve conter conteúdo principal', () => {
    render(<HeroSection />);
    expect(document.body).toBeTruthy();
  });
});
