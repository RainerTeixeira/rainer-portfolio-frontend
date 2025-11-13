/**
 * Testes para Layout Root
 */

import RootLayout from '@/app/layout';
import { render } from '@testing-library/react';

// Mock do CSS
jest.mock('@/app/globals.css', () => ({}));

// Mock do Vercel Analytics
jest.mock('@vercel/analytics/next', () => ({
  Analytics: () => null,
}));

jest.mock('@vercel/speed-insights/next', () => ({
  SpeedInsights: () => null,
}));

// Mock das fontes do Next.js
jest.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-inter' }),
  Orbitron: () => ({ variable: '--font-orbitron' }),
  Rajdhani: () => ({ variable: '--font-rajdhani' }),
}));

// Mock dos componentes
jest.mock('@/components/layout/navbar', () => ({
  Navbar: () => <nav>Navbar</nav>,
}));

jest.mock('@/components/layout/footer', () => ({
  Footer: () => <footer>Footer</footer>,
}));

jest.mock('@/components/providers', () => ({
  QueryProvider: ({ children }: any) => <div>{children}</div>,
  ThemeProvider: ({ children }: any) => <div>{children}</div>,
  AuthProvider: ({ children }: any) => <div>{children}</div>,
}));

describe('Root Layout', () => {
  it('deve renderizar o layout', () => {
    const { container } = render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>
    );
    expect(container).toBeTruthy();
  });

  it('deve renderizar children', () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );
    expect(getByText('Test Content')).toBeInTheDocument();
  });
});
