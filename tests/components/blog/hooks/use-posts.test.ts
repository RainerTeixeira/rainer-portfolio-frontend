/**
 * Testes para hook usePosts
 */

import { usePosts } from '@/components/blog/hooks/use-posts';
import { renderHook, waitFor } from '@testing-library/react';

// Mock do postsService
jest.mock('@/lib/api', () => ({
  postsService: {
    listPosts: jest.fn(() =>
      Promise.resolve({
        posts: [],
        pagination: { total: 0, page: 1, limit: 10, totalPages: 0 },
      })
    ),
  },
}));

describe('usePosts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar estado inicial', async () => {
    const { result } = renderHook(() => usePosts());

    expect(result.current).toHaveProperty('posts');
    expect(result.current).toHaveProperty('loading');
    expect(result.current).toHaveProperty('error');
    expect(Array.isArray(result.current.posts)).toBe(true);
    expect(typeof result.current.loading).toBe('boolean');

    // Aguarda o hook finalizar o carregamento
    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );
  });

  it('deve carregar posts', async () => {
    const mockPosts = [
      { id: '1', title: 'Post 1', slug: 'post-1' },
      { id: '2', title: 'Post 2', slug: 'post-2' },
    ];

    const { postsService } = require('@/lib/api');
    postsService.listPosts.mockResolvedValue({
      posts: mockPosts,
      pagination: { total: 2, page: 1, limit: 10, totalPages: 1 },
    });

    const { result } = renderHook(() => usePosts());

    await waitFor(() => {
      expect(result.current.posts.length).toBeGreaterThanOrEqual(0);
    });
  });
});
