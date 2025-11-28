/**
 * Testes para hook useAuth
 */

import { useAuth } from '@/hooks/useAuth';
import { act, renderHook, waitFor } from '@testing-library/react';

// Mock dos serviços de API
jest.mock('@/lib/api/services/auth.service', () => ({
  authService: {
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
    getUserProfile: jest.fn(),
    isAuthenticated: jest.fn(),
    updateProfile: jest.fn(),
    getIdToken: jest.fn(() => null),
    getAccessToken: jest.fn(() => null),
    getCognitoUserFromToken: jest.fn(() => null),
  },
}));

// Obter referência tipada para o mock gerado pelo jest.mock acima
const { authService: mockAuthService } = jest.requireMock(
  '@/lib/api/services/auth.service',
) as {
  authService: {
    login: jest.Mock;
    register: jest.Mock;
    logout: jest.Mock;
    getUserProfile: jest.Mock;
    isAuthenticated: jest.Mock;
    updateProfile: jest.Mock;
  };
};

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  it('deve realizar login com sucesso e atualizar user/isAuthenticated', async () => {
    const mockUser = {
      id: 'user-123',
      cognitoSub: 'cognito-sub-123',
      fullName: 'Test User',
      email: 'test@example.com',
      emailVerified: true,
      nickname: 'testuser',
      role: 'SUBSCRIBER',
      isActive: true,
      isBanned: false,
      postsCount: 0,
      commentsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as any;

    (mockAuthService.login as jest.Mock).mockResolvedValue({
      user: mockUser,
      tokens: {
        accessToken: 'token',
        refreshToken: 'refresh',
        idToken: 'id',
        expiresIn: 3600,
        tokenType: 'Bearer',
      },
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });

    expect(mockAuthService.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).not.toBeNull();
    expect(result.current.user?.email).toBe('test@example.com');
  });

  it('deve carregar usuário autenticado no efeito inicial quando isAuthenticated for true', async () => {
    const mockUser = {
      id: 'user-123',
      cognitoSub: 'cognito-sub-123',
      fullName: 'Initial User',
      email: 'initial@example.com',
      emailVerified: true,
      nickname: 'initialuser',
      role: 'SUBSCRIBER',
      isActive: true,
      isBanned: false,
      postsCount: 0,
      commentsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as any;

    (mockAuthService.isAuthenticated as jest.Mock).mockReturnValue(true);
    (mockAuthService.getUserProfile as jest.Mock).mockResolvedValue(mockUser);

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockAuthService.isAuthenticated).toHaveBeenCalled();
    expect(mockAuthService.getUserProfile).toHaveBeenCalled();
    expect(result.current.user).not.toBeNull();
    expect(result.current.user?.fullName).toBe('Initial User');
    expect(result.current.isAuthenticated).toBe(true);
  });
});
