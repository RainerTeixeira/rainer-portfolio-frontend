/**
 * Testes de integração para posts (mínimos, sem legado)
 */
import { publicBlogPosts } from '@/lib/api';

jest.mock('@/lib/api/clients/public-client', () => ({
  publicClient: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

describe('publicBlogPosts - Integração', () => {
  it('deve ter método getPublicPosts', () => {
    expect(typeof publicBlogPosts.getPublicPosts).toBe('function');
  });

  it('deve ter método getPublicPostBySlug', () => {
    expect(typeof publicBlogPosts.getPublicPostBySlug).toBe('function');
  });
});
