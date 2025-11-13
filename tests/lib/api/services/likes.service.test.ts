/**
 * Testes para likesService
 */

import { likesService } from '@/lib/api';

// Mock do api client
jest.mock('@/lib/api/client', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('likesService', () => {
  it('deve ter método toggleLike', () => {
    expect(typeof likesService.toggleLike).toBe('function');
  });

  it('deve ter método getLikesByPost', () => {
    expect(typeof likesService.getLikesByPost).toBe('function');
  });

  it('deve ter método getLikesByUser', () => {
    expect(typeof likesService.getLikesByUser).toBe('function');
  });
});
