/**
 * Testes para usersService
 */

import { userService } from '@/lib/api';

// Mock do api client
jest.mock('@/lib/api/client', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('userService', () => {
  it('deve ter método getUserById', () => {
    expect(typeof userService.getUserById).toBe('function');
  });

  it('deve ter método updateProfile', () => {
    expect(typeof userService.updateProfile).toBe('function');
  });
});
