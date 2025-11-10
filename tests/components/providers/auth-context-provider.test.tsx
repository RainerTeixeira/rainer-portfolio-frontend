/**
 * Testes para AuthContextProvider
 */

import { AuthContextProvider } from '@/components/providers/auth-context-provider';
import { render } from '@testing-library/react';

// Mock do hook useAuth
jest.mock('@/hooks/useAuth', () => ({
  useAuth: jest.fn(() => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    login: jest.fn(),
    logout: jest.fn(),
  })),
}));

describe('AuthContextProvider', () => {
  it('deve renderizar o provider', () => {
    const { container } = render(
      <AuthContextProvider>
        <div>Test</div>
      </AuthContextProvider>
    );
    expect(container).toBeTruthy();
  });

  it('deve renderizar children', () => {
    const { getByText } = render(
      <AuthContextProvider>
        <div>Test Content</div>
      </AuthContextProvider>
    );
    expect(getByText('Test Content')).toBeInTheDocument();
  });
});
