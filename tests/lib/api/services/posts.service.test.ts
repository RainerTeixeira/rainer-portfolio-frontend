/**
 * Testes para postsService
 */

import { postsService } from '@/lib/api';

// Mock do api client
jest.mock('@/lib/api/client', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('postsService', () => {
  it('deve ter método listPosts', () => {
    expect(typeof postsService.listPosts).toBe('function');
  });

  it('deve ter método getPostBySlug', () => {
    expect(typeof postsService.getPostBySlug).toBe('function');
  });
});
