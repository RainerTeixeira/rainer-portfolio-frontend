/**
 * Testes para authService
 */

import { authService } from '@/lib/api';

// Mock do api client
jest.mock('@/lib/api/client', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('authService', () => {
  it('deve ter método login', () => {
    expect(typeof authService.login).toBe('function');
  });

  it('deve ter método register', () => {
    expect(typeof authService.register).toBe('function');
  });

  it('deve ter método logout', () => {
    expect(typeof authService.logout).toBe('function');
  });
});
