/**
 * Testes mínimos para publicAuth (sem legado)
 */
import { publicAuth } from '@/lib/api';

jest.mock('@/lib/api/clients/public-client', () => ({
  publicClient: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('publicAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  it('login deve chamar /auth/login e retornar dados', async () => {
    const mockResponse = {
      data: {
        data: {
          accessToken: 'access',
          refreshToken: 'refresh',
          idToken: 'id',
          expiresIn: 3600,
          tokenType: 'Bearer',
          user: { id: 'user-1', cognitoSub: 'sub-1' },
        },
      },
    };
    const { publicClient } = jest.requireMock('@/lib/api/clients/public-client');
    (publicClient.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await publicAuth.login({ email: 'a@a.com', password: 'x' });

    expect(publicClient.post).toHaveBeenCalledWith('/auth/login', { email: 'a@a.com', password: 'x' });
    expect(result.user.id).toBe('user-1');
    expect(localStorageMock.getItem('accessToken')).toBe('access');
  });

  it('register deve chamar /auth/register', async () => {
    const mockResponse = { data: { message: 'ok', userId: '123', requiresConfirmation: false } };
    const { publicClient } = jest.requireMock('@/lib/api/clients/public-client');
    (publicClient.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await publicAuth.register({ email: 'a@a.com', password: 'x', fullName: 'A', nickname: 'a' });

    expect(publicClient.post).toHaveBeenCalledWith('/auth/register', {
      email: 'a@a.com',
      password: 'x',
      fullName: 'A',
      nickname: 'a',
    });
    expect(result.userId).toBe('123');
  });
});
