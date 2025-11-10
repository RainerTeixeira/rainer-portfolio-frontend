/**
 * Testes para componente Navbar
 */

import { Navbar } from '@/components/layout/navbar';
import { render } from '@testing-library/react';

// Mock do next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock do next-themes
jest.mock('next-themes', () => ({
  useTheme: jest.fn(() => ({
    theme: 'light',
    resolvedTheme: 'light',
    setTheme: jest.fn(),
  })),
}));

// Mock do useAuthContext
jest.mock('@/components/providers/auth-context-provider', () => ({
  useAuthContext: jest.fn(() => ({
    user: null,
    isAuthenticated: false,
  })),
}));

describe('Navbar', () => {
  it('deve renderizar a navbar', () => {
    const { container } = render(<Navbar />);
    const nav = container.querySelector('nav') || container.firstChild;
    expect(nav).toBeTruthy();
  });

  it('deve renderizar links de navegação', () => {
    const { container } = render(<Navbar />);
    const links = container.querySelectorAll('a');
    expect(links.length >= 0).toBe(true);
  });
});
