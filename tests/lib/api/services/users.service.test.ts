/**
 * Testes para usersService
 */

import { usersService } from '@/lib/api';

// Mock do api client
jest.mock('@/lib/api/client', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('usersService', () => {
  it('deve ter método getProfile', () => {
    expect(typeof usersService.getProfile).toBe('function');
  });

  it('deve ter método updateProfile', () => {
    expect(typeof usersService.updateProfile).toBe('function');
  });
});
