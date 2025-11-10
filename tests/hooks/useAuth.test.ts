/**
 * Testes para hook useAuth
 */

import { useAuth } from '@/hooks/useAuth';
import { renderHook } from '@testing-library/react';

// Mock dos serviços de API
jest.mock('@/lib/api', () => ({
  authService: {
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
    getCurrentUser: jest.fn(),
    updateProfile: jest.fn(),
  },
}));

describe('useAuth', () => {
  it('deve retornar funções de autenticação', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current).toHaveProperty('user');
    expect(result.current).toHaveProperty('isAuthenticated');
    expect(result.current).toHaveProperty('loading');
    expect(result.current).toHaveProperty('login');
    expect(result.current).toHaveProperty('logout');
    expect(typeof result.current.login).toBe('function');
    expect(typeof result.current.logout).toBe('function');
  });
});
