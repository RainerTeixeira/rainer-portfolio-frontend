/**
 * Testes para Layout Root
 */

import RootLayout from '@/app/layout';
import { render } from '@testing-library/react';

// Mock do CSS
jest.mock('@/app/globals.css', () => ({}));

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
