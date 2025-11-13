/**
 * Testes para AuthContextProvider
 */

import { AuthProvider } from '@/components/providers/auth-context-provider';
import { render } from '@testing-library/react';

// Mock do hook useAuth
const mockUseAuth = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  login: jest.fn().mockResolvedValue(undefined),
  register: jest.fn().mockResolvedValue(undefined),
  logout: jest.fn().mockResolvedValue(undefined),
  updateProfile: jest.fn().mockResolvedValue(undefined),
  forgotPassword: jest.fn().mockResolvedValue(undefined),
  confirmPasswordReset: jest.fn().mockResolvedValue(undefined),
  changePassword: jest.fn().mockResolvedValue(undefined),
  checkAuth: jest.fn().mockResolvedValue(undefined),
  loginWithOAuthCode: jest.fn().mockResolvedValue(false),
};

jest.mock('@/hooks/useAuth', () => ({
  useAuth: jest.fn(() => mockUseAuth),
}));

describe('AuthProvider', () => {
  it('deve renderizar o provider', () => {
    const { container } = render(
      <AuthProvider>
        <div>Test</div>
      </AuthProvider>
    );
    expect(container).toBeTruthy();
  });

  it('deve renderizar children', () => {
    const { getByText } = render(
      <AuthProvider>
        <div>Test Content</div>
      </AuthProvider>
    );
    expect(getByText('Test Content')).toBeInTheDocument();
  });
});
